import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Auth from '../ui/auth';
import Home from '../screens/Home';
import Reg from '../ui/reg';
import Header from '../screens/Header';
import Specialists from '../UserPages/Specialists';
import News from '../UserPages/News';
import About from '../UserPages/About';
import Services from '../UserPages/Services';
import Gallery from '../UserPages/Gallery';
import Profile from '../UserPages/Profile';
import AddPatient from '../MedicalPages/AddPatient';
import MedicalProfile from '../MedicalPages/MedicalProfile';
import Appointments from '../MedicalPages/Appointments';
import OrderingProsthesis from '../MedicalPages/OrderingProsthesis';
import AddAppointmentMed from '../MedicalPages/AddAppointmentMed';
import AdminSpecialists from '../AdminPages/AdminSpecialists';
import AddClientAdmin from '../AdminPages/AddClientAdmin';
import Footer from '../screens/Footer';
import AdminNews from '../AdminPages/AdminNews';

const AppRoutes = () => {
    const location = useLocation();
    const [showHeaderFooter, setShowHeaderFooter] = useState(true);

    useEffect(() => {
        const hiddenPaths = ['/authorization', '/registration'];
        setShowHeaderFooter(!hiddenPaths.includes(location.pathname));
    }, [location]);

    return (
        <>
            {showHeaderFooter && <Header />}
            <Routes>
                <Route path='/authorization' element={<Auth />} />
                <Route path='/registration' element={<Reg />} />
                <Route path='/' element={<Home />} />
                <Route path='/specialists' element={<Specialists />} />
                <Route path='/news' element={<News />} />
                <Route path='/about' element={<About />} />
                <Route path='/services' element={<Services />} />
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/addpatient' element={<AddPatient />} />
                <Route path='/medProfile' element={<MedicalProfile />} />
                <Route path='/medAppointments' element={<Appointments />} />
                <Route path='/orderingProsthesis' element={<OrderingProsthesis />} />
                <Route path='/addAppointmentMed' element={<AddAppointmentMed />} />
                <Route path='/admin_specialists' element={<AdminSpecialists />} />
                <Route path='/addClientAdmin' element={<AddClientAdmin />} />
                <Route path='/admin_news' element={<AdminNews />} />
            </Routes>
            {showHeaderFooter && <Footer />}
        </>
    );
};

const Routing = () => (
    <Router>
        <AppRoutes />
    </Router>
);

export default Routing;