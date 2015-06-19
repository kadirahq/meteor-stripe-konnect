loadScript('https://js.stripe.com/v2/', function (err) {
  if (!err) {
    loadScript('https://checkout.stripe.com/checkout.js', function (err) {
      if (!err) {
        loadStripeAPI();
      } else {
        throw new Meteor.Error("Stripe resources loading failed."); 
      }
    });
  } else {
    throw new Meteor.Error("Stripe resources loading failed.");
  }
});

function loadStripeAPI() {
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
}