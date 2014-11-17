Tinytest.add('set publishable key', function (test) {
  __meteor_runtime_config__.stripe = {};
  Stripe.setPublishableKey.call({}, '_key');
  test.equal(__meteor_runtime_config__.stripe.publishableKey, '_key');
});
