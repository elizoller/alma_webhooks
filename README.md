# Using Node to Listen to Alma Webhooks
For Code4Lib 2019 Workshop by Eli Zoller

## Get Started
1. Check your node version
`node -v`
If the output is greater than 8, you'll be good for this project.
If you don't have node installed, go to https://nodejs.org/en/ to download it.
2. Check you have npm installed
`npm -v`
If you don't have npm installed, install it `npm install -g npm`
3. It'll be best if you have access to an Alma sandbox, but you can still participate if you don't.



## Phase 1
1. Make a directory for your node project
```mkdir alma_webhooks```

2. Initialize your project
```npm init```
    You should now have a package.json file
```cat package.json``` to check to out

3. Install packages for this project
```npm install --save express typescript ts-node```

4. Install packages for developing this project
