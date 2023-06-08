import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/Signup.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
function App() {
    return (
        <Router>
            <Routes>
                <Route path= '/signup' exact element={<SignUp/>} />
                <Route path= '/login' exact element={<Login/>} />
                <Route path= '/home' exact element={<Homepage/>} />
            </Routes>
        </Router>
    );
}

export default App;
