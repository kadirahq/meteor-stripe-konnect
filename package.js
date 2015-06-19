Package.describe({
  summary: "Stripe payment gateway integration",
  version: "1.0.0",
  name: "meteorhacks:stripe"
});

Npm.depends({
  'stripe': '2.8.0',
  'load-script': '1.0.0'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.1.1');
  api.use('underscore', 'server');
  api.use('templating', 'client');
  api.use(['cosmos:browserify@0.2.0'], 'client');
  api.addFiles('client.browserify.js', 'client');
  api.addFiles('client/stripe.js', 'client');
  api.addFiles('server/resources.js', 'server');
  api.addFiles('server/stripe.js', 'server');
  api.export('Stripe', 'server');
  api.export('stripeReady', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('stripe');
  api.addFiles('tests/client.js', 'client');
  api.addFiles('tests/server.js', 'server');
});
