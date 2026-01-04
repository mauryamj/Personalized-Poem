import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

function PartnerForm({ onBack }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        businessName: '',
        businessType: '',
        message: '',
        iconFile: null
    });

    const [iconPreview, setIconPreview] = useState(null);

    const handleIconUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, iconFile: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setIconPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
                        <label className="block text-sm font-medium text-black mb-1">Business Name</label>
                        <input
                            required
                            type="text"
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            placeholder="e.g. ABC Cafe"
                            value={formData.businessName}
                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Business Type</label>
                        <select
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white text-black"
                            value={formData.businessType}
                            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        >
                            <option value="" className="text-gray-400">Select an option</option>
                            <option value="cafe" className="text-black">Cafe</option>
                            <option value="hotel" className="text-black">Hotels</option>
                            <option value="other" className="text-black">Others</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Upload Icon / Logo</label>
                        <div className="w-full">
                            <label htmlFor="icon-upload" className="cursor-pointer flex items-center justify-center w-full h-32 px-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-black transition-all bg-gray-50 hover:bg-gray-100">
                                {iconPreview ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <img src={iconPreview} alt="Icon preview" className="w-16 h-16 object-contain" />
                                        <span className="text-sm text-gray-600">Click to change</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        <span className="text-sm text-gray-600">Click to upload icon or logo</span>
                                    </div>
                                )}
                            </label>
                            <input
                                id="icon-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleIconUpload}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Tell us about your product</label>
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
