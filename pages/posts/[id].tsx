import Form from '@/components/Form';
import Header from '@/components/Header';
import CommentFeed from '@/components/posts/CommentFeed';
import PostItem from '@/components/posts/PostItem';
import usePost from '@/hooks/usePost';
import { useRouter } from 'next/router';
import React from 'react';
import { ClipLoader } from 'react-spinners';

const PostView = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: fetchedPost, isLoading } = usePost(id as string);
  console.log(fetchedPost);
  if (isLoading || !fetchedPost) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='Lightblue' size={80} />
      </div>
    );
  }
  return (
    <>
      <Header showBackArrow label='Tweet' />
      <PostItem data={fetchedPost} />
      <Form postId={id as string} isComment placeholder='Tweet your reply' />
      <CommentFeed comments={fetchedPost.comments} />
    </>
  );
};

export default PostView;
