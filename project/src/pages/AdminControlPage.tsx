import React, { useState } from 'react';
import { applications } from '../data/mockData';
import { SoftwareApplication, AccessLevel } from '../types';
import { Users, Settings, Shield, PlusCircle, Edit, Trash, Search } from 'lucide-react';

const AdminControlPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'applications' | 'users' | 'settings'>('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditingApp, setIsEditingApp] = useState(false);
  const [currentApp, setCurrentApp] = useState<SoftwareApplication | null>(null);
  
  // Filter applications based on search term
  const filteredApplications = applications.filter(
    app => app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           app.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditApp = (app: SoftwareApplication) => {
    setCurrentApp(app);
    setIsEditingApp(true);
  };

  const handleAddNewApp = () => {
    setCurrentApp({
      id: '',
      name: '',
      description: '',
      category: '',
      accessLevels: []
    });
    setIsEditingApp(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Admin Control</h1>
        <p className="mt-1 text-slate-600">
          Manage software applications, users, and system settings.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'applications'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Settings className="h-5 w-5 inline-block mr-2" />
            Applications
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Users className="h-5 w-5 inline-block mr-2" />
            Users
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Shield className="h-5 w-5 inline-block mr-2" />
            System Settings
          </button>
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'applications' && (
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="relative mb-4 sm:mb-0 w-full sm:w-auto sm:flex-grow sm:mr-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="input pl-10 w-full"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={handleAddNewApp}
              className="btn btn-primary w-full sm:w-auto"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Application
            </button>
          </div>

          {isEditingApp && currentApp && (
            <ApplicationForm
              app={currentApp}
              onClose={() => setIsEditingApp(false)}
            />
          )}

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-slate-200">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <ApplicationListItem 
                    key={app.id} 
                    app={app} 
                    onEdit={handleEditApp} 
                  />
                ))
              ) : (
                <li className="px-6 py-4 text-center text-slate-500">
                  {searchTerm ? 'No matching applications found.' : 'No applications available.'}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center py-8">
            <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">User Management</h3>
            <p className="text-slate-600 mb-4">
              This section would allow managing users and their roles.
            </p>
            <button className="btn btn-primary">
              Manage Users
            </button>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center py-8">
            <Shield className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">System Settings</h3>
            <p className="text-slate-600 mb-4">
              This section would allow configuring global system settings.
            </p>
            <button className="btn btn-primary">
              Configure Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ApplicationListItem: React.FC<{ 
  app: SoftwareApplication;
  onEdit: (app: SoftwareApplication) => void;
}> = ({ app, onEdit }) => {
  return (
    <li className="hover:bg-slate-50">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-slate-900">{app.name}</h3>
            <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
              {app.category}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-600">{app.description}</p>
          <div className="mt-2">
            <span className="text-xs font-medium text-slate-500">Access Levels:</span>
            <div className="mt-1 flex flex-wrap gap-1">
              {app.accessLevels.map(level => (
                <span 
                  key={level.id} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700"
                >
                  {level.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => onEdit(app)}
            className="p-2 text-slate-600 hover:text-primary-600 rounded-full hover:bg-slate-100"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button className="p-2 text-slate-600 hover:text-error-600 rounded-full hover:bg-slate-100">
            <Trash className="h-5 w-5" />
          </button>
        </div>
      </div>
    </li>
  );
};

const ApplicationForm: React.FC<{
  app: SoftwareApplication;
  onClose: () => void;
}> = ({ app, onClose }) => {
  const [formData, setFormData] = useState(app);
  const [newAccessLevel, setNewAccessLevel] = useState<Omit<AccessLevel, 'id'>>({
    name: '',
    description: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleAddAccessLevel = () => {
    if (newAccessLevel.name && newAccessLevel.description) {
      const newLevel: AccessLevel = {
        id: `temp-${Date.now()}`,
        ...newAccessLevel
      };
      
      setFormData({
        ...formData,
        accessLevels: [...formData.accessLevels, newLevel]
      });
      
      setNewAccessLevel({
        name: '',
        description: ''
      });
    }
  };
  
  const handleRemoveAccessLevel = (id: string) => {
    setFormData({
      ...formData,
      accessLevels: formData.accessLevels.filter(level => level.id !== id)
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the database
    onClose();
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6 animate-slide-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-900">
          {app.id ? 'Edit Application' : 'Add New Application'}
        </h2>
        <button 
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700"
        >
          <Trash className="h-5 w-5" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Application Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input mt-1 w-full"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="input mt-1 w-full"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="input mt-1 w-full"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-slate-700">
                Access Levels
              </label>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-md">
              {formData.accessLevels.length > 0 ? (
                <ul className="mb-4 divide-y divide-slate-200">
                  {formData.accessLevels.map(level => (
                    <li key={level.id} className="py-3 flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">{level.name}</h4>
                        <p className="text-sm text-slate-600">{level.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAccessLevel(level.id)}
                        className="text-error-600 hover:text-error-800"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500 mb-4">No access levels defined yet.</p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Level Name"
                    value={newAccessLevel.name}
                    onChange={(e) => setNewAccessLevel({...newAccessLevel, name: e.target.value})}
                    className="input w-full text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Level Description"
                    value={newAccessLevel.description}
                    onChange={(e) => setNewAccessLevel({...newAccessLevel, description: e.target.value})}
                    className="input w-full text-sm"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleAddAccessLevel}
                    className="btn btn-primary w-full h-10"
                  >
                    <PlusCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
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
            {app.id ? 'Update Application' : 'Add Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminControlPage;