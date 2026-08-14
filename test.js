const assert = require('node:assert/strict');
const getAppMessage = require('./app');

const actual = getAppMessage();
const expected = 'Fraz Jenkins Node Application';

assert.equal(actual, expected);

console.log('Test passed: application message is correct.');
