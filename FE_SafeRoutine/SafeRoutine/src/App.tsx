import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToggleProvider } from './contexts/ToggleContext';

// Import pages
import Home from './pages/main';
import Service from './pages/Service';
import Support from './pages/Support';
import FindId from './pages/FindId';
import FindPw from './pages/FindPw';
import ResultId from './pages/ResultId';
import ResultPw from './pages/ResultPw';
import PwConfirm from './pages/PwConfirm';
import Profile from './pages/Profile';
import PwChange from './pages/PwChange';
import Group from './pages/Group';
import Stat from './pages/Stat';
import WeekPlan from './pages/WeekPlan';
import CheckList from './pages/CheckList';
import GroupManage from './pages/GroupManage';
import MakeNewCheckList from './pages/MakeNewCheckList';
import Header from './components/header/header';
import Footer from './components/footer/Footer';
import UserPage from './pages/UserPage';
import TeamPage from './pages/TeamPage';

const App: React.FC = () => {
  return (
    <ToggleProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/support" element={<Support />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/resultid" element={<ResultId />} />
          <Route path="/resultpw" element={<ResultPw />} />
          <Route path="/findpw" element={<FindPw />} />
          <Route path="/pwconfirm" element={<PwConfirm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/group" element={<Group />} />
          <Route path="/group/:teamId/" element={<TeamPage />}>
            <Route path="stat" element={<Stat />} />
            <Route path="weekplan" element={<WeekPlan />} />
            <Route path="checklist" element={<CheckList />} />
            <Route path="groupmanage" element={<GroupManage />} />
            <Route path="makenewchecklist" element={<MakeNewCheckList />} />
            <Route path="user" element={<UserPage />} />
          </Route>
          {/* <Route path="/makenewchecklist" element={<MakeNewCheckList />} /> */}


          <Route path="/pwchange" element={<PwChange />} />
        </Routes>
        <Footer />
      </Router>
    </ToggleProvider>
  );
};

export default App;
