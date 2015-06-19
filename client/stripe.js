loadScript('https://js.stripe.com/v2/', function (err, script) {
  if (!err) {
    loadScript('https://checkout.stripe.com/checkout.js', function (err, script) {
      if (!err) {
        Meteor.startup(function () {

          Stripe = window.Stripe;
          StripeCheckout = window.StripeCheckout;
          var config = __meteor_runtime_config__.stripe;

          Meteor.defer(function() {
            Stripe.getCheckoutHandler = function (options) {
              return StripeCheckout.configure(_.defaults(_.clone(options), {
                name: config.appName,
                key: config.publishableKey,
                image: config.appLogo,
              }));
            };
          });
        });
      }
    });
  }
});