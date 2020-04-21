import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';

// Components
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class SendButton extends Component {
	render() {
		return (
			<Send 
				{...this.props}
				containerStyle={css.container} 
				children={<MaterialIcon name="send" style={css.icon} />}
			/>
		);
	}
}

const css = StyleSheet.create({
	container: {
		width: 40,
		height: 35,
		marginRight: 5,
		borderRadius: 50,
		alignSelf: 'center'
	},
	icon: {
		left: 2,
		top: -5,
		fontSize: 25,
		color: '#555',
		alignSelf: 'center',
	}
});