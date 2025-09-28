'use client'
import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Clock, CheckCircle, XCircle, AlertCircle, User, FileText, Mail, Phone } from 'lucide-react';

function LeaveManagement() {
  const [activeTab, setActiveTab] = useState('apply');
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState({
    annual: 25,
    sick: 10,
    personal: 5,
    maternity: 90,
    used: {
      annual: 8,
      sick: 2,
      personal: 1,
      maternity: 0
    }
  });

  const [newLeave, setNewLeave] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
    emergencyContact: '',
    phone: '',
    handoverNotes: ''
  });

  const leaveTypes = [
    { value: 'annual', label: 'Annual Leave', color: 'bg-blue-500' },
    { value: 'sick', label: 'Sick Leave', color: 'bg-red-500' },
    { value: 'personal', label: 'Personal Leave', color: 'bg-green-500' },
    { value: 'maternity', label: 'Maternity Leave', color: 'bg-purple-500' }
  ];

  const statusConfig = {
    pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' },
    approved: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Approved' },
    rejected: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Rejected' }
  };

  useEffect(() => {
    const saved = localStorage.getItem('leaveRequests');
    if (saved) {
      setLeaveRequests(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
  };

  const submitLeaveRequest = () => {
    if (!newLeave.type || !newLeave.startDate || !newLeave.endDate || !newLeave.reason) {
      alert('Please fill in all required fields');
      return;
    }

    const days = calculateDays(newLeave.startDate, newLeave.endDate);
    const request = {
      id: Date.now(),
      ...newLeave,
      days,
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0]
    };

    setLeaveRequests([request, ...leaveRequests]);
    setNewLeave({
      type: '',
      startDate: '',
      endDate: '',
      reason: '',
      emergencyContact: '',
      phone: '',
      handoverNotes: ''
    });
    setActiveTab('history');
  };

  const updateLeaveStatus = (id, status) => {
    setLeaveRequests(leaveRequests.map(req => 
      req.id === id ? { ...req, status } : req
    ));
  };

  const getRemainingDays = (type) => {
    return leaveBalances[type] - leaveBalances.used[type];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-indigo-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Leave Management</h1>
                <p className="text-gray-600">Manage your leave requests and balances</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <User className="h-4 w-4" />
              <span>Employee Dashboard</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('apply')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'apply' 
                  ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <Plus className="h-5 w-5 inline mr-2" />
              Apply Leave
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'history' 
                  ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <FileText className="h-5 w-5 inline mr-2" />
              Leave History
            </button>
            <button
              onClick={() => setActiveTab('balance')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'balance' 
                  ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <Clock className="h-5 w-5 inline mr-2" />
              Leave Balance
            </button>
          </div>
        </div>

        {/* Apply Leave Tab */}
        {activeTab === 'apply' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Apply for Leave</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type *</label>
                <select
                  value={newLeave.type}
                  onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select leave type</option>
                  {leaveTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label} ({getRemainingDays(type.value)} days remaining)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600">
                  {newLeave.startDate && newLeave.endDate ? 
                    `${calculateDays(newLeave.startDate, newLeave.endDate)} day(s)` : 
                    'Select dates'
                  }
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                <input
                  type="date"
                  value={newLeave.startDate}
                  onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                <input
                  type="date"
                  value={newLeave.endDate}
                  onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                  min={newLeave.startDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                <input
                  type="text"
                  placeholder="Contact person name"
                  value={newLeave.emergencyContact}
                  onChange={(e) => setNewLeave({ ...newLeave, emergencyContact: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                <input
                  type="tel"
                  placeholder="Emergency contact number"
                  value={newLeave.phone}
                  onChange={(e) => setNewLeave({ ...newLeave, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Leave *</label>
              <textarea
                placeholder="Please provide reason for your leave request..."
                value={newLeave.reason}
                onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows="3"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Work Handover Notes</label>
              <textarea
                placeholder="Any important notes about work handover or pending tasks..."
                value={newLeave.handoverNotes}
                onChange={(e) => setNewLeave({ ...newLeave, handoverNotes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows="3"
              />
            </div>

            <div className="mt-8">
              <button
                onClick={submitLeaveRequest}
                className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Submit Leave Request</span>
              </button>
            </div>
          </div>
        )}

        {/* Leave History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">Leave History</h2>
              <p className="text-gray-600 mt-1">Track all your leave requests and their status</p>
            </div>

            {leaveRequests.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">No leave requests found</p>
                <p className="text-sm">Your leave requests will appear here once submitted</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {leaveRequests.map((request) => {
                  const StatusIcon = statusConfig[request.status].icon;
                  const leaveType = leaveTypes.find(t => t.value === request.type);
                  
                  return (
                    <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-3 h-3 rounded-full ${leaveType?.color}`}></div>
                            <h3 className="text-lg font-semibold text-gray-800">{leaveType?.label}</h3>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[request.status].bg} ${statusConfig[request.status].color}`}>
                              <StatusIcon className="h-3 w-3 inline mr-1" />
                              {statusConfig[request.status].label}
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(request.startDate)} - {formatDate(request.endDate)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{request.days} day(s)</span>
                            </div>
                            {request.emergencyContact && (
                              <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>{request.emergencyContact}</span>
                              </div>
                            )}
                            {request.phone && (
                              <div className="flex items-center space-x-1">
                                <Phone className="h-4 w-4" />
                                <span>{request.phone}</span>
                              </div>
                            )}
                          </div>

                          <p className="text-gray-700 mb-2"><strong>Reason:</strong> {request.reason}</p>
                          {request.handoverNotes && (
                            <p className="text-gray-700 mb-2"><strong>Handover Notes:</strong> {request.handoverNotes}</p>
                          )}
                          <p className="text-xs text-gray-500">Submitted on {formatDate(request.submittedDate)}</p>
                        </div>

                        {request.status === 'pending' && (
                          <div className="ml-4 flex space-x-2">
                            <button
                              onClick={() => updateLeaveStatus(request.id, 'approved')}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-xs"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateLeaveStatus(request.id, 'rejected')}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Leave Balance Tab */}
        {activeTab === 'balance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Leave Balance Overview</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {leaveTypes.map((type) => {
                  const total = leaveBalances[type.value];
                  const used = leaveBalances.used[type.value];
                  const remaining = total - used;
                  const percentage = (used / total) * 100;

                  return (
                    <div key={type.value} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-4 h-4 rounded-full ${type.color}`}></div>
                        <h3 className="font-semibold text-gray-800">{type.label}</h3>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total: {total} days</span>
                          <span className="text-gray-600">Used: {used} days</span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${type.color}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        
                        <div className="text-center">
                          <span className="text-2xl font-bold text-gray-800">{remaining}</span>
                          <p className="text-sm text-gray-600">days remaining</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
              {leaveRequests.slice(0, 5).length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent activity</p>
              ) : (
                <div className="space-y-3">
                  {leaveRequests.slice(0, 5).map((request) => {
                    const StatusIcon = statusConfig[request.status].icon;
                    const leaveType = leaveTypes.find(t => t.value === request.type);
                    
                    return (
                      <div key={request.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${leaveType?.color}`}></div>
                          <span className="text-gray-700">{leaveType?.label}</span>
                          <span className="text-gray-500 text-sm">
                            {formatDate(request.startDate)} - {formatDate(request.endDate)}
                          </span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${statusConfig[request.status].bg} ${statusConfig[request.status].color}`}>
                          <StatusIcon className="h-3 w-3 inline mr-1" />
                          {statusConfig[request.status].label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default LeaveManagement;