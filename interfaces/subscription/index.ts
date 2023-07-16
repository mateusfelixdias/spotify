import Stripe from 'stripe';

import IPrice from '../price';

export default interface ISubscription {
  id: string;
  user_id: string;
  created: string;
  prices?: IPrice;
  price_id: string;
  quantity?: number;
  ended_at?: string;
  cancel_at?: string;
  trial_end?: string;
  canceled_at?: string;
  trial_start?: string;
  current_period_end: string;
  metadata?: Stripe.Metadata;
  current_period_start: string;
  status?: Stripe.Subscription;
  cancel_at_period_end?: boolean;
}
