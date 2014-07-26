/* globals describe, it */
'use strict';

var Rx = require('rx');

/**
 * Adds should method to Object.prototype
 * Also returns should Object that can be used with primitives
 */
require('chai').should();

describe('Lesson 6 - Advanced Streams', function () {

  it('Merging', function() {
      var easy = [],
        you  = Rx.Observable.fromArray([1,2,3]),
        me   = Rx.Observable.fromArray(['A','B','C'])
      ;
      you.merge(me)
        .subscribe(function(a) { easy.push(a); })
      ;
       easy.should.deep.equal([1, 'A', 2, 'B', 3, 'C']);// || '1 2 3 A B C ');
  });
  /*
  // Given a 1-based index n, produces a function that will pluck the n-th
  // item from any Enumerable and return it. Pluck produces a function so
  // that it can be mapped over Enumerables of Enumerables, say to produce
  // a columnar slice from an array.  WARNING: these are 1-based indices!
  var pluck = function (n) {
      return function(xs) {
          if (n <= 0 || n > xs.count) {throw new Error('index out of range');}
          return xs.elementAt(n - 1);
      };
  };
  // Given a 1-based index n, produces a function that will produce an
  // Enumerable with the n-th item missing.  WARNING: these are 1-based
  // indices!
  var coPluck = function(n) {
      return function(xs) {
          // is the following error-checking redundant?  The error-handling
          // policy of Ix is not clear to me at this point! (4 Nov 12)
          // if (! (xs instanceof Ix.Enumerable) )
          //     throw new Error('xs must be an Ix.Enumerable');
          var c = xs.count();
          if (n <= 0 || n > c) {throw new Error('index out of range');}
          var ys = [];
          var i = 1;
          xs.forEach( function (x) {
              if (i !== n) {ys.push(x);}
              i++;
          });
          return ys.toEnumerable();
      };
  };
  // A function that compares arrays for equality given an optional
  // elementComparer. Be aware that this is not sufficiently flexible
  // to work on arrayw of arbitrary nesting.
  var arrayComparer = function (xs, ys, elementComparer) {
      if ( (! (xs instanceof Array)) || (! (ys instanceof Array)) )
          return false;
      var xl = xs.length;
      var yl = ys.length;
      if (xl != yl)
          return false;
      elementComparer || (elementComparer = function(x, y) { return x === y; });
      var i;
      for (i = 0; i < xl; i++)
          if (! elementComparer(xs[i], ys[i]))
              return false;
      return true;
  };
  // Produces an Enumerable of all splits of another Enumerable, as an
  // Enumerable of pairs of left and right after the splits. A more
  // sophisticated implementation would build the nested enumerators.
  var splits = function(xs) {
      var c = xs.count();
      var ys = [];
      for (var i = 0; i <= c; i++)
          // ys.push( [xs.take(i), xs.skip(i)].toEnumerable() );
          ys.push( [xs.take(i).toArray().slice(0).toEnumerable(),
                    xs.skip(i).toArray().slice(0).toEnumerable()]
               .toEnumerable() );
      return ys.toEnumerable();
  };
  // Produces an Enumerable of all riffles of two other Enumerables.  A more
  // sophisticated implementation would build the nested enumerators.
  var riffles = function(left, right) {
      if (left.count() === 0)
          return Ix.Enumerable.returnValue(right);
      if (right.count() === 0)
          return Ix.Enumerable.returnValue(left);
      var ys = [];
      splits(right).skip(1).take(1).forEach( function(r)
      {   splits(left).forEach( function(l)
          {   riffles(l.elementAt(1), r.elementAt(1)).forEach( function(f)
              {   ys.push(l.first().concat(r.first()).concat(f));
      }); }); });
      return ys.toEnumerable();
  };

/*
  it('Riffles', function() {
      var e = [1, 2, 3].toEnumerable();
      expect(e.contains(2), true);
      expect(e.count(), 3);
      expect([[1, 2], [3, 4]].toEnumerable().contains([3, 4], arrayComparer), true);
      e.forEach(function (x) { expect( pluck(x)(e), x ); });
      // Expecting exceptions to be thrown
      try { pluck(0)(e); expect(false, true); }
      catch (exception) { expect(true, true); }
      try { pluck(4)(e); expect(false, true); }
      catch (exception) { expect(true, true); }
      try { pluck(-2)(e); expect(false, true); }
      catch (exception) { expect(true, true); }
      expect( arrayComparer(coPluck(2)(e).toArray(), [1, 3]), true );
      expect( arrayComparer(riffles(e, Ix.Enumerable.empty()).first().toArray(),
                            e.toArray()), true);
      expect( arrayComparer(riffles(Ix.Enumerable.empty(), e).first().toArray(),
                            e.toArray()), true);
      expect( riffles([1,2,3].toEnumerable(), [4,5,6].toEnumerable())
          .select(function (riffle) {return riffle.toArray();})
          .contains([1,2,4,5,3,6], arrayComparer),
          true);
  });
  var floatingexpect = function (a, b, digits) {
      var exponent = Math.abs( digits || 12 );
      var multiplier = Math.pow(10, exponent);
      return Math.round( multiplier * a ) === Math.round( multiplier * b);
  };
  it('DescriptiveStatistics', function () {
      var e = [1, 2, 3].toEnumerable();
      expect(e.standardDeviation(), 1);
      expect(floatingexpect(
          [1, 2].toEnumerable().standardDeviation(),
          1 / Math.sqrt(2)), true);
      // Should be sqrt ( (1^2 + 2^2 + 4^2 - 7^2 / 3) / 2 )
      // = sqrt( (1 + 4 + 16 - 49 / 3) / 2 )
      // = sqrt( (21 - 49 / 3) / 2 )
      // = sqrt( (63 - 49) / 6 )
      // = sqrt( 14 / 6 )
      // = sqrt( 7 / 3 )
      expect(floatingexpect(
          [1, 2, 4]
              .toEnumerable()
              .standardDeviation(),
          Math.sqrt(7 / 3)), true);

      [1, 2, 4]
          .toObservable()
          .standardDeviation()
          .subscribe(function (s) {
              console.log(s);
              expect(floatingexpect(s, Math.sqrt(7 / 3)), true); });
  });
*/
  it('Splitting Up', function() {
      var
          oddsAndEvens = ['',''],
          numbers = Rx.Observable.range(1, 9),
          split = numbers.groupBy(function(n) { return n % 2 ; })
      ;

      split.subscribe(function(group) {
        group.subscribe(function(n) {
          oddsAndEvens[group.key] += n; });
      });

      var
          evens = oddsAndEvens[0],
          odds = oddsAndEvens[1]
      ;

      evens.should.equal('2468');
      odds.should.equal('13579');
  });

  it('Subscribe Imediately When Splitting', function() {
      var averages = [0.0,0.0],
          numbers = Rx.Observable.fromArray([22,22,99,22,101,22]),
          split = numbers
            .groupBy(function(n) { return n % 2; });
      split
        .subscribe(function(group) {
          group.average()
            .subscribe(function(a) { averages[group.key] = a; });
      });
      averages[0].should.equal(22);
      averages[1].should.equal(100);
  });

  it('Multiple Subscriptions', function() {
      var
          sum = 0,
          average = 0,
          numbers = new Rx.Subject()
      ;

      numbers
        .sum()
        .subscribe(function(n) { sum = n; })
      ;

      numbers.onNext(1);
      numbers.onNext(1);
      numbers.onNext(1);
      numbers.onNext(1);
      numbers.onNext(1);

      numbers
        .average()
        .subscribe(function(n) {
          average = n;
        })
      ;

      numbers.onNext(2);
      numbers.onNext(2);
      numbers.onNext(2);
      numbers.onNext(2);
      numbers.onNext(2);

      numbers.onCompleted();

      sum.should.equal(15);
      average.should.equal(2);
  });
});
