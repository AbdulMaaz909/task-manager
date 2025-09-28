'use client'
import React, { useState, useEffect } from 'react';
import { Clock, Plus, Trash2, Calendar, Timer, BarChart3 } from 'lucide-react';

function Timesheet() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    task: '',
    startTime: '',
    endTime: '',
    description: ''
  });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const saved = localStorage.getItem(`timesheet-${selectedDate}`);
    if (saved) {
      setEntries(JSON.parse(saved));
    } else {
      setEntries([]);
    }
  }, [selectedDate]);

  useEffect(() => {
    localStorage.setItem(`timesheet-${selectedDate}`, JSON.stringify(entries));
  }, [entries, selectedDate]);

  const calculateDuration = (start, end) => {
    if (!start || !end) return 0;
    const startTime = new Date(`2000-01-01T${start}`);
    const endTime = new Date(`2000-01-01T${end}`);
    const diff = endTime - startTime;
    return diff > 0 ? diff / (1000 * 60 * 60) : 0;
  };

  const formatTime = (hours) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const addEntry = () => {
    if (newEntry.task && newEntry.startTime && newEntry.endTime) {
      const duration = calculateDuration(newEntry.startTime, newEntry.endTime);
      if (duration > 0) {
        setEntries([...entries, {
          ...newEntry,
          id: Date.now(),
          duration
        }]);
        setNewEntry({ task: '', startTime: '', endTime: '', description: '' });
      } else {
        alert('End time must be after start time!');
      }
    } else {
      alert('Please fill in task name, start time, and end time');
    }
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const totalHours = entries.reduce((sum, entry) => sum + entry.duration, 0);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  const setCurrentTime = (field) => {
    setNewEntry({ ...newEntry, [field]: getCurrentTime() });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">Daily Timesheet</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Add New Entry Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Plus className="h-5 w-5 mr-2 text-green-600" />
            Add New Entry
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
              <input
                type="text"
                placeholder="e.g., Project Meeting"
                value={newEntry.task}
                onChange={(e) => setNewEntry({ ...newEntry, task: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <div className="flex">
                <input
                  type="time"
                  value={newEntry.startTime}
                  onChange={(e) => setNewEntry({ ...newEntry, startTime: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={() => setCurrentTime('startTime')}
                  className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 text-sm"
                  title="Set current time"
                >
                  Now
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <div className="flex">
                <input
                  type="time"
                  value={newEntry.endTime}
                  onChange={(e) => setNewEntry({ ...newEntry, endTime: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={() => setCurrentTime('endTime')}
                  className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 text-sm"
                  title="Set current time"
                >
                  Now
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600">
                {newEntry.startTime && newEntry.endTime ? 
                  formatTime(calculateDuration(newEntry.startTime, newEntry.endTime)) : 
                  '0h 0m'
                }
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
            <textarea
              placeholder="Additional details about the task..."
              value={newEntry.description}
              onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows="2"
            />
          </div>
          <button
            onClick={addEntry}
            className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Entry</span>
          </button>
        </div>

        {/* Summary Card */}
        {entries.length > 0 && (
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl shadow-lg p-6 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Daily Summary</h3>
                <p className="text-green-100">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <Timer className="h-5 w-5" />
                  <span className="text-2xl font-bold">{formatTime(totalHours)}</span>
                </div>
                <p className="text-green-100">{entries.length} entries</p>
              </div>
            </div>
          </div>
        )}

        {/* Entries List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Time Entries ({entries.length})
            </h2>
          </div>
          
          {entries.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No entries for this date</p>
              <p className="text-sm">Start tracking your time by adding your first entry above!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {entries.map((entry) => (
                <div key={entry.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{entry.task}</h3>
                      <div className="flex items-center space-x-6 text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{entry.startTime} - {entry.endTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Timer className="h-4 w-4" />
                          <span className="font-medium text-indigo-600">{formatTime(entry.duration)}</span>
                        </div>
                      </div>
                      {entry.description && (
                        <p className="text-gray-600 text-sm">{entry.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Timesheet;