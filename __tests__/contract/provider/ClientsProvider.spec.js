const path = require('path');
const { Verifier } = require('@pact-foundation/pact');
const { server, importData } = require('../../../src/provider');
const SERVER_URL = 'http://localhost:8081';

server.listen(8081, () => {
  importData();
  console.log(`Clients Service listening on port ${SERVER_URL}`);
});

describe('Clients Service Verification', () => {
  it('Validates the expectations of Client Service', () => {
    let opts = {
      provider: 'ClientsService',
      logLevel: 'DEBUG',
      providerBaseUrl: SERVER_URL,
      pactUrls: ['http://localhost:8080/pacts/provider/ClientsService/consumer/Frontend/latest'],
      consumerVersionTags: ['dev'],
      providerVersionTags: ['dev'],
      publishVerificationResult: true, // NOTE: you should only enable this during CI builds. Generally you'd do something like `process.env.CI === 'true'`
      providerVersion: '1.0.3' // recommended to be the git sha
    };
    return new Verifier(opts)
      .verifyProvider()
      .then(output => {
        console.log('Pact verification complete!');
        console.log(output);
      });
  });
});
