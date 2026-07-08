import { TLocale } from 'react-persian-range-picker';

// types/payment.ts
export type TPaymentStatus = 'success' | 'failed';

export interface IPaymentResultProps {
  locale: TLocale;
  orderId?: string;
  errorMessage?: string;
  transactionId?: string;
  amount?: number;
  date?: string;
}