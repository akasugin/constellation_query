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
                    "sys_date": {
                        "name": "sys.date",
                        "value": "1111"
                    },
                    "query_subject": {
                        "name": "query_subject",
                        "value": ""
                    }
                }
            }
        ]
    }
};

console.log(JSON.stringify(data));


