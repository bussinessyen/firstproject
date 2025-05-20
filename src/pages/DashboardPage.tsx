import React from 'react';

function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Active Jobs</h2>
          <p className="text-gray-600">No active jobs found</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Applications</h2>
          <p className="text-gray-600">No applications found</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Earnings</h2>
          <p className="text-gray-600">No earnings to display</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;