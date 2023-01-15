import "./styles/App.css";
import "./styles/styles.scss";
import "./styles/core.scss";
import "./styles/modal.scss";
import "./styles/validation.css";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/core/Login";
import Home from "./pages/core/Home";
import { useStateContext } from "./contexts/ContextProvider";
import Training from "./pages/training/Training";
import TrainingFiles from "./pages/training/TrainingFiles";
import TrainingCategory from "./pages/training/TrainingCategory";
import CreateTraining from "./pages/training/create-training";
import TrainingRating from "./pages/training_raiting/TrainingRating";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NotFound from "./pages/core/404";
import { CheckLogin } from "./components/BackToHome";
import Notification from "./pages/core/Notification";
import SearchResult from "./components/Result";
import Dashboard from "./pages/core/Dashboard";
import ErrorThanks from "./pages/error-thanks/ErrorThanks";
import CreateErrorThanks from "./pages/error-thanks/CreateErrorThanks";
import EditErrorThanks from "./pages/error-thanks/EditErrorThanks";
import UserErrorThanks from "./pages/error-thanks/UserErrorThanks";
import getWindowDimensions from "./components/SizeDetector";
import SessionTimeout from "./components/SessionTimeout";
import ExamInit from "./pages/UserMainUI/Exam/ExamInit";
import { QueryClient, QueryClientProvider } from "react-query";
import ExamDash from "./pages/main-exam/examDashboard";
import "react-toastify/dist/ReactToastify.css";
import RatingCore from "./pages/ratingMain/RatingCore";
import EditTraining from "./pages/training/Edit-training";
import UserTraining from "./pages/training/User-training";
import TrainingPlayer from "./pages/training/TrainingPlayer";
import RatingIndividual from "./pages/ratingMain/RatingIndivdual";
import UserCore from "./pages/UserMainUI/Rating/UserCore";
import ExamInitContinue from "./pages/UserMainUI/Exam/ExamInitContinue";
import MainNavigation from "./components/MainNavigation";
import TrainingUserCell from "./pages/training/TrainingUserCell";
import Exam from "./pages/UserMainUI/ExamUser/core/Exam";
import ExamShow from "./pages/UserMainUI/ExamUser/core/ExamShow";

function App() {
  const { activeMenu, showTop, roleId } = useStateContext();
  const { width } = getWindowDimensions();
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <div className="flex w-full relative">
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
            path="/user-training"
            element={
              <ProtectedRoute allowedRoles={[199, 1, 4, 188]}>
                <UserTraining />
              </ProtectedRoute>
            }
          />
          <Route
            path="/player"
            element={
              <ProtectedRoute allowedRoles={[199, 1, 4, 188]}>
                <TrainingPlayer />
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
            path="/exam-init"
            element={
              <ProtectedRoute allowedRoles={[199, 1, 4, 188]}>
                <ExamInit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-init-continue"
            element={
              <ProtectedRoute allowedRoles={[199, 1, 4, 188]}>
                <ExamInitContinue />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-dashboard"
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
              <ProtectedRoute allowedRoles={[199, 1, 4, 188]}>
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
          <Route
            path="/user-main"
            element={
              <ProtectedRoute allowedRoles={[199, 1, 4, 188]}>
                <UserCore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam"
            element={
              <ProtectedRoute allowedRoles={[199, 1, 4, 188]}>
                <Exam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-result"
            element={
              <ProtectedRoute allowedRoles={[199, 1, 4, 188]}>
                <ExamShow />
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
