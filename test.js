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

describe('POST /alma_webhook', () => {
    it('it should return an error if no signature passed', (done) => {
        chai.request(server)
            .post('/alma_webhook')
            .send({"body":"garble"})
            .end((err, res) => {
                expect(res.status, 401);
                assert.deepEqual(res.body, {"errorMessage": "Invalid Signature"});
                done();
            });
    });

    it("should accept a valid signature", (done) => {
        const req = chai.request(server)
                        .post("/alma_webhook")
                        .send({ string: "garble", action: "exl-event" })
                        .set('X-Exl-Signature', 'vPApXFBjxqVEykEJgDiD7dBuXqHvY8nIJdGrXUFXh4k=')
                        .end((err, res) => {
                            chai.expect(res).to.have.status(200);
                            chai.expect(res).to.be.json;
                            assert.deepEqual(res.body, { message: "Successful webhook received", action: "exl-event" })
                            done();
                        });
    });
});
