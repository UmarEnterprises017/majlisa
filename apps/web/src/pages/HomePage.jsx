import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ShoppingBag, ArrowDown } from 'lucide-react';
import ProductsList from '@/components/ProductsList';
import ShoppingCart from '@/components/ShoppingCart';
import Reveal from '@/components/Reveal';
import { useCart } from '@/hooks/useCart';
import { useLanguage } from '@/context/LanguageContext';

const CURTAIN_GALLERY = [
  'https://horizons-cdn.hostinger.com/2f11584c-0235-497c-952a-c10b88aa841f/d76d06cf51195eb19153fb3a2f9651ae.jpg',
  'https://horizons-cdn.hostinger.com/2f11584c-0235-497c-952a-c10b88aa841f/69b3aca2b117e8a315e41c1f41f68bd3.jpg',
  'https://horizons-cdn.hostinger.com/2f11584c-0235-497c-952a-c10b88aa841f/37fadb75d9eba6512b6ca70f0062f057.jpg',
  'https://horizons-cdn.hostinger.com/2f11584c-0235-497c-952a-c10b88aa841f/8cb43222ba8483dcf864599f8d48dd38.jpg',
  'https://horizons-cdn.hostinger.com/2f11584c-0235-497c-952a-c10b88aa841f/b75e48b0a595637201abcf174d3e40c8.jpg',
];

