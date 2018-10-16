import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CommentList extends Component {
	static propTypes = {
		items: PropTypes.arrayOf( PropTypes.string ).isRequired,
	};
	renderItem = ( item, index ) => (
		<View key={ index } style={ styles.singleComment }>
			<Text>{ item }</Text>
		</View>
	);
	render() {
		const { items } = this.props;
		return (
			<ScrollView>{ items.map( this.renderItem ) }</ScrollView>
		);
	}
}

const styles = StyleSheet.create( {
	singleComment: {
		borderBottomColor: 'rgba(0,0,0,0.05)',
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginLeft: 20,
		paddingRight: 20,
		paddingVertical: 20,
	},
} );

export default CommentList;
