import restify, { createServer, plugins } from 'restify';
import corsMiddleware from 'restify-cors-middleware';
import fs from "fs"

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
// app.use(restify.plugins.queryParser());

const port = 3001;

let isNotified = false;
let lastImage: Buffer | null = null;

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

app.post('/img', (req, res, next) => {
  res.send("got image");

  console.log(`got image req `, {req});
  console.log(`got image body`, req.body);

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


app.listen(port, function () {
  console.log(`server started and listening on ${port}`);
});
