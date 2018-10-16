import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getImageFromId } from '../utils/api';
import Card from './Card';

const keyExtractor = ( { id } ) => id.toString();

class CardList extends Component {
	static propTypes = {
		commentsForItem: PropTypes.objectOf(
			PropTypes.arrayOf(
				PropTypes.string
			)
		).isRequired,
		items: PropTypes.arrayOf(
			PropTypes.shape( {
				id: PropTypes.number.isRequired,
				author: PropTypes.string.isRequired,
			} ),
		).isRequired,
		onPressComments: PropTypes.func.isRequired,
	};
	renderItem = ( { item: { id, author } } ) => {
		const { commentsForItem, onPressComments } = this.props;
		const comments = commentsForItem[ id ];
		return (
			<Card
				fullname={ author }
				image={ {
					uri: getImageFromId( id ),
				} }
				linkText={ `${ comments ? comments.length : 0 } Comments` }
				onPressLinkText={ () => onPressComments( id ) }
			/>
		);
	};
	render() {
		const { commentsForItem, items } = this.props;
		return (
			<FlatList
				data={ items }
				extraData={ commentsForItem }
				renderItem={ this.renderItem }
				keyExtractor={ keyExtractor }
			/>
		)
	}
}

export default CardList;
