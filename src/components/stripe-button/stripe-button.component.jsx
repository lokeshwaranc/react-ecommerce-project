import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
	const priceForStripe = price * 80
	const publishableKey ='pk_test_51HcDPdF5lev9lv6IclwgDmGDELsmEd0P8jiXC0EWDhfybVW90wtYCSUNDZW1BqGNipdr0OcNdmNwpwtRsloFUCjc00rcKzReqb'

const onToken = token =>{
		console.log(token);
		alert('Payment Successful! Thank you for Shopping with Us!!');
	}

	return(
	<StripeCheckout
		label='Pay Now'
		name='Lokii storefront'
		billingAddress
		shippingAddress
		img='https://svgshare.com/i/CUz.svg'
		description={`Pay $${price}`}
		amount={priceForStripe}
		pannelLabel='Pay Now'
		token={onToken} 
		stripeKey={publishableKey}
		/>
		);
}

export default StripeCheckoutButton;