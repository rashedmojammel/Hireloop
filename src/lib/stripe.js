import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro': 'price_1ThRUmGsEEdUs3RJXPUcagxh',
    'seeker_premium': 'price_1ThRyJGsEEdUs3RJoWdtUtIu',
    'recruiter_growth': 'price_1ThRzKGsEEdUs3RJOd9Ja4M5',
    'recruiter_enterprise': 'price_1ThRzxGsEEdUs3RJQXvEwU1K'
}