var StripeNode = Npm.require('stripe');
var util = Npm.require('util');
var stripeClientConfig = __meteor_runtime_config__.stripe = {};
var Future = Npm.require('fibers/future');

StripeKonnect = function(namespace) {
  this._namespace = namespace;
  this.api = null;
  this.options = null;
};

StripeKonnect.prototype.configure = function(options) {
  this.api = new StripeNode();
  this.api.setApiKey(options.apiKey);
  this.options = options;

  this._setOnClient('appName', options.appName);
  this._setOnClient('appLogo', options.appLogo);
  this._setOnClient('publishableKey', options.publishableKey);
  this._syncWrapMethods();
};

StripeKonnect.prototype._setOnClient = function(key, value) {
  if(!stripeClientConfig[this._namespace]) {
    stripeClientConfig[this._namespace] = {};
  }
  stripeClientConfig[this._namespace][key] = value;
};

StripeKonnect.prototype._syncWrapMethods = function () {
  var self = this;

  _.each(StripeResources, function (methods, resource) {
    self[resource] = {};
    _.each(methods, function (name) {
      var context = self.api[resource];
      var method = self.api[resource][name];
      self[resource][name] = function() {
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