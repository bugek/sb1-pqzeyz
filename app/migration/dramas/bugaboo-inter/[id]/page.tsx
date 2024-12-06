'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const dramaSchema = z.object({
  title_en: z.string().min(1, 'English title is required'),
  title_th: z.string().min(1, 'Thai title is required'),
  synopsis_en: z.string().min(1, 'English synopsis is required'),
  synopsis_th: z.string().min(1, 'Thai synopsis is required'),
  description_en: z.string().min(1, 'English description is required'),
  description_th: z.string().min(1, 'Thai description is required'),
  category_en: z.string().min(1, 'English category is required'),
  category_th: z.string().min(1, 'Thai category is required'),
  year_en: z.string().min(1, 'English year is required'),
  year_th: z.string().min(1, 'Thai year is required'),
  total_ep: z.number().min(1, 'Total episodes must be at least 1'),
  rating: z.number().min(0).max(10, 'Rating must be between 0 and 10'),
  parental_rating: z.string().min(1, 'Parental rating is required'),
});

type DramaFormValues = z.infer<typeof dramaSchema>;

function DramaEditPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<DramaFormValues | null>(null);

  const form = useForm<DramaFormValues>({
    resolver: zodResolver(dramaSchema),
    defaultValues: initialData || {
      title_en: '',
      title_th: '',
      synopsis_en: '',
      synopsis_th: '',
      description_en: '',
      description_th: '',
      category_en: '',
      category_th: '',
      year_en: '',
      year_th: '',
      total_ep: 1,
      rating: 0,
      parental_rating: '',
    },
  });

  useEffect(() => {
    const fetchDramaData = async () => {
      if (!params.id) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/dramas/bugaboo-inter/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch drama data');
        const data: DramaFormValues = await response.json();
        setInitialData(data);
        form.reset(mockData);
        toast.success('Drama data loaded successfully');
      } catch (error) {
        toast.error('Failed to load drama data');
        router.push('/migration/dramas/bugaboo-inter');
      } finally {
        setLoading(false);
      }
    };

    fetchDramaData();
  }, [params.id, form, router]);

  const onSubmit = async (data: DramaFormValues) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/dramas/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update drama');
      toast.success('Drama updated successfully');
      router.push('/migration/dramas/bugaboo-inter');
    } catch (error) {
      toast.error('Failed to update drama');
    } finally {
      setLoading(false);
    }
  };

  if (!initialData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Drama</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>English Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title_th"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thai Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="synopsis_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>English Synopsis</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="synopsis_th"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thai Synopsis</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>English Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description_th"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thai Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>English Category</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category_th"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thai Category</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>English Year</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year_th"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thai Year</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="total_ep"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Episodes</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.1" 
                          {...field} 
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parental_rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parental Rating</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default DramaEditPage;
