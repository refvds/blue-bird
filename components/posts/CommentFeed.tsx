import React, { FC } from 'react';
import CommentItem from './CommentItem';

interface ICommentFeedProps {
  comments?: Record<string, any>[];
}

const CommentFeed: FC<ICommentFeedProps> = ({ comments = [] }) => {
  return (
    <>
      {comments.map((comment: Record<string, any>) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
