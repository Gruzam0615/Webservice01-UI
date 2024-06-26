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

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const atomSignState = useRecoilValue(signState);
  const setAtomSignState = useSetRecoilState(signState);
  const navigate = useNavigate();
  const [ cookies, setCookies, removeCookies ] = useCookies(["username", "Authorization"]);

  const [ passwordInputVal, setPasswordInputVal ] = React.useState("");

  const passwordOnChange = (event) => {
    setPasswordInputVal(event.target.value)
  }

  React.useEffect(() => {
    console.log("SignIn Page");
  }, [atomSignState]);

  const signInAction = async(requestData) => {
    await fetch("http://localhost:8080/api/sign/signIn", {
        method: "POST",      
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(requestData)
    })
    .then((response) => response.json()) // response.json()) 
    .then((result) => {
      if(result.data != null) {
        setAtomSignState({
          "username": requestData.account,
          "Authorization": result.data,
          "status": true,
          "passwordInputStatus": true
        })
        setCookies("username", requestData.account);
        setCookies("Authorization", result.data);
        navigate("/");
      } else {
        setAtomSignState({
          "username": requestData.account,
          "Authorization": null,
          "status": false,
          "passwordInputStatus": false
        })
        setPasswordInputVal("");
        alert("인증정보가 유효하지 않습니다.");
      }
      // console.log("after signInAction");
      // console.log(atomSignState);
      // return result;
    })
    .catch(error => {
      // console.log(error);
      return error;
    })
    
    
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('account'),
      password: data.get('password'),
    });
    const requestData = {
      account: data.get("account"),
      password: data.get("password")
    };

    const fetchData = signInAction(requestData);      
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
            { atomSignState.passwordInputStatus ?          
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> :
            <TextField
              error
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={passwordInputVal}
              onChange={passwordOnChange}
            />
            }
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}