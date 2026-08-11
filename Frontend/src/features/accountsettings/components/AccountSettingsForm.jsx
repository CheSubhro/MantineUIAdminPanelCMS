
import React, { useState } from 'react';
import UserProfileCard from './UserProfileCard';
import ProfileInfoSection from './ProfileInfoSection';
import SecuritySection from './SecuritySection';
import DangerZoneSection from './DangerZoneSection';

const AccountSettingsForm = () => {
    
    const [user, setUser] = useState({
        fullName: 'John Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        role: 'Administrator',
        avatar: ''
    });
    const [loading, setLoading] = useState(false);

    const handleUpdateProfile = async (values) => {
        setLoading(true);
        try {
            console.log('Profile updated:', values);
            // API call here
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (values) => {
        setLoading(true);
        try {
            console.log('Password changed:', values);
            // API call here
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async (confirmText, closeModal) => {
        if (confirmText !== 'DELETE') {
            alert('Please type DELETE to confirm');
            return;
        }

        setLoading(true);
        try {
            console.log('Account deleted');
            closeModal();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                    <UserProfileCard user={user} />
                </div>

                <div className="md:col-span-8">
                    <ProfileInfoSection
                        form={{ values: user, getInputProps: (field) => ({ defaultValue: user[field] }) }}
                        onSubmit={handleUpdateProfile}
                        loading={loading}
                    />

                    <SecuritySection
                        form={{ values: {} }}
                        onSubmit={handleChangePassword}
                        loading={loading}
                    />

                    <DangerZoneSection
                        onDeleteAccount={handleDeleteAccount}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default AccountSettingsForm;