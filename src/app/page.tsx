"use client";

import { useState } from 'react';
import Header from '@/components/layout/header';
import CarShowcase from '@/components/car-showcase';
import { cars } from '@/lib/cars';

export default function Home() {
  const [activeCarColor, setActiveCarColor] = useState(cars[0].color);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background font-body">
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 65%, ${activeCarColor}20 0%, hsl(var(--background)) 50%)`
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 animate-grid-pulse"
        style={{
          '--grid-color': 'hsl(var(--foreground) / 0.05)',
          backgroundSize: '40px 40px',
          backgroundImage: 'linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)',
        }}
      />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <CarShowcase onActiveCarChange={(car) => setActiveCarColor(car.color)} />
        </main>
      </div>
    </div>
  );
}
