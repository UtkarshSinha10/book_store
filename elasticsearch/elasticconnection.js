/* eslint-disable new-cap */
const elastic = require('elasticsearch');

const elasticClient = elastic.Client({
  host: process.env.elasticsearchhost,
});

module.exports = {
  elasticClient,
};
