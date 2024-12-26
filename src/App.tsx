import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EditProfile } from "./components/auth/EditProfile";
import { SocialFeed } from "./components/SocialFeed";
// import { Navbar } from "./components/Navbar";

function App() {
    return (
        <Router>
            {/* <Navbar /> */}
            <Routes>
                <Route path="/" element={<SocialFeed />} />
                <Route path="/edit-profile" element={<EditProfile />} />
            </Routes>
        </Router>
    );
}
export default App;
