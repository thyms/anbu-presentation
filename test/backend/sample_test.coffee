chai = require('chai')
chai.should()

describe "sqrt", ->
  it "should throw an exception if given a negative number", ->
    (2 + 2).should.be.eql 4