import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProduct, getProductQuantities } from '@/api/EcommerceApi';
import { Button } from '@/components/ui/button';
import BookingSlotPicker from '@/components/BookingSlotPicker';
import { Loader2, ArrowRight, CheckCircle, Minus, Plus, XCircle, ChevronLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { formatVariantOriginalPrice, formatVariantPrice } from '@/lib/sarCurrency';
import { CURTAIN_IMAGE_BY_TITLE, EXTRA_CURTAIN_IMAGES } from '@/components/ProductsList';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

const WHATSAPP_LINK = 'https://wa.link/978ngm';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t, translateProductTitle, lang } = useLanguage();

  const handleQuantityChange = useCallback((amount) => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + amount;
      if (newQuantity < 1) return 1;
      return newQuantity;
    });
  }, []);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev <= 0 ? 99 : prev - 1));
  }, []);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => prev + 1);
  }, []);

  const handleVariantSelect = useCallback((variant) => {
    setSelectedVariant(variant);

    if (variant.image_url && product?.images?.length > 0) {
      const imageIndex = product.images.findIndex(image => image.url === variant.image_url);

      if (imageIndex !== -1) {
        setCurrentImageIndex(imageIndex);
      }
    }
  }, [product?.images]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProduct = await getProduct(id);

        const quantitiesResponse = await getProductQuantities({
          fields: 'inventory_quantity',
          product_ids: [fetchedProduct.id]
        });

        const variantQuantityMap = new Map();
        quantitiesResponse.variants.forEach(variant => {
          variantQuantityMap.set(variant.id, variant.inventory_quantity);
        });

        const productWithQuantities = {
          ...fetchedProduct,
          variants: fetchedProduct.variants.map(variant => ({
            ...variant,
            inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
          }))
        };

        setProduct(productWithQuantities);

        if (productWithQuantities.variants && productWithQuantities.variants.length > 0) {
          setSelectedVariant(productWithQuantities.variants[0]);
        }
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
          <ArrowRight size={16} className={lang === 'en' ? 'rotate-180' : ''} />
          {t.backToStore}
        </Link>
        <div className="border border-border p-10 text-center text-destructive">
          <XCircle className="mx-auto mb-4 h-14 w-14" strokeWidth={1.25} />
          <p>{t.productLoadError}</p>
        </div>
      </div>
    );
  }

  const isBooking = product.type?.value === 'booking';
  const price = formatVariantPrice(selectedVariant);
  const originalPrice = formatVariantOriginalPrice(selectedVariant);
  const availableStock = selectedVariant ? selectedVariant.inventory_quantity : 0;
  const isStockManaged = selectedVariant?.manage_inventory ?? false;
  const canAddToCart = !isStockManaged || quantity <= availableStock;
  const displayTitle = translateProductTitle(product.title);

  const curtainMain = CURTAIN_IMAGE_BY_TITLE[product.title];
  const displayImages = curtainMain
    ? [
        { url: curtainMain },
        ...EXTRA_CURTAIN_IMAGES.map((url) => ({ url })),
        ...(product.images || []).filter((img) => img?.url && img.url !== curtainMain),
      ]
    : product.images?.length
      ? product.images
      : [{ url: product.image || placeholderImage }];

  const safeImageIndex = displayImages.length
    ? ((currentImageIndex % displayImages.length) + displayImages.length) % displayImages.length
    : 0;
  const currentImage = displayImages[safeImageIndex] || displayImages[0];
  const hasMultipleImages = displayImages.length > 1;

  return (
    <>
      <Helmet>
        <title>{displayTitle} — {t.businessName}</title>
        <meta name="description" content={product.description?.replace(/<[^>]*>/g, '').substring(0, 160) || displayTitle} />
      </Helmet>
      <div className="min-h-[100dvh] bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-16">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <ArrowRight size={16} className={lang === 'en' ? 'rotate-180' : ''} />
            {t.backToStore}
          </Link>
          <div className="grid gap-10 border border-border bg-card p-6 md:grid-cols-2 md:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative">
              <div className="relative h-96 overflow-hidden border border-border md:h-[500px]">
                <img
                  src={!currentImage?.url ? placeholderImage : currentImage.url}
                  alt={displayTitle}
                  className="h-full w-full object-cover"
                />

                {hasMultipleImages && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute end-2 top-1/2 -translate-y-1/2 border border-border bg-background/80 p-2 transition-colors hover:bg-accent"
                      aria-label="prev"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute start-2 top-1/2 -translate-y-1/2 border border-border bg-background/80 p-2 transition-colors hover:bg-accent"
                      aria-label="next"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  </>
                )}

                {product.ribbon_text && (
                  <div className="absolute top-4 left-4 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                    {product.ribbon_text}
                  </div>
                )}
              </div>

              {hasMultipleImages && (
                <div className="mt-4 flex gap-2 overflow-x-auto">
                  {displayImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-16 w-16 flex-shrink-0 overflow-hidden border transition-colors ${
                        index === safeImageIndex ? 'border-foreground' : 'border-border hover:border-foreground/50'
                      }`}
                    >
                      <img
                        src={!image.url ? placeholderImage : image.url}
                        alt={`${displayTitle} ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="flex flex-col">
              <h1 className="font-display text-3xl font-bold leading-snug md:text-4xl">{displayTitle}</h1>
              {product.subtitle && <p className="mt-2 text-lg text-muted-foreground">{product.subtitle}</p>}

              <div className="mt-6 flex items-baseline gap-3 border-y border-border py-5">
                <span className="font-label text-3xl font-medium">{price}</span>
                {selectedVariant?.sale_price_in_cents && (
                  <span className="text-xl text-muted-foreground line-through">{originalPrice}</span>
                )}
              </div>

              <div className="prose mt-6 leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: product.description }} />

              {product.additional_info?.length > 0 && (
                <div className="mt-6 space-y-4">
                  {product.additional_info
                    .sort((a, b) => a.order - b.order)
                    .map((info) => (
                      <div key={info.id} className="border-r-2 border-foreground/40 pr-4">
                        <h3 className="font-display text-lg font-bold">{info.title}</h3>
                        <div className="prose-sm mt-1 text-muted-foreground" dangerouslySetInnerHTML={{ __html: info.description }} />
                      </div>
                    ))}
                </div>
              )}

              {product.variants.length > 1 && (
                <div className="mt-6">
                  <h3 className="mb-2 text-sm font-medium">{t.style}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map(variant => (
                      <Button
                        key={variant.id}
                        variant={selectedVariant?.id === variant.id ? 'default' : 'outline'}
                        onClick={() => handleVariantSelect(variant)}
                        className="rounded-none"
                      >
                        {variant.title}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {isBooking ? (
                <div className="mt-auto pt-6">
                  <BookingSlotPicker product={product} variant={selectedVariant} />

                  {!product.purchasable && (
                    <p className="mt-3 flex items-center justify-center gap-2 text-sm text-destructive">
                      <XCircle size={16} /> غير متوفر حالياً
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <div className="mt-6 flex items-center gap-4">
                    <span className="text-sm font-medium">{lang === 'ar' ? 'الكمية' : 'Quantity'}</span>
                    <div className="flex items-center border border-border p-1">
                      <Button onClick={() => handleQuantityChange(-1)} variant="ghost" size="icon" className="h-8 w-8 rounded-none hover:bg-muted"><Minus size={16} /></Button>
                      <span className="w-10 text-center font-bold">{quantity}</span>
                      <Button onClick={() => handleQuantityChange(1)} variant="ghost" size="icon" className="h-8 w-8 rounded-none hover:bg-muted"><Plus size={16} /></Button>
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 border border-foreground bg-primary py-3 text-lg font-semibold text-primary-foreground transition-transform active:scale-[0.98] hover:bg-primary/90"
                    >
                      <MessageCircle className="h-5 w-5" /> {t.whatsappCta}
                    </a>

                    {isStockManaged && canAddToCart && product.purchasable && (
                      <p className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle size={16} /> {lang === 'ar' ? `متوفر — ${availableStock} قطعة` : `In stock — ${availableStock}`}
                      </p>
                    )}

                    {isStockManaged && !canAddToCart && product.purchasable && (
                      <p className="mt-3 flex items-center justify-center gap-2 text-sm text-destructive">
                        <XCircle size={16} /> {lang === 'ar' ? `الكمية غير كافية، المتبقي ${availableStock} فقط.` : `Not enough stock. Only ${availableStock} left.`}
                      </p>
                    )}

                    {!product.purchasable && (
                      <p className="mt-3 flex items-center justify-center gap-2 text-sm text-destructive">
                        <XCircle size={16} /> {lang === 'ar' ? 'غير متوفر حالياً' : 'Currently unavailable'}
                      </p>
                    )}

                    <a
                      href="tel:0561538652"
                      className="mt-3 flex w-full items-center justify-center gap-2 border border-border py-3 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      <Phone size={16} />
                      {lang === 'ar' ? 'للاستفسار عن المقاسات:' : 'Ask about sizes:'} <span dir="ltr">0561538652</span>
                    </a>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
