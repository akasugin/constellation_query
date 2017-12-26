var data = {
    "version": "2.0",
    "session": {
        "new": true,
        "sessionId": "sessionId",
        "attributes": []
    },
    "context": {
        "System": {
            "application": {
                "applicationId": "sample_personal_tax"
            }
        }
    },
    "request": {
        "type": "IntentRequest",
        "intents": [
            {
                "name": "constellation_query",
                "slots": {
                    "sys.date": {
                        "name": "sys.date",
                        "value": ""
                    },
                    "query_subject": {
                        "name": "query_subject",
                        "value": "\u5317\u4eac"
                    }
                }
            }
        ]
    }
};

console.log(JSON.stringify(data));


