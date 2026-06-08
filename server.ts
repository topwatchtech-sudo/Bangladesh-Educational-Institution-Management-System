/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import { 
  Notice, Teacher, Staff, StudentStats, Admission, 
  DownloadItem, NewsEvent, InstitutionSettings 
} from "./src/types";

const app = express();
const PORT = 3000;

app.use(express.json());

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "db.json");

// Define comprehensive seed database conforming to Ministry of Education guidelines
const DEFAULT_SETTINGS: InstitutionSettings = {
  institutionName: "Dhaka Collegiate Government High School",
  eiin: "108342",
  schoolCode: "2043",
  established: "1835",
  phone: "+880 2-9563212",
  email: "info@dhakacollegiate.edu.bd",
  address: "Sadarghat, Dhaka-1100, Bangladesh",
  motto: "Knowledge, Discipline, and Progress",
  principalName: "Siddiqur Rahman Sheikh",
  principalMessage: "Our historic institution has been a beacon of light of modern secondary education in Bengal since 1835. Dhaka Collegiate School strives to cultivate critical thinking, respect, and academic distinction. We welcome you to our web portal to access official notice boards, academic routines, admission portals, and direct progress stats.",
  principalPhoto: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400",
  vicePrincipalName: "Begum Dilruba Yasmin",
  vicePrincipalMessage: "Digital education and structured academic discipline prepare our students for global leadership. As we match EMIS guidelines of DSHE, we are fully committed to accessibility, standard testing platforms, and robust interactive curricular resources.",
  vicePrincipalPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
  nationalAnthemUrl: "https://r3---sn-n0co-agpe.googlevideo.com/videoplayback?expire=... (Mock HTML5 Audio Fallback)",
  emergencyPhone: "01711-234567, 999, 333",
  visitorCounter: 14205,
  sliderImages: [
    {
      id: "slide_1",
      photoUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200",
      caption: "Main Academic Building and Historic Central Assembly Lawn"
    },
    {
      id: "slide_2",
      photoUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1200",
      caption: "Interactive Modern Computer Lab Funded under ICT in Education Project"
    },
    {
      id: "slide_3",
      photoUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200",
      caption: "Annual Sports Day and National Flag Hoisting Ceremony"
    }
  ],
  importantLinks: [
    { id: "link_1", title: "Ministry of Education (moedu.gov.bd)", url: "https://moedu.gov.bd" },
    { id: "link_2", title: "Directorate of Secondary and Higher Education (dshe.gov.bd)", url: "https://dshe.gov.bd" },
    { id: "link_3", title: "Education Board Bangladesh (educationboard.gov.bd)", url: "http://www.educationboard.gov.bd" },
    { id: "link_4", title: "EMIS Portal DSHE (emis.gov.bd)", url: "https://www.emis.gov.bd" },
    { id: "link_5", title: "National Web Portal of Bangladesh (bangladesh.gov.bd)", url: "https://bangladesh.gov.bd" }
  ]
};

const DEFAULT_NOTICES: Notice[] = [
  {
    id: "notice_1",
    title: "SSC Final Model Test Examination Schedule - 2026",
    category: "Exam",
    date: "2026-06-05",
    description: "The schedule for the final SSC preparative model test examination has been released. The tests will commence on 2026-06-15. Attendance is mandatory. Admit cards must be collected from class teachers before June 12th.",
    isImportant: true
  },
  {
    id: "notice_2",
    title: "Class XI Admission General Guideline and Merit Selection List- 2026",
    category: "Admission",
    date: "2026-06-02",
    description: "The second phase merit selection list for Class XI admission has been updated in our database. Selected candidates are requested to complete registrations and fee payments by June 10, 2026.",
    isImportant: true
  },
  {
    id: "notice_3",
    title: "Closing of Campus on Account of National Day Celebration",
    category: "Emergency",
    date: "2026-06-06",
    description: "In observance of national day, all administrative and academic classrooms shall remain closed on June 10, 2026. A morning tribute and hoisting of the national flag will begin at 08:00 AM on premise.",
    isImportant: false
  },
  {
    id: "notice_4",
    title: "Revised Class Routine for Sixth and Seventh Grade (New Curriculum)",
    category: "Academic",
    date: "2026-05-28",
    description: "A minor revision has been made to the class routine of Class 6 and 7 to optimize ICT laboratory hours. Students are requested to view or download the latest syllabus from the Academic panel.",
    isImportant: false
  }
];

const DEFAULT_TEACHERS: Teacher[] = [
  {
    id: "teacher_1",
    name: "Mohammad Abdul Halim",
    designation: "Assistant Headmaster",
    subject: "Mathematics & Statistics",
    qualification: "M.Sc in Applied Mathematics (DU), B.Ed (First Class)",
    mobile: "01712-445566",
    email: "halim.math@dhakacollegiate.edu.bd",
    joiningDate: "1997-03-12",
    experience: "16 Years in Govt. High Schools",
    biography: "Mohammad Abdul Halim has spent nearly three decades inspiring generations of students in advanced mathematics. He serves as the chief coordinator of STEM and district scientific fairs.",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "teacher_2",
    name: "Nusrat Jahan Chowdhury",
    designation: "Senior Teacher",
    subject: "English Language & Literature",
    qualification: "M.A. in English (CU), CELTA Certified",
    mobile: "01819-556677",
    email: "nusrat.eng@dhakacollegiate.edu.bd",
    joiningDate: "2008-09-15",
    experience: "15 Years",
    biography: "An ardent promoter of English debating, Mrs. Nusrat is credited with launching the collegiate English Literary and Debate Club which recently secured divisional awards.",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "teacher_3",
    name: "Dr. Biplob Kumar Das",
    designation: "Lecturer / Senior Teacher",
    subject: "Chemistry & General Science",
    qualification: "Ph.D in Materials Science (RU), M.Sc in Chemistry",
    mobile: "01911-334455",
    email: "biplob.chem@dhakacollegiate.edu.bd",
    joiningDate: "2012-05-20",
    experience: "14 Years",
    biography: "Dr. Das organizes high-school biochemistry labs and prepares materials for the National Science Olympiad in Bangladesh.",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "teacher_4",
    name: "Ferdousi Rahman Tania",
    designation: "Assistant Teacher",
    subject: "ICT & Digital Technology",
    qualification: "B.Sc in CSE (BUET)",
    mobile: "01552-887766",
    email: "tania.cs@dhakacollegiate.edu.bd",
    joiningDate: "2018-01-10",
    experience: "8 Years",
    biography: "Tania handles the state of the art ICT Lab and oversees student compliance metrics for EMIS submission databases.",
    photoUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200"
  }
];

const DEFAULT_STAFF: Staff[] = [
  {
    id: "staff_1",
    name: "Abu Bakr Siddique",
    designation: "Chief Admin Officer / Head Clerk",
    department: "Administration",
    contact: "01715-998822",
    email: "abubakr@dhakacollegiate.edu.bd",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "staff_2",
    name: "Shahnaz Begum",
    designation: "Chief Librarian",
    department: "Library & Archives",
    contact: "01815-112233",
    email: "shahnaz@dhakacollegiate.edu.bd",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  }
];

const DEFAULT_STUDENT_STATS: StudentStats = {
  totalStudents: 1450,
  totalBoys: 1450, // Boys school example (traditional collegiate style) or co-ed.
  totalGirls: 0,
  passRate: 98.6,
  classStats: [
    { className: "Class 6", boys: 280, girls: 0, total: 280, sections: 4 },
    { className: "Class 7", boys: 290, girls: 0, total: 290, sections: 4 },
    { className: "Class 8", boys: 300, girls: 0, total: 300, sections: 4 },
    { className: "Class 9", boys: 295, girls: 0, total: 295, sections: 5 },
    { className: "Class 10", boys: 285, girls: 0, total: 285, sections: 4 }
  ],
  gpaStats: [
    { year: "2021", gpa5Count: 165, passRate: 97.8 },
    { year: "2022", gpa5Count: 182, passRate: 98.4 },
    { year: "2023", gpa5Count: 174, passRate: 99.1 },
    { year: "2024", gpa5Count: 195, passRate: 98.9 },
    { year: "2025", gpa5Count: 208, passRate: 99.6 }
  ]
};

