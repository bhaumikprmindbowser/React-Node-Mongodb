import dotenv from "dotenv"
import assert from "assert"

dotenv.config()

const {
  PORT,
  HOST,
  HOST_URL,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  DATABASE_URL,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  JWT_KEY
} = process.env

assert(PORT, "Port is required")
assert(HOST, "Host is required")

export default {
  port: PORT,
  host: HOST,
  hostUrl: HOST_URL,
  mongoDbUsername: MONGODB_USERNAME,
  mongoDbPassword: MONGODB_PASSWORD,
  jwtKey: JWT_KEY,  
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    databaseURL: DATABASE_URL
  }
}
