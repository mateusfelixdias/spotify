import Stripe from 'stripe';

export default interface IProduct {
  id: string;
  name?: string;
  image?: string;
  active?: boolean;
  description?: string;
  metadata?: Stripe.Metadata;
}
