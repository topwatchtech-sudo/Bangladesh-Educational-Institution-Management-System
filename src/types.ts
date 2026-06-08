/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type NoticeCategory = 'General' | 'Academic' | 'Admission' | 'Exam' | 'Emergency';

export interface Notice {
  id: string;
  title: string;
  category: NoticeCategory;
  date: string;
  description: string;
  fileUrl?: string;
  isImportant?: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  subject: string;
  qualification: string;
  mobile: string;
  email: string;
  joiningDate: string;
  experience: string;
  biography: string;
  photoUrl: string;
}

export interface Staff {
  id: string;
  name: string;
  designation: string;
  department: string;
  contact: string;
  email: string;
  photoUrl: string;
}

export interface ClassStat {
  className: string;
  boys: number;
  girls: number;
  total: number;
  sections: number;
}

export interface GpaStat {
  year: string;
  gpa5Count: number;
  passRate: number;
}

export interface StudentStats {
  totalStudents: number;
  totalBoys: number;
  totalGirls: number;
  passRate: number;
  classStats: ClassStat[];
  gpaStats: GpaStat[];
}

export type AdmissionStatus = 'Applied' | 'Approved' | 'Waiting' | 'Rejected';

export interface Admission {
  id: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  gender: string;
  dob: string;
  classApplied: string;
  previousSchool: string;
  gpa: number;
  mobile: string;
  email: string;
  status: AdmissionStatus;
  paymentStatus: 'Pending' | 'Paid';
  appliedDate: string;
}

export type DownloadCategory = 'Admission Form' | 'Leave Form' | 'Government Circular' | 'Academic Documents' | 'Other Downloads';

export interface DownloadItem {
  id: string;
  title: string;
  category: DownloadCategory;
  date: string;
  fileSize: string;
}

export type NewsCategory = 'National Day' | 'Sports' | 'Cultural' | 'Achievement' | 'General';

export interface NewsEvent {
  id: string;
  title: string;
  category: NewsCategory;
  date: string;
  description: string;
  photoUrl: string;
}

export interface CustomSlide {
  id: string;
  photoUrl: string;
  caption: string;
}

export interface ImportantLink {
  id: string;
  title: string;
  url: string;
}

export interface InstitutionSettings {
  institutionName: string;
  eiin: string;
  schoolCode: string;
  established: string;
  phone: string;
  email: string;
  address: string;
  motto: string;
  principalName: string;
  principalMessage: string;
  principalPhoto: string;
  vicePrincipalName: string;
  vicePrincipalMessage: string;
  vicePrincipalPhoto: string;
  nationalAnthemUrl: string;
  emergencyPhone: string;
  visitorCounter: number;
  sliderImages: CustomSlide[];
  importantLinks: ImportantLink[];
}
