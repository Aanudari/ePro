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

function App() {
  const { activeMenu } = useStateContext();
  return (
    <BrowserRouter>
      <div className="flex">
        {activeMenu ? <SideNavigation /> : null}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-form"
            element={
              <ProtectedRoute>
                <ExamForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-result"
            element={
              <ProtectedRoute>
                <ExamResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/take-exam"
            element={
              <ProtectedRoute>
                <TakeExam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trainings"
            element={
              <ProtectedRoute>
                <Traingings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/took-training"
            element={
              <ProtectedRoute>
                <TookTraining />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-training"
            element={
              <ProtectedRoute>
                <CreateTraining />
              </ProtectedRoute>
            }
          />
          <Route
            path="/branch"
            element={
              <ProtectedRoute>
                <Branch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/installer"
            element={
              <ProtectedRoute>
                <Installer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/level-one"
            element={
              <ProtectedRoute>
                <Level1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/level-two"
            element={
              <ProtectedRoute>
                <Level2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mistake"
            element={
              <ProtectedRoute>
                <Mistake />
              </ProtectedRoute>
            }
          />
          <Route
            path="/online"
            element={
              <ProtectedRoute>
                <Online />
              </ProtectedRoute>
            }
          />
          <Route
            path="/re-tre"
            element={
              <ProtectedRoute>
                <ReTre />
              </ProtectedRoute>
            }
          />
          <Route
            path="/telesales"
            element={
              <ProtectedRoute>
                <Telesales />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
