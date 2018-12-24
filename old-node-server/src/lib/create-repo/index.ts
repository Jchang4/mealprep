"use strict"

import { Model } from 'mongoose'

export default function createRepo(model : Model) {
    return {
        ...model,
        find: (query : object) => 
            model.find(query).lean().exec(),
        findById: (query : object) => 
            model.findById(query).lean().exec(),
        create: (doc : object) =>
            model.create(doc).then((newDocument : Model) => newDocument.lean()),
        updateById: (docId : string, newProperties : object) =>
            model.findByIdAndUpdate(docId, newProperties).lean(),
    }
}