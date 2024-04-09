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

    const notifications = await prisma.notification.findMany({
      where: {
        userId: Number(id),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        hasNotification: false,
      },
    });
    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