function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();
  const { lang, setLang, t } = useLanguage();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Helmet>
        <title>{t.homeMetaTitle}</title>
        <meta name="description" content={t.homeMetaDesc} />
      </Helmet>

      <div className="min-h-[100dvh] bg-background text-foreground">
        <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <Link to="/" className="font-display text-base font-bold leading-tight md:text-xl line-clamp-2">
              {t.businessName}
            </Link>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <div
                className="inline-flex border border-border text-xs font-medium"
                role="group"
                aria-label="Language"
              >
                <button
                  type="button"
                  onClick={() => setLang('ar')}
                  className={`px-2.5 py-2 transition-colors sm:px-3 ${
                    lang === 'ar' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                  }`}
                >
                  العربية
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-2 transition-colors sm:px-3 ${
                    lang === 'en' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                  }`}
                >
                  English
                </button>
              </div>
              <a
                href={`tel:${t.phone}`}
                className="hidden sm:inline-flex items-center gap-2 border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
              >
                <Phone size={15} />
                <span dir="ltr">{t.phone}</span>
              </a>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative inline-flex items-center gap-2 border border-foreground bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98] sm:px-4"
                aria-label={t.cartAria}
              >
                <ShoppingBag size={16} />
                <span className="hidden sm:inline">{t.cart}</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -start-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[11px] font-bold text-destructive-foreground">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        <section className="relative border-b border-border">
          <div className="pointer-events-none absolute top-8 end-6 font-display text-[9rem] leading-none text-foreground/5 select-none md:text-[14rem]">
            {lang === 'ar' ? '٠١' : '01'}
          </div>
          <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-36">
            <Reveal>
              <p className="font-label text-xs text-muted-foreground">{t.heroLabel}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display mt-6 text-5xl font-bold leading-[1.15] md:text-7xl">
                {t.heroTitle1}
                <br />
                {t.heroTitle2}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t.heroText}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 border border-foreground bg-primary px-10 py-4 text-base font-medium text-primary-foreground transition-transform active:scale-[0.98] hover:opacity-90"
                >
                  {t.browseProducts}
                  <ArrowDown size={16} />
                </a>
                <a
                  href={`tel:${t.phone}`}
                  className="inline-flex items-center gap-2 border border-border px-10 py-4 text-base font-medium transition-colors hover:bg-accent"
                >
                  <Phone size={16} />
                  <span dir="ltr">{t.phone}</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <Reveal>
              <p className="font-label text-xs text-muted-foreground">{lang === 'ar' ? 'أعمالنا' : 'Our work'}</p>
              <h2 className="font-display mt-3 text-3xl font-bold md:text-4xl">
                {lang === 'ar' ? 'عينات من ستائرنا' : 'Sample curtain installations'}
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
              {CURTAIN_GALLERY.map((src, i) => (
                <Reveal key={src} delay={i * 0.05}>
                  <div className="overflow-hidden border border-border aspect-[3/4]">
                    <img
                      src={src}
                      alt={lang === 'ar' ? `ستائر عينة ${i + 1}` : `Sample curtains ${i + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <Reveal>
              <p className="font-label text-xs text-muted-foreground">{t.servicesLabel}</p>
              <h2 className="font-display mt-3 text-3xl font-bold md:text-5xl">{t.servicesTitle}</h2>
            </Reveal>
            <div className="mt-12 border-t border-border">
              {t.services.map((service, i) => (
                <Reveal key={service.index} delay={i * 0.08}>
                  <div className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 border-b border-border py-8 transition-colors hover:bg-accent/50 md:grid-cols-[8rem_1fr_2fr]">
                    <span className="font-display text-4xl font-bold text-foreground/25 transition-colors group-hover:text-foreground/60 md:text-6xl">
                      {service.index}
                    </span>
                    <h3 className="font-display text-2xl font-bold md:text-3xl">{service.title}</h3>
                    <p className="col-span-2 leading-relaxed text-muted-foreground md:col-span-1">{service.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="relative border-b border-border">
          <div className="pointer-events-none absolute top-8 start-6 font-display text-[9rem] leading-none text-foreground/5 select-none md:text-[14rem]">
            {lang === 'ar' ? '٠٢' : '02'}
          </div>
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <Reveal>
              <div className="text-center">
                <p className="font-label text-xs text-muted-foreground">{t.storeLabel}</p>
                <h2 className="font-display mt-3 text-3xl font-bold md:text-5xl">{t.storeTitle}</h2>
                <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{t.storeText}</p>
              </div>
            </Reveal>
            <div className="mt-14">
              <ProductsList />
            </div>
          </div>
        </section>

        <section id="contact" className="relative">
          <div className="pointer-events-none absolute top-8 end-6 font-display text-[9rem] leading-none text-foreground/5 select-none md:text-[14rem]">
            {lang === 'ar' ? '٠٣' : '03'}
          </div>
          <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
            <Reveal>
              <p className="font-label text-xs text-muted-foreground">{t.contactLabel}</p>
              <h2 className="font-display mt-3 text-3xl font-bold md:text-5xl">{t.contactTitle}</h2>
            </Reveal>
            <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
              <Reveal delay={0.1}>
                <a
                  href={`tel:${t.phone}`}
                  className="flex h-full flex-col items-center gap-3 bg-card p-10 transition-colors hover:bg-accent/60"
                >
                  <Phone size={22} strokeWidth={1.5} />
                  <span className="font-label text-[11px] text-muted-foreground">{t.callUs}</span>
                  <span className="font-display text-3xl font-bold" dir="ltr">
                    {t.phone}
                  </span>
                </a>
              </Reveal>
              <Reveal delay={0.2}>
                <a
                  href="https://maps.google.com/?q=Riyadh+Saudi+Arabia"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-full flex-col items-center gap-3 bg-card p-10 text-center transition-colors hover:bg-accent/60"
                >
                  <MapPin size={22} strokeWidth={1.5} />
                  <span className="font-label text-[11px] text-muted-foreground">{t.ourLocation}</span>
                  {lang === 'ar' ? (
                    <div className="text-base leading-relaxed">
                      <p className="font-semibold mb-1">مناطق الخدمة في الرياض:</p>
                      <p>الملقا، حطين، الياسمين، النخيل، النفل، الغدير، مركز الملك عبد الله المالي (KAFD)، 3621 الحوي، العقيق، الرياض 13515، المملكة العربية السعودية</p>
                    </div>
                  ) : (
                    <div className="text-base leading-relaxed">
                      <p className="font-semibold mb-1">Service Areas in Riyadh:</p>
                      <p>Al Malqa, Hittin, Al Yasmin, An Nakheel, An Nafel, Al Ghadir, KAFD (King Abdullah Financial District), 3621 Al Huway, Al Aqiq, Riyadh 13515, Saudi Arabia</p>
                    </div>
                  )}
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-center">
            <p className="font-display text-lg font-bold">{t.businessName}</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <a href={`tel:${t.phone}`} className="inline-flex items-center gap-2 hover:text-foreground">
                <Phone size={14} />
                <span dir="ltr">{t.phone}</span>
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} />
                {t.address}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} — {t.rights}
            </p>
          </div>
        </footer>

        <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      </div>
    </>
  );
}

export default HomePage;
