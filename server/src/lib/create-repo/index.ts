"use strict"

export default function createRepo(Model) {
    return {
        ...Model,
        find: (query : object) => Model.find(query).lean().exec(),
        findById: (query : object) => Model.findById(query).lean().exec(),
        save: (doc : Model) => Model.save(doc).lean().exec(),
    }
}