import { ChangeEvent, FormEvent, useRef } from 'react';
import { Navigate } from 'react-router-dom';

import Logo from '../logo/logo';
import Loading from '../loading/loading';
import UserMenu from '../user-menu/user-menu';
import Footer from '../footer/footer';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/async-actions';
import { State } from '../../types/state';
import { AppRoute, AuthorizationStatus, Message, Pattern, Validator } from '../../constants';
import { setValidator } from '../../utils/validate';

function Login(): JSX.Element {
  const {authorizationStatus} = useAppSelector(({USER}: State) => USER);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={ AppRoute.Main} />;
  }

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Loading position="screen" />;
  }

  const handleEmailChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setValidator(target, Validator.PatternMismatch, Message.EmailPatternMismatch);
  };

  const handlePasswordChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setValidator(target, Validator.PatternMismatch, Message.PasswordPatternMismatch);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const email = (emailRef.current as HTMLInputElement).value;
    const password = (passwordRef.current as HTMLInputElement).value;

    dispatch(loginAction({
      email,
      password,
    }));
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
                pattern={Pattern.Email}
                onChange={handleEmailChange}
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
                pattern={Pattern.Password}
                onChange={handlePasswordChange}
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
