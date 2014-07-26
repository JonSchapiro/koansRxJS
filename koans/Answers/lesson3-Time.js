/* globals describe, it, expect */
'use strict';

var
    Rx      = require('rx'),
    expect  = require('chai').expect
;

/**
 * Adds should method to Object.prototype
 * Also returns should object to be used with primitives
 */
require('chai').should();
/*
 * Step 1: find the 1st method that fails
 * Step 2: Fill in the blank ____ to make it pass
 * Step 3: run it again
 * Note: Do not change anything other than the blank
 */

describe('Lesson 3 - Time', function () {

  it('LaunchingAnActionInTheFuture', function(done) {
      var received = '';
      var delay = 250;
      Rx
        .Scheduler
        .immediate
        .schedule(function() {
          received = 'Finished';
        }, delay)
      ;
      setTimeout(function() {
        received.should.equal('Finished');
        done();
      }, 500);
  });

  it('LaunchingAnEventInTheFuture', function(done) {
      var received = '',
          time = 250;
      Rx
        .Observable
        .returnValue('Godot', Rx.Scheduler.Immediate)
        .delay(time)
        .subscribe(function(x) { received = x; })
      ;
      setTimeout(function() {
        received.should.equal('Godot');
        done();
      }, 500);
  });

  it('AWatchedPot', function(done) {
    var received = '',
      delay = 500,
      timeout = 650,
      timeoutEvent =
        Rx.Observable
          .returnValue('Tepid')
    ;
    Rx.Observable
      .returnValue('Boiling')
      .delay(delay)
      .timeout(timeout, timeoutEvent)
      .subscribe(function(x) { received = x; })
    ;
    setTimeout(function() {
      received.should.equal('Boiling');
      done();
    }, 500);
  });

});
