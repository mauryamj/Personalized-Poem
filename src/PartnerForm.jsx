import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

function PartnerForm({ onBack }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        businessName: '',
        businessType: '',
        logo: '',
        productDescription: '',
        partnershipInterest: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let logoBase64 = '';
            if (formData.logo && formData.logo instanceof File) {
                logoBase64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(formData.logo);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
            }

            const submitData = {
                fullName: formData.fullName,
                email: formData.email,
                businessName: formData.businessName,
                businessType: formData.businessType,
                productDescription: formData.productDescription,
                partnershipInterest: formData.partnershipInterest,
                logo: logoBase64 // Send Base64 string directly
            };

            console.log("Submitting form data (JSON)...");

            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitData),
            });

            console.log("Response status:", response.status);

            if (response.ok) {
                const result = await response.json();
                console.log("Success result:", result);
                alert('Thank you for your interest! We will get back to you soon.');
                onBack();
            } else {
                const errorData = await response.text();
                console.error("Server error response:", errorData);
                try {
                    const jsonError = JSON.parse(errorData);
                    alert(`Failed to submit: ${jsonError.message || jsonError.error || 'Unknown server error'}`);
                } catch (e) {
                    alert(`Failed to submit (Status ${response.status}): ${errorData}`);
                }
            }
        } catch (error) {
            console.error('Network or execution error:', error);
            alert(`Error: ${error.message}. Check console for details.`);
        }
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
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                        <label className="block text-sm font-medium text-black mb-1"> Upload Logo</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full py-2 px-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200 focus:outline-none"
                            onChange={(e) => setFormData({ ...formData, logo: e.target.files[0] })}
                        />
                        <p className="text-xs text-gray-400 mt-1">Upload an image file (PNG, JPG).</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Product Description</label>
                        <textarea
                            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all min-h-[100px]"
                            placeholder="Tell us about your product..."
                            value={formData.productDescription}
                            onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Partnership Interest</label>
                        <textarea
                            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all min-h-[100px]"
                            placeholder="How would you like to partner with us?"
                            value={formData.partnershipInterest}
                            onChange={(e) => setFormData({ ...formData, partnershipInterest: e.target.value })}
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
