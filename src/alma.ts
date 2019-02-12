"use strict";
import { NextFunction, Request, Response } from "express";

export let getWebhook = (req: Request, res: Response, next: NextFunction) => {
    // tslint:disable-next-line:no-console
    console.log("GET request received");
    res.json({ challenge: req.query.challenge });
};

export let postWebhook = (req: Request, res: Response, next: NextFunction) => {
    // tslint:disable-next-line:no-console
    console.log("POST request received");
};
