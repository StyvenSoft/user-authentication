import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext);

    const classes = useStyles();

    const history = useHistory();
    const register = () => history.push("/register");
    const login = () => history.push("/login");

    return (
        <nav>
            {userData.user ? (
                <button>Logout</button>
            ) : (
                    <>
                        <Button className={classes.button} color="inherit" onClick={register}>Register</Button>
                        <Button className={classes.button} variant="outlined" color="inherit" onClick={login}>Login</Button>
                    </>
                )}
        </nav>
    )
}
