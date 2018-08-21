// global.fetch = require('jest-fetch-mock');

const constantDate = new Date(0);

Date = class extends Date {
  constructor() {
    return constantDate
  }
}