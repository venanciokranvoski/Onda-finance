    export default {
    preset: "jest-expo",
    testEnvironment: "node",
    transformIgnorePatterns: [
        "node_modules/(?!(@react-native|react-native|expo|@expo|@react-navigation|@unimodules|unimodules|@react-native-community)/)"
    ],
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect","<rootDir>/jest.setup.js"],
    moduleNameMapper: {
        "^@components(.*)$": "<rootDir>/src/components$1",
        "^@theme(.*)$": "<rootDir>/src/theme$1",
        "^@store(.*)$": "<rootDir>/src/store$1",
        "^@hooks(.*)$": "<rootDir>/src/hooks$1",
        "^@navigation(.*)$": "<rootDir>/src/navigation$1",
        "^@services(.*)$": "<rootDir>/src/services$1",
        "^@routes(.*)$": "<rootDir>/src/routes$1",
    },
    };
