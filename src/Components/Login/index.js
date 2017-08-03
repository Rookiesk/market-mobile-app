import React, { Component } from 'react';

import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { NavigationActions } from 'react-navigation'
import axios from 'axios'
import store from 'react-native-simple-store';

const CLIEND_ID = 'ynsH1st6PtA5Ey3DBty58CKJm9RMe6Wp'
const DOMAIN_AUTH = 'https://smnodame.auth0.com'
const CONNECTION = 'Username-Password-Authentication'

export const signin = (email, password, callback, errorCallback) => {
    return axios.post(`${DOMAIN_AUTH}/oauth/ro`, {
            "client_id": CLIEND_ID,
            "username": email,
            "password": password,
            "connection": CONNECTION,
            "scope": "openid"
        })
        .then(function (response) {
            callback()
        })
        .catch(function (error) {
            errorCallback()
            console.log(error)
        })
}

export const signup = (email, password, callback, errorCallback) => {
    return axios.post(`${DOMAIN_AUTH}/dbconnections/signup`, {
            "client_id": CLIEND_ID,
            "email": email,
            "password": password,
            "connection": CONNECTION
        })
        .then(function (response) {
            callback()
        })
        .catch(function (error) {
            console.log(error)
        })
}


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this)
        this.state = {
            username: '',
            password: '',
            errormessage: ''
        }
    }
    static navigationOptions = {
        header: null
    };
    login() {
        if(this.state.username && this.state.password) {
            signin(this.state.username, this.state.password, (res) => {
                store.update('auth', {
                	expire: new Date().getTime()
                }).then(() => {
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Home'})
                        ]
                    })
                    this.props.navigation.dispatch(resetAction)
                })
            }, (err) => {
                this.setState({ errormessage: 'Username or Password are invalid'});
            })
        }
    }
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../../img/logo.png')} />
                    <Text style={styles.title}> An app made for github using React Native</Text>
                </View>
                <View style={styles.formContainter}>
                    <TextInput style={styles.input}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        placeholder="username"
                        onChangeText={(username) => this.setState({username})}
                    />
                    <TextInput style={styles.input}
                        placeholder="password"
                        secureTextEntry
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        onChangeText={(password) => this.setState({password})}
                    />
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
                        <Text style={styles.buttonText} >LOGIN</Text>
                    </TouchableOpacity>
                    <Text style={styles.errormessage} >{this.state.errormessage}</Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 120,
        height: 100
    },
    title: {
        color: '#FFF',
        marginTop: 1,
        width: 160,
        textAlign: 'center',
        opacity: 0.9
    },
    errormessage: {
        color: '#00F'
    },
    formContainter: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF'
    }
})
