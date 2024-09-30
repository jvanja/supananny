// server/api/stripe/customer.ts
import { defineEventHandler, getQuery, readBody } from 'h3'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export default defineEventHandler(async (event) => {
  const method = event.req.method
  const { customerId } = getQuery(event)

  if (method === 'GET') {
    // Fetch customer billing and payment details
    const customer = await stripe.customers.retrieve(customerId as string, {
      expand: ['invoice_settings.default_payment_method'],
    })
    return customer
  } else if (method === 'POST') {
    const { name, address, email, paymentMethodId } = await readBody(event)

    // Update customer billing info
    const updatedCustomer = await stripe.customers.update(customerId as string, {
      name,
      address,
      email,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    })

    return updatedCustomer
  }
})
