import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { id } = req.query;
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID');
    }
    const existedUser = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: Number(id),
        },
      },
    });

    return res.status(200).json({ ...existedUser, followersCount });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
