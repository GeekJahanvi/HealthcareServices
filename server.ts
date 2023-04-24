/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import bodyParser from 'body-parser';
import loader from './helpers/loader';

const port = 8000;
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// App Routes
(async () => {
  // Loading Functions...
  app.use(await loader('functions'));
})();

app.get('/', (req, res) => {
  res.send({ name: 'Hello World' });
});

// App Listen
app.listen(port, () => {
  console.log(`Action listening on port ${port}`);
});
