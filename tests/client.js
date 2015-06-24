Tinytest.addAsync(
'StripeUtils.ready to wait loading', 
function (test, done) {
  StripeUtils.ready(function() {
    test.equal(typeof Stripe, 'function');
    done();
  });
});

Tinytest.addAsync(
'StripeUtils.ready calling multiple times in nested manner', 
function (test, done) {
  StripeUtils.ready(function() {
    StripeUtils.ready(function() {
      test.equal(typeof Stripe, 'function');
      done();
    });
  });
});
