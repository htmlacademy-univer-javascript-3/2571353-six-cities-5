import {FormEventHandler} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {Header} from '../../components/header/header.tsx';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {Actions, AppRoute, CITIES} from '../../utils/const.ts';
import {userLogin} from '../../store/api-actions.ts';
import {TAuthData} from '../../utils/types.ts';
import {changeCity} from '../../store/action.ts';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state[Actions.User].authorizationStatus);
  const randomCity = Object.values(CITIES)[Math.floor(Math.random() * Object.values(CITIES).length)];

  const handleCityClick = () => {
    dispatch(changeCity(randomCity));
    navigate(AppRoute.Main);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email');
    const password = formData.get('password');

    if (email && password) {
      const user = {
        email: email,
        password: password
      };

      dispatch(userLogin(user as TAuthData));
    }
  };

  if (isAuthorized) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <div className="page page--gray page--login">
      <Header/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <button
                className="locations__item-link"
                onClick={handleCityClick}
              >
                <span>{randomCity.name}</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
