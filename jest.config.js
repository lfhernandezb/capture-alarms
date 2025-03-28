module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};