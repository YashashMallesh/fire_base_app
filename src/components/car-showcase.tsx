"use client";

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { cars, type Car } from '@/lib/cars';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CarShowcaseProps {
  onActiveCarChange: (car: Car) => void;
}

const CarShowcase = ({ onActiveCarChange }: CarShowcaseProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [displayedIndex, setDisplayedIndex] = useState(0);

  const activeCar = useMemo(() => cars[displayedIndex], [displayedIndex]);
  const imageMap = useMemo(() => new Map(PlaceHolderImages.map(img => [img.id, img])), []);

  const handleCarChange = (newIndex: number) => {
    if (newIndex === activeIndex || isChanging) return;

    setIsChanging(true);
    setActiveIndex(newIndex);
    onActiveCarChange(cars[newIndex]);

    setTimeout(() => {
      setDisplayedIndex(newIndex);
      setTimeout(() => {
        setIsChanging(false);
      }, 250);
    }, 250);
  };
  
  // Preload images
  useEffect(() => {
    cars.forEach(car => {
      const imgUrl = imageMap.get(car.imageId)?.imageUrl;
      if (imgUrl) {
        const img = new window.Image();
        img.src = imgUrl;
      }
    });
  }, [imageMap]);

  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center flex-1 h-full -mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 xl:gap-16 w-full max-w-6xl">
        <div className="order-2 lg:order-1 lg:text-left lg:items-start flex flex-col items-center">
           <div
            key={displayedIndex}
            className="w-full animate-fade-in-up"
            style={{ animationDelay: '250ms', animationFillMode: 'backwards' }}
          >
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary">
              {activeCar.brand} <span className="text-accent">{activeCar.name}</span>
            </h1>
            <p className="mt-4 max-w-md text-foreground/80 mx-auto lg:mx-0">
              {activeCar.description}
            </p>
            <Button size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
              Discover More
            </Button>
          </div>
        </div>

        <div className="relative w-full aspect-[4/3] order-1 lg:order-2">
          {cars.map((car, index) => {
            const placeholder = imageMap.get(car.imageId);
            if (!placeholder) return null;
            return (
              <Image
                key={car.id}
                src={placeholder.imageUrl}
                alt={placeholder.description}
                fill
                priority={index === 0}
                data-ai-hint={placeholder.imageHint}
                className={cn(
                  "object-contain transition-opacity duration-500 ease-in-out",
                  activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                )}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-12 lg:mt-24 pb-12">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {cars.map((car, index) => {
            const placeholder = imageMap.get(car.imageId);
            if (!placeholder) return null;
            return (
              <Card
                key={car.id}
                onClick={() => handleCarChange(index)}
                className={cn(
                  "w-16 h-12 md:w-28 md:h-20 cursor-pointer transition-all duration-300 overflow-hidden relative border-2 group",
                  activeIndex === index ? 'border-accent shadow-lg' : 'border-transparent hover:border-accent/50'
                )}
              >
                <Image
                  src={placeholder.imageUrl}
                  alt={placeholder.description}
                  data-ai-hint={placeholder.imageHint}
                  fill
                  className="object-cover"
                />
                <div className={cn(
                  "absolute inset-0 bg-black/50 transition-opacity",
                  activeIndex === index ? 'opacity-0' : 'opacity-100 group-hover:opacity-50'
                )} />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CarShowcase;
