export default {
    preset: "ts-jest",
    transform: {
      "^.+\\.(ts|tsx)?$": "ts-jest",
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleDirectories: ["node_modules"],
    moduleNameMapper: {
        // Map module paths in the root directory
        "^(.*)$": "<rootDir>/$1",
      },
      
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    transformIgnorePatterns: [
      "node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|aws-amplify-react-native|@ui-kitten)",
    ],
  }; 2