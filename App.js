import React from 'react';
import { AsyncStorage, Modal, Platform, StyleSheet, View } from 'react-native';
import { Constants } from 'expo';

import Feed from './screens/Feed';
import Comments from './screens/Comments';

const ASYNC_STORAGE_COMMENTS_KEY = 'ASYNC_STORAGE_COMMENTS_KEY';

class App extends React.Component {
	state = {
		commentsForItem: {},
		selectedItemId: null,
		showModal: false,
	};
	async componentDidMount () {
		try {
			const commentsForItem = await AsyncStorage.getItem(
				ASYNC_STORAGE_COMMENTS_KEY,
			);
			this.setState( {
				commentsForItem: commentsForItem ? JSON.parse( commentsForItem ) : {},
			} );
		} catch ( error ) {
			console.log( 'Failed to load comments' );
		}
	}
	closeCommentScreen = () => {
		this.setState( {
			selectedItemId: null,
			showModal: false,
		} );
	};
	onSubmitComment = ( text ) => {
		const { commentsForItem, selectedItemId } = this.state;
		const comments = commentsForItem[ selectedItemId ] || [];
		const updated = {
			...commentsForItem,
			[ selectedItemId ] : [ ...comments, text ],
		};
		this.setState( { commentsForItem: updated } );
		try {
			AsyncStorage.setItem( ASYNC_STORAGE_COMMENTS_KEY, JSON.stringify( updated ) );
		} catch ( error ) {
			console.log( 'Failed to save comment', text, 'for', selectedItemId );
		}
	};
	openCommentScreen = ( id ) => {
		this.setState( {
			selectedItemId: id,
			showModal: true,
		} );
	};
	render() {
		const { commentsForItem, selectedItemId, showModal } = this.state;
		const items = [
			{
				id: 0,
				author: 'Bob Ross',
			},
			{
				id: 1,
				author: 'Chuck Norris',
			},
		];
		return (
			<View style={ styles.container }>
				<Feed
					commentsForItem={ commentsForItem }
					onPressComments={ this.openCommentScreen }
					style={ styles.feed }
				/>
				<Modal
					animationType="slide"
					onRequestClose={ this.closeCommentScreen }
					visible={ showModal }
				>
					<Comments
						comments={ commentsForItem[ selectedItemId ] || [] }
						onClose={ this.closeCommentScreen }
						onSubmitComment={ this.onSubmitComment }
						style={ styles.container }
					/>
				</Modal>
			</View>
		);
	}
}

const platformVersion = Platform.OS === 'ios' ? parseInt( Platform.Version, 10 ) : Platform.Version;

const styles = StyleSheet.create( {
	comments: {
		flex: 1,
		marginTop: 'ios' == Platform.OS && 11 > platformVersion
			? Constants.statusBarHeight
			: 0,
	},
	container: {
		backgroundColor: '#fff',
		flex: 1,
	},
	feed: {
		flex: 1,
		marginTop: Platform.OS === 'android' || platformVersion < 11 ? Constants.statusBarHeight : 0,
	},
} );

export default App;
