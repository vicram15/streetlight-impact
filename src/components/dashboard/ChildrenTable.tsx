import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Heart, GraduationCap, MapPin } from 'lucide-react';

interface Child {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  district: string;
  location: string;
  education_status: 'none' | 'primary' | 'secondary' | 'higher_secondary' | 'vocational';
  health_status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  verified: boolean;
}

interface ChildrenTableProps {
  children: Child[];
  onViewChild: (child: Child) => void;
}

export const ChildrenTable: React.FC<ChildrenTableProps> = ({ children }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const displayedChildren = showAll ? children : children.slice(0, 5);

  const getEducationBadgeVariant = (status: string) => {
    switch (status) {
      case 'none': return 'destructive';
      case 'primary': return 'secondary';
      case 'secondary': return 'default';
      case 'higher_secondary': return 'default';
      case 'vocational': return 'default';
      default: return 'secondary';
    }
  };

  const getHealthBadgeVariant = (status: string) => {
    switch (status) {
      case 'excellent': return 'default';
      case 'good': return 'secondary';
      case 'fair': return 'secondary';
      case 'poor': return 'destructive';
      case 'critical': return 'destructive';
      default: return 'secondary';
    }
  };

  const formatEducationStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatHealthStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Child Details</DialogTitle>
            <DialogDescription>
              {selectedChild && (
                <div className="space-y-2">
                  <div><strong>Name:</strong> {selectedChild.name}</div>
                  <div><strong>Age:</strong> {selectedChild.age}</div>
                  <div><strong>Gender:</strong> {selectedChild.gender.charAt(0).toUpperCase() + selectedChild.gender.slice(1)}</div>
                  <div><strong>District:</strong> {selectedChild.district}</div>
                  <div><strong>Location:</strong> {selectedChild.location}</div>
                  <div><strong>Education Status:</strong> {formatEducationStatus(selectedChild.education_status)}</div>
                  <div><strong>Health Status:</strong> {formatHealthStatus(selectedChild.health_status)}</div>
                  <div><strong>Status:</strong> {selectedChild.verified ? 'Verified' : 'Pending'}</div>
                  <div className="pt-4">
                    <Button
                      className="w-full gradient-hero text-white border-0"
                      onClick={() => {
                        alert(`Contribute to ${selectedChild.name}`);
                      }}
                    >
                      Contribute
                    </Button>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Children Registry ({children.length} total)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name & Details</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Education</TableHead>
                <TableHead>Health</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedChildren.map((child) => (
                <TableRow key={child.id} className="hover:bg-muted/50 transition-smooth">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{child.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {child.age} years old • {child.gender.charAt(0).toUpperCase() + child.gender.slice(1)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{child.district}</div>
                        <div className="text-xs text-muted-foreground">{child.location}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3 text-muted-foreground" />
                      <Badge variant={getEducationBadgeVariant(child.education_status)} className="text-xs">
                        {formatEducationStatus(child.education_status)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3 text-muted-foreground" />
                      <Badge variant={getHealthBadgeVariant(child.health_status)} className="text-xs">
                        {formatHealthStatus(child.health_status)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {child.verified ? (
                      <Badge className="text-xs gradient-accent text-white border-0">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedChild(child);
                        setDialogOpen(true);
                      }}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {children.length > 5 && (
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAll((prev) => !prev)}
              >
                {showAll ? 'Show Less' : 'Show More'}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
    </>
  );
};