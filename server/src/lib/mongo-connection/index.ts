"use strict"

import mongoose from 'mongoose'

// Config
import config from '../../config'

function connect() {
    mongoose.connect(config.MONGO_CONNECTION_URI, { useNewUrlParser: true })
}

function close() {
    mongoose.connection.close()
}

export default {
    connect,
    close,
}