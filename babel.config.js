    module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
        [
            "module-resolver",
            {
            root: ["./src"], 
            alias: {
                "@components": "./src/components",
                "@hooks": "./src/hooks",
                "@screens": "./src/screens",
                "@theme": "./src/theme",
                "@domain": "./src/domain",
                "@api": "./src/API",
                "@types": "./src/types",
                "@post": "./src/domain/Post/PostComment",
                "@utils": "./src/utils",
                "@infra": "./src/infra",
                "@services": "./src/services",
                "@test-utils": "./src/test/test-utils",
                "@test": "./src/test",
                "@assets": "./src/assets",
                "@navigation":["src/navigation"],
                "@routes":["src/routes"],
                "@validation":["src/validation"],
                "@store": ["src/store"],
            },
            },
        ],
        ],
    };
    };