const DEFAULT_NEWS: NewsEvent[] = [
  {
    id: "news_1",
    title: "Joyous Obserance of Pohela Boishakh on Campus Yards",
    category: "Cultural",
    date: "2026-04-14",
    description: "The campus came alive with traditional musical presentations, regional crafts stalls, and poetic recitals celebrating our cultural heritage.",
    photoUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "news_2",
    title: "Dhaka Collegiate Secures Runner-up in National Science Fair",
    category: "Achievement",
    date: "2026-05-10",
    description: "Our junior innovation robotics group secured the second national place in Category B for their IoT-driven solar river sanitation float.",
    photoUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400"
  }
];

const DEFAULT_DOWNLOADS: DownloadItem[] = [
  { id: "dl_1", title: "Official Class XI Admission Form (PDF)", category: "Admission Form", date: "2026-06-01", fileSize: "1.4 MB" },
  { id: "dl_2", title: "Syllabus and Assessment Outline for New Curriculum (Grade VI-IX)", category: "Academic Documents", date: "2026-05-20", fileSize: "3.2 MB" },
  { id: "dl_3", title: "Teacher's Medical/Casual Leave Requisition Sheet", category: "Leave Form", date: "2026-01-15", fileSize: "250 KB" },
  { id: "dl_4", title: "Government Gazetted Academic Holiday List 2026", category: "Government Circular", date: "2025-12-28", fileSize: "950 KB" }
];

const DEFAULT_ADMISSIONS: Admission[] = [
  {
    id: "adm_1",
    studentName: "Tahsan Islam Alvee",
    fatherName: "Kamrul Islam",
    motherName: "Rihana Akhter",
    gender: "Male",
    dob: "2013-08-14",
    classApplied: "Class 6",
    previousSchool: "Sadarghat Primary School",
    gpa: 5.0,
    mobile: "01755-123456",
    email: "tahsan.alvee@gmail.com",
    status: "Approved",
    paymentStatus: "Paid",
    appliedDate: "2026-06-01"
  },
  {
    id: "adm_2",
    studentName: "Rezwanul Hoque Fahim",
    fatherName: "Zahidul Hoque",
    motherName: "Sayeeda Begum",
    gender: "Male",
    dob: "2012-05-22",
    classApplied: "Class 7",
    previousSchool: "Dhaka Collegiate Primary Section",
    gpa: 4.8,
    mobile: "01844-654321",
    email: "fahim.hoque@gmail.com",
    status: "Applied",
    paymentStatus: "Pending",
    appliedDate: "2026-06-04"
  }
];

// Combine all into simple master DB object
let localDB = {
  settings: DEFAULT_SETTINGS,
  notices: DEFAULT_NOTICES,
  teachers: DEFAULT_TEACHERS,
  staff: DEFAULT_STAFF,
  studentStats: DEFAULT_STUDENT_STATS,
  news: DEFAULT_NEWS,
  downloads: DEFAULT_DOWNLOADS,
  admissions: DEFAULT_ADMISSIONS,
  visitorLogs: [] as any[]
};

// Handle file loading & persistence
function loadDatabase() {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      localDB = { ...localDB, ...JSON.parse(raw) };
      console.log("Database initialized from disk.");
    } else {
      saveDatabase();
      console.log("Database file seeded and initialized.");
    }
  } catch (error) {
    console.error("Failed to load DB. falling back to in-memory store:", error);
  }
}

function saveDatabase() {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(localDB, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write DB:", error);
  }
}

loadDatabase();

// API Endpoints
// settings
app.get("/api/settings", (req, res) => {
  // Increment visitor counter on root load
  localDB.settings.visitorCounter += 1;
  saveDatabase();
  res.json(localDB.settings);
});

app.post("/api/settings", (req, res) => {
  localDB.settings = { ...localDB.settings, ...req.body };
  saveDatabase();
  res.json({ success: true, settings: localDB.settings });
});

// notices
app.get("/api/notices", (req, res) => {
  res.json(localDB.notices);
});

app.post("/api/notices", (req, res) => {
  const newNotice: Notice = {
    id: `notice_${Date.now()}`,
    title: req.body.title || "No Title",
    category: req.body.category || "General",
    date: req.body.date || new Date().toISOString().split("T")[0],
    description: req.body.description || "",
    isImportant: !!req.body.isImportant,
    fileUrl: req.body.fileUrl || ""
  };
  localDB.notices.unshift(newNotice);
  saveDatabase();
  res.status(201).json(newNotice);
});

app.delete("/api/notices/:id", (req, res) => {
  localDB.notices = localDB.notices.filter((n) => n.id !== req.params.id);
  saveDatabase();
  res.json({ success: true });
});

// teachers
app.get("/api/teachers", (req, res) => {
  res.json(localDB.teachers);
});

app.post("/api/teachers", (req, res) => {
  const newTeacher: Teacher = {
    id: `teacher_${Date.now()}`,
    name: req.body.name || "Unnamed Teacher",
    designation: req.body.designation || "Assistant Teacher",
    subject: req.body.subject || "General Science",
    qualification: req.body.qualification || "",
    mobile: req.body.mobile || "",
    email: req.body.email || "",
    joiningDate: req.body.joiningDate || new Date().toISOString().split("T")[0],
    experience: req.body.experience || "0 Years",
    biography: req.body.biography || "",
    photoUrl: req.body.photoUrl || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200"
  };
  localDB.teachers.push(newTeacher);
  saveDatabase();
  res.status(201).json(newTeacher);
});

app.delete("/api/teachers/:id", (req, res) => {
  localDB.teachers = localDB.teachers.filter((t) => t.id !== req.params.id);
  saveDatabase();
  res.json({ success: true });
});

// staffs
app.get("/api/staff", (req, res) => {
  res.json(localDB.staff);
});

app.post("/api/staff", (req, res) => {
  const newStaff: Staff = {
    id: `staff_${Date.now()}`,
    name: req.body.name || "Unnamed Staff",
    designation: req.body.designation || "Office Guard",
    department: req.body.department || "General Administration",
    contact: req.body.contact || "",
    email: req.body.email || "",
    photoUrl: req.body.photoUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
  };
  localDB.staff.push(newStaff);
  saveDatabase();
  res.status(201).json(newStaff);
});

app.delete("/api/staff/:id", (req, res) => {
  localDB.staff = localDB.staff.filter((s) => s.id !== req.params.id);
  saveDatabase();
  res.json({ success: true });
});

// studentStats
app.get("/api/student-stats", (req, res) => {
  res.json(localDB.studentStats);
});

app.post("/api/student-stats", (req, res) => {
  localDB.studentStats = { ...localDB.studentStats, ...req.body };
  saveDatabase();
  res.json(localDB.studentStats);
});

// news-events
app.get("/api/news", (req, res) => {
  res.json(localDB.news);
});

app.post("/api/news", (req, res) => {
  const newNews: NewsEvent = {
    id: `news_${Date.now()}`,
    title: req.body.title || "No News Title",
    category: req.body.category || "General",
    date: req.body.date || new Date().toISOString().split("T")[0],
    description: req.body.description || "",
    photoUrl: req.body.photoUrl || "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=400"
  };
  localDB.news.unshift(newNews);
  saveDatabase();
  res.status(201).json(newNews);
});

app.delete("/api/news/:id", (req, res) => {
  localDB.news = localDB.news.filter((n) => n.id !== req.params.id);
  saveDatabase();
  res.json({ success: true });
});

// downloads
app.get("/api/downloads", (req, res) => {
  res.json(localDB.downloads);
});

app.post("/api/downloads", (req, res) => {
  const newItem: DownloadItem = {
    id: `dl_${Date.now()}`,
    title: req.body.title || "Download Item",
    category: req.body.category || "Other Downloads",
    date: req.body.date || new Date().toISOString().split("T")[0],
    fileSize: req.body.fileSize || "1.2 MB"
  };
  localDB.downloads.unshift(newItem);
  saveDatabase();
  res.status(201).json(newItem);
});

app.delete("/api/downloads/:id", (req, res) => {
  localDB.downloads = localDB.downloads.filter((d) => d.id !== req.params.id);
  saveDatabase();
  res.json({ success: true });
});

// admissions
app.get("/api/admissions", (req, res) => {
  res.json(localDB.admissions);
});

app.post("/api/admissions", (req, res) => {
  const newAdm: Admission = {
    id: `adm_${Date.now()}`,
    studentName: req.body.studentName || "",
    fatherName: req.body.fatherName || "",
    motherName: req.body.motherName || "",
    gender: req.body.gender || "Male",
    dob: req.body.dob || "",
    classApplied: req.body.classApplied || "Class 6",
    previousSchool: req.body.previousSchool || "",
    gpa: parseFloat(req.body.gpa) || 5.0,
    mobile: req.body.mobile || "",
    email: req.body.email || "",
    status: "Applied",
    paymentStatus: req.body.paymentStatus || "Pending",
    appliedDate: new Date().toISOString().split("T")[0]
  };
  localDB.admissions.unshift(newAdm);
  saveDatabase();
  res.status(201).json(newAdm);
});

app.patch("/api/admissions/:id", (req, res) => {
  const item = localDB.admissions.find((a) => a.id === req.params.id);
  if (item) {
    if (req.body.status) item.status = req.body.status;
    if (req.body.paymentStatus) item.paymentStatus = req.body.paymentStatus;
    saveDatabase();
    res.json(item);
  } else {
    res.status(404).json({ error: "Application not found" });
  }
});

app.delete("/api/admissions/:id", (req, res) => {
  localDB.admissions = localDB.admissions.filter((a) => a.id !== req.params.id);
  saveDatabase();
  res.json({ success: true });
});

// EMIS / IMS data exporter helper endpoint
app.get("/api/emis/export", (req, res) => {
  const format = req.query.type === "json" ? "json" : "csv";
  
  if (format === "json") {
    const report = {
      institution: {
        name: localDB.settings.institutionName,
        eiin: localDB.settings.eiin,
        code: localDB.settings.schoolCode,
        timestamp: new Date().toISOString()
      },
      reportingStatistics: localDB.studentStats,
      certifiedPersonnel: localDB.teachers.map(t => ({
        name: t.name,
        slug: t.designation,
        subject: t.subject,
        mpoActive: true,
        joined: t.joiningDate,
        contact: t.mobile
      }))
    };
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", "attachment; filename=emis_reporting_packet.json");
    return res.send(JSON.stringify(report, null, 2));
  } else {
    // Generate styled CSV
    let csv = "EMIS/IMS BANGLADESH EDUCATION COMPLIANCE REPORT\n";
    csv += `Institution,${localDB.settings.institutionName}\n`;
    csv += `EIIN,${localDB.settings.eiin}\n`;
    csv += `School Code,${localDB.settings.schoolCode}\n`;
    csv += `Report Generated,${new Date().toISOString().split("T")[0]}\n\n`;
    
    csv += "STUDENT ENROLLMENT STATISTICS BY CLASS\n";
    csv += "Class Name,Boys,Girls,Total,Sections\n";
    localDB.studentStats.classStats.forEach(st => {
      csv += `"${st.className}",${st.boys},${st.girls},${st.total},${st.sections}\n`;
    });
    csv += `TOTALS,${localDB.studentStats.totalBoys},${localDB.studentStats.totalGirls},${localDB.studentStats.totalStudents}\n\n`;
    
    csv += "CERTIFIED TEACHERS AND ASSIGNED LECTURERS\n";
    csv += "Name,Designation,Subject,Email,Core Contact\n";
    localDB.teachers.forEach(t => {
      csv += `"${t.name}","${t.designation}","${t.subject}","${t.email}","${t.mobile}"\n`;
    });
    
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=emis_reporting_packet.csv");
    return res.send(csv);
  }
});

// Configure Vite middleware and static fallbacks
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite();
