import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import HomePage from "./pages/home.page";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";
import SearchPage from "./pages/search.page";
import PageNotFound from "./pages/404.page";
import ProfilePage from "./pages/profile.page";
import BlogPage from "./pages/blog.page";
import SideNav from "./components/sidenavbar.component";
import ChangePassword from "./pages/change-password.page";
import EditProfile from "./pages/edit-profile.page";
import Notifications from "./pages/notifications.page";
import ManageBlogs from "./pages/manage-blogs.page";

export const UserContext = createContext({});

export const ThemeContext = createContext({});

const App = () => {
  
  const [userAuth, setUserAuth] = useState({}); // Set initial state to avoid undefined

  const [theme, setTheme] = useState("light");

  useEffect(() => {

    let userInSession = lookInSession("user");

    let themeInSession = lookInSession("theme")

    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null })

    if(themeInSession){
      setTheme(() => {
        document.body.setAttribute('data-theme', themeInSession)

        return themeInSession;
      })
    } else{
      document.body.setAttribute('data-theme', theme)
    }

 
    
  }, [])

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
    <Helmet>
          <title>ReadingSome</title>
          <meta name="description" content="Reading Some - A platform to discover and share interesting articles, blogs, and stories." />
          <meta name="keywords" content="Reading, Articles, Blogs, Stories, Discover, Share, Comparision, readingsome, ReadingSome" />
          <meta name="application-name" content="Reading Some" />
          <meta name="apple-mobile-web-app-title" content="Reading Some" />
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow" />
        </Helmet>
      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:blog_id" element={<Editor />} />
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<SideNav />}>
            <Route path="blogs" element={<ManageBlogs />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
          <Route path="settings" element={<SideNav />}>
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="signup" element={<UserAuthForm type="sign-up" />} />
          <Route path="login" element={<UserAuthForm type="log-in" />} />
          <Route path="search/:query" element={<SearchPage />} />
          <Route path="user/:id" element={<ProfilePage />} />
          <Route path="blog/:blog_id" element={<BlogPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
