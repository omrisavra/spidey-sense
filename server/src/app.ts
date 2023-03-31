import restify, { createServer, plugins } from 'restify';
import corsMiddleware from 'restify-cors-middleware';
import fs from "fs"

import { promisify } from "util";

export const sleep = promisify(setTimeout);

const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['*'],
  exposeHeaders: ['*'],
});

const app = createServer();
app.pre(cors.preflight);
app.use(cors.actual);
app.use(plugins.jsonBodyParser());
app.use(plugins.queryParser());
app.use(restify.plugins.queryParser());

const port = 3001;

let isNotified = false;
let lastImage: Buffer | null = null;

let lastTimeUpdated = Date.now()

app.get('/notify', (req, res, next) => {
    res.send(isNotified ? "true" : "false")
    next()
})

app.post('/notify', (req, res, next) => {
    lastTimeUpdated = Date.now();
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

app.post('/img', (req, res, next) => {
  res.send("got image");
  console.log("got a new image")

  lastImage = Buffer.from(req.body.data, 'base64');

  fs.writeFileSync('image.jpg', lastImage);

  next();
});

app.get('/img', (req, res, next) => {
  fs.readFile('./image.jpg', function(err, file) {
    if (err) {
      res.send(500);
      return next();
    }

    res.write(file);
    res.end();
    console.log("sent response")
    return next()
  })
})


const updateNotifyWatchdog = async () => {
  const resetNotifyTime = 5_000;
  for (;;) {
    const diffTime = Date.now() - lastTimeUpdated;
    if (diffTime > resetNotifyTime) {
      isNotified = false;
    }
    await sleep(500)
  }
}

app.listen(port, function () {
  console.log(`server started and listening on ${port}`);
  updateNotifyWatchdog();
});
