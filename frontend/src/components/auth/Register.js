import { Container } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Register() {
    const classes = useStyles();

    return (
        <div>
            <Container maxWidth="xs">
                <h2>Register</h2>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Email" />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                </form>
            </Container>
        </div>
    )
}
