'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { Locale } from '@/i18n-config';

// --- Types ---
interface NavbarProps {
    lang: Locale;
    dict: Record<string, any>;
}

interface DropdownItem {
    href: string;
    label: string;
    image: string;
    description: string;
    badge?: string;
}

// --- Constants ---
const SCROLL_THRESHOLD = 20;
const MOBILE_BREAKPOINT = 768;

// --- Helper Functions ---
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// --- Components ---
const NavLink = ({ 
    href, 
    children, 
    hasDropdown = false, 
    isActive = false,
    onClick,
    onMouseEnter,
    onMouseLeave
}: { 
    href: string; 
    children: React.ReactNode; 
    hasDropdown?: boolean; 
    isActive?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}) => (
    <div
        className="relative"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <Link
            href={hasDropdown ? '#' : href}
            prefetch={true}
            onClick={hasDropdown ? onClick : undefined}
            className={cn(
                "relative px-3 py-2 text-sm font-medium transition-all duration-200",
                "text-white/90 hover:text-white",
                "hover:bg-white/10 rounded-lg",
                "flex items-center gap-2",
                isActive && "text-turquoise bg-white/10"
            )}
        >
            {children}
            {hasDropdown && (
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
            )}
        </Link>
    </div>
);

const DropdownMenu = ({ 
    items, 
    isOpen, 
    onClose 
}: { 
    items: DropdownItem[]; 
    isOpen: boolean; 
    onClose: () => void;
}) => {
    if (!isOpen) return null;

    return (
        <div className="w-[640px] animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100/50 backdrop-blur-sm">
                <div className="grid grid-cols-1 divide-y divide-gray-100/50">
                    {items.map((item, index) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className="group/item flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-all duration-200"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.label}
                                    fill
                                    className="object-cover group-hover/item:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-navy font-bold text-base group-hover/item:text-turquoise transition-colors truncate">
                                        {item.label}
                                    </h4>
                                    {item.badge && (
                                        <span className="px-2 py-1 bg-turquoise/10 text-turquoise text-xs font-medium rounded-full">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm line-clamp-1">{item.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

const MobileMenuItem = ({ 
    item, 
    onClose 
}: { 
    item: any; 
    onClose: () => void;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border-b border-navy-light/20 last:border-b-0">
            {item.dropdown ? (
                <>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full text-left text-white hover:text-turquoise transition-colors font-medium py-3 px-4 flex items-center justify-between"
                    >
                        <span className="text-lg">{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isExpanded && (
                        <div className="pl-4 space-y-1 pb-3 animate-in slide-in-from-top-2 duration-200">
                            {item.dropdown.map((dropItem: DropdownItem, index: number) => (
                                <Link
                                    key={dropItem.href}
                                    href={dropItem.href}
                                    onClick={onClose}
                                    className="flex items-center gap-3 py-2 px-4 text-gray-300 hover:text-turquoise hover:bg-white/5 rounded-lg transition-all duration-200"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="relative w-12 h-10 rounded overflow-hidden shrink-0">
                                        <Image
                                            src={dropItem.image}
                                            alt={dropItem.label}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium truncate">{dropItem.label}</div>
                                        <div className="text-xs text-gray-400 truncate">{dropItem.description}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <Link
                    href={item.href}
                    onClick={onClose}
                    className="block text-white hover:text-turquoise transition-colors font-medium py-3 px-4 text-lg"
                >
                    {item.label}
                </Link>
            )}
        </div>
    );
};

// --- Main Component ---
export default function Navbar({ lang, dict }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // --- Effects ---
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActiveDropdown(null);
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    // --- Event Handlers ---
    const handleDropdownEnter = (label: string) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setActiveDropdown(label);
    };

    const handleDropdownLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 150);
    };

    const handleDropdownClick = (e: React.MouseEvent) => {
        e.preventDefault();
    };

    const closeAll = () => {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
    };

    // --- Dropdown Data ---
    const divingDropdown: DropdownItem[] = [
        {
            href: `/${lang}/diving#sites`,
            label: dict.nav.divingSites,
            image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=400&auto=format&fit=crop',
            description: 'Explore legendary dive sites',
            badge: 'Popular'
        },
        {
            href: `/${lang}/diving#packages`,
            label: dict.nav.divePackages,
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop',
            description: 'Best value dive packages'
        },
        {
            href: `/${lang}/contact`,
            label: dict.nav.bookDive,
            image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=400&auto=format&fit=crop',
            description: 'Book your adventure today',
            badge: 'Book Now'
        }
    ];

    const coursesDropdown: DropdownItem[] = [
        {
            href: `/${lang}/courses#beginner`,
            label: dict.nav.beginnerCourses,
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop',
            description: 'Start your diving journey',
            badge: 'New'
        },
        {
            href: `/${lang}/courses#advanced`,
            label: dict.nav.advancedCourses,
            image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=400&auto=format&fit=crop',
            description: 'Enhance your skills'
        },
        {
            href: `/${lang}/courses#professional`,
            label: dict.nav.professionalCourses,
            image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=400&auto=format&fit=crop',
            description: 'Become a pro diver',
            badge: 'Pro'
        },
        {
            href: `/${lang}/courses#specialty`,
            label: dict.nav.specialtyCourses,
            image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=400&auto=format&fit=crop',
            description: 'Specialized training'
        }
    ];

    const aboutDropdown: DropdownItem[] = [
        {
            href: `/${lang}/about#story`,
            label: dict.nav.ourStory,
            image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=400&auto=format&fit=crop',
            description: 'Our journey since 2008'
        },
        {
            href: `/${lang}/about#team`,
            label: dict.nav.ourTeam,
            image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=400&auto=format&fit=crop',
            description: 'Meet our expert instructors'
        },
        {
            href: `/${lang}/about#certifications`,
            label: dict.nav.certifications,
            image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=400&auto=format&fit=crop',
            description: '5-star PADI certified',
            badge: 'Certified'
        }
    ];

    const navItems = [
        { href: `/${lang}`, label: dict.nav.home, dropdown: null },
        { href: `/${lang}/diving`, label: dict.nav.diving, dropdown: divingDropdown },
        { href: `/${lang}/courses`, label: dict.nav.courses, dropdown: coursesDropdown },
        { href: `/${lang}/about`, label: dict.nav.about, dropdown: aboutDropdown },
        { href: `/${lang}/contact`, label: dict.nav.contact, dropdown: null },
    ];

    // --- Render ---
    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled 
                        ? "bg-navy/95 backdrop-blur-md shadow-lg py-2 sm:py-3" 
                        : "bg-transparent py-4 sm:py-6"
                )}
                style={{ 
                    boxSizing: 'border-box',
                    WebkitBoxSizing: 'border-box',
                    MozBoxSizing: 'border-box'
                }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                    <div className="flex items-center justify-between" style={{ width: '100%', minWidth: 0 }}>
                        {/* Logo */}
                        <Link 
                            href={`/${lang}`} 
                            className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wider hover:scale-105 transition-transform duration-200"
                            style={{ 
                                fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
                                lineHeight: '1.2'
                            }}
                            prefetch={true}
                            aria-label="Dahab Divers Home"
                        >
                            DAHAB<span className="text-turquoise">DIVERS</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => (
                                <div
                                    key={item.href}
                                    className="relative group"
                                    onMouseEnter={() => item.dropdown && handleDropdownEnter(item.label)}
                                    onMouseLeave={handleDropdownLeave}
                                >
                                    <NavLink
                                        href={item.href}
                                        hasDropdown={!!item.dropdown}
                                        isActive={activeDropdown === item.label}
                                        onClick={handleDropdownClick}
                                    >
                                        {item.label}
                                    </NavLink>

                                    {item.dropdown && (
                                        <div className="absolute top-full left-0 pt-2 z-50">
                                            <DropdownMenu
                                                items={item.dropdown}
                                                isOpen={activeDropdown === item.label}
                                                onClose={closeAll}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* CTA Button - Hidden on mobile, visible on tablet+ */}
                            <Link
                                href={`/${lang}/contact`}
                                className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 bg-turquoise text-navy font-semibold rounded-lg hover:bg-turquoise/90 transition-all duration-200 hover:scale-105 text-sm"
                            >
                                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">Book Now</span>
                            </Link>

                            {/* Language Switcher */}
                            <LanguageSwitcher />

                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-110"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-menu"
                            >
                                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    id="mobile-menu"
                    className="lg:hidden fixed top-0 left-0 right-0 bg-navy/95 backdrop-blur-md max-h-[100dvh] overflow-y-auto shadow-xl animate-in slide-in-from-top duration-300 z-40"
                    style={{ paddingTop: 'var(--nav-height, 80px)' }}
                >
                    <div className="container mx-auto px-4 sm:px-6 py-4">
                        <div className="space-y-1">
                            {navItems.map((item) => (
                                <MobileMenuItem 
                                    key={item.href} 
                                    item={item} 
                                    onClose={() => setIsMobileMenuOpen(false)}
                                />
                            ))}
                        </div>

                        {/* Mobile CTA Section */}
                        <div className="mt-6 pt-6 border-t border-navy-light/20 space-y-3">
                            <Link
                                href={`/${lang}/contact`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-turquoise text-navy font-semibold rounded-lg hover:bg-turquoise/90 transition-all duration-200"
                            >
                                <Phone className="w-4 h-4" />
                                Book Your Dive
                            </Link>
                            
                            <div className="flex items-center justify-center gap-4 text-sm text-gray-300">
                                <div className="flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    <span>+20 12 345 6789</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    <span>info@dahabdivers.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 z-30 animate-in fade-in duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
}