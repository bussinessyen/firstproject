import React from 'react';

function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl text-gray-600">👤</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">User Name</h2>
                <p className="text-gray-500">Member since {new Date().getFullYear()}</p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Details</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-gray-900">user@example.com</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Wallet Address</label>
                  <p className="mt-1 text-gray-900 font-mono">0x0000...0000</p>
                </div>
              </div>
            </div>

            {/* Activity Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <p className="text-gray-500 text-center">No recent activity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;