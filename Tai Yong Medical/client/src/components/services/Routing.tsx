import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from '../ui/auth';
import Home from '../screens/Home';
import Reg from '../ui/reg';
import Header from '../screens/Header';
import Specialists from '../UserPages/Specialists';

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
                </Routes>
            </Router>
        </>
    );
}

export default Routing;