const { TextDecoder, TextEncoder } = require('util');
const config = {
    // preset: "jest",
    globals: {
        TextDecoder: TextDecoder,
        TextEncoder: TextEncoder,
      },
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "jsx"],
    testPathIgnorePatterns: ["/node_modules/"],
    testRegex: ".*.(test|spec).(j|t)s[x]?$",
    transform: {
        "node_modules/(react-dnd|dnd-core|@react-dnd)/.+\\.(j|t)sx?$": "babel-jest",
        "^.+\\.js$": "babel-jest",
        "^.+\\.jsx$": "babel-jest",
    },
    transformIgnorePatterns: [`/node_modules/(?!(somePkg)|react-dnd|dnd-core|@react-dnd)`],
};

module.exports = config

