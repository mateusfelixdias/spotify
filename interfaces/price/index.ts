import Stripe from 'stripe';

import IProduct from '../product';

export default interface IPrice {
  id: string;
  active?: boolean;
  currency?: string;
  product_id?: string;
  products?: IProduct;
  description?: string;
  unit_amount?: number;
  interval_count?: number;
  type?: Stripe.Price.Type;
  metadata?: Stripe.Metadata;
  trial_period_days?: number | null;
  interval?: Stripe.Price.Recurring.Interval;
}
