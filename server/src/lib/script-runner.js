"use strict";

const mongoConnection = require("./mongo-connection");

module.exports = async callback => {
  mongoConnection();
  return await callback();
};
