import usePosts from '@/hooks/userPosts';
import React, { FC } from 'react';
import PostItem from './PostItem';

interface IPostFeedProps {
  userId?: string;
}

const PostFeed: FC<IPostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId as string);

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem key={post.id} userId={userId} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
