Stripe for Meteor
=================

* work in progress *

Features
--------

 - All Stripe methods can be used synchronously (uses fibers)
 - Load client side resource asynchronously

## Usage

First, initialize Stripe configurations on the server side:

~~~js
Stripe.configure({
  appName: 'Application Name',
  appLogo: 'http://mysite.com/assets/logo.png',
  apiKey: 'STRIPE_API_KEY',
  publishableKey: 'STRIPE_PUBLISHABLE_KEY',
});
~~~

After that, you can use any Stripe Node API in sync manner inside both methods and publications.

### Stripe Checkout

You can easily get a Stripe Checkout handle like this:

~~~js
// Wait until Stripe JS apis are loaded
StripeUtils.ready(function() {
  var handle = Stripe.getCheckoutHandler({
    amount: 0,
    description: plan.description,
    panelLabel: "Subscribe",
    token: function(cardInfo) {
      // do something with the card
      // usually you'll need to call a Meteor method
    }
  });

  handle.open();
});
~~~



