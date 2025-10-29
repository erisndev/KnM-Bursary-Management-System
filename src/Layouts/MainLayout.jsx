import { useLocation } from 'react-router-dom';
import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';

const MainLayout = ({ children }) => {
  const location = useLocation();
  
  // Only show footer on Home and Contact pages
  const showFooter = location.pathname === '/' || location.pathname === '/contact';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
