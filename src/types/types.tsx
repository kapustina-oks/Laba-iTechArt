export interface ICategories {
  id: number;
  name: string;
  title: string;
  icons: string;
}

export interface Menu {
  title: string;
  path: string;
  cName: string;
}

export interface dataItems {
  name: string;
  id: number;
  img: string;
  rating: number;
  price: string;
  categories: string[];
  date: Date;
  description: string;
}
