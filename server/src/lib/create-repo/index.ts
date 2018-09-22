"use strict"

import { Model as MongooseModel } from 'mongoose'

export default function createRepo(model : MongooseModel) {
    return {
        ...model,
        find: (query : object) => model.find(query).lean().exec(),
        findById: (query : object) => model.findById(query).lean().exec(),
        save: (doc : MongooseModel) => model.save(doc).lean().exec(),
    }
}