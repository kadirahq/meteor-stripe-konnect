Tinytest.addAsync(
'StripeKonnect - Wait in client side and initialize the api', 
function (test, done) {
  var stripe = new StripeKonnect('test');
  stripe.ready(function() {
    test.equal(typeof window.Stripe, 'function');
    var handle = stripe.getCheckoutHandler({});

    test.equal(typeof handle.open, 'function');
    done();
  });
});

Tinytest.addAsync(
'StripeKonnect - calling ready multiple times', 
function (test, done) {
  var stripe = new StripeKonnect('test');
  stripe.ready(function() {
    stripe.ready(done);
  });
});
