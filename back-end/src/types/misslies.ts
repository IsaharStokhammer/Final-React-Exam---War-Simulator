export interface IMissile extends Document {
    name: string;
    description: string;
    speed: number;
    intercepts: string[];
    price: number;
  }