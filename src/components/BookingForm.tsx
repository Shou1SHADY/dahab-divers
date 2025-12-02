'use client';

import { useState } from 'react';
import Button from './ui/Button';

interface BookingFormProps {
    dict: Record<string, any>;
}

export default function BookingForm({ dict }: BookingFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        type: 'Fun Dive',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        
        if (!formData.name.trim()) {
            newErrors.name = dict.contact.booking.form.errors.nameRequired;
        }
        if (!formData.email.trim()) {
            newErrors.email = dict.contact.booking.form.errors.emailRequired;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = dict.contact.booking.form.errors.emailInvalid;
        }
        if (!formData.date) {
            newErrors.date = dict.contact.booking.form.errors.dateRequired;
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        setSubmitStatus('idle');
        
        try {
            // Simulate API call - replace with actual email service
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // In production, this would be an actual API call:
            // const response = await fetch('/api/booking', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(formData)
            // });
            
            setSubmitStatus('success');
            setFormData({ name: '', email: '', date: '', type: 'Fun Dive', message: '' });
            setErrors({});
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            {/* Status Messages */}
            {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    {dict.contact.booking.form.success}
                </div>
            )}
            {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    {dict.contact.booking.form.error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-navy mb-2">{dict.contact.booking.form.name}</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border transition-all outline-none ${
                            errors.name 
                                ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent' 
                                : 'border-gray-200 focus:ring-2 focus:ring-turquoise focus:border-transparent'
                        }`}
                        disabled={isSubmitting}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-navy mb-2">{dict.contact.booking.form.email}</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border transition-all outline-none ${
                            errors.email 
                                ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent' 
                                : 'border-gray-200 focus:ring-2 focus:ring-turquoise focus:border-transparent'
                        }`}
                        disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-navy mb-2">{dict.contact.booking.form.date}</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-2 rounded-lg border transition-all outline-none ${
                            errors.date 
                                ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent' 
                                : 'border-gray-200 focus:ring-2 focus:ring-turquoise focus:border-transparent'
                        }`}
                        disabled={isSubmitting}
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-navy mb-2">{dict.contact.booking.form.activity}</label>
                    <select
                        value={formData.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-turquoise focus:border-transparent outline-none transition-all"
                        disabled={isSubmitting}
                    >
                        <option>Fun Dive</option>
                        <option>Course</option>
                        <option>Snorkeling</option>
                        <option>Safari</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-navy mb-2">{dict.contact.booking.form.message}</label>
                <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-turquoise focus:border-transparent outline-none transition-all resize-none"
                    disabled={isSubmitting}
                    placeholder={dict.contact.booking.form.messagePlaceholder}
                />
            </div>

            <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        {dict.contact.booking.form.submitting}
                    </span>
                ) : (
                    dict.contact.booking.form.submit
                )}
            </Button>
        </form>
    );
}
