export default {
    // Server
    PORT: process.env.SERVER_PORT || 3000,
    // Mongo Database
    MONGO_CONNECTION_URI: process.env.MONGO_CONNECTION_URI || 'mongodb://0.0.0.0:27017/mealprep'
}