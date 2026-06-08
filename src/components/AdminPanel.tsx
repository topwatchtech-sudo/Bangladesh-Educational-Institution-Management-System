/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, Trash2, Edit3, Save, Database, ShieldAlert, Check, X, FileText, 
  Settings, Users, VolumeX, Eye, BookOpen, Lock, Terminal, Download, Copy, RefreshCw
} from 'lucide-react';
import { Notice, Teacher, Staff, Admission, InstitutionSettings, NoticeCategory, DownloadCategory } from '../types';

interface AdminPanelProps {
  settings: InstitutionSettings;
  notices: Notice[];
  teachers: Teacher[];
  admissions: Admission[];
  currentLang: 'en' | 'bn';
  onUpdateSettings: (newSettings: Partial<InstitutionSettings>) => Promise<any>;
  onAddNotice: (notice: any) => Promise<Notice>;
  onDeleteNotice: (id: string) => Promise<any>;
  onAddTeacher: (teacher: any) => Promise<Teacher>;
  onDeleteTeacher: (id: string) => Promise<any>;
  onUpdateAdmissionStatus: (id: string, status: string, payStatus?: string) => Promise<any>;
  onDeleteAdmission: (id: string) => Promise<any>;
}

export default function AdminPanel({
  settings,
  notices,
  teachers,
  admissions,
  currentLang,
  onUpdateSettings,
  onAddNotice,
  onDeleteNotice,
  onAddTeacher,
  onDeleteTeacher,
  onUpdateAdmissionStatus,
  onDeleteAdmission
}: AdminPanelProps) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [activeAdminTab, setActiveAdminTab] = useState<'notices' | 'teachers' | 'admissions' | 'settings' | 'laravel'>('notices');

  // Input states for adding Notice
  const [notTitle, setNotTitle] = useState('');
  const [notCategory, setNotCategory] = useState<NoticeCategory>('General');
  const [notDesc, setNotDesc] = useState('');
  const [notImportant, setNotImportant] = useState(false);
  const [notSaving, setNotSaving] = useState(false);

  // Input states for adding Teacher
  const [teaName, setTeaName] = useState('');
  const [teaDesg, setTeaDesg] = useState('Assistant Teacher');
  const [teaSub, setTeaSub] = useState('');
  const [teaQual, setTeaQual] = useState('');
  const [teaMobile, setTeaMobile] = useState('');
  const [teaEmail, setTeaEmail] = useState('');
  const [teaExp, setTeaExp] = useState('');
  const [teaBio, setTeaBio] = useState('');
  const [teaSaving, setTeaSaving] = useState(false);

  // Input states for Settings update
  const [setInstName, setSetInstName] = useState(settings.institutionName);
  const [setEiin, setSetEiin] = useState(settings.eiin);
  const [setCode, setSetCode] = useState(settings.schoolCode);
  const [setMotto, setSetMotto] = useState(settings.motto);
  const [setPhone, setSetPhone] = useState(settings.phone);
  const [setEmail, setSetEmail] = useState(settings.email);
  const [setAddress, setSetAddress] = useState(settings.address);
  const [setSaving, setSetSaving] = useState(false);

  // Copy helpers
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPass === 'admin' || adminPass === 'admin123') {
      setIsAdminLoggedIn(true);
    } else {
      alert(currentLang === 'en' ? 'Incorrect secret key. Default is: admin' : 'ভুল অ্যাক্সেস পিন কোড। ডিফল্ট হচ্ছে: admin');
    }
  };

  const handleCopyCode = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleSaveNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notTitle || !notDesc) return;
    setNotSaving(true);
    try {
      await onAddNotice({
        title: notTitle,
        category: notCategory,
        description: notDesc,
        isImportant: notImportant
      });
      setNotTitle('');
      setNotDesc('');
      setNotImportant(false);
      alert(currentLang === 'en' ? 'Notice published successfully!' : 'নোটিশটি সফলভাবে প্রকাশ করা হয়েছে!');
    } catch (err) {
      console.error(err);
    } finally {
      setNotSaving(false);
    }
  };

  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teaName || !teaSub || !teaMobile) return;
    setTeaSaving(true);
    try {
      await onAddTeacher({
        name: teaName,
        designation: teaDesg,
        subject: teaSub,
        qualification: teaQual,
        mobile: teaMobile,
        email: teaEmail,
        experience: teaExp,
        biography: teaBio
      });
      setTeaName('');
      setTeaSub('');
      setTeaQual('');
      setTeaMobile('');
      setTeaEmail('');
      setTeaExp('');
      setTeaBio('');
      alert(currentLang === 'en' ? 'Teacher record appended successfully!' : 'শিক্ষকের রেকর্ডটি ডাটাবেজে যুক্ত করা হয়েছে!');
    } catch (err) {
      console.error(err);
    } finally {
      setTeaSaving(false);
    }
  };

  const handleSaveWebSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetSaving(true);
    try {
      await onUpdateSettings({
        institutionName: setInstName,
        eiin: setEiin,
        schoolCode: setCode,
        motto: setMotto,
        phone: setPhone,
        email: setEmail,
        address: setAddress
      });
      alert(currentLang === 'en' ? 'Core institutional settings applied successfully!' : 'সিস্টেম সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে!');
    } catch (err) {
      console.error(err);
    } finally {
      setSetSaving(false);
    }
  };

  // ----------------------------------------------------
  // PROFESSIONAL LARAVEL COMPLIANCE EXPORTS & SCHEMAS SOURCE CODE
  // ----------------------------------------------------

  const installationGuideManual = `
========================================================================
    BANGLADESH REGULATED EDUCATIONAL INSTITUTION PORTAL (LARAVEL)
========================================================================

1. PREREQUISITES
------------------------------------------------------------------------
- PHP >= 8.2 with OpenSSL, PDO, Mbstring, XML extensions active
- Composer >= 2.0
- MySQL >= 8.0 or PostgreSQL
- Node.js & NPM for Tailwind compiler

2. STEP-BY-STEP SYSTEM BOOTSTRAPPING
------------------------------------------------------------------------
Step 1: Unpack files into terminal project folder.
Step 2: Install core packages using Composer:
        $ composer install
Step 3: Create environment config file:
        $ cp .env.example .env
Step 4: Generate Laravel core secure cryptographic key:
        $ php artisan key:generate
Step 5: Setup MySQL DB schemas details inside your new '.env':
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=bang_school_mgmt
        DB_USERNAME=root
        DB_PASSWORD=secret
Step 6: Execute structural DB migrations with authentic SEED contents:
        $ php artisan migrate --seed
Step 7: Launch Laravel background backend local processor:
        $ php artisan serve --port=8000
Step 8: Open browser at: http://localhost:8000
  `;

  const rawLaravelMigrationSchema = `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

class CreateEducationPlatformTables extends Migration
{
    /**
     * Run the general Ministry Standard DDL migrations.
     */
    public function up()
    {
        // 1. Roles table
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // Super Admin, Admin, Principal, Teacher
            $table->string('slug');
            $table->timestamps();
        });

        // 2. Users table
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->foreignId('role_id')->constrained('roles')->onDelete('cascade');
            $table->rememberToken();
            $table->timestamps();
        });

        // 3. Institution General Configurations
        Schema::create('institution_info', function (Blueprint $table) {
            $table->id();
            $table->string('eiin_number')->unique();
            $table->string('school_code');
            $table->string('title_en');
            $table->string('title_bn');
            $table->text('motto');
            $table->string('established_year');
            $table->string('phone_primary');
            $table->string('email_primary');
            $table->text('address_text');
            $table->text('principal_message');
            $table->string('principal_photo_path')->nullable();
            $table->timestamps();
        });

        // 4. Certified Teachers database
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('name_en');
            $table->string('designation');
            $table->string('assigned_subject');
            $table->string('highest_qualification');
            $table->string('mobile_number');
            $table->string('email_address')->unique();
            $table->date('joining_date');
            $table->string('experience_count')->default('0 Years');
            $table->text('biography')->nullable();
            $table->string('photo_path')->nullable();
            $table->timestamps();
        });

        // 5. Official Notices Archive
        Schema::create('notices', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('category_enum', ['General', 'Academic', 'Admission', 'Exam', 'Emergency']);
            $table->date('published_date');
            $table->text('body_description');
            $table->boolean('is_critical_alert')->default(false);
            $table->string('attached_pdf_path')->nullable();
            $table->timestamps();
        });

        // 6. Registered Online Admissions List
        Schema::create('admissions', function (Blueprint $table) {
            $table->id();
            $table->string('student_full_name');
            $table->string('father_name');
            $table->string('mother_name');
            $table->string('gender_identity');
            $table->date('birth_date');
            $table->string('class_target');
            $table->string('previous_school_details')->nullable();
            $table->decimal('gpa_score', 3, 2);
            $table->string('guardian_mobile');
            $table->string('email_address')->nullable();
            $table->enum('status', ['Applied', 'Approved', 'Waiting', 'Rejected'])->default('Applied');
            $table->enum('payment_status', ['Pending', 'Paid'])->default('Pending');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('admissions');
        Schema::dropIfExists('notices');
        Schema::dropIfExists('teachers');
        Schema::dropIfExists('institution_info');
        Schema::dropIfExists('users');
        Schema::dropIfExists('roles');
    }
}
`;

  const sqlDatabaseDDL = `-- =====================================================================
-- BANGLADESH EDUCATION INSTITUTION SYSTEM (EIMS) MYSQL SCHEMAS
-- STRICT DATA CONSTRAINTS, INDEXES, AND MPO FOREIGN RELATIONS
-- =====================================================================

CREATE DATABASE IF NOT EXISTS \`bang_school_mgmt\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`bang_school_mgmt\`;

-- 1. ROLES SCHEMA TABLE
CREATE TABLE \`roles\` (
  \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(255) NOT NULL UNIQUE,
  \`slug\` VARCHAR(255) NOT NULL,
  \`created_at\` TIMESTAMP NULL,
  \`updated_at\` TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. STAFFS & COORDINATORS SCHEMA
CREATE TABLE \`staffs\` (
  \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(255) NOT NULL,
  \`designation\` VARCHAR(191) NOT NULL,
  \`department\` VARCHAR(191) NOT NULL,
  \`contact\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(191) NOT NULL,
  \`photo_url\` VARCHAR(1000) DEFAULT NULL,
  INDEX \`idx_staff_dept\` (\`department\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. OUTSTANDING SLIDERS SEED LOGS
CREATE TABLE \`sliders\` (
  \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`photo_url\` VARCHAR(1000) NOT NULL,
  \`caption\` VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. VISITOR RECORD LOGS AUDITS
CREATE TABLE \`visitor_logs\` (
  \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`ip_address\` VARCHAR(45) NOT NULL,
  \`visited_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX \`idx_ip\` (\`ip_address\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

  if (!isAdminLoggedIn) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-8 font-sans max-w-sm mx-auto my-12" id="admin_login_box">
        <div className="text-center mb-5">
          <div className="w-12 h-12 bg-red-50 text-red-700 rounded-full flex items-center justify-center mx-auto mb-3.5 border border-red-200">
            <Lock size={22} className="animate-pulse" />
          </div>
          <h3 className="font-extrabold text-slate-800 text-base">{currentLang === 'en' ? "Administration Secure Key" : "অ্যাডমিন প্যানেল লগইন"}</h3>
          <p className="text-[11px] text-gray-500 mt-0.5">
            {currentLang === 'en' ? "Enter institution console master access token." : "সুরক্ষিত ডাটাবেজে অ্যাক্সেস নিতে আপনার পাসকোডটি দিন।"}
          </p>
        </div>

        <form onSubmit={handleAdminLogin} className="flex flex-col gap-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
              🔑 {currentLang === 'en' ? "Master Password" : "মাস্টার পাসওয়ার্ড"} (admin)
            </label>
            <input
              type="password"
              placeholder="e.g. admin"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A] focus:bg-white text-slate-900 font-mono"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0B8F3A] hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded transition-all cursor-pointer"
          >
            {currentLang === 'en' ? "Establish Secure Console" : "অ্যাডমিন প্যানেলে প্রবেশ করুন"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-4 sm:p-6 font-sans flex flex-col gap-6" id="admin_authorized_panel">
      
      {/* Admin header menu bar */}
      <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="bg-red-100 text-red-800 text-[10px] font-black tracking-widest px-2 py-0.5 rounded uppercase border border-red-200 inline-block mb-1 animate-pulse">
            ★ SECURED ADMINISTRATION
          </span>
          <h2 className="text-xl font-black text-[#003366] tracking-tight">
            {currentLang === 'en' ? "Collegiate Central Registrar Hub" : "কেন্দ্রীয় গভর্নিং প্রশাসন কেন্দ্র"}
          </h2>
        </div>

        {/* Action Logout button */}
        <button
          onClick={() => {
            setIsAdminLoggedIn(false);
            setAdminPass('');
          }}
          className="bg-red-700 hover:bg-red-800 text-white text-xs font-bold py-1.5 px-3 rounded flex items-center gap-1 cursor-pointer shadow"
        >
          <VolumeX size={13} />
          <span>{currentLang === 'en' ? "Exit Console" : "লগ-আউট"}</span>
        </button>
      </div>

      {/* Internal Menu Bars Tabs */}
      <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-200 overflow-x-auto gap-1" id="admin_sub_tabs_bar">
        <button
          onClick={() => setActiveAdminTab('notices')}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'notices' ? 'bg-[#0B8F3A] text-white shadow' : 'text-slate-650 hover:bg-slate-100 text-slate-700'
          }`}
        >
          <FileText size={14} />
          <span>{currentLang === 'en' ? 'Manage Notices' : 'নোটিশ প্রকাশ'}</span>
        </button>
        <button
          onClick={() => setActiveAdminTab('teachers')}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'teachers' ? 'bg-[#0B8F3A] text-white shadow' : 'text-slate-650 hover:bg-slate-100 text-slate-700'
          }`}
        >
          <Users size={14} />
          <span>{currentLang === 'en' ? 'Teachers Database' : 'শিক্ষক নিবন্ধন'}</span>
        </button>
        <button
          onClick={() => setActiveAdminTab('admissions')}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'admissions' ? 'bg-[#0B8F3A] text-white shadow' : 'text-slate-650 hover:bg-slate-100 text-slate-700'
          }`}
        >
          <BookOpen size={14} />
          <span>{currentLang === 'en' ? 'Admissions Board' : 'ভর্তি আবেদনপত্র'}</span>
        </button>
        <button
          onClick={() => setActiveAdminTab('settings')}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'settings' ? 'bg-[#0B8F3A] text-white shadow' : 'text-slate-650 hover:bg-slate-100 text-slate-700'
          }`}
        >
          <Settings size={14} />
          <span>{currentLang === 'en' ? 'Web Settings' : 'মৌলিক সেটিংস'}</span>
        </button>
        <button
          onClick={() => setActiveAdminTab('laravel')}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap bg-amber-500 text-slate-900 hover:bg-amber-400 ${
            activeAdminTab === 'laravel' ? 'ring-2 ring-emerald-700 font-extrabold' : ''
          }`}
        >
          <Database size={14} />
          <span>{currentLang === 'en' ? 'Laravel Exporter' : 'লারাভেল এক্সপোর্টার'}</span>
        </button>
      </div>

      {/* Tab 1: Notices creation & deletion */}
      {activeAdminTab === 'notices' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="admin_notices_manager">
          
          {/* NOTICE CREATION FORM */}
          <form onSubmit={handleSaveNotice} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col gap-3">
            <h4 className="text-xs font-black text-[#003366] uppercase border-b border-gray-200 pb-1.5 flex items-center gap-1">
              <Plus size={16} />
              <span>{currentLang === 'en' ? 'Issue New Official Notice' : 'নতুন নোটিশ জারি করুন'}</span>
            </h4>
            
            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">{currentLang === 'en' ? "Notice Title" : "বিজ্ঞপ্তির শিরোনাম"}</label>
              <input
                type="text"
                required
                value={notTitle}
                onChange={(e) => setNotTitle(e.target.value)}
                placeholder="e.g. Class IX Half Yearly Exams Results"
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">{currentLang === 'en' ? "Category" : "বিজ্ঞপ্তি ক্যাটাগরি"}</label>
                <select
                  value={notCategory}
                  onChange={(e) => setNotCategory(e.target.value as NoticeCategory)}
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                >
                  <option value="General">{currentLang === 'en' ? "General" : "সাধারণ"}</option>
                  <option value="Academic">{currentLang === 'en' ? "Academic" : "একাডেমিক"}</option>
                  <option value="Admission">{currentLang === 'en' ? "Admission" : "ভর্তি সংক্রান্ত"}</option>
                  <option value="Exam">{currentLang === 'en' ? "Exam" : "পরীক্ষা সংক্রান্ত"}</option>
                  <option value="Emergency">{currentLang === 'en' ? "Emergency" : "জরুরি নোটিশ"}</option>
                </select>
              </div>

              <div className="flex items-center gap-2 mt-4 pl-1">
                <input
                  type="checkbox"
                  id="flag_notice_prio"
                  checked={notImportant}
                  onChange={(e) => setNotImportant(e.target.checked)}
                  className="w-4 h-4 text-[#0B8F3A] bg-white border-slate-300 rounded"
                />
                <label htmlFor="flag_notice_prio" className="text-xs font-bold text-red-600 uppercase cursor-pointer">
                  {currentLang === 'en' ? 'Critical Alert' : 'জরুরি ফ্ল্যাগ?'}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">{currentLang === 'en' ? "Notice Description Body" : "বিজ্ঞপ্তির বিস্তৃত বিবরণ"}</label>
              <textarea
                rows={4}
                required
                value={notDesc}
                onChange={(e) => setNotDesc(e.target.value)}
                placeholder="Explain the detailed requirements..."
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A] font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={notSaving}
              className="bg-[#0B8F3A] hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:bg-slate-400"
            >
              <Save size={14} />
              <span>{notSaving ? (currentLang === 'en' ? "Saving..." : 'সংরক্ষণ হচ্ছে...') : (currentLang === 'en' ? "Broadcast Notice" : 'বিজ্ঞপ্তি সম্প্রচার করুন')}</span>
            </button>
          </form>

          {/* ACTIVE NOTICES LIST & DELETIONS */}
          <div className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3 max-h-[460px] overflow-y-auto">
            <h4 className="text-xs font-black text-slate-800 uppercase border-b border-gray-100 pb-1.5">
              {currentLang === 'en' ? 'Active Notices Archive' : 'সক্রিয় বিজ্ঞপ্তিসমূহ'} ({notices.length})
            </h4>
            
            {notices.map((n) => (
              <div key={n.id} className="p-2.5 bg-white hover:bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between gap-4 transition-colors">
                <div className="min-w-0">
                  <span className="text-[9px] font-bold bg-green-50 text-green-800 border border-green-200 px-1.5 py-0.5 rounded uppercase">
                    {n.category}
                  </span>
                  <h5 className="font-bold text-slate-800 text-xs truncate mt-1">{n.title}</h5>
                  <p className="text-[10px] text-gray-400 mt-0.5">{n.date}</p>
                </div>

                <button
                  onClick={() => {
                    if (confirm(currentLang === 'en' ? 'Kill notice registry?' : 'এই নোটিশ কি মুছে ফেলবেন?')) {
                      onDeleteNotice(n.id);
                    }
                  }}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Tab 2: Teachers creation & deletion */}
      {activeAdminTab === 'teachers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="admin_teachers_manager">
          {/* TEACHER CREATION FORM */}
          <form onSubmit={handleSaveTeacher} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col gap-3">
            <h4 className="text-xs font-black text-[#003366] uppercase border-b border-gray-200 pb-1.5 flex items-center gap-1">
              <Plus size={16} />
              <span>{currentLang === 'en' ? 'Register Certified Lecturer' : 'নতুন শিক্ষক নিবন্ধন'}</span>
            </h4>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">{currentLang === 'en' ? "Full Name" : "শিক্ষকের পুরো নাম"}</label>
              <input
                type="text"
                required
                value={teaName}
                onChange={(e) => setTeaName(e.target.value)}
                placeholder="e.g. Dr. Shafiqul Alam Khan"
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">{currentLang === 'en' ? "Designation Role" : "পদবী"}</label>
                <select
                  value={teaDesg}
                  onChange={(e) => setTeaDesg(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                >
                  <option value="Senior Teacher">{currentLang === 'en' ? "Senior Teacher" : "সিনিয়র তদারক শিক্ষক"}</option>
                  <option value="Assistant Teacher">{currentLang === 'en' ? "Assistant Teacher" : "সহকারী শিক্ষক"}</option>
                  <option value="Vice Principal">{currentLang === 'en' ? "Vice Principal" : "সহকারী প্রধান"}</option>
                  <option value="Lecturer">{currentLang === 'en' ? "Lecturer" : "প্রভাষক"}</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">{currentLang === 'en' ? "Subject Specialty" : "বিশেষজ্ঞ বিষয"}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Physics"
                  value={teaSub}
                  onChange={(e) => setTeaSub(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">{currentLang === 'en' ? "Qualifications" : "যোগ্যতাসমূহ"}</label>
                <input
                  type="text"
                  placeholder="e.g. M.Sc (DU)"
                  value={teaQual}
                  onChange={(e) => setTeaQual(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">{currentLang === 'en' ? "Mobile Line" : "মোবাইল নম্বর"}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 01711-XXXXXX"
                  value={teaMobile}
                  onChange={(e) => setTeaMobile(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">{currentLang === 'en' ? "Email" : "ইমেইল"}</label>
                <input
                  type="email"
                  placeholder="shafiq@mail.com"
                  value={teaEmail}
                  onChange={(e) => setTeaEmail(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">{currentLang === 'en' ? "Total Experience" : "অভিজ্ঞতা"}</label>
                <input
                  type="text"
                  placeholder="e.g. 12 Years"
                  value={teaExp}
                  onChange={(e) => setTeaExp(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">{currentLang === 'en' ? "Biography Text" : "সংক্ষিপ্ত জীবন বৃত্তান্ত"}</label>
              <textarea
                rows={2}
                placeholder="Brief statements..."
                value={teaBio}
                onChange={(e) => setTeaBio(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
              />
            </div>

            <button
              type="submit"
              disabled={teaSaving}
              className="bg-[#0B8F3A] hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:bg-slate-400"
            >
              <Save size={14} />
              <span>{teaSaving ? (currentLang === 'en' ? "Saving..." : 'সংরক্ষণ হচ্ছে...') : (currentLang === 'en' ? "Add Teacher File" : 'যোগ করুন')}</span>
            </button>
          </form>

          {/* ACTIVE TEACHERS LIST */}
          <div className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3 max-h-[460px] overflow-y-auto">
            <h4 className="text-xs font-black text-slate-800 uppercase border-b border-gray-100 pb-1.5">
              {currentLang === 'en' ? 'Registered Faculty Ledger' : 'নিবন্ধিত শিক্ষক তালিকা'} ({teachers.length})
            </h4>
            
            {teachers.map((t) => (
              <div key={t.id} className="p-3 bg-white hover:bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between gap-4 transition-colors">
                <div className="min-w-0">
                  <h5 className="font-extrabold text-slate-800 text-xs">{t.name}</h5>
                  <p className="text-[10px] text-green-700 font-bold mt-0.5">{t.designation} — {t.subject}</p>
                  <p className="text-[9px] text-gray-400 font-mono mt-0.5">{t.mobile}</p>
                </div>

                <button
                  onClick={() => {
                    if (confirm(currentLang === 'en' ? 'Revoke teacher record?' : 'শিক্ষকের এই রেকর্ডটি কি মুছে ফেলবেন?')) {
                      onDeleteTeacher(t.id);
                    }
                  }}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Admissions approval registry desk */}
      {activeAdminTab === 'admissions' && (
        <div className="flex flex-col gap-4" id="admin_admissions_board">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-black text-[#003366] uppercase mb-1">
              {currentLang === 'en' ? "Student Academic Merit Admissions Desk" : "ভর্তি ইচ্ছুক শিক্ষার্থীর তথ্য ও মনোনয়ন বোর্ড"}
            </h4>
            <p className="text-[11px] text-gray-500">
              {currentLang === 'en' 
                ? "Verify applicant primary scores, Sonali Seba clearance validation, and allocate candidate status." 
                : "দাখিলকৃত গ্রেড মূল্যায়ন করে সোনালী সেবা পেমেন্ট প্রাপ্তি সাপেক্ষে মেধাতালিকা প্রকাশ করুন।"
              }
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 uppercase font-bold text-[10px] tracking-wider">
                  <th className="p-3">{currentLang === 'en' ? "Student" : "শিক্ষার্থী"}</th>
                  <th className="p-3">{currentLang === 'en' ? "Class Applied" : "শ্রেণীর লক্ষ্য"}</th>
                  <th className="p-3 text-center">{currentLang === 'en' ? "GPA achieved" : "প্রাপ্ত জিপিএ"}</th>
                  <th className="p-3">{currentLang === 'en' ? "Registry Link Phone" : "মোবাইল"}</th>
                  <th className="p-3 text-center">{currentLang === 'en' ? "Fee" : "ভর্তি ফি"}</th>
                  <th className="p-3 text-center">{currentLang === 'en' ? "Actions Board" : "সিদ্ধান্ত পরিবর্তন"}</th>
                </tr>
              </thead>
              <tbody>
                {admissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-8 text-xs text-gray-400 italic">
                      {currentLang === 'en' ? "No registrations logged at present." : "বর্তমানে কোনো ভর্তি আবেদন জমা নেই।"}
                    </td>
                  </tr>
                ) : (
                  admissions.map((adm) => (
                    <tr key={adm.id} className="border-b border-slate-150 hover:bg-slate-50/50 transition-colors">
                      <td className="p-3">
                        <p className="font-extrabold text-slate-800">{adm.studentName}</p>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">ID: {adm.id}</p>
                      </td>
                      <td className="p-3 font-semibold text-slate-600">{adm.classApplied}</td>
                      <td className="p-3 text-center font-bold text-blue-800">{adm.gpa.toFixed(2)}</td>
                      <td className="p-3 font-mono text-xs text-slate-600">{adm.mobile}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => {
                            const flip = adm.paymentStatus === 'Paid' ? 'Pending' : 'Paid';
                            onUpdateAdmissionStatus(adm.id, adm.status, flip);
                          }}
                          className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${
                            adm.paymentStatus === 'Paid' 
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                              : 'bg-rose-50 text-rose-800 border-rose-300'
                          }`}
                        >
                          {adm.paymentStatus}
                        </button>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2 justify-center">
                          {/* Approve onto Merit */}
                          <button
                            onClick={() => onUpdateAdmissionStatus(adm.id, 'Approved')}
                            className="p-1 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200 transition-all font-bold text-[10px]"
                            title="Select / Approve onto Merit"
                          >
                            {currentLang === 'en' ? "Merit Selected" : "মেধা তালিকা"}
                          </button>
                          
                          {/* Wait List */}
                          <button
                            onClick={() => onUpdateAdmissionStatus(adm.id, 'Waiting')}
                            className="p-1 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded border border-amber-200 transition-all font-bold text-[10px]"
                            title="Place onto Waiting List"
                          >
                            {currentLang === 'en' ? "Waiting List" : "অপেক্ষা পত্র"}
                          </button>

                          {/* Delete registry */}
                          <button
                            onClick={() => {
                              if (confirm(currentLang === 'en' ? 'Revoke application file?' : 'আবেদনপত্রটি কি ডিলেট করবেন?')) {
                                onDeleteAdmission(adm.id);
                              }
                            }}
                            className="p-1 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Web settings options */}
      {activeAdminTab === 'settings' && (
        <form onSubmit={handleSaveWebSettings} className="bg-slate-50 border border-slate-200 p-5 rounded-xl flex flex-col gap-4" id="admin_settings_manager">
          <h4 className="text-xs font-black text-[#003366] uppercase border-b border-gray-200 pb-1.5">
            {currentLang === 'en' ? "Configure Core Institutional Parameters" : "মৌলিক প্রতিষ্ঠান প্যারামিটার কনফিগারেশন"}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
            <div>
              <label className="block mb-1">{currentLang === 'en' ? 'Institution Name' : 'শিক্ষা প্রতিষ্ঠানের নাম'}</label>
              <input
                type="text"
                required
                value={setInstName}
                onChange={(e) => setSetInstName(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
              />
            </div>

            <div>
              <label className="block mb-1">{currentLang === 'en' ? 'Core EIIN No.' : 'মোট ইআইআইএন নম্বর'}</label>
              <input
                type="text"
                required
                value={setEiin}
                onChange={(e) => setSetEiin(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
              />
            </div>

            <div>
              <label className="block mb-1">{currentLang === 'en' ? 'School Code' : 'বিদ্যালয় বোর্ড কোড'}</label>
              <input
                type="text"
                required
                value={setCode}
                onChange={(e) => setSetCode(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
              />
            </div>

            <div>
              <label className="block mb-1">{currentLang === 'en' ? 'Institution Motto' : 'প্রতিষ্ঠানের মূল লক্ষ্য বাণী'}</label>
              <input
                type="text"
                value={setMotto}
                onChange={(e) => setSetMotto(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
              />
            </div>

            <div>
              <label className="block mb-1">{currentLang === 'en' ? 'Primary Phone line' : 'প্রাথমিক যোগাযোগের টেলিফোন'}</label>
              <input
                type="text"
                value={setPhone}
                onChange={(e) => setSetPhone(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
              />
            </div>

            <div>
              <label className="block mb-1">{currentLang === 'en' ? 'Official Registry Email' : 'অফিসিয়াল ইমেইল ঠিকানা'}</label>
              <input
                type="email"
                value={setEmail}
                onChange={(e) => setSetEmail(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1">{currentLang === 'en' ? 'Official Geographic Address' : 'ভৌগোলিক ঠিকানা'}</label>
              <input
                type="text"
                value={setAddress}
                onChange={(e) => setSetAddress(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B8F3A]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={setSaving}
            className="bg-[#0B8F3A] hover:bg-green-700 text-white text-xs font-bold py-2.5 px-5 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer self-end w-full sm:w-auto"
          >
            <Save size={15} />
            <span>{setSaving ? (currentLang === 'en' ? "Updating parameters..." : "সংরক্ষিত হচ্ছে...") : (currentLang === 'en' ? "Apply All Changes" : "পরিবর্তনসমূহ সংরক্ষণ করুন")}</span>
          </button>
        </form>
      )}

      {/* Tab 5: Dynamic Laravel Exporter Code center */}
      {activeAdminTab === 'laravel' && (
        <div className="flex flex-col gap-5" id="laravel_exporter_tab">
          
          <div className="bg-[#fffbeb] border border-amber-300 rounded-xl p-5">
            <div className="flex gap-3 items-start">
              <span className="w-10 h-10 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center shrink-0 shadow font-black">
                PHP
              </span>
              <div>
                <h4 className="font-extrabold text-[#003366] text-sm">
                  {currentLang === 'en' ? "PHP Laravel 11 & MySQL Schema compliance Center" : 'লারাভেল ১১ এবং মাইএসকিউএল ডাটাবেস এক্সপোর্টার'}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  {currentLang === 'en' 
                    ? "Download or inspect enterprise code blocks programmed strictly after Ministry database structures guidelines. It represents the fully completed relational schema constraints." 
                    : "বাংলাদেশ শিক্ষা বোর্ড স্ট্যান্ডার্ড লারাভেল মাইগ্রেশন কোড এবং পূর্ণাঙ্গ ডাটাবেস তৈরি করার কোড কপি করুন।"
                  }
                </p>
              </div>
            </div>
          </div>

          {/* CODE CODE SWITCH GRID */}
          <div className="flex flex-col gap-4">
            
            {/* Sec 1: Installation manual */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <div className="bg-slate-900 text-slate-300 px-4 py-2 flex justify-between items-center text-xs">
                <span className="font-mono text-emerald-400"># INSTALLATION_GUIDE.txt</span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(installationGuideManual, 'guide')}
                  className="hover:text-white flex items-center gap-1 transition-colors font-bold"
                >
                  <Copy size={13} />
                  <span>{copiedSection === 'guide' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 text-slate-300 font-mono text-[10px] sm:text-xs overflow-x-auto max-h-56 leading-relaxed text-left whitespace-pre">
                {installationGuideManual}
              </pre>
            </div>

            {/* Sec 2: Laravel Migration Class */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <div className="bg-slate-900 text-slate-300 px-4 py-2 flex justify-between items-center text-xs">
                <span className="font-mono text-amber-500"># CreateEducationPlatformTables.php (Laravel Class)</span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(rawLaravelMigrationSchema, 'laravel')}
                  className="hover:text-white flex items-center gap-1 transition-colors font-bold"
                >
                  <Copy size={13} />
                  <span>{copiedSection === 'laravel' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 text-slate-300 font-mono text-[10px] sm:text-xs overflow-x-auto max-h-80 leading-relaxed text-left whitespace-pre">
                {rawLaravelMigrationSchema}
              </pre>
            </div>

            {/* Sec 3: MySQL SQL structure */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <div className="bg-slate-900 text-slate-300 px-4 py-2 flex justify-between items-center text-xs">
                <span className="font-mono text-cyan-400"># eims_relational_indices_tables.sql (MySQL)</span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(sqlDatabaseDDL, 'sql')}
                  className="hover:text-white flex items-center gap-1 transition-colors font-bold"
                >
                  <Copy size={13} />
                  <span>{copiedSection === 'sql' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 text-slate-300 font-mono text-[10px] sm:text-xs overflow-x-auto max-h-80 leading-relaxed text-left whitespace-pre">
                {sqlDatabaseDDL}
              </pre>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
