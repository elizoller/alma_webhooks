# Using Node to Listen to Alma Webhooks
For Code4Lib 2019 Workshop by Eli Zoller

## Get Started - To Do before the workshop starts
1. Check your node version
`node -v`
If the output is greater than 8, you'll be good for this project.
If you don't have node installed, go to https://nodejs.org/en/ to download it.
If you require a specific version of node running in your environment for another project, I highly recommend installing a node version manager, such as [nvm](https://github.com/creationix/nvm)
2. Check you have npm installed
`npm -v`
If you don't have npm installed, install it `npm install -g npm`
3. It'll be best if you have access to an Alma sandbox, but you can still participate if you don't.



## Phase 1
1. Make a directory for your node project
```mkdir alma_webhooks```

2. Initialize your project
```npm init```
This will walk you through a series of questions about your project. You can modify these later in the package.json file.
    You should now have a package.json file
```cat package.json``` to check to out

3. Install packages for this project
```npm install --save express typescript ts-node```
**You could use yarn instead for package management. The command would be ```yarn add typescript ts-node```

4. Install packages for developing this project
```npm install -g --save-dev tslint```
**Or, if you're using yarn, it'd be ```yarn global add tslint --dev```

5. Create a src and dist directory so we can compile our code
```mkdir src```
```mkdir dist```

6. Add a basic server file.
Open src/server.ts in a text editor, IDE, or terminal based text editor.
```javascript
    const express = require("express");
    const app = express();

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.listen(8000, () => {
        console.log("Example app listening on port 8000!");
    });
```

7. Initialize your linter.
```tslint --init```

8. Add your lint task to your package.json file.
add ```"lint": "tslint --project tsconfig.json"``` to the scripts section

9. Run your linter with `npm run lint`


