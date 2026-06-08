/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, Mail, Globe, Menu, X, ChevronDown, Award, MapPin, Search } from 'lucide-react';
import { InstitutionSettings } from '../types';

interface HeaderProps {
  settings: InstitutionSettings;
  currentLang: 'en' | 'bn';
  setLang: (lang: 'en' | 'bn') => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Header({
  settings,
  currentLang,
  setLang,
  activeSection,
  setActiveSection,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString(currentLang === 'bn' ? 'bn-BD' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, [currentLang]);

  const navItems = [
    { id: 'home', label: { en: 'Home', bn: 'হোম' } },
    { id: 'profile', label: { en: 'Profile', bn: 'প্রতিষ্ঠান পরিলেখ' } },
    { id: 'teachers', label: { en: 'Teachers & Staff', bn: 'শিক্ষক ও কর্মচারী' } },
    { id: 'statistics', label: { en: 'Student Statistics', bn: 'শিক্ষার্থী তথ্য' } },
    { id: 'academic', label: { en: 'Academic & Routine', bn: 'একাডেমিক তথ্য' } },
    { id: 'admission', label: { en: 'Admission Desk', bn: 'অনলাইন ভর্তি' } },
    { id: 'notices', label: { en: 'Notice Board', bn: 'নোটিশ বোর্ড' } },
    { id: 'downloads', label: { en: 'Download Center', bn: 'ডাউনলোড' } },
    { id: 'admin', label: { en: 'Admin Portal', bn: 'অ্যাডমিন পোর্টাল' } },
  ];

  return (
    <header className="w-full bg-[#F5F5F5] shadow-sm font-sans" id="gov_top_header">
      {/* Bangladesh Gov Top Bar */}
      <div className="bg-[#003366] text-white text-xs py-1.5 px-4 flex flex-wrap justify-between items-center sm:px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 bg-[#D62530] rounded-full border border-white flex-shrink-0 animate-pulse" />
            <span className="font-semibold tracking-wide text-[10px] sm:text-xs text-green-300">
              {currentLang === 'en' ? "Government Portal Compliance" : "অনলাইন সরকারি শিক্ষা পোর্টাল"}
            </span>
          </div>
          <span className="hidden md:inline text-gray-300 border-l border-gray-600 pl-3">
            {currentTime}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href={`tel:${settings.phone}`} className="flex items-center gap-1 hover:text-green-300 transition-colors">
            <Phone size={12} />
            <span className="text-[11px] font-mono">{settings.phone}</span>
          </a>
          <a href={`mailto:${settings.email}`} className="hidden sm:flex items-center gap-1 hover:text-green-300 transition-colors">
            <Mail size={12} />
            <span className="text-[11px] font-mono">{settings.email}</span>
          </a>
          <button
            onClick={() => setLang(currentLang === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1 bg-green-700 hover:bg-green-600 px-2 py-0.5 rounded text-[11px] font-semibold transition-all border border-green-500 shadow-sm"
          >
            <Globe size={11} />
            <span>{currentLang === 'en' ? 'বাংলা' : 'English'}</span>
          </button>
        </div>
      </div>

      {/* Main Government Banner Section */}
      <div className="bg-white border-b-4 border-[#0B8F3A] py-3.5 px-4 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Institution Logo & National Logo Combo */}
          <div className="flex items-center gap-4 text-center md:text-left">
            {/* Government Circular Logo Badge */}
            <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full bg-[#0B8F3A] border-2 border-green-600 flex items-center justify-center shadow-md flex-shrink-0">
              <div className="absolute w-[80%] h-[80%] bg-red-600 rounded-full flex items-center justify-center text-white font-extrabold text-[10px] md:text-xs">
                {currentLang === 'en' ? 'GOVT' : 'সরকারি'}
              </div>
              <div className="absolute -bottom-1 bg-amber-500 text-slate-900 border border-slate-700 text-[8px] px-1 rounded font-bold uppercase shadow">
                EIIN
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-300">
                  {currentLang === 'en' ? 'Ministry of Education Authorized' : 'শিক্ষা মন্ত্রণালয় অনুমোদিত'}
                </span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-300 font-mono">
                  ESTD: {settings.established}
                </span>
              </div>
              
              <h1 className="text-xl sm:text-2xl font-bold text-[#003366] tracking-tight hover:text-green-700 transition-colors">
                {settings.institutionName}
              </h1>
              
              {/* EIIN and Code Details */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 mt-1 text-xs text-gray-600 font-medium">
                <span className="flex items-center gap-1">
                  <span className="font-bold text-[#0B8F3A]">{currentLang === 'en' ? 'EIIN' : 'ইআইআইএন'}:</span>
                  <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">{settings.eiin}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-bold text-[#0B8F3A]">{currentLang === 'en' ? 'School Code' : 'বিদ্যালয় কোড'}:</span>
                  <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">{settings.schoolCode}</span>
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <MapPin size={12} className="text-red-500" />
                  <span>{settings.address}</span>
                </span>
              </div>
            </div>
          </div>

          {/* National Emblem Right Side Visual Pin */}
          <div className="hidden lg:flex items-center gap-3 bg-[#f0fff4] border border-green-300 p-2.5 rounded-lg max-w-[280px]">
            <span className="text-[#0B8F3A]" id="gov_motto_badge">
              <Award size={32} />
            </span>
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold text-green-700 tracking-wider">
                {currentLang === 'en' ? "Institution Motto" : "প্রতিষ্ঠানের বাণী"}
              </p>
              <p className="text-xs font-semibold text-slate-800 italic">
                "{settings.motto}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Banner Menu */}
      <nav className="bg-[#0B8F3A] text-white shadow-md relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-12 md:h-14">
            
            {/* Desktop Items */}
            <div className="hidden lg:flex items-center gap-1 w-full overflow-x-auto justify-between scrolling-touch">
              <div className="flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      id={`nav_btn_${item.id}`}
                      className={`px-3.5 py-2.5 text-sm font-semibold rounded transition-all cursor-pointer whitespace-nowrap border-b-2 hover:bg-[#003366] hover:border-amber-400 ${
                        isActive
                          ? 'bg-[#003366] text-white border-amber-400'
                          : 'border-transparent text-white'
                      }`}
                    >
                      {item.label[currentLang]}
                    </button>
                  );
                })}
              </div>

              {/* Quick Contact Form Mini indicator or portal badge */}
              <div className="bg-amber-400 text-slate-900 text-xs px-2.5 py-1.5 rounded font-bold shadow-sm flex items-center gap-1 flex-shrink-0 animate-pulse">
                <span className="w-2 h-2 bg-red-600 rounded-full inline-block"></span>
                <span>{currentLang === 'en' ? 'Admission Open 2026' : 'ভর্তি চলছে ২০২৬'}</span>
              </div>
            </div>

            {/* Mobile Title View */}
            <div className="flex lg:hidden justify-between items-center w-full">
              <span className="text-sm font-bold truncate">
                {currentLang === 'en' ? 'Navigation Menu' : 'নেভিগেশন মেনু'}
              </span>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 hover:bg-green-700 rounded transition-colors focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown Panels */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-12 left-0 w-full bg-[#0B8F3A] border-t border-green-600 shadow-xl z-50 flex flex-col p-4 gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-2.5 px-4 text-left font-semibold text-sm rounded transition-all ${
                    isActive ? 'bg-[#003366] text-white shadow-inner' : 'hover:bg-green-700 text-white'
                  }`}
                >
                  {item.label[currentLang]}
                </button>
              );
            })}
            <div className="border-t border-green-700 pt-3 flex flex-col gap-2">
              <div className="text-xs text-amber-300 font-bold px-2 py-1 bg-[#105a28] rounded">
                ★ {currentLang === 'en' ? 'Class XI Online Registration Starts standard time' : 'একাদশ শ্রেণী অনলাইন ভর্তি দ্রুত শেষ হবে'}
              </div>
              <button
                onClick={() => {
                  setLang(currentLang === 'en' ? 'bn' : 'en');
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#003366] hover:bg-slate-800 text-white text-xs py-2 px-3 rounded flex items-center justify-center gap-2"
              >
                <Globe size={14} />
                <span>{currentLang === 'en' ? 'বাংলা সংস্করণ' : 'English Version'}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
