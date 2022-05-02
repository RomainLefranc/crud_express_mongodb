const chai = require("chai");
var expect = require("chai").expect;
var should = require("chai").should();
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

// This is just for organisation and reporting
describe("Test", function () {
  describe("POST cours/crud/create", () => {
    it("It should create a course", (done) => {
      chai
        .request("http://localhost:3000")
        .post("/cours/crud/create")
        .type("form")
        .send({
          name: "test",
        })
        .end(function (err, res) {
          expect(res).to.have.status(200);
        });
      done();
    });
  });

  describe("POST personne/crud/create", () => {
    it("It should create a person", (done) => {
      chai
        .request("http://localhost:3000")
        .post("/personne/crud/create")
        .type("form")
        .send({
          name: "test",
          genre: "homme",
        })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
        });
      done();
    });
  });
});
