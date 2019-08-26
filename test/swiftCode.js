const supertest = require("supertest");
const  should = require("should");
const mocha= require("mocha");
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
  

describe("Executing scenarios for parameter 'swift_code", function(){
it("valid swift code of 8 characters is passed for the payment_method:SWIFT, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "US", "Tom Philip", "124","ICBCUSBJ","11122233A"); 
    server.post('/bank')
    .send(cardWithValidInfo)
.end(function(err,res){
    console.log(res.body);
    res.status.should.equal(200);
    //res.body.should.equal({"success": "Bank details saved"});
    done();
    });
});

it("a swift code is passed for the payment_method: LOCAL, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("LOCAL", "US", "Tom Philip", "124","ICBCUSBJ","11122233A"); 
    server.post('/bank')
    .send(cardWithValidInfo)
.end(function(err,res){
    console.log(res.body);
    res.status.should.equal(200);
    //res.body.should.equal({"success": "Bank details saved"});
    done();
    });
});

it("a swift code is not passed for the payment_method: LOCAL, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("LOCAL", "US", "Tom Philip", "124","","11122233A"); 
    server.post('/bank')
    .send(cardWithValidInfo)
.end(function(err,res){
    console.log(res.body);
    res.status.should.equal(200);
    //res.body.should.equal({"success": "Bank details saved"});
    done();
    });
});

it("a swift code value of 11 characters with special character, alphanumeric is passed, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "US", "Tom Philip", "124","IC-7USc/BJr","11122233A"); 
    server.post('/bank')
    .send(cardWithValidInfo)
.end(function(err,res){
    console.log(res.body);
    res.status.should.equal(200);
    //res.body.should.equal({"success": "Bank details saved"});
    done();
    });
});

it("a swift code value of matching country code is passed, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "AU", "Ann Jose", "00X784b","ICBKAUBJ45h","11122233A","123456"); 
    server.post('/bank')
    .send(cardWithValidInfo)
.end(function(err,res){
    console.log(res.body);
    res.status.should.equal(200);
    //res.body.should.equal("success": "Bank details saved");
    done();
    });
});
//***********Negative scenarios*******************/
it("a swift code value of matching country code is passed, verify status 400 response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "CN", "Ann Jose", "00X784b","11122233A","123456"); 
    server.post('/bank')
    .send(cardWithValidInfo)
.end(function(err,res){
    console.log(res.body);
    res.status.should.equal(400);
   // res.body.should.equal({"error": "'swift_code' is required when payment method is 'SWIFT'"});
    done();
    });
});

it("a swift code value of 7 characters is passed, verify status 400 response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "CN", "Ann Jose", "00X784b","IC-7CNc", "11122233A","123456"); 
    server.post('/bank')
    .send(cardWithValidInfo)
.end(function(err,res){
    console.log(res.body);
    res.status.should.equal(400);
    //res.body.should.equal({"error": "Length of 'swift_code' should be either 8 or 11"});
    done();
    });
});

it("a swift code value of more than 11 characters is passed, verify status 400 response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "CN", "Ann Jose", "00X784b","IC-7CNc56789A", "11122233A","123456"); 
    server.post('/bank')
    .send(cardWithValidInfo)
.end(function(err,res){
    console.log(res.body);
    res.status.should.equal(400);
    //res.body.should.equal({"error": "Length of 'swift_code' should be either 8 or 11"});
    done();
    });
});

it("a swift code of invalid 5th or 6th character is passed, verify status 400 response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "CN", "Ann Jose", "00X784b","IC-7CNc56789A", "11122233A","123456"); 
    server.post('/bank')
    .send(cardWithValidInfo)
.end(function(err,res){
    console.log(res.body);
    res.status.should.equal(400);
    //res.body.should.equal({"error": "Length of 'swift_code' should be either 8 or 11"});
    done();
    });
});
});