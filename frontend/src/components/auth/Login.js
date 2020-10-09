import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    textfield: {
        "& .MuiFormLabel-root, & .MuiInputBase-root": {
            color: "white"
        },
        "& .MuiInput-underline:before": {
            borderBottom: "1px solid rgb(226 219 219 / 42%)"
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: "2px solid rgb(226 219 219 / 42%)"
        }
    }
}));

export default function Login() {
    const classes = useStyles();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        const loginUser = { email, password };
        const loginRes = await Axios.post("http://localhost:4000/users/login", loginUser);
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
    };

    return (
        <div>
            <Container maxWidth="xs">
                <h2>Login</h2>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={submit}>
                    <TextField
                        id="standard-basic"
                        label="Email"
                        className={classes.textfield}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        className={classes.textfield}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" type="submit" style={{ width: '95%', marginTop: '30px' }}>
                        Login
                    </Button>
                </form>
            </Container>
        </div>
    )
}
