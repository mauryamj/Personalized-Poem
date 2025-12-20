import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

function PartnerForm({ onBack }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        businessType: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your interest! We will get back to you soon.');
        onBack();
    };

    return (
        <div className="min-h-screen bg-white p-6 flex flex-col">
            <div className="flex items-center mb-8">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                    <FaArrowLeft className="text-black w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold ml-4 text-black">Partner With Us</h2>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto w-full"
            >
                <p className="text-gray-600 mb-8">
                    Fill out the details below and our team will contact you regarding potential partnership opportunities.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Full Name</label>
                        <input
                            required
                            type="text"
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            placeholder="e.g. John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Email Address</label>
                        <input
                            required
                            type="email"
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            placeholder="e.g. john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Business Type</label>
                        <select
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                            value={formData.businessType}
                            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        >
                            <option value="">Select an option</option>
                            <option value="retail">Retail Store</option>
                            <option value="corporate">Corporate Gifting</option>
                            <option value="influencer">Influencer / Creator</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Tell us more</label>
                        <textarea
                            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all min-h-[120px]"
                            placeholder="How would you like to partner with us?"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-14 bg-black text-white font-bold rounded-xl shadow-lg hover:bg-gray-900 transition-all transform active:scale-[0.98]"
                    >
                        Submit Details
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

export default PartnerForm;
