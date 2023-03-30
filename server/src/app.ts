import { createServer, plugins } from 'restify';
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

const port = 3001;

let isNotified = false;

app.get('/notify', (req, res, next) => {
    res.send(isNotified ? "true" : "false")
    next()
})

app.post('/notify', (req, res, next) => {
    isNotified = true;
    res.send("sent")
    next()
})

app.listen(port, function () {
  console.log(`server started and listening on ${port}`);
});
