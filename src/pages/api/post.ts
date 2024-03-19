import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

import cats from '@/shared/constants/cats.json'
import dogs from '@/shared/constants/dogs.json'
import { PetProps } from '@/shared/types/pet'

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method === 'POST') {
    try {
      const {pet, select, selectedId, newAmount} = req.body;
      const petToUpdate = 
        pet === 'cats' 
          ? cats.find((pet: PetProps) => pet.id === selectedId) 
          : dogs.find((pet: PetProps) => pet.id === selectedId) 

      if (pet === 'cats' && petToUpdate && select === 'totalAmount') {
          petToUpdate.totalAmount = newAmount;
          fs.writeFileSync(`./src/shared/constants/${pet}.json`, JSON.stringify(cats, null, 2)) 
          res.status(200).json({ message: 'ok' });
      } else if (pet === 'cats' && petToUpdate && select === 'amount') {
          petToUpdate.amount = newAmount;
          fs.writeFileSync(`./src/shared/constants/${pet}.json`, JSON.stringify(cats, null, 2)) 
          res.status(200).json({ message: 'ok' });
      }

      if (pet === 'dogs' && petToUpdate && select === 'totalAmount') {
          petToUpdate.totalAmount = newAmount;
          fs.writeFileSync(`./src/shared/constants/${pet}.json`, JSON.stringify(dogs, null, 2)) 
          res.status(200).json({ message: 'ok' });
      } else if (pet === 'dogs' && petToUpdate && select === 'amount') {
          petToUpdate.amount = newAmount;
          fs.writeFileSync(`./src/shared/constants/${pet}.json`, JSON.stringify(dogs, null, 2)) 
          res.status(200).json({ message: 'ok' });
      }
    
    } catch (error) {
      res.status(500).json({ message: `${error}` });
      console.error(error)
    }

  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
