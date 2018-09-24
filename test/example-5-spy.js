/*
Mock internal functions
*/

var chai = require("chai");
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var assert = chai.assert;

// bring in sinon for function mocking
var sinon = require("sinon");

var fetch = require('../src/fetchjson')

sinon.spy(fetch, 'fetchJSON')

var StockService = require('../src/stocks')

describe("StockService", function() {
  describe("#getStockLatestPrice()", function() {
    
    this.timeout(15000)

    it("should throw an exception when no argument passed", async function() {
       
      await assert.eventually.isDefined(StockService.getStockLatestPriceDifferences('fb', 'tsla'))
      
      // spys allow us to query how it has been used
      assert.equal(fetch.fetchJSON.callCount, 2)
      
      // spys allow us to check that the method was called as expected
      assert.isTrue(fetch.fetchJSON.calledWith(sinon.match.string))
    });
  });
});