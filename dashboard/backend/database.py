from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URL)

# Database Name
db = client["startup_profiles"]

# Only keeping the collection you need
profile_collection = db["profile"]