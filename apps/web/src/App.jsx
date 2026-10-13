import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from '@/hooks/useCart';
import { LanguageProvider } from '@/context/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import SuccessPage from './pages/SuccessPage';

function App() {
    return (
        <LanguageProvider>
            <CartProvider>
                <Router>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/success" element={<SuccessPage />} />
                    </Routes>
                    <Toaster />
                </Router>
            </CartProvider>
        </LanguageProvider>
    );
}

export default App;
