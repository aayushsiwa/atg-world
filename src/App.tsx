import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { EditProfile } from "./components/auth/EditProfile";
import { SocialFeed } from "./components/SocialFeed";

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
