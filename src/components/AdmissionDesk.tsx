/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  GraduationCap, ClipboardList, Search, CreditCard, CheckCircle2, 
  Clock, AlertTriangle, AlertCircle, FileText, Send
} from 'lucide-react';
import { Admission, AdmissionStatus } from '../types';

interface AdmissionDeskProps {
  currentLang: 'en' | 'bn';
  onNewAdmission: (data: any) => Promise<Admission>;
  admissionsList: Admission[];
}

export default function AdmissionDesk({
  currentLang,
  onNewAdmission,
  admissionsList
}: AdmissionDeskProps) {
  const [activeTab, setActiveTab] = useState<'form' | 'tracking'>('form');
  
  // Registration form block state
  const [studentName, setStudentName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  const [classApplied, setClassApplied] = useState('Class 6');
  const [previousSchool, setPreviousSchool] = useState('');
  const [gpa, setGpa] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<Admission | null>(null);

  // Tracking engine state
  const [trackerQuery, setTrackerQuery] = useState('');
  const [searchedRecord, setSearchedRecord] = useState<Admission | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const classes = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

  const handleSubmitAdmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !fatherName || !mobile || !gpa) {
      alert(currentLang === 'en' ? 'Please fill in all mandatory fields.' : 'অনুগ্রহ করে সকল আবশ্যকীয় ঘর পূরণ করুন।');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        studentName,
        fatherName,
        motherName,
        gender,
        dob,
        classApplied,
        previousSchool,
        gpa: parseFloat(gpa),
        mobile,
        email,
        paymentStatus: 'Pending'
      };
      const result = await onNewAdmission(payload);
      setSuccessInfo(result);
      
      // Clear out fields
      setStudentName('');
      setFatherName('');
      setMotherName('');
      setDob('');
      setPreviousSchool('');
      setGpa('');
      setMobile('');
      setEmail('');
    } catch (err) {
      console.error(err);
      alert(currentLang === 'en' ? 'Registration failed. Try again' : 'ভর্তি আবেদন ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackApplication = () => {
    if (!trackerQuery) return;
    setHasSearched(true);
    
    // Scan by mobile or application reference code
    const found = admissionsList.find(
      a => a.mobile.includes(trackerQuery) || a.id.toLowerCase().includes(trackerQuery.toLowerCase())
    );
    setSearchedRecord(found || null);
  };

  const getStatusBadge = (status: AdmissionStatus) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-2 py-1 rounded text-xs inline-flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 size={13} />
            <span>{currentLang === 'en' ? 'Merit Selected List' : 'মেধাতালিকায় মনোনীত'}</span>
          </span>
        );
      case 'Waiting':
        return (
          <span className="bg-amber-100 text-amber-800 border border-amber-300 font-bold px-2 py-1 rounded text-xs inline-flex items-center gap-1.5 shadow-sm">
            <Clock size={13} />
            <span>{currentLang === 'en' ? 'Waiting List' : 'অপেক্ষমাণ তালিকা'}</span>
          </span>
        );
      case 'Rejected':
        return (
          <span className="bg-red-100 text-red-800 border border-red-300 font-bold px-2 py-1 rounded text-xs inline-flex items-center gap-1.5 shadow-sm">
            <AlertTriangle size={13} />
            <span>{currentLang === 'en' ? 'Verification Deferred' : 'আবেদন বাতিল'}</span>
          </span>
        );
      default:
        return (
          <span className="bg-blue-100 text-blue-800 border border-blue-300 font-bold px-2 py-1 rounded text-xs inline-flex items-center gap-1.5 shadow-sm">
            <Clock size={13} className="animate-spin" />
            <span>{currentLang === 'en' ? 'Applied / Processing' : 'আবেদন জমা / যাচাইাধীন'}</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-4 sm:p-6 font-sans flex flex-col gap-6" id="admission_desk_root">
      
      {/* Tab Switch Headers */}
      <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#003366] tracking-tight flex items-center gap-2">
            <GraduationCap className="text-[#0B8F3A]" size={24} />
            <span>{currentLang === 'en' ? "Online Admission Desk Portal" : "অনলাইন ভর্তি সহায়তা ডেস্ক"}</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {currentLang === 'en' 
              ? "Submit educational qualifications registration forms under direct Board indices." 
              : "২০২৬ শিক্ষাবর্ষে জিপিএ এবং মেধা ভিত্তিক ভর্তি আবেদনের সরকারি কেন্দ্র।"
            }
          </p>
        </div>

        {/* Form or Tracking Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0">
          <button
            onClick={() => {
              setActiveTab('form');
              setSuccessInfo(null);
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              activeTab === 'form' ? 'bg-[#0B8F3A] text-white shadow' : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            {currentLang === 'en' ? "Admission Registration Form" : "নিবন্ধন ফরম"}
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              activeTab === 'tracking' ? 'bg-[#0B8F3A] text-white shadow' : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            {currentLang === 'en' ? "Tracking System" : "আবেদনের অবস্থা"}
          </button>
        </div>
      </div>

      {/* Tab 1: Form submission content */}
      {activeTab === 'form' && (
        <React.Fragment>
          {successInfo ? (
            /* Successful Submission Screen */
            <div className="bg-emerald-50/50 border border-green-200 rounded-xl p-5 text-center flex flex-col items-center max-w-lg mx-auto" id="admission_success_box">
              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-4 border-2 border-green-300">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {currentLang === 'en' ? "Application Registered Successfully!" : "ভর্তি আবেদন সফলভাবে নিবন্ধিত!"}
              </h3>
              <p className="text-xs text-gray-600 mt-2">
                {currentLang === 'en' 
                  ? "Your digital registration details have been pushed to the collegiate administrative index databases securely. Note your credentials below." 
                  : "আপনার ডিজিটাল আবেদনপত্র সফলভাবে সার্ভারে জমা হয়েছে। তথ্য পুনরুদ্ধার করার স্বার্থে নিচে উল্লেখিত কোড সংরক্ষণ করুন।"
                }
              </p>

              {/* Box credentials info */}
              <div className="bg-white p-4 rounded-lg my-4 border border-slate-200 text-left w-full font-mono text-xs flex flex-col gap-2 shadow-sm">
                <p className="border-b border-gray-100 pb-1 flex justify-between">
                  <span className="font-sans font-bold text-slate-500">{currentLang === 'en' ? 'Reference Code' : 'আবেদন নম্বর'}:</span>
                  <span className="font-extrabold text-[#003366]">{successInfo.id}</span>
                </p>
                <p className="border-b border-gray-100 pb-1 flex justify-between">
                  <span className="font-sans font-bold text-slate-500">{currentLang === 'en' ? 'Student Name' : 'শিক্ষার্থীর নাম'}:</span>
                  <span>{successInfo.studentName}</span>
                </p>
                <p className="border-b border-gray-100 pb-1 flex justify-between">
                  <span className="font-sans font-bold text-slate-500">{currentLang === 'en' ? 'Grade Target' : 'কাঙ্ক্ষিত শ্রেণী'}:</span>
                  <span>{successInfo.classApplied}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-sans font-bold text-slate-500">{currentLang === 'en' ? 'Mobile Link' : 'যোগাযোগ নম্বর'}:</span>
                  <span>{successInfo.mobile}</span>
                </p>
              </div>

              {/* Payment Details Warning badge */}
              <div className="bg-amber-50 border border-amber-200 text-amber-900 text-[11px] p-3 rounded-lg flex items-start gap-2.5 text-justify leading-relaxed mb-4">
                <CreditCard size={15} className="shrink-0 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-bold">{currentLang === 'en' ? "Required Admission Payment Slip" : "ভর্তি ফি পরিশোধের নির্দেশনাবলী"}</p>
                  <p className="mt-0.5">
                    {currentLang === 'en' 
                      ? "To move this record to active board review, clear your 200 BDT processing fee using the Sonali Bank core slip (Sonali Sheba) or certified bKash/Nagad portals." 
                      : "আবেদন যাচাই প্রক্রিয়া শুরু করতে সরকারি সোনালী সেবা স্লিপ অথবা মোবাইল ব্যাংকিং ব্যবহার করে দ্রুত ২০০/- টাকা প্রদান সম্পন্ন করুন।"
                    }
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSuccessInfo(null);
                    setActiveTab('form');
                  }}
                  className="bg-[#0B8F3A] hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded-lg"
                >
                  {currentLang === 'en' ? "Apply for Another Student" : "নতুন আরেকটি আবেদন করুন"}
                </button>
                <button
                  onClick={() => {
                    setTrackerQuery(successInfo.id);
                    setActiveTab('tracking');
                  }}
                  className="bg-slate-850 hover:bg-slate-900 bg-slate-900 text-white text-xs font-bold py-2 px-4 rounded-lg"
                >
                  {currentLang === 'en' ? "Track Progress" : "অবস্থা যাচাই করুন"}
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form Grid */
            <form onSubmit={handleSubmitAdmission} className="grid grid-cols-1 md:grid-cols-2 gap-4" id="admission_enrollment_form">
              
              {/* Left Column Group */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {currentLang === 'en' ? 'Student Full Name' : 'শিক্ষার্থীর পুরো নাম'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={currentLang === 'en' ? "As on birth registration certificate" : "জন্ম নিবন্ধন পত্র অনুযায়ী ইংরেজিতে বা বাংলায়"}
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {currentLang === 'en' ? "Father's Name" : "পিতার নাম"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={currentLang === 'en' ? "Father's Full Name" : "জাতীয় পরিচয়পত্র অনুযায়ী পিতার নাম"}
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {currentLang === 'en' ? "Mother's Name" : "মাতার নাম"}
                  </label>
                  <input
                    type="text"
                    placeholder={currentLang === 'en' ? "Mother's Full Name" : "জাতীয় পরিচয়পত্র অনুযায়ী মাতার নাম"}
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {currentLang === 'en' ? "Gender" : "লিঙ্গ অনুবিভাগ"}
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                    >
                      <option value="Male">{currentLang === 'en' ? "Male" : "ছাত্র"}</option>
                      <option value="Female">{currentLang === 'en' ? "Female" : "ছাত্রী"}</option>
                      <option value="Other">{currentLang === 'en' ? "Other" : "অন্যান্য"}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {currentLang === 'en' ? "Date of Birth" : "জন্ম তারিখ"}
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column Group */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {currentLang === 'en' ? "Class Applied For" : "ভর্তির শ্রেণী"} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={classApplied}
                    onChange={(e) => setClassApplied(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                  >
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {currentLang === 'en' ? "Previous Educational Institution (School)" : "পূর্ববর্তী শিক্ষা প্রতিষ্ঠান"}
                  </label>
                  <input
                    type="text"
                    placeholder={currentLang === 'en' ? "Primary/Secondary details" : "সর্বশেষ অধ্যয়নরত শিক্ষা প্রতিষ্ঠানের নাম"}
                    value={previousSchool}
                    onChange={(e) => setPreviousSchool(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {currentLang === 'en' ? "PSC/JSC Grade (GPA)" : "পিএসসি/জেএসসি জিপিএ"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="1.00"
                      max="5.00"
                      required
                      placeholder="e.g. 5.00"
                      value={gpa}
                      onChange={(e) => setGpa(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-300 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {currentLang === 'en' ? "Mobile Number" : "অভিভাবকের মোবাইল নং"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="017XX-XXXXXX"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {currentLang === 'en' ? "Email Address" : "ইমেইল ঠিকানা"}
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                  />
                </div>
              </div>

              {/* Submission Button Block */}
              <div className="md:col-span-2 border-t border-gray-100 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-[11px] text-gray-500 flex gap-1.5 items-center bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                  <AlertCircle size={14} className="text-amber-500 shrink-0" />
                  <span>
                    {currentLang === 'en' 
                      ? "I certify that all details submitted are correct and match real school records." 
                      : "আমি প্রত্যয়ন করছি যে উল্লেখিত ও সংলগ্ন তথ্যাদি সঠিক ও আইনিভাবে সত্য।"
                    }
                  </span>
                </span>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0B8F3A] hover:bg-green-700 text-white text-xs font-bold py-3 px-6 rounded-lg flex items-center gap-2 shadow-md transition-colors w-full sm:w-auto justify-center cursor-pointer disabled:bg-slate-400"
                >
                  <Send size={15} />
                  <span>
                    {isSubmitting 
                      ? (currentLang === 'en' ? "Registering Record..." : "নিবন্ধন জমা হচ্ছে...") 
                      : (currentLang === 'en' ? "Submit Admission Form" : "ভর্তি ফরম দাখিল করুন")
                    }
                  </span>
                </button>
              </div>

            </form>
          )}
        </React.Fragment>
      )}

      {/* Tab 2: Tracking / Query System */}
      {activeTab === 'tracking' && (
        <div className="flex flex-col gap-5 max-w-xl mx-auto w-full id=admission_tracking_deck">
          <div className="bg-slate-50 p-5 rounded-lg border border-slate-300">
            <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">
              {currentLang === 'en' ? "Admission File Search Office" : "ভর্তি ফাইলের খোঁজ সেকশন"}
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={currentLang === 'en' ? "Enter reference ID or Guardian's Mobile..." : "মোবাইল নম্বর অথবা আবেদন আইডি..."}
                value={trackerQuery}
                onChange={(e) => setTrackerQuery(e.target.value)}
                className="grow text-xs pl-3 pr-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B8F3A] text-slate-850"
              />
              <button
                type="button"
                onClick={handleTrackApplication}
                className="bg-[#003366] hover:bg-slate-900 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <Search size={14} />
                <span>{currentLang === 'en' ? 'Search' : 'খুঁজুন'}</span>
              </button>
            </div>
          </div>

          {/* Searched item display result cards */}
          {hasSearched && (
            <React.Fragment>
              {searchedRecord ? (
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm p-5 self-stretch">
                  <div className="flex justify-between items-start border-b border-gray-100 pb-3 mb-4 flex-wrap gap-2">
                    <div>
                      <h4 className="font-extrabold text-[#003366] text-base">{searchedRecord.studentName}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {currentLang === 'en' ? 'Ref' : 'আইডি'}: <span className="font-mono bg-gray-100 px-1 rounded">{searchedRecord.id}</span>
                      </p>
                    </div>
                    {getStatusBadge(searchedRecord.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs font-medium text-slate-600 mb-4">
                    <p>
                      <span className="text-gray-400 font-normal">{currentLang === 'en' ? "Father's Designation" : "পিতার নাম"}:</span><br />
                      <span>{searchedRecord.fatherName}</span>
                    </p>
                    <p>
                      <span className="text-gray-400 font-normal">{currentLang === 'en' ? "Class Targeted & Grade" : "আবেদনের শ্রেণী ও জিপিএ"}:</span><br />
                      <span>{searchedRecord.classApplied} | GPA {searchedRecord.gpa.toFixed(2)}</span>
                    </p>
                    <p>
                      <span className="text-gray-400 font-normal">{currentLang === 'en' ? "Core Link mobile" : "মোবাইল"}:</span><br />
                      <span className="font-mono">{searchedRecord.mobile}</span>
                    </p>
                    <p>
                      <span className="text-gray-400 font-normal">{currentLang === 'en' ? "Fee Clearance Status" : "ভর্তি ফি পরিশোধ স্থিতি"}:</span><br />
                      <span className={`font-bold ${searchedRecord.paymentStatus === 'Paid' ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {searchedRecord.paymentStatus === 'Paid' 
                          ? (currentLang === 'en' ? '✓ Processing Fee Paid' : '✓ ২০০/- টাকা পরিশোধিত')
                          : (currentLang === 'en' ? '⚠ Payment Slip Awaiting' : '⚠ ফি এখনো পরিশোধ করা হয়নি')
                        }
                      </span>
                    </p>
                  </div>

                  {/* Flow chart tracking display */}
                  <div className="border-t border-slate-100 pt-4" id="tracking_progress_line">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                      {currentLang === 'en' ? "Application Flow Tracker" : "আবেদন অগ্রগতির মাইলফলক"}
                    </p>
                    <div className="flex justify-between items-center relative text-center text-[10px] font-semibold text-gray-400 max-w-sm mx-auto">
                      <div className="absolute top-3.5 left-6 right-6 h-0.5 bg-slate-200 z-0" />
                      
                      <div className="flex flex-col items-center gap-1 relative z-10">
                        <span className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <span className="text-[#0B8F3A]">{currentLang === 'en' ? 'Applied' : 'জমা হয়েছে'}</span>
                      </div>
                      
                      <div className="flex flex-col items-center gap-1 relative z-10">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${
                          searchedRecord.paymentStatus === 'Paid' ? 'bg-green-600 text-white' : 'bg-slate-200 text-gray-600'
                        }`}>2</span>
                        <span className={searchedRecord.paymentStatus === 'Paid' ? 'text-[#0B8F3A]' : ''}>
                          {currentLang === 'en' ? 'Paid' : 'ফি রশিদ'}
                        </span>
                      </div>

                      <div className="flex flex-col items-center gap-1 relative z-10 font-bold">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${
                          searchedRecord.status === 'Approved' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-gray-600'
                        }`}>3</span>
                        <span className={searchedRecord.status === 'Approved' ? 'text-emerald-700 font-extrabold' : ''}>
                          {currentLang === 'en' ? 'Decision' : 'অন্তিম রায়'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 border border-dashed border-red-200 hover:border-red-300 rounded-lg text-center flex flex-col items-center justify-center bg-red-50/10">
                  <AlertCircle size={28} className="text-red-500 mb-2" />
                  <p className="text-sm font-semibold text-rose-700">
                    {currentLang === 'en' ? "No application matches found." : "উল্লেখিত মোবাইল বা আবেদন নম্বরের বিপরীতে কোনো তথ্য পাওয়া যায়নি।"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                    {currentLang === 'en' 
                      ? "Verify the mobile number typed or check with admission desk coordinators directly." 
                      : "অনুগ্রহ করে আপনার টাইপ করা আবেদন আইডিটি পুনরায় চেক করুন অথবা সোনালী সেবা পরিশোধ তথ্য যাচাই করুন।"
                    }
                  </p>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
      )}

    </div>
  );
}
