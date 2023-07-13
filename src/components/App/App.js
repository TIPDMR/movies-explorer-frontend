import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { searchMovies } from "../../utils/searchMovies";
import { formattedImage } from "../../utils/formattedImage";
import { markedFavoriteMovieList } from "../../utils/markedFavoriteMovieList";
import { LOGIN_ERRORS_TEXTS, PROFILE_ERRORS_TEXTS, REGISTRATION_ERRORS_TEXTS } from "../../constants/constErrorsTexts";
import { CurrentUser } from "../../contexts/CurrentUser";
import MainApi from '../../utils/MainApi';
import MoviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [buttonEditProfile, setButtonEditProfile] = useState(false);

  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipTypeError, setTooltipTyperError] = useState('');

  const [resultSearchMovieList, setResultSearchMovieList] = useState([]);
  const [favoriteMovieList, setFavoriteMovieList] = useState([]);
  const [resultSearchFavoriteMovieList, setResultSearchFavoriteMovieList] = useState([]);
  const [isFavoriteSearchMovieList, setIsSearchFavoriteMovieList] = useState(false);

  const [isNewSearch, setIsNewSearch] = useState(false);

  const knownRoutesPathsArrayHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const knownRoutesPathsArrayFooter = ['/', '/movies', '/saved-movies'];

  useEffect(() => {
    if (!isLoggedIn) {
      MainApi.getUserInfo().then((res) => {
        if (res && res.email) {
          handleAuthorization(res.email, res.name, res._id);
          navigate(location.pathname);
        }
      }).catch((err) => console.log(err));
    }
  }, [isLoggedIn]);


  const getAllMovies = () => {
    let localFavoriteMovieList = JSON.parse(localStorage.getItem("favoriteMovieList")) || [];
    const localResultSearchMovieList = JSON.parse(localStorage.getItem('resultSearchMovieList')) || [];
    setResultSearchMovieList(localResultSearchMovieList);

    if (localFavoriteMovieList.length === 0) {
      MainApi.getMoviesFavorite().then((res) => {
        localFavoriteMovieList = res;
        localStorage.setItem('favoriteMovieList', JSON.stringify(res));
        setFavoriteMovieList(res);
      }).catch(() => {
        setTooltipTyperError("error");
        setTooltipText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз!');
        setIsTooltipPopupOpen(true);
      });
    } else {
      setFavoriteMovieList(localFavoriteMovieList);
    }

    const parseValue = JSON.parse(localStorage.getItem("inputValuesFavoriteMovies")) || {};
    const inputValueCheckbox = parseValue[ "filter-checkbox__checkbox" ] || false;
    const inputValueSearchText = parseValue[ "search-form__movie" ] || "";

    if (localFavoriteMovieList.length > 0) {
      const localResultSearchFavoriteMovieList = JSON.parse(localStorage.getItem('resultSearchFavoriteMovieList')) || [];
      if (localResultSearchFavoriteMovieList.length > 0 || (inputValueCheckbox || inputValueSearchText.length > 0)) {
        setResultSearchFavoriteMovieList(localResultSearchFavoriteMovieList);
        setIsSearchFavoriteMovieList(true);
      }
    }
  };

  /**
   * Закрытие всех модальных окон
   */
  function handleCloseAllPopups() {
    setIsOpenMenuMobile(false);
    setIsTooltipPopupOpen(false);
  }

  /**
   * Открытие мобильного меню
   */
  const handleOpenMenuMobile = () => {
    setIsOpenMenuMobile(!isOpenMenuMobile);
  };

  /**
   * Авторизация пользователя
   * @param email
   * @param name
   * @param _id
   */
  const handleAuthorization = (email, name, _id) => {
    setIsLoggedIn(true);
    setCurrentUser({ email, name, _id });
    getAllMovies();
  };

  /**
   * Аутентификация Пользователя
   * @param email
   * @param password
   */
  const handleLogin = (email, password) => {
    setIsLoading(true);
    MainApi.signIn(email, password)
      .then((res) => {
        handleAuthorization(res.email, res.name, res._id);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        setTooltipTyperError("error");
        if (LOGIN_ERRORS_TEXTS.hasOwnProperty(err.status)) {
          setTooltipText(LOGIN_ERRORS_TEXTS[ err.status ]);
        } else {
          setTooltipText(LOGIN_ERRORS_TEXTS[ 500 ]);
        }
        setIsTooltipPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /**
   * Регистрация нового пользователя
   * @param email
   * @param password
   * @param name
   */
  const handleRegister = (email, password, name) => {
    setIsLoading(true);
    MainApi.signUp(email, password, name)
      .then((res) => {
        handleLogin(email, password);
        setTooltipTyperError("success");
        setTooltipText('Вы успешно зарегистрировались!');
      })
      .catch((err) => {
        setTooltipTyperError("error");
        if (REGISTRATION_ERRORS_TEXTS.hasOwnProperty(err.status)) {
          setTooltipText(REGISTRATION_ERRORS_TEXTS[ err.status ]);
        } else {
          setTooltipText(REGISTRATION_ERRORS_TEXTS[ 500 ]);
        }
      })
      .finally(() => {
        setIsTooltipPopupOpen(true);
        setIsLoading(false);
      });
  };

  /**
   * Выход пользователя из системы
   */
  const handleSignOut = useCallback(() => {
    MainApi.signOut().then((res) => {
      setIsLoggedIn(false);
      clearData();
      navigate('/', { replace: true });
    })
      .catch((err) => console.log(err));
  }, []);

  /**
   * Удаление всех данных
   * @type {(function(): void)|*}
   */
  const clearData = () => {
    setCurrentUser({});
    setResultSearchMovieList([]);
    setFavoriteMovieList([]);
    setResultSearchFavoriteMovieList([]);
    setIsSearchFavoriteMovieList(false);
    localStorage.clear();
  };

  /**
   * Обновление профиля пользователя
   * @param name
   * @param email
   */
  const handleUpdateProfile = (name, email) => {
    MainApi.updateProfile(name, email).then((res) => {
      setCurrentUser({ email: res.email, name: res.name, _id: res._id });
      setTooltipTyperError("success");
      setTooltipText('Вы успешно обновили профиль!');
      setButtonEditProfile(false);
      navigate(location.pathname, { replace: true });
    })
      .catch((err) => {
        setTooltipTyperError("error");
        if (PROFILE_ERRORS_TEXTS.hasOwnProperty(err.status)) {
          setTooltipText(PROFILE_ERRORS_TEXTS[ err.status ]);
        } else {
          setTooltipText(PROFILE_ERRORS_TEXTS[ 500 ]);
        }
      }).finally(() => setIsTooltipPopupOpen(true));
  };

  /**
   * Кнопка для активации редактирования профиля пользователя
   * @param state
   */
  const handleButtonEditProfile = (state) => setButtonEditProfile(state);

  /**
   * Поиск по фильмам
   * @param searchText
   * @param stateCheckbox
   */
  const handleSearchMovies = (searchText, stateCheckbox) => {
    if (searchText.length === 0)
      return;
    setIsLoading(true);
    setIsNewSearch(true);
    const localMovieList = JSON.parse(localStorage.getItem("movieList")) || [];
    if (localMovieList.length === 0) {
      MoviesApi.getMovies().then((res) => {
        const localSearchMarkedMovieList = markedFavoriteMovieList(res, favoriteMovieList);
        localStorage.setItem('movieList', JSON.stringify(localSearchMarkedMovieList));
        const resultSearchMovieList = searchMovies(localSearchMarkedMovieList, searchText, stateCheckbox);
        localStorage.setItem('resultSearchMovieList', JSON.stringify(resultSearchMovieList));
        setResultSearchMovieList(resultSearchMovieList);
      }).catch((err) => {
        setTooltipTyperError("error");
        setTooltipText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз!');
        setIsTooltipPopupOpen(true);
        console.log(err);
      }).finally(() => setIsLoading(false));
    } else {
      const localResultSearchMovieList = searchMovies(localMovieList, searchText, stateCheckbox);
      localStorage.setItem('resultSearchMovieList', JSON.stringify(localResultSearchMovieList));
      setResultSearchMovieList(localResultSearchMovieList);
      setIsLoading(false);
    }
  };

  /**
   * Добавление фильма в список избранного
   * @param movie
   */
  const handleAddMovieFavorite = useCallback((movie) => {
    const localFavoriteMovie = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: formattedImage(movie.image.url),
      trailer: movie.trailerLink,
      thumbnail: formattedImage(movie.image.formats.thumbnail.url),
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN
    };

    MainApi.addMovieFavorite(localFavoriteMovie).then((res) => {
      const localMovieList = JSON.parse(localStorage.getItem("movieList")) || [];
      const localResultSearchMovieList = JSON.parse(localStorage.getItem("resultSearchMovieList")) || [];
      const localFavoriteMovieList = JSON.parse(localStorage.getItem("favoriteMovieList")) || [];

      const localCombinedFavoriteMoviesList = [...localFavoriteMovieList, res];
      localStorage.setItem('favoriteMovieList', JSON.stringify(localCombinedFavoriteMoviesList));
      setFavoriteMovieList(localCombinedFavoriteMoviesList);

      const localResultMarkedMovieList = markedFavoriteMovieList(localResultSearchMovieList, localCombinedFavoriteMoviesList);
      localStorage.setItem('resultSearchMovieList', JSON.stringify(localResultMarkedMovieList));
      setResultSearchMovieList(localResultMarkedMovieList);

      const localMarkedMovieList = markedFavoriteMovieList(localMovieList, localCombinedFavoriteMoviesList);
      localStorage.setItem('movieList', JSON.stringify(localMarkedMovieList));
      if (isFavoriteSearchMovieList) {
        const parseValue = JSON.parse(localStorage.getItem("inputValuesFavoriteMovies")) || {};
        const inputValueCheckbox = parseValue[ "filter-checkbox__checkbox" ] || false;
        const inputValueSearchText = parseValue[ "search-form__movie" ] || "";
        const localResultSearchFavoriteMovie = searchMovies([res], inputValueSearchText, inputValueCheckbox);
        if (localResultSearchFavoriteMovie.length > 0) {
          const localResultSearchFavoriteMovieList = JSON.parse(localStorage.getItem('resultSearchFavoriteMovieList')) || [];
          const localCombinedResultFavoriteMoviesList = [...localResultSearchFavoriteMovieList, res];
          localStorage.setItem('resultSearchFavoriteMovieList', JSON.stringify(localCombinedResultFavoriteMoviesList));
          setResultSearchFavoriteMovieList(localCombinedResultFavoriteMoviesList);
        }
      }
    }).catch((err) => {
      console.log(err);
      setTooltipTyperError("error");
      setTooltipText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз!');
      setIsTooltipPopupOpen(true);
    });
  }, [favoriteMovieList, resultSearchMovieList]);

  /**
   * Удаление фильма из списка избранного
   * @param movie
   */
  const handleDeleteMovieFavorite = useCallback((movie) => {
    const idMovie = movie.id || movie.movieId;
    MainApi.deleteMovieFavorite(movie._id).then(() => {
      const localMovieList = JSON.parse(localStorage.getItem("movieList")) || [];
      const localResultSearchMovieList = JSON.parse(localStorage.getItem('resultSearchMovieList')) || [];
      const localFavoriteMovieList = JSON.parse(localStorage.getItem("favoriteMovieList")) || [];

      const localCombinedFavoriteMoviesList = localFavoriteMovieList.filter((movie) => {
        return movie.movieId !== idMovie;
      });
      setFavoriteMovieList(localCombinedFavoriteMoviesList);
      localStorage.setItem('favoriteMovieList', JSON.stringify(localCombinedFavoriteMoviesList));

      const localMarkedMovieList = markedFavoriteMovieList(localMovieList, localCombinedFavoriteMoviesList);
      localStorage.setItem('movieList', JSON.stringify(localMarkedMovieList));

      const localMarkedResultSearchMovieList = markedFavoriteMovieList(localResultSearchMovieList, localCombinedFavoriteMoviesList);
      localStorage.setItem('resultSearchMovieList', JSON.stringify(localMarkedResultSearchMovieList));
      setResultSearchMovieList(localMarkedResultSearchMovieList);
      const localResultSearchFavoriteMovieList = JSON.parse(localStorage.getItem('resultSearchFavoriteMovieList')) || [];
      if (localResultSearchFavoriteMovieList) {
        const localCombinedSearchFavoriteMoviesList = localResultSearchFavoriteMovieList.filter((movie) => {
          return movie.movieId !== idMovie;
        });
        setResultSearchFavoriteMovieList(localCombinedSearchFavoriteMoviesList);
        localStorage.setItem('resultSearchFavoriteMovieList', JSON.stringify(localCombinedSearchFavoriteMoviesList));

      }
    }).catch((err) => {
      setTooltipTyperError("error");
      setTooltipText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз!');
      setIsTooltipPopupOpen(true);
    });
  }, [favoriteMovieList, resultSearchMovieList]);

  /**
   * Поиск по избранным фильмам
   * @param searchText
   * @param stateCheckbox
   */
  const handleSearchFavoriteMovies = (searchText, stateCheckbox) => {
    setIsLoading(true);
    const localFavoriteMovieList = JSON.parse(localStorage.getItem("favoriteMovieList")) || [];
    const localResultSearchFavoriteMovieList = searchMovies(localFavoriteMovieList, searchText, stateCheckbox);
    localStorage.setItem('resultSearchFavoriteMovieList', JSON.stringify(localResultSearchFavoriteMovieList));
    setResultSearchFavoriteMovieList(localResultSearchFavoriteMovieList);
    if (!stateCheckbox && searchText.length === 0) {
      setIsSearchFavoriteMovieList(false);
    } else {
      setIsSearchFavoriteMovieList(true);
    }
    setIsLoading(false);
  };

  /**
   * Сброс формы поиска избранных фильмов
   */
  const handleResetFormFavoriteMovies = () => {
    localStorage.removeItem('inputValuesFavoriteMovies');
    localStorage.removeItem('resultSearchFavoriteMovieList');
    setIsSearchFavoriteMovieList(false);
  };

  return (<CurrentUser.Provider value={currentUser}>
    <div className="app">
      {!knownRoutesPathsArrayHeader.includes(location.pathname) ? null : <Header isLoggedIn={isLoggedIn} clickOpenMenuMobile={handleOpenMenuMobile}/>}
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/signup" element={!isLoggedIn ? <Register isLoading={isLoading} isLoggedIn={isLoggedIn} onRegister={handleRegister}/> : <Navigate to="/"/>}/>
        <Route path="/signin" element={!isLoggedIn ? <Login isLoggedIn={isLoggedIn} isLoading={isLoading} onLogin={handleLogin}/> : <Navigate to="/movies"/>}/>
        <Route
          path="/profile"
          element={<ProtectedRoute
            path="/profile"
            element={Profile}
            isButtonEditProfile={buttonEditProfile}
            onButtonEditProfile={handleButtonEditProfile}
            onUpdateProfile={handleUpdateProfile}
            isLoading={isLoading}
            onSignOut={handleSignOut}
            isLoggedIn={isLoggedIn}
          />}
        />
        <Route
          path="/movies"
          element={<ProtectedRoute
            path="/movies"
            element={Movies}
            onAddMovieFavorite={handleAddMovieFavorite}
            onDeleteMovieFavorite={handleDeleteMovieFavorite}
            isMovieList={resultSearchMovieList}
            isLoading={isLoading}
            onSearchMovies={handleSearchMovies}
            isNewSearch={isNewSearch}
            onIsNewSearch={setIsNewSearch}
            isLoggedIn={isLoggedIn}
          />}
        />
        <Route
          path="/saved-movies"
          element={<ProtectedRoute
            path="/saved-movies"
            element={SavedMovies}
            isMovieList={isFavoriteSearchMovieList ? resultSearchFavoriteMovieList : favoriteMovieList}
            onDeleteMovieFavorite={handleDeleteMovieFavorite}
            onSearchMovies={handleSearchFavoriteMovies}
            onResetFormFavoriteMovies={handleResetFormFavoriteMovies}
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            isFavoriteSearchMovieList={isFavoriteSearchMovieList}
          />}
        />
        <Route path="*" element={<Error code="404" text="Страница не найдена" isLoggedIn={isLoggedIn}/>}/>
      </Routes>
      {!knownRoutesPathsArrayFooter.includes(location.pathname) ? null : <Footer/>}
      {!isLoggedIn ? null : <ModalMenuMobile onCloseClickOverlay={handleCloseAllPopups} isOpen={isOpenMenuMobile} onClose={handleCloseAllPopups}/>}
      <InfoTooltip
        isOpen={isTooltipPopupOpen}
        onClose={handleCloseAllPopups}
        onCloseClickOverlay={handleCloseAllPopups}
        typeError={tooltipTypeError}
        text={tooltipText}
      />
    </div>
  </CurrentUser.Provider>);
}

export default App;
