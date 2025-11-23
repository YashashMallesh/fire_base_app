'use client';

import Link from 'next/link';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import StyleSuggestor from '@/components/style-suggester';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold font-headline text-primary">
          CARZONA
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">Home</Link>
          <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">Brands</Link>
          <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">Cars</Link>
          <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">About</Link>
        </nav>
        
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button>
              <Wand2 className="mr-2 h-4 w-4" />
              AI Style Suggestions
            </Button>
          </SheetTrigger>
          <StyleSuggestor onOpenChange={setIsSheetOpen} />
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
