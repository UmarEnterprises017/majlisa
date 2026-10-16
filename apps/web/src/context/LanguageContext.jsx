import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext(null);

const translations = {
  ar: {
    dir: 'rtl',
    locale: 'ar',
    businessName: 'تفصیل ترکیب ستائر رول ویفی عربی مجلس کنب کل انواع',
    phone: '0553202514',
    address: '3621 الحوي, Al Aqiq, Riyadh 13515, Saudi Arabia',
    cart: 'السلة',
    cartAria: 'سلة التسوق',
    cartTitle: 'سلة التسوق',
    cartEmpty: 'سلتك فارغة.',
    cartEmptyCheckout: 'أضف بعض المنتجات إلى السلة قبل إتمام الشراء.',
    cartEmptyTitle: 'سلتك فارغة',
    remove: 'إزالة',
    total: 'المجموع',
    checkout: 'إتمام الشراء',
    checkoutErrorTitle: 'خطأ في إتمام الشراء',
    checkoutErrorDesc: 'حدثت مشكلة أثناء بدء عملية الدفع، يرجى المحاولة مرة أخرى.',
    heroLabel: 'الرياض — حي العقيق',
    heroTitle1: 'ستائر ووسائد',
    heroTitle2: 'تُفصَّل على مقاس بيتك',
    heroText:
      'متخصصون في تفصيل وتركيب ستائر الرول، وستائر المجالس العربية الفاخرة، ووسائد الكنب المخصصة — بخامات راقية وخياطة متقنة.',
    browseProducts: 'تصفح المنتجات',
    servicesLabel: 'خدماتنا',
    servicesTitle: 'كل ما يحتاجه مجلسك وبيتك',
    storeLabel: 'المتجر',
    storeTitle: 'منتجاتنا المخصصة',
    storeText: 'اختر منتجك وأضفه إلى السلة، أو اتصل بنا مباشرة لتحديد المقاسات والتفاصيل.',
    contactLabel: 'تواصل معنا',
    contactTitle: 'نسعد بخدمتك',
    callUs: 'اتصل بنا',
    ourLocation: 'موقعنا',
    rights: 'جميع الحقوق محفوظة',
    addToCart: 'أضف إلى السلة',
    bookNow: 'احجز الآن',
    whatsappCta: 'اطلب تصميمك عبر واتساب',
    whatsappCtaShort: 'اطلب عبر واتساب',
    addedTitle: 'تمت الإضافة إلى السلة',
    addedDesc: (title) => `تمت إضافة «${title}» إلى سلتك.`,
    addFailTitle: 'تعذرت الإضافة إلى السلة',
    loadError: 'حدث خطأ أثناء تحميل المنتجات، يرجى المحاولة لاحقاً.',
    noProducts: 'لا توجد منتجات متاحة حالياً.',
    defaultSubtitle: 'تفصيل حسب الطلب بأجود الخامات',
    backToStore: 'العودة إلى المتجر',
    productLoadError: 'تعذر تحميل المنتج، يرجى المحاولة لاحقاً.',
    somethingWrong: 'حدث خطأ ما',
    addedQtyDesc: (qty, title) => `تمت إضافة ${qty} × «${title}» إلى سلتك.`,
    style: 'النمط',
    successTitle: 'تم استلام طلبك — تفصیل ترکیب ستائر رول ویفی عربی مجلس کنب کل انواع',
    successMeta: 'شكراً لك، تم استلام طلبك بنجاح. سنتواصل معك قريباً لتأكيد التفاصيل.',
    orderConfirm: 'تأكيد الطلب',
    thankYou: 'شكراً لك!',
    successBody: 'تم استلام طلبك بنجاح. سنتواصل معك قريباً لتأكيد التفاصيل والمقاسات.',
    homeMetaTitle:
      'تفصیل ترکیب ستائر رول ویفی عربی مجلس کنب کل انواع — ستائر ووسائد مخصصة في الرياض',
    homeMetaDesc:
      'تفصيل وتركيب ستائر رول وستائر مجالس عربية فاخرة ووسائد كنب مخصصة في الرياض، حي العقيق. اتصل بنا: 0553202514',
    services: [
      {
        index: '٠١',
        title: 'تفصيل ستائر رول',
        text: 'ستائر رول تُفصَّل على مقاس نافذتك بدقة، بخامات عالية الجودة وألوان تناسب كل غرفة.',
      },
      {
        index: '٠٢',
        title: 'ستائر مجالس عربية',
        text: 'ستائر فاخرة للمجالس بتصاميم كلاسيكية راقية وأقمشة مخملية ثقيلة تليق بضيوفك.',
      },
      {
        index: '٠٣',
        title: 'وسائد كنب مخصصة',
        text: 'وسائد تُفصَّل حسب الطلب بالمقاس والقماش واللون الذي تختاره، مع حشوة مريحة تدوم.',
      },
      {
        index: '٠٤',
        title: 'تركيب وتنفيذ',
        text: 'فريق متخصص في التركيب الدقيق بجميع أنحاء الرياض، مع ضمان جودة التنفيذ.',
      },
    ],
    productTitles: {
      'ستائر رول مخصصة': 'ستائر رول مخصصة',
      'تفصيل كنب مجلس عربي': 'تفصيل كنب مجلس عربي',
      'وسائد كنب مخصصة': 'وسائد كنب مخصصة',
      'ستائر مجلس عربي فاخرة': 'ستائر مجلس عربي فاخرة',
      'ستائر بلاك أوت عازلة': 'ستائر بلاك أوت عازلة',
      'وسائد ظهر للمجلس': 'وسائد ظهر للمجلس',
    },
  },
  en: {
    dir: 'ltr',
    locale: 'en',
    businessName: 'Custom Roller & Arabic Majlis Curtains & Sofa Cushions',
    phone: '0553202514',
    address: '3621 Al Huway, Al Aqiq, Riyadh 13515, Saudi Arabia',
    cart: 'Cart',
    cartAria: 'Shopping cart',
    cartTitle: 'Shopping cart',
    cartEmpty: 'Your cart is empty.',
    cartEmptyCheckout: 'Add products to your cart before checkout.',
    cartEmptyTitle: 'Your cart is empty',
    remove: 'Remove',
    total: 'Total',
    checkout: 'Checkout',
    checkoutErrorTitle: 'Checkout error',
    checkoutErrorDesc: 'Something went wrong starting payment. Please try again.',
    heroLabel: 'Riyadh — Al Aqiq',
    heroTitle1: 'Curtains & cushions',
    heroTitle2: 'tailored to your home',
    heroText:
      'Specialists in custom roller curtains, luxury Arabic majlis drapes, and made-to-order sofa cushions — premium fabrics and precise stitching.',
    browseProducts: 'Browse products',
    servicesLabel: 'Our services',
    servicesTitle: 'Everything your majlis and home need',
    storeLabel: 'Shop',
    storeTitle: 'Our custom products',
    storeText: 'Choose a product and add it to the cart, or call us to confirm sizes and details.',
    contactLabel: 'Contact us',
    contactTitle: 'Happy to help',
    callUs: 'Call us',
    ourLocation: 'Our location',
    rights: 'All rights reserved',
    addToCart: 'Add to cart',
    bookNow: 'Book now',
    whatsappCta: 'Order your custom design via WhatsApp',
    whatsappCtaShort: 'Order via WhatsApp',
    addedTitle: 'Added to cart',
    addedDesc: (title) => `“${title}” was added to your cart.`,
    addFailTitle: 'Could not add to cart',
    loadError: 'Could not load products. Please try again later.',
    noProducts: 'No products available right now.',
    defaultSubtitle: 'Made to order with premium materials',
    backToStore: 'Back to store',
    productLoadError: 'Could not load this product. Please try again later.',
    somethingWrong: 'Something went wrong',
    addedQtyDesc: (qty, title) => `Added ${qty} × “${title}” to your cart.`,
    style: 'Style',
    successTitle: 'Order received — Custom curtains & cushions',
    successMeta: 'Thank you. Your order was received successfully. We will contact you soon.',
    orderConfirm: 'Order confirmation',
    thankYou: 'Thank you!',
    successBody: 'Your order was received. We will contact you soon to confirm details and measurements.',
    homeMetaTitle: 'Custom curtains & sofa cushions in Riyadh — roller, majlis & more',
    homeMetaDesc:
      'Custom roller curtains, luxury Arabic majlis drapes, and made-to-order sofa cushions in Al Aqiq, Riyadh. Call 0553202514.',
    services: [
      {
        index: '01',
        title: 'Custom roller curtains',
        text: 'Roller curtains cut precisely to your window, with quality fabrics and colors for every room.',
      },
      {
        index: '02',
        title: 'Arabic majlis curtains',
        text: 'Luxury majlis drapes in classic designs and heavy velvet fabrics worthy of your guests.',
      },
      {
        index: '03',
        title: 'Custom sofa cushions',
        text: 'Cushions made to your size, fabric, and color, with durable comfortable fill.',
      },
      {
        index: '04',
        title: 'Installation',
        text: 'A specialist team for precise installation across Riyadh, with quality workmanship guaranteed.',
      },
    ],
    productTitles: {
      'ستائر رول مخصصة': 'Custom roller curtains',
      'تفصيل كنب مجلس عربي': 'Custom Arabic majlis sofa',
      'وسائد كنب مخصصة': 'Custom sofa cushions',
      'ستائر مجلس عربي فاخرة': 'Luxury Arabic majlis curtains',
      'ستائر بلاك أوت عازلة': 'Blackout curtains',
      'وسائد ظهر للمجلس': 'Majlis backrest cushions',
    },
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('store-lang') === 'en' ? 'en' : 'ar';
    } catch {
      return 'ar';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('store-lang', lang);
    } catch {
      /* ignore */
    }
    const t = translations[lang];
    document.documentElement.lang = t.locale;
    document.documentElement.dir = t.dir;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: translations[lang],
      toggleLang: () => setLang((prev) => (prev === 'ar' ? 'en' : 'ar')),
      translateProductTitle: (title) => translations[lang].productTitles[title] || title,
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
