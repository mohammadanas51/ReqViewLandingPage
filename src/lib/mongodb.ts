import { MongoClient, Db, Collection, ObjectId, ServerApiVersion } from "mongodb";

export interface WaitlistDocument {
  _id?: ObjectId;
  email: string;
  emailNormalized: string;
  createdAt: Date;
  source: "landing_page";
  status: "active";
}

const DEFAULT_DB_NAME = "ReqViewDB";
const DEFAULT_COLLECTION_NAME = "WaitlistEntries";

function getMongoUri(): string {
  // If complete MONGODB_URI is provided, use it directly (credentials already included)
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  // Alternative fallback if separate credentials are provided
  const user = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  const host = process.env.MONGODB_HOST || "reqview.5p4nj8l.mongodb.net";

  if (user && password) {
    return `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}`;
  }

  throw new Error(
    "MongoDB connection string is not configured. Please set MONGODB_URI in your environment."
  );
}

const uri = getMongoUri();
const dbName = process.env.MONGODB_DB_NAME || DEFAULT_DB_NAME;
const collectionName = process.env.MONGODB_COLLECTION_NAME || DEFAULT_COLLECTION_NAME;

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so the client promise
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

let isIndexEnsured = false;

/**
 * Ensures the required unique index on `emailNormalized` is present.
 * Idempotent execution that runs at most once per runtime lifecycle.
 */
export async function ensureIndexes(collection: Collection<WaitlistDocument>): Promise<void> {
  if (isIndexEnsured) return;
  try {
    await collection.createIndex(
      { emailNormalized: 1 },
      { unique: true, background: true, name: "uniq_email_normalized" }
    );
    isIndexEnsured = true;
  } catch (error: unknown) {
    // If the index already exists or was created concurrently, ignore
    const err = error as { code?: number };
    if (err.code === 85 || err.code === 86) {
      isIndexEnsured = true;
    } else {
      // Re-throw or log safely without credential exposure
      console.error("Index creation notice: could not verify or create unique index on emailNormalized.");
    }
  }
}

/**
 * Returns the MongoDB Database instance.
 */
export async function getDatabase(): Promise<Db> {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}

/**
 * Returns the configured Waitlist collection with indexes initialized.
 */
export async function getWaitlistCollection(): Promise<Collection<WaitlistDocument>> {
  const db = await getDatabase();
  const collection = db.collection<WaitlistDocument>(collectionName);
  await ensureIndexes(collection);
  return collection;
}

export default clientPromise;

