const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                edge: "17",
                firefox: "60",
                chrome: "64",
                safari: "11.1",
            },
            useBuiltIns: "usage",
            corejs: "3.6.5",
            "targets": {
                "esmodules": true,
                "ie": "11"
            }
        },
    ],
];

module.exports = { presets };