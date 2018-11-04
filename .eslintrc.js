module.exports = {
    "env": {
        "es6": true
    },
    "extends": "google",
    "rules": {
        "require-jsdoc": "off",
        "valid-jsdoc": "off",
        "no-trailing-spaces": ["error", 
            {
                "skipBlankLines": true
            }
        ],
        "max-len": "off"
    }
};