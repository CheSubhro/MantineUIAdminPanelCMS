
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ErrorBoundary, EmptyState, Button } from '../components/common';
import { ProfileDetails } from '../features/profile/components/ProfileDetails';

const ProfilePage = () => {
    
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <ErrorBoundary>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    My Profile
                </h1>

                {user ? (
                    <ProfileDetails user={user} />
                ) : (
                    <div className="flex justify-center items-center mt-12">
                        <EmptyState
                            title="Access Denied"
                            description="You must be logged in to view your profile details."
                            actionText="Go to Login"
                            onAction={() => navigate('/login')}
                            actionColor="violet"
                        />
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
};

export default ProfilePage;