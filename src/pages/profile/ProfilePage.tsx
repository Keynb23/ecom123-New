import React from 'react';
import { useAuth } from '../../context/AuthContext'; 
import './ProfilePage.css'; 

export const ProfilePage: React.FC = () => {
  const { authState } = useAuth(); 

  return (
    <div className="profile-page-container">
      <h1>Your Profile</h1>
      {authState.user ? (
        <div className="profile-details">
          <p><strong>Email:</strong> {authState.user.email}</p>
          <p><strong>Status:</strong> Logged In</p>
          <button className="edit-profile-button">Edit Profile</button>
          <button className="delete-profile-button">Delete Profile</button>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};