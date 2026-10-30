import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import heroTrailer from "@/assets/hero-trailer.jpg";
import beforeYard from "@/assets/before-yard.jpg";
import afterYard from "@/assets/after-yard.jpg";
import logoAsset from "@/assets/wild-roots-logo.png.asset.json";

const TITLE = "Wild Roots Hauling | Junk Removal in Springfield & Eugene, OR";
const DESCRIPTION =
  "Locally owned junk removal, property cleanouts, brush clearing, stump grinding and small excavation in Springfield, Eugene and Lane County. Free estimates — call +1 458-209-2550.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://wildrootshauling.com/" },
      { property: "og:image", content: "https://wildrootshauling.com/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Wild Roots Hauling dump trailer in the Oregon mountains — heavy lifting for the Willamette Valley" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://wildrootshauling.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://wildrootshauling.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Wild Roots Hauling and Junk Removal",
          description: DESCRIPTION,
          telephone: "+1-458-209-2550",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Springfield",
            addressRegion: "OR",
            addressCountry: "US",
          },
          areaServed: ["Springfield, OR", "Eugene, OR", "Lane County, OR"],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "11",
            bestRating: "5",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],

  }),
  component: Index,
});



const PHONE = "+1 458-209-2550";

const services = [
  {
    title: "Junk & Furniture Removal",
    copy: "Efficient removal of old appliances, mattresses, and general household clutter.",
    items: ["Foreclosure Cleanouts", "Appliance Recycling", "Mattress Disposal"],
  },
  {
    title: "Land & Brush Clearing",
    copy: "Restoring overgrown properties with professional blackberry and brush removal.",
    items: ["Gutter Cleaning", "Blackberry Mitigation", "Yard Waste Hauling"],
  },
  {
    title: "Excavation & Prep",
    copy: "Light demolition, stump grinding, and gravel driveway repair for local owners.",
    items: ["Small Excavation", "Site Prep Work", "Stump Grinding"],
  },
];

const reasons = [
  {
    title: "Transparent Pricing",
    copy: "No hidden fees. We provide clear, affordable quotes before the engine even starts.",
  },
  {
    title: "Eco-Friendly Disposal",
    copy: "We sort all loads to ensure everything recyclable stays out of the landfill.",
  },
  {
    title: "Local Expertise",
    copy: "Born and raised in Lane County, we know the terrain and the community's needs.",
  },
];

const REVIEW_COUNT = 11;
const GOOGLE_URL = "https://share.google/1oDJ2Sm7Ssnp4roVw";

const reviews = [
  {
    name: "James Down",
    meta: "Google review · 7 months ago",
    quote:
      "Kevin was a pleasure to work with. He was fair in his pricing, quick to respond, and most importantly got the job done! We had old furniture to haul away and he loaded up several pieces himself like it was a walk in the park.",
  },
  {
    name: "Shawn Thurber",
    meta: "Local Guide · 3 weeks ago",
    quote:
      "Kevin replied so fast. Got my junk hauled within an hour! Professional, courteous, and helpful.",
  },
  {
    name: "Mia Bowman",
    meta: "Google review · 6 months ago",
    quote:
      "Wild Roots is THE go to for hauling and junk removal! Quick, friendly service, great prices! This company needs to be in your 'home improvement' toolbox!",
  },
  {
    name: "Gary Hibbard",
    meta: "Google review · 9 months ago",
    quote:
      "Called the owner Kevin Tuesday morning, he was at my house giving me an estimate by that evening. Completed the job a couple days later and came in under budget. Even took care of an old tree stump for me.",
  },
  {
    name: "Justin Carter",
    meta: "Google review · 6 months ago",
    quote:
      "Kevin was fast to reply, and within 24 hours our junk was hauled away. I really appreciated his communication and professionalism.",
  },
  {
    name: "Ethan Fisher",
    meta: "Google review · 8 months ago",
    quote:
      "Kevin is a true professional. Everything he has done for us has been at the highest level of hard work and professionalism. He will from now on be our only call for his services.",
  },
];

