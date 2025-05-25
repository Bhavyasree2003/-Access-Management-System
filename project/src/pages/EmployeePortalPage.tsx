import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { applications, accessRequests } from '../data/mockData';
import { AccessRequest } from '../types';
import { Plus, Search, Clock, CheckCircle, XCircle } from 'lucide-react';

const EmployeePortalPage: React.FC = () => {
  const { user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter requests for the current user
  const userRequests = accessRequests.filter(
    req => req.userId === user?.id || user?.role === 'admin'
  );
  
  // Filter by search term
  const filteredRequests = userRequests.filter(
    req => req.applicationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           req.accessLevelName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employee Portal</h1>
          <p className="mt-1 text-slate-600">
            Request access to software applications and track your requests.
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="btn btn-primary mt-4 md:mt-0"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Request
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Request Form */}
      {isFormOpen && (
        <RequestForm onClose={() => setIsFormOpen(false)} />
      )}

      {/* Requests List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Application
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Access Level
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Request Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <RequestRow key={request.id} request={request} />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-slate-500">
                    {searchTerm ? 'No matching requests found.' : 'No access requests yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const RequestRow: React.FC<{ request: AccessRequest }> = ({ request }) => {
  const statusIcons = {
    pending: <Clock className="h-5 w-5 text-warning-500" />,
    approved: <CheckCircle className="h-5 w-5 text-success-500" />,
    rejected: <XCircle className="h-5 w-5 text-error-500" />
  };

  const statusText = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected'
  };

  const statusClasses = {
    pending: 'bg-warning-50 text-warning-700',
    approved: 'bg-success-50 text-success-700',
    rejected: 'bg-error-50 text-error-700'
  };

  return (
    <tr className="hover:bg-slate-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
        {request.applicationName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
        {request.accessLevelName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
        {request.requestDate}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex items-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[request.status]}`}>
            {statusIcons[request.status]}
            <span className="ml-1">{statusText[request.status]}</span>
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-slate-600">
        {request.reviewNotes || '-'}
      </td>
    </tr>
  );
};

const RequestForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    applicationId: '',
    accessLevelId: '',
    reason: ''
  });
  const [selectedAccessLevels, setSelectedAccessLevels] = useState<Array<{id: string, name: string}>>([]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'applicationId') {
      const app = applications.find(a => a.id === value);
      setSelectedAccessLevels(app?.accessLevels || []);
      setFormData({
        ...formData,
        applicationId: value,
        accessLevelId: ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    // For this demo, we'll just close the form
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6 animate-slide-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-900">New Access Request</h2>
        <button 
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700"
        >
          <XCircle className="h-5 w-5" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="applicationId" className="block text-sm font-medium text-slate-700">
              Application
            </label>
            <select
              id="applicationId"
              name="applicationId"
              value={formData.applicationId}
              onChange={handleChange}
              required
              className="input mt-1"
            >
              <option value="">Select an application</option>
              {applications.map(app => (
                <option key={app.id} value={app.id}>
                  {app.name} - {app.description}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="accessLevelId" className="block text-sm font-medium text-slate-700">
              Access Level
            </label>
            <select
              id="accessLevelId"
              name="accessLevelId"
              value={formData.accessLevelId}
              onChange={handleChange}
              required
              disabled={!formData.applicationId}
              className="input mt-1"
            >
              <option value="">Select access level</option>
              {selectedAccessLevels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.name} - {level.description}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-slate-700">
              Reason for Request
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows={3}
              className="input mt-1"
              placeholder="Please explain why you need access to this application..."
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeePortalPage;