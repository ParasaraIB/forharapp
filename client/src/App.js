import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import {Provider} from "react-redux";

import store from "./store";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pic from "./pages/Pic";
import Stakeholder from "./pages/Stakeholder";
import Topic from "./pages/Topic";
import About from "./pages/About";
import AddPic from "./pages/AddPic";
import AddStakeholder from "./pages/AddStakeholder";
import EditPic from "./pages/EditPic";
import EditStakeholder from "./pages/EditStakeholder";
import EditTopic from "./pages/EditTopic";
import AddTopic from "./pages/AddTopic";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="*" element={<About />} />
            <Route
              path="/" 
              element={
                <LoginChecker redirectTo={"/dashboard"}>
                  <Login />
                </LoginChecker>
              } 
            />
            <Route path="about" element={<About />} />
            <Route 
              path="dashboard" 
              element={
                <ProtectedRoute redirectTo="/">
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="pic" 
              element={
                <ProtectedRoute redirectTo="/">
                  <Pic />
                </ProtectedRoute>
              } 
            />
            <Route path="pic/:id" element={<EditPic />} />
            <Route path="pic/add" element={<AddPic />} />
            <Route 
              path="stakeholder" 
              element={
                <ProtectedRoute redirectTo="/">
                  <Stakeholder />
                </ProtectedRoute>
              } 
            />
            <Route path="stakeholder/:id" element={<EditStakeholder />} />
            <Route path="stakeholder/add" element={<AddStakeholder />} />
            <Route 
              path="topic" 
              element={
                <ProtectedRoute redirectTo="/">
                  <Topic />
                </ProtectedRoute>
              } 
            />
            <Route path="topic/:id" element={<EditTopic />} />
            <Route path="topic/add" element={<AddTopic />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

function ProtectedRoute({children, redirectTo}) {
  const isAuthenticated = localStorage.getItem("access_token");
  return isAuthenticated ? children : <Navigate to={redirectTo} />; 
}

function LoginChecker({children, redirectTo}) {
  const isAuthenticated = localStorage.getItem("access_token");
  return isAuthenticated ? <Navigate to={redirectTo} /> : children; 
}

export default App;
