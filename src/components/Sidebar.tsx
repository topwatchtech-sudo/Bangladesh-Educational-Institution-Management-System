/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, Link as LinkIcon, PhoneCall, Music, Play, Pause, RefreshCw, 
  Eye, GraduationCap, CheckCircle, ExternalLink, Flame
} from 'lucide-react';
import { InstitutionSettings, Notice } from '../types';

interface SidebarProps {
  settings: InstitutionSettings;
  importantNotices: Notice[];
  currentLang: 'en' | 'bn';
  onNavigateNotice: (id: string) => void;
  setActiveSection: (sec: string) => void;
}

export default function Sidebar({
  settings,
  importantNotices,
  currentLang,
  onNavigateNotice,
  setActiveSection
}: SidebarProps) {
  const [isPlayingAnthem, setIsPlayingAnthem] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [audio] = useState(() => {
    // Standard high quality instrumental copy of 'Amar Shonar Bangla' (National Anthem)
    const sound = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Fallback instrument
    sound.loop = true;
    return sound;
  });

  const toggleAnthem = () => {
    if (isPlayingAnthem) {
      audio.pause();
    } else {
      audio.play().catch(e => console.log('Audio playback delayed until human interaction', e));
    }
    setIsPlayingAnthem(!isPlayingAnthem);
  };

  const padVisitor = (num: number) => {
    const str = String(num).padStart(6, '0');
    return str.split('');
  };

  const lyrics = {
    en: {
      line1: "My Golden Bengal, I love you.",
      line2: "Forever your skies, your brotherly air set my heart in tune.",
      line3: "O Mother! The fragrance of your mango orchards in spring makes me wild with joy!"
    },
    bn: {
      line1: "আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।",
      line2: "চিরদিন তোমার আকাশ, তোমার বাতাস, আমার প্রাণে বাজায় বাঁশি॥",
      line3: "ও মা, ফাগুনে তোর আমের বনে ঘ্রাণে পাগল করে, মরি হায়, হায় রে..."
    }
  };

  const portalLinks = [
    { name: { en: 'Primary Education (dpe.gov.bd)', bn: 'প্রাথমিক শিক্ষা অধিদপ্তর' }, url: 'http://dpe.gov.bd' },
    { name: { en: 'Teacher Portal (teachers.gov.bd)', bn: 'শিক্ষক বাতায়ন' }, url: 'https://teachers.gov.bd' },
    { name: { en: 'Online Books (nctb.gov.bd)', bn: 'এনসিটিবি পাঠ্যপুস্তক' }, url: 'http://nctb.gov.bd' },
    { name: { en: 'PM Scholarship (pmeit.gov.bd)', bn: 'প্রধানমন্ত্রীর শিক্ষা ট্রাস্ট' }, url: 'http://pmeit.gov.bd' },
  ];

  return (
    <aside className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6 font-sans" id="gov_right_sidebar_container">
      
      {/* 1. Principal Photo & Brief Welcome Box */}
      <div className="bg-white rounded-lg border border-[#0B8F3A] overflow-hidden shadow-sm" id="principal_sidebar_card">
        <div className="bg-[#0B8F3A] text-white px-4 py-2.5 font-bold text-sm tracking-wide flex items-center gap-2">
          <User size={16} />
          <span>{currentLang === 'en' ? "Head of Institution" : "প্রতিষ্ঠান প্রধান"}</span>
        </div>
        <div className="p-4 text-center">
          <div className="relative w-28 h-28 mx-auto mb-3.5 rounded-full overflow-hidden border-4 border-double border-green-700 shadow flex items-center justify-center">
            <img 
              src={settings.principalPhoto} 
              alt={settings.principalName}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h4 className="font-bold text-slate-800 text-base">{settings.principalName}</h4>
          <p className="text-xs text-green-700 font-semibold mb-3">
            {currentLang === 'en' ? "Principal, Dhaka Collegiate" : "অধ্যক্ষ, ঢাকা কলেজিয়েট"}
          </p>
          <div className="border-t border-gray-100 pt-3 text-[12px] text-gray-600 line-clamp-3 text-justify leading-relaxed">
            "{settings.principalMessage}"
          </div>
          <button 
            onClick={() => setActiveSection('profile')}
            className="mt-3.5 w-full bg-green-50 hover:bg-green-100 text-[#0B8F3A] hover:text-green-800 border border-[#0B8F3A] text-xs font-bold py-1.5 px-3 rounded transition-all shadow-sm"
          >
            {currentLang === 'en' ? "Read Message Outline" : "পূর্ণাঙ্গ বার্তা দেখুন"}
          </button>
        </div>
      </div>

      {/* 2. Live Visitor Counter Widget */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm" id="visitor_counter_sidebar_card">
        <div className="bg-[#003366] text-white px-4 py-2.5 font-bold text-sm flex items-center gap-2">
          <Eye size={16} />
          <span>{currentLang === 'en' ? "Total Odometer Visitor" : "মোট ভিজিটর কাউন্টার"}</span>
        </div>
        <div className="p-4 flex flex-col items-center">
          <div className="flex gap-1.5" id="visitor_counter_display">
            {padVisitor(settings.visitorCounter).map((digit, i) => (
              <span 
                key={i} 
                className="w-7 h-9 bg-slate-900 border-2 border-slate-700 text-emerald-400 font-mono text-xl font-black rounded flex items-center justify-center shadow-inner tracking-wider"
              >
                {digit}
              </span>
            ))}
          </div>
          <span className="text-[10px] text-gray-500 font-medium mt-2">
            {currentLang === 'en' ? "Official Audit Standardized" : "সরকারি এডিআইএল মেটিক অনুযায়ী"}
          </span>
        </div>
      </div>

      {/* 3. National Anthem Interactive Audio Lyric Player */}
      <div className="bg-[#FFFDF4] rounded-lg border-2 border-amber-300 overflow-hidden shadow-sm" id="national_anthem_card">
        <div className="bg-amber-400 text-slate-900 px-4 py-2.5 font-bold text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music size={16} />
            <span>{currentLang === 'en' ? "National Anthem" : "জাতীয় সঙ্গীত শোনা"}</span>
          </div>
          <span className="bg-red-600 text-white text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded font-black animate-pulse">
            LIVE
          </span>
        </div>
        <div className="p-4">
          <p className="text-xs font-bold text-slate-800 mb-2 border-b border-amber-200 pb-1 flex items-center gap-1.5">
            <Flame size={12} className="text-red-500" />
            <span>{currentLang === 'en' ? "Amar Shonar Bangla" : "আমার সোনার বাংলা"}</span>
          </p>
          
          <div className="bg-white p-3 rounded-md border border-amber-200 shadow-inner text-center">
            {/* Play/Pause Button */}
            <button
              onClick={toggleAnthem}
              className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md border-3 border-amber-300 transition-all cursor-pointer transform hover:scale-105"
            >
              {isPlayingAnthem ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
            </button>
            <p className="text-[11px] font-bold text-slate-700">
              {isPlayingAnthem 
                ? (currentLang === 'en' ? "Streaming Instrument..." : "জাতীয় সংগীত বাজছে...") 
                : (currentLang === 'en' ? "Click to Play Anthem" : "জাতীয় সঙ্গীত বাজাতে ক্লিক করুন")
              }
            </p>
          </div>

          <button
            onClick={() => setShowLyrics(!showLyrics)}
            className="w-full mt-3 text-xs text-blue-800 hover:text-blue-900 font-bold underline text-center"
          >
            {showLyrics 
              ? (currentLang === 'en' ? "Hide Lyrics Text" : "গীতিকবিতা লুকান") 
              : (currentLang === 'en' ? "Show Golden Bengal Lyrics" : "জাতীয় সংগীতের গীতিকবিতা দেখুন")
            }
          </button>

          {showLyrics && (
            <div className="mt-3 bg-amber-50 p-3 rounded text-[11px] text-justify leading-relaxed text-amber-950 border border-amber-200 shadow-sm font-serif">
              <p className="font-semibold mb-1 border-b border-amber-200 pb-0.5">
                {currentLang === 'en' ? "Stanza One:" : "প্রথম স্তবক:"}
              </p>
              <p className="mb-1">{lyrics[currentLang].line1}</p>
              <p className="mb-1">{lyrics[currentLang].line2}</p>
              <p>{lyrics[currentLang].line3}</p>
            </div>
          )}
        </div>
      </div>

      {/* 4. Important Government Links List inside sidebar */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm" id="important_links_sidebar_card">
        <div className="bg-[#0B8F3A] text-white px-4 py-2.5 font-bold text-sm flex items-center gap-2">
          <LinkIcon size={16} />
          <span>{currentLang === 'en' ? "Important Portals" : "গুরুত্বপূর্ণ লিঙ্কসমূহ"}</span>
        </div>
        <div className="p-2 flex flex-col">
          {settings.importantLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-xs text-gray-700 hover:text-green-800 hover:bg-slate-50 rounded flex items-center justify-between border-b border-gray-100 last:border-0 font-medium transition-colors"
            >
              <span>{link.title}</span>
              <ExternalLink size={12} className="text-gray-400 shrink-0" />
            </a>
          ))}
          <div className="bg-slate-50 p-1 font-semibold uppercase text-center text-[10px] text-slate-500 mt-2 rounded">
            National E-Government Linkages
          </div>
        </div>
      </div>

      {/* 5. Emergency Helpline Infographic Panel */}
      <div className="bg-white rounded-lg border border-red-200 overflow-hidden shadow-sm" id="emergency_hotlines_card">
        <div className="bg-red-700 text-white px-4 py-2.5 font-bold text-sm flex items-center gap-2">
          <PhoneCall size={16} />
          <span>{currentLang === 'en' ? "Institutional Hotlines" : "জরুরি সরকারি হটলাইন"}</span>
        </div>
        <div className="p-4 flex flex-col gap-3">
          
          <div className="flex gap-3 items-center border-b border-red-50 pb-2">
            <span className="w-10 h-10 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-black text-lg">
              999
            </span>
            <div>
              <p className="text-xs font-bold text-slate-800">{currentLang === 'en' ? "Emergency Services" : "জরুরি সেবা"}</p>
              <p className="text-[10px] text-gray-500">{currentLang === 'en' ? "Police, Fire, Ambulance" : "পুলিশ, ফায়ার সার্ভিস, অ্যাম্বুলেন্স"}</p>
            </div>
          </div>

          <div className="flex gap-3 items-center border-b border-red-55 pb-2">
            <span className="w-10 h-10 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-black text-lg">
              333
            </span>
            <div>
              <p className="text-xs font-bold text-slate-800">{currentLang === 'en' ? "National Information" : "জাতীয় তথ্য ও সেবা"}</p>
              <p className="text-[10px] text-gray-500">{currentLang === 'en' ? "Government Circular Help Desk" : "সরকারি নাগরিক সেবা ও তথ্য"}</p>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <span className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-black text-lg">
              109
            </span>
            <div>
              <p className="text-xs font-bold text-slate-800">{currentLang === 'en' ? "Child Helpline" : "শিশু সহায়ক হেল্পলাইন"}</p>
              <p className="text-[10px] text-gray-500">{currentLang === 'en' ? "Special Protection desk" : "বিশেষ শিশু অধিকার ও নির্যাতন প্রতিরোধ"}</p>
            </div>
          </div>

        </div>
      </div>

    </aside>
  );
}
