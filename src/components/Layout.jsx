import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="app-container">
      <Header />
      <Navbar />
      <main style={{ flex: 1, padding: '20px 0' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
//