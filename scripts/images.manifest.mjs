/**
 * Photography manifest.
 *
 * Every image slot maps to a Pexels photo ID. Pexels photos are free for
 * commercial use with no attribution required — which is why they are used
 * here rather than image-search results, which are third-party copyrighted
 * works and cannot ship inside a template.
 *
 * `kind` picks the crop the download script requests:
 *   wide (16:9) · hero (4:3) · card (4:3) · tall (4:5) · square (1:1) · avatar
 *
 * To swap a photo: change its id, delete the cached files for that slot, and
 * run `npm run images`. Every id below was reviewed on a contact sheet.
 */
export const PHOTOS = {
  // ---------------------------------------------------------------- heroes
  'hero/home': { id: 7680212, kind: 'hero', alt: 'Businesswoman in a pink blazer holding documents' },
  'hero/about': { id: 37079379, kind: 'hero', alt: 'Businesswoman smiling in a warm office interior' },
  'hero/expertise': { id: 17049747, kind: 'hero', alt: 'Businesswoman working at her desk with a laptop' },
  'hero/speaking': { id: 29708281, kind: 'hero', alt: 'Woman delivering a keynote on stage' },
  'hero/blog': { id: 5393538, kind: 'hero', alt: 'Woman holding a mug while working on a laptop' },
  'hero/contact': { id: 5240039, kind: 'hero', alt: 'Woman drinking coffee while working on a laptop' },
  'hero/article': { id: 7034738, kind: 'hero', alt: 'Woman working at a table with a laptop and notebook' },
  'hero/legal': { id: 5238014, kind: 'wide', alt: 'Woman working at a desk' },
  'hero/booking': { id: 35204039, kind: 'hero', alt: 'Two women in a working session together' },
  'hero/newsletter': { id: 5899104, kind: 'hero', alt: 'Woman reading on a laptop at home' },
  'hero/ai-for-business': { id: 7693706, kind: 'hero', alt: 'Businesswoman reviewing data on a tablet' },

  // ----------------------------------------------------------------- about
  'about/portrait': { id: 9304685, kind: 'tall', alt: 'Woman in a blazer with her arms crossed' },
  'about/story': { id: 3278767, kind: 'card', alt: 'Person writing in a notebook' },
  'about/cta': { id: 14156546, kind: 'tall', alt: 'Smiling businesswoman in a white shirt' },
  'about/stats-band': { id: 17117467, kind: 'wide', alt: 'Peonies and a laptop on a wooden desk' },

  // ------------------------------------------------------------- editorial
  'editorial/strength-training-mistakes': { id: 3757376, kind: 'card', alt: 'Woman holding a dumbbell' },
  'editorial/multiple-income-streams': { id: 5550904, kind: 'card', alt: 'Hands holding coins with a young plant' },
  'editorial/timeless-style-essentials': { id: 15991060, kind: 'card', alt: 'Woman in a blazer and jeans' },
  'editorial/skincare-routine': { id: 6635915, kind: 'card', alt: 'Woman applying facial cream' },
  'editorial/seven-systems': { id: 7667452, kind: 'card', alt: 'Woman planning at a desk' },
  'editorial/build-strength-confidence': { id: 6285188, kind: 'card', alt: 'Woman working out by a gym window' },
  'editorial/classic-style-rules': { id: 16221182, kind: 'card', alt: 'Woman in a brown blazer holding a hat' },
  'editorial/ai-saves-hours': { id: 3756679, kind: 'card', alt: 'Businesswoman laughing while working on a laptop' },
  'editorial/best-skincare-over-30': { id: 6925542, kind: 'card', alt: 'Woman patting in her skincare' },
  'editorial/stay-focused': { id: 7034744, kind: 'card', alt: 'Woman typing on a laptop' },
  'editorial/three-conversations': { id: 4051137, kind: 'card', alt: 'Two women in conversation' },
  'editorial/edc-essentials': { id: 604598, kind: 'card', alt: 'Mug, watch and flower on a white surface' },
  'editorial/morning-routine': { id: 10060583, kind: 'card', alt: 'Breakfast and coffee served in bed' },
  'editorial/personal-brand': { id: 23092152, kind: 'card', alt: 'Fashionably dressed woman in an urban setting' },
  'editorial/style-upgrades': { id: 18718843, kind: 'card', alt: 'Woman in an elegant blazer and trainers' },
  'editorial/mindset-habits': { id: 32799902, kind: 'card', alt: 'Flat lay with coffee and a journal' },
  'editorial/building-muscle-after-40': { id: 14604676, kind: 'card', alt: 'Strong woman lifting dumbbells' },
  'editorial/future-of-work': { id: 9489091, kind: 'card', alt: 'Colleagues working together on a project' },
  'editorial/compound-effect': { id: 30711884, kind: 'card', alt: 'Stacked coins representing compounding growth' },
  'editorial/lead-with-clarity': { id: 7693692, kind: 'card', alt: 'Business people brainstorming in a meeting' },
  'editorial/time-management': { id: 8472192, kind: 'card', alt: 'Coffee beside a notebook and pen' },
  'editorial/productivity-habits': { id: 5357086, kind: 'card', alt: 'Blank notebook and a coffee cup' },
  'editorial/great-leaders': { id: 36733315, kind: 'card', alt: 'Business meeting in a modern office' },
  'editorial/time-blocking': { id: 20035788, kind: 'card', alt: 'Notebook and coffee on a desk' },
  'editorial/unstoppable-mindset': { id: 36177188, kind: 'card', alt: 'Portrait of a smiling young woman' },
  'editorial/fitness-featured': { id: 13965872, kind: 'card', alt: 'Fit woman training at the gym' },
  'editorial/success-featured': { id: 7691694, kind: 'card', alt: 'Team of business people working together' },
  'editorial/in-article-sunrise': { id: 37386478, kind: 'card', alt: 'Morning journaling with coffee and a candle' },

  // ---------------------------------------------------------------- topics
  'topics/ai-strategy': { id: 4872048, kind: 'card', alt: 'Woman reviewing an AI strategy on a tablet' },
  'topics/business-systems': { id: 7654438, kind: 'card', alt: 'Colleagues reviewing accounts in an office' },
  'topics/high-performance-teams': { id: 12903168, kind: 'card', alt: 'Colleagues cooperating in an office' },
  'topics/content-personal-brand': { id: 8091204, kind: 'card', alt: 'Woman working on a laptop at a table' },
  'topics/mindset-habits': { id: 7320747, kind: 'card', alt: 'Woman drinking coffee while working' },
  'topics/financial-freedom': { id: 7567445, kind: 'card', alt: 'Report showing growth in stocks' },

  // -------------------------------------------------------------- speaking
  'speaking/ai-automation': { id: 37709121, kind: 'card', alt: 'Futuristic interface on a laptop' },
  'speaking/leadership': { id: 7710139, kind: 'card', alt: 'Team meeting in an office' },
  'speaking/business-growth': { id: 10375961, kind: 'card', alt: 'People brainstorming in an office' },
  'speaking/marketing-branding': { id: 12903169, kind: 'card', alt: 'Colleagues brainstorming at an office board' },
  'speaking/mindset-performance': { id: 8761534, kind: 'card', alt: 'Businesswoman speaking into a microphone' },
  'speaking/keynote-ai-advantage': { id: 8761528, kind: 'card', alt: 'Graphs projected on a conference screen' },
  'speaking/keynote-future-proof': { id: 8761527, kind: 'card', alt: 'Woman presenting charts on a projector screen' },
  'speaking/keynote-leaders': { id: 8731034, kind: 'card', alt: 'Woman at a podium addressing an audience' },
  'speaking/keynote-personal-brand': { id: 8345980, kind: 'card', alt: 'Woman delivering a speech' },
  'speaking/keynote-high-performance': { id: 8872474, kind: 'card', alt: 'Businesswoman giving a keynote' },
  'speaking/reel': { id: 8761536, kind: 'wide', alt: 'Audience seated at a business conference' },
  'speaking/booking': { id: 6949925, kind: 'tall', alt: 'Woman speaking behind a podium' },

  // ---------------------------------------------------------- case studies
  'case-studies/ecommerce-brand': { id: 36712922, kind: 'card', alt: 'Two women shopping together' },
  'case-studies/coaching-business': { id: 6134954, kind: 'card', alt: 'Woman coaching another woman' },
  'case-studies/saas-company': { id: 4816921, kind: 'card', alt: 'Code on a computer screen' },
  'case-studies/personal-brand': { id: 19273134, kind: 'card', alt: 'Fashionable woman walking in the city' },

  // -------------------------------------------------------------- products
  'products/signature-hoodie': { id: 32938278, kind: 'square', alt: 'Woman in a white hoodie holding a tote bag' },
  'products/classic-watch': { id: 6349111, kind: 'square', alt: 'Analog wristwatch with a brown leather strap' },
  'products/leather-tote': { id: 29359826, kind: 'square', alt: 'Minimalist leather tote bag with travel essentials' },
  'products/wireless-earbuds': { id: 7417547, kind: 'square', alt: 'A pair of wireless earbuds' },
  'products/wellness-journal': { id: 7657410, kind: 'square', alt: 'Notebook and pencil on a desk' },
  'products/shaker-bottle': { id: 7879825, kind: 'square', alt: 'Stainless steel bottle in a bag' },

  // ------------------------------------------------------------------ misc
  'misc/office': { id: 36887759, kind: 'card', alt: 'Modern office reception with a city view' },
  'misc/founder': { id: 31869537, kind: 'tall', alt: 'Portrait of a smiling woman in business attire' },
  'misc/newsletter-mug': { id: 7657962, kind: 'card', alt: 'Flat lay of a cup of coffee' },
  'misc/legal-cta': { id: 3392718, kind: 'card', alt: 'Pink carnations in a clear glass vase' },
  'misc/faq-flowers': { id: 4499854, kind: 'card', alt: 'Pink roses in a white ceramic vase' },
  'misc/download-preview': { id: 6801639, kind: 'card', alt: 'Printed report pages' },
  'misc/sample-issue': { id: 3944455, kind: 'card', alt: 'Reading printed pages beside eyeglasses' },

  // ---------------------------------------------------------------- people
  'people/author': { id: 29852895, kind: 'avatar', alt: 'Portrait of Brian Hanson' },
  'people/mia-anderson': { id: 36439572, kind: 'avatar', alt: 'Portrait of Mia Anderson' },
  'people/jenna-stone': { id: 16586552, kind: 'avatar', alt: 'Portrait of Jenna Stone' },
  'people/alex-thomas': { id: 13079557, kind: 'avatar', alt: 'Portrait of Alex Thomas' },
  'people/daniel-k': { id: 10657877, kind: 'avatar', alt: 'Portrait of Daniel K.' },
  'people/jason-stone': { id: 37148308, kind: 'avatar', alt: 'Portrait of Jason Stone' },
  'people/mark-mitchell': { id: 26872232, kind: 'avatar', alt: 'Portrait of Mark Mitchell' },
  'people/jessica-m': { id: 10174456, kind: 'avatar', alt: 'Portrait of Jessica M.' },
  'people/sarah-l': { id: 11563145, kind: 'avatar', alt: 'Portrait of Sarah L.' },
  'people/amanda-r': { id: 21792037, kind: 'avatar', alt: 'Portrait of Amanda R.' },
  'people/emily-k': { id: 20051635, kind: 'avatar', alt: 'Portrait of Emily K.' },
  'people/sophia-l': { id: 36593090, kind: 'avatar', alt: 'Portrait of Sophia L.' },
  'people/laura-t': { id: 4872080, kind: 'avatar', alt: 'Portrait of Laura T.' },
  'people/lisa-r': { id: 8145333, kind: 'avatar', alt: 'Portrait of Lisa R.' },
  'people/commenter-1': { id: 8171180, kind: 'avatar', alt: 'Reader avatar' },
  'people/commenter-2': { id: 30161439, kind: 'avatar', alt: 'Reader avatar' },
  'people/commenter-3': { id: 36593091, kind: 'avatar', alt: 'Reader avatar' },
}

/** Rendered widths per crop, used to build the srcset ladder. */
export const KINDS = {
  wide: { ratio: [16, 9], widths: [640, 1024, 1600] },
  hero: { ratio: [4, 3], widths: [640, 1024, 1600] },
  card: { ratio: [4, 3], widths: [400, 800] },
  tall: { ratio: [4, 5], widths: [400, 800] },
  square: { ratio: [1, 1], widths: [400, 800] },
  avatar: { ratio: [1, 1], widths: [96, 192] },
}
