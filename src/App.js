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
import ExamInit from "./pages/UserMainUI/Exam/ExamInit";
import { QueryClient, QueryClientProvider } from "react-query";
import ExamDash from "./pages/main-exam/examDashboard";
import "react-toastify/dist/ReactToastify.css";
import RatingCore from "./pages/ratingMain/RatingCore";
import EditTraining from "./pages/training/Edit-training";
import UserTraining from "./pages/training/User-training";
import ClickedTrain from "./pages/training/ClickedTrain";
import TrainingPlayer from "./pages/training/TrainingPlayer";
import RatingIndividual from "./pages/ratingMain/RatingIndivdual";
import UserCore from "./pages/UserMainUI/Rating/UserCore";
import ExamInitContinue from "./pages/UserMainUI/Exam/ExamInitContinue";
import MainNavigation from "./components/MainNavigation";
import TrainingUserCell from "./pages/training/TrainingUserCell";
import Exam from "./pages/UserMainUI/ExamUser/core/Exam";
import ExamShow from "./pages/UserMainUI/ExamUser/core/ExamShow";
import EditTrainRate from "./pages/training_raiting/EditTrainRate";
import RatedUsers from "./pages/training_raiting/RatedUsers";
import Rating from "./pages/rating/Rating";
import ChoosedTRate from "./pages/training_raiting/ChoosedTRate";
import RatingReport from "./pages/training_raiting/RatingReport";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { logout } from "./service/examService";
import Countdown from "./components/CountDown";
import RatingUser from "./pages/UserMainUI/Rating/RatingUser";
import UserHome from "./pages/UserMainUI/UserHome";
import RatingUserShow from "./pages/UserMainUI/Rating/RatingUserShow";
import useWindowDimensions from "./components/SizeDetector";
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
        if (res.data.errorCode === 401 && TOKEN != null) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const adminRoles = ["199", "196"];
  return (
    <BrowserRouter>
      <div className="flex w-full relative">
        {showTop ? (
          <div className="fixed w-full h-screen bg-black top-z right-0 relative"></div>
        ) : null}
        {/* {activeMenu && roleId === "199" && width > 768 ? <SideNavigation /> : null} */}
        {activeMenu && adminRoles.includes(roleId) && width > 768 ? (
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
              <ProtectedRoute allowedRoles={[199, 196]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training-files"
            element={
              <ProtectedRoute allowedRoles={[199, 196]}>
                <TrainingFiles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training-category"
            element={
              <ProtectedRoute allowedRoles={[199, 196]}>
                <TrainingCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/online-training"
            element={
              <ProtectedRoute allowedRoles={[199, 196]}>
                <OnlineTraining />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training-schedule"
            element={
              <ProtectedRoute allowedRoles={[199, 196]}>
                <TrainingSchedule />
              </ProtectedRoute>
            }
          />

          <Route
            path="/clicked-train"
            element={
              <ProtectedRoute allowedRoles={[199, 196]}>
                <ClickedTrain />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-training"
            element={
              <ProtectedRoute allowedRoles={[199, 196]}>
                <CreateTraining />
              </ProtectedRoute>
            }
          />

          <Route
            path="/train-users"
            element={
              <ProtectedRoute allowedRoles={[199, 196]}>
                <TrainingUserCell />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-training"
            element={
              <ProtectedRoute allowedRoles={[199, 196]}>
                <EditTraining />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-training"
            element={
              <ProtectedRoute
                allowedRoles={[
                  199, 196, 1, 2, 4, 188, 189, 191, 208, 168, 169, 6,
                ]}
              >
                <UserTraining />
              </ProtectedRoute>
            }
          />
          <Route
            path="/player"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 1, 4, 188]}>
                <TrainingPlayer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training-rating"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 4]}>
                <TrainingRating />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rating-report"
            element={
              <ProtectedRoute allowedRoles={[199, 4]}>
                <RatingReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chosed-trate"
            element={
              <ProtectedRoute allowedRoles={[199, 4]}>
                <ChoosedTRate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-train-rate"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 4]}>
                <EditTrainRate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/train-rate-view"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 4]}>
                <RatedUsers />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/notification"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 4]}>
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search-result"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 4]}>
                <SearchResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 4]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-init"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 1, 4, 188]}>
                <ExamInit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-init-continue"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 1, 4, 188]}>
                <ExamInitContinue />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-dashboard"
            element={
              <QueryClientProvider client={queryClient}>
                <ProtectedRoute allowedRoles={[199, 196, 4]}>
                  <ExamDash />
                </ProtectedRoute>
              </QueryClientProvider>
            }
          />
          <Route
            path="/error-thanks"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 4]}>
                <ErrorThanks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-error-thanks"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 4]}>
                <CreateErrorThanks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-error-thanks"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 4]}>
                <EditErrorThanks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-error-thanks"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 1, 188, 168, 4]}>
                <UserErrorThanks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rating-main"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 4]}>
                <RatingCore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rating-individual"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 4]}>
                <RatingIndividual />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-exam"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 1, 4, 188]}>
                <UserCore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-main"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 1, 4, 188]}>
                <UserHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 1, 4, 188]}>
                <Exam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-result"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 1, 4, 188]}>
                <ExamShow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rating"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 1, 4, 188]}>
                <Rating />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-rating"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 1, 4, 188]}>
                <RatingUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-rating-detail"
            element={
              <ProtectedRoute allowedRoles={[199, 196, 1, 4, 188]}>
                <RatingUserShow />
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
