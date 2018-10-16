import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AuthorRow from './AuthorRow';

class Card extends Component {
	state= {
		loading: true,
	};
	static propTypes = {
		fullname: PropTypes.string.isRequired,
		image: Image.propTypes.source.isRequired,
		linkText: PropTypes.string,
		onPressLinkText: PropTypes.func,
	};
	static defaultProps = {
		linkText: '',
		onPressLinkText: () => {},
	};
	shouldComponentUpdate(nextProps) {
		return this.props.linkText !== nextProps.linkText;
	}
	handleLoad = () => {
		this.setState( { loading: false } );
	}
	render() {
		const { fullname, image, linkText, onPressLinkText } = this.props;
		const { loading } = this.state;
		return (
			<View>
				<AuthorRow
					fullname={ fullname }
					linkText={ linkText }
					onPressLinkText={ onPressLinkText }
				/>
				<View style={ styles.image }>
					{
						loading && (
							<ActivityIndicator
								size={ 'large' }
								style={ styles.absoluteFillStyle }
							/>
						)
					}
					<Image
						onLoad={ this.handleLoad }
						source={ image }
						style={ styles.absoluteFillStyle }
					/>
				</View>
				
			</View>
		);
	}
}

const styles = StyleSheet.create( {
	image: {
		aspectRatio: 1,
		backgroundColor: 'rgba(0,0,0,0.02)',
	},
	absoluteFillStyle: {
		bottom: 0,
		left: 0,
		right: 0,
		position: 'absolute',
		top: 0,
	}
} );

export default Card;
