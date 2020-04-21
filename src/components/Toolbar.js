import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';

export default class Toolbar extends Component {
	render() {
		return (
			<InputToolbar 
				{...this.props}
				containerStyle={css.container}
			/>
		);
	}
}

const css = StyleSheet.create({
	container: {
		elevation: .5,
		paddingLeft: 10,
		marginBottom: 5,
		borderRadius: 50,
		marginHorizontal: 10,
		borderTopColor: '#E8E8E8',
		backgroundColor: '#F0F0F0'
	}
});