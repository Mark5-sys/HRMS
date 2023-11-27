import React, { useEffect } from 'react';

const UserInitials = ({ firstName, lastName }) => {
  // Function to generate initials from the first and last names
  const generateInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0) : "";
    const lastInitial = lastName ? lastName.charAt(0) : "";
    return `${firstInitial}${lastInitial}`;
  };

  // Function to generate a random background color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    // Set a random background color when the component mounts
    const userInitialsContainer = document.getElementById("user-initials-container");
    const randomBackgroundColor = getRandomColor();
    userInitialsContainer.style.backgroundColor = randomBackgroundColor;
    userInitialsContainer.style.borderRadius = '50%'; 
  }, [firstName, lastName]);

  return (
    <div id="user-initials-container" className="profile-img">
      {generateInitials(firstName, lastName)}
    </div>
  );
};

export default UserInitials;
