"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_1 = require("restify");
const app = (0, restify_1.createServer)();
const port = 3001;
let isNotified = false;
app.use(restify_1.plugins.jsonBodyParser());
app.use(restify_1.plugins.gzipResponse());
app.get('/notify', (req, res, next) => {
    // res.set('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Origin", "*");
    res.send(isNotified ? "alert!!!!!" : "good");
    return next();
});
app.post('/notify', (req, res, next) => {
    isNotified = true;
    // res.set('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Origin", "*");
    res.send("notified");
    return next();
});
app.listen(port, function () {
    console.log(`server started and listening on ${port}`);
});
