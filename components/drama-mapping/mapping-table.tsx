'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, XCircle, ArrowLeftRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DramaSource } from '@/lib/types/drama-mapping';

interface MappingTableProps {
  sourceDramas: DramaSource[];
  targetDramas: DramaSource[];
  onMap: (sourceId: string, targetId: string) => void;
  loading?: boolean;
}

export function MappingTable({ 
  sourceDramas, 
  targetDramas, 
  onMap,
  loading = false 
}: MappingTableProps) {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [sourceFilter, setSourceFilter] = useState('');
  const [targetFilter, setTargetFilter] = useState('');

  const handleMap = (sourceId: string, targetId: string) => {
    setMappings(prev => ({ ...prev, [sourceId]: targetId }));
    onMap(sourceId, targetId);
    setSelectedSource(null);
  };

  const filteredSourceDramas = sourceDramas.filter(drama =>
    drama.title.toLowerCase().includes(sourceFilter.toLowerCase())
  );

  const filteredTargetDramas = targetDramas.filter(drama =>
    drama.title.toLowerCase().includes(targetFilter.toLowerCase())
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[0, 1].map((i) => (
          <div key={i} className="border rounded-lg">
            <div className="p-4 border-b bg-muted">
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="p-4">
              {[0, 1, 2].map((j) => (
                <Skeleton key={j} className="h-12 w-full mb-2" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Source Dramas */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="border rounded-lg"
      >
        <div className="p-4 border-b bg-muted">
          <h3 className="font-semibold mb-2">Bugaboo Inter Dramas</h3>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search dramas..."
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Episodes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {filteredSourceDramas.map((drama) => (
                <motion.tr
                  key={drama.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={selectedSource === drama.id ? 'bg-accent' : ''}
                >
                  <TableCell>{drama.title}</TableCell>
                  <TableCell>{drama.episodes}</TableCell>
                  <TableCell>
                    <Badge variant={drama.status === 'completed' ? 'default' : 'secondary'}>
                      {drama.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedSource(drama.id)}
                      disabled={!!mappings[drama.id]}
                    >
                      {mappings[drama.id] ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </motion.div>
                      ) : (
                        <ArrowLeftRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>

      {/* Target Dramas */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="border rounded-lg"
      >
        <div className="p-4 border-b bg-muted">
          <h3 className="font-semibold mb-2">Bugaboo TV Dramas</h3>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search dramas..."
              value={targetFilter}
              onChange={(e) => setTargetFilter(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Episodes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {filteredTargetDramas.map((drama) => (
                <motion.tr
                  key={drama.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <TableCell>{drama.title}</TableCell>
                  <TableCell>{drama.episodes}</TableCell>
                  <TableCell>
                    <Badge variant={drama.status === 'completed' ? 'default' : 'secondary'}>
                      {drama.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {selectedSource && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMap(selectedSource, drama.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    )}
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}