StripeKonnect = function(namespace) {
  this._namespace = namespace;
};

// These are singletons.
StripeKonnect._loaded = false;
StripeKonnect._onReadyCallbacks = [];

StripeKonnect.prototype.ready = function(cb) {
  if(StripeKonnect._loaded) {
    cb();
  } else {
    StripeKonnect._onReadyCallbacks.push(cb);
  }
};

function startLoading() {
  DocHead.loadScript('https://js.stripe.com/v2/', function (err) {
    if(err) {
      throw new Error("Stripe checkout loading failed.");
    }

    DocHead.loadScript('https://checkout.stripe.com/checkout.js', function (err) {
      if(err) {
        throw new Error("Stripe api v2 loading failed."); 
      }

      loadStripeAPI();
    });
  });
}

function loadStripeAPI() {
  var Stripe = window.Stripe;
  var StripeCheckout = window.StripeCheckout;
  var stringConfig = __meteor_runtime_config__.stripe;

  // Add the getCheckoutHandler prototype once initiated
  StripeKonnect.prototype.getCheckoutHandler = function (options) {
    var config = stringConfig[this._namespace];
    return StripeCheckout.configure(_.defaults(_.clone(options), {
      name: config.appName,
      key: config.publishableKey,
      image: config.appLogo,
    }));
  };

  _.each(StripeKonnect._onReadyCallbacks, function(fn) {
    fn();
  });
  StripeKonnect._loaded = true;
}

// wait until DOM is ready
Meteor.startup(function() {
  startLoading();
});