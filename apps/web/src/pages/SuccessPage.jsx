import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CheckCircle, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function SuccessPage() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t.successTitle}</title>
        <meta name="description" content={t.successMeta} />
      </Helmet>
      <main className="min-h-[100dvh] flex items-center justify-center px-6">
        <div className="max-w-xl w-full text-center border border-border bg-card p-10 md:p-16">
          <span className="font-label text-xs text-muted-foreground">{t.orderConfirm}</span>
          <CheckCircle className="mx-auto mt-6 h-14 w-14 text-foreground" strokeWidth={1.25} />
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-6 leading-tight">{t.thankYou}</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">{t.successBody}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center border border-foreground bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98] hover:opacity-90"
            >
              {t.backToStore}
            </Link>
            <a
              href={`tel:${t.phone}`}
              className="inline-flex items-center justify-center gap-2 border border-border px-8 py-3 text-sm font-medium transition-colors hover:bg-accent"
            >
              <Phone size={16} />
              <span dir="ltr">{t.phone}</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default SuccessPage;
