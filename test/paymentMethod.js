const  should = require("should");
const mocha = require("mocha");
const supertest = require("supertest");
var fs = require("fs");

var configDir = "/Users/macbookpro/JavaScriptMocha/AirwallexTest/Test/test.config";
var urlInfo = fs.readFileSync(configDir).toString();
var url = urlInfo.substring(4);
var server = supertest.agent(url);

function setBankInfo(payMethod, countryCode, accountName, accountNum, swiftCode, aba, bsb ) {
    return {
      payment_method: payMethod,
      bank_country_code: countryCode,
      account_name: accountName,
      account_number: accountNum,
      swift_code: swiftCode,
      aba: aba,
      bsb:bsb
    };
  }

describe("Executing scenarios for parameter 'payment_method", function(){
it("value of 'SWIFT' is passed, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "US", "Matt Smith", "124","ICBCUSBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(200);
    console.log(res.body);
    done();
});
});

it("value of 'LOCAL' is passed, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("LOCAL", "US", "John Smith", "124","ICBCUSBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(200);
    console.log(res.body);
    done();
});
});

it("parameter name payment_method is missing, verify 400 is returned", function(done){
    server.post('/bank')
    .send({
    bank_country_code: "US",
    account_name: "John Smith",
    account_number: "124", 
    swift_code: "ICBCUSBJ", 
    aba: "11122233A"
    })
.end(function(err,res){
    res.status.should.equal(400);
    console.log(res.body);
   // res.body.should.
    done();
});
});

it("parameter name payment_method is passed incorrectly, verifying status 400 is returned", function(done){
    server.post('/bank')
    .send({
    payt_method: "LOCAL", 
    bank_country_code: "US",
    account_name: "John Smith",
    account_number: "124", 
    swift_code: "ICBCUSBJ", 
    aba: "11122233A"
    })
.end(function(err,res){
    res.status.should.equal(400);
    console.log(res.body);
   // res.body.should.exist('field required');
    done();
});
});

it("invalid value passed, verify 400 is returned", function(done){
    var cardWithValidInfo = setBankInfo("LLOCAL", "US", "SAM JOSE", "124","ICBCUSBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(400);
    console.log(res.body);
  //  res.body.should.
    done();
});
});

it("null value passed, verify 400 is returned", function(done){
    var cardWithValidInfo = setBankInfo("", "US", "SAM JOSE", "124","ICBCUSBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(400);
    console.log(res.body);
   // res.body.should.
    done();
});
});

it("value SWIFT is passed with a space at the end, verify 400 is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT ", "US", "SAM JOSE", "124","ICBCUSBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(400);
    console.log(res.body);
   // res.body.should.
    done();
});
});

it("case sensitive value is passed, verify 400 is returned", function(done){
    var cardWithValidInfo = setBankInfo("swift", "US", "SAM JOSE", "124","ICBCUSBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(400);
    console.log(res.body);
   // res.body.should.
    done();
});
});
});
             
   
