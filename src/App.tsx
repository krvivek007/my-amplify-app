import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
