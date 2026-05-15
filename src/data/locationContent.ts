// Per-location content extensions used by the location combo pages.
// Non-templatization rule (page-seo skill): every entry below uses unique wording,
// unique opening hook, and unique sentence structure.
//
// Pricing ranges quoted are typical Northeast Florida painting-industry numbers.
// Confirm against Paint-Techs' actual pricing before publishing.

import type {
  LocationFAQ,
  NeighborhoodsBlock,
  ServiceInLocationBlock,
  ServicesShowcaseBlock,
  WhyChooseCard,
  WhyHireCard,
} from './locations';

interface LocationContent {
  heroSubtitle: string;
  heroAccent: string;
  heroImage?: string;
  driveTimeFromHQ?: string;
  serviceInLocation: ServiceInLocationBlock;
  aeoAnswer: { question: string; answer: string };
  faqs: LocationFAQ[];
  whyChoose: WhyChooseCard[];
  whyHireHeading?: string;
  whyHireCards?: WhyHireCard[];
  neighborhoods_block?: NeighborhoodsBlock;
  servicesShowcase_block?: ServicesShowcaseBlock;
}

// Single GMB business map embed used across all location pages.
// Pins the Paint-Techs GBP rather than the city, which is the correct trust signal
// per client direction 2026-05-09.
const GMB_MAP_EMBED =
  'https://maps.google.com/maps?q=Paint-Techs+LLC+Painting+Company+Jacksonville+FL&z=11&output=embed';

const wiki = (path: string) => `https://en.wikipedia.org/wiki/${path}`;

