import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Locale } from '@/i18n-config';

interface FooterProps {
    lang: Locale;
    dict: any;
}

export default function Footer({ lang, dict }: FooterProps) {
    return (
        <footer className="bg-navy text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-bold mb-4">
                            DAHAB<span className="text-turquoise">DIVERS</span>
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {dict.footer.tagline}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-gold">{dict.nav.diving}</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href={`/${lang}/diving`} className="hover:text-turquoise transition-colors">{dict.footer.quickLinks.blueHole}</Link></li>
                            <li><Link href={`/${lang}/diving`} className="hover:text-turquoise transition-colors">{dict.footer.quickLinks.canyon}</Link></li>
                            <li><Link href={`/${lang}/diving`} className="hover:text-turquoise transition-colors">{dict.footer.quickLinks.safaris}</Link></li>
                            <li><Link href={`/${lang}/courses`} className="hover:text-turquoise transition-colors">{dict.footer.quickLinks.courses}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-gold">{dict.nav.contact}</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-turquoise shrink-0" />
                                <span>Masbat Bay, Dahab, South Sinai, Egypt</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-turquoise shrink-0" />
                                <span>+20 100 123 4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-turquoise shrink-0" />
                                <span>info@dahabdivers.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-gold">{dict.footer.social}</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center hover:bg-turquoise transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center hover:bg-turquoise transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-navy-light pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Dahab Divers. {dict.footer.rights}</p>
                </div>
            </div>
        </footer>
    );
}
