import restify, { createServer, plugins } from 'restify';
import corsMiddleware from 'restify-cors-middleware';

const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['*'],
  exposeHeaders: ['*'],
});

const app = createServer();
app.pre(cors.preflight);
app.use(cors.actual);
app.use(plugins.jsonBodyParser());
app.use(restify.plugins.queryParser());

const port = 3001;

let isNotified = false;

app.get('/notify', (req, res, next) => {
    res.send(isNotified ? "true" : "false")
    next()
})

app.post('/notify', (req, res, next) => {
    if (req.query.alert == 1){
        isNotified = true;
        console.log("setting alert to true")
    }
    else { 
        isNotified = false
        console.log("setting alert to false")
    }

    res.send("sent")
    next()
})

app.listen(port, function () {
  console.log(`server started and listening on ${port}`);
});
