
import React from 'react';
import { Card, Badge, Button } from '../../../components/common';

export const ProfileDetails = ({ user }) => {
    return (
        <div className="max-w-xl mx-auto mt-6">
            <Card className="p-6 shadow-md bg-white dark:bg-zinc-900">
                <div className="flex flex-col items-center text-center">
                    {/* Avatar Image */}
                    <img
                        src={user?.avatar || 'https://via.placeholder.com/150'}
                        alt={user?.fullName || 'User Avatar'}
                        className="w-24 h-24 rounded-full object-cover border-4 border-violet-500 shadow-sm mb-4"
                    />

                    {/* Full Name & Username */}
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        {user?.fullName || 'Anonymous User'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        @{user?.username || 'username'}
                    </p>

                    {/* Role Badge */}
                    <div className="mb-4">
                        <Badge color="violet" variant="light">
                            {user?.role || 'User'}
                        </Badge>
                    </div>

                    {/* Email Details */}
                    <div className="w-full bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg text-left mt-2">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</span>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">{user?.email || 'N/A'}</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProfileDetails;