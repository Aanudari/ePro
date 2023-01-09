import "./styles/App.css";
import "./styles/styles.scss";
import "./styles/core.scss";
import "./styles/modal.scss";
import "./styles/validation.css";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddCategory from "./pages/rating/rating/AddCategory";
import { useStateContext } from "./contexts/ContextProvider";
import Training from "./pages/training/Training";
import TrainingIndex from "./pages/training/TrainingIndex";
import TrainingFiles from "./pages/training/TrainingFiles";
import TrainingCategory from "./pages/training/TrainingCategory";
import TookTraining from "./pages/training/took-training";
import CreateTraining from "./pages/training/create-training";
import TrainingRating from "./pages/training_raiting/TrainingRating";
import { ProtectedRoute } from "./components/ProtectedRoute";
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

import EditErrorThanks from "./pages/error-thanks/EditErrorThanks";
import UserErrorThanks from "./pages/error-thanks/UserErrorThanks";

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
import RatingCore from "./pages/ratingMain/RatingCore";
import EditTraining from "./pages/training/Edit-training";
import UserTraining from "./pages/training/User-training";
import Player from "./pages/training/Player";
import RatingIndividual from "./pages/ratingMain/RatingIndivdual";
import TrainingUserCell from "./pages/training/TrainingUserCell";

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
            path="/rating"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <RatingIndexPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training-files"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <TrainingFiles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training-category"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <TrainingCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <Training />
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
            path="/train-users"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <TrainingUserCell />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training-list"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <Training />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-training"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <EditTraining />
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
            path="/user-training"
            element={
              <ProtectedRoute allowedRoles={[199, 1, 4]}>
                <UserTraining />
              </ProtectedRoute>
            }
          />
          <Route
            path="/player"
            element={
              <ProtectedRoute allowedRoles={[199, 1, 4]}>
                <Player />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training-rating"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <TrainingRating />
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
            path="/error-thanks"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <ErrorThanks />
              </ProtectedRoute>
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

          <Route
            path="/edit-error-thanks"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <EditErrorThanks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-error-thanks"
            element={
              <ProtectedRoute allowedRoles={[199, 1, 4]}>
                <UserErrorThanks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rating-main"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <RatingCore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rating-individual"
            element={
              <ProtectedRoute allowedRoles={[199]}>
                <RatingIndividual />
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
