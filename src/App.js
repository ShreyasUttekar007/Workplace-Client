import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/nWuRGm1GvLXyCmQ6TbxqfQ7YasvDlY8z87TxUHrX0HUhX0Pxa9" element={<Register />} />
        <Route exact path="/createMom" element={<CreateMom />} />
        <Route exact path="/new-create-mom" element={<NewCreateMom />} />
        <Route exact path="/create-idi" element={<CreateIDI />} />
        <Route exact path="/welcome" element={<WelcomePage />} />
        <Route exact path="/createacreport" element={<CreatePcReport />} />
        <Route exact path="/create-media-scan" element={<CreateMediaScan />} />
        <Route exact path="/create-form20" element={<Form20 />} />
        <Route exact path="/idi-data" element={<DataIDI />} />
        <Route exact path="/form20-dashboard" element={<Form20Dashboard />} />
        <Route exact path="/media-scan" element={<MediaScan />} />
        <Route exact path="/create-form17" element={<Form17 />} />
        <Route exact path="/form17-dashboard" element={<Form17Dashboard />} />
        <Route exact path="/gatt-gann" element={<Gatt />} />
        <Route exact path="/gatt-gannn-dashboard" element={<GattDashboard />} />
        <Route exact path="/caste-dashboard" element={<CasteDashboard />} />
        <Route exact path="/booth-list" element={<BoothList />} />
        <Route exact path="/update" element={<UpdateLogin />} />
        <Route exact path="/state-dashboard" element={<StateDashboard />} />
        <Route exact path="/survey-dashboard" element={<SurveyDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/candidate-list" element={<CandidateList />} />
        <Route path="/momdata" element={<MomData />} />
        <Route path="/reportdata" element={<Report />} />
        <Route path="/viewmom/:momId" element={<ViewMom />} />
        <Route path="/update-mom/:momId" element={<EditMom />} />
        <Route path="/update-idi/:momId" element={<UpdateIDI />} />
        <Route path="/update-report/:momId" element={<UpdateReport />} />
      </Routes>
    </Router>
  );
};

export default App;
