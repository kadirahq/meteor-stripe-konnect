StripeUtils = {
  _onReadyCallbacks: [],
  _loaded: false
};

StripeUtils.ready = function(cb) {
  if(this._loaded) {
    cb();
  } else {
    this._onReadyCallbacks.push(cb);
  }
};

function startLoading() {
  loadScript('https://js.stripe.com/v2/', function (err) {
    if (!err) {
      loadScript('https://checkout.stripe.com/checkout.js', function (err) {
        if (!err) {
          loadStripeAPI();
        } else {
          throw new Error("Stripe api v2 loading failed."); 
        }
      });
    } else {
      throw new Error("Stripe checkout loading failed.");
    }
  });
}

function loadStripeAPI() {
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

  _.each(StripeUtils._onReadyCallbacks, function(fn) {
    fn();
  });
  StripeUtils._loaded = true;
}

// wait until DOM is ready
Meteor.startup(function() {
  startLoading();
});