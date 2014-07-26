/* globals describe, it */
'use strict';

var Rx = require('rx');

/**
 * Adds should method to Object.prototype
 * Also returns should Object that can be used with primitives
 */
require('chai').should();

describe('Lesson 4 - Events', function () {

  it('listening to events', function() {
      var received = '';
      var subscription =
          $(document)
              .toObservable('foo')
              .subscribe(function(e) { received += e.payload; });
      $(document).trigger({ type: 'foo', payload : 'M'});
      $(document).trigger({ type: 'foo', payload : 'A'});
      $(document).trigger({ type: 'foo', payload : 'T'});
      subscription.dispose();
      $(document).trigger({ type: 'foo', payload : 'T'});
      received.should.equal('MAT');
  });

  it('listening to the right events', function() {
      var received = '';
      var subscription =
          $(document)
              .toObservable('foo')
              .subscribe(function(e) { received += e.payload; });
      $(document).trigger({ type: 'foo', payload : 'M'});
      $(document).trigger({ type: 'bar', payload : 'A'});
      $(document).trigger({ type: 'foo', payload : 'T'});
      $(document).trigger({ type: 'foo', payload : 'T'});
      subscription.dispose();
      received.should.equal('MTT');
  });

});
