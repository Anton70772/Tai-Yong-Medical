import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from '../ui/auth';
import Home from '../screens/Home';
import Reg from '../ui/reg';
import Header from '../screens/Header';
import Specialists from '../UserPages/Specialists';
import News from '../UserPages/News';
import About from '../UserPages/About';
import Services from '../UserPages/Services';

const Routing = () => {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path='/authorization' element={<Auth />}/>
                    <Route path='/registration' element={<Reg />}/>
                    <Route path='/' element={<Home />}/>
                    <Route path='/specialists' element={<Specialists />}/>
                    <Route path='/news' element={<News />}/>
                    <Route path='/about' element={<About />}/>
                    <Route path='/services' element={<Services />}/>
                </Routes>
            </Router>
        </>
    );
}

export default Routing;