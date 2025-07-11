// File: src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Main App Components (create these later)
import Dashboard from './components/Dashboard'; // You'll need to create this

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add more protected routes here */}
          </Route>
          
          {/* Redirect root to dashboard or login */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* 404 Route */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">404</h1>
                <p className="text-xl text-gray-600">Page not found</p>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
