import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import {Provider} from "react-redux";
import jwt_decode from "jwt-decode";

import store from "./store";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pic from "./pages/Pic";
import Stakeholder from "./pages/Stakeholder";
import Topic from "./pages/Topic";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute redirectTo="/">
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pic" 
              element={
                <ProtectedRoute redirectTo="/">
                  <Pic />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/stakeholder" 
              element={
                <ProtectedRoute redirectTo="/">
                  <Stakeholder />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/topic" 
              element={
                <ProtectedRoute redirectTo="/">
                  <Topic />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

function ProtectedRoute({children, redirectTo}) {
  const isAuthenticated = localStorage.getItem("access_token");
  jwt_decode(isAuthenticated);
  return isAuthenticated ? children : <Navigate to={redirectTo} />; 
}

export default App;
