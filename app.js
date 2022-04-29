const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if(urlParams.get('publishableKey') != null){
    const stripe = Stripe(urlParams.get('publishableKey'))
}
else{
 const stripe = stripe(urlParams.get('payment_intent_client_secret'));
}



const options = {
    clientSecret: urlParams.get('paymentIntent'),
    appearance: {/*...*/},
  };

  
  // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 2
  const elements = stripe.elements(options);


  
  // Create and mount the Payment Element
  const paymentElement = elements.create('payment');
  paymentElement.mount('#payment-element');

  const form = document.getElementById('payment-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {error} = await stripe.confirmPayment({
    //`Elements` instance that was used to create the Payment Element
    elements,
    confirmParams: {
      return_url: window.location.href,
    },
  });

  https://stripe-devlab.vercel.app/?success=trueee&payment_intent=pi_3KtbGlJ36F2VD1N91VOFfVeu&payment_intent_client_secret=pi_3KtbGlJ36F2VD1N91VOFfVeu_secret_r7Dzbr08i2zNqG5TXknpMj2Ub&redirect_status=succeeded
  
  if (error) {
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Show error to your customer (for example, payment
    // details incomplete)
    const messageContainer = document.querySelector('#error-message');
    messageContainer.textContent = error.message;
  } else {
    // Your customer will be redirected to your `return_url`. For some payment
    // methods like iDEAL, your customer will be redirected to an intermediate
    // site first to authorize the payment, then redirected to the `return_url`.
  }
});


stripe.retrievePaymentIntent(options.clientSecret).then(({paymentIntent}) => {
    const message = document.querySelector('#message')
  
    // Inspect the PaymentIntent `status` to indicate the status of the payment
    // to your customer.
    //
    // Some payment methods will [immediately succeed or fail][0] upon
    // confirmation, while others will first enter a `processing` state.
    //
    // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
    switch (paymentIntent.status) {
      case 'succeeded':
        message.innerText = 'Success! Payment received.';
        console.log('okayyyy ')
        break;
  
      case 'processing':
        message.innerText = "Payment processing. We'll update you when payment is received.";
        break;
  
      case 'requires_payment_method':
        message.innerText = 'Payment failed. Please try another payment method.';
        // Redirect your user back to your payment page to attempt collecting
        // payment again
        break;
  
      default:
        message.innerText = 'Something went wrong.';
        break;
    }
  });


