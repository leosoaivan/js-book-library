module.exports = {
    "env": {
        "es6": true
    },
    "extends": "google",
    "rules": {
        "require-jsdoc": "warn",
        "valid-jsdoc": "warn",
        "no-trailing-spaces": ["error", 
            {
                "skipBlankLines": true
            }
        ],
        "max-len": "off"
    }
};