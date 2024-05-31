import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { signState } from '../components/MyAtoms';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const defaultTheme = createTheme();

export default function SignUp() {
  const atomSignState = useRecoilValue(signState);
  const setAtomSignState = useSetRecoilState(signState);
  const navigate = useNavigate();
  const [ cookies, setCookies, removeCookies ] = useCookies(["username", "Authorization"]);

  const [ passwordInputVal, setPasswordInputVal ] = React.useState("");
  const [ passwordCheckInputVal, setPasswordCheckInputVal ] = React.useState("");

  const passwordChange = (event) => {
    setPasswordInputVal(event.target.value);
  }

  const passwordCheckChange = (event) => {
    setPasswordCheckInputVal(event.target.value);
  }

  React.useEffect(() => {
    console.log("SignIn Page");
  }, [atomSignState]);

  const signUpAction = async(requestData) => {
    await fetch("http://localhost:8080/api/sign/signUp", {
        method: "POST",      
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(requestData)
    })
    .then((response) => response.json()) // response.json()) 
    .then((result) => {
      if(result.data === true) {
        alert("회원가입 완료");
        navigate("/signIn");
      } else {
        alert("회원가입 실패 다시 시도해주세요");
        navigate(0);
      }
    })
    .catch(error => {
      // console.log(error);
      return error;
    })
    
    
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const requestData = {
      account: data.get("account"),
      password: data.get("password")
    };

    signUpAction(requestData);      
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="account"
              label="Account"
              name="account"
              autoComplete="account"
              autoFocus
            />        
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={passwordChange}
            />
            {
              passwordInputVal == passwordCheckInputVal ?
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordCheck"
                label="PasswordCheck"
                type="password"
                id="passwordCheck"
                autoComplete="current-password-check"
                onChange={passwordCheckChange}
              />
              :
              <TextField
                error
                margin="normal"
                required
                fullWidth
                name="passwordCheck"
                label="PasswordCheck"
                type="password"
                id="passwordCheck"
                autoComplete="current-password-check"
                onChange={passwordCheckChange}
            />
            }
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}