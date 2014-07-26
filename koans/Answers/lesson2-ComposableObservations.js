/* globals describe, it, expect */
'use strict';

var
    Rx      = require('rx'),
    expect  = require('chai').expect
;

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

describe('Lesson 2 - Composable Observations', function () {
  it('ComposableAddition', function() {
      var received = 0;
      Rx.Observable
        .fromArray([10, 100, 1000]).sum()
        .subscribe(function(x) { received = x; })
      ;
      received.should.equal(1110);
  });

  it('ComposeableBeforeAndAfter', function() {
      var
          a = '',
          b = ''
      ;
      Rx.Observable
        .range(1, 6)
        .doAction(function(n) { a += n.toString(); })
        .where(function(n) { return n % 2 === 0; })
        .doAction(function(n) { b += n.toString(); })
        .subscribe();
      a.should.equal('123456');
      b.should.equal('246');
  });

  it('WeWroteThis', function() {
      var received = [];
      Rx.Observable.fromArray([
        'BerkeleyTrue',
        'Bart',
        'Wes',
        'Erik',
        'Matthew',
        'Brian'
      ])
        .where(function(n) { return n.length <= 4; })
        .subscribe(function(x) { received.push(x); })
      ;
      received.toString().should.equal('Bart,Wes,Erik');
  });

  it('ConvertingEvents', function() {
      var received = '';
      Rx.Observable.fromArray([
        'wE',
        'hOpE',
        'yOU',
        'aRe',
        'eNJoyIng',
        'tHiS'
      ])
        .select(function(x) { return x.toLowerCase(); })
        .subscribe(function(x) { received += x + ' '; })
      ;
      received.should.equal('we hope you are enjoying this ');
  });

  it('CreatingAMoreRelevantEventStream', function() {
      var received = '',
          mouseXMovements = [100, 200, 150],
          windowTopX = 50,
          relativemouse = Rx.Observable
            .fromArray(mouseXMovements)
            .select(function(x) { return x - windowTopX; })
      ;

      relativemouse.subscribe(function(x) { received += x + ', '; });
      received.should.equal('50, 150, 100, ');
  });

  it('CheckingEverything', function() {
      var received = null;
      var numbers = [ 2, 4, 6, 8 ];
      Rx.Observable.fromArray(numbers)
          .all(function(x) { return x % 2 === 0; })
          .subscribe(function(x) { received = x; });
      received.should.equal(true);
  });

  it('CompositionMeansTheSumIsGreaterThanTheParts', function() {
      var numbers = Rx.Observable.range(1, 10);
      numbers
        .where(function(x) { return x > 8; })
        .sum()
        .subscribe(function(x) {
          expect(19).to.equal(x);
        })
      ;
  });
});
