import { StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CommentInput extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		placeholder: PropTypes.string,
	};
	static defaultProps = {
		placeholder: '',
	};
	state = {
		text: '',
	};
	handleChangeText = ( text ) => {
		this.setState( { text } );
	}
	handleSubmitEditing = () => {
		const { onSubmit } = this.props;
		const { text } = this.state;

		if ( ! text ) { return; }

		onSubmit( text );
		this.setState( { text: '' } );
	}
	render() {
		const { placeholder } = this.props;
		const { text } = this.state;
		return (
			<View style={ styles.container }>
				<TextInput
					onChangeText={ this.handleChangeText }
					onSubmitEditing={ this.handleSubmitEditing }
					placeholder={ placeholder }
					style={ styles.input }
					underlineColorAndroid="transparent"
					value={ text }
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create( {
	container: {
		borderBottomColor: 'rgba(0,0,0,0.1)',
		borderBottomWidth: StyleSheet.hairlineWidth,
		height: 60,
		paddingHorizontal: 20,
	},
	input: {
		flex: 1,
	},
} );

export default CommentInput;
