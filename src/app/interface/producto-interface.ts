export interface ProductoInterface {
  id: number;
  title: string;
  price: number;
  description?: string;
  category: {
    id: number;
    name: string;
  };
}
