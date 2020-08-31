'use strict'

const { Matchers } = require('@pact-foundation/pact');
const { getClients, postClient } = require('../../../src/consumer');

describe('Clients Service', () => {
  const GET_EXPECTED_BODY = [
    {
      "firstName": "Lisa",
      "lastName": "Simpson",
      "age": 8,
      "id": 1
    },
    {
      "firstName": "Wonder",
      "lastName": "Woman",
      "age": 30,
      "id": 2
    },
    {
      "firstName": "Homer",
      "lastName": "Simpson",
      "age": 39,
      "id": 3
    }
  ];

  afterEach(() => provider.verify());

  describe('GET Clients', () => {
    beforeEach(() => {
      const interaction = {
        state: 'I have a list of clients',
        uponReceiving: 'A request for all clients',
        withRequest: {
          method: 'GET',
          path: '/clients',
          headers: {
            Accept: 'application/json, text/plain, */*'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: GET_EXPECTED_BODY
        }
      };
      return provider.addInteraction(interaction)
    });

    test('returns correct body, header, and statusCode', async () => {
      const response = await getClients();

      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(response.data).toEqual(GET_EXPECTED_BODY);
      expect(response.status).toEqual(200);
    });
  });

  const POST_BODY = {
    firstName: 'Walmyr',
    lastName: 'Filho',
    age: 38
  };

  const POST_EXPECTED_BODY = {
    firstName: POST_BODY.firstName,
    lastName: POST_BODY.lastName,
    age: POST_BODY.age,
    id: 3
  }

  describe('POST Client', () => {
    beforeEach(() => {
      const interaction = {
        state: 'I create a new client',
        uponReceiving: 'A request to create client with firstName, lastName, and age',
        withRequest: {
          method: 'POST',
          path: '/clients',
          headers: {
            "Content-Type": 'application/json;charset=utf-8'
          },
          body: POST_BODY
        },
        willRespondWith: {
          status: 200,
          body: Matchers.like(POST_EXPECTED_BODY).contents
        }
      };

      return provider.addInteraction(interaction);
    });

    test('returns correct body, header and statusCode', async () => {
      const response = await postClient(POST_BODY);
      console.log(response.data);

      expect(response.data.id).toEqual(3);
      expect(response.status).toEqual(200);
    });
  });
});
