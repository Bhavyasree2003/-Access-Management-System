import React, { useState } from 'react';
import { accessRequests } from '../data/mockData';
import { AccessRequest } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Search, Clock, Filter, Info, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const ManagerApprovalPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedRequest, setSelectedRequest] = useState<AccessRequest | null>(null);
  
  // Filter requests based on manager's department and admin override
  const filteredRequests = accessRequests.filter(req => {
    const matchesSearch = req.applicationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    
    // Admins can see all requests
    if (user?.role === 'admin') {
      return matchesSearch && matchesStatus;
    }
    
    // Managers can only see requests from their department
    return matchesSearch && matchesStatus && !req.reviewerId;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          {user?.role === 'admin' ? 'Admin Approval Overview' : 'Manager Review Panel'}
        </h1>
        <p className="mt-1 text-slate-600">
          {user?.role === 'admin' 
            ? 'Monitor and manage all access requests across departments.'
            : 'Review and process access requests from your team members.'}
        </p>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="input pl-10 w-full"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-slate-400" />
          </div>
          <select
            className="input pl-10"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Requests List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Application
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Access Level
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                      <tr 
                        key={request.id} 
                        className={`hover:bg-slate-50 ${selectedRequest?.id === request.id ? 'bg-slate-50' : ''}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          {request.userName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {request.applicationName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {request.accessLevelName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <StatusBadge status={request.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {request.requestDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => setSelectedRequest(request)}
                            className="text-primary-600 hover:text-primary-800 inline-flex items-center"
                          >
                            <Info className="h-4 w-4 mr-1" />
                            Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-slate-500">
                        {searchTerm || statusFilter !== 'all' 
                          ? 'No matching requests found.' 
                          : 'No requests available for review.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Request Details Panel */}
        <div className="lg:col-span-1">
          {selectedRequest ? (
            <RequestDetails 
              request={selectedRequest} 
              onClose={() => setSelectedRequest(null)}
              userRole={user?.role}
            />
          ) : (
            <div className="bg-white rounded-lg shadow p-6 h-full flex items-center justify-center text-center">
              <div>
                <Clock className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-1">No Request Selected</h3>
                <p className="text-slate-600">
                  Select a request from the list to view details and take action.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: AccessRequest['status'] }> = ({ status }) => {
  const styles = {
    pending: 'bg-warning-50 text-warning-700',
    approved: 'bg-success-50 text-success-700',
    rejected: 'bg-error-50 text-error-700'
  };
  
  const icons = {
    pending: <Clock className="h-4 w-4 mr-1" />,
    approved: <CheckCircle className="h-4 w-4 mr-1" />,
    rejected: <XCircle className="h-4 w-4 mr-1" />
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {icons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const RequestDetails: React.FC<{ 
  request: AccessRequest;
  onClose: () => void;
  userRole?: string;
}> = ({ request, onClose, userRole }) => {
  const [reviewNotes, setReviewNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleApprove = async () => {
    if (!reviewNotes.trim()) {
      toast.error('Please add review notes before approving');
      return;
    }
    
    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (userRole === 'admin') {
        toast.success('Request approved successfully');
      } else {
        toast.success('Request recommended for approval. Waiting for admin confirmation.');
      }
      
      onClose();
    } catch (error) {
      toast.error('Failed to process request');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleReject = async () => {
    if (!reviewNotes.trim()) {
      toast.error('Please add review notes before rejecting');
      return;
    }
    
    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Request rejected successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to process request');
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6 animate-slide-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Request Details</h2>
        <StatusBadge status={request.status} />
      </div>
      
      <div className="space-y-4 mb-6">
        <div>
          <h3 className="text-sm font-medium text-slate-500">Employee</h3>
          <p className="mt-1 text-slate-900">{request.userName}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-slate-500">Application</h3>
          <p className="mt-1 text-slate-900">{request.applicationName}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-slate-500">Access Level</h3>
          <p className="mt-1 text-slate-900">{request.accessLevelName}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-slate-500">Request Date</h3>
          <p className="mt-1 text-slate-900">{request.requestDate}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-slate-500">Reason for Request</h3>
          <p className="mt-1 text-slate-900">{request.reason}</p>
        </div>
        
        {request.reviewNotes && (
          <div>
            <h3 className="text-sm font-medium text-slate-500">Previous Review Notes</h3>
            <p className="mt-1 text-slate-900">{request.reviewNotes}</p>
          </div>
        )}
      </div>
      
      {request.status === 'pending' && (
        <>
          <div className="mb-4">
            <label htmlFor="reviewNotes" className="block text-sm font-medium text-slate-700">
              {userRole === 'admin' ? 'Final Approval Notes' : 'Review Notes'}
            </label>
            <textarea
              id="reviewNotes"
              rows={3}
              className="input mt-1 w-full"
              placeholder={userRole === 'admin' 
                ? "Add notes for final approval decision..."
                : "Add your review notes and recommendation..."}
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleReject}
              disabled={isProcessing}
              className="btn bg-error-600 text-white hover:bg-error-700 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Reject'}
            </button>
            <button
              onClick={handleApprove}
              disabled={isProcessing}
              className="btn bg-success-600 text-white hover:bg-success-700 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : userRole === 'admin' ? 'Approve' : 'Recommend Approval'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ManagerApprovalPage;