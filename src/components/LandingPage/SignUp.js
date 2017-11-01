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
    paper: {
        padding: 32,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        //top: '30%',
        width: '600',
        //position: 'absolute',
        // backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    button: {
        marginTop: '15px',
        color: '#FFFFFF',
        textTransform: 'capitalize',
        fontFamily: 'Raleway, sans-serif',
        fontSize: 20
    }
});

class SignUp extends Component {

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
            <Paper className={classes.paper} elevation={20}>
                <Grid container>
                    <Grid item md={12} sm={12} xs={12}>
                        <Typography type="display1" gutterBottom>
                            Sign Up
                        </Typography>
                        <FormGroup>
                            <FormControl>
                                <TextField
                                    id="name"
                                    label="Name"
                                    type="text"
                                    required={true}
                                    error={this.state.emailError}
                                    margin="normal"
                                    onChange={(event) => this.setState({email: event.target.value})}
                                />
                                {this.state.emailError && (<FormHelperText>Enter a valid Email ID.</FormHelperText>)}
                            </FormControl>
                            <FormControl>
                                <TextField
                                    id="emailid"
                                    label="Enter Email ID"
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
                                    label="Create a Password"
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
                                <TextField
                                    id="datepicker"
                                    label="Date of Birth"
                                    type="text"
                                    margin="normal"
                                />
                                {this.state.passwordError && (<FormHelperText>Enter your Password.</FormHelperText>)}
                            </FormControl>
                            <FormControl>
                                <Button
                                    className={classes.button}
                                    raised
                                    color="primary"
                                    label="Sign Up"
                                    onClick={(event) => {
                                            this.handleSubmit();
                                        }
                                    }
                                >
                                    Sign Up
                                </Button>
                            </FormControl>
                        </FormGroup>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(SignUp);