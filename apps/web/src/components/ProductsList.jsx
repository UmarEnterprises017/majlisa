import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarClock, MessageCircle, Loader2 } from 'lucide-react';
import { getProducts, getProductQuantities } from '@/api/EcommerceApi';
import { useLanguage } from '@/context/LanguageContext';
import { formatVariantOriginalPrice, formatVariantPrice } from '@/lib/sarCurrency';

const placeholderImage =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';

const ARABIC_INDEXES = ['٠١', '٠٢', '٠٣', '٠٤', '٠٥', '٠٦', '٠٧', '٠٨', '٠٩', '١٠'];
const EN_INDEXES = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

const CURTAIN_IMAGE_BY_TITLE = {
  'ستائر رول مخصصة':
    'https://horizons-cdn.hostinger.com/2f11584c-0235-497c-952a-c10b88aa841f/d76d06cf51195eb19153fb3a2f9651ae.jpg',
  'ستائر مجلس عربي فاخرة':
    'https://horizons-cdn.hostinger.com/2f11584c-0235-497c-952a-c10b88aa841f/69b3aca2b117e8a315e41c1f41f68bd3.jpg',
  'ستائر بلاك أوت عازلة':
    'https://horizons-cdn.hostinger.com/2f11584c-0235-497c-952a-c10b88aa841f/b75e48b0a595637201abcf174d3e40c8.jpg',
};

const EXTRA_CURTAIN_IMAGES = [
  'https://horizons-cdn.hostinger.com/2f11584c-0235-497c-952a-c10b88aa841f/37fadb75d9eba6512b6ca70f0062f057.jpg',
  'https://horizons-cdn.hostinger.com/2f11584c-0235-497c-952a-c10b88aa841f/8cb43222ba8483dcf864599f8d48dd38.jpg',
];

function resolveProductImage(product) {
  const override = CURTAIN_IMAGE_BY_TITLE[product.title];
  if (override) return override;
  return product.image || placeholderImage;
}

const WHATSAPP_LINK = 'https://wa.link/978ngm';

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const { lang, t, translateProductTitle } = useLanguage();

  const isBooking = product.type?.value === 'booking';
  const displayVariant = useMemo(() => product.variants?.[0], [product]);
  const hasSale = useMemo(
    () => displayVariant && displayVariant.sale_price_in_cents !== null,
    [displayVariant],
  );
  const displayPrice = useMemo(() => formatVariantPrice(displayVariant), [displayVariant]);
  const originalPrice = useMemo(
    () => (hasSale ? formatVariantOriginalPrice(displayVariant) : null),
    [displayVariant, hasSale],
  );
  const title = translateProductTitle(product.title);
  const imageSrc = resolveProductImage(product);
  const indexes = lang === 'ar' ? ARABIC_INDEXES : EN_INDEXES;

  const handleCardAction = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isBooking || product.variants.length > 1) {
        navigate(`/product/${product.id}`);
        return;
      }

      window.open(WHATSAPP_LINK, '_blank', 'noopener,noreferrer');
    },
    [product, isBooking, navigate],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group block border border-border bg-card transition-colors hover:bg-accent/40"
      >
        <div className="relative overflow-hidden border-b border-border">
          <img
            src={imageSrc}
            alt={title}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <span className="absolute top-3 end-3 font-display text-3xl font-bold text-background/90 drop-shadow-sm">
            {indexes[index] || index + 1}
          </span>
          {product.ribbon_text && (
            <div className="absolute top-3 start-3 bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              {product.ribbon_text}
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-display text-xl font-bold leading-snug">{title}</h3>
          <p className="mt-1 h-10 overflow-hidden text-sm text-muted-foreground">
            {product.subtitle || t.defaultSubtitle}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-baseline gap-2">
              {hasSale && (
                <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>
              )}
              <span className="font-label text-base font-medium">{displayPrice}</span>
            </div>
            <button
              onClick={handleCardAction}
              className="inline-flex items-center gap-2 border border-foreground bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98] hover:opacity-90"
            >
              {isBooking ? (
                <>
                  <CalendarClock size={15} /> {t.bookNow}
                </>
              ) : (
                <>
                  <MessageCircle size={15} /> {t.whatsappCtaShort}
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProductsWithQuantities = async () => {
      try {
        setLoading(true);
        setError(null);

        const productsResponse = await getProducts();

        if (productsResponse.products.length === 0) {
          setProducts([]);
          return;
        }

        const productIds = productsResponse.products.map((product) => product.id);

        const quantitiesResponse = await getProductQuantities({
          fields: 'inventory_quantity',
          product_ids: productIds,
        });

        const variantQuantityMap = new Map();
        quantitiesResponse.variants.forEach((variant) => {
          variantQuantityMap.set(variant.id, variant.inventory_quantity);
        });

        const productsWithQuantities = productsResponse.products.map((product) => ({
          ...product,
          image: resolveProductImage(product),
          variants: product.variants.map((variant) => ({
            ...variant,
            inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity,
          })),
        }));

        setProducts(productsWithQuantities);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsWithQuantities();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-border p-8 text-center text-destructive">
        <p>{t.loadError}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="border border-border p-8 text-center text-muted-foreground">
        <p>{t.noProducts}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export { CURTAIN_IMAGE_BY_TITLE, EXTRA_CURTAIN_IMAGES, resolveProductImage };
export default ProductsList;
