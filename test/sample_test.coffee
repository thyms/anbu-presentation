require 'mocha-cakes'
chai = require('chai')
chai.should()

Feature "New Feature",
  "In order to use cool feature",
  "as a new user",
  "I want do include this", ->

    Scenario "Singing", ->
      voice = null

      Given "I am a good singing", ->
        voice = 'good'
      When "I sing", ->
        voice = 'good'
      Then "it should sound good", ->
        voice.should.be.eql 'good'
