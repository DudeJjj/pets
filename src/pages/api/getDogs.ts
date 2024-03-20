import type { NextApiRequest, NextApiResponse } from 'next'
import dogs from '@/shared/constants/dogs.json'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(200).json(dogs)
}
