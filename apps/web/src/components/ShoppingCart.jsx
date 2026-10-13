import React, { useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart as ShoppingCartIcon, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { initializeCheckout } from '@/api/EcommerceApi';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { formatVariantPrice } from '@/lib/sarCurrency';
import { resolveProductImage } from '@/components/ProductsList';

const ShoppingCart = ({ isCartOpen, setIsCartOpen }) => {
  const { toast } = useToast();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { t, lang, translateProductTitle } = useLanguage();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkout = params.get('checkout');
    if (!checkout) return;
    if (checkout === 'success') {
      clearCart();
    }
    params.delete('checkout');
    const newSearch = params.toString();
    const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}${window.location.hash}`;
    window.history.replaceState({}, '', newUrl);
  }, [clearCart]);

  const handleCheckout = useCallback(async () => {
    if (cartItems.length === 0) {
      toast({
        title: t.cartEmptyTitle,
        description: t.cartEmptyCheckout,
        variant: 'destructive',
      });
      return;
    }

    try {
      const items = cartItems.map((item) => ({
        variant_id: item.variant.id,
        quantity: item.quantity,
      }));

      const successUrl = `${window.location.origin}/success?checkout=success`;
      const cancelUrl = `${window.location.href}${window.location.search ? '&' : '?'}checkout=cancel`;

      const { url } = await initializeCheckout({ items, successUrl, cancelUrl });

      window.location.href = url;
    } catch (error) {
      toast({
        title: t.checkoutErrorTitle,
        description: t.checkoutErrorDesc,
        variant: 'destructive',
      });
    }
  }, [cartItems, toast, t]);

  const panelFrom = lang === 'ar' ? '-100%' : '100%';

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-foreground/60"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ x: panelFrom }}
            animate={{ x: 0 }}
            exit={{ x: panelFrom }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`absolute top-0 flex h-full w-full max-w-md flex-col border-border bg-card text-card-foreground shadow-2xl ${
              lang === 'ar' ? 'left-0 border-r' : 'right-0 border-l'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border p-6">
              <h2 className="font-display text-2xl font-bold">{t.cartTitle}</h2>
              <Button onClick={() => setIsCartOpen(false)} variant="ghost" size="icon" className="hover:bg-muted">
                <X />
              </Button>
            </div>
            <div className="flex-grow space-y-4 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
                  <ShoppingCartIcon size={48} className="mb-4" strokeWidth={1.25} />
                  <p>{t.cartEmpty}</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.variant.id} className="flex items-center gap-4 border border-border bg-card p-3">
                    <img
                      src={resolveProductImage(item.product)}
                      alt={translateProductTitle(item.product.title)}
                      className="h-20 w-20 border border-border object-cover"
                    />
                    <div className="flex-grow">
                      <h3 className="font-display font-bold">{translateProductTitle(item.product.title)}</h3>
                      <p className="text-sm text-muted-foreground">{item.variant.title}</p>
                      <p className="font-label text-sm font-medium">{formatVariantPrice(item.variant)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center border border-border">
                        <Button
                          onClick={() => updateQuantity(item.variant.id, Math.max(1, item.quantity - 1))}
                          size="sm"
                          variant="ghost"
                          className="px-2 hover:bg-muted"
                        >
                          -
                        </Button>
                        <span className="px-2">{item.quantity}</span>
                        <Button
                          onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                          size="sm"
                          variant="ghost"
                          className="px-2 hover:bg-muted"
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        onClick={() => removeFromCart(item.variant.id)}
                        size="sm"
                        variant="ghost"
                        className="text-xs text-destructive hover:text-destructive/90"
                      >
                        {t.remove}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="border-t border-border p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-medium">{t.total}</span>
                  <span className="font-label text-2xl font-medium">{getCartTotal()}</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full rounded-none border border-foreground bg-primary py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  {t.checkout}
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
