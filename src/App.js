import React from 'react';
import Storage from './services/Storage';
import { Route } from './services/Router';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';

// Service
import axios from 'axios';

// Components
import { Color } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class App extends React.Component {

    state = { name: null }

    _login() {

        // Check empty
        if (!this.state.name || 0 === this.state.name.length) {
            return Alert.alert('Enter your name','Name can not be empty');
        }

        this.setState({ active: true });

        axios.post('https://wiki101.herokuapp.com/api/database',{ name: this.state.name })
            .then(({data}) => {
                this.setState({ active: false });
                Storage.set('name', this.state.name).then(() => Route.set('Main'));
            })
        .catch(err => console.log(err));        
    }

    render() {
        return (
            <View style={css.container}>
                <View style={css.inputs}>
                    <Image source={ require('./img.png') } style={css.image} />
                </View>
                <View style={css.inputs}>
                    <Input 
                        placeholder="Enter your name"
                        inputContainerStyle={css.input}
                        leftIconContainerStyle={css.leftIcon} 
                        onChangeText={name => this.setState({ name })}
                        leftIcon={<Icon name="user-o" size={20} style={css.icon} />} 
                    />
                </View>
                <View style={css.buttons}>
                    <Button 
                        title="Start A Chat" 
                        buttonStyle={css.button} 
                        loading={this.state.active}
                        onPress={this._login.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

App.options = {
    topBar: { visible: false }
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF',
        justifyContent: 'center'
    },
    text: {
        paddingVertical: 20
    },
    inputs: {
        width: '80%'
    },
    input: {
        borderBottomColor: '#D0D0D0'
    },
    buttons: {
        padding: 10,
        width: '80%',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#0084ff'
    },
    icon: {
        width: 30
    },
    image: {
        top: -50,
        alignSelf: 'center'
    }
});