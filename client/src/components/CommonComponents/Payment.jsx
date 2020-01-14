import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
export default class Payment extends Component {
    render() {
        return (
            <StripeCheckout
            amount={500}
            token={token=>{console.log(token)}}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
            name="Flipeet"
            description = "Send Purchase Request Your Payment will not be charged untill request accepted"
            />
        )
    }
}
