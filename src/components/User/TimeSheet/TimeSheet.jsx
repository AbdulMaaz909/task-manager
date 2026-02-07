"use client"
import React, { useState, useEffect } from 'react';
import { 
  Clock, Plus, Trash2, Calendar, 
  Timer, BarChart3, Edit3, Save, X, 
  FileText, Briefcase 
} from 'lucide-react';
import { addTimeSheet, updateTimeSheet, delteTimeSheet } from '@/services';

function Timesheet() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    taskName: '',
    startTime: '',
    endTime: '',
    description: ''
  });

  // Calculate duration string to match your API format requirement
  const getDurationString = (start, end) => {
    if (!start || !end) return "0 minutes";
    const startTime = new Date(`2000-01-01T${start}`);
    const endTime = new Date(`2000-01-01T${end}`);
    const diffMs = endTime - startTime;
    const diffMins = Math.round(diffMs / 60000);
    return diffMins > 0 ? `${diffMins} minutes` : "0 minutes";
  };

  // ✅ CREATE / UPDATE Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.taskName || !formData.startTime || !formData.endTime) return;

    setLoading(true);
    const payload = {
      ...formData,
      duration: getDurationString(formData.startTime, formData.endTime),
      date: new Date(selectedDate).toISOString(),
    };

    try {
      if (isEditing) {
        await updateTimeSheet(editId, payload);
        setEntries(entries.map(ent => ent._id === editId ? { ...ent, ...payload } : ent));
        setIsEditing(false);
        setEditId(null);
      } else {
        const res = await addTimeSheet(payload);
        // Use the structure from your provided JSON response
        if (res.data && res.data.data) {
          setEntries([res.data.data, ...entries]);
        }
      }
      setFormData({ taskName: '', startTime: '', endTime: '', description: '' });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error saving timesheet");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE Logic
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this entry?")) return;
    try {
      await delteTimeSheet(id);
      setEntries(entries.filter(e => e._id !== id));
    } catch (error) {
      alert("Delete failed");
    }
  };

  // ✅ PREPARE EDIT
  const startEdit = (entry) => {
    setIsEditing(true);
    setEditId(entry._id);
    setFormData({
      taskName: entry.taskName,
      startTime: entry.startTime,
      endTime: entry.endTime,
      description: entry.description
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalMinutes = entries.reduce((sum, e) => {
    const mins = parseInt(e.duration) || 0;
    return sum + mins;
  }, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-12">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Clock className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">TimeTracker <span className="text-indigo-600">Pro</span></h1>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="text-slate-400 w-5 h-5" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-slate-100 border-none rounded-md px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              {isEditing ? <Edit3 className="w-5 h-5 text-amber-500" /> : <Plus className="w-5 h-5 text-indigo-600" />}
              {isEditing ? 'Edit Entry' : 'Log New Task'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Task Name</label>
                <input
                  required
                  placeholder="e.g. Frontend Development"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                  value={formData.taskName}
                  onChange={e => setFormData({...formData, taskName: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Start Time</label>
                  <input
                    required
                    type="time"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                    value={formData.startTime}
                    onChange={e => setFormData({...formData, startTime: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">End Time</label>
                  <input
                    required
                    type="time"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                    value={formData.endTime}
                    onChange={e => setFormData({...formData, endTime: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Notes</label>
                <textarea
                  rows="3"
                  placeholder="What did you achieve?"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all ${
                    isEditing ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'
                  } disabled:opacity-50`}
                >
                  {loading ? 'Processing...' : isEditing ? <><Save className="w-4 h-4"/> Update</> : <><Plus className="w-4 h-4"/> Save Entry</>}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => { setIsEditing(false); setFormData({taskName:'', startTime:'', endTime:'', description:''})}}
                    className="px-4 py-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: List & Stats */}
        <div className="lg:col-span-7 space-y-6">
          {/* Stats Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-slate-500 text-sm font-medium">Total Duration</p>
              <p className="text-2xl font-bold text-indigo-600">{Math.floor(totalMinutes/60)}h {totalMinutes%60}m</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-slate-500 text-sm font-medium">Tasks Logged</p>
              <p className="text-2xl font-bold text-slate-800">{entries.length}</p>
            </div>
          </div>

          {/* List Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-700">Daily Log</h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedDate}</span>
            </div>

            <div className="divide-y divide-slate-100">
              {entries.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="text-slate-300 w-8 h-8" />
                  </div>
                  <p className="text-slate-500 font-medium">No work logged for this day yet.</p>
                </div>
              ) : (
                entries.map((entry) => (
                  <div key={entry._id} className="p-6 hover:bg-slate-50 transition-colors group">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                          <h4 className="font-bold text-slate-800">{entry.taskName}</h4>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {entry.startTime} - {entry.endTime}</span>
                          <span className="flex items-center gap-1 font-semibold text-indigo-600"><Timer className="w-3 h-3"/> {entry.duration}</span>
                        </div>
                        {entry.description && (
                          <p className="text-sm text-slate-600 mt-2 bg-slate-100/50 p-2 rounded-lg border border-slate-100 italic">
                            "{entry.description}"
                          </p>
                        )}
                      </div>
                      
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => startEdit(entry)}
                          className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(entry._id)}
                          className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Timesheet;