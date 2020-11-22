require('dotenv').config();
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
  
    // Body parser middleware
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    // Routes
    const schema = require('./graphql');
    const schemaConfig = graphqlHTTP({
      schema,
      graphiql: true,
    });
    const health = require('./routes/health');
    const destinations = require('./routes/destinations');
    const blog = require('./routes/blog');
    const contentful = require('./routes/contentful');
    const itineraries = require('./routes/itineraries');
    const upload = require('./routes/upload');
    const users = require('./routes/users');
    const profiles = require('./routes/profiles');

    server.use('/api/graphql', schemaConfig);
    server.use('/api', health);
    server.use('/api', destinations);
    server.use('/api', blog);
    server.use('/api', contentful);
    server.use('/api', itineraries);
    server.use('/api', upload);
    server.use('/api', users);
    server.use('/api', profiles);

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.get('/manage-itinerary/:id', (req, res) => {
      const actualPage = '/manage-itinerary';
      const queryParams = { id: req.params.id };
      console.log('/manage-itinerary/:id on the server', queryParams);
      return app.render(req, res, actualPage, queryParams);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on port: ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
