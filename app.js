const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const stripe = Stripe(urlParams.get('publishableKey'))




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
    console.log('ma grosse tebi')
  }
});

