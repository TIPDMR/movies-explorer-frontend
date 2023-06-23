import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Error from "../Error/Error";
import ModalMenuMobile from "../ModalMenuMobile/ModalMenuMobile";

function App() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState(false);
  const [headerHide, setHeaderHide] = useState(true);
  const [footerHide, setFooterHide] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authRoutesPathsArrayHeader = ['/profile', '/movies', '/saved-movies'];
  const knownRoutesPathsArrayHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const knownRoutesPathsArrayFooter = ['/', '/movies', '/saved-movies'];
  useEffect(() => {

    if (!knownRoutesPathsArrayHeader.includes(location.pathname)) {
      setHeaderHide(true);
    } else {
      setHeaderHide(false);
    }
    if (!knownRoutesPathsArrayFooter.includes(location.pathname)) {
      setFooterHide(true);
    } else {
      setFooterHide(false);
    }

    if (!authRoutesPathsArrayHeader.includes(location.pathname)) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleOpenMenuMobile = () => {
    setIsOpenMenuMobile(!isOpenMenuMobile);
  };
  const onCloseClickOverlay = () => {
    setIsOpenMenuMobile(!isOpenMenuMobile);
  };

  return (<div className="app">
    {headerHide ? null : <Header loggedIn={loggedIn} clickOpenMenuMobile={handleOpenMenuMobile}/>}
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/signup" element={<Register/>}/>
      <Route path="/signin" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/movies" element={<Movies locationPathname={location.pathname} isLoading={isLoading}/>}/>
      <Route path="/saved-movies" element={<SavedMovies locationPathname={location.pathname}/>}/>
      <Route path="*" element={<Error code="404" text="Страница не найдена"/>}/>
    </Routes>
    {footerHide ? null : <Footer/>}
    {!loggedIn ? null : <ModalMenuMobile onCloseClickOverlay={onCloseClickOverlay} isOpen={isOpenMenuMobile} onClose={handleOpenMenuMobile}/>}
  </div>);
}

export default App;
