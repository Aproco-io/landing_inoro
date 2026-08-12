import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cta = z.object({ label: z.string(), href: z.string() });

// --- Section library (S01–S21 in spec). Each section is a typed variant. ---

const heroSection = z.object({
  type: z.literal('hero'),
  heading: z.string(),
  subheading: z.string(),
  badge: z.string().optional(),
  primaryCta: cta.optional(),
  secondaryCta: cta.optional(),
  imageSrc: z.string().optional(),
  imageAlt: z.string().optional(),
});

const logoBarSection = z.object({
  type: z.literal('logo-bar'),
  caption: z.string().optional(),
});

const problemSection = z.object({
  type: z.literal('problem'),
  kicker: z.string().optional(),
  heading: z.string(),
  pains: z
    .array(z.object({ icon: z.string().optional(), title: z.string(), body: z.string() }))
    .default([]),
  costCard: z.object({ heading: z.string(), body: z.string() }).optional(),
});

const blufSection = z.object({
  type: z.literal('bluf'),
  term: z.string().optional(),
  body: z.string(),
});

const howItWorksSection = z.object({
  type: z.literal('how-it-works'),
  heading: z.string(),
  kicker: z.string().optional(),
  steps: z.array(z.object({ title: z.string(), body: z.string() })).min(1),
});

const capabilityGridSection = z.object({
  type: z.literal('capability-grid'),
  heading: z.string().optional(),
  kicker: z.string().optional(),
  cards: z
    .array(
      z.object({
        icon: z.string().optional(),
        title: z.string(),
        body: z.string(),
        linkText: z.string().optional(),
        linkHref: z.string().optional(),
      }),
    )
    .min(1),
});

const featureDeepDiveSection = z.object({
  type: z.literal('feature-deep-dive'),
  heading: z.string().optional(),
  rows: z
    .array(
      z.object({
        heading: z.string(),
        body: z.string(),
        metric: z.string().optional(),
        imageSrc: z.string(),
        imageAlt: z.string(),
      }),
    )
    .min(1),
});

const atGlanceSection = z.object({
  type: z.literal('at-a-glance'),
  heading: z.string().optional(),
  kicker: z.string().optional(),
  bullets: z.array(z.string()).min(1),
});

const comparisonTableSection = z.object({
  type: z.literal('comparison-table'),
  heading: z.string().optional(),
  kicker: z.string().optional(),
  columns: z.array(z.string()).min(2),
  rows: z.array(z.object({ label: z.string(), values: z.array(z.string()) })).min(1),
});

const resultsBandSection = z.object({
  type: z.literal('results-band'),
  heading: z.string().optional(),
  stats: z
    .array(z.object({ value: z.string(), label: z.string(), sub: z.string().optional() }))
    .min(1),
  caseNote: z.string().optional(),
});

const aiChatSection = z.object({
  type: z.literal('ai-chat'),
  heading: z.string().optional(),
  exchanges: z.array(z.object({ user: z.string(), ai: z.string() })).min(1),
});

const whoItsForSection = z.object({
  type: z.literal('who-its-for'),
  heading: z.string().optional(),
  kicker: z.string().optional(),
  personas: z.array(z.object({ name: z.string(), role: z.string(), body: z.string() })).min(1),
});

const integrationsStripSection = z.object({
  type: z.literal('integrations-strip'),
  heading: z.string().optional(),
  names: z.array(z.string()).min(1),
  linkText: z.string().optional(),
  linkHref: z.string().optional(),
});

const securityBandSection = z.object({
  type: z.literal('security-band'),
  heading: z.string().optional(),
  tiles: z.array(z.object({ title: z.string(), body: z.string() })).min(1),
  footer: z.string().optional(),
});

const pricingTeaserSection = z.object({
  type: z.literal('pricing-teaser'),
  body: z.string(),
  linkText: z.string(),
  linkHref: z.string(),
});

const testimonialSection = z.object({
  type: z.literal('testimonial'),
  quote: z.string(),
  author: z.string(),
  role: z.string().optional(),
  company: z.string().optional(),
});

const faqSection = z.object({
  type: z.literal('faq'),
  heading: z.string().optional(),
  items: z.array(z.object({ q: z.string(), a: z.string() })).min(1),
});

