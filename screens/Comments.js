import { SafeAreaView, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import NavigationBar from '../components/NavigationBar';

const Comments = ( { comments, onClose, onSubmitComment, style } ) => {
	return (
		<SafeAreaView style={ style }>
			<NavigationBar
				leftText="Close"
				onPressLeftText={ onClose }
				title="Comments"
			/>
			<CommentInput
				onSubmit={ onSubmitComment }
				placeholder="Leave a comment"
			/>
			<CommentList items={ comments } />
		</SafeAreaView>
	);
};

Comments.propTypes = {
	comments: PropTypes.arrayOf( PropTypes.string ).isRequired,
	onClose: PropTypes.func.isRequired,
	onSubmitComment: PropTypes.func.isRequired,
	style: ViewPropTypes.style,
};

Comments.defaultProps = {
	style: null,
};

export default Comments;
