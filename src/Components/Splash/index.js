import React, { Component } from 'react';

import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView , Button} from 'react-native';
import { NavigationActions } from 'react-navigation'
import store from 'react-native-simple-store';

export default class Spash extends Component {
    constructor(props) {
        super(props)
        store.get('auth')
            .then((res) => {
                if(res) {
                    setTimeout(function() {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Home'})
                            ]
                        })
                        this.props.navigation.dispatch(resetAction)
                    }.bind(this), 1500);
                } else {
                    setTimeout(function() {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Login'})
                            ]
                        })
                        this.props.navigation.dispatch(resetAction)
                    }.bind(this), 1500);
                }
            })
    }
    static navigationOptions = {
        header: null
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../../img/logo.png')} />
                    <Text style={styles.title}> An app made for github using React Native</Text>
                </View>
            </View>
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
