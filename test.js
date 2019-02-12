process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./dist/server.test');
let should = chai.should();


chai.use(chaiHttp);

describe('GET /', () => {
    it('it should return hello world', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                console.log(res.body);
                res.body.should.equal('Hello World!');
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
