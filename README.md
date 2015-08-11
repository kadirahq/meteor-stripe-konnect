# Stripe for Meteor Apps

## Installation

```
meteor add kadira:stripe-konnect
```

## Features

 - All Stripe methods can be used synchronously (uses fibers)
 - Load StripeCheckout in client side asynchronosly
 - Automatic client side configurations
 - Ability to use multiple Stripe accounts at once

## Usage

First, initialize Stripe configurations on the server side:

~~~js
// namespace is just an string, which allows you to use 
// multiple stripe accounts at the sametime.
var namespace = "production";
var stripe = new StripeKonnect(namespace);
stripe.configure({
  appName: 'Application Name',
  appLogo: 'http://mysite.com/assets/logo.png',
  apiKey: 'STRIPE_API_KEY',
  publishableKey: 'STRIPE_PUBLISHABLE_KEY',
});
~~~

After that, you can use any Stripe [NodeJS](https://stripe.com/docs/api/node) API in sync manner inside both methods and publications using the `stripe` object

### Stripe Checkout

You can easily get a Stripe Checkout handle like in the client:

~~~js
// namespace is just an string, which allows you to use 
// multiple stripe accounts at the sametime.
var namespace = "production";
var stripe = new StripeKonnect(namespace);
// Wait until Stripe JS apis are loaded
stripe.ready(function() {
  var handle = stripe.getCheckoutHandler({
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