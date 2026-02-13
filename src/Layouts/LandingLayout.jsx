import Footer from '@/components/footer/Footer';
import LandingNavbar from '@/components/navbar/LandingNavbar';

const LandingLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col transition-colors duration-300">
      <LandingNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
