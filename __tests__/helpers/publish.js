let path = require('path');
let publishser = require('@pact-foundation/pact-node');

let opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), '__tests__/contract/pacts')],
  pactBroker: 'http://localhost:8080',
  consumerVersion: '1.0.0',
  providerVersion: '1.0.0',
  tags: 'dev'
};

publishser.publishPacts(opts);
