import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { authStates, useAuthStore } from '../stores/useAuthStore';
import {
  HeaderContainer,
  TitleH1,
  PasswordOuter,
  PasswordInput,
  PasswordButton,
  AuthButton,
} from '../styles/Header.style';

const Header = () => {
  const { login, logout, register } = useAuth();

  const authState = useAuthStore((state) => state.auth.authState);
  const [isInputMode, setIsInputMode] = useState(false);
  const [password, setPassword] = useState('');

  const ButtonSelector = {};
  ButtonSelector[authStates.AUTHORIZED] = {
    clickHandler: logout,
    src: '로그아웃',
  };
  ButtonSelector[authStates.UNAUTHORIZED] = {
    clickHandler: login,
    src: '로그인',
  };
  ButtonSelector[authStates.NOT_REGISTERED] = {
    clickHandler: register,
    src: '가입',
  };

  return (
    <HeaderContainer>
      <TitleH1>나의 할 일</TitleH1>
      {isInputMode ? (
        <PasswordOuter>
          <PasswordInput
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <PasswordButton
            onClick={() => {
              ButtonSelector[authState].clickHandler(password);
              setIsInputMode(false);
            }}
          >
            확인
          </PasswordButton>
          <PasswordButton
            onClick={() => {
              setIsInputMode(false);
            }}
          >
            취소
          </PasswordButton>
        </PasswordOuter>
      ) : (
        <AuthButton
          onClick={() => {
            if (authState === authStates.AUTHORIZED) logout();
            else setIsInputMode(true);
          }}
        >
          {ButtonSelector[authState].src}
        </AuthButton>
      )}
    </HeaderContainer>
  );
};

export default Header;
