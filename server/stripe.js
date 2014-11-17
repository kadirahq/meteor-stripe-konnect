var stripe = Npm.require('stripe');
var util = Npm.require('util');
__meteor_runtime_config__.stripe = {};
var Future = Npm.require('fibers/future');

Stripe = {
  api: null,
  options: null,
};

Stripe.configure = function(options) {
  this.api = new stripe();
  this.api.setApiKey(options.apiKey);
  this.options = options;
  this._setOnClient('appName', options.appName);
  this._setOnClient('appLogo', options.appLogo);
  this._setOnClient('publishableKey', options.publishableKey);
  this._syncWrapMethods();
};

Stripe._setOnClient = function(key, value) {
  __meteor_runtime_config__.stripe[key] = value;
};

Stripe._syncWrapMethods = function () {
  _.each(StripeResources, function (methods, resource) {
    Stripe[resource] = {};
    _.each(methods, function (name) {
      var context = Stripe.api[resource];
      var method = Stripe.api[resource][name];
      Stripe[resource][name] = function() {
        var args = _.toArray(arguments);
        var f = new Future();

        args.push(function(err, res) {
          if(err) {
            // stripe uses some custom error type
            // and it's doesn't play well with 
            // Meteor's error reporting 
            // and that's why we are using this
            var error = new Error(err.message);
            error.raw = err.raw;
            f.throw(error);
          } else {
            f.return(res);
          }
        });

        method.apply(context, args);
        return f.wait();
      };
    });
  });
}