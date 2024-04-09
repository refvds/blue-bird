import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/libs/serverAuth';
import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { id } = req.body;

    const { currentUser } = await serverAuth(req, res);
    console.log(id);
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID1');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!post) {
      throw new Error('Invalid ID2');
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    if (req.method === 'POST') {
      updatedLikedIds.push(currentUser.id);
    }

    if (req.method === 'DELETE') {
      updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser.id);
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });
    return res.status(200).json(updatedLikedIds);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
