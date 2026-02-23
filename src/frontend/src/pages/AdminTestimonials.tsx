import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useTestimonials, useDeleteTestimonial } from '@/hooks/useTestimonials';
import { Testimonial } from '@/backend';
import TestimonialForm from '@/components/TestimonialForm';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function AdminTestimonials() {
  const { data: testimonials = [], isLoading } = useTestimonials();
  const deleteTestimonial = useDeleteTestimonial();
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteTestimonialId, setDeleteTestimonialId] = useState<bigint | null>(null);

  const handleDelete = async () => {
    if (deleteTestimonialId === null) return;
    try {
      await deleteTestimonial.mutateAsync(deleteTestimonialId);
      toast.success('Testimonial deleted successfully');
      setDeleteTestimonialId(null);
    } catch (error) {
      toast.error('Failed to delete testimonial');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
          <p className="text-muted-foreground">Manage customer testimonials</p>
        </div>
        <Button
          onClick={() => {
            setEditingTestimonial(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Testimonials ({testimonials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading testimonials...</p>
          ) : testimonials.length === 0 ? (
            <p className="text-center text-muted-foreground">No testimonials yet. Add your first testimonial!</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id.toString()}>
                    <TableCell className="font-medium">{testimonial.customerName}</TableCell>
                    <TableCell>{'⭐'.repeat(Number(testimonial.rating))}</TableCell>
                    <TableCell className="max-w-md truncate">{testimonial.reviewText}</TableCell>
                    <TableCell>{testimonial.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingTestimonial(testimonial);
                            setIsFormOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteTestimonialId(testimonial.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
            </DialogTitle>
          </DialogHeader>
          <TestimonialForm
            testimonial={editingTestimonial}
            onSuccess={() => {
              setIsFormOpen(false);
              setEditingTestimonial(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={deleteTestimonialId !== null}
        onOpenChange={(open) => !open && setDeleteTestimonialId(null)}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        description="Are you sure you want to delete this testimonial? This action cannot be undone."
      />
    </div>
  );
}
