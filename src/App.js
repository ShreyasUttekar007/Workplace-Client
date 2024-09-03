import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UpdateLogin from "./components/UpdateLogin";
import Register from "./components/Register";
import CreateMom from "./components/CreateMom";
import MomData from "./components/MomData";
import EditMom from "./components/EditMom";
import ViewMom from "./components/ViewMom";
import UserDashboard from "./components/UserDashboard";
import CreatePcReport from "./components/CreatePcReport";
import Report from "./components/Report";
import UpdateReport from "./components/UpdateReport";
import Form20 from "./components/Form20";
import Form17 from "./components/Form17";
import Form20Dashboard from "./components/Form20Dashboard";
import Form17Dashboard from "./components/Form17Dashboard";
import Gatt from "./components/Gatt";
import GattDashboard from "./components/GattDashboard";
import CasteDashboard from "./components/CasteDashboard";
import BoothList from "./components/BoothList";
import StateDashboard from "./components/StateDashboard";
import CreateMediaScan from "./components/CreateMediaScan";
import MediaScan from "./components/MediaScan";
import CreateIDI from "./components/CreateIDI";
import DataIDI from "./components/DataIDI";
import UpdateIDI from "./components/UpdateIDI";
import WelcomePage from "./components/WelcomePage";
import NewCreateMom from "./components/NewCreateMom";
import SurveyDashboard from "./components/SurveyDashboard";
import CandidateList from "./components/CandidateList";
import UpdateUser from "./components/UpdateUser";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/nWuRGm1GvLXyCmQ6TbxqfQ7YasvDlY8z87TxUHrX0HUhX0Pxa9"
          element={<ProtectedRoute element={<Register />} role="mod" />}
        />
        <Route path="/createMom" element={<ProtectedRoute element={<CreateMom />} />} />
        <Route path="/new-create-mom" element={<ProtectedRoute element={<NewCreateMom />} />} />
        <Route path="/create-idi" element={<ProtectedRoute element={<CreateIDI />} />} />
        <Route path="/welcome" element={<ProtectedRoute element={<WelcomePage />} />} />
        <Route path="/createacreport" element={<ProtectedRoute element={<CreatePcReport />} />} />
        <Route path="/create-media-scan" element={<ProtectedRoute element={<CreateMediaScan />} />} />
        <Route path="/create-form20" element={<ProtectedRoute element={<Form20 />} />} />
        <Route path="/idi-data" element={<ProtectedRoute element={<DataIDI />} />} />
        <Route path="/form20-dashboard" element={<ProtectedRoute element={<Form20Dashboard />} />} />
        <Route path="/media-scan" element={<ProtectedRoute element={<MediaScan />} />} />
        <Route path="/create-form17" element={<ProtectedRoute element={<Form17 />} />} />
        <Route path="/form17-dashboard" element={<ProtectedRoute element={<Form17Dashboard />} />} />
        <Route path="/gatt-gann" element={<ProtectedRoute element={<Gatt />} />} />
        <Route path="/gatt-gannn-dashboard" element={<ProtectedRoute element={<GattDashboard />} />} />
        <Route path="/caste-dashboard" element={<ProtectedRoute element={<CasteDashboard />} />} />
        <Route path="/booth-list" element={<ProtectedRoute element={<BoothList />} />} />
        <Route path="/update" element={<ProtectedRoute element={<UpdateLogin />} />} />
        <Route path="/state-dashboard" element={<ProtectedRoute element={<StateDashboard />} />} />
        <Route path="/survey-dashboard" element={<ProtectedRoute element={<SurveyDashboard />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/userdashboard" element={<ProtectedRoute element={<UserDashboard />} />} />
        <Route path="/candidate-list" element={<ProtectedRoute element={<CandidateList />} />} />
        <Route path="/momdata" element={<ProtectedRoute element={<MomData />} />} />
        <Route path="/reportdata" element={<ProtectedRoute element={<Report />} />} />
        <Route path="/update-user/:userId" element={<ProtectedRoute element={<UpdateUser />} />} />
        <Route path="/viewmom/:momId" element={<ProtectedRoute element={<ViewMom />} />} />
        <Route path="/update-mom/:momId" element={<ProtectedRoute element={<EditMom />} />} />
        <Route path="/update-idi/:momId" element={<ProtectedRoute element={<UpdateIDI />} />} />
        <Route path="/update-report/:momId" element={<ProtectedRoute element={<UpdateReport />} />} />
      </Routes>
    </Router>
  );
};

export default App;
