import type { NextApiRequest, NextApiResponse } from 'next'
import cats from '@/shared/constants/cats.json'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(200).json(cats)
}
