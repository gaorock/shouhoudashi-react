import React from 'react';
import 'antd-mobile/dist/antd-mobile.css'; 

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// import Protected from './components/protected';

import Login from './pages/login';
import HomePage from './pages/home';
import HomePage1 from './pages/home1';
import Staff from './pages/staff';
import AddStaff from './pages/staffAdd';
import StaffInvite from './pages/QrInvite';
import BackupGear from './pages/gear';
import GearAdd from './pages/gearAdd';
import OrderList from './pages/orderList';
import OrderListDetail from './pages/orderLIstDetail';

function App() {

  
  return (
    <Router>
      <Switch>
        <Route path="/login" exact><Login /></Route>
        <Route path="/" exact><HomePage /></Route>
        <Route path="/1" exact><HomePage1 /></Route>
        <Route path="/staff" exact><Staff /></Route>
        <Route path="/staff/add" exact><AddStaff /></Route>
        <Route path="/staff/invite" exact><StaffInvite /></Route>
        <Route path="/gear" exact><BackupGear /></Route>
        <Route path="/gear/add" exact><GearAdd /></Route>
        <Route path="/orderlist" exact><OrderList /></Route>
        <Route path="/orderlist/:id" exact><OrderListDetail /></Route>

      </Switch>
      
    </Router>
  );
}

export default App;
