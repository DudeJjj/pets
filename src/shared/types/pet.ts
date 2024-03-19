export interface PetProps {
  id: number;
  name: string;
  amount: number;
  totalAmount: number;
  slug: string;
  fullImages: string[];
  imageSrc: string[];
  characteristics: {
    age: string;
    size: string;
    passport: string;
    neutered: string;
    chipped: string;
    children: string;
    description: string;
  }
}

export interface PetMiniProps {
  id: number;
  name: string;
  totalAmount: number;
  slug: string;
  imageSrc: string[];
}[]
