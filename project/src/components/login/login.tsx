import { FormEvent, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Logo from '../logo/logo';
import Loading from '../loading/loading';
import UserMenu from '../user-menu/user-menu';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/async-actions';
import { AuthData } from '../../types/auth-data';
import { State } from '../../types/state';
import Footer from '../footer/footer';
import { AppRoute, AuthorizationStatus } from '../../constants';

function Login(): JSX.Element {
  const {authorizationStatus} = useAppSelector((state: State) => state);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={ AppRoute.Main} />;
  }

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Loading position="screen" />;
  }

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {

      const email = emailRef.current.value.trim();
      const password = passwordRef.current.value.trim();

      if (email === '' || password === '') {
        toast.error('Email and passport cannot be empty or consist of spaces');
        return;
      }

      onSubmit({
        email,
        password,
      });
    }
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <UserMenu />
      </header>

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={(evt) => handleSubmit(evt)}
        >
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                ref={emailRef}
                required
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                ref={passwordRef}
                required
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
