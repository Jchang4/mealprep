"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createRepo(model) {
    return Object.assign({}, model, { find: (query) => model.find(query).lean().exec(), findById: (query) => model.findById(query).lean().exec(), create: (doc) => model.create(doc).then((newDocument) => newDocument.lean()), updateById: (docId, newProperties) => model.findByIdAndUpdate(docId, newProperties).lean() });
}
exports.default = createRepo;
//# sourceMappingURL=index.js.map