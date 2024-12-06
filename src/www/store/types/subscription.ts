export interface ISubscription {
  id: string;
  category: string;
  name: string;
  title: string;
  description: string;
  term: number;
  termDescription: string;
  cover: string;
  originalPrice?: number | null;
  discountPrice?: number | null;
  type: string;
  logo: string;
  link: string;
  background?: string | null;
  onSale: boolean;
  updatedAt?: Date | null;
  createdAt?: Date | null;
}

export interface ISubscriptions {
  psPlus: ISubscription[];
  ubisoftPlus: ISubscription[];
  gtaPlus: ISubscription[];
  eaPlay: ISubscription[];
}

export interface ISubLogo {
  width: number;
  height: number;
}
