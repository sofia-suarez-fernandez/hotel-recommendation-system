import { ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./app/store";
import { Activate } from "./components/pages/Activate/Activate";
import { Home } from "./components/pages/Home/Home";
import { HotelReviews } from "./components/pages/HotelReviews/HotelReviews";
import { NotFound } from "./components/pages/NotFound/NotFound";
import { Profile } from "./components/pages/Profile/Profile";
import { ResetPassword } from "./components/pages/ResetPassword/ResetPassword";
import { ResetPasswordConfirm } from "./components/pages/ResetPasswordConfirm/ResetPasswordConfirm";
import { SignIn } from "./components/pages/SignIn/SignIn";
import { SignUp } from "./components/pages/SignUp/SignUp";
import theme from "./layouts/theme";
import Author from "./components/pages/AboutUs/Author";
import ProjectOverview from "./components/pages/AboutUs/ProjectOverview";
import FAQ from "./components/pages/Discover/Faq";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // useEffect runs twice on component mount with React.StrictMode on development (not on production)
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotel/:slug_id" element={<HotelReviews />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/activate/:uid/:token" element={<Activate />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route
            path="/password/reset/confirm/:uid/:token"
            element={<ResetPasswordConfirm />}
          />
          <Route path="/author" element={<Author />} />
          <Route path="/project" element={<ProjectOverview />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
