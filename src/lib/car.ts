export type Car = {
  id: string;
  name: string;
  brand: string;
  description: string;
  imageId: string;
  color: string;
};

export const cars: Car[] = [
  {
    id: 'c1',
    name: 'Cyber-GT',
    brand: 'FutureDrive',
    description: 'Experience the pinnacle of electric performance. The Cyber-GT combines breathtaking speed with a revolutionary design, defining the next era of sports cars.',
    imageId: 'car-1',
    color: '#9E9E9E' // Silver/Grey
  },
  {
    id: 'c2',
    name: 'V8 Interceptor',
    brand: 'RetroMuscle',
    description: 'Unleash the raw power of American muscle. The V8 Interceptor is a tribute to the golden age of roaring engines and timeless, aggressive styling.',
    imageId: 'car-2',
    color: '#D32F2F' // Red
  },
  {
    id: 'c3',
    name: 'Onyx Phantom',
    brand: 'LuxeLine',
    description: 'The ultimate statement in luxury and sophistication. The Onyx Phantom offers a whisper-quiet ride, unparalleled comfort, and an imposing presence.',
    imageId: 'car-3',
    color: '#212121' // Black
  },
  {
    id: 'c4',
    name: 'Voltara',
    brand: 'EcoMotive',
    description: 'Navigate your world with clean energy. The Voltara is a versatile electric SUV designed for the modern family, blending space, safety, and sustainability.',
    imageId: 'car-4',
    color: '#1976D2' // Blue
  },
  {
    id: 'c5',
    name: 'Dune Raider',
    brand: 'TerraForm',
    description: 'Adventure awaits. Built to conquer any terrain, the Dune Raider is your reliable partner for off-road exploration and extreme conditions.',
    imageId: 'car-5',
    color: '#BCAAA4' // Desert Sand
  }
];
