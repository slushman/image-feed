import React from 'react'
import { Text, View, ColorPropType, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Avatar = ( { backgroundColor, initials, size } ) => {
	const style = {
		width: size,
		height: size,
		borderRadius: size / 2,
		backgroundColor,
	};
	return (
		<View style={ [ styles.container, style ] }>
			<Text style={ styles.text }>{ initials }</Text>
		</View>
	)
}

const styles = StyleSheet.create( {
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: 'white',
	},
} );

Avatar.propTypes = {
	backgroundColor: ColorPropType.isRequired,
	initials: PropTypes.string.isRequired,
	size: PropTypes.number.isRequired,
};

export default Avatar;
