const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Todd DeSpain');
});

module.exports = routes;
