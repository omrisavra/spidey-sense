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
  const message = isNotified ? 'alert!!!!!' : 'good';
  res.send({ message });
  next();
});

app.post('/notify', (req, res, next) => {
  isNotified = true;
  const message = isNotified ? 'alert!!!!!' : 'good';
  res.send({ message });
  next();
});

app.listen(port, function () {
  console.log(`server started and listening on ${port}`);
});
