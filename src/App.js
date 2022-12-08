import "./styles/App.css";
import "./styles/styles.scss";
import "./styles/core.scss";
import "./styles/modal.scss";
import "./styles/validation.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddCategory from "./pages/rating/rating/AddCategory";
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
import Dashboard from "./pages/Dashboard";
import PrepareQuestions from "./components/PrepareQuestions";
import LevelOneUI from "./pages/userUI/LevelOne/LevelOneUI";
import ErrorThanks from "./pages/error-thanks/ErrorThanks";
import CreateErrorThanks from "./pages/error-thanks/CreateErrorThanks";
import UINavigation from "./components/UINavigation";
import LevelOneUITakeExam from "./pages/userUI/LevelOne/LevelOneUITakeExam";
import LevelOneUIExamResult from "./pages/userUI/LevelOne/LevelOneUIExamResult";
import LevelOneUINotification from "./pages/userUI/LevelOne/LevelOneUINotification";
import UITraining from "./pages/userUI/UITraining";
import getWindowDimensions from "./components/SizeDetector";
import NotValid from "./pages/NotValid";
import SessionTimeout from "./components/SessionTimeout";
import Exam from "./pages/userUI/Exam";
import CalendarX from "./pages/training/Calendar/calendar";
import ExamInit from "./pages/userUI/ExamInit";
import MainNavigation from "./components/MainNavigation";
import RatingIndexPage from "../src/pages/rating/rating/RatingIndexPage";
import { QueryClient, QueryClientProvider } from "react-query";
import CreateRate from "./pages/rating/rate-users/CreateRate";
import ExamDash from "./pages/main-exam/examDashboard";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { activeMenu, showTop, roleId, error, setError } = useStateContext();
  const { width } = getWindowDimensions();
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <div className="flex w-full relative">
        {error && <NotValid />}
        {showTop ? (
          <div className="fixed w-full h-screen bg-black top-z right-0"></div>
        ) : null}
        {/* {activeMenu && roleId === "199" && width > 768 ? <SideNavigation /> : null} */}
        {activeMenu && roleId === "199" && width > 768 ? (
          <MainNavigation />
        ) : null}

        <Routes>
          {/*Sidebar аас үсрэх боломжтой үндсэн хуудаснууд */}
          <Route
            path="/"
            element={
              // CheckLogin = нэвтэрсэн хэрэглэгч дахин login page рүү үсрэх боломжгүй буюу, тухайн замыг хаах component
              <CheckLogin>
                <Login />
              </CheckLogin>
            }
          />
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
              <QueryClientProvider client={queryClient}>
                <ProtectedRoute allowedRoles={[199]}>
                  <ExamForm />
                </ProtectedRoute>
              </QueryClientProvider>
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
            path="/exam-pool"
            element={
              <QueryClientProvider client={queryClient}>
                <ProtectedRoute allowedRoles={[199]}>
                  <TakeExam />
                </ProtectedRoute>
              </QueryClientProvider>
            }
          />
          <Route
            path="/rating"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <RatingIndexPage />
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
              <QueryClientProvider client={queryClient}>
                <ProtectedRoute allowedRoles={[199, 1]}>
                  <Level1 />
                </ProtectedRoute>
                <ProtectedRoute allowedRoles={[199, 1]}>
                  <Level1 />
                </ProtectedRoute>
              </QueryClientProvider>
            }
          />
          <Route
            path="/complain"
            element={
              <QueryClientProvider client={queryClient}>
                <ProtectedRoute allowedRoles={[199]}>
                  <Level2 />
                </ProtectedRoute>
              </QueryClientProvider>
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
          <Route path="*" element={<NotFound />} />
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
            path="/create-rate-user"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <CreateRate />
              </ProtectedRoute>
            }
          />
          create-rate-user
          <Route
            path="/complain-edit"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <ComplainEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-category"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <AddCategory />
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
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prepare-questions"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <PrepareQuestions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/levelone-ui"
            element={
              <ProtectedRoute allowedRoles={[199, 1]}>
                <LevelOneUI />
              </ProtectedRoute>
            }
          />
          <Route
            path="/levelone-ui-take-exam"
            element={
              <ProtectedRoute allowedRoles={[199, 1]}>
                <LevelOneUITakeExam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/levelone-ui-exam-result"
            element={
              <ProtectedRoute allowedRoles={[199, 1]}>
                <LevelOneUIExamResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/levelone-ui-notification"
            element={
              <ProtectedRoute allowedRoles={[199, 1]}>
                <LevelOneUINotification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ui-training"
            element={
              <ProtectedRoute allowedRoles={[199, 1]}>
                <UITraining />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam"
            element={
              <ProtectedRoute allowedRoles={[199, 1]}>
                <Exam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <CalendarX />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-init"
            element={
              <ProtectedRoute allowedRoles={[199, 1]}>
                <ExamInit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/error-thanks"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <ErrorThanks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-dash"
            element={
              <QueryClientProvider client={queryClient}>
                <ProtectedRoute allowedRoles={[199]}>
                  <ExamDash />
                </ProtectedRoute>
              </QueryClientProvider>
            }
          />
          <Route
            path="/create-error-thanks"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <CreateErrorThanks />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <SessionTimeout />
    </BrowserRouter>
  );
}

export default App;
