
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      {/* User should replace 'logo.png' with their actual logo file placed in the public/assets folder */}
      <img src="/logo.png" alt="Angola Company Logo" className="h-16 w-auto" />
    </Link>
  );
};

export default Logo;
