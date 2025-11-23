"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateStyleSuggestions } from '@/app/actions';
import type { StyleSuggestionOutput } from '@/ai/flows/personalized-style-suggestions';
import { useToast } from "@/hooks/use-toast";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from './ui/scroll-area';

const carBrandOptions = ["Luxury", "Sports", "Electric", "Classic", "Off-road"];
const colorSchemeOptions = ["Dark & Moody", "Bright & Vibrant", "Minimalist & Clean"];
const animationStyleOptions = ["Subtle & Smooth", "Bold & Dynamic", "Minimalistic"];

const formSchema = z.object({
  preferredCarBrands: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one car brand.",
  }),
  preferredColorSchemes: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one color scheme.",
  }),
  preferredAnimationStyles: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one animation style.",
  }),
  userDescription: z.string().min(20, {
    message: 'Please describe your desired style in at least 20 characters.',
  }),
});

type StyleSuggestorProps = {
  onOpenChange: (open: boolean) => void;
};

const StyleSuggestor = ({ onOpenChange }: StyleSuggestorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<StyleSuggestionOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferredCarBrands: [],
      preferredColorSchemes: [],
      preferredAnimationStyles: [],
      userDescription: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResult(null);

    const response = await generateStyleSuggestions(values);

    if (response.success) {
      setResult(response.data);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: response.error,
      });
    }

    setIsLoading(false);
  };
  
  const handleReset = () => {
    form.reset();
    setResult(null);
  }

  return (
    <SheetContent className="w-full sm:max-w-lg flex flex-col">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2 text-2xl font-headline">
          <Wand2 className="text-accent" /> AI Style Suggestor
        </SheetTitle>
        <SheetDescription>
          Tell us your preferences, and our AI will generate a unique visual style for your car showcase.
        </SheetDescription>
      </SheetHeader>
      
      <ScrollArea className="flex-1 pr-6 -mr-6">
      <div className="py-4">
        {result ? (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold text-primary">Your Personalized Suggestions</h3>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-foreground/80 italic">{result.reasoning}</p>
              </CardContent>
            </Card>

            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>Suggested Animations</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/80">
                    {result.suggestedAnimations.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Suggested Backgrounds</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/80">
                    {result.suggestedBackgroundImages.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Suggested Interactive Elements</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/80">
                    {result.suggestedInteractiveElements.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Start Over
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="preferredCarBrands"
                render={() => (
                  <FormItem>
                    <FormLabel>Preferred Car Brands</FormLabel>
                    <div className="space-y-2">
                      {carBrandOptions.map(item => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="preferredCarBrands"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value.includes(item)}
                                  onCheckedChange={checked => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(field.value.filter(value => value !== item));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredColorSchemes"
                render={() => (
                  <FormItem>
                    <FormLabel>Preferred Color Schemes</FormLabel>
                    <div className="space-y-2">
                      {colorSchemeOptions.map(item => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="preferredColorSchemes"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value.includes(item)}
                                  onCheckedChange={checked => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(field.value.filter(value => value !== item));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredAnimationStyles"
                render={() => (
                  <FormItem>
                    <FormLabel>Preferred Animation Styles</FormLabel>
                    <div className="space-y-2">
                      {animationStyleOptions.map(item => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="preferredAnimationStyles"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value.includes(item)}
                                  onCheckedChange={checked => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(field.value.filter(value => value !== item));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe your style</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I like clean, futuristic designs with a bit of a retro vibe..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>The more details you provide, the better the suggestions will be.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                {isLoading ? 'Generating...' : 'Generate Suggestions'}
              </Button>
            </form>
          </Form>
        )}
      </div>
      </ScrollArea>

      <SheetFooter className="mt-auto pt-4 border-t">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Close
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default StyleSuggestor;