const relatedResourcesSection = z.object({
  type: z.literal('related-resources'),
  heading: z.string().optional(),
  cards: z
    .array(z.object({ title: z.string(), body: z.string().optional(), href: z.string() }))
    .min(1),
});

const explorePlatformSection = z.object({
  type: z.literal('explore-platform'),
  heading: z.string().optional(),
  links: z
    .array(z.object({ label: z.string(), href: z.string(), description: z.string().optional() }))
    .min(1),
});

const ctaBandSection = z.object({
  type: z.literal('cta-band'),
  heading: z.string(),
  body: z.string().optional(),
  primaryCta: cta,
  secondaryCta: cta.optional(),
});

const pricingPlansSection = z.object({
  type: z.literal('pricing-plans'),
  plans: z.array(
    z.object({
      name: z.string(),
      price: z.string(),
      period: z.string().optional(),
      features: z.array(z.string()),
      ctaLabel: z.string(),
      ctaHref: z.string(),
      highlight: z.boolean().default(false),
    }),
  ),
});

const roiCalculatorSection = z.object({
  type: z.literal('roi-calculator'),
  heading: z.string().optional(),
  perMinutePrice: z.number(),
  currency: z.string().default('€'),
  perSeatLow: z.number().optional(),
  perSeatHigh: z.number().optional(),
});

const richBodySection = z.object({
  type: z.literal('rich-body'),
  body: z.string(),
});

const section = z.discriminatedUnion('type', [
  heroSection,
  logoBarSection,
  problemSection,
  blufSection,
  howItWorksSection,
  capabilityGridSection,
  featureDeepDiveSection,
  atGlanceSection,
  comparisonTableSection,
  resultsBandSection,
  aiChatSection,
  whoItsForSection,
  integrationsStripSection,
  securityBandSection,
  pricingTeaserSection,
  testimonialSection,
  faqSection,
  relatedResourcesSection,
  explorePlatformSection,
  ctaBandSection,
  pricingPlansSection,
  roiCalculatorSection,
  richBodySection,
]);

// --- Legacy schema (kept for old markdown files not yet migrated) ---
const legacyPageBase = z.object({
  title: z.string(),
  description: z.string(),
  lang: z.enum(['pl', 'en']),
  slug: z.string(),
  seo: z
    .object({ metaTitle: z.string().optional(), metaDescription: z.string().optional() })
    .optional(),
  hero: z
    .object({
      kicker: z.string().optional(),
      heading: z.string(),
      subheading: z.string(),
      primaryCta: cta.optional(),
      secondaryCta: cta.optional(),
    })
    .optional(),
  features: z
    .array(z.object({ icon: z.string().optional(), title: z.string(), description: z.string() }))
    .default([]),
  bullets: z.array(z.string()).default([]),
  cta: z
    .object({
      heading: z.string(),
      subheading: z.string().optional(),
      buttonLabel: z.string(),
      buttonHref: z.string(),
    })
    .optional(),
  order: z.number().default(100),
  translationKey: z.string().optional(),
  sections: z.array(section).optional(),
});

const product = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/product' }),
  schema: legacyPageBase,
});

const solutions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/solutions' }),
  schema: legacyPageBase,
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: legacyPageBase.extend({ parent: z.string().optional() }),
});

const compare = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/compare' }),
  schema: legacyPageBase.extend({
    competitor: z.string(),
    variant: z.enum(['vs', 'alternative']).default('vs'),
  }),
});

const pricing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pricing' }),
  schema: legacyPageBase.extend({
    plans: z
      .array(
        z.object({
          name: z.string(),
          price: z.string(),
          period: z.string().optional(),
          features: z.array(z.string()),
          ctaLabel: z.string(),
          ctaHref: z.string(),
          highlight: z.boolean().default(false),
        }),
      )
      .default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['pl', 'en']),
    slug: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Zespół InOro'),
    category: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    coverGradient: z.string().optional(),
    excerpt: z.string().optional(),
    readTime: z.number().optional(),
    tags: z.array(z.string()).default([]),
    seo: z
      .object({ metaTitle: z.string().optional(), metaDescription: z.string().optional() })
      .optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { product, solutions, resources, compare, pricing, blog };
