import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function SimpleSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [bugReport, setBugReport] = useState('');
  const [feedback, setFeedback] = useState('');

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gray-100">
      <div className="flex h-full">
        {/* Left Column */}
        <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-sm text-gray-600 mb-8">Queries, bug reports, and customization</p>

        {/* Profile Settings */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-base font-bold mb-4">Profile Settings</h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username:</label>
            <input
              type="text"
              defaultValue="↑pcashier4"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                defaultValue="password123"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-emerald-700 pr-10"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button className="px-5 py-2 bg-emerald-700 text-white text-sm rounded font-semibold hover:bg-emerald-800">
            Update Username and Password
          </button>
        </div>

        {/* General Settings */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-base font-bold mb-3">General Settings</h2>
          <p className="text-sm text-gray-600 mb-2">About us | Learn more about CodeStrive Systems</p>
          <p className="text-sm text-gray-600 mb-2">Checkout User Manual</p>
          <p className="text-sm text-gray-600">FAQs</p>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-1 p-8">
        <div className="mt-16">
          {/* Bug Reports */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-base font-bold mb-1">Bug Reports</h2>
            <p className="text-xs text-gray-600 mb-4">
              Found bug/s or errors? Please let your managers know, and send us a report.
            </p>
            <textarea
              value={bugReport}
              onChange={(e) => setBugReport(e.target.value)}
              placeholder="Enter your report here and specify where the bug was found."
              className="w-full border border-gray-300 rounded p-3 text-sm outline-none focus:ring-1 focus:ring-emerald-700 resize-none h-24 mb-4"
            />
            <button className="w-full py-2 bg-emerald-700 text-white text-sm rounded font-semibold hover:bg-emerald-800">
              Submit bug report
            </button>
          </div>

          {/* Feedback */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-base font-bold mb-1">Got any Feedback or Suggestions?</h2>
            <p className="text-xs text-gray-600 mb-4">
              Feedback on the systems performance is always welcomed! Let us work together to improve the systems overall performance!
            </p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your feedback/suggestions here. We'd love to hear your opinions!"
              className="w-full border border-gray-300 rounded p-3 text-sm outline-none focus:ring-1 focus:ring-emerald-700 resize-none h-24 mb-4"
            />
            <button className="w-full py-2 bg-emerald-700 text-white text-sm rounded font-semibold hover:bg-emerald-800">
              Send us your feedback
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}