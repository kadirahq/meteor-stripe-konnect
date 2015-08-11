var stripe = new StripeKonnect('test');
stripe.configure({
  appName: 'Application Name',
  appLogo: 'http://mysite.com/assets/logo.png',
  apiKey: 'STRIPE_API_KEY',
  publishableKey: 'STRIPE_PUBLISHABLE_KEY',
});