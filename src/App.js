import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SideNavigation from "./components/Side-Navigation";
import { useStateContext } from "./contexts/ContextProvider";
import ExamForm from "./pages/exam/exam-form";
import ExamResult from "./pages/exam/exam-result";
import TakeExam from "./pages/exam/take-exam";
import Traingings from "./pages/training/trainings";
import TookTraining from "./pages/training/took-training";
import CreateTraining from "./pages/training/create-training";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Branch from "./pages/valuation/Branch";
import Installer from "./pages/valuation/Installer";
import Level1 from "./pages/valuation/Lvl1";
import Level2 from "./pages/valuation/Lvl2";
import Mistake from "./pages/valuation/Mistake";
import Online from "./pages/valuation/Online";
import ReTre from "./pages/valuation/ReTre";
import Telesales from "./pages/valuation/Telesales";
import NotFound from "./pages/404";
import { CheckLogin } from "./components/BackToHome";
function App() {
  const { activeMenu } = useStateContext();

  return (
    <BrowserRouter>
      <div className="flex">
        {activeMenu ? <SideNavigation /> : null}
        <Routes>
          <Route path="/" element={
            <CheckLogin>
              <Login />
            </CheckLogin>
          } /> 
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-form"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <ExamForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-result"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <ExamResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/take-exam"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <TakeExam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trainings"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <Traingings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/took-training"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <TookTraining />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-training"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <CreateTraining />
              </ProtectedRoute>
            }
          />
          <Route
            path="/branch"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <Branch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/installer"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <Installer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/level-one"
            element={
              <ProtectedRoute allowedRoles={[199, 1]}>
                <Level1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/level-two"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <Level2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mistake"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <Mistake />
              </ProtectedRoute>
            }
          />
          <Route
            path="/online"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <Online />
              </ProtectedRoute>
            }
          />
          <Route
            path="/re-tre"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <ReTre />
              </ProtectedRoute>
            }
          />
          <Route
            path="/telesales"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <Telesales />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <NotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
