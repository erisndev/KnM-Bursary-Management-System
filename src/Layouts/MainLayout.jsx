// This layout is no longer used. 
// Landing pages use LandingLayout, Dashboard has its own layout.
// Kept for backward compatibility.

import LandingLayout from './LandingLayout';

const MainLayout = ({ children }) => {
  return <LandingLayout>{children}</LandingLayout>;
};

export default MainLayout;
