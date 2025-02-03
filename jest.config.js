module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(ts|tsx|js|jsx)$": "babel-jest", // Make sure babel-jest is handling .js/.jsx files
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1", // Adjust path mapping if using aliases
    },
    transformIgnorePatterns: [
      "/node_modules/(?!lucide-react)/" // Ignore transformation issues with lucide-react
    ]
  };
  