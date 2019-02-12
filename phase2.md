## Phase 2 - Adding Endpoints

1. Create a file for your alma module
`touch src/alma.ts`

2. Open that file in your editor of choice
```javascript
    "use strict";
    import { NextFunction, Request, Response } from "express";

    export let getWebhook = (req: Request, res: Response, next: NextFunction) => {
        // tslint:disable-next-line:no-console
        console.log("GET request received");
        res.json({});
    };

    export let postWebhook = (req: Request, res: Response, next: NextFunction) => {
        // tslint:disable-next-line:no-console
        console.log("POST request received");
        res.json({});
    };
```

3. Add packages to write tests
```npm install --save-dev mocha chai chai-http``` or ```yarn add --dev mocha chai chai-http```

4. Create a test file
```touch test.js```

5. Add a task in your package.json file for running tests. Modify the "test" script to be ```./node_modules/mocha/bin/mocha --timeout 10000```

6. Add a test server file.
Open src/server.test.js
```javascript
    import app from "./app";
    const port = 3001;

    module.exports = app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`Express server running on port ${port}`);
    });
```

7. Write a test in your test.js file.
```javascript
    process.env.NODE_ENV = 'test';
    let chai = require('chai');
    let chaiHttp = require('chai-http');
    let server = require('./dist/server.test');
    let expect = chai.expect;
    let assert = chai.assert;


    chai.use(chaiHttp);

    describe('GET /alma_webhook', () => {
        it('it should GET an alma_webhook', (done) => {
            chai.request(server)
                .get('/alma_webhook')
                .end((err, res) => {
                    expect(res.status, 200);
                    assert.deepEqual(res.body, {});
                    done();
                });
        });
    });
```

8. Run your tests with `npm run test`

9. Add another test for POST endpoint.
```javascript
    describe('GET /alma_webhook', () => {
        it('it should POST an alma_webhook', (done) => {
            chai.request(server)
                .post('/alma_webhook')
                .send({})
                .end((err, res) => {
                    expect(res.status, 200);
                    assert.deepEqual(res.body, {});
                    done();
                });
        });
    });
```

10. Run your tests again. `npm run test`

11. Modify your GET request to meet Alma specifications.
```res.json({ challenge: req.query.challenge });```

12. Update your test.
```javascript
    chai.request(server)
        .get('/alma_webhook?challenge=toast')
        .end((err, res) => {
            expect(res.status, 200);
            assert.deepEqual(res.body, {'challenge': 'toast'});
            done();
        });
```

13. Build your code and run your tests. `npm run build` `npm run test`

14. Create a config file, called config.js
For now, it can be pretty minimal. But this would be a good place to store any parameters you don't necessarily want to store in the code. Like URLs or API keys, or in this case, the websecret we're going to use.
```javascript
    const config = {
        dev: {
            webhook_secret: "test_secret"
        }
    }
    module.exports = config;
```

15. Import your config file in your alma.ts file.
```import { config } from "../config";```
Now you'll be able to acess the config object in your module file.

16. Install the necessary packages for verifying the signature.
```npm install --save-dev @types/crypto-js``` or ```yarn add --dev @types/crypto-js```

17. Add your signature validation to your POST endpoint.
Add the import to the top of your src/alma.ts module file. Then add the new function at the bottom of the file.
```import { createHmac } from "crypto";```
```javascript
    function validateSignature(body: any, secret: string, signature: string) {
        const hash = createHmac("SHA256", secret.toString())
            .update(JSON.stringify(body))
            .digest("base64");
        return (hash === signature);
    }
```

18. Modify your POST method to validate the signature with the one we stored in the config file.
```javascript
    export let postWebhook = (req: Request, res: Response, next: NextFunction) => {
        console.log("POST request received");
        const secret = config.dev.alma.webhook_secret;
        if (!validateSignature(req.body,
            secret,
            req.get("X-Exl-Signature"))) {
            return res.status(401).send({ errorMessage: "Invalid Signature" });
        }
        res.json({ message: "Successful webhook received", action: req.body.action });
    };
```
