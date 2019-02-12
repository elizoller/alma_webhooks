process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./dist/server.test');
let expect = chai.expect;
let assert = chai.assert;


chai.use(chaiHttp);

describe('GET /alma_webhook', () => {
    it('it should GET an alma_webhook', (done) => {
        chai.request(server)
            .get('/alma_webhook?challenge=toast')
            .end((err, res) => {
                expect(res.status, 200);
                assert.deepEqual(res.body, {'challenge': 'toast'});
                done();
            });
    });
});

describe('GET /alma_webhook', () => {
    it('it should GET an alma_webhook', (done) => {
        chai.request(server)
            .get('/alma_webhook')
            .end((err, res) => {
                // ?challenge = toast
                res.should.have.status(200);
                res.body.should.equal({});
                // res.body.should.have.property('challenge');
                done();
            });
    });
});
