"use strict"

import { Model as MongooseModel } from 'mongoose'

export default function createRepo(model) {
    return {
        // ...model,
        find: (query) => 
            model.find(query).lean().exec(),
        findById: (query : object) => 
            model.findById(query).lean().exec(),
        save: (doc : object) =>
            model.save(doc).lean().exec(),
    }
}