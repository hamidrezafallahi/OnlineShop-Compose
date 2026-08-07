import type { FaqItem } from '@components/molecules/storefront/FaqSection';
import { IBlog } from '@models/Blog';

export interface IProps {
  blog: IBlog;
  locale: string;
  faqItems?: FaqItem[];
}
