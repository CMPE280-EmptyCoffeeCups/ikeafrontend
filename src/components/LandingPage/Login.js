import React, {Component} from 'react';
import PropTypes from "prop-types";

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {FormControl, FormGroup, FormHelperText} from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    paper: {
        padding: 32,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        top: '30%',
        width: '25%',
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    button: {
        backgroundColor: '#00319b',
        marginTop: '15px'
    }
});

class Login extends Component {

    static propTypes = {
        handleDoLogin: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired
    };
    handleSubmit = () => {
        const {email, password} = this.state;
        let re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

        this.setState({
            emailError: false,
            passwordError: false
        });

        if (!re.test(email)) {
            console.log(re.test(email));
            this.setState({
                emailError: true
            });
        } else if (!password) {
            this.setState({
                passwordError: true
            });
        } else {
            this.props.handleDoLogin({
                email, password
            });
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailError: false,
            passwordError: false
        }
    }

    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.root}>
                <Grid container justify="center">
                    <Paper className={classes.paper} elevation={20}>
                        <Typography type="display1" gutterBottom>
                            Login
                        </Typography>
                        <FormGroup>
                            <FormControl>
                                <TextField
                                    id="emailid"
                                    label="Email ID"
                                    type="email"
                                    required={true}
                                    error={this.state.emailError}
                                    autoComplete="current-email"
                                    margin="normal"
                                    onChange={(event) => this.setState({email: event.target.value})}
                                />
                                {this.state.emailError && (<FormHelperText>Enter a valid Email ID.</FormHelperText>)}
                            </FormControl>
                            <FormControl>
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    required={true}
                                    error={this.state.passwordError}
                                    margin="normal"
                                    onChange={(event) => this.setState({password: event.target.value})}
                                />
                                {this.state.passwordError && (<FormHelperText>Enter your Password.</FormHelperText>)}
                            </FormControl>
                            <FormControl>
                                <Button
                                    className={classes.button}
                                    raised
                                    color="accent"
                                    label="Submit"
                                    onClick={(event) => {
                                            this.handleSubmit();
                                        }
                                    }>
                                    Submit
                                </Button>
                            </FormControl>
                        </FormGroup>
                    </Paper>
                </Grid>
            </div>

        );
    }
}

export default withStyles(styles)(Login);