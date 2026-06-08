/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, TrendingUp, Award, Percent, BookOpen, AlertCircle, FileSpreadsheet, 
  ChevronRight, CalendarRange, Share2, Layers
} from 'lucide-react';
import { StudentStats } from '../types';

interface StatisticsDashboardProps {
  stats: StudentStats;
  currentLang: 'en' | 'bn';
}

export default function StatisticsDashboard({
  stats,
  currentLang
}: StatisticsDashboardProps) {
  const [activeChartTab, setActiveChartTab] = useState<'class' | 'excel' | 'trends'>('class');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Simple automated English-Bangla numeric translation helper
  const translateNum = (num: number | string) => {
    if (currentLang === 'en') return String(num);
    const bnNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).replace(/[0-9]/g, (match) => bnNums[parseInt(match, 10)]);
  };

  // Safe gender splits check - collegiate may contain both/only boys/etc.
  const totalEnrolled = stats.totalBoys + stats.totalGirls;
  const boysPercent = totalEnrolled > 0 ? (stats.totalBoys / totalEnrolled) * 100 : 50;
  const girlsPercent = totalEnrolled > 0 ? (stats.totalGirls / totalEnrolled) * 100 : 50;

  // Render SVG Line Chart calculations for GPA Stats
  // We have stats.gpaStats (years like 2021-2025, gpa5Count and passRate)
  const maxGpaCount = Math.max(...stats.gpaStats.map(g => g.gpa5Count));
  const heightMultiplier = maxGpaCount > 0 ? 100 / maxGpaCount : 0.4;

  const handleExportEMISBytes = () => {
    // Generate simple EMIS text report download
    const reportText = `
GOVERNMENT OF THE PEOPLE'S REPUBLIC OF BANGLADESH
DIRECTORATE OF SECONDARY AND HIGHER EDUCATION LOGS
---------------------------------------------------
EIIN REGISTRY VERIFICATION PACKET

Institution: Dhaka Collegiate School
Total Enrolled Registry: ${stats.totalStudents}
Registered Male: ${stats.totalBoys}
Registered Female: ${stats.totalGirls}
Official Pass Ratio: ${stats.passRate}%

CLASS DEMOGRAPHICS PACKET:
${stats.classStats.map(s => `- ${s.className}: ${s.total} Enrolled | Sections: ${s.sections}`).join('\n')}

GPA HISTORICAL LOGS:
${stats.gpaStats.map(y => `- ${y.year}: GPA 5 total count: ${y.gpa5Count} | Success Ratio: ${y.passRate}%`).join('\n')}

This report serves the purpose of EMIS compilation metrics. Approved on ${new Date().toISOString().split('T')[0]}.
    `;
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emis_report_audit_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-4 sm:p-6 font-sans flex flex-col gap-6" id="stats_dashboard_section">
      
      {/* 1. Header with direct action buttons */}
      <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#003366] tracking-tight flex items-center gap-2">
            <Users className="text-[#0B8F3A]" size={24} />
            <span>{currentLang === 'en' ? "Student & Academic Statistics" : "শিক্ষার্থী ও ফলাফল তথ্যভাণ্ডার"}</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {currentLang === 'en' 
              ? "Official EMIS/IMS integrated live census statistics and academic results summaries." 
              : "রিয়েল-টাইম শিক্ষা বোর্ড ও সরকারের ইএমআইএস ড্যাশবোর্ড।"
            }
          </p>
        </div>

        <button
          onClick={handleExportEMISBytes}
          className="bg-green-700 hover:bg-green-800 text-white text-xs font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm border border-transparent active:scale-95 shrink-0"
        >
          <FileSpreadsheet size={15} />
          <span>{currentLang === 'en' ? "Export EMIS Package" : "EMIS রিপোর্ট ডাউনলোড"}</span>
        </button>
      </div>

      {/* 2. Standard Metric Summary Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="stats_cards_grid">
        
        {/* Total Students Card */}
        <div className="bg-[#f0fff4]/60 border border-green-200 rounded-lg p-4 flex gap-4 items-center">
          <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl h shadow-inner shrink-0">
            <Users size={22} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold tracking-tight">
              {currentLang === 'en' ? "Total Enrolled" : "মোট শিক্ষার্থী সংখ্যা"}
            </p>
            <h3 className="text-2xl font-extrabold text-[#003366] mt-0.5 tracking-tight">
              {translateNum(stats.totalStudents)}
            </h3>
            <span className="text-[10px] text-green-700 font-semibold bg-green-100 px-1.5 py-0.5 rounded">
              {currentLang === 'en' ? "MPO Compliant Registered" : "এমপিও নথি ভুক্তকরণ"}
            </span>
          </div>
        </div>

        {/* Male Composition Card */}
        <div className="bg-[#f0f9ff] border border-blue-200 rounded-lg p-4 flex gap-4 items-center">
          <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-inner shrink-0">
            M
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold tracking-tight">
              {currentLang === 'en' ? "Registered Boys" : "মোট ছাত্র সংখ্যা"}
            </p>
            <h3 className="text-2xl font-extrabold text-[#003366] mt-0.5 tracking-tight">
              {translateNum(stats.totalBoys)}
            </h3>
            <span className="text-[10px] text-blue-700 font-semibold bg-blue-100 px-1.5 py-0.5 rounded">
              {currentLang === 'en' ? "Traditional Core" : "প্রধান কারিকুলাম"}
            </span>
          </div>
        </div>

        {/* Female/Alternate Composition Card */}
        <div className="bg-[#fdf2f8] border border-pink-200 rounded-lg p-4 flex gap-4 items-center">
          <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-inner shrink-0">
            F
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold tracking-tight">
              {currentLang === 'en' ? "Registered Girls" : "মোট ছাত্রী সংখ্যা"}
            </p>
            <h3 className="text-2xl font-extrabold text-[#003366] mt-0.5 tracking-tight">
              {translateNum(stats.totalGirls)}
            </h3>
            <span className="text-[10px] text-pink-700 font-semibold bg-pink-100 px-1.5 py-0.5 rounded">
              {currentLang === 'en' ? "Academic Balance" : "সমতা কারিকুলাম"}
            </span>
          </div>
        </div>

        {/* Overall Board Pass rates */}
        <div className="bg-[#fffbeb] border border-amber-200 rounded-lg p-4 flex gap-4 items-center">
          <div className="w-12 h-12 bg-amber-500 text-[#003366] rounded-full flex items-center justify-center font-bold text-xl shadow-inner shrink-0">
            <Percent size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold tracking-tight">
              {currentLang === 'en' ? "Official Pass Rate" : "মোট পাশের হার"}
            </p>
            <h3 className="text-2xl font-extrabold text-[#003366] mt-0.5 tracking-tight">
              {translateNum(stats.passRate)}%
            </h3>
            <span className="text-[10px] text-amber-700 font-semibold bg-amber-100 px-1.5 py-0.5 rounded">
              {currentLang === 'en' ? "Top District Grade" : "জেলা পর্যায়ের সেরা"}
            </span>
          </div>
        </div>

      </div>

      {/* 3. Interactive Graphical Dashboard tabs */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col gap-5">
        <div className="flex border-b border-gray-200 justify-between items-center pb-2.5 flex-wrap gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveChartTab('class')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                activeChartTab === 'class' ? 'bg-[#0B8F3A] text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              📊 {currentLang === 'en' ? "Class Statistics Bar" : "শ্রেণী বিবরণী বার"}
            </button>
            <button
              onClick={() => setActiveChartTab('trends')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                activeChartTab === 'trends' ? 'bg-[#0B8F3A] text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              📈 {currentLang === 'en' ? "GPA-5 Line Analytics" : "জিপিএ-৫ বৃদ্ধির লাইন"}
            </button>
            <button
              onClick={() => setActiveChartTab('excel')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                activeChartTab === 'excel' ? 'bg-[#0B8F3A] text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              📝 {currentLang === 'en' ? "Demographics Ledger" : "জনসংখ্যা বিবরণী খাতা"}
            </button>
          </div>
          <span className="text-[10px] text-gray-500 italic bg-green-50 border border-green-200 px-2 py-0.5 rounded">
            {currentLang === 'en' ? "Data Verified by EMIS Portal" : "শিক্ষা অধিদপ্তরের এমআইএস এ প্রত্যয়িত"}
          </span>
        </div>

        {/* Tab 1: Class stats Bar representation */}
        {activeChartTab === 'class' && (
          <div className="flex flex-col md:flex-row gap-6 items-center">
            
            {/* Visual Custom Bar Chart (SVG) */}
            <div className="w-full md:w-2/3 flex flex-col">
              <h4 className="text-xs font-bold text-[#003366] uppercase mb-4 tracking-wider text-center md:text-left">
                {currentLang === 'en' ? "Grade-Level Enrollment Composition" : "শ্রেণী ভিত্তিক ছাত্র বিভাজন গ্রাফসমূহ"}
              </h4>
              
              {/* Responsive SVG canvas for Bar plot */}
              <div className="relative h-48 w-full border-b border-l border-slate-300 pb-2 px-1 flex items-end justify-around bg-white p-3 rounded-md shadow-inner">
                {stats.classStats.map((cs, index) => {
                  // Compute ratio height
                  const barHeight = Math.min((cs.total / 350) * 100, 100);
                  const isHovered = hoveredBar === index;
                  return (
                    <div 
                      key={cs.className} 
                      className="flex flex-col items-center group relative w-12"
                      onMouseEnter={() => setHoveredBar(index)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {/* Interactive pop info */}
                      {isHovered && (
                        <div className="absolute bottom-full mb-1 bg-[#003366] text-white p-2 rounded text-[10px] whitespace-nowrap z-30 shadow-md border border-amber-400 font-mono">
                          <p className="font-bold">{cs.className}</p>
                          <p>{currentLang === 'en' ? 'Enrolled' : 'মোট'}: {cs.total}</p>
                          <p>{currentLang === 'en' ? 'Sections' : 'শাখা'}: {cs.sections}</p>
                        </div>
                      )}
                      
                      {/* Bar indicator block */}
                      <div 
                        className="w-8 bg-gradient-to-t from-green-700 to-[#0B8F3A] group-hover:from-cyan-700 group-hover:to-cyan-500 rounded-t-md transition-all cursor-pointer relative"
                        style={{ height: `${Math.max(barHeight, 5)}%` }}
                      >
                        <span className="absolute top-1 left-0 right-0 text-[9px] text-white font-bold text-center">
                          {translateNum(cs.total)}
                        </span>
                      </div>
                      
                      <span className="text-[10px] text-gray-600 font-bold mt-1 max-w-[44px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {cs.className}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-1 text-[9px] text-slate-400 font-mono italic px-3">
                <span>0</span>
                <span>100</span>
                <span>200</span>
                <span>300 (Max Capacity)</span>
              </div>
            </div>

            {/* Visual Side Donut Gender Split representation */}
            <div className="w-full md:w-1/3 flex flex-col items-center bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-700 uppercase mb-3 text-center">
                {currentLang === 'en' ? "Gender Disparity Index" : "লিঙ্গ অনুপাত ডায়াগ্রাম"}
              </h4>
              <div className="relative w-28 h-28 flex items-center justify-center">
                
                {/* Visual custom concentric pie rings (simplified with circle border tricks or plain SVG) */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Outer circle representing Boys */}
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="15.915" 
                    fill="transparent" 
                    stroke="#dbf0fe" 
                    strokeWidth="3.2" 
                  />
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="15.915" 
                    fill="transparent" 
                    stroke="#2563eb" 
                    strokeWidth="3.2" 
                    strokeDasharray={`${boysPercent} ${100 - boysPercent}`}
                    strokeDashoffset="0"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-sm font-black text-slate-800">
                    {translateNum(Math.round(boysPercent))}%
                  </span>
                  <span className="text-[8px] uppercase tracking-wider font-bold text-blue-600">
                    {currentLang === 'en' ? 'Male ratio' : 'ছাত্র অনুপাত'}
                  </span>
                </div>
              </div>

              {/* Composition labels block */}
              <div className="w-full mt-4 flex justify-between px-2 text-[11px] font-medium border-t border-gray-100 pt-2 text-slate-600">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full inline-block"></span>
                  <span>{currentLang === 'en' ? 'Boys' : 'ছাত্র'}: {translateNum(stats.totalBoys)}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-pink-400 rounded-full inline-block"></span>
                  <span>{currentLang === 'en' ? 'Girls' : 'ছাত্রী'}: {translateNum(stats.totalGirls)}</span>
                </span>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: GPA lines interactive plot */}
        {activeChartTab === 'trends' && (
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-[#003366] uppercase mb-4 tracking-wider">
              🏆 {currentLang === 'en' ? "Secondary SSC Examination GPA 5 Excellence (2021-2025)" : "এসএসসি জিপিএ-৫ ঐতিহাসিক ধারা"}
            </h4>

            {/* Custom interactive lines block using basic high fidelity flex-graph */}
            <div className="flex gap-4 items-end justify-between h-40 border-b border-slate-200 pb-2 px-4 shadow-inner pt-4 rounded-lg bg-slate-50/50">
              {stats.gpaStats.map((item, index) => {
                const stepHeight = item.gpa5Count * heightMultiplier;
                return (
                  <div key={item.year} className="flex flex-col items-center group relative cursor-pointer flex-1">
                    
                    {/* Tooltip detail hover box */}
                    <div className="absolute bottom-full mb-1 bg-[#003366] text-white px-2 py-1.5 rounded text-[10px] opacity-0 group-hover:opacity-100 z-30 transition-all font-mono pointer-events-none text-center shadow-lg border border-amber-300">
                      <p className="font-bold text-amber-300">{item.year} Batch</p>
                      <p>{currentLang === 'en' ? 'GPA-5' : 'জিপিএ-৫'}: {item.gpa5Count} Students</p>
                      <p>{currentLang === 'en' ? 'Pass Ratio' : 'পাশের হার'}: {item.passRate}%</p>
                    </div>

                    {/* Node marker point */}
                    <div className="w-3 h-3 bg-red-600 border-2 border-white rounded-full group-hover:bg-green-600 relative z-10 shadow mb-1 shadow-sm transform group-hover:scale-125 transition-transform" />
                    
                    {/* Column bar shadow simulation */}
                    <div 
                      className="w-3.5 bg-gradient-to-t from-orange-400/20 to-orange-500 rounded-t-md opacity-30 hover:opacity-80 transition-all"
                      style={{ height: `${Math.max(stepHeight, 5)}px` }}
                    />

                    <span className="text-[10px] font-black text-slate-700 mt-2">
                      {translateNum(item.year)}
                    </span>
                    <span className="text-[9px] text-[#0B8F3A] font-bold">
                      🏆 {translateNum(item.gpa5Count)}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <p className="text-[11px] text-gray-500 leading-relaxed text-justify mt-3">
              💡 {currentLang === 'en' 
                ? "The board statistics reflect total academic brilliance records validated under Dhaka intermediate Board files. Annual improvements coincide with modernized smart campus lab developments." 
                : "জিপিএ-৫ এর বার্ষিক ক্রমাগত বৃদ্ধি প্রতিষ্ঠানের সার্বিক সুষ্ঠু শিক্ষার পরিবেশ ও উন্নত আইসিটি ব্যবস্থার প্রমাণ স্বরূপ।"
              }
            </p>
          </div>
        )}

        {/* Tab 3: Detailed Ledger Grid statistical exports */}
        {activeChartTab === 'excel' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 uppercase font-bold text-[10px] tracking-wider">
                  <th className="p-3">{currentLang === 'en' ? 'Class Name' : 'শ্রেণীর নাম'}</th>
                  <th className="p-3 text-center">{currentLang === 'en' ? 'Section Counts' : 'মোট শাখা'}</th>
                  <th className="p-3 text-center">{currentLang === 'en' ? 'Boys' : 'ছাত্র'}</th>
                  <th className="p-3 text-center">{currentLang === 'en' ? 'Girls' : 'ছাত্রী'}</th>
                  <th className="p-3 text-center">{currentLang === 'en' ? 'Total Strength' : 'মোট শিক্ষার্থী'}</th>
                </tr>
              </thead>
              <tbody>
                {stats.classStats.map((item) => (
                  <tr key={item.className} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors text-slate-800">
                    <td className="p-3 font-semibold">{item.className}</td>
                    <td className="p-3 text-center font-mono font-bold text-gray-600">{translateNum(item.sections)}</td>
                    <td className="p-3 text-center font-mono">{translateNum(item.boys)}</td>
                    <td className="p-3 text-center font-mono">{translateNum(item.girls)}</td>
                    <td className="p-3 text-center font-mono font-bold text-green-700 bg-emerald-50/20">{translateNum(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* 4. Secondary MPO verification logs banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3.5 flex gap-3 text-xs text-blue-950 items-start">
        <AlertCircle size={16} className="text-blue-700 shrink-0 mt-0.5" />
        <div className="text-justify leading-relaxed">
          <p className="font-bold">
            {currentLang === 'en' ? "Compliance and EMIS Data Structures Note" : "এমপিও ও এমআইএস অনুবর্তীতা বিবরণী"}
          </p>
          <p className="text-[11px] text-blue-900 mt-1">
            {currentLang === 'en' 
              ? "This census is directly compatible with the Ministry's Education Management Information System indices. Any changes applied in the Administrator Panel will reflect within temporary cache buffers instantly."
              : "এই বিবরণীর সকল ডাটা-পয়েন্টসমূহ বাংলাদেশ শিক্ষা অধিদপ্তরের ইএমআইএস সার্ভারের ডাটা ফরম্যাটের সাথে সম্পূর্ণ সামঞ্জস্যপূর্ণ।"
            }
          </p>
        </div>
      </div>

    </div>
  );
}
