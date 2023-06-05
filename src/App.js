import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/Signup.jsx";
function App() {
    return (
        <Router>
            <Routes>
                <Route path= '/signup' exact element={<SignUp/>} />
                <Route path= '/login' exact element={<Login/>} />
            </Routes>
        </Router>
    );
}

export default App;
