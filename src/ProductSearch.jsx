import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';

function ProductSearch({ onBack }) {
    const allProducts = [
        { id: 1, name: 'Tote Bag', category: 'bags', image: '/bw_tote_sample.png', description: 'Personalized tote bags for everyday use' },
        { id: 2, name: 'Personalized T-Shirts', category: 'clothing', image: '/bw_tshirt_sample_1766195575263.png', description: 'Custom designed t-shirts with your name' },
        { id: 3, name: 'Mugs', category: 'drinkware', image: '/bw_mug_sample_1766195589829.png', description: 'Personalized mugs for your morning coffee' },
        { id: 4, name: 'Notebooks', category: 'stationery', image: '/bw_notebook_sample_1766195605616.png', description: 'Custom notebooks and journals' },
        { id: 5, name: 'Gifts', category: 'gifts', image: '/bw_gift_sample_1766195618998.png', description: 'Unique personalized gift items' },
        { id: 6, name: 'Art Prints', category: 'art', image: '/bw_art_sample_1766195634004.png', description: 'Beautiful personalized art prints' },
    ];

    const categories = [
        { id: 'all', name: 'All Products' },
        { id: 'clothing', name: 'Clothing' },
        { id: 'bags', name: 'Bags' },
        { id: 'drinkware', name: 'Drinkware' },
        { id: 'stationery', name: 'Stationery' },
        { id: 'gifts', name: 'Gifts' },
        { id: 'art', name: 'Art' },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProducts = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="w-screen h-screen overflow-x-hidden overflow-y-auto bg-white pb-4 flex flex-col">
            {/* Header - Mobile optimized with proper touch target */}
            <div className="sticky top-0 bg-white z-10 pt-3 pb-3 px-4 border-b border-gray-200 shadow-sm">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="flex items-center justify-center w-11 h-11 -ml-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
                    >
                        <FaArrowLeft className="text-black w-5 h-5" />
                    </button>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black">Browse Products</h2>
                </div>
            </div>

            <div className="px-4">
                {/* Search Bar - Bigger touch target on mobile */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 mb-4"
                >
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 sm:h-12 md:h-13 pl-12 pr-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-black bg-white text-sm sm:text-base placeholder:text-gray-400"
                        />
                    </div>
                </motion.div>

                {/* Category Filter - Bigger buttons for easier tapping */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-4"
                >
                    <div className="flex overflow-x-auto gap-2 pb-2 -mx-1 px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2.5 rounded-full font-medium whitespace-nowrap transition-all text-sm min-h-[44px] active:scale-95 ${selectedCategory === category.id
                                    ? 'bg-black text-white shadow-md'
                                    : 'bg-gray-100 text-black hover:bg-gray-200'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Results Count */}
                <div className="mb-3">
                    <p className="text-gray-600 text-sm">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                    </p>
                </div>

                {/* Products Grid - Optimized card sizes for mobile */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 pb-4"
                >
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white p-3 sm:p-4 rounded-xl shadow-md hover:shadow-xl active:shadow-lg transition-all cursor-pointer border border-gray-100 active:scale-[0.98]"
                        >
                            <div className="w-full aspect-square bg-gray-100 rounded-lg mb-2.5 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity"
                                />
                            </div>
                            <h3 className="font-bold text-sm sm:text-base mb-1 text-black leading-snug">{product.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">{product.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* No Results */}
                {filteredProducts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20"
                    >
                        <p className="text-gray-400 text-lg mb-2">No products found</p>
                        <p className="text-gray-400 text-sm">Try adjusting your search or filter</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default ProductSearch;