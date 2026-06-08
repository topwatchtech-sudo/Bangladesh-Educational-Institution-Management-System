/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CalendarRange, FileText, ClipboardList, BookOpen, Clock, Download, 
  Search, ShieldCheck, Award, GraduationCap, AlertCircle, RefreshCw
} from 'lucide-react';
import { DownloadItem } from '../types';

interface AcademicDownloadsProps {
  downloads: DownloadItem[];
  currentLang: 'en' | 'bn';
  onAddDownload?: (item: any) => void;
}

export default function AcademicDownloads({
  downloads,
  currentLang
}: AcademicDownloadsProps) {
  const [activeSubTab, setActiveSubTab] = useState<'calendar' | 'routines' | 'results' | 'downloads'>('routines');
  const [selectedRoutineClass, setSelectedRoutineClass] = useState('Class 6');

  // Online Result Checker interactive states
  const [rollNumber, setRollNumber] = useState('');
  const [examType, setExamType] = useState('Half Yearly');
  const [resultClass, setResultClass] = useState('Class 9');
  const [generatedTranscript, setGeneratedTranscript] = useState<any | null>(null);
  const [isCheckedResult, setIsCheckedResult] = useState(false);

  const translateNum = (num: number | string) => {
    if (currentLang === 'en') return String(num);
    const bnNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).replace(/[0-9]/g, (match) => bnNums[parseInt(match, 10)]);
  };

  // Mock class routines database
  const routineData: { [key: string]: any[] } = {
    'Class 6': [
      { period: '1st (09:00 - 09:45)', subject: 'General Mathematics', teacher: 'Abdul Halim', room: '102' },
      { period: '2nd (09:45 - 10:30)', subject: 'English Grammar', teacher: 'Nusrat Jahan', room: '102' },
      { period: '3rd (10:30 - 11:15)', subject: 'Digital Technology', teacher: 'Ferdousi Rahman', room: 'ICT Lab' },
      { period: '4th (11:15 - 12:00)', subject: 'Science Exploration', teacher: 'Dr. Biplob Kumar', room: 'Science Lab' },
      { period: '5th (12:00 - 12:45)', subject: 'Physical Wellness', teacher: 'Major (Retd) Rashid', room: 'Assembly Ground' },
    ],
    'Class 8': [
      { period: '1st (09:00 - 09:45)', subject: 'Science Exploration', teacher: 'Dr. Biplob Kumar', room: 'Lab A' },
      { period: '2nd (09:45 - 10:30)', subject: 'General Mathematics', teacher: 'Abdul Halim', room: '204' },
      { period: '3rd (10:30 - 11:15)', subject: 'Bangladesh & World Studies', teacher: 'Sayed Ahmed', room: '204' },
      { period: '4th (11:15 - 12:00)', subject: 'English Literature', teacher: 'Nusrat Jahan', room: '204' },
      { period: '5th (12:00 - 12:45)', subject: 'Islamic / Hindu Education', teacher: 'Mawlana Faruq / Tapash', room: '204' },
    ],
    'Class 9': [
      { period: '1st (09:00 - 09:45)', subject: 'Advanced Physics', teacher: 'Akmal Hossain', room: 'Physics Lab' },
      { period: '2nd (09:45 - 10:30)', subject: 'Core Chemistry', teacher: 'Dr. Biplob Kumar', room: 'Chemistry Lab' },
      { period: '3rd (10:30 - 11:15)', subject: 'Higher Mathematics', teacher: 'Abdul Halim', room: '302' },
      { period: '4th (11:15 - 12:00)', subject: 'Creative English Composition', teacher: 'Nusrat Jahan', room: '302' },
      { period: '5th (12:00 - 12:45)', subject: 'Digital Programming ICT', teacher: 'Ferdousi Rahman', room: 'ICT Lab' },
    ]
  };

  const getRoutine = (className: string) => {
    return routineData[className] || routineData['Class 6'];
  };

  // Mock holiday list
  const holidayCalendar = [
    { date: '2026-06-10', title: 'National Day Tribute Assembly', duration: '1 Day', type: 'Official' },
    { date: '2026-07-25', title: 'Summer Solstice Intermission Term', duration: '6 Days', type: 'Academic Break' },
    { date: '2026-08-15', title: 'National Mourning Obserance Ceremonies', duration: '1 Day', type: 'Government Circular' },
    { date: '2026-09-02', title: 'Pre-Annual Preparative Exam Study Leave', duration: '4 Days', type: 'Exam Break' },
  ];

  const monthsEn: { [key: string]: string } = {
    '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun',
    '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
  };
  const monthsBn: { [key: string]: string } = {
    '01': 'জানু', '02': 'ফেব্রু', '03': 'মার্চ', '04': 'এপ্রিল', '05': 'মে', '06': 'জুন',
    '07': 'জুলাই', '08': 'আগস্ট', '09': 'সেপ্টে', '10': 'অক্টো', '11': 'নভে', '12': 'ডিসে'
  };

  const handleResultCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNumber) return;
    
    // Create random grade sets based on roll code mapping to simulate realistic portal search
    setIsCheckedResult(true);
    const mockSeed = parseInt(rollNumber, 10) || 12;
    const isAplus = mockSeed % 3 === 0;
    const gpaCalculated = isAplus ? 5.00 : (4.25 + (mockSeed % 7) * 0.1);
    
    setGeneratedTranscript({
      studentName: mockSeed % 2 === 0 ? "Mohammad Shafiul Islam" : "Kazi Rezwan Karim",
      roll: rollNumber,
      classId: resultClass,
      exam: examType,
      gpa: gpaCalculated.toFixed(2),
      status: gpaCalculated >= 4.0 ? 'Passed Excellence' : 'Passed Satisfactory',
      subjects: [
        { name: 'Mathematics', mark: isAplus ? '92 [A+]' : '82 [A+]' },
        { name: 'English First Language', mark: isAplus ? '88 [A+]' : '74 [A]' },
        { name: 'Sciences Research', mark: isAplus ? '95 [A+]' : '78 [A]' },
        { name: 'Digital ICT', mark: '96 [A+]' },
        { name: 'Social Studies', mark: isAplus ? '85 [A+]' : '65 [B]' }
      ]
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-4 sm:p-6 font-sans flex flex-col gap-6" id="academic_center_root">
      
      {/* Tab Select Header sub navigation */}
      <div className="border-b border-gray-100 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#003366] tracking-tight flex items-center gap-2">
            <ClipboardList className="text-[#0B8F3A]" size={24} />
            <span>{currentLang === 'en' ? "Academic Affairs & Timetables" : "একাডেমিক ফাইল ও রুটিন কোঅর্ডিনেটর"}</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {currentLang === 'en' 
              ? "Access interactive routines sheets, download materials, and lookup online scorecards." 
              : "শ্রেণী ভিত্তিক নিয়মিত ক্লাস রুটিন, পরীক্ষার সময়সূচী এবং পরীক্ষার ফলাফল প্রকাশ কেন্দ্র।"
            }
          </p>
        </div>

        {/* Tab Selection menu */}
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0 self-stretch md:self-auto overflow-x-auto gap-0.5">
          <button
            onClick={() => setActiveSubTab('calendar')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'calendar' ? 'bg-[#0B8F3A] text-white shadow' : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            {currentLang === 'en' ? "Calendar" : "ছুটির ক্যালেন্ডার"}
          </button>
          <button
            onClick={() => setActiveSubTab('routines')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'routines' ? 'bg-[#0B8F3A] text-white shadow' : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            {currentLang === 'en' ? "Class Routines" : "রুটিন মডিউল"}
          </button>
          <button
            onClick={() => setActiveSubTab('results')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer whitespace-nowrap bg-amber-400 text-slate-850 hover:bg-amber-300 font-extrabold ${
              activeSubTab === 'results' ? 'ring-2 ring-[#0B8F3A]' : ''
            }`}
          >
            {currentLang === 'en' ? "★ Online Result" : "★ পরীক্ষার ফলাফল"}
          </button>
          <button
            onClick={() => setActiveSubTab('downloads')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'downloads' ? 'bg-[#0B8F3A] text-white shadow' : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            {currentLang === 'en' ? "Forms Center" : "ডাউনলোড সেন্টার"}
          </button>
        </div>
      </div>

      {/* SUB TAB 1: ACADEMIC CALENDER WITH HOLIDAYS */}
      {activeSubTab === 'calendar' && (
        <div className="flex flex-col gap-4" id="academic_calendar_module">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-300">
            <h4 className="text-xs font-bold text-[#003366] uppercase mb-1">{currentLang === 'en' ? "Academic Events & Declared Holidays 2026" : "আসন্ন শিক্ষাবর্ষের ছুটির তালিকা ও নির্দেশনা"}</h4>
            <p className="text-[11px] text-gray-500">
              {currentLang === 'en' 
                ? "Academic terms comply with primary, secondary gazettes released by the Ministry of Bangladesh." 
                : "জাতীয় শিক্ষা বোর্ড ও গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের শিক্ষা মন্ত্রণালয় অনুমোদিত ছুটির তালিকা।"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {holidayCalendar.map((h, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-lg p-3.5 flex gap-4 shadow-sm hover:border-green-600 transition-all">
                <div className="bg-slate-50 text-[#003366] font-mono text-center shrink-0 border border-slate-200 p-2.5 rounded-lg w-16 h-18 flex flex-col justify-center">
                  <span className="text-sm font-black">{translateNum(h.date.split('-')[2])}</span>
                  <span className="text-[9px] uppercase font-bold">
                    {currentLang === 'en' ? monthsEn[h.date.split('-')[1]] : monthsBn[h.date.split('-')[1]]}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-black bg-emerald-50 text-[#0B8F3A] px-1.5 py-0.5 rounded uppercase border border-emerald-200">
                    {h.type}
                  </span>
                  <h5 className="font-extrabold text-slate-800 text-xs mt-1.5 leading-snug">{h.title}</h5>
                  <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                    <Clock size={11} className="text-slate-300" />
                    <span>{currentLang === 'en' ? `Duration: ${h.duration}` : `মেয়াদকাল: ${translateNum(h.duration.replace('Day', 'দিন').replace('Days', 'দিন'))}`}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB TAB 2: INTERACTIVE CLASS ROUTINES */}
      {activeSubTab === 'routines' && (
        <div className="flex flex-col gap-4" id="class_routines_module">
          <div className="flex items-center justify-between border-b border-gray-150 pb-2.5 flex-wrap gap-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase">
              {currentLang === 'en' ? "Shift Class Routines Tracker" : "শ্রেণী ভিত্তিক শিক্ষা রুটিন ড্যাশবোর্ড"}
            </h4>

            {/* Select class tabs */}
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              {['Class 6', 'Class 8', 'Class 9'].map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedRoutineClass(cls)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                    selectedRoutineClass === cls ? 'bg-[#0B8F3A] text-white shadow' : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 uppercase font-bold text-[10px]">
                  <th className="p-3">{currentLang === 'en' ? 'Period Slot' : 'পিরিয়ড / সময়'}</th>
                  <th className="p-3">{currentLang === 'en' ? 'Subject & Curriculum' : 'বিষয়'}</th>
                  <th className="p-3">{currentLang === 'en' ? 'Assigned Teacher' : 'শিক্ষক'}</th>
                  <th className="p-3 text-center">{currentLang === 'en' ? 'Lounge Room' : 'কক্ষ নং'}</th>
                </tr>
              </thead>
              <tbody>
                {getRoutine(selectedRoutineClass).map((line, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-mono font-bold text-gray-600 flex items-center gap-1.5 text-[10px]">
                      <Clock size={12} className="text-[#0B8F3A]" />
                      <span>{translateNum(line.period)}</span>
                    </td>
                    <td className="p-3 font-semibold text-slate-800">{line.subject}</td>
                    <td className="p-3 text-slate-600 font-medium">
                      <span>{line.teacher}</span>
                    </td>
                    <td className="p-3 text-center font-mono font-black text-slate-700 bg-slate-50/50">
                      {line.room}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB TAB 3: ONLINE RESULT CHECKER OR REPORT CARD */}
      {activeSubTab === 'results' && (
        <div className="max-w-md mx-auto w-full flex flex-col gap-5" id="online_results_checker_sec">
          
          <div className="bg-[#fffdf4] p-5 border-2 border-amber-300 rounded-xl">
            <h4 className="text-sm font-extrabold text-[#003366] text-center uppercase mb-3 flex items-center justify-center gap-1.5">
              <Award size={18} className="text-amber-500 animate-bounce" />
              <span>{currentLang === 'en' ? "Online Student Results Desk" : "অনলাইন জিপিএ রেজাল্ট পোর্টাল"}</span>
            </h4>
            
            {/* Input credentials form */}
            <form onSubmit={handleResultCheck} className="flex flex-col gap-3 text-xs font-bold text-slate-700">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">{currentLang === 'en' ? 'Target Grade' : 'কাঙ্ক্ষিত শ্রেণী'}</label>
                  <select
                    value={resultClass}
                    onChange={(e) => setResultClass(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                  >
                    <option value="Class 6">Class 6</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">{currentLang === 'en' ? 'Select Exam' : 'পরীক্ষার নাম'}</label>
                  <select
                    value={examType}
                    onChange={(e) => setExamType(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                  >
                    <option value="Half Yearly">Half Yearly Exam 2026</option>
                    <option value="Model Test">Final SSC Model Test</option>
                    <option value="Preparatory Term">Preparatory Term Evaluation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1">{currentLang === 'en' ? 'Roll Code / Registration Number' : 'সহপাঠীর শ্রেণী রোল নম্বর'}</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    required
                    placeholder="e.g. 101"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="grow text-xs pl-3 pr-4 py-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A] font-mono"
                  />
                  
                  <button
                    type="submit"
                    className="bg-[#0B8F3A] hover:bg-green-700 text-white text-xs font-bold px-4 py-2 rounded flex items-center justify-center gap-1 shrink-0 cursor-pointer shadow-md"
                  >
                    <span>{currentLang === 'en' ? 'Search Card' : 'তথ্য খুঁজুন'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Transcript Display result sheet card */}
          {isCheckedResult && generatedTranscript && (
            <div className="bg-slate-900 text-slate-150 border-4 border-double border-slate-600 rounded-xl overflow-hidden p-5 shadow-lg relative font-sans" id="generated_academic_transcript">
              
              {/* National Emblem Watermark decoration */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none scale-150">
                <GraduationCap size={150} />
              </div>

              {/* Header registry */}
              <div className="text-center pb-4 mb-4 border-b border-gray-700">
                <span className="text-[9px] uppercase tracking-widest text-[#0B8F3A] font-bold">
                  {currentLang === 'en' ? "Dhaka Collegiate Secondary Examination Office" : "ঢাকা কলেজিয়েট সরকারি হাই স্কুল পরীক্ষা নিয়ামক দফতর"}
                </span>
                <h4 className="text-sm font-black text-white mt-1 uppercase">
                  {currentLang === 'en' ? "Academic Progress Card" : "একাডেমিক গ্রেড-পত্র"}
                </h4>
                <p className="text-[10px] text-gray-400 mt-1">{generatedTranscript.exam} — 2026</p>
              </div>

              {/* Student header details */}
              <div className="text-[11px] grid grid-cols-2 gap-y-1 text-slate-300 mb-4 font-medium border-b border-gray-800 pb-2.5 capitalize">
                <p><span className="text-gray-500">{currentLang === 'en' ? "Candidate Name" : "ছাত্রের নাম"}:</span><br /><span className="text-white font-bold">{generatedTranscript.studentName}</span></p>
                <p className="text-right"><span className="text-gray-500">{currentLang === 'en' ? "Examination Class" : "পরীক্ষার শ্রেণী"}:</span><br /><span>{generatedTranscript.classId}</span></p>
                <p><span className="text-gray-500">{currentLang === 'en' ? "Class Roll NO" : "শ্রেণী রোল নম্বর"}:</span><br /><span className="font-mono text-white font-semibold">#{translateNum(generatedTranscript.roll)}</span></p>
                <p className="text-right"><span className="text-gray-500">{currentLang === 'en' ? "Overall Point (GPA)" : "অর্জিত জিপিএ"}:</span><br /><span className="text-yellow-400 font-extrabold text-xs">{translateNum(generatedTranscript.gpa)} / ৫.০০</span></p>
              </div>

              {/* Subject Breakdown list */}
              <p className="text-[9px] font-black uppercase text-gray-500 tracking-wider mb-2">Subject Performance breakdown</p>
              <div className="flex flex-col gap-2 text-xs mb-4">
                {generatedTranscript.subjects.map((s: any, idx: number) => (
                  <div key={idx} className="flex justify-between border-b border-gray-800 pb-1 text-slate-300 last:border-0 font-medium">
                    <span>{s.name}</span>
                    <span className="font-mono font-bold text-white text-[11px]">{translateNum(s.mark)}</span>
                  </div>
                ))}
              </div>

              {/* Security certification badge */}
              <div className="bg-[#1e293b] p-2 rounded-lg border border-slate-700 flex gap-2.5 items-center text-[10px] text-green-300">
                <ShieldCheck size={16} className="shrink-0 text-[#0B8F3A]" />
                <span className="text-slate-400 leading-snug">
                  {currentLang === 'en' 
                    ? "Validated core transcripts. Signatures on record from School Inspectorate." 
                    : "প্রত্যয়িত জিপিএ রেকর্ড। গণপ্রজাতন্ত্রী বাংলাদেশ বোর্ড সিকিউরিটি কোড অনুবর্তী।"
                  }
                </span>
              </div>
            </div>
          )}

        </div>
      )}

      {/* SUB TAB 4: DOWNLOADS CENTER REQUISITIONS FORMS */}
      {activeSubTab === 'downloads' && (
        <div className="flex flex-col gap-4 text-justify leading-relaxed" id="downloads_list_module">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-300 text-xs">
            <h4 className="font-bold text-slate-800 uppercase mb-1">{currentLang === 'en' ? "Public File Downloads Library" : "পাবলিক ফাইল ডাউনলোড সেকশন"}</h4>
            <p className="text-gray-500 leading-relaxed">
              {currentLang === 'en' 
                ? "Official PDF forms conform to Emis-format guidelines. Select items on the list to trigger prompt download operations." 
                : "বিদ্যালয় সংশ্লিষ্ট সকল আবেদনপত্র, সিলেবাস এবং সরকারি ছুটির গেজেট সার্কুলার ফাইল।"
              }
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {downloads.map((item) => (
              <div key={item.id} className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between gap-4 shadow-sm hover:border-green-600 transition-colors">
                <div className="min-w-0">
                  <span className="text-[9px] bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold px-1.5 py-0.5 rounded uppercase uppercase">
                    {item.category}
                  </span>
                  <h5 className="font-extrabold text-slate-800 text-xs mt-1 truncate max-w-sm">{item.title}</h5>
                  <p className="text-[10px] text-gray-400 mt-0.5 font-mono">Date: {translateNum(item.date)} | Size: {translateNum(item.fileSize)}</p>
                </div>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    // Generate pseudo text file download represent the selected document item
                    const blob = new Blob([`BANGLADESH EDUCATION STANDARD PDF REPRESENTATION\n==============================================\nItem: ${item.title}\nCategory: ${item.category}\nValidated Board Stamp 2026\nFile integrity: OK`], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${item.title.toLowerCase().replace(/\\s+/g, '_')}.txt`;
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="bg-[#0B8F3A] hover:bg-green-700 text-white p-2 rounded-lg transition-colors shadow-sm cursor-pointer shrink-0"
                >
                  <Download size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
