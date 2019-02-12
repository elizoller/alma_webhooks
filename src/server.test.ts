import app from "./app";
const port = 3001;

module.exports = app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Express server running on port ${port}`);
});