export const LOCATION_CONTENT: Record<string, LocationContent> = {
  jacksonville: {
    heroSubtitle:
      'Paint-Techs LLC is a top-rated painting contractor in Jacksonville, FL serving Duval County homeowners with interior painting, exterior painting, cabinet refinishing, and commercial painting. Our licensed and insured Jacksonville painters are 5-star rated with 52 Google reviews and have repainted homes in every neighborhood from Riverside and San Marco to Mandarin and the Town Center area. Free estimates daily 8 AM to 10 PM, including evenings and weekends after work.',
    heroAccent: 'Jacksonville, FL',
    heroImage: '/images/hero-painting-jacksonville-fl-1.webp',
    serviceInLocation: {
      heading: 'Top-rated painting contractor in Jacksonville, FL',
      paragraph: [
        'Jacksonville covers more square miles than any other city in the lower 48, which means our crews bounce between 1920s bungalows in ',
        { text: 'Riverside and Avondale', href: wiki('Riverside_and_Avondale_Historic_Districts') },
        ' one week and new-build subdivisions near the ',
        { text: 'St. Johns Town Center', href: wiki('St._Johns_Town_Center') },
        ' the next. Humidity off the St. Johns River, salt drift on the Eastside, and full Florida UV all push paint hard, so prep, primer, and pigment quality matter more here than copy can convey. We service every ',
        { text: 'Duval County', href: wiki('Duval_County,_Florida') },
        ' ZIP from 32202 downtown through 32256 in the Southside, with Sherwin-Williams Emerald and Benjamin Moore Aura as our daily drivers.',
      ],
      mapEmbedSrc: GMB_MAP_EMBED,
    },
    aeoAnswer: {
      question: 'How much does house painting cost in Jacksonville?',
      answer:
        'Interior repaints in Jacksonville typically run $3-7 per square foot, putting a whole-house job between $3,500 and $9,000 depending on size, prep, and paint line. Exterior repaints run $4-9 per square foot. Cabinet refinishing is $80-150 per door. Every Paint-Techs estimate is free, on-site, and itemized so you can compare apples to apples.',
    },
    faqs: [
      {
        question: 'How long does exterior paint actually last in Jacksonville humidity?',
        answer:
          'On a properly prepped exterior with a quality acrylic like Sherwin-Williams Emerald or Benjamin Moore Aura, expect 8 to 10 years of solid color hold on shaded elevations and 5 to 7 on south- and west-facing walls that take the worst Florida UV. Skipping prep cuts those numbers in half, which is why we never quote a job without a moisture and surface inspection first.',
      },
      {
        question: 'Do you handle prep work on Riverside and Avondale historic homes?',
        answer:
          'Yes. Riverside, Avondale, San Marco, Springfield, and Murray Hill are full of pre-1978 homes, so we follow EPA RRP lead-safe practices on every job in those districts. We also patch original wood trim, swap rotten shingle siding piece-by-piece rather than replacing whole walls, and color-match heritage palettes.',
      },
      {
        question: 'Can you schedule the estimate after I finish work?',
        answer:
          'Daily 8 AM to 10 PM. Most Jacksonville homeowners book us between 6 PM and 9 PM on weekdays so they can walk the project with us in person without burning a vacation day. Saturday and Sunday slots fill first, so book a few days out for weekends.',
      },
    ],
    whyChoose: [],
    whyHireHeading: 'Why Duval County homeowners hire Paint-Techs',
    whyHireCards: [
      {
        title: 'Local crew, not a franchise',
        description:
          'Paint-Techs LLC is a Jacksonville painting company that knows Jacksonville homes, from the humidity challenges near the St. Johns River to the salt exposure in beach-adjacent areas. Same painters from estimate to walk-through.',
      },
      {
        title: '52 five-star Google reviews',
        description:
          'Owner Vitor and the Paint-Techs crew have built a 5-star reputation through residential and commercial work across Duval County. Reviews are written by your neighbors, not strangers.',
      },
      {
        title: 'Climate-tuned product list',
        description:
          "Jacksonville's combination of humidity, UV exposure, and occasional storms requires the right products applied correctly. We use premium Sherwin-Williams and Benjamin Moore paints formulated for Florida conditions.",
      },
      {
        title: 'Full scope under one bid',
        description:
          'Interior, exterior, cabinets, and commercial painting all from one trusted contractor. No sub-contractor handoffs.',
      },
      {
        title: 'Free estimates within 48 hours',
        description:
          'Searching for painters near me in Jacksonville and need a quote today? Most weekday estimates are available within 24 to 48 hours, with evening slots open until 10 PM.',
      },
    ],
    servicesShowcase_block: {
      heading: 'Painting services we offer in Jacksonville',
      intro:
        'Five core services delivered by the same in-house Paint-Techs crew across every Duval County ZIP. Tap a service for full scope, prep, products, and timelines.',
      cards: [
        {
          serviceSlug: 'interior-painting',
          serviceName: 'Interior painting',
          tagline:
            'Wall, ceiling, trim, and door painting for Jacksonville homes from 1,000 sq ft Murray Hill bungalows to 5,000+ sq ft Mandarin customs. Sherwin-Williams Emerald and Benjamin Moore Aura in matte or eggshell that scrubs clean. Typical timeline: 2-5 days.',
        },
        {
          serviceSlug: 'exterior-painting',
          serviceName: 'Exterior painting',
          tagline:
            'Full-house repaints and trim refreshes for Jacksonville exteriors that take full sun, summer humidity, and St. Johns River salt drift. Premium acrylic systems with UV-resistant pigment on every south- and west-facing wall. 5 to 10 year repaint cycles.',
        },
        {
          serviceSlug: 'cabinet-painting',
          serviceName: 'Cabinet painting',
          tagline:
            'Factory-grade cabinet refinishing in Mandarin, San Marco, Riverside, and Town Center kitchens. Sherwin-Williams ProClassic or Benjamin Moore Advance lacquer, sprayed for a smooth finish. Typically 50-70% less than full cabinet replacement.',
        },
        {
          serviceSlug: 'pool-deck-painting-staining',
          serviceName: 'Pool deck painting & staining',
          tagline:
            'Heat-reflective, slip-resistant deck coatings designed for Florida sun. Cool-touch finishes for pool decks across Jacksonville and Duval County. Lasts 5-7 years with proper prep.',
        },
        {
          serviceSlug: 'commercial-painting',
          serviceName: 'Commercial painting',
          tagline:
            'Interior and exterior commercial painting for retail, offices, and small medical practices throughout Duval County. After-hours scheduling so storefronts stay open during business hours.',
        },
      ],
    },
    neighborhoods_block: {
      heading: 'House painters across every Jacksonville neighborhood',
      intro:
        'Jacksonville covers more square miles than any other city in the lower 48, so the painting needs vary widely from one ZIP to the next.',
      groups: [
        {
          groupTitle: 'Historic neighborhoods',
          entries: [
            {
              name: 'Riverside & Avondale',
              description:
                'These historic districts near the St. Johns River feature 1920s bungalows, Tudor revivals, and Mediterranean-style homes. We follow EPA RRP lead-safe practices on every pre-1978 home and color-match heritage palettes when needed.',
            },
            {
              name: 'San Marco',
              description:
                "Just south of downtown near the Florida Theatre, San Marco's tree-lined streets feature charming historic homes that benefit from our attention to architectural detail and crown trim.",
            },
            {
              name: 'Springfield & Murray Hill',
              description:
                'These revitalizing neighborhoods feature historic homes being restored to their former glory. We are experienced with both preservation work and complete makeovers.',
            },
            {
              name: 'Ortega',
              description:
                'The historic homes along the Ortega River require painters who appreciate classic craftsmanship.',
            },
          ],
        },
        {
          groupTitle: 'Family neighborhoods',
          entries: [
            {
              name: 'Mandarin',
              description:
                "One of Jacksonville's most desirable family areas, Mandarin features homes from every era. Our Mandarin painters handle interior, exterior, and cabinet projects, with most jobs running 4-6 days.",
            },
            {
              name: 'Southside & Baymeadows',
              description:
                'This growing commercial and residential area keeps our crews busy with both home and commercial painting projects.',
            },
            {
              name: 'Arlington',
              description:
                'Affordable homes and growing families make Arlington a staple of our service area.',
            },
          ],
        },
        {
          groupTitle: 'Growing areas',
          entries: [
            {
              name: 'Northside & Westside',
              description:
                'These expanding areas feature new construction that benefits from paint upgrades beyond builder-grade finishes.',
            },
            {
              name: 'Town Center & St. Johns Town Center area',
              description:
                "The Southside's retail hub is surrounded by newer homes and condos we service regularly, plus the corporate offices that anchor the area.",
            },
          ],
        },
      ],
    },
  },

  nocatee: {
    heroSubtitle:
      'Paint-Techs LLC is the painting contractor Nocatee homeowners trust for interior painting, exterior painting, and cabinet refinishing across St. Johns County. Our Nocatee house painters handle the full ARB color-approval process for Twenty Mile, Coastal Oaks, Greenleaf, Tidewater, and Artisan Lakes, with a workmanship guarantee on every job. Licensed, insured, and 5-star rated with 52 Google reviews. Free evening estimates until 10 PM.',
    heroAccent: 'Nocatee, FL',
    heroImage: '/images/painting-project-nocatee-fl-1.webp',
    driveTimeFromHQ: 'About 25 miles south of our Jacksonville office, roughly 30 minutes via US-1 and Nocatee Parkway.',
    serviceInLocation: {
      heading: 'Painting contractor serving Nocatee and St. Johns County',
      paragraph: [
        { text: 'Nocatee', href: wiki('Nocatee,_Florida') },
        ' was the top-selling master-planned community in Florida for years running, and we have spent enough time inside its gates to know which neighborhoods need ARB submissions for which paint codes. Twenty Mile, Coastal Oaks, Greenleaf, Tidewater, and Artisan Lakes each have their own architectural review priorities. We pull approved-color sample boards before we open a can, schedule around school drop-off at Valley Ridge and Palm Valley Academy, and protect mature landscaping that takes years to come back if hit with overspray. Most projects sit inside ',
        { text: 'St. Johns County', href: wiki('St._Johns_County,_Florida') },
        ' between ',
        { text: 'Ponte Vedra', href: wiki('Ponte_Vedra,_Florida') },
        ' and the Tolomato River.',
      ],
      mapEmbedSrc: GMB_MAP_EMBED,
    },
    aeoAnswer: {
      question: 'How much does cabinet painting cost in Nocatee?',
      answer:
        'Cabinet refinishing in a typical Nocatee luxury kitchen runs $80-150 per door, or $4,000-$9,000 for a 30-40 door layout. That is 50-70% less than replacement, with a 3-5 day turnaround in your home. We supply ARB-ready color samples in advance so HOA approval does not delay the start.',
    },
    faqs: [
      {
        question: 'Do you handle the Nocatee ARB color-approval process?',
        answer:
          'Yes. We pull paint sample boards in approved Nocatee Architectural Review Board codes, label them with the formula, and email a packet ready for ARB submission. We also keep a running list of recently approved exterior colors per neighborhood so you can see what has cleared in the last 12 months.',
      },
      {
        question: 'Can the project work around our family’s schedule?',
        answer:
          'Estimates run until 10 PM, so most Nocatee parents book us after the kids are down. For interior projects we work in zones, sealing one wing at a time so the rest of the house stays usable. Cabinet refinishing happens off-site or in the garage, keeping the kitchen functional during the day.',
      },
      {
        question: 'What paint do you use on Nocatee new-build touch-ups?',
        answer:
          'Most builder-grade flat doesn’t scrub well after a few months of family life. We upgrade interior repaints to Sherwin-Williams Emerald in a matte or eggshell finish so walls actually wipe clean. Builder warranty stays intact because we color-match the original codes if you want continuity.',
      },
    ],
    whyChoose: [],
    whyHireHeading: 'Why Nocatee and St. Johns County homeowners hire Paint-Techs',
    whyHireCards: [
      {
        title: 'Evening estimates until 10 PM',
        description:
          'Most Nocatee parents work standard hours, so we schedule estimates after the kids go down. Daily 8 AM to 10 PM, including weekends.',
      },
      {
        title: 'Cabinet refinishing specialists',
        description:
          "Our cabinet painting and refinishing services are perfect for Nocatee's luxury kitchens, with off-site spray for a true factory finish. Save 50-70% versus cabinet replacement.",
      },
      {
        title: 'ARB-fluent, not ARB-frustrated',
        description:
          'We have processed enough Architectural Review Board submissions in Twenty Mile, Coastal Oaks, and Greenleaf to know what comes back approved on the first round.',
      },
      {
        title: 'Quality materials',
        description:
          "Premium paints from Sherwin-Williams and Benjamin Moore that withstand St. Johns County's humidity, UV, and afternoon storm exposure.",
      },
      {
        title: '52 five-star Google reviews',
        description:
          'Owner Vitor and the Paint-Techs crew have built a 5-star reputation across St. Johns County. Premium-home discretion is the standard, not the exception.',
      },
    ],
    servicesShowcase_block: {
      heading: 'Painting services we offer in Nocatee',
      intro:
        'Five core services across every Nocatee village, with full ARB color-approval support baked into the bid.',
      cards: [
        {
          serviceSlug: 'interior-painting',
          serviceName: 'Interior painting',
          tagline:
            'Wall, ceiling, trim, and door painting for Nocatee homes from 2,500 sq ft Greenleaf single-stories to 5,000+ sq ft Twenty Mile customs. Builder-grade flat upgraded to scrubbable Sherwin-Williams Emerald in matte or eggshell. 3-5 day timelines.',
        },
        {
          serviceSlug: 'exterior-painting',
          serviceName: 'Exterior painting',
          tagline:
            'Full-house repaints with full ARB compliance for Twenty Mile, Coastal Oaks, Greenleaf, Tidewater, and Artisan Lakes. Sherwin-Williams Emerald or Benjamin Moore Aura Exterior over a moisture-tolerant primer. 5-10 year repaint cycles in St. Johns County conditions.',
        },
        {
          serviceSlug: 'cabinet-painting',
          serviceName: 'Cabinet painting',
          tagline:
            "Flagship service for Nocatee's open-plan luxury kitchens. Sherwin-Williams ProClassic or Benjamin Moore Advance sprayed off-site for a factory finish. 30-40 door kitchens routinely. Save 50-70% versus replacement.",
        },
        {
          serviceSlug: 'pool-deck-painting-staining',
          serviceName: 'Pool deck painting & staining',
          tagline:
            'Heat-reflective deck coatings for the splash-pad-adjacent Nocatee homes. Cool-touch finishes that hold up to St. Johns County summers and weekly use.',
        },
        {
          serviceSlug: 'commercial-painting',
          serviceName: 'Commercial painting',
          tagline:
            'Interior and exterior commercial painting for retail spaces in and around Nocatee Town Center, plus offices in the Crosswater corridor. After-hours scheduling on storefronts.',
        },
      ],
    },
    neighborhoods_block: {
      heading: 'Nocatee neighborhoods we paint',
      intro:
        "As St. Johns County's premier painting company, we have completed projects in neighborhoods throughout the Nocatee community.",
      groups: [
        {
          entries: [
            {
              name: 'Twenty Mile & Twenty Mile Village',
              description:
                'The newest sections of Nocatee feature contemporary architecture with clean lines. We handle both new-construction touch-ups and full repaints for Twenty Mile homeowners.',
            },
            {
              name: 'Tidewater & Coastal Oaks',
              description:
                'These established neighborhoods near Crosswater Hall feature homes with mature landscaping. Our crews are experienced protecting plants and outdoor features during exterior painting.',
            },
            {
              name: 'Austin Park & Addison Park',
              description:
                'Popular with families, these neighborhoods feature a mix of single-family homes that benefit from our interior and exterior painting services.',
            },
            {
              name: 'Greenleaf Village & Lakeside',
              description:
                "Near Nocatee's splash water park and lakeside amenities, these homes see families coming and going. Our flexible scheduling works around your busy life.",
            },
            {
              name: 'Artisan Lakes & Town Center',
              description:
                "Close to Nocatee Town Center's shops and restaurants, these homes benefit from our attention to curb appeal that complements this walkable community.",
            },
          ],
        },
      ],
    },
  },

  'ponte-vedra-beach': {
    heroSubtitle:
      'Paint-Techs LLC is a Ponte Vedra Beach painting contractor specializing in marine-grade exterior coatings and luxury interior repaints for Sawgrass, TPC, and oceanfront homes. Our licensed and insured Ponte Vedra painters use Sherwin-Williams Emerald Rain Refresh and Benjamin Moore Aura Exterior, the only systems that hold pigment under direct salt-air exposure. 5-star rated with 52 Google reviews. Free estimates 8 AM to 10 PM daily.',
    heroAccent: 'Ponte Vedra, FL',
    heroImage: '/images/painting-project-ponte-vedra-beach-fl-2.webp',
    driveTimeFromHQ: 'About 22 miles southeast of our Jacksonville office, roughly 28 minutes via JTB and A1A.',
    serviceInLocation: {
      heading: 'Painting contractor for Ponte Vedra Beach and Sawgrass',
      paragraph: [
        { text: 'Ponte Vedra Beach', href: wiki('Ponte_Vedra_Beach,_Florida') },
        ' pulls double duty: a working golf community on one side, an oceanfront residential strip on the other. Direct salt exposure on A1A and Mickler’s Landing eats cheap paint in three to five years, while homes set back behind ',
        { text: 'Sawgrass', href: wiki('Sawgrass,_Florida') },
        ' and ',
        { text: 'TPC Sawgrass', href: wiki('TPC_Sawgrass') },
        ' see twice that life on a comparable system. We adjust the spec accordingly, leaning on Sherwin-Williams Emerald Rain Refresh for windward elevations and stepping back to standard Aura on protected facades. Crews stage early to clear school traffic at Ponte Vedra High and Nease before parents head out.',
      ],
      mapEmbedSrc: GMB_MAP_EMBED,
    },
    aeoAnswer: {
      question: 'How long does exterior paint last on a Ponte Vedra home?',
      answer:
        'Premium exterior paint on a Ponte Vedra home holds 6-10 years on protected elevations and 4-6 on direct ocean-facing walls. Salt air and Florida UV both shorten paint life. We default to Sherwin-Williams Emerald Rain Refresh or Benjamin Moore Aura Exterior for the longest pigment hold and washable surface.',
    },
    faqs: [
      {
        question: 'What paint actually survives the salt air east of A1A?',
        answer:
          'For oceanfront walls, Sherwin-Williams Emerald Rain Refresh and Benjamin Moore Aura Exterior are the two we trust. We pair them with a salt-tolerant primer on stucco and a marine-grade enamel on metal trim. Skipping the primer step is why some homes need a repaint at the four-year mark instead of the eight-year mark.',
      },
      {
        question: 'Do you handle Sawgrass and TPC HOA color approvals?',
        answer:
          'Yes. We submit color packets to the relevant Ponte Vedra and Sawgrass associations and keep a record of approved schemes in each pocket community. Most submissions clear within 7-14 days when the formula sits inside the existing approved palette, which we check before quoting.',
      },
      {
        question: 'Can you work around tournament weeks at TPC?',
        answer:
          'PLAYERS Championship traffic in March is its own animal. We schedule exterior projects around it: loud prep before tournament week, finish coats after the crowds clear. Interior work is unaffected. Tell us your address when you book and we will flag any conflicts up front.',
      },
    ],
    whyChoose: [],
    whyHireHeading: 'Why Ponte Vedra homeowners hire Paint-Techs',
    whyHireCards: [
      {
        title: 'Salt-air spec sheet',
        description:
          'Our oceanfront paint system is different from our inland one. The right primer plus Sherwin-Williams Emerald Rain Refresh holds twice as long against direct salt as a standard exterior acrylic.',
      },
      {
        title: 'Premium-home discretion',
        description:
          'Quiet trucks, clean uniforms, no music on site, daily walk-through with the homeowner. The same crew finishes the job they started.',
      },
      {
        title: 'HOA-paperwork ready',
        description:
          'Color samples sized for ARB submission, formulas labeled, and a recent-approvals log so you can see what is already in the green for your community.',
      },
      {
        title: 'Quality without compromise',
        description:
          'We use only premium paints and materials, the same products specified by luxury home builders for Sawgrass and Marsh Landing.',
      },
      {
        title: '52 five-star Google reviews',
        description:
          'Owner Vitor and the Paint-Techs crew have built a 5-star reputation through luxury and oceanfront work along A1A.',
      },
    ],
    servicesShowcase_block: {
      heading: 'Painting services we offer in Ponte Vedra Beach',
      intro:
        'Five core services with marine-grade exterior systems for oceanfront walls and full HOA color-packet support for Sawgrass and Marsh Landing.',
      cards: [
        {
          serviceSlug: 'interior-painting',
          serviceName: 'Interior painting',
          tagline:
            'Wall, ceiling, trim, and door painting for Ponte Vedra homes from 3,000 sq ft Sawgrass golf-course homes to 8,000+ sq ft oceanfront customs. Color consultation included on every estimate.',
        },
        {
          serviceSlug: 'exterior-painting',
          serviceName: 'Exterior painting',
          tagline:
            'Marine-grade exterior systems for oceanfront and A1A-facing walls. Sherwin-Williams Emerald Rain Refresh on windward elevations, standard Aura Exterior on protected facades behind Sawgrass and TPC. Salt-tolerant primer on every elevation.',
        },
        {
          serviceSlug: 'cabinet-painting',
          serviceName: 'Cabinet painting',
          tagline:
            "Flagship service for Ponte Vedra's open-plan luxury kitchens. Factory-grade waterborne lacquer sprayed off-site for a smooth finish. 30-50 door kitchens routinely. Lands 50-70% below full replacement.",
        },
        {
          serviceSlug: 'pool-deck-painting-staining',
          serviceName: 'Pool deck painting & staining',
          tagline:
            'Heat-reflective deck coatings for oceanfront and golf-course pool decks. Cool-touch finishes that resist Florida UV and afternoon storms.',
        },
        {
          serviceSlug: 'commercial-painting',
          serviceName: 'Commercial painting',
          tagline:
            'Interior and exterior commercial painting for retail spaces, offices, and small medical practices throughout the Ponte Vedra and Sawgrass corridor.',
        },
      ],
    },
    neighborhoods_block: {
      heading: 'Ponte Vedra neighborhoods we paint',
      intro:
        'From oceanfront estates to golf-course homes inside Sawgrass and Marsh Landing, we serve the full Ponte Vedra Beach corridor.',
      groups: [
        {
          entries: [
            {
              name: 'Sawgrass & TPC Sawgrass',
              description:
                "Home to THE PLAYERS Championship and some of Florida's most exclusive properties, homes near TPC Sawgrass demand perfection. Our painters understand the attention to detail these homeowners expect.",
            },
            {
              name: 'Marsh Landing Country Club',
              description:
                'This gated community features elegant homes along the Intracoastal Waterway. We are experienced with Marsh Landing architectural styles and HOA color approvals.',
            },
            {
              name: 'Ponte Vedra Colony & Old Ponte Vedra',
              description:
                'These established oceanfront communities feature homes exposed to direct salt air. We use premium marine-grade exterior coatings designed for maximum durability in coastal conditions.',
            },
            {
              name: 'The Plantation at Ponte Vedra',
              description:
                'This Intracoastal community combines privacy with convenience. Our crews handle both the grand estate homes and the more modest properties in The Plantation.',
            },
            {
              name: 'Ponte Vedra Inn & Club area',
              description:
                "The historic section near the Ponte Vedra Inn & Club features some of the area's most iconic properties. We approach these homes with care, precision, and substrate-matched products.",
            },
          ],
        },
      ],
    },
  },

  'jacksonville-beach': {
    heroSubtitle:
      'Paint-Techs LLC is the painting contractor Jacksonville Beach cottages and condos call for salt-resistant exterior repaints and full interior refreshes. Our licensed and insured Jax Beach painters use marine-grade acrylic systems on every oceanfront elevation, plus tested cabinet finishes for boardwalk-area condos. 5-star rated with 52 Google reviews. Free estimates daily 8 AM to 10 PM.',
    heroAccent: 'Jacksonville Beach, FL',
    heroImage: '/images/painting-project-jacksonville-beach-fl-4.webp',
    driveTimeFromHQ: 'About 18 miles east of our Jacksonville office, roughly 25 minutes via Beach Boulevard.',
    serviceInLocation: {
      heading: 'House painters serving Jacksonville Beach, FL',
      paragraph: [
        { text: 'Jacksonville Beach', href: wiki('Jacksonville_Beach,_Florida') },
        ' has two paint stories: tightly-packed beach cottages east of 3rd Street that take direct salt off the boardwalk, and the newer mid-rise condos along the dunes that hide their windward walls behind balconies. Both want the same thing, which is a paint system designed for an ocean climate, not a generic Florida one. We schedule exterior work before sunrise on the salt-spray days and finish interiors during midday so balcony doors can stay open for ventilation. Most jobs sit in ',
        { text: 'Duval County', href: wiki('Duval_County,_Florida') },
        ' ZIP 32250.',
      ],
      mapEmbedSrc: GMB_MAP_EMBED,
    },
    aeoAnswer: {
      question: 'What paint should I use on a Jacksonville Beach cottage?',
      answer:
        'For a Jax Beach cottage within four blocks of the ocean, use a marine-grade acrylic like Sherwin-Williams Emerald Rain Refresh on exteriors with a salt-tolerant primer underneath. Plan on a repaint every 5-7 years east of 3rd Street, 7-9 years further inland. Interior cabinet finishes hold longer because they are inside.',
    },
    faqs: [
      {
        question: 'Is salt damage covered if my paint fails early?',
        answer:
          'Manufacturer warranties from Sherwin-Williams and Benjamin Moore exclude failure caused by improper prep, which is why we never skip the salt-tolerant primer on oceanfront walls. Our workmanship guarantee covers application defects for two years. Premature pigment loss past year five is climate, not workmanship.',
      },
      {
        question: 'How early can crews start so we beat the heat?',
        answer:
          'Exterior crews can be on-site at first light on Beach Boulevard properties, around 6:30 AM in summer. We finish surface prep before the dew burns off, then move to spray and rolling once temperatures stabilize between 75 and 85.',
      },
      {
        question: 'Do you protect outdoor furniture and grills during exterior work?',
        answer:
          'Yes. Patio furniture moves into a controlled zone, grills get covered, and pool decks get drop-cloth coverage staged each morning. Beach houses tend to have more outdoor gear than the average inland home, so plan an extra hour up front for staging.',
      },
    ],
    whyChoose: [],
    whyHireHeading: 'Why Jacksonville Beach homeowners hire Paint-Techs',
    whyHireCards: [
      {
        title: 'Coastal paint system',
        description:
          'Salt-tolerant primer plus marine-grade acrylic on every oceanfront elevation. The combination is the difference between a 5-year repaint and a 9-year one.',
      },
      {
        title: 'Quiet hours respected',
        description:
          'Vacation rentals run constantly along the boardwalk. We coordinate with property managers so crew noise lands during turnover days, not while a guest is sleeping in.',
      },
      {
        title: 'Honest timeline',
        description:
          'A typical 1,800 sq ft cottage exterior takes 4-5 working days with us. We commit to that on the estimate, not after we have the deposit.',
      },
      {
        title: 'East-of-3rd-Street expertise',
        description:
          'Tightly-packed cottages east of 3rd Street and the mid-rise condos along the dunes need different paint specs. We know which system goes on which property.',
      },
      {
        title: '52 five-star Google reviews',
        description:
          'Owner Vitor and the Paint-Techs crew have built a 5-star reputation across Duval County and the beaches. Reviews are written by your Jax Beach neighbors.',
      },
    ],
    servicesShowcase_block: {
      heading: 'Painting services we offer in Jacksonville Beach',
      intro:
        'Five core services with marine-grade exterior systems for boardwalk-area homes and salt-air-aware scheduling for vacation rentals.',
      cards: [
        {
          serviceSlug: 'interior-painting',
          serviceName: 'Interior painting',
          tagline:
            'Wall, ceiling, trim, and door painting for Jax Beach cottages and oceanfront condos. Sherwin-Williams Emerald and Benjamin Moore Aura in matte or eggshell. Typical timelines 2-4 days.',
        },
        {
          serviceSlug: 'exterior-painting',
          serviceName: 'Exterior painting',
          tagline:
            'Marine-grade acrylic systems with salt-tolerant primer on every oceanfront elevation. East of 3rd Street: 5-7 year repaint cycles. Further inland: 7-9 years.',
        },
        {
          serviceSlug: 'cabinet-painting',
          serviceName: 'Cabinet painting',
          tagline:
            'Cabinet refinishing for Jax Beach cottage and condo kitchens. Factory-grade lacquer sprayed for a smooth finish. Typically 50-70% less than full cabinet replacement.',
        },
        {
          serviceSlug: 'pool-deck-painting-staining',
          serviceName: 'Pool deck painting & staining',
          tagline:
            'Heat-reflective deck coatings for beach-house pools. Cool-touch, slip-resistant finishes that hold up to Jax Beach summers and salt drift.',
        },
        {
          serviceSlug: 'commercial-painting',
          serviceName: 'Commercial painting',
          tagline:
            'Storefront and small-business painting around Beaches Town Center and the boardwalk corridor. After-hours scheduling so retail stays open.',
        },
      ],
    },
  },

  'atlantic-beach': {
    heroSubtitle:
      'Paint-Techs LLC is an Atlantic Beach painting contractor handling 1960s coastal cottage repaints, mid-century block-home restorations, and Selva Marina-area interior projects. Our licensed and insured Atlantic Beach painters specialize in older-home prep, EPA Lead-Safe compliance, and salt-tolerant exterior coatings. 5-star rated with 52 Google reviews. Free estimates daily until 10 PM.',
    heroAccent: 'Atlantic Beach, FL',
    heroImage: '/images/exterior-painting-atlantic-beach-fl-5.webp',
    driveTimeFromHQ: 'About 19 miles northeast of our Jacksonville office, roughly 27 minutes via Atlantic Boulevard.',
    serviceInLocation: {
      heading: 'House painters in Atlantic Beach, FL',
      paragraph: [
        { text: 'Atlantic Beach', href: wiki('Atlantic_Beach,_Florida') },
        ' is older and quieter than its neighbors. The housing stock leans toward 1960s and 1970s coastal cottages with original wood siding, mid-century block homes off Mayport Road, and a tight pocket of new builds near ',
        { text: 'Selva Marina', href: wiki('Selva_Marina_Country_Club') },
        '. The age means real prep, not power-wash-and-paint shortcuts. We strip flaking layers down to sound substrate, spot-prime, then run Sherwin-Williams Emerald or Benjamin Moore Aura on top. Crews show up curbside-aware: short driveways, narrow streets, and neighbors who notice every truck.',
      ],
      mapEmbedSrc: GMB_MAP_EMBED,
    },
    aeoAnswer: {
      question: 'How long does an Atlantic Beach exterior repaint take?',
      answer:
        'A 1,500-2,000 sq ft Atlantic Beach cottage exterior takes 4-6 working days, including pressure-wash, scrape and feather-sand prep, two coats of premium acrylic, and trim cut-ins. Older wood-siding homes near Selva Marina add a day for spot priming after we open up flaking sections.',
    },
    faqs: [
      {
        question: 'Can you match an original 1960s cottage color?',
        answer:
          'Yes. We pull a chip from a hidden corner, run it on a Sherwin-Williams ColorSnap reader, and supply two or three formula matches plus the closest neighbor on the current fan deck. Original colors often need a small saturation bump because pigment fades sun-side over decades.',
      },
      {
        question: 'Do you handle flaking-paint stripping safely?',
        answer:
          'Pre-1978 homes get full EPA RRP lead-safe handling: containment, HEPA vacuum, certified disposal. We do not chase a flaking edge with a spray gun; we feather it back to a sound base, prime, and recoat so the next 6-8 years go by clean.',
      },
      {
        question: 'What about salt damage on the metal railings?',
        answer:
          'Iron and aluminum railings on coastal cottages corrode under thin paint. We sand off rust pinholes, spot-prime with a rust-converting primer, then top-coat with marine enamel. That step extends railing life by 3-5 years over a quick repaint.',
      },
    ],
    whyChoose: [],
    whyHireHeading: 'Why Atlantic Beach homeowners hire Paint-Techs',
    whyHireCards: [
      {
        title: 'Older-home prep',
        description:
          'Stripping, spot-priming, and feather-sanding are not corner-cuttable on a 1960s cottage. We budget the prep time on the estimate, not in change orders.',
      },
      {
        title: 'Neighborhood-quiet',
        description:
          'No music, lower-volume tools when possible, trucks parked legally on narrow streets. Atlantic Beach pays attention to the little things and so do we.',
      },
      {
        title: 'Salt-tolerant spec',
        description:
          'The same coastal paint system we run in Jax Beach and Ponte Vedra. Marine-grade acrylic plus salt-tolerant primer on every windward wall.',
      },
      {
        title: 'EPA Lead-Safe certified prep',
        description:
          'Pre-1978 cottages get full EPA RRP lead-safe handling: containment, HEPA vacuum, certified disposal. Standard procedure for older-home work in Atlantic Beach.',
      },
      {
        title: '52 five-star Google reviews',
        description:
          'Owner Vitor and the Paint-Techs crew have built a 5-star reputation across the beaches. Reviews are from your Atlantic Beach neighbors.',
      },
    ],
    servicesShowcase_block: {
      heading: 'Painting services we offer in Atlantic Beach',
      intro:
        'Five core services with older-home prep, EPA Lead-Safe protocols, and salt-tolerant exterior systems for coastal cottages.',
      cards: [
        {
          serviceSlug: 'interior-painting',
          serviceName: 'Interior painting',
          tagline:
            'Wall, ceiling, trim, and door painting for Atlantic Beach cottages and mid-century block homes. Sherwin-Williams Emerald and Benjamin Moore Aura. 2-4 day timelines.',
        },
        {
          serviceSlug: 'exterior-painting',
          serviceName: 'Exterior painting',
          tagline:
            'Hand-scrape, feather-sand, and spot-prime on original wood siding. Marine-grade acrylic over a salt-tolerant primer. 1,500-2,000 sq ft cottage exteriors take 4-6 working days.',
        },
        {
          serviceSlug: 'cabinet-painting',
          serviceName: 'Cabinet painting',
          tagline:
            'Cabinet refinishing for Atlantic Beach kitchens. Strip, prep, and spray with factory-grade waterborne lacquer. 3-5 day in-home turnaround.',
        },
        {
          serviceSlug: 'pool-deck-painting-staining',
          serviceName: 'Pool deck painting & staining',
          tagline:
            'Heat-reflective coatings for Atlantic Beach pool decks and patios. Cool-touch finishes designed for Florida summer heat.',
        },
        {
          serviceSlug: 'commercial-painting',
          serviceName: 'Commercial painting',
          tagline:
            'Interior and exterior commercial painting for retail and offices in the Atlantic Beach corridor and Mayport Road area.',
        },
      ],
    },
  },

  'st-augustine': {
    heroSubtitle:
      'Paint-Techs LLC is a St. Augustine painting contractor experienced with HARB historic district color approvals, lime-wash and coquina substrates, and modern coastal repaints in Davis Shores and Anastasia Island. Our licensed and insured St. Augustine painters submit HARB packets at the time of booking so review and material lead time run in parallel. 5-star rated with 52 Google reviews. Free estimates daily 8 AM to 10 PM.',
    heroAccent: 'St. Augustine, FL',
    heroImage: '/images/exterior-painting-st-augustine-fl-3.webp',
    driveTimeFromHQ: 'About 40 miles south of our Jacksonville office, roughly 50 minutes via I-95 to SR-16.',
    serviceInLocation: {
      heading: 'Painting contractor for St. Augustine historic district',
      paragraph: [
        { text: 'St. Augustine', href: wiki('St._Augustine,_Florida') },
        ' is the oldest continuously occupied European-founded city in the United States, and that heritage shows up in every paint conversation. Lincolnville and the downtown HARB district have strict color and substrate rules. Coquina, tabby, original heart-pine cladding, and lime-wash exteriors all behave differently under modern acrylic. ',
        { text: 'Anastasia Island', href: wiki('Anastasia_Island') },
        ' and Davis Shores swing more contemporary; World Golf Village and SilverLeaf are master-planned suburbs further west with their own ARB processes. Most landmarks worth name-checking, like the ',
        { text: 'Castillo de San Marcos', href: wiki('Castillo_de_San_Marcos') },
        ', remind us how seriously this city takes substrate.',
      ],
      mapEmbedSrc: GMB_MAP_EMBED,
    },
    aeoAnswer: {
      question: 'Can I paint a HARB-district home in St. Augustine any color?',
      answer:
        'No. Homes inside the St. Augustine HARB district must use approved historic palettes, typically lime-wash compatible whites, ochres, blue-grays, and muted earth tones. We submit color packets to HARB on your behalf and keep a list of recently approved schemes to speed up review, which usually clears in 2-4 weeks.',
    },
    faqs: [
      {
        question: 'Do you work on lime-wash and coquina exteriors?',
        answer:
          'Yes, but we never seal them with a non-breathable acrylic. Lime-wash and coquina need vapor-permeable systems so moisture can move through the wall. We use mineral-based silicate paints or specialty breathable acrylics on those substrates, never standard Aura or Emerald.',
      },
      {
        question: 'How does HARB review affect a paint timeline?',
        answer:
          'Add 2-4 weeks for approval before any prep starts. We submit color samples, photographs, and the proposed system to HARB at the time we book the job, so review and material lead time run in parallel rather than back-to-back.',
      },
      {
        question: 'Can you work in Davis Shores and Anastasia Island too?',
        answer:
          'Yes. Davis Shores and Anastasia Island are outside the HARB district, so the rules are typical residential. The wrinkle there is salt: most homes are within a half-mile of the water, so we run the same coastal paint system we use in Ponte Vedra and Jacksonville Beach.',
      },
    ],
    whyChoose: [],
    whyHireHeading: 'Why St. Augustine homeowners hire Paint-Techs',
    whyHireCards: [
      {
        title: 'HARB-fluent',
        description:
          'Historic Architectural Review Board paperwork is part of the job, not an afterthought. We submit, follow up, and adjust until the formula clears.',
      },
      {
        title: 'Substrate-matched product',
        description:
          'Lime-wash, coquina, tabby, and heart-pine each take a different paint family. We do not put modern acrylic on a wall that needs to breathe.',
      },
      {
        title: 'Coastal and historic in one bid',
        description:
          'Anastasia Island sits east of the HARB line and west of the Atlantic. Salt-air spec plus historic-color sensitivity, in the same estimate.',
      },
      {
        title: 'World Golf Village and SilverLeaf coverage',
        description:
          'West of the historic district, modern master-planned communities have their own ARB processes. We handle those packets too.',
      },
      {
        title: '52 five-star Google reviews',
        description:
          'Owner Vitor and the Paint-Techs crew have built a 5-star reputation across St. Johns County. Reviews from your St. Augustine neighbors.',
      },
    ],
    servicesShowcase_block: {
      heading: 'Painting services we offer in St. Augustine',
      intro:
        'Five core services with HARB-aware historic prep, substrate-matched product selection, and salt-air specs for Anastasia Island.',
      cards: [
        {
          serviceSlug: 'interior-painting',
          serviceName: 'Interior painting',
          tagline:
            'Wall, ceiling, trim, and door painting for St. Augustine homes from Lincolnville historic cottages to World Golf Village customs. Substrate-matched products on every wall.',
        },
        {
          serviceSlug: 'exterior-painting',
          serviceName: 'Exterior painting',
          tagline:
            'Lime-wash and coquina exteriors get vapor-permeable mineral paints. Modern stucco and frame get Sherwin-Williams Emerald or Benjamin Moore Aura. HARB submission packets included.',
        },
        {
          serviceSlug: 'cabinet-painting',
          serviceName: 'Cabinet painting',
          tagline:
            'Cabinet refinishing for St. Augustine kitchens, including historic homes where original cabinetry needs gentle handling. Factory-grade waterborne lacquer for a smooth finish.',
        },
        {
          serviceSlug: 'pool-deck-painting-staining',
          serviceName: 'Pool deck painting & staining',
          tagline:
            'Heat-reflective deck coatings for St. Augustine and Anastasia Island pool decks. Cool-touch finishes that resist UV and salt drift.',
        },
        {
          serviceSlug: 'commercial-painting',
          serviceName: 'Commercial painting',
          tagline:
            'Interior and exterior commercial painting for retail, offices, and small medical practices across the St. Augustine and St. Johns County corridor.',
        },
      ],
    },
  },

  'fernandina-beach': {
    heroSubtitle:
      'Paint-Techs LLC is a Fernandina Beach painting contractor handling Amelia Island Victorian restorations, Centre Street historic repaints, and Atlantic-facing exterior work for oceanfront homes. Our licensed and insured Fernandina painters hand-scrape original wood cladding rather than power-wash, then run premium acrylic systems over a salt-tolerant primer. 5-star rated with 52 Google reviews. Free evening estimates until 10 PM.',
    heroAccent: 'Fernandina Beach, FL',
    heroImage: '/images/exterior-painting-fernandina-beach-fl-8.webp',
    driveTimeFromHQ: 'About 35 miles north of our Jacksonville office, roughly 45 minutes via I-95 and A1A.',
    serviceInLocation: {
      heading: 'Painting contractor for Fernandina Beach and Amelia Island',
      paragraph: [
        { text: 'Fernandina Beach', href: wiki('Fernandina_Beach,_Florida') },
        ' sits at the north end of ',
        { text: 'Amelia Island', href: wiki('Amelia_Island') },
        ' and combines two paint problems: a 50-block Centre Street historic district full of original Victorian and Queen Anne cladding, and an Atlantic-facing oceanfront strip that hammers exterior coatings every season. Inland subdivisions like Amelia National and Marsh Lakes are newer, but most calls we get here are restorations of original wood siding, gingerbread trim, and porch ceilings. We treat each job as substrate-first: figure out the wood and history before we figure out the color. Service runs through ',
        { text: 'Nassau County', href: wiki('Nassau_County,_Florida') },
        '.',
      ],
      mapEmbedSrc: GMB_MAP_EMBED,
    },
    aeoAnswer: {
      question: 'How do you paint a Fernandina Victorian without damaging original woodwork?',
      answer:
        'Carefully and slowly. Original Victorian cladding gets hand-scraping rather than power-washing, feather-sanding, spot-priming with an alkyd primer that bonds to aged wood, and two finish coats brushed by hand on detail trim. Power tools come out for siding fields only. Gingerbread and corbels are always brush.',
    },
    faqs: [
      {
        question: 'Does the Fernandina Centre Street district have color rules?',
        answer:
          'Yes. The historic district has guideline-based color recommendations rather than a hard fan deck, but the city’s Historic District Council reviews any exterior repaint outside the established palette. We submit photographs and color chips at booking time.',
      },
      {
        question: 'Are there Amelia Island ZIP codes you do not cover?',
        answer:
          'We cover 32034 and 32035 fully. American Beach, Plantation, and the south end toward Nassau Sound are all in scope. The Georgia side of the island is past our service area unless it is paired with a Florida-side project.',
      },
      {
        question: 'Can you handle wood-rot repair on porch columns?',
        answer:
          'Yes. We carry epoxy consolidant for soft-rot in original wood plus stock dimensional lumber for full replacement. Most porch columns are saved with consolidant and a new bottom 12 inches; total replacement is reserved for columns where the inner core has failed.',
      },
    ],
    whyChoose: [],
    whyHireHeading: 'Why Fernandina Beach homeowners hire Paint-Techs',
    whyHireCards: [
      {
        title: 'Victorian-friendly prep',
        description:
          'Hand-scrape, feather-sand, brush original detail. Power tools on the field, not on the trim.',
      },
      {
        title: 'Salt and historic, same crew',
        description:
          'Coastal paint system on the windward side, historic palette compliance on the rest. Amelia Island demands both.',
      },
      {
        title: 'Wood repair included',
        description:
          'Soft-rot consolidant and column repair are part of the estimate, not a surprise change order on day three.',
      },
      {
        title: 'Centre Street district experience',
        description:
          'We submit color packets to the Fernandina Historic District Council on your behalf and keep a record of recently approved schemes.',
      },
      {
        title: '52 five-star Google reviews',
        description:
          'Owner Vitor and the Paint-Techs crew have built a 5-star reputation across Northeast Florida. Reviews from your Amelia Island neighbors.',
      },
    ],
    servicesShowcase_block: {
      heading: 'Painting services we offer in Fernandina Beach',
      intro:
        'Five core services with Victorian-friendly prep, soft-rot wood repair, and marine-grade systems for Atlantic-facing homes.',
      cards: [
        {
          serviceSlug: 'interior-painting',
          serviceName: 'Interior painting',
          tagline:
            'Wall, ceiling, trim, and door painting for Fernandina cottages and Amelia Island Plantation homes. Sherwin-Williams Emerald and Benjamin Moore Aura, color-matched to heritage palettes when needed.',
        },
        {
          serviceSlug: 'exterior-painting',
          serviceName: 'Exterior painting',
          tagline:
            'Hand-scraping and feather-sanding on original Victorian cladding. Marine-grade acrylic over a salt-tolerant primer for Atlantic-facing elevations. 5-9 year repaint cycles depending on exposure.',
        },
        {
          serviceSlug: 'cabinet-painting',
          serviceName: 'Cabinet painting',
          tagline:
            'Cabinet refinishing for Fernandina kitchens, including original cabinetry in historic homes. Factory-grade waterborne lacquer for a smooth, durable finish.',
        },
        {
          serviceSlug: 'pool-deck-painting-staining',
          serviceName: 'Pool deck painting & staining',
          tagline:
            'Heat-reflective deck coatings for Amelia Island pool decks and patios. Cool-touch, slip-resistant finishes for coastal heat and humidity.',
        },
        {
          serviceSlug: 'commercial-painting',
          serviceName: 'Commercial painting',
          tagline:
            'Interior and exterior commercial painting for Centre Street historic district storefronts and Nassau County offices.',
        },
      ],
    },
  },

  middleburg: {
    heroSubtitle:
      'Paint-Techs LLC is a Middleburg painting contractor serving Clay County rural properties along Black Creek, Two Creeks, and Pine Ridge Plantation. Our licensed and insured Middleburg painters handle big-lot logistics, well-and-septic awareness, and overspray protection for tree-lined properties without charging a rural surcharge. 5-star rated with 52 Google reviews. Free estimates daily 8 AM to 10 PM.',
    heroAccent: 'Middleburg, FL',
    heroImage: '/images/exterior-painting-middleburg-fl-7.webp',
    driveTimeFromHQ: 'About 30 miles southwest of our Jacksonville office, roughly 40 minutes via Blanding Boulevard.',
    serviceInLocation: {
      heading: 'Painting contractor serving Middleburg and Clay County',
      paragraph: [
        { text: 'Middleburg', href: wiki('Middleburg,_Florida') },
        ' sits along Black Creek in ',
        { text: 'Clay County', href: wiki('Clay_County,_Florida') },
        ' and runs more rural than the rest of our service area. Lots are larger, driveways are longer, and homes range from original 1970s ranch builds in Black Creek Park to newer subdivisions like Two Creeks and Pine Ridge Plantation. Practically that means more setup time per job, more outdoor staging, and more attention to tree-line overspray. We bring extra drop-cloth coverage and stage one elevation at a time so a passing breeze does not redecorate a fence row.',
      ],
      mapEmbedSrc: GMB_MAP_EMBED,
    },
    aeoAnswer: {
      question: 'Do rural Middleburg jobs cost more because of the drive?',
      answer:
        'No. Paint-Techs does not charge a rural surcharge for Middleburg. Pricing per square foot matches our Jacksonville rate. Our travel costs are absorbed in routing, so a typical 2,000 sq ft Middleburg exterior comes in at the same $4-9 per square foot range as a Duval County job.',
    },
    faqs: [
      {
        question: 'Can you paint a property that has well water and a septic system?',
        answer:
          'Yes. We mask wellheads and septic tank covers before pressure-washing and never use chemical strippers near a well field. Wash water gets directed away from the well casing toward a permeable area at least 50 feet downhill, per Clay County environmental guidance.',
      },
      {
        question: 'Are there driveway-length issues for the work truck?',
        answer:
          'Most Middleburg lots accommodate our 26-foot box truck plus a sprinter for materials. If the driveway is gravel or single-track, we stage on the road shoulder during prep and walk equipment in. Tell us at the estimate so we plan it in.',
      },
      {
        question: 'How do you handle pets on rural properties?',
        answer:
          'Outside dogs and barn cats are normal on Middleburg jobs. We coordinate a kenneled-zone with the homeowner before we open paint, give a daily heads-up before crew arrival, and never leave gates open between work zones. Livestock fences stay intact through the project.',
      },
    ],
    whyChoose: [],
    whyHireHeading: 'Why Middleburg homeowners hire Paint-Techs',
    whyHireCards: [
      {
        title: 'No rural surcharge',
        description:
          'Same per-square-foot pricing in Middleburg as in central Jacksonville. We absorb travel by routing efficiently.',
      },
      {
        title: 'Big-lot logistics',
        description:
          'Extra drop cloths, elevation-by-elevation staging, and overspray awareness for properties with tree lines and pasture borders.',
      },
      {
        title: 'Working-property friendly',
        description:
          'Wells, septics, livestock, outdoor pets. We have worked around all of them and we will work around yours.',
      },
      {
        title: 'Black Creek and Pine Ridge coverage',
        description:
          'From original 1970s Black Creek Park ranch builds to newer Two Creeks and Pine Ridge Plantation subdivisions. We adjust the spec to the home.',
      },
      {
        title: '52 five-star Google reviews',
        description:
          'Owner Vitor and the Paint-Techs crew have built a 5-star reputation across Clay County. Reviews are from your Middleburg neighbors.',
      },
    ],
    servicesShowcase_block: {
      heading: 'Painting services we offer in Middleburg',
      intro:
        'Five core services for Clay County rural and suburban homes, with no rural surcharge and overspray-aware logistics for tree-lined lots.',
      cards: [
        {
          serviceSlug: 'interior-painting',
          serviceName: 'Interior painting',
          tagline:
            'Wall, ceiling, trim, and door painting for Middleburg homes from original ranch builds to Two Creeks and Pine Ridge Plantation customs. Sherwin-Williams Emerald in matte or eggshell. 2-5 day timelines.',
        },
        {
          serviceSlug: 'exterior-painting',
          serviceName: 'Exterior painting',
          tagline:
            'Full house repaints with overspray-aware staging for tree-lined lots. Pressure-wash, scrape, prime, and two coats of premium acrylic. Typical exterior repaint cycle 6-9 years on a properly prepped surface.',
        },
        {
          serviceSlug: 'cabinet-painting',
          serviceName: 'Cabinet painting',
          tagline:
            'Cabinet refinishing for Middleburg kitchens. Factory-grade waterborne lacquer sprayed for a smooth finish. Save 50-70% versus full cabinet replacement.',
        },
        {
          serviceSlug: 'pool-deck-painting-staining',
          serviceName: 'Pool deck painting & staining',
          tagline:
            'Heat-reflective deck coatings for Middleburg pool decks. Cool-touch, slip-resistant finishes built for Florida summer heat.',
        },
        {
          serviceSlug: 'commercial-painting',
          serviceName: 'Commercial painting',
          tagline:
            'Interior and exterior commercial painting for retail, offices, and small businesses across Middleburg and the Clay County corridor.',
        },
      ],
    },
  },

  'orange-park': {
    heroSubtitle:
      'Paint-Techs LLC is an Orange Park painting contractor specializing in PCS-deadline interior repaints for NAS Jacksonville military families plus full house repaints in Fleming Island, Eagle Harbor, and Oakleaf Plantation. Our licensed and insured Orange Park painters offer a 10% military discount on every project, with 4-6 working day turnaround on a typical 2,000 sq ft repaint. 5-star rated with 52 Google reviews. Free estimates daily until 10 PM.',
    heroAccent: 'Orange Park, FL',
    heroImage: '/images/exterior-painting-orange-park-fl-6.webp',
    driveTimeFromHQ: 'About 20 miles southwest of our Jacksonville office, roughly 30 minutes via I-295 and Park Avenue.',
    serviceInLocation: {
      heading: 'House painters in Orange Park and Fleming Island',
      paragraph: [
        { text: 'Orange Park', href: wiki('Orange_Park,_Florida') },
        ' and the surrounding ',
        { text: 'Clay County', href: wiki('Clay_County,_Florida') },
        ' corridor (',
        { text: 'Fleming Island', href: wiki('Fleming_Island,_Florida') },
        ', Eagle Harbor, Oakleaf Plantation) are heavy with ',
        { text: 'NAS Jacksonville', href: wiki('Naval_Air_Station_Jacksonville') },
        ' military families and DoD contractors, which means a lot of move-in and move-out paint windows tied to PCS dates. We hold dates for relocating families, work weekends when the household is mid-pack, and color-match builder formulas so the first six months in a new home look like the model unit. Older Orange Park core homes off US-17 swing more historic-prep, with peeling 1980s acrylic over original board-and-batten.',
      ],
      mapEmbedSrc: GMB_MAP_EMBED,
    },
    aeoAnswer: {
      question: 'Can you turn around a PCS-deadline repaint quickly?',
      answer:
        'Yes. PCS-tied repaints in Orange Park and Fleming Island are routine for us. We block 4-6 working days for a typical 2,000 sq ft interior repaint and can start within 5-10 days of the estimate during normal seasons. Send the orders and we will reverse-engineer the schedule from the report-no-later-than date.',
    },
    faqs: [
      {
        question: 'Do you offer a military discount?',
        answer:
          'Yes, active-duty, retired, and reserve military families get 10% off labor on Orange Park and Fleming Island projects. Show any valid military ID at the estimate. The discount also applies to Coast Guard families based at Mayport.',
      },
      {
        question: 'Can you color-match a builder paint when the family moves out?',
        answer:
          'Yes. Most Orange Park master-planned subdivisions used standard builder formulas. We pull the original code from the breaker-panel sticker or a hidden touch-up can, match it on a Sherwin-Williams ColorSnap, and supply a small reserve can for the next family’s touch-ups.',
      },
      {
        question: 'How do you handle jobs while we are mid-pack for a move?',
        answer:
          'Carefully. We work room-by-room on the side of the house already packed, ask the moving company for which days the truck is on-site, and stage furniture and unfinished boxes in a controlled zone covered with breathable drops. Most repaints take 4-5 days, which fits inside a typical Orange Park PCS week.',
      },
    ],
    whyChoose: [],
    whyHireHeading: 'Why Orange Park homeowners hire Paint-Techs',
    whyHireCards: [
      {
        title: 'PCS-aware scheduling',
        description:
          'We hold dates for incoming and outgoing military families. The estimate includes the report-date math.',
      },
      {
        title: '10% military discount',
        description:
          'Active, retired, and reserve. Coast Guard families based at Mayport too. Standing offer, no expiration.',
      },
      {
        title: 'Builder-color match in stock',
        description:
          'Standard Orange Park subdivision formulas matched same-day. Touch-up reserves left for the family who moves in.',
      },
      {
        title: 'Fleming Island and Eagle Harbor coverage',
        description:
          'From the older Orange Park core off US-17 to Fleming Island, Eagle Harbor, and Oakleaf Plantation. We know which formula goes with which subdivision.',
      },
      {
        title: '52 five-star Google reviews',
        description:
          'Owner Vitor and the Paint-Techs crew have built a 5-star reputation across Clay County. Reviews from your Orange Park neighbors.',
      },
    ],
    servicesShowcase_block: {
      heading: 'Painting services we offer in Orange Park',
      intro:
        'Five core services with PCS-aware scheduling for NAS Jax military families plus 10% military discount on every project.',
      cards: [
        {
          serviceSlug: 'interior-painting',
          serviceName: 'Interior painting',
          tagline:
            'Wall, ceiling, trim, and door painting for Orange Park homes including Fleming Island, Eagle Harbor, and Oakleaf Plantation. Builder-color match in stock. 2-5 day timelines.',
        },
        {
          serviceSlug: 'exterior-painting',
          serviceName: 'Exterior painting',
          tagline:
            'Full house repaints for Clay County exteriors. Pressure-wash, scrape, prime, and two coats of premium acrylic. 7-10 year repaint cycles on properly prepped surfaces.',
        },
        {
          serviceSlug: 'cabinet-painting',
          serviceName: 'Cabinet painting',
          tagline:
            'Cabinet refinishing for Orange Park and Fleming Island kitchens. Factory-grade waterborne lacquer for a smooth finish. 3-5 day in-home turnaround.',
        },
        {
          serviceSlug: 'pool-deck-painting-staining',
          serviceName: 'Pool deck painting & staining',
          tagline:
            'Heat-reflective deck coatings for Orange Park pool decks. Cool-touch, slip-resistant finishes for Florida summer heat.',
        },
        {
          serviceSlug: 'commercial-painting',
          serviceName: 'Commercial painting',
          tagline:
            'Interior and exterior commercial painting for retail, offices, and small businesses across the Orange Park and Fleming Island corridor.',
        },
      ],
    },
  },

  yulee: {
    heroSubtitle:
      'Paint-Techs LLC is a Yulee painting contractor handling new-construction touch-ups, full repaints, and builder-grade upgrades for Tributary, Heron Isles, Hickory Village, and the SR-200 corridor in Nassau County. Our licensed and insured Yulee painters upgrade builder-flat to scrubbable Sherwin-Williams Emerald or Benjamin Moore Aura, with original color-code matching on request. 5-star rated with 52 Google reviews. Free estimates daily 8 AM to 10 PM.',
    heroAccent: 'Yulee, FL',
    heroImage: '/images/exterior-painting-yulee-fl-9.webp',
    driveTimeFromHQ: 'About 25 miles north of our Jacksonville office, roughly 35 minutes via I-95.',
    serviceInLocation: {
      heading: 'House painters serving Yulee and Nassau County',
      paragraph: [
        { text: 'Yulee', href: wiki('Yulee,_Florida') },
        ' is one of the fastest-growing communities in Northeast Florida, with new subdivisions opening every quarter along the SR-200 corridor and through Tributary, Heron Isles, and Hickory Village. Most of our calls here are first-year touch-up packages on builder paint that started failing at month three: handprints near light switches, scuffed corners, color drift between walls and ceilings. We upgrade interior repaints from builder-flat to Sherwin-Williams Emerald in eggshell so future scuffs actually wash off. Service runs through ',
        { text: 'Nassau County', href: wiki('Nassau_County,_Florida') },
        '.',
      ],
      mapEmbedSrc: GMB_MAP_EMBED,
    },
    aeoAnswer: {
      question: 'Should I repaint my new-build interior already?',
      answer:
        'If the walls are showing scuffs after three to six months, yes. Most builder-grade interior paint is flat acrylic that does not scrub. Upgrading to Sherwin-Williams Emerald or Benjamin Moore Aura in matte or eggshell gives you a washable surface, full color hold, and another 8-10 years before the next repaint.',
    },
    faqs: [
      {
        question: 'Will repainting void my new-construction warranty?',
        answer:
          'No. Paint is a finish-level item, not a structural component. Builder warranties on framing, roofing, and systems remain intact. The only thing you change is the paint itself, and most builders document this as expected within the first 12 months.',
      },
      {
        question: 'Can you match the exact builder color across the whole house?',
        answer:
          'Yes. Original code is usually on the breaker panel or in a touch-up can left in the garage. If neither survived, we color-match a hidden corner sample on a Sherwin-Williams ColorSnap and supply the formula plus a reserve can.',
      },
      {
        question: 'Do you cover the whole Tributary and Heron Isles area?',
        answer:
          'Yes. Tributary, Heron Isles, Hickory Village, and the Lofton Creek-area subdivisions are all routine routes for us. We pair routing with adjacent jobs to keep travel time down.',
      },
    ],
    whyChoose: [],
    whyHireHeading: 'Why Yulee homeowners hire Paint-Techs',
    whyHireCards: [
      {
        title: 'Builder-paint upgrade',
        description:
          'Flat to eggshell, builder line to Sherwin-Williams Emerald or Benjamin Moore Aura. Scuffs wash off, color holds, and the next 8-10 years stay clean.',
      },
      {
        title: 'New-build experience',
        description:
          'Tributary, Heron Isles, Hickory Village. We have painted in all of them and know which builders use which formulas.',
      },
      {
        title: 'Warranty-safe',
        description:
          'Repainting does not affect the rest of your builder warranty. We document our work so the next walk-through goes smoothly.',
      },
      {
        title: 'SR-200 corridor coverage',
        description:
          'From new subdivisions opening every quarter along SR-200 through the Lofton Creek-area neighborhoods. Routine routes for our crews.',
      },
      {
        title: '52 five-star Google reviews',
        description:
          'Owner Vitor and the Paint-Techs crew have built a 5-star reputation across Nassau County. Reviews from your Yulee neighbors.',
      },
    ],
    servicesShowcase_block: {
      heading: 'Painting services we offer in Yulee',
      intro:
        'Five core services with first-year touch-up packages on builder paint plus full repaints for new-construction homes across Nassau County.',
      cards: [
        {
          serviceSlug: 'interior-painting',
          serviceName: 'Interior painting',
          tagline:
            'Wall, ceiling, trim, and door painting for Yulee new-build homes in Tributary, Heron Isles, and Hickory Village. Builder-flat upgraded to scrubbable Sherwin-Williams Emerald in eggshell.',
        },
        {
          serviceSlug: 'exterior-painting',
          serviceName: 'Exterior painting',
          tagline:
            'Full house repaints with first-year-warranty-safe touch-ups for new construction. Pressure-wash, prime, and two coats of premium acrylic. 8-10 year repaint cycles on a properly prepped surface.',
        },
        {
          serviceSlug: 'cabinet-painting',
          serviceName: 'Cabinet painting',
          tagline:
            'Cabinet refinishing for Yulee new-build kitchens where builder-grade cabinetry needs an upgrade. Factory-grade waterborne lacquer sprayed for a smooth, durable finish.',
        },
        {
          serviceSlug: 'pool-deck-painting-staining',
          serviceName: 'Pool deck painting & staining',
          tagline:
            'Heat-reflective deck coatings for Yulee pool decks. Cool-touch, slip-resistant finishes designed for Northeast Florida summer heat.',
        },
        {
          serviceSlug: 'commercial-painting',
          serviceName: 'Commercial painting',
          tagline:
            'Interior and exterior commercial painting for retail, offices, and small businesses along the SR-200 corridor and Nassau County.',
        },
      ],
    },
  },
};
