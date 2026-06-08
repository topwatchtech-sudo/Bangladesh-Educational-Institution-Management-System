/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, Calendar, MapPin, Phone, Mail, Image as ImageIcon, Video, 
  Send, Compass, HelpCircle, CheckCircle2, MessageSquare, ExternalLink 
} from 'lucide-react';
import { NewsEvent } from '../types';

interface NewsGalleryContactProps {
  news: NewsEvent[];
  currentLang: 'en' | 'bn';
}

export default function NewsGalleryContact({
  news,
  currentLang
}: NewsGalleryContactProps) {
  const [activeSubView, setActiveSubView] = useState<'news' | 'gallery' | 'contact'>('news');
  const [galleryCategory, setGalleryCategory] = useState<'all' | 'sports' | 'national' | 'cultural'>('all');

  // Contact form submission state
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cMsg, setCMsg] = useState('');
  const [cSuccess, setCSuccess] = useState(false);

  // Gallery albums mock list
  const photoGalleryList = [
    { title: { en: 'Annual Sports Parade', bn: 'বার্ষিক ক্রীড়া কুচকাওয়াজ' }, cat: 'sports', img: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&q=80&w=400' },
    { title: { en: 'Inauguration of New Science Lab Building', bn: 'নতুন বিজ্ঞান গবেষণাগার ভবন উদ্বোধন' }, cat: 'national', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400' },
    { title: { en: 'Traditional Assembly Singing Day', bn: 'ঐতিহ্যবাহী বার্ষিক সঙ্গীত অনুষ্ঠান' }, cat: 'cultural', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400' },
    { title: { en: 'Prize Giving Ceremony on Stage Ensembles', bn: 'বার্ষিক কৃতি শিক্ষার্থী পুরষ্কার উৎসব' }, cat: 'cultural', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400' },
    { title: { en: 'Victory Day Cultural Assembly', bn: 'মহান বিজয় দিবস সাংস্কৃতিক সমাবেশ' }, cat: 'national', img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=400' },
    { title: { en: 'District Soccer Championship Trophy', bn: 'আন্তঃজেলা ফুটবল চ্যাম্পিয়নশিপ ট্রফি' }, cat: 'sports', img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=400' }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName || !cMsg) return;
    setCSuccess(true);
    setCName('');
    setCEmail('');
    setCMsg('');
    setTimeout(() => setCSuccess(false), 5000);
  };

  const filteredGallery = photoGalleryList.filter(p => galleryCategory === 'all' || p.cat === galleryCategory);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-4 sm:p-6 font-sans flex flex-col gap-6" id="news_gallery_contact_root">
      
      {/* Sub Tabs Selection Header */}
      <div className="border-b border-gray-100 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#003366] tracking-tight flex items-center gap-2">
            <FileText className="text-[#0B8F3A]" size={24} />
            <span>{currentLang === 'en' ? "News, Gallery & Inquiry Desk" : "বার্তা, গ্যালারি ও যোগাযোগ কেন্দ্র"}</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {currentLang === 'en' 
              ? "Access administrative news releases, view historic albums, or write feedback letters." 
              : "প্রতিষ্ঠান প্রধানের বিভিন্ন ঘোষণা, জাতীয় ক্রীড়া উৎসব গ্যালারি ও যোগাযোগ ফর্ম।"
            }
          </p>
        </div>

        {/* Dynamic sub selector tabs */}
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0 self-stretch md:self-auto overflow-x-auto gap-0.5">
          <button
            onClick={() => setActiveSubView('news')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeSubView === 'news' ? 'bg-[#0B8F3A] text-white shadow' : 'text-slate-650 hover:text-slate-800 text-slate-700'
            }`}
          >
            {currentLang === 'en' ? "Institution News" : "সর্বশেষ ঘটনা"}
          </button>
          <button
            onClick={() => setActiveSubView('gallery')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeSubView === 'gallery' ? 'bg-[#0B8F3A] text-white shadow' : 'text-slate-650 hover:text-slate-800 text-slate-700'
            }`}
          >
            {currentLang === 'en' ? "Media Gallery" : "ছবির প্রকাশনী"}
          </button>
          <button
            onClick={() => setActiveSubView('contact')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeSubView === 'contact' ? 'bg-[#0B8F3A] text-white shadow' : 'text-slate-650 hover:text-slate-800 text-slate-700'
            }`}
          >
            {currentLang === 'en' ? "Inquire Contact Desk" : "যোগাযোগ বিবরণী"}
          </button>
        </div>
      </div>

      {/* VIEW SECTION 1: NEWS & EVENTS STORY STREAM */}
      {activeSubView === 'news' && (
        <div className="flex flex-col gap-6" id="news_events_stream">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between shadow-sm">
                
                {/* Photo Header */}
                <div className="relative h-44 bg-slate-100 w-full overflow-hidden flex items-center justify-center">
                  <img 
                    src={item.photoUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform" 
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-red-600 text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded tracking-wide border border-red-500 shadow-sm shadow-md shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 flex-1">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold mb-1.5">
                    <Calendar size={12} />
                    <span>{item.date}</span>
                  </div>
                  <h4 className="font-extrabold text-[#003366] text-sm tracking-tight leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed text-justify mt-2 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* News Card Footer */}
                <div className="px-4 pb-4 pt-1 flex justify-between items-center text-[11px] font-bold border-t border-slate-100">
                  <span className="text-green-700">{currentLang === 'en' ? 'Verified Press release' : 'মন্ত্রণালয় প্রেস বিজ্ঞপ্তি'}</span>
                  <a href="#gov_top_header" className="text-slate-400 hover:text-slate-700 underline font-mono text-[10px]"># READ_FULL</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW SECTION 2: PHOTO & MEDIA GALLERY CATEGORIZED */}
      {activeSubView === 'gallery' && (
        <div className="flex flex-col gap-6" id="media_gallery_board shadow-inner rounded-xl p-4 bg-slate-50/50">
          
          {/* Gallery Category selection block */}
          <div className="flex flex-wrap gap-1.5 border-b border-gray-200 pb-3" id="gallery_category_filters">
            {[
              { id: 'all', title: { en: 'All Photos', bn: 'সব ছবি' } },
              { id: 'sports', title: { en: 'Sports Fest', bn: 'ক্রীড়া উৎসব' } },
              { id: 'national', title: { en: 'National Assemblies', bn: 'জাতীয় উৎসব' } },
              { id: 'cultural', title: { en: 'Stage & Cultural', bn: 'সাংস্কৃতিক মঞ্চ' } }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setGalleryCategory(cat.id as any)}
                className={`px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-md transition-all cursor-pointer border ${
                  galleryCategory === cat.id 
                    ? 'bg-[#0B8F3A] text-white border-transparent shadow-sm' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                {cat.title[currentLang]}
              </button>
            ))}
          </div>

          {/* Photo Grid catalog */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="gallery_grid">
            {filteredGallery.map((photo, i) => (
              <div 
                key={i} 
                className="bg-white border border-slate-200 rounded-lg overflow-hidden group shadow-sm transition-all hover:border-[#0B8F3A]"
              >
                <div className="relative h-44 bg-slate-100 overflow-hidden flex items-center justify-center">
                  <img 
                    src={photo.img} 
                    alt={photo.title[currentLang]} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
                    <span className="text-white text-[10px] font-black uppercase text-amber-300 bg-slate-900/40 p-1.5 rounded">{photo.cat} album</span>
                  </div>
                </div>
                <div className="p-3">
                  <h5 className="font-extrabold text-slate-800 text-xs tracking-tight leading-snug line-clamp-2">
                    {photo.title[currentLang]}
                  </h5>
                </div>
              </div>
            ))}
          </div>

          {/* Video Gallery: YouTube Integration styled simulation frame */}
          <div className="border-t border-slate-200 pt-6">
            <h4 className="text-xs font-black text-[#003366] uppercase mb-4 tracking-wider flex items-center gap-1.5">
              <Video className="text-red-600" size={16} />
              <span>{currentLang === 'en' ? "Collegiate YouTube Broadcaster stream" : "অফিসিয়াল ইউটিউব সংবাদচিত্র গ্যালারি"}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="bg-[#1e293b] rounded-lg aspect-video overflow-hidden border border-slate-700 relative flex items-center justify-center group shadow-md" id="yt_frame_simulate_1">
                <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400')" }} />
                <div className="relative z-10 text-center p-4">
                  <span className="w-14 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center mx-auto mb-2 text-lg font-black group-hover:bg-red-700 transition-colors shadow">
                    ▶
                  </span>
                  <p className="text-white text-xs font-bold">{currentLang === 'en' ? "Annual Academic Prize Giving Ceremony - 2026" : "বার্ষিক পুরষ্কার বিতরণ অনুষ্ঠান - ২০২৬"}</p>
                  <p className="text-slate-400 text-[10px] mt-1">Duration: 4:18 | YouTube Integration Ready</p>
                </div>
              </div>

              <div className="bg-[#1e293b] rounded-lg aspect-video overflow-hidden border border-slate-700 relative flex items-center justify-center group shadow-md" id="yt_frame_simulate_2">
                <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400')" }} />
                <div className="relative z-10 text-center p-4">
                  <span className="w-14 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center mx-auto mb-2 text-lg font-black group-hover:bg-red-700 transition-colors shadow">
                    ▶
                  </span>
                  <p className="text-white text-xs font-bold">{currentLang === 'en' ? "Institutional Documentary: Journey Since 1835" : "ঢাকা কলেজিয়েটের ১৮৩৫ সাল থেকে ঐতিহাসিক পরিক্রমা"}</p>
                  <p className="text-slate-400 text-[10px] mt-1">Duration: 12:45 | YouTube Integration Ready</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* VIEW SECTION 3: CONTACT FORM, DETAIL INFO & ADDRESS MAP MOCK */}
      {activeSubView === 'contact' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="contact_and_registration_desk">
          
          {/* Left Column: Coordinates details & feedback form */}
          <div className="flex flex-col gap-4">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <h4 className="text-xs font-black text-[#003366] uppercase mb-3 flex items-center gap-1">
                <MapPin size={15} />
                <span>{currentLang === 'en' ? 'Institutional Coordinates' : 'যোগাযোগ ও ডাক ঠিকানা'}</span>
              </h4>
              <div className="text-xs text-slate-700 flex flex-col gap-2 font-medium">
                <p><strong>{currentLang === 'en' ? "Permanent Address" : "ডাক ঠিকানা"}:</strong> Sadarghat, Kotwali, Dhaka-1100, Bangladesh</p>
                <p><strong>{currentLang === 'en' ? "Phone Office" : "টেলিফোন দফতর"}:</strong> +880 2-9563212, +880 1711-234567</p>
                <p><strong>{currentLang === 'en' ? "Email Counsel" : "সরাসরি ইমেইল"}:</strong> info@dhakacollegiate.edu.bd</p>
              </div>

              {/* Dynamic bKash instant WhatsApp Link */}
              <div className="border-t border-slate-200 mt-4 pt-3 text-center">
                <a
                  href="https://wa.me/8801711234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow inline-block"
                >
                  <MessageSquare size={14} />
                  <span>{currentLang === 'en' ? "Coordinate on WhatsApp" : "হোয়াটসঅ্যাপ চ্যাট লিংক"}</span>
                </a>
              </div>
            </div>

            {/* FEEDBACK FORM */}
            <form onSubmit={handleContactSubmit} className="border border-slate-200 p-4 rounded-xl flex flex-col gap-3">
              <h4 className="text-xs font-black text-[#003366] uppercase border-b border-gray-150 pb-1.5">
                {currentLang === 'en' ? 'Direct Inquiry Desk Form' : 'অভিভাবক অনুসন্ধান ও মতামত ফর্ম'}
              </h4>

              {cSuccess && (
                <div className="bg-green-50 text-green-800 text-xs p-2.5 rounded-lg border border-green-200 flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="shrink-0 text-green-700" />
                  <span>{currentLang === 'en' ? 'Inquiry registered. We will reply shortly!' : 'আপনার বার্তাটি সফলভাবে নিবন্ধিত হয়েছে!'}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">{currentLang === 'en' ? 'Your Name' : 'আপনার নাম'}</label>
                <input
                  type="text"
                  required
                  value={cName}
                  onChange={(e) => setCName(e.target.value)}
                  placeholder="e.g. Kabir Ahmed"
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">{currentLang === 'en' ? 'E-mail / Contact' : 'ইমেইল অথবা মোবাইল'}</label>
                <input
                  type="text"
                  required
                  value={cEmail}
                  onChange={(e) => setCEmail(e.target.value)}
                  placeholder="e.g. kabir@mail.com"
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">{currentLang === 'en' ? 'Your message details' : 'মতামতের বিস্তারিত বিবরণ'}</label>
                <textarea
                  rows={2}
                  required
                  value={cMsg}
                  onChange={(e) => setCMsg(e.target.value)}
                  placeholder="Describe your inquiry..."
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#0B8F3A] hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send size={13} />
                <span>{currentLang === 'en' ? "Send Message Letter" : "বার্তা পাঠান"}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Google map coordinates mock display */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm aspect-square max-h-[380px] lg:max-h-full flex flex-col justify-between" id="maps_canvas_mock">
            <div className="bg-slate-100 p-3 border-b border-gray-200 flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <Compass size={14} className="text-[#0B8F3A]" />
                <span>{currentLang === 'en' ? "Geographic Navigation Map" : "অবস্থান মানচিত্র"}</span>
              </span>
              <span className="text-[10px] text-gray-500 font-mono">SADARGHAT_DHAKA</span>
            </div>
            
            {/* Map Frame Container drawing actual google standard view */}
            <div className="grow bg-slate-200 relative flex items-center justify-center overflow-hidden">
              {/* If we can embed a real OpenStreetMap or an elegant CSS blueprint representation for Sadarghat school */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.883713098357!2d90.41031381!3d23.71583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9220fc58fb7%3A0xe6bf4dc1bc079eff!2sDhaka%20Collegiate%20School!5e0!3m2!1sen!2sbd!4v1717827791823" 
                className="w-full h-full border-0" 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
