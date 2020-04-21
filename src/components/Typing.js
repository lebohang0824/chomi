import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Typing extends React.PureComponent {
	render() {
		return (
			<View style={css.container}>
				<Text style={css.text}>Typing...</Text>
			</View>
		);
	}
}

const css = StyleSheet.create({
	container: {
		marginBottom: 15,
		marginLeft: 25
	},
	text: {
		color: '#B5B5B5',
		fontSize: 13
	}
});