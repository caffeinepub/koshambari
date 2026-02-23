import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  rating: number;
  review: string;
  date: string;
}

export default function TestimonialCard({ name, rating, review, date }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col space-y-4 p-6">
        <div className="flex items-center space-x-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
        </div>
        <p className="flex-1 text-sm text-muted-foreground">{review}</p>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </CardContent>
    </Card>
  );
}
