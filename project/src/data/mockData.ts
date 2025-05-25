import { SoftwareApplication, AccessRequest } from '../types';
import { format, subDays } from 'date-fns';

// Software Applications
export const applications: SoftwareApplication[] = [
  {
    id: '1',
    name: 'Salesforce CRM',
    description: 'Customer relationship management platform',
    category: 'Sales',
    accessLevels: [
      { id: '101', name: 'Viewer', description: 'Can view records but not modify them' },
      { id: '102', name: 'Editor', description: 'Can create and edit records' },
      { id: '103', name: 'Admin', description: 'Full administrative access' }
    ]
  },
  {
    id: '2',
    name: 'Microsoft 365',
    description: 'Productivity and collaboration suite',
    category: 'Productivity',
    accessLevels: [
      { id: '201', name: 'Basic', description: 'Email and basic Office applications' },
      { id: '202', name: 'Standard', description: 'All Office applications and basic services' },
      { id: '203', name: 'Premium', description: 'All applications and advanced services' }
    ]
  },
  {
    id: '3',
    name: 'Adobe Creative Cloud',
    description: 'Suite of design and creative applications',
    category: 'Design',
    accessLevels: [
      { id: '301', name: 'Single App', description: 'Access to one Adobe application' },
      { id: '302', name: 'All Apps', description: 'Access to all Creative Cloud applications' }
    ]
  },
  {
    id: '4',
    name: 'Jira',
    description: 'Issue tracking and project management',
    category: 'Development',
    accessLevels: [
      { id: '401', name: 'Viewer', description: 'Can view issues and boards' },
      { id: '402', name: 'Developer', description: 'Can create and update issues' },
      { id: '403', name: 'Admin', description: 'Full administrative access' }
    ]
  },
  {
    id: '5',
    name: 'Slack',
    description: 'Team communication platform',
    category: 'Communication',
    accessLevels: [
      { id: '501', name: 'Member', description: 'Regular team member' },
      { id: '502', name: 'Admin', description: 'Workspace administration' }
    ]
  },
  {
    id: '6',
    name: 'AWS Console',
    description: 'Amazon Web Services management console',
    category: 'Cloud',
    accessLevels: [
      { id: '601', name: 'Read Only', description: 'View-only access to resources' },
      { id: '602', name: 'Power User', description: 'Can create and manage most resources' },
      { id: '603', name: 'Administrator', description: 'Full access to all services' }
    ]
  }
];

// Generate dates for mock data
const today = new Date();
const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

// Access Requests
export const accessRequests: AccessRequest[] = [
  {
    id: '1001',
    userId: '1',
    userName: 'John Employee',
    applicationId: '1',
    applicationName: 'Salesforce CRM',
    accessLevelId: '102',
    accessLevelName: 'Editor',
    reason: 'Need to update customer records for my new sales role',
    status: 'pending',
    requestDate: formatDate(today)
  },
  {
    id: '1002',
    userId: '1',
    userName: 'John Employee',
    applicationId: '5',
    applicationName: 'Slack',
    accessLevelId: '501',
    accessLevelName: 'Member',
    reason: 'Need to join the sales team workspace for communication',
    status: 'approved',
    requestDate: formatDate(subDays(today, 3)),
    reviewDate: formatDate(subDays(today, 2)),
    reviewerId: '2',
    reviewerName: 'Jane Manager',
    reviewNotes: 'Approved as per department policy'
  },
  {
    id: '1003',
    userId: '1',
    userName: 'John Employee',
    applicationId: '3',
    applicationName: 'Adobe Creative Cloud',
    accessLevelId: '301',
    accessLevelName: 'Single App',
    reason: 'Need Photoshop for creating sales presentations',
    status: 'rejected',
    requestDate: formatDate(subDays(today, 5)),
    reviewDate: formatDate(subDays(today, 4)),
    reviewerId: '2',
    reviewerName: 'Jane Manager',
    reviewNotes: 'We use PowerPoint for presentations, no need for Photoshop'
  },
  {
    id: '1004',
    userId: '4',
    userName: 'Sarah Developer',
    applicationId: '4',
    applicationName: 'Jira',
    accessLevelId: '402',
    accessLevelName: 'Developer',
    reason: 'Joining the development team, need access to project boards',
    status: 'pending',
    requestDate: formatDate(subDays(today, 1))
  },
  {
    id: '1005',
    userId: '5',
    userName: 'Michael Analyst',
    applicationId: '2',
    applicationName: 'Microsoft 365',
    accessLevelId: '203',
    accessLevelName: 'Premium',
    reason: 'Need Power BI and advanced Excel features for data analysis',
    status: 'pending',
    requestDate: formatDate(today)
  },
  {
    id: '1006',
    userId: '6',
    userName: 'Emily Marketing',
    applicationId: '3',
    applicationName: 'Adobe Creative Cloud',
    accessLevelId: '302',
    accessLevelName: 'All Apps',
    reason: 'Need full suite for marketing materials creation',
    status: 'approved',
    requestDate: formatDate(subDays(today, 7)),
    reviewDate: formatDate(subDays(today, 6)),
    reviewerId: '7',
    reviewerName: 'David Marketing Manager',
    reviewNotes: 'Approved as per marketing team requirements'
  }
];