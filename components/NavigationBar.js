import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

const NavigationBar = ( { title, leftText, onPressLeftText } ) => {
	return (
		<View style={ styles.container }>
			<TouchableOpacity style={ styles.leftText } onPress={ onPressLeftText }>
				<Text>{ leftText }</Text>
			</TouchableOpacity>
			<Text style={ styles.title }>{ title }</Text>
		</View>
	);
}

const styles = {
	container: {
		alignItems: 'center',
		borderBottomColor: 'rgba(0,0,0,0.1)',
		borderBottomWidth: StyleSheet.hairlineWidth,
		height: 40,
		justifyContent: 'center',
	},
	title: {
		fontWeight: '500',
	},
	leftText: {
		bottom: 0,
		justifyContent: 'center',
		left: 20,
		position: 'absolute',
		top: 0,
	},
};

NavigationBar.propTypes = {
	leftText: PropTypes.string,
	onPressLeftText: PropTypes.func,
	title: PropTypes.string,
};

NavigationBar.defaultProps = {
	leftText: '',
	onPressLeftText: () => {},
	title: '',
};

export default NavigationBar;
