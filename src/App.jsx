import AppNavbar from "./components/AppNavbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./page/HomePage.jsx";
import TaskPage from "./page/TaskPage.jsx";
import ProjectPage from "./page/ProjectPage.jsx";
import LoginPage from './page/LoginPage';

function App() {
    return (
        <div>
            <BrowserRouter>
                <AppNavbar/>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/task" element={<TaskPage/>}/>
                    <Route path="/project" element={<ProjectPage/>}/>
                    <Route path="/dashboard" element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;