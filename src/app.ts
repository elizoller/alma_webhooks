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
