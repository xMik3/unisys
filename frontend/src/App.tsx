import {Routes, Route, Navigate} from "react-router-dom";
import {ProtectedRoute} from "./routes/ProtectedRoute";
import {Login} from "./pages/Login";

function Placeholder({label}: {label: string}) {
  return <div>{label} — not built yet</div>;
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/secretary"
        element={
          <ProtectedRoute>
            <Placeholder label="Secretary dashboard" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <Placeholder label="Student dashboard" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher"
        element={
          <ProtectedRoute>
            <Placeholder label="Teacher dashboard" />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
