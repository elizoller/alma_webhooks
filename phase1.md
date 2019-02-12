## Phase 1 - The Basics
1. Make a directory for your node project
```mkdir alma_webhooks```

2. Initialize your project
```npm init```
This will walk you through a series of questions about your project. You can modify these later in the package.json file.
    You should now have a package.json file
```cat package.json``` to check to out

3. Install packages for this project
```npm install --save express```
**You could use yarn instead for package management. The command would be ```yarn add express```

4. Install packages for developing this project
```npm install --save-dev typescript ts-node tslint @types/express @types/node```
**Or, if you're using yarn, it'd be ```yarn global add typescript ts-node tslint @types/express @types/node --dev``` If you choose to use yarn, you'll see a yarn.lock file. If you use npm, you'll see a package-lock.json file in your working directory.

5. Create a src and dist directory so we can compile our code
```mkdir src```
```mkdir dist```

6. Add a basic app file.
Open src/app.ts in a text editor, IDE, or terminal based text editor.
```javascript
    "use strict";
    import * as express from "express";
    import * as almaModule from "./alma";

    const app = express();

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.get("/alma_webhook", almaModule.getWebhook);
    app.post("/alma_webhook", almaModule.postWebhook);

    export default app;
```

7. Add a basic server file.
Open src/server.ts.
```javascript
    import app from "./app";
    const port = 3000;

    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`Example app listening on port ${port}!`);
    });
```

7. Configure your typescript build.
Open a file called tsconfig.json and insert the following configuration:
```json
    {
        "compilerOptions": {
            "module": "commonjs",
            "moduleResolution": "node",
            "pretty": true,
            "sourceMap": true,
            "target": "es6",
            "outDir": "./dist",
            "baseUrl": "./src",
            "lib": [
                "es6",
                "dom"
            ]
        },
        "include": [
            "src/**/*.ts"
        ],
        "exclude": [
            "node_modules"
        ],
        "paths": {
            "*": [
                "*"
            ]
        }
    }
```

8. Add your typescript build task to your package.json
add ```"build": "tsc"``` to the scripts section. This will compile your typescript files in src to javascript files in dist.

9. Initialize your linter.
```tslint --init```
You should see a tslint.json file which contains something like
```json
    {
        "defaultSeverity": "error",
        "extends": [
            "tslint:recommended"
        ],
        "jsRules": {},
        "rules": {},
        "rulesDirectory": []
    }
```

10. Add your lint task to your package.json file.
add ```"lint": "tslint --project tsconfig.json"``` to the scripts section.

11. Run your linter with `npm run lint`

12. Compile your typescript. `npm run build`

13. Start your basic express app. `node ./dist/server.js`

14. Add your run server task to your package.json file.
add ```"start": "node ./dist/server.js"``` to the scripts section.

15. Go to `localhost:8000` in your browser. You should see "Hello World"

## Next Steps
[Continue to Phase 2](phase2.md)
