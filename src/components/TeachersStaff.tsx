/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, Mail, Phone, Calendar, Award, Star, Search, Briefcase, ChevronRight, GraduationCap 
} from 'lucide-react';
import { Teacher, Staff } from '../types';

interface TeachersStaffProps {
  teachers: Teacher[];
  staff: Staff[];
  currentLang: 'en' | 'bn';
}

export default function TeachersStaff({
  teachers,
  staff,
  currentLang
}: TeachersStaffProps) {
  const [activeGroup, setActiveGroup] = useState<'teachers' | 'staff'>('teachers');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTeacherId, setExpandedTeacherId] = useState<string | null>(null);

  const translateNum = (num: string | number) => {
    if (currentLang === 'en') return String(num);
    const bnNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).replace(/[0-9]/g, (match) => bnNums[parseInt(match, 10)]);
  };

  const filteredTeachers = teachers.filter(t => {
    return t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
           t.designation.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredStaff = staff.filter(s => {
    return s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           s.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
           s.department.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-4 sm:p-6 font-sans flex flex-col gap-6" id="faculty_staff_section">
      
      {/* Search and toggle block */}
      <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#003366] tracking-tight flex items-center gap-2">
            <Users className="text-[#0B8F3A]" size={24} />
            <span>{currentLang === 'en' ? "Faculty & Institutional Representatives" : "শিক্ষক ও কর্মকর্তা বিবরণী"}</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {currentLang === 'en' 
              ? "Official district MPO compliant verified personnel directories." 
              : "ঢাকা ডিস্ট্রিক্ট এমপিও ভুক্ত শিক্ষক ও কর্মকর্তাদের বিস্তারিত প্রোফাইল।"
            }
          </p>
        </div>

        {/* Group Filter Toggles */}
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0 self-end sm:self-center">
          <button
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              activeGroup === 'teachers' ? 'bg-[#0B8F3A] text-white shadow' : 'text-slate-650 hover:text-slate-800 text-slate-700'
            }`}
            onClick={() => {
              setActiveGroup('teachers');
              setSearchQuery('');
            }}
          >
            {currentLang === 'en' ? "Honorary Teachers" : "শিক্ষক মণ্ডলী"}
          </button>
          <button
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              activeGroup === 'staff' ? 'bg-[#0B8F3A] text-white shadow' : 'text-slate-650 hover:text-slate-800 text-slate-700'
            }`}
            onClick={() => {
              setActiveGroup('staff');
              setSearchQuery('');
            }}
          >
            {currentLang === 'en' ? "Office Staffs" : "কর্মচারীবৃন্দ"}
          </button>
        </div>
      </div>

      {/* Live Filtering Search Input Box */}
      <div className="relative max-w-md w-full self-start">
        <Search size={16} className="absolute left-3.5 top-3.5 text-gray-450 text-slate-400" />
        <input
          type="text"
          placeholder={
            activeGroup === 'teachers' 
              ? (currentLang === 'en' ? "Search teacher by name, subject, designation..." : "শিক্ষকের নাম, বিষয় বা পদবী দিয়ে খুঁজুন...")
              : (currentLang === 'en' ? "Search staff by catalog..." : "কর্মচারীর খোঁজ করুন...")
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B8F3A] focus:bg-white text-slate-800"
        />
      </div>

      {/* RENDER GROUP 1: TEACHERS COMPOSITION */}
      {activeGroup === 'teachers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="teachers_cards_grid">
          {filteredTeachers.length === 0 ? (
            <div className="col-span-2 text-center p-8 text-xs text-gray-400 italic border border-dashed border-slate-200 rounded-lg">
              {currentLang === 'en' ? "No teachers matching your filter." : "এই বিষয়ের কোনো শিক্ষক খুঁজে পাওয়া যায়নি।"}
            </div>
          ) : (
            filteredTeachers.map((t) => {
              const isOpen = expandedTeacherId === t.id;
              return (
                <div 
                  key={t.id}
                  className={`bg-white border rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between ${
                    isOpen ? 'border-[#0B8F3A] bg-emerald-50/5' : 'border-slate-200'
                  }`}
                  id={`teacher_profile_card_${t.id}`}
                >
                  <div className="p-4 flex gap-4 items-start">
                    
                    {/* Floating Avatar */}
                    <div className="relative w-20 h-24 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
                      <img 
                        src={t.photoUrl} 
                        alt={t.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-extrabold text-slate-800 text-sm truncate">{t.name}</h4>
                      <p className="text-[#0B8F3A] text-xs font-bold leading-snug mt-0.5">{t.designation}</p>
                      
                      {/* Technical specifications pills */}
                      <span className="bg-[#003366] text-white text-[9px] font-bold px-2 py-0.5 rounded inline-block mt-2.5">
                        {currentLang === 'en' ? t.subject : t.subject // simple fallback
                        }
                      </span>

                      <div className="flex flex-col gap-1 mt-3 text-[11px] text-gray-600">
                        <p className="flex items-center gap-1.5 font-mono">
                          <Phone size={11} className="text-gray-400 shrink-0" />
                          <span>{t.mobile}</span>
                        </p>
                        <p className="flex items-center gap-1.5 truncate">
                          <Mail size={11} className="text-gray-400 shrink-0" />
                          <span className="truncate text-blue-800 underline block cursor-pointer">{t.email}</span>
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Actions footer biography toggles */}
                  <div className="bg-slate-50 border-t border-slate-100 p-2 px-4 flex flex-col gap-2.5">
                    <button
                      onClick={() => setExpandedTeacherId(isOpen ? null : t.id)}
                      className="text-[10px] text-indigo-900 hover:text-green-800 font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer focus:outline-none w-full"
                    >
                      <span>{isOpen ? (currentLang === 'en' ? "Hide Biography" : "বৃত্তান্ত লুকান") : (currentLang === 'en' ? "View Profile & Academics" : "জীবন বৃত্তান্ত ও যোগ্যতা দেখুন")}</span>
                      <ChevronRight size={12} className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="text-[11px] text-gray-700 leading-relaxed border-t border-slate-200 pt-2 flex flex-col gap-2 animate-fadeIn font-sans">
                        <p>
                          <strong className="text-slate-900"><GraduationCap size={12} className="inline-block mr-1 text-[#0B8F3A]" />{currentLang === 'en' ? "Education" : "যোগ্যতা"}:</strong> {t.qualification}
                        </p>
                        <p>
                          <strong className="text-slate-900"><Award size={12} className="inline-block mr-1 text-[#0B8F3A]" />{currentLang === 'en' ? "Experience" : "অভিজ্ঞতা"}:</strong> {t.experience}
                        </p>
                        <p className="text-justify border-t border-gray-100 pt-1.5 text-gray-600 font-serif">
                          "{t.biography || "No detailed digital statement recorded."}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* RENDER GROUP 2: ADMINISTRATIVE STAFFS */}
      {activeGroup === 'staff' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="staffs_cards_grid">
          {filteredStaff.length === 0 ? (
            <div className="col-span-3 text-center p-8 text-xs text-gray-400 italic border border-dashed border-slate-200 rounded-lg">
              {currentLang === 'en' ? "No administrative logs match." : "কোনো কর্মচারীর খোঁজ মিলছে না।"}
            </div>
          ) : (
            filteredStaff.map((s) => (
              <div key={s.id} className="bg-white border border-slate-200 rounded-lg p-3 flex gap-3.5 items-center hover:shadow shadow-sm" id={`staff_profile_card_${s.id}`}>
                <div className="w-16 h-16 rounded-full bg-slate-50 border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center shadow-inner">
                  <img src={s.photoUrl || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200"} alt={s.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-slate-800 text-xs truncate">{s.name}</h4>
                  <p className="text-[10px] text-green-700 font-semibold">{s.designation}</p>
                  <p className="text-[9px] text-slate-400 mt-1 uppercase font-bold tracking-wider">{s.department}</p>
                  <a href={`tel:${s.contact}`} className="text-[9px] font-mono text-blue-700 font-bold block mt-1 hover:underline">
                    📞 {s.contact}
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}
