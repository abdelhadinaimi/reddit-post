// global.fetch = require('jest-fetch-mock');
var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-15');

enzyme.configure({ adapter: new Adapter() });