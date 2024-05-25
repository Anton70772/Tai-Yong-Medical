import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from '../ui/auth';
import Home from '../screens/Home';
import Reg from '../ui/reg';
import UHome from '../UserPages/UHome';

const Routing = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/authorization' element={<Auth />}/>
                    <Route path='/registration' element={<Reg />}/>
                    <Route path='/' element={<Home />}/>
                    <Route path='/Uhome' element={<UHome />}/>
                </Routes>
            </Router>
        </>
    );
}

export default Routing;