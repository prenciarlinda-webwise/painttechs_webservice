'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BUSINESS_INFO, SERVICES, getPhoneLink } from '@/lib/constants';
import { locationsData } from '@/data/locations';
import { Button, Container } from '@/components/ui';
import QuoteFormButton from '@/components/features/QuoteFormButton';

type DropdownItem = {
  href: string;
  label: string;
  description?: string;
};

type NavLink = {
  href: string;
  label: string;
  title: string;
  dropdownItems?: DropdownItem[];
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesDropdown: DropdownItem[] = SERVICES.map((s) => ({
    href: `/${s.slug}`,
    label: s.name,
    description: s.shortDescription,
  }));

  const areasDropdown: DropdownItem[] = locationsData.map((loc) => ({
    href: `/${loc.slug}-house-painters`,
    label: loc.name,
    description: loc.county,
  }));

  const navLinks: NavLink[] = [
    { href: '/', label: 'Home', title: 'Jacksonville Painters - Home' },
    { href: '/about', label: 'About', title: 'About Paint-Techs LLC Jacksonville Painters' },
    {
      href: '/services',
      label: 'Services',
      title: 'Painting Services Jacksonville FL',
      dropdownItems: servicesDropdown,
    },
    { href: '/gallery', label: 'Gallery', title: 'Painting Project Gallery Jacksonville' },
    {
      href: '/areas-we-serve',
      label: 'Areas',
      title: 'Service Areas - Jacksonville & Northeast FL',
      dropdownItems: areasDropdown,
    },
    { href: '/blog', label: 'Blog', title: 'Painting Tips & Blog' },
    { href: '/contact', label: 'Contact', title: 'Contact Jacksonville Painters - Free Estimate' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-2'
          : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" title="Jacksonville Painters - Home" className="flex items-center gap-2">
            <Image
              src="/images/logo/paint-techs-llc-logo.webp"
              alt="Paint-Techs LLC - Professional Painting Services Jacksonville FL"
              title="Paint-Techs LLC - Jacksonville Painters"
              width={180}
              height={180}
              className="h-12 w-auto"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isOpen = openDropdown === link.href;
              const dropdownWidth = link.href === '/areas-we-serve' ? 'w-72' : 'w-64';
              return (
                <div key={link.href} className="relative group">
                  {link.dropdownItems ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(link.href)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <Link
                        href={link.href}
                        title={link.title}
                        className="px-4 py-2 text-gray-700 hover:text-orange-500 font-medium transition-colors flex items-center gap-1"
                      >
                        {link.label}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Link>
                      {/* Dropdown */}
                      <div
                        className={`absolute top-full left-0 ${dropdownWidth} bg-white shadow-xl rounded-lg py-2 transition-all duration-200 max-h-[480px] overflow-y-auto ${
                          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                        }`}
                      >
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            title={`${item.label} - Paint-Techs LLC`}
                            className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                          >
                            <span className="font-medium">{item.label}</span>
                            {item.description && (
                              <span className="block text-sm text-gray-500 mt-0.5 line-clamp-1">
                                {item.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      title={link.title}
                      className="px-4 py-2 text-gray-700 hover:text-orange-500 font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={getPhoneLink()}
              className="flex items-center gap-2 text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hidden xl:inline">{BUSINESS_INFO.phone}</span>
            </a>
            <QuoteFormButton
              variant="primary"
              size="sm"
              title="Request a free painting quote"
              promoTag="header"
            >
              Free Quote
            </QuoteFormButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-orange-500"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="bg-gray-50 rounded-xl p-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  title={link.title}
                  className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
                {link.dropdownItems && (
                  <div className="ml-4 space-y-1 mt-1">
                    {link.dropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={`${item.label} - Paint-Techs LLC`}
                        className="block px-4 py-2 text-gray-600 hover:text-orange-500 text-sm transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
              <a
                href={getPhoneLink()}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-navy-800 text-white rounded-lg font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {BUSINESS_INFO.phone}
              </a>
              <div onClick={() => setIsMobileMenuOpen(false)}>
                <QuoteFormButton
                  variant="primary"
                  className="w-full"
                  title="Request a free painting quote"
                  promoTag="header-mobile"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  }
                >
                  Get a Free Quote
                </QuoteFormButton>
              </div>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}
