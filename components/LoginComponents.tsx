import React, {useCallback, useEffect, useState} from "react";
import { Fab, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PasswordIcon from '@mui/icons-material/Password';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WarningIcon from '@mui/icons-material/Warning';
import {Visibility, VisibilityOff} from "@mui/icons-material";
// @ts-ignore
import InputMask from 'react-input-mask';
import Link from "next/link";
import {setCookie} from "cookies-next";

export const LoginComponents = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [corError, setCorError] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onChangePhone = useCallback((event: { target: { value: React.SetStateAction<string>; }; }) => {
    if (typeof event.target.value === "string") {
      setPhone(event.target.value.replace(/(-)|\+|\(|\)|(_)/g, ''));
    }
  }, [setPhone]);
  const onChangePassword = useCallback((event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
    setError(false);
  }, []);
  useEffect(() => {
    setDisabled(!(phone.length === 11 && password.length === 6));
  });

  const toLogin = async (phone:string, password:string) => {
    setLoading(true);
    const response = await fetch('https://api.jukte.kz/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: phone,
        password: password
      })
    });
    const toSend = await response.json();
    if (response.ok) {
      setLoading(false);
      setError(false);
      setCookie('accessToken', toSend.accessToken);
    } else if (toSend.message === 'Invalid credentials') {
      setErrMessage('Вы ввели неверный пароль');
      setError(true);
      setLoading(false);
    } else if (toSend.message === 'User not found') {
      setErrMessage('Такого пользователя не существует');
      setCorError(true);
      setLoading(false);
    }
    return toSend;
  }

  return (
    <div className="w-full h-[80vh]">
      <div className="flex flex-col h-full justify-between">
        <div>
          <Fab variant='circular' size="small" className="bg-white dark:bg-[#232323] dark:shadow-none mb-6" href="https://jukte.kz/">
            <ArrowBackIcon className="fill-[#0a0a0a] dark:fill-white" />
          </Fab>
          <Typography variant="h5" className="mb-4 text-black dark:text-white">
            Вход в личный кабинет
          </Typography>
          <Typography variant="body1" className="mb-8">
            Введите номер телефона и пароль для авторизации в <span className="text-[#00abc2]">Jukte.kz</span>
          </Typography>
          <div className="flex flex-col gap-8">
            <InputMask
              mask="+7-(999)-999-99-99"
              value={phone}
              onChange={onChangePhone}
            >
              {() => (
                <TextField
                  fullWidth
                  error={corError}
                  label="Введите номер телефона"
                  InputProps={{
                    inputMode: 'decimal',
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPhoneIcon />
                      </InputAdornment>
                    ),
                    type: 'tel'
                  }}
                  variant="outlined"
                />
              )}
            </InputMask>
            <TextField
              fullWidth
              label="Введите 6-значный пин-код"
              type={showPassword ? 'tel' : 'password'}
              onChange={onChangePassword}
              helperText={error && errMessage}
              error={error || corError}
              value={password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputProps={{
                maxLength: 6
              }}
            />
          </div>
          {corError && (
            <div className="flex items-center mt-4 gap-2">
              <WarningIcon className="fill-red-600" />
              <Typography variant="body1" className="text-red-600">
                { errMessage }
              </Typography>
            </div>
          )}
          <Typography variant="body1" className="mt-6 text-[#00abc2]">
            <Link href="components/Login#">
              Забыли пароль?
            </Link>
          </Typography>
        </div>
        <div>
          <Typography variant="body1" className="mb-4">
            У вас еще нету аккаунта? <Link href="/#" className="text-[#00abc2]">Зарегистрироваться</Link>
          </Typography>
          <LoadingButton
            loading={loading}
            disabled={disabled}
            endIcon={<ArrowForwardIcon />}
            variant="contained"
            className="w-full bg-[#00abc2] text-white"
            onClick={() => {
              toLogin(phone, password);
            }}
          >
            Войти
          </LoadingButton>
        </div>
      </div>
    </div>
  )
};
