# Perfume Landing Page — Redesign

## Design System

| Token     | Value     | Usage                              |
|-----------|-----------|------------------------------------|
| `ink`     | `#141210` | Primary text, dark sections bg     |
| `gold`    | `#C8955A` | Accent, CTAs, highlights           |
| `blush`   | `#E8C4B0` | Soft accents, borders              |
| `cream`   | `#F7F3EE` | Light section backgrounds          |
| `warm-10` | `#1e1a16` | Dark card surfaces                 |

**Typefaces**
- Display: `Cormorant Garamond` (serif, weights 300/400) — headlines
- Body: `Inter` + `Vazirmatn` — UI text, paragraphs

**Rhythm** — sections alternate dark/light:
```
Hero          → dark  (#141210)
Slider        → dark  (#141210)
Brands        → cream (#F7F3EE)
Products      → cream (#F7F3EE)
Category      → dark  (#141210)  ← visual breathing room
Special Offer → cream (#F7F3EE)
Trust         → white (#FFFFFF)
USP           → dark  (#141210)
Blog          → cream (#F7F3EE)
Testimonials  → white (#FFFFFF)
Footer        → dark  (#141210)
```

## File Mapping

Each file here maps to its original path in your project:

| New file                              | Your path                                                        |
|---------------------------------------|------------------------------------------------------------------|
| `src/components/header/Header.tsx`    | `@layout/header`                                                 |
| `src/components/hero/LandingHero.tsx` | `@components/organisms/landingHero`                              |
| `src/components/slider/LandingSlider.tsx` | `@components/molecules/landing Elements/landingSlider`       |
| `src/components/brands/LandingBrands.tsx` | `@components/molecules/landing Elements/landingBrands`       |
| `src/components/brands/BrandCard.tsx`     | `@components/molecules/brandCard`                            |
| `src/components/products/TheMostProducts.tsx` | `@components/molecules/landing Elements/theMostProducts` |
| `src/components/category/LandingCategory.tsx` | `@components/molecules/landing Elements/landingCategory` |
| `src/components/specialoffer/LandingSpecialOffer.tsx` | `@components/molecules/landing Elements/landingSpecialOffer` |
| `src/components/specialoffer/SpecialOfferCarouselClient.tsx` | `@components/molecules/landing Elements/SpecialOfferCarouselClient` |
| `src/components/trust/TrustSection.tsx` | `@components/molecules/landing Elements/trustSection`           |
| `src/components/usp/USPSection.tsx`   | `@components/molecules/landing Elements/uspSection`              |
| `src/components/blog/BlogSection.tsx` | `@components/molecules/landing Elements/blogSection`             |
| `src/components/testimonials/TestimonialsSection.tsx` | `@components/molecules/landing Elements/testimonialsSection` |

## Integration Steps

1. **Copy component files** to their respective paths above.

2. **Update `globals.css`** — paste the contents of `globals-additions.css` at the top.

3. **Update `tailwind.config.ts`** — merge `tailwind-additions.config.ts` extend block into your config.

4. **Font in `layout.tsx`** — add Cormorant Garamond via `next/font/google`:
```tsx
import { Cormorant_Garamond, Inter } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});
```

5. **CategoryCard** — apply the dark section treatment to your existing `CategoryCard` component:
   - Background: `bg-white/5 border border-white/10 hover:border-[#C8955A]/30`
   - Text: `text-white` / `text-white/50`

## Signature Design Decision

The hero uses a **parallax dark-film treatment** — the page opens in cinema mode (full black) with the bottle materializing via `blur + scale` reveal. Floating scent particles drift upward in CSS keyframe loops. The scroll rhythm alternates dark/cream sections, giving each content zone its own breathing room and preventing visual fatigue on a long landing page.

No Framer Motion dependency needed for the core animations — all CSS keyframes, zero JS weight on the hero. Framer Motion can be layered on top for `useScroll` parallax if desired.
