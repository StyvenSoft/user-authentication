import { Container } from '@material-ui/core'
import React,  { useState } from 'react'
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

export default function Register() {
    const classes = useStyles();
    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    
    const submit = async (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <Container maxWidth="xs">
                <h2>Register</h2>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={submit}>
                    <TextField 
                        id="standard-basic" 
                        label="Name Full" 
                        className={classes.textfield}
                        onChange={(e) => setDisplayName(e.target.value)} 
                    />
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
                    <TextField
                        id="standard-password-input"
                        label="Verify password"
                        type="password"
                        autoComplete="current-password"
                        className={classes.textfield}
                        onChange={(e) => setPasswordCheck(e.target.value)} 
                    />
                    <Button variant="contained" style={{width: '80%', marginTop: '30px'}}>
                        Register
                    </Button>
                </form>
            </Container>
        </div>
    )
}
