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
import LeveloneEdit from "./pages/valuation-edit/Lvl1-edit";
import ComplainEdit from "./pages/valuation-edit/Complain-edit";
import TelesalesEdit from "./pages/valuation-edit/Telesales-edit";
import OnlineEdit from "./pages/valuation-edit/OnlineEdit";
import BranchEdit from "./pages/valuation-edit/BranchEdit";
import InstallerEdit from "./pages/valuation-edit/InstallerEdit";
import CareEdit from "./pages/valuation-edit/CareEdit";
import BankEdit from "./pages/valuation-edit/Bank";
import Notification from "./pages/Notification";
import SearchResult from "./components/Result";
function App() {
  const { activeMenu } = useStateContext();

  return (
    <BrowserRouter>
      <div className="flex">
        {activeMenu ? <SideNavigation /> : null}
        <Routes>
          {/*Sidebar аас үсрэх боломжтой үндсэн хуудаснууд */}
          <Route path="/" element={
            // CheckLogin = нэвтэрсэн хэрэглэгч дахин login page рүү үсрэх боломжгүй буюу, тухайн замыг хаах component
            <CheckLogin>
              <Login />
            </CheckLogin>
          } /> 
          <Route
            path="/home"
            element={
              // ProtectedRoute = Системрүү нэврээгүй хэрэглэгчийг тухайн path руу хандхад block лох үүрэгтэй component
              <ProtectedRoute allowedRoles={[199]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-form"
            element={
              // AllowedRoles = Нэвтэрсэн хэрэглэгч бүхэн өөрийн roleid тай байх ба өөрийн roleid ийг зөвшөөрсөн хуудасруу л хандах 
              // эрхтэйгээр шийдхийн тулд allowedRoles parameter ийг дамжуулж өгөв.
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
            path="/complain"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <Level2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bank"
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
            path="/care"
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

          {/* Үнэлгээ хийгдэх Page-нүүд */}
          <Route
            path="/level-one-edit"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <LeveloneEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complain-edit"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <ComplainEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/telesales-edit"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <TelesalesEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/telesales-edit"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <TelesalesEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/online-edit"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <OnlineEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/branch-edit"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <BranchEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/installer-edit"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <InstallerEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/care-edit"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <CareEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bank-edit"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <BankEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search-result"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <SearchResult />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
