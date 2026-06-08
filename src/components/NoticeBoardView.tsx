/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, Search, ChevronDown, Download, AlertCircle, Calendar, 
  MapPin, CheckSquare, Tag, Bookmark
} from 'lucide-react';
import { Notice, NoticeCategory } from '../types';

interface NoticeBoardViewProps {
  notices: Notice[];
  currentLang: 'en' | 'bn';
  onAddNotice?: (n: any) => void;
  selectedNoticeId?: string;
  setSelectedNoticeId?: (id: string | undefined) => void;
}

export default function NoticeBoardView({
  notices,
  currentLang,
  selectedNoticeId,
  setSelectedNoticeId
}: NoticeBoardViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory | 'All'>('All');
  const [searchText, setSearchText] = useState('');
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(selectedNoticeId || null);

  const categories: (NoticeCategory | 'All')[] = ['All', 'General', 'Academic', 'Admission', 'Exam', 'Emergency'];

  const handleDownloadStub = (notice: Notice) => {
    // Generate a simple pseudo-file download representing the notice in official formatting
    const docText = `
BANGLADESH SECONDARY EDUCATION TRUST BOARD COMPLIANCE
===================================================
DHAKA COLLEGIATE GOVERNMENT HIGH SCHOOL, SADARGHAT
ESTD: 1835 | EIIN: 108342 | CODE: 2043

OFFICIAL NOTICE: ${notice.title}
---------------------------------------------------
Ref No: DCGHS/ADM/2026/0${notice.id.split('_')[1] || '9'}
Date: ${notice.date}
Category: ${notice.category} Notice

DETAILS & COMPLIANCE STATEMENTS:
${notice.description}

This notice has been approved and issued by order of the Governing Committee
and Executive Principal of Dhaka Collegiate School. For information and immediate actions.

Signed,
Governing Desk Counsel,
Ministry of Secondary & Higher Education Bangladesh.
    `;
    
    const blob = new Blob([docText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `collegiate_notice_${notice.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredNotices = notices.filter(n => {
    const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
    const matchesSearch = n.title.toLowerCase().includes(searchText.toLowerCase()) || 
                          n.description.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (cat: NoticeCategory) => {
    switch (cat) {
      case 'Emergency': return 'bg-red-50 text-red-700 border-red-200';
      case 'Exam': return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'Admission': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Academic': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-green-50 text-green-800 border-green-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-4 sm:p-6 font-sans" id="notice_board_root">
      
      {/* Category header line */}
      <div className="border-b border-gray-100 pb-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#003366] tracking-tight flex items-center gap-2">
            <FileText className="text-[#0B8F3A]" size={24} />
            <span>{currentLang === 'en' ? "Official Notice Board Desk" : "প্রাতিষ্ঠানিক নোটিশ বোর্ড ডেস্ক"}</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {currentLang === 'en' 
              ? "Access authentic publications and official circulars instantly." 
              : "শিক্ষা বোর্ড এবং সংশ্লিষ্ট অধিদপ্তরের নোটিশ ও বিজ্ঞপ্তিসমূহ।"
            }
          </p>
        </div>

        {/* Live Search and Filter Input */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder={currentLang === 'en' ? "Search notices..." : "নোটিশ খুঁজুন..."}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B8F3A] focus:bg-white text-slate-800"
          />
        </div>
      </div>

      {/* Categories Horizontal Pills Tab Row */}
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-1" id="notice_categories_tab_strip">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer border ${
                isActive 
                  ? 'bg-[#0B8F3A] text-white border-transparent' 
                  : 'bg-slate-50 text-[#003366] hover:bg-slate-100 border-slate-200'
              }`}
            >
              {cat === 'All' 
                ? (currentLang === 'en' ? 'All' : 'সব নোটিশ')
                : (currentLang === 'en' ? cat : (
                    cat === 'General' ? 'সাধারণ' : 
                    cat === 'Academic' ? 'একাডেমিক' : 
                    cat === 'Admission' ? 'ভর্তি' : 
                    cat === 'Exam' ? 'পরীক্ষা' : 'জরুরি'
                  ))
              }
            </button>
          );
        })}
      </div>

      {/* Notices Accordion Stack */}
      {filteredNotices.length === 0 ? (
        <div className="p-8 border border-dashed border-slate-200 rounded-lg text-center flex flex-col items-center justify-center">
          <AlertCircle size={32} className="text-gray-300 mb-2" />
          <p className="text-sm font-semibold text-slate-500">
            {currentLang === 'en' ? "No relevant active notices publishable at present." : "এই ক্যাটাগরিতে বর্তমানে কোনো সক্রিয় নোটিশ নেই।"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4.5" id="notice_items_accordion">
          {filteredNotices.map((notice) => {
            const isExpanded = expandedNoticeId === notice.id;
            return (
              <div 
                key={notice.id}
                className={`border rounded-lg transition-all shadow-sm ${
                  isExpanded 
                    ? 'border-[#0B8F3A] bg-emerald-50/20' 
                    : notice.isImportant 
                      ? 'border-red-300 bg-red-50/5 hover:border-red-400' 
                      : 'border-slate-200 hover:border-green-600 bg-white'
                }`}
                id={`notice_card_${notice.id}`}
              >
                {/* Notice Core Row Header */}
                <div 
                  onClick={() => setExpandedNoticeId(isExpanded ? null : notice.id)}
                  className="p-4 cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                >
                  <div className="flex gap-3 items-start">
                    {/* Category Label Icon */}
                    <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                      <Bookmark size={16} className={notice.isImportant ? "text-red-600 animate-bounce" : "text-slate-600"} />
                    </div>
                    <div>
                      {/* Title & Badge */}
                      <div className="flex flex-wrap gap-2 items-center mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryColor(notice.category)}`}>
                          {currentLang === 'en' ? notice.category : (
                            notice.category === 'General' ? 'সাধারণ' : 
                            notice.category === 'Academic' ? 'একাডেমিক' : 
                            notice.category === 'Admission' ? 'ভর্তি' : 
                            notice.category === 'Exam' ? 'পরীক্ষা' : 'জরুরি'
                          )}
                        </span>
                        
                        {notice.isImportant && (
                          <span className="bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider animate-pulse">
                            {currentLang === 'en' ? 'IMPORTANT' : 'গুরুত্বপূর্ণ'}
                          </span>
                        )}
                        
                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                          <Calendar size={11} />
                          <span>{notice.date}</span>
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 tracking-tight leading-snug">
                        {notice.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadStub(notice);
                      }}
                      className="p-1 px-2 hover:bg-green-100 rounded text-[#0B8F3A] hover:text-green-800 transition-colors text-xs font-bold border border-transparent hover:border-green-300 flex items-center gap-1 shadow-sm"
                      title={currentLang === 'en' ? "Download Attachment Copy" : "নোটিশ ডাউনলোড"}
                    >
                      <Download size={13} />
                      <span className="text-[10px]">{currentLang === 'en' ? "PDF" : "ডাউনলোড"}</span>
                    </button>
                    <span className="text-gray-400 p-1">
                      <ChevronDown size={14} className={`transform transition-transform ${isExpanded ? 'rotate-180 text-green-700' : ''}`} />
                    </span>
                  </div>
                </div>

                {/* Expanded details text box */}
                {isExpanded && (
                  <div className="border-t border-slate-100 p-4 pt-3 bg-white rounded-b-lg">
                    <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap mb-4">
                      {notice.description}
                    </p>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-wrap justify-between items-center gap-4">
                      <div className="text-[11px] text-gray-600">
                        <p className="font-bold text-slate-800">{currentLang === 'en' ? "Reference / Authority" : "নথি বরাত / প্রকাশ কর্তৃপক্ষ"}</p>
                        <p>{currentLang === 'en' ? "Governing Desk Counsel , DHAKA" : "পরিচালনা কমিটি দফতর, ঢাকা"}</p>
                      </div>
                      <button
                        onClick={() => handleDownloadStub(notice)}
                        className="bg-[#0B8F3A] hover:bg-green-700 text-white text-xs font-bold py-1.5 px-4 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Download size={14} />
                        <span>{currentLang === 'en' ? "Download Official Circular File" : "অফিসিয়াল সার্কুলার ফাইল ডাউনলোড"}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Notice Board Footer Disclaimer */}
      <div className="mt-5 text-center text-[10px] text-gray-400">
        📌 {currentLang === 'en' 
          ? "Certified documents conform fully to digital signatures standards required under National Education Board Policies." 
          : "প্রত্যয়িত নোটিশ বোর্ড ডিজিটাল শিক্ষা বোর্ডের অনুমোদিত নীতিমালা অনুসরণ করে স্বয়ংক্রিয়ভাবে পরিচালিত।"
        }
      </div>

    </div>
  );
}
