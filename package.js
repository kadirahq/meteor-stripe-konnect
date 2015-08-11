Package.describe({
  summary: "Stripe for Meteor Apps",
  version: "3.0.0",
  name: "kadira:stripe-konnect",
  git: 'https://github.com/kadirahq/meteor-stripe-konnect.git'
});

Npm.depends({
  'stripe': '2.8.0'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');
  api.use('underscore', 'server');
  // to load scripts dynamically
  api.use('kadira:dochead@1.0.0', 'client');

  api.addFiles('client/stripe.js', 'client');
  api.addFiles('server/resources.js', 'server');
  api.addFiles('server/stripe.js', 'server');
  api.export('StripeKonnect', ['server', 'client']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('kadira:stripe-konnect');
  api.addFiles('tests/init.js', 'server');
  api.addFiles('tests/client.js', 'client');
  api.addFiles('tests/server.js', 'server');
});
