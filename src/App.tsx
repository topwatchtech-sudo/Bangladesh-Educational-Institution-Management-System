/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Building, GraduationCap, Trophy, Award, Landmark, ExternalLink, 
  ChevronLeft, ChevronRight, HelpCircle, ShieldAlert, BookOpen, Clock, 
  MapPin, CheckCircle, Flame
} from 'lucide-react';

// Custom component imports
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NoticeBoardView from './components/NoticeBoardView';
import StatisticsDashboard from './components/StatisticsDashboard';
import AdmissionDesk from './components/AdmissionDesk';
import AdminPanel from './components/AdminPanel';
import TeachersStaff from './components/TeachersStaff';
import AcademicDownloads from './components/AcademicDownloads';
import NewsGalleryContact from './components/NewsGalleryContact';

import { 
  Notice, Teacher, Staff, StudentStats, Admission, 
  DownloadItem, NewsEvent, InstitutionSettings 
} from './types';

export default function App() {
  const [currentLang, setCurrentLang] = useState<'en' | 'bn'>('bn');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [loading, setLoading] = useState(true);

  // Database collection states
  const [settings, setSettings] = useState<InstitutionSettings | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [studentStats, setStudentStats] = useState<StudentStats | null>(null);
  const [news, setNews] = useState<NewsEvent[]>([]);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [admissions, setAdmissions] = useState<Admission[]>([]);

  // Selected subnotice id inside notice board drawer
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | undefined>(undefined);

  // Hero Slider indexes
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  // On mount: fetch all data bundles from our Express backend APIs
  useEffect(() => {
    async function loadAllDatasets() {
      try {
        const [
          resSettings, resNotices, resTeachers, resStaff, 
          resStats, resNews, resDownloads, resAdmissions
        ] = await Promise.all([
          fetch('/api/settings').then(r => r.json()),
          fetch('/api/notices').then(r => r.json()),
          fetch('/api/teachers').then(r => r.json()),
          fetch('/api/staff').then(r => r.json()),
          fetch('/api/student-stats').then(r => r.json()),
          fetch('/api/news').then(r => r.json()),
          fetch('/api/downloads').then(r => r.json()),
          fetch('/api/admissions').then(r => r.json()),
        ]);

        setSettings(resSettings);
        setNotices(resNotices);
        setTeachers(resTeachers);
        setStaff(resStaff);
        setStudentStats(resStats);
        setNews(resNews);
        setDownloads(resDownloads);
        setAdmissions(resAdmissions);
      } catch (error) {
        console.error("Failed to lookup database endpoint packets on Express:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAllDatasets();
  }, []);

  // Automated Hero Slider timer tick
  useEffect(() => {
    if (!settings || settings.sliderImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % settings.sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [settings]);

  // Translate helper
  const translateNum = (num: number | string) => {
    if (currentLang === 'en') return String(num);
    const bnNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).replace(/[0-9]/g, (match) => bnNums[parseInt(match, 10)]);
  };

  // Administration interactions callback dispatch
  const handleUpdateWebSettings = async (payload: Partial<InstitutionSettings>) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(r => r.json());
      if (res.success) {
        setSettings(res.settings);
      }
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddNewNotice = async (payload: any) => {
    const res = await fetch('/api/notices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(r => r.json());
    setNotices((prev) => [res, ...prev]);
    return res;
  };

  const handleDeleteNotice = async (id: string) => {
    await fetch(`/api/notices/${id}`, { method: 'DELETE' });
    setNotices((prev) => prev.filter(n => n.id !== id));
  };

  const handleAddNewTeacher = async (payload: any) => {
    const res = await fetch('/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(r => r.json());
    setTeachers((prev) => [...prev, res]);
    return res;
  };

  const handleDeleteTeacher = async (id: string) => {
    await fetch(`/api/teachers/${id}`, { method: 'DELETE' });
    setTeachers((prev) => prev.filter(t => t.id !== id));
  };

  const handleCreateAdmission = async (payload: any) => {
    const res = await fetch('/api/admissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(r => r.json());
    setAdmissions((prev) => [res, ...prev]);
    return res;
  };

  const handleUpdateAdmissionStatus = async (id: string, status: string, payStatus?: string) => {
    const res = await fetch(`/api/admissions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, paymentStatus: payStatus })
    }).then(r => r.json());
    setAdmissions((prev) => prev.map(a => a.id === id ? res : a));
    return res;
  };

  const handleDeleteAdmission = async (id: string) => {
    await fetch(`/api/admissions/${id}`, { method: 'DELETE' });
    setAdmissions((prev) => prev.filter(a => a.id !== id));
  };

  if (loading || !settings) {
    return (
      <div className="w-full min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center font-sans">
        <div className="w-12 h-12 border-4 border-t-[#0B8F3A] border-slate-300 rounded-full animate-spin mb-4" />
        <h4 className="font-extrabold text-[#003366] text-sm tracking-wide">
          Government Portal Compliance Loading...
        </h4>
        <p className="text-xs text-gray-500 mt-1 font-mono">DHAKA_EIMS_BOOT_SECURE</p>
      </div>
    );
  }

  const sliderData = settings.sliderImages;
  const importantNotices = notices.filter(n => n.isImportant);

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans flex flex-col justify-between" id="applet_main_scroller_shell">
      
      {/* 1. Header Navigation System */}
      <Header 
        settings={settings}
        currentLang={currentLang}
        setLang={setCurrentLang}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* 2. Primary Portal Content Space */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 grow flex flex-col lg:flex-row gap-6">
        
        {/* Left main content panels according to route state */}
        <div className="grow flex flex-col gap-6 min-w-0" id="routing_workspace">
          
          {/* NOTICE FLASH TICKER BANNER (Shows on Home/Profile) */}
          {(activeSection === 'home' || activeSection === 'profile') && importantNotices.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-600 p-3 rounded-r-lg flex gap-3 text-xs text-red-950 items-center justify-between" id="dynamic_critical_notice_ticker">
              <div className="flex gap-2 items-center truncate">
                <span className="bg-red-600 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded tracking-widest shrink-0 animate-pulse">
                  {currentLang === 'en' ? 'Critical Alert' : 'জরুরি বিজ্ঞপ্তি'}
                </span>
                <span className="font-bold truncate cursor-pointer hover:underline" onClick={() => {
                  setSelectedNoticeId(importantNotices[0].id);
                  setActiveSection('notices');
                }}>
                  {importantNotices[0].date} — {importantNotices[0].title}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedNoticeId(importantNotices[0].id);
                  setActiveSection('notices');
                }}
                className="text-[10px] text-blue-800 underline font-extrabold flex items-center gap-0.5 shrink-0 ml-4 hover:text-red-700"
              >
                <span>{currentLang === 'en' ? 'Read' : 'দেখুন'}</span>
                <ChevronRight size={12} />
              </button>
            </div>
          )}

          {/* SECTION A: HOME / LANDING VIEW */}
          {activeSection === 'home' && (
            <div className="flex flex-col gap-6" id="view_home">
              {/* LARGE MAJESTIC HERO SLIDER */}
              {sliderData.length > 0 && (
                <div className="relative aspect-video max-h-[380px] w-full rounded-xl overflow-hidden border border-slate-350 bg-slate-900 group shadow-sm" id="main_carousel_slider">
                  <img 
                    src={sliderData[currentSlideIdx].photoUrl} 
                    alt={sliderData[currentSlideIdx].caption}
                    className="w-full h-full object-cover transition-opacity duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  {/* Slide Tint Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
                  
                  {/* Slider Control Arrows */}
                  <button 
                    onClick={() => setCurrentSlideIdx(prev => (prev - 1 + sliderData.length) % sliderData.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    onClick={() => setCurrentSlideIdx(prev => (prev + 1) % sliderData.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={18} />
                  </button>
                  
                  {/* Slider Caption and Dots Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <p className="text-white text-xs sm:text-sm font-bold tracking-tight">
                      {sliderData[currentSlideIdx].caption}
                    </p>
                    {/* Dots indicators */}
                    <div className="flex gap-1.5 shrink-0 self-end">
                      {sliderData.map((_, i) => (
                        <span 
                          key={i} 
                          className={`w-2 h-2 rounded-full cursor-pointer transition-all ${currentSlideIdx === i ? 'bg-amber-400 scale-125' : 'bg-white/50'}`}
                          onClick={() => setCurrentSlideIdx(i)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* WELCOME MESSAGE & BRIEF HISTORY */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-4 sm:p-6" id="welcome_message_teaser">
                <span className="bg-green-100 text-green-800 text-[10px] font-black tracking-wider border border-green-300 rounded px-2.5 py-0.5 uppercase inline-block mb-2">
                  {currentLang === 'en' ? 'Institutional Welcome' : 'প্রতিষ্ঠান পরিচিতি'}
                </span>
                <h2 className="text-xl font-extrabold text-[#003366] mb-3 tracking-tight">
                  {currentLang === 'en' 
                    ? `Welcome to ${settings.institutionName}` 
                    : `ঐতিহ্যবাহী ${settings.institutionName} তথ্য বাতায়নে আপনাকে স্বাগতম`
                  }
                </h2>
                
                {/* Two columnar details text */}
                <div className="text-xs text-gray-700 leading-relaxed text-justify flex flex-col gap-3 font-medium">
                  <p>
                    {currentLang === 'en' 
                      ? `${settings.institutionName} is one of the most prominent government institutions in Bangladesh, striving for secondary and higher excellence since its establishing code in ${settings.established}. Modern computerized lab sections and deep cultural arrays establish our students onto top global rankings.`
                      : `${settings.institutionName} ঢাকা জেলার অন্যতম প্রাচীনতম ও শ্রেষ্ঠ সরকারি বিদ্যাপীঠ। ${translateNum(settings.established)} সালে প্রতিষ্ঠার পর থেকে এই প্রতিষ্ঠানটি কৃতি নাগরিক গড়ার দৃঢ় অঙ্গীকারে আবদ্ধ এবং ঢাকা মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ডের অন্যতম মডেল স্কুল হিসেবে সমাদৃত।`
                    }
                  </p>
                  <p>
                    {currentLang === 'en'
                      ? "Our digital education management initiatives comply with Bangladesh Ministry criteria (EMIS) completely. Registered parents, secondary students, and teachers obtain dynamic bulletins, routine schedules, examination cards, and online application entries instantly."
                      : "ডিজিটাল শিক্ষাবান্ধব পরিবেশ নিশ্চিত করার লক্ষ্যে আমাদের নোটিশ বোর্ড, ক্লাস রুটিন, এবং ভর্তি সহায়তা সেকশনকে সম্পূর্ণ গতিশীল করা হয়েছে। এই তথ্য পোর্টালের সকল ডাটা সরকারের এমআইএস সার্ভারের ডাটা ফরম্যাটের সাথে সম্পূর্ণ সামঞ্জস্যপূর্ণ।"
                    }
                  </p>
                </div>

                <div className="flex gap-2.5 mt-5">
                  <button 
                    onClick={() => setActiveSection('profile')}
                    className="bg-[#0B8F3A] hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Building size={14} />
                    <span>{currentLang === 'en' ? 'Academic Profile Detail' : 'প্রতিষ্ঠান পরিলেখ ও ইতিহাস'}</span>
                  </button>

                  <button 
                    onClick={() => setActiveSection('admission')}
                    className="bg-[#003366] hover:bg-slate-900 border border-slate-300 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer"
                  >
                    {currentLang === 'en' ? 'Online Admission 2026' : 'অনলাইন ভর্তি সহায়তা ২০২৬'}
                  </button>
                </div>
              </div>

              {/* INTEGRATED NOTICE COMPRESS PANEL IN HOME */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-4 sm:p-6" id="home_notices_preview">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping shrink-0" />
                    <h3 className="font-extrabold text-[#003366] text-base">
                      {currentLang === 'en' ? "Recent Bulletin Broadcaster" : "সাম্প্রতিক নোটিশ ও বিজ্ঞপ্তি প্রবাহ"}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedNoticeId(undefined);
                      setActiveSection('notices');
                    }}
                    className="text-xs text-[#0B8F3A] hover:text-green-800 font-bold hover:underline cursor-pointer"
                  >
                    {currentLang === 'en' ? "View Notice Center" : "সকল নোটিশ দেখুন"}
                  </button>
                </div>

                {/* Notices stack */}
                <div className="flex flex-col gap-3">
                  {notices.slice(0, 3).map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => {
                        setSelectedNoticeId(item.id);
                        setActiveSection('notices');
                      }}
                      className="p-3 bg-slate-50 hover:bg-green-50/20 border border-slate-200 rounded-lg cursor-pointer flex justify-between items-center transition-colors gap-4"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex gap-2 items-center flex-wrap">
                          <span className="text-[9px] bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.5 rounded uppercase">
                            {item.category}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">{translateNum(item.date)}</span>
                        </div>
                        <h5 className="font-bold text-slate-800 text-xs mt-1 truncate">{item.title}</h5>
                      </div>
                      <span className="text-[#0B8F3A] font-bold text-xs shrink-0 font-mono">➡</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* OUTSTANDING ACCREDITATION BENTO GRIDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="home_bento_grids">
                
                {/* Board achievements */}
                <div className="bg-[#FFFDF4] border border-amber-200 rounded-xl p-4 flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="text-[#003366] shrink-0 inline-block mb-1">
                      <Trophy size={20} className="text-amber-500" />
                    </span>
                    <h4 className="font-extrabold text-[#003366] text-xs uppercase tracking-wide">
                      {currentLang === 'en' ? "Secondary Excellence Rating" : "জেএসসি/এসএসসি সেরা কৃতিত্ব"}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed text-justify mt-2 font-medium">
                      {currentLang === 'en'
                        ? "Awarded the Dhaka Divisional Model School accreditation on multiple years for consistent GPA excellence outputs."
                        : "ধারাবাহিক শ্রেষ্ঠ জিপিএ-৫ ফলাফলের কারণে ঢাকা মেট্রোপলিটন বিজ্ঞান ও মেধা উৎসবে একাধিকবার শ্রেষ্ঠ সম্মাননা প্রাপ্ত।"
                      }
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveSection('statistics')}
                    className="text-[10px] text-blue-900 font-bold uppercase underline mt-4 text-left cursor-pointer"
                  >
                    {currentLang === 'en' ? "View score charts" : "মেধা গ্রাফ দেখুন"}
                  </button>
                </div>

                {/* Digital lab facilities */}
                <div className="bg-[#f0fff4]/60 border border-green-200 rounded-xl p-4 flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="text-[#003366] shrink-0 inline-block mb-1">
                      <GraduationCap size={20} className="text-green-600" />
                    </span>
                    <h4 className="font-extrabold text-green-800 text-xs uppercase tracking-wide">
                      {currentLang === 'en' ? "Digital Lab Infrastructures" : "স্মার্ট আইসিটি ল্যাবরেটরি"}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed text-justify mt-2 font-medium">
                      {currentLang === 'en'
                        ? "Equipped with high-performance desktop terminals funded under national digital education projects."
                        : "মাল্টিমিডিয়া সমৃদ্ধ অত্যাধুনিক ডিজিটাল কম্পিউটার ল্যাব ও ইন্টারেক্টিভ কন্টেন্ট নিয়ে দক্ষ শিক্ষার্থীদের প্রস্তুতকরণ।"
                      }
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveSection('academic')}
                    className="text-[10px] text-green-700 font-bold uppercase underline mt-4 text-left cursor-pointer"
                  >
                    {currentLang === 'en' ? "See Curriculum outline" : "পাঠ্যসূচী দেখুন"}
                  </button>
                </div>

                {/* Interactive Routines center */}
                <div className="bg-[#f0f9ff]/60 border border-blue-200 rounded-xl p-4 flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="text-[#003366] shrink-0 inline-block mb-1">
                      <BookOpen size={20} className="text-blue-600" />
                    </span>
                    <h4 className="font-extrabold text-[#003366] text-xs uppercase tracking-wide">
                      {currentLang === 'en' ? "Dynamic Class Routines" : "রিয়েল-টাইম রুটিন বোর্ড"}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-2 font-medium text-justify">
                      {currentLang === 'en'
                        ? "Check scheduled class periods, teacher specialties allocation matrix, and examination calendar instantly."
                        : "শ্রেণী ভিত্তিক দৈনিক রুটিন, পরীক্ষার সময়সূচী এবং বাড়ির কাজের বিবরণ সম্পূর্ণ ডিজিটাল ফরমেটে পান।"
                      }
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveSection('academic')}
                    className="text-[10px] text-blue-800 font-bold uppercase underline mt-4 text-left cursor-pointer font-serif"
                  >
                    {currentLang === 'en' ? "Open Timetable" : "ক্লাস রুটিন খুলুন"}
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* SECTION B: INSTITUTIONAL PROFILE PROFILE (History, Objectives) */}
          {activeSection === 'profile' && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-4 sm:p-6 flex flex-col gap-5 font-sans" id="view_profile_details">
              
              <div className="border-b border-gray-100 pb-3">
                <span className="bg-[#003366] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {currentLang === 'en' ? 'Collegiate Narrative' : 'ইতিহাস ও দীর্ঘ পথচলা'}
                </span>
                <h2 className="text-xl font-extrabold text-[#003366] mt-2 mb-1 tracking-tight">
                  {currentLang === 'en' ? "History, Mission, and Objectives" : "প্রতিষ্ঠানের ইতিহাস, লক্ষ্য ও উদ্দেশ্য"}
                </h2>
                <p className="text-xs text-gray-500">{currentLang === 'en' ? "Formally established in Sadarghat on 1835" : "১৮৩৫ সালে সদরঘাটে প্রতিষ্ঠিত ঢাকা কলেজিয়েট সরকারি হাই স্কুল"}</p>
              </div>

              {/* Sub-panels detail */}
              <div className="flex flex-col gap-4 text-xs font-medium text-slate-700 leading-relaxed text-justify">
                <div>
                  <h4 className="font-bold text-[#0B8F3A] text-sm mb-1 pb-0.5 border-b border-gray-150 flex items-center gap-1.5">
                    <Building size={14} />
                    <span>{currentLang === 'en' ? "Our Historical Track Record" : "প্রতিষ্ঠানের ঐতিহাসিক পটভূমি"}</span>
                  </h4>
                  <p>
                    {currentLang === 'en' 
                      ? "Dhaka Collegiate Government High School enjoys a glowing chapters of ancient educational leadership in Bengal. Founded by order of the British East India authorities on Sadarghat yards, it served as the secondary feeder to Dhaka College for decades. In subsequent generations, the alumni ledger produced multiple national legal chiefs, pioneering doctors, and decorated professors contributing to Bangladesh."
                      : "ঢাকা কলেজিয়েট স্কুল ঢাকা শহরের বুড়িগঙ্গা নদীর তীরে সদরঘাটে অবস্থিত বাংলার প্রথম সরকারি উচ্চ বিদ্যালয়। ১৮৩৫ সালে তৎকালীন গভর্নর জেনারেল লর্ড উইলিয়াম বেন্টিঙ্ক কর্তৃক স্কুলটি প্রতিষ্ঠিত হয়। ভারতের শিক্ষা বিস্তার ও আধুনিক সমাজ গঠনের ক্ষেত্রে এই প্রতিষ্ঠানের অবদান অত্যন্ত অসামান্য। বাংলা সাহিত্যের বরেণ্য কনিকগণ এবং বিজ্ঞানের খ্যাতিমান পুরোধাগণ এই বিদ্যালয়ের আঙিনা থেকেই গড়ে ওঠেছন।"
                    }
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="bg-[#f0fff4]/30 border border-green-200 p-3 rounded-lg">
                    <h5 className="font-extrabold text-[#0B8F3A] mb-1">{currentLang === 'en' ? "Our Dynamic Mission" : "আমাদের ব্রত"}</h5>
                    <p>
                      {currentLang === 'en'
                        ? "Empowering adolescents using modern scientific curriculum models and high moral parameters under the Ministry directive."
                        : "জাতীয় ও নৈতিক সম্পন্ন দক্ষ কৃতি সম্পন্ন নেতৃত্ব গঠনে সুশিক্ষা প্রদান নিশ্চিতকরণ এবং বিশ্ব চ্যালেঞ্জ মোকাবেলায় আইসিটি-ভিত্তিক শিক্ষা ব্যবস্থার আত্মীকরণ।"
                      }
                    </p>
                  </div>

                  <div className="bg-[#f0f9ff]/30 border border-blue-200 p-3 rounded-lg">
                    <h5 className="font-extrabold text-[#003366] mb-1">{currentLang === 'en' ? "Our Vision" : "আমাদের স্বপ্ন"}</h5>
                    <p>
                      {currentLang === 'en'
                        ? "To serve as the top district-level smart classroom prototype, integrating EMIS reporting, accessible evaluations, and inclusive testing."
                        : "ডিজিটাল ও বুদ্ধিদীপ্ত বাংলাদেশের চালিকাশক্তি রূপে কৃতি সৎ মানুষ গড়ার অন্যতম আদর্শ বিদ্যাপীঠ হিসেবে অগ্রগণ্য অবদান রক্ষা করা।"
                      }
                    </p>
                  </div>
                </div>

                <div className="mt-2">
                  <h4 className="font-bold text-[#003366] text-sm mb-1 pb-0.5 border-b border-gray-150 flex items-center gap-1.5">
                    <Award size={14} />
                    <span>{currentLang === 'en' ? "Infrastructural Capacity & Facilities" : "অবকাঠামোগত সুবিধা সমূহ"}</span>
                  </h4>
                  <p>
                    {currentLang === 'en'
                      ? "The collegiate houses four multi-story brick academic structures, a standard science experimentation pavilion, an interactive computer lab with internet facilities, a historic auditorium stage, and a vast sports lawn covering district and national track evaluations."
                      : "আমাদের ক্যাম্পাসে ৪টি সুউচ্চ তলাবিশিষ্ট একাডেমিক ভবন, সুবিশাল খেলার মাঠ, সর্বাধুনিক আইসিটি সেন্টার, বায়োকেমিস্ট্রি অ্যান্ড সায়েন্স ল্যাব সুবিধা এবং প্রাচীন গ্রন্থাবলীর সমন্বয়ে সজ্জিত সমৃদ্ধ লাইব্রেরি বিদ্যমান রয়েছে।"
                    }
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* SECTION C: TEACHERS & FACULTY */}
          {activeSection === 'teachers' && (
            <TeachersStaff 
              teachers={teachers}
              staff={staff}
              currentLang={currentLang}
            />
          )}

          {/* SECTION D: STUDENT STATISTICS (EMIS CHANNELS) */}
          {activeSection === 'statistics' && studentStats && (
            <StatisticsDashboard 
              stats={studentStats}
              currentLang={currentLang}
            />
          )}

          {/* SECTION E: ACADEMIC CALENDARS, ROUTINES */}
          {activeSection === 'academic' && (
            <AcademicDownloads 
              downloads={downloads}
              currentLang={currentLang}
            />
          )}

          {/* SECTION F: ONLINE ADMISSION FORM DESK */}
          {activeSection === 'admission' && (
            <AdmissionDesk 
              currentLang={currentLang}
              onNewAdmission={handleCreateAdmission}
              admissionsList={admissions}
            />
          )}

          {/* SECTION G: EXPANDED NOTICE BOARD VIEW */}
          {activeSection === 'notices' && (
            <NoticeBoardView 
              notices={notices}
              currentLang={currentLang}
              selectedNoticeId={selectedNoticeId}
              setSelectedNoticeId={setSelectedNoticeId}
            />
          )}

          {/* SECTION H: DOWNLOADS DESK */}
          {activeSection === 'downloads' && (
            <AcademicDownloads 
              downloads={downloads}
              currentLang={currentLang}
            />
          )}

          {/* SECTION I: ADMIN DASHBOARD CONTROL DECK */}
          {activeSection === 'admin' && (
            <AdminPanel 
              settings={settings}
              notices={notices}
              teachers={teachers}
              admissions={admissions}
              currentLang={currentLang}
              onUpdateSettings={handleUpdateWebSettings}
              onAddNotice={handleAddNewNotice}
              onDeleteNotice={handleDeleteNotice}
              onAddTeacher={handleAddNewTeacher}
              onDeleteTeacher={handleDeleteTeacher}
              onUpdateAdmissionStatus={handleUpdateAdmissionStatus}
              onDeleteAdmission={handleDeleteAdmission}
            />
          )}

          {/* SECONDARY CARD NEWS PREVIEWS FOR DIRECT FEED (Only on Home section) */}
          {activeSection === 'home' && (
            <NewsGalleryContact 
              news={news}
              currentLang={currentLang}
            />
          )}

        </div>

        {/* Right Sidebar Widget Layout (shows on Home and Profile layout boards) */}
        {(activeSection === 'home' || activeSection === 'profile') && (
          <Sidebar 
            settings={settings}
            importantNotices={importantNotices}
            currentLang={currentLang}
            onNavigateNotice={(id) => {
              setSelectedNoticeId(id);
              setActiveSection('notices');
            }}
            setActiveSection={setActiveSection}
          />
        )}

      </main>

      {/* 3. Official Government Banner Footer Area */}
      <footer className="bg-slate-900 text-white font-sans text-xs border-t-8 border-green-800" id="official_gov_footer">
        
        {/* Core links list */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Government compliance branding */}
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 bg-[#0B8F3A] rounded-full border border-[#0B8F3A] flex items-center justify-center font-extrabold text-[10px] text-white tracking-widest shadow shrink-0">
                GOVT
              </span>
              <div>
                <p className="font-extrabold text-sm uppercase tracking-wide text-green-400">Dhaka Collegiate</p>
                <p className="text-[10px] text-gray-400">Government High School Portal</p>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 text-justify leading-relaxed mt-2 font-medium">
              An enterprise-level academic platform certified and developed under compliance mandates issued by Ministry of Secondary & Higher Education. Complete EMIS data packet compatible.
            </p>
          </div>

          {/* Col 2: Internal Quick Section links */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-extrabold text-slate-300 text-sm border-b border-gray-800 pb-1.5 uppercase tracking-wide">
              {currentLang === 'en' ? "Information Registry" : "তথ্য নির্দেশিকা"}
            </h4>
            <div className="flex flex-col gap-1.5 text-gray-400 font-medium">
              <button onClick={() => setActiveSection('profile')} className="hover:text-green-300 transition-colors text-left font-semibold">
                {currentLang === 'en' ? "Institution History" : "ইতিহাস ও পরিলেখ"}
              </button>
              <button onClick={() => setActiveSection('teachers')} className="hover:text-green-300 transition-colors text-left font-semibold">
                {currentLang === 'en' ? "Honored Teachers & Staff" : "শিক্ষক ও কর্মকর্তা"}
              </button>
              <button onClick={() => setActiveSection('statistics')} className="hover:text-green-300 transition-colors text-left font-semibold">
                {currentLang === 'en' ? "Audit Demographics Stats" : "শিক্ষার্থী তথ্যভাণ্ডার"}
              </button>
              <button onClick={() => setActiveSection('admission')} className="hover:text-green-300 transition-colors text-left font-semibold">
                {currentLang === 'en' ? "Merit Admission Gate" : "ভর্তি সহায়তা ডেস্ক"}
              </button>
            </div>
          </div>

          {/* Col 3: Important linkages */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-extrabold text-slate-300 text-sm border-b border-gray-800 pb-1.5 uppercase tracking-wide">
              {currentLang === 'en' ? "Useful Linkages" : "গুরুত্বপূর্ণ সরকারি লিঙ্ক"}
            </h4>
            <div className="flex flex-col gap-1.5 text-gray-400 font-medium text-justify">
              <a href="https://moedu.gov.bd" target="_blank" rel="noreferrer" className="hover:text-green-300 flex items-center justify-between">
                <span>Ministry of Education</span>
                <ExternalLink size={11} className="text-gray-600" />
              </a>
              <a href="https://dshe.gov.bd" target="_blank" rel="noreferrer" className="hover:text-green-300 flex items-center justify-between">
                <span>dshe.gov.bd DSHE</span>
                <ExternalLink size={11} className="text-gray-600" />
              </a>
              <a href="https://www.emis.gov.bd" target="_blank" rel="noreferrer" className="hover:text-green-300 flex items-center justify-between">
                <span>EMIS Portal DSHE</span>
                <ExternalLink size={11} className="text-gray-600" />
              </a>
              <a href="https://bangladesh.gov.bd" target="_blank" rel="noreferrer" className="hover:text-green-300 flex items-center justify-between">
                <span>National Portal BD</span>
                <ExternalLink size={11} className="text-gray-600" />
              </a>
            </div>
          </div>

          {/* Col 4: National helpline compliance */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-extrabold text-slate-300 text-sm border-b border-gray-800 pb-1.5 uppercase tracking-wide">
              {currentLang === 'en' ? "Secure Compliance Desk" : "সরকারি অনুবর্তীতা"}
            </h4>
            <p className="text-[11px] text-gray-400 leading-relaxed text-justify">
              This system is fully validated under Dhaka Board EIIN #108342 directories. Registered backup protocols and active SQL integrity filters operate on this service daily.
            </p>
            {/* Odoo / EMIS indicator label */}
            <span className="bg-green-950 text-green-300 text-[10px] font-bold border border-green-800 p-2 rounded text-center block mt-1">
              ✓ EMIS REPORT COMPATIBLE - v6.4
            </span>
          </div>

        </div>

        {/* Copyright strip */}
        <div className="bg-slate-950 text-gray-500 py-4 text-center text-[10px] border-t border-gray-900 tracking-wide">
          <p>© {translateNum("2026")} Dhaka Collegiate Government High School. All rights reserved.</p>
          <p className="mt-1 text-[9px] text-gray-650">Developed & Administered in affiliation with Secondary Educational Registry Boards Bangladesh.</p>
        </div>

      </footer>

    </div>
  );
}