const faqs = [
  {
    q: "What areas do you serve?",
    a: "Springfield and Eugene, plus the surrounding Lane County communities including Creswell, Pleasant Hill, Veneta and Junction City.",
  },
  {
    q: "How much does junk removal cost?",
    a: "Pricing depends on the volume of the load and the labor involved. Estimates are always free and quoted up front before any work starts — no hidden fees.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes. Call or text +1 458-209-2550, or send the details through the estimate form and we'll get back to you within 24 hours. Photos of the pile or property help us quote faster.",
  },
  {
    q: "How soon can you come out?",
    a: "Same-week service is typical, and many jobs are handled within 24 hours. We answer the phone until 10 PM, so late-day requests still get a response the same day.",
  },
  {
    q: "What do you haul away?",
    a: "Furniture, mattresses, appliances, household clutter, garage and shed contents, yard and brush debris, construction and remodel debris, and full property or foreclosure cleanouts.",
  },
  {
    q: "Is there anything you can't take?",
    a: "We cannot handle hazardous materials such as wet paint, chemicals, solvents, asbestos or fuel. If you're unsure about an item, call and ask — we'll point you to the right disposal option.",
  },
  {
    q: "Do I need to move everything to the curb?",
    a: "No. We do the lifting and loading, whether the items are in the backyard, upstairs, or inside a garage. Curbside piles are welcome too.",
  },
  {
    q: "What happens to my junk after pickup?",
    a: "Loads are sorted so recyclable metal, appliances and yard debris stay out of the landfill whenever possible. Only true waste goes to the transfer station.",
  },
  {
    q: "Do you do more than junk removal?",
    a: "Yes — brush and blackberry clearing, stump grinding, light demolition, gravel driveway repair, gutter cleaning and small excavation or site prep work.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Wild Roots Hauling LLC is locally owned, licensed and insured, and every job is handled personally by owner Kevin.",
  },
];


