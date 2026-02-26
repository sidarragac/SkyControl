export interface AirlineInterface {
  id:string;
  name: string;
  country: string;
  destinations: string[];
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}