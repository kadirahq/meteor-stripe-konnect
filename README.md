Stripe for Meteor
=================

* work in progress *

Features
--------

 - All Stripe methods can be used synchronously (uses fibers)

Installation
------------

Initialize stripe on server side.

~~~js
Stripe.configure({
  appName: 'Application Name',
  appLogo: 'http://mysite.com/assets/logo.png',
  apiKey: 'STRIPE_API_KEY',
  publishableKey: 'STRIPE_PUBLISHABLE_KEY',
});
~~~