function Stars({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex gap-0.5 ${className}`}
      role="img"
      aria-label="Rated 5 out of 5 stars"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.86-4.25 4.14 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.66l5.9-.86L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}


function Index() {
  useEffect(() => {
    const existing = document.querySelector('script[data-widget-id="6a90f89f69049b9fa4889957"]');
    if (existing) return;
    const script = document.createElement("script");
    script.src = "https://widgets.leadconnectorhq.com/loader.js";
    script.setAttribute("data-resources-url", "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
    script.setAttribute("data-widget-id", "6a90f89f69049b9fa4889957");
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="top" className="bg-off-white text-near-black font-barlow">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-forest/20 bg-near-black px-6 py-4 text-off-white md:px-12">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={logoAsset.url}
            alt="Wild Roots Hauling logo — mountains and pines above the company name"
            className="h-11 w-auto md:h-14"
          />
          <span className="sr-only">Wild Roots Hauling — Springfield, Oregon</span>
        </a>
        <div className="flex items-center gap-6">
          <a href="#faq" className="hidden font-bebas text-lg tracking-wide text-sage hover:text-off-white md:block">
            FAQ
          </a>
          <a
            href="tel:+14582092550"
            className="hidden bg-moss px-6 py-2 font-bebas text-lg tracking-wide text-off-white transition-colors hover:bg-sage md:block"
          >
            {PHONE}
          </a>
        </div>

      </nav>

      <section className="relative flex h-[85vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroTrailer}
            alt="Wild Roots Hauling dump trailer parked on a gravel driveway in an Oregon forest"
            width={1920}
            height={1088}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-near-black via-near-black/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 md:px-12">
          <a
            href={GOOGLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 inline-flex items-center gap-3 border border-sage/40 bg-near-black/60 px-4 py-2 backdrop-blur-sm transition-colors hover:border-sage"
          >
            <Stars className="text-sage" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-off-white">
              5.0 from {REVIEW_COUNT} Google reviews
            </span>
          </a>
          <h1 className="mb-6 font-bebas text-6xl leading-[0.9] text-off-white drop-shadow-sm md:text-8xl">

            HEAVY LIFTING FOR THE <span className="text-sage">WILLAMETTE VALLEY</span>
          </h1>
          <p className="mb-8 max-w-xl text-xl font-light text-off-white/90 md:text-2xl">
            Locally owned and operated junk removal, site prep, and property clearing. We handle the
            dirty work so you don't have to.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#estimate"
              className="bg-sage px-10 py-4 font-bebas text-2xl text-forest transition-all hover:bg-off-white"
            >
              Get a Free Estimate
            </a>
            <a
              href="tel:+14582092550"
              className="border-2 border-off-white px-10 py-4 font-bebas text-2xl text-off-white transition-all hover:bg-off-white hover:text-forest"
            >
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-off-white/10 bg-near-black px-6 py-6 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-10 gap-y-4">
          {[
            "5.0 stars · 11 Google reviews",
            "Locally owned in Springfield",
            "Licensed & insured",
            "Free, no-pressure estimates",
            "Open until 10 PM · Same-week service",
          ].map((item) => (
            <span
              key={item}
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-sage"
            >
              {item}
            </span>
          ))}
        </div>
      </section>


      <section className="bg-forest px-6 py-24 text-off-white md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="mb-4 font-bebas text-5xl md:text-6xl">OUR SPECIALIZED SERVICES</h2>
              <p className="text-lg text-sage/80">
                From residential cleanouts to small-scale excavation, we bring the right equipment
                for every job.
              </p>
            </div>
            <div className="mx-8 mb-6 hidden h-px grow bg-sage/20 md:block" />
          </div>

          <div className="grid grid-cols-1 gap-px bg-sage/10 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="group bg-forest p-8 transition-colors hover:bg-deep-moss">
                <h3 className="mb-4 font-bebas text-3xl transition-colors group-hover:text-sage">
                  {s.title}
                </h3>
                <p className="mb-6 text-off-white/70">{s.copy}</p>
                <ul className="space-y-2 text-sm text-sage/60">
                  {s.items.map((i) => (
                    <li key={i}>• {i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 text-center font-bebas text-5xl md:text-6xl">WORK IN PROGRESS</h2>
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className="relative">
                <img
                  src={beforeYard}
                  alt="Backyard filled with debris, old furniture and scrap metal before cleanup"
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="aspect-4/3 w-full object-cover"
                />
                <span className="absolute left-4 top-4 bg-near-black px-4 py-1 font-bebas text-xl text-off-white">
                  BEFORE
                </span>
              </div>
              <div className="relative">
                <img
                  src={afterYard}
                  alt="The same backyard fully cleared with clean grass after Wild Roots Hauling"
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="aspect-4/3 w-full object-cover"
                />
                <span className="absolute left-4 top-4 bg-moss px-4 py-1 font-bebas text-xl text-off-white">
                  AFTER
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-8">
              <div className="border-l-4 border-moss pl-8">
                <h3 className="mb-4 font-bebas text-4xl">WHY CHOOSE WILD ROOTS?</h3>
                <div className="space-y-6">
                  {reasons.map((r) => (
                    <div key={r.title}>
                      <h4 className="mb-1 text-lg font-bold">{r.title}</h4>
                      <p className="text-near-black/70">{r.copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-near-black/10 bg-off-white px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-moss">
                Verified on Google
              </p>
              <h2 className="font-bebas text-5xl md:text-6xl">WHAT NEIGHBORS SAY</h2>
            </div>
            <div className="flex items-center gap-4 border-l-4 border-moss pl-6">
              <span className="font-bebas text-6xl leading-none text-forest">5.0</span>
              <div>
                <Stars className="text-moss" />
                <p className="mt-1 text-sm font-medium text-near-black/60">
                  {REVIEW_COUNT} Google reviews
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px bg-near-black/10 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="flex flex-col bg-off-white p-8">
                <Stars className="text-moss" />
                <blockquote className="mt-4 grow text-near-black/80">"{r.quote}"</blockquote>
                <figcaption className="mt-6 border-t border-near-black/10 pt-4">
                  <span className="block font-bebas text-2xl leading-none">{r.name}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-near-black/40">
                    {r.meta}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a
              href={GOOGLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-forest px-8 py-3 font-bebas text-xl text-off-white transition-colors hover:bg-moss"
            >
              Read all reviews on Google
            </a>
            <p className="text-sm text-near-black/60">
              Every job is handled personally by owner Kevin — the same person who answers the phone.
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-near-black/10 bg-off-white px-6 py-24 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-moss">
              Questions
            </p>
            <h2 className="font-bebas text-5xl md:text-6xl">FREQUENTLY ASKED</h2>
          </div>

          <div className="divide-y divide-near-black/10 border-y border-near-black/10">
            {faqs.map((f) => (
              <details key={f.q} className="group px-1 py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <h3 className="font-bebas text-2xl leading-tight md:text-3xl">{f.q}</h3>
                  <span className="mt-1 shrink-0 font-bebas text-2xl text-moss transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl leading-relaxed text-near-black/70">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="tel:+14582092550"
              className="bg-forest px-8 py-3 font-bebas text-xl text-off-white transition-colors hover:bg-moss"
            >
              Call {PHONE}
            </a>
            <a href="#estimate" className="font-bebas text-xl text-forest hover:text-moss">
              Or request a free estimate →
            </a>
          </div>
        </div>
      </section>

      <section id="estimate" className="bg-near-black px-6 py-24 md:px-12">


        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bebas text-5xl text-sage md:text-6xl">GET A FREE ESTIMATE</h2>
            <p className="text-off-white/60">
              Send us the details of your job and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="min-h-[750px] overflow-hidden rounded-lg bg-white/5">
            <iframe
              src="https://link.leadtocustomerssystem.com/widget/form/1QF0KsLTHmW26YeN3AD6"
              style={{ width: "100%", height: "100%", border: "none", borderRadius: "8px" }}
              id="inline-1QF0KsLTHmW26YeN3AD6"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Form 0"
              data-height="750"
              data-layout-iframe-id="inline-1QF0KsLTHmW26YeN3AD6"
              data-form-id="1QF0KsLTHmW26YeN3AD6"
              data-cookie-consent="true"
              data-cookie-consent-provider="auto"
              title="Form 0"
            />
          </div>
          <script src="https://link.leadtocustomerssystem.com/js/form_embed.js" defer></script>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-forest px-6 py-12 text-off-white/60 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <img
              src={logoAsset.url}
              alt="Wild Roots Hauling logo"
              className="mb-6 h-20 w-auto"
            />
            <h4 className="mb-6 font-bebas text-2xl tracking-wide text-off-white">
              WILD ROOTS HAULING LLC
            </h4>
            <p className="mb-6 text-sm leading-relaxed">
              Your professional partner for hauling and site management in Springfield and Eugene.
              Licensed, insured, and locally owned.
            </p>
            <a
              href="https://www.facebook.com/wildrootshauling"
              className="text-sage transition-colors hover:text-off-white"
            >
              Follow us on Facebook
            </a>
          </div>
          <div>
            <h4 className="mb-6 font-bebas text-2xl tracking-wide text-off-white">SERVICE AREA</h4>
            <ul className="space-y-2 text-sm">
              <li>Springfield, OR</li>
              <li>Eugene, OR</li>
              <li>Creswell &amp; Pleasant Hill</li>
              <li>Veneta &amp; Junction City</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 font-bebas text-2xl tracking-wide text-off-white">CONTACT</h4>
            <a href="tel:+14582092550" className="mb-2 block font-bebas text-2xl text-sage">
              {PHONE}
            </a>
            <p className="text-sm">Serving all of Lane County</p>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-white/5 pt-8 text-center text-[10px] uppercase tracking-widest">
          © 2026 Wild Roots Hauling, LLC • Professional Junk Removal &amp; Excavation
        </div>
      </footer>
    </div>
  );
}
