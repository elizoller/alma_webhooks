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
    };

    export let postWebhook = (req: Request, res: Response, next: NextFunction) => {
        // tslint:disable-next-line:no-console
        console.log("POST request received");
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
```



