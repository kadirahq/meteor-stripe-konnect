Meteor.startup(function () {

  Stripe = window.Stripe;
  StripeCheckout = window.StripeCheckout;
  var config = __meteor_runtime_config__.stripe;

  Stripe.getCheckoutHandler = function (options) {
    return StripeCheckout.configure(_.defaults(_.clone(options), {
      name: config.appName,
      key: config.publishableKey,
      image: config.appLogo,
    }));
  };

});
