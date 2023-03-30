"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify_1 = require("restify");
const restify_cors_middleware_1 = __importDefault(require("restify-cors-middleware"));
const cors = (0, restify_cors_middleware_1.default)({
    origins: ['*'],
    allowHeaders: ['*'],
    exposeHeaders: ['*'],
});
const app = (0, restify_1.createServer)();
app.pre(cors.preflight);
app.use(cors.actual);
app.use(restify_1.plugins.jsonBodyParser());
const port = 3001;
let isNotified = false;
app.get('/notify', (req, res, next) => {
    res.send(isNotified ? "true" : "false");
    next();
});
app.post('/notify', (req, res, next) => {
    isNotified = true;
    res.send("sent");
    next();
});
app.listen(port, function () {
    console.log(`server started and listening on ${port}`);
});
