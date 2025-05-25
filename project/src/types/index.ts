export interface SoftwareApplication {
  id: string;
  name: string;
  description: string;
  category: string;
  accessLevels: AccessLevel[];
}

export interface AccessLevel {
  id: string;
  name: string;
  description: string;
}

export interface AccessRequest {
  id: string;
  userId: string;
  userName: string;
  applicationId: string;
  applicationName: string;
  accessLevelId: string;
  accessLevelName: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  reviewDate?: string;
  reviewerId?: string;
  reviewerName?: string;
  reviewNotes?: string;
}