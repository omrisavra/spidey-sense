import restify, { createServer, plugins } from "restify";

const app = createServer();

const port = 3001;

let isNotified = false;

app.use(plugins.jsonBodyParser());
app.use(plugins.gzipResponse());


app.get('/notify', (req, res, next) => {
    // res.set('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Origin", "*");
    res.send(isNotified ? "alert!!!!!" : "good")
    return next()
})

app.post('/notify', (req, res, next) => {
    isNotified = true;
    // res.set('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Origin", "*");
    res.send("notified")
    return next()
})

app.listen(port, function () {
    console.log(`server started and listening on ${port}`);
 })