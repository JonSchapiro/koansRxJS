/* globals describe, it */
'use strict';
var rx = require('rx');

/**
 * Adds should method to Object.prototype
 * Also returns should Object that can be used with primitives
 */
require('chai').should();

/*
 * Step 1: find the 1st method that fails
 * Step 2: Fill in the blank ____ to make it pass
 * Step 3: run it again
 * Note: Do not change anything other than the blank
 */

describe('Lesson 1 - Observable Streams', function () {
  it('can be used with simple arrays', function () {
    var arrayStream = rx.Observable.fromArray([1, 2, 3]);
    arrayStream.first().subscribe(function (x) {
      x.should.equal(1);
    });
  });

  it('should work with simple subscription', function() {
    rx.Observable
      .returnValue(42)
      .subscribe(function(x) {
        x.should.equal(42);
      })
    ;
  });

  it('should return string', function() {
      var received = '';
      rx.Observable
        .returnValue('Foo')
        .subscribe(function(x) { received = x; });
        received.should.equal('Foo')
      ;
  });

  it('should return the last event', function() {
      var received = '';
      var numbers = ['Foo','Bar'];
      rx.Observable
        .fromArray(numbers)
        .subscribe(function(x) { received = x; })
      ;
      received.should.equal('Bar');
  });

  it('EveryThingCounts', function() {
      var received = 0;
      var numbers = [3, 4 ];
      rx.Observable
        .fromArray(numbers)
        .subscribe(function(x) { received += x; })
      ;
      received.should.equal(7);
  });

  it('DoingInTheMiddle', function() {
    var status = [];
    var daysTillit = rx.Observable.range(1, 4);
    daysTillit
      .doAction(function(d) {
        status.unshift(
           d + '=' + (d === 1 ? 'Study Like Mad' : 'Party')
        );
      })
      .subscribe()
    ;
    status.toString().should.equal('4=Party,3=Party,2=Party,1=Study Like Mad');
  });

  it('NothingListensUntilYouSubscribe', function() {
      var sum = 0;
      var numbers = rx.Observable
        .range(1,10)
        .doAction(
          function(n) {
          sum += n;
        })
      ;

      sum.should.equal(0);

      numbers.subscribe();

      sum.should.equal(55);
  });
});
