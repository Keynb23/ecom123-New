import React from 'react';

interface UserProfileProps {
  name: string;
  email: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email }: UserProfileProps) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>Email: {email}</p>
    </div>
  );

};export default UserProfile;