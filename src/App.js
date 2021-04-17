import React, {lazy, Suspense} from 'react';
import 'antd-mobile/dist/antd-mobile.css'; 

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Protected from './components/protected';


import {AuthProvider} from './context/LoginContext'
// import authentication from './utils/authenticate';

import Loading from './components/loading';
// import Login from './pages/login';
// import HomePage from './pages/home';
// import HomePage1 from './pages/home1';
// import Staff from './pages/staff';
// import AddStaff from './pages/staffAdd';
// import StaffInvite from './pages/QrInvite';
// import BackupGear from './pages/gear';
// import GearAdd from './pages/gearAdd';

// import OrderList from './pages/orderList';
// import OrderAssignDetail from './pages/orderAssignDetail';
// import OrderWaitingDetail from './pages/orderWaitingDetail';
// import OrderFixingDetail from './pages/orderFixingDetail';
// import OrderFinishDetail from './pages/orderFinishDetail';
// import OrderFinish from './pages/orderFinish';

// import SimilarProblem from './pages/similarProblem';

// import ScanFixReport from './pages/scanFixReport';
// import ScanIWantFix from './pages/scanIWantFix';
// import ScanRecord from './pages/scanOrderRecord';
// import ScanGearResult from './pages/scanGearResult';
// import ScanGearDetail from './pages/scanGearDetail';

// code-splitting
const Login = lazy(() => import('./pages/login'));
const HomePage = lazy(() => import('./pages/home')); 
// const HomePage1 = lazy(() => import('./pages/home1'));
const Staff = lazy(() => import('./pages/staff')); 
const AddStaff = lazy(() => import('./pages/staffAdd')); 
const EditStaff = lazy(() => import('./pages/staffEdit')); 
const StaffInvite = lazy(() => import('./pages/QrInvite')); 
const BackupGear = lazy(() => import('./pages/gear')); 
const GearAdd = lazy(() => import('./pages/gearAdd')); 

const OrderList = lazy(() => import('./pages/orderList')); 
const OrderAssignDetail = lazy(() => import('./pages/orderAssignDetail')); 
const OrderWaitingDetail = lazy(() => import('./pages/orderWaitingDetail')); 
const OrderFixingDetail = lazy(() => import('./pages/orderFixingDetail')); 
const OrderFinishDetail = lazy(() => import('./pages/orderFinishDetail')); 
// const OrderFinish = lazy(() => import('./pages/orderFinish')); 
const OrderDetail = lazy(() => import('./pages/orderDetail')); 

const SimilarProblem = lazy(() => import('./pages/similarProblem'));

const ScanFixReport = lazy(() => import('./pages/scanFixReport')); 
const ScanIWantFix = lazy(() => import('./pages/scanIWantFix')); 
// const ScanRecord = lazy(() => import('./pages/scanOrderRecord')); 
const ScanGearResult = lazy(() => import('./pages/scanGearResult')); 
const ScanGearDetail = lazy(() => import('./pages/scanGearDetail'));

/** -------------------- */
// const AuthPage = lazy(() => import('./pages/auth'));


function App() {

  
  
  return (
    <AuthProvider>
      <Suspense fallback={<Loading open={true}/>}>
        <Router>
          <Switch>
            <Route path="/login" exact><Login /></Route>

            <Protected path="/scan/gearresult/:id" exact><ScanGearResult /></Protected>
            <Protected path="/scan/geardetail/:id" exact><ScanGearDetail /></Protected>

            <Protected path="/scan/ifix/:id" exact><ScanIWantFix /></Protected>
            {/* <Route path="/scan/record/:id" exact><ScanRecord /></Route> */}
            <Protected path="/scan/report/:id" exact><ScanFixReport /></Protected>
            


            <Protected path="/" exact><HomePage /></Protected>
            {/* <Protected path="/1" exact><HomePage1 /></Protected> */}
            <Protected path="/staff" exact><Staff /></Protected>
            <Protected path="/staff/add" exact><AddStaff /></Protected>
            <Protected path="/staff/invite" exact><StaffInvite /></Protected>
            <Protected path="/staff/:id" exact><EditStaff /></Protected>

            <Protected path="/gear" exact><BackupGear /></Protected>
            <Protected path="/gear/add" exact><GearAdd /></Protected>

            <Protected path="/orderlist/:id" exact><OrderList /></Protected>
            <Protected path="/orderlist/assign/:id" exact><OrderAssignDetail /></Protected>
            <Protected path="/orderlist/waiting/:id" exact><OrderWaitingDetail /></Protected>
            <Protected path="/orderlist/fixing/:id" exact><OrderFixingDetail /></Protected>
            <Protected path="/orderlist/finish/:id" exact><OrderFinishDetail /></Protected>
            {/* <Protected path="/orderlist/finishdetail/:id" exact><OrderFinish /></Protected> */} 

            <Protected path="/orderdetail/:id" exact><OrderDetail /></Protected>
            
            <Protected path="/similar/:id" exact><SimilarProblem /></Protected>

            
            {/* <Route path="/auth" exact><AuthPage/></Route> */}
            
          </Switch>
        </Router>
      </Suspense>
    </AuthProvider>
    
  );
}

export default App;


