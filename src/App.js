import "./styles/App.css";
import "./styles/styles.scss";
import "./styles/core.scss";
import "./styles/modal.scss";
import "./styles/validation.css";
import "./styles/cus_buttons.scss";
import "./styles/template/template.scss";
import "./styles/template/mobile.css";
import "./styles/template/tablet.css";
import "./styles/template/desktop.css";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/core/Login";
import Home from "./pages/core/Home";
import { useStateContext } from "./contexts/ContextProvider";
import OnlineTraining from "./pages/training/OnlineTraining";
import TrainingSchedule from "./pages/training/TrainingSchedule";
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
import { QueryClient, QueryClientProvider } from "react-query";
import ExamDash from "./pages/main-exam/examDashboard";
import "react-toastify/dist/ReactToastify.css";
import EditTraining from "./pages/training/Edit-training";
import UserTraining from "./pages/training/User-training";
import ClickedTrain from "./pages/training/ClickedTrain";
import TrainingPlayer from "./pages/training/TrainingPlayer";
import UserCore from "./pages/UserMainUI/Rating/UserCore";
import MainNavigation from "./components/MainNavigation";
import TrainingUserCell from "./pages/training/TrainingUserCell";
import Exam from "./pages/UserMainUI/ExamUser/core/Exam";
import ExamShow from "./pages/UserMainUI/ExamUser/core/ExamShow";
import EditTrainRate from "./pages/training_raiting/EditTrainRate";
import Rating from "./pages/rating/Rating";
import ChoosedTRate from "./pages/training_raiting/ChoosedTRate";
import RatingReport from "./pages/training_raiting/RatingReport";
import React, { useEffect } from "react";
import axios from "axios";
import { logout } from "./service/examService";
import RatingUser from "./pages/UserMainUI/Rating/RatingUser";
import UserHome from "./pages/UserMainUI/UserHome";
import RatingUserShow from "./pages/UserMainUI/Rating/RatingUserShow";
import Test from "./pages/test";
import UserProfile from "./pages/core/UserProfile";
function App() {
  const { activeMenu, showTop, roleId, TOKEN } = useStateContext();
  const { width } = getWindowDimensions();
  const queryClient = new QueryClient();

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User/checkToken`,
    })
      .then((res) => {
        if (res.data.errorCode === 401 && TOKEN !== null) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const adminRoles = ["10", "2", "6", "14", "19", "29"];
  return (
    <BrowserRouter>
      <div className="flex w-full relative">
        {showTop ? (
          <div className="fixed w-full h-screen bg-black top-z right-0 relative"></div>
        ) : null}
        {activeMenu && adminRoles.includes(roleId) && width > 768 ? (
          <MainNavigation />
        ) : null}
        <Routes>
          <Route
            path="/"
            element={
              <CheckLogin>
                <Login />
              </CheckLogin>
            }
          />
          <Route
            path="/home"
            element={
              // ProtectedRoute = Системрүү нэврээгүй хэрэглэгчийг тухайн path руу хандхад block лох үүрэгтэй component
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training-files"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <TrainingFiles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training-category"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <TrainingCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/online-training"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <OnlineTraining />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training-schedule"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <TrainingSchedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clicked-train"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <ClickedTrain />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-training"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <CreateTraining />
              </ProtectedRoute>
            }
          />
          <Route
            path="/train-users"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <TrainingUserCell />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-training"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <EditTraining />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training-rating"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <TrainingRating />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rating-report"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <RatingReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chosed-trate"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <ChoosedTRate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-train-rate"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <EditTrainRate />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/notification"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search-result"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <SearchResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-dashboard"
            element={
              <QueryClientProvider client={queryClient}>
                <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                  <ExamDash />
                </ProtectedRoute>
              </QueryClientProvider>
            }
          />
          <Route
            path="/error-thanks"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <ErrorThanks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-error-thanks"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <CreateErrorThanks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-error-thanks"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <EditErrorThanks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rating"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <Rating />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute allowedRoles={[10, 2, 6, 14, 19, 29]}>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          // // // // // // // // // // // // // // // // // // // // // // //
          // USER USER USER USER USER USER USER USER USER USER USER USER USER //
          // USER USER USER USER USER USER USER USER USER USER USER USER USER //
          // // // // // // // // // // // // // // // // // // // // // // //
          // // // // // // // // // // // // // // // // // // // // // // //
          // USER USER USER USER USER USER USER USER USER USER USER USER USER //
          // USER USER USER USER USER USER USER USER USER USER USER USER USER //
          // // // // // // // // // // // // // // // // // // // // // // //
          // // // // // // // // // // // // // // // // // // // // // // //
          // USER USER USER USER USER USER USER USER USER USER USER USER USER //
          // USER USER USER USER USER USER USER USER USER USER USER USER USER //
          // // // // // // // // // // // // // // // // // // // // // // //
          <Route
            path="/user-exam"
            element={
              <ProtectedRoute allowedRoles={[1, 3, 4, 5, 7, 13, 16, 20]}>
                <UserCore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-main"
            element={
              <ProtectedRoute allowedRoles={[1, 3, 4, 5, 7, 13, 16, 20]}>
                <UserHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam"
            element={
              <ProtectedRoute allowedRoles={[1, 3, 4, 5, 7, 13, 16, 20]}>
                <Exam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-result"
            element={
              <ProtectedRoute allowedRoles={[1, 3, 4, 5, 7, 13, 16, 20]}>
                <ExamShow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-rating"
            element={
              <ProtectedRoute allowedRoles={[1, 3, 4, 5, 7, 13, 16, 20]}>
                <RatingUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-rating-detail"
            element={
              <ProtectedRoute allowedRoles={[1, 3, 4, 5, 7, 13, 16, 20]}>
                <RatingUserShow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute allowedRoles={[1, 3, 4, 5, 7, 13, 16, 20]}>
                <Test />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-error-thanks"
            element={
              <ProtectedRoute allowedRoles={[1, 3, 4, 5, 7, 13, 16, 20]}>
                <UserErrorThanks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-training"
            element={
              <ProtectedRoute allowedRoles={[1, 3, 4, 5, 7, 13, 16, 20]}>
                <UserTraining />
              </ProtectedRoute>
            }
          />
          <Route
            path="/player"
            element={
              <ProtectedRoute allowedRoles={[1, 3, 4, 5, 7, 13, 16, 20]}>
                <TrainingPlayer />
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
