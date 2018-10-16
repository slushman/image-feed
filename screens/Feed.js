import {
	ActivityIndicator,
	Text,
	ViewPropTypes,
	SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { fetchImages } from '../utils/api';
import CardList from '../components/CardList';

class Feed extends Component {
	static propTypes = {
		commentsForItem: PropTypes.objectOf(
			PropTypes.arrayOf(
				PropTypes.string
			)
		).isRequired,
		onPressComments: PropTypes.func.isRequired,
		style: ViewPropTypes.style,
	};
	static defaultProps = {
		style: null,
	};
	state = {
		loading: true,
		error: false,
		items: [],
	};
	async componentDidMount() {
		try {
			const items = await fetchImages();
			this.setState( {
				loading: false,
				items,
			} );
		} catch( error ) {
			this.setState( {
				loading: false,
				error: true,
			} );
		}
	}
	render() {
		const { commentsForItem, onPressComments, style } = this.props;
		const { loading, error, items } = this.state;
		if ( loading ) {
			<ActivityIndicator size="large" />;
		}
		if ( error ) {
			return <Text>Error...</Text>
		}
		return (
			<SafeAreaView style={ style }>
				<CardList
					commentsForItem={ commentsForItem }
					items={ items }
					onPressComments={ onPressComments }
				/>
			</SafeAreaView>
		);
	}
}

export default Feed;
