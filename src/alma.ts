"use strict";
import { createHmac } from "crypto";
import { NextFunction, Request, Response } from "express";
import { config } from "./config";

export let getWebhook = (req: Request, res: Response, next: NextFunction) => {
    // tslint:disable-next-line:no-console
    console.log("GET request received");
    res.json({ challenge: req.query.challenge });
};

export let postWebhook = (req: Request, res: Response, next: NextFunction) => {
    // tslint:disable-next-line:no-console
    console.log("POST request received");
    const secret = config.dev.alma.webhook_secret;
    const sign = req.get("X-Exl-Signature").toString();
    if (!sign || !validateSignature(req.body, secret, sign)) {
        return res.status(401).send({ errorMessage: "Invalid Signature" });
    }

    const action = req.body.action.toLowerCase();
    switch (action) {
        case "bib":
            console.log("received a bib action");
            console.log(req.body);
            break;
        default:
            console.log(`No handler for type ${action}`);
            break;
    }
    res.json({ message: "Successful webhook received", action: req.body.action });
};

function validateSignature(body: any, secret: string, signature: string) {
    const hash = createHmac("SHA256", secret.toString())
        .update(JSON.stringify(body))
        .digest("base64");
    return (hash === signature);
}
