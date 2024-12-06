'use client';

import { useState, useEffect } from 'react';
import { MappingTable } from '@/components/drama-mapping/mapping-table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateMockDramaSources } from '@/lib/mock-data/drama-mapping';
import { toast } from 'sonner';
import type { DramaSource } from '@/lib/types/drama-mapping';

export default function DramaMappingPage() {
  const [sourceDramas, setSourceDramas] = useState<DramaSource[]>([]);
  const [targetDramas, setTargetDramas] = useState<DramaSource[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDramas = async () => {
    try {
      setLoading(true);
      // In a real application, these would be API calls
      const interDramas = generateMockDramaSources('bugaboo_inter');
      const tvDramas = generateMockDramaSources('bugaboo_tv');
      
      setSourceDramas(interDramas);
      setTargetDramas(tvDramas);
      toast.success('Drama data loaded successfully');
    } catch (error) {
      toast.error('Failed to load drama data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDramas();
  }, []);

  const handleMap = async (sourceId: string, targetId: string) => {
    try {
      // In a real application, this would be an API call
      toast.success('Dramas mapped successfully');
    } catch (error) {
      toast.error('Failed to map dramas');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Drama Mapping</CardTitle>
          <CardDescription>
            Map dramas between Bugaboo Inter and Bugaboo TV platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MappingTable 
            sourceDramas={sourceDramas}
            targetDramas={targetDramas}
            onMap={handleMap}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
}