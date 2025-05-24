
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Package, Image, DollarSign } from 'lucide-react';
import WrapForm from '@/components/Admin/WrapForm';
import WrapList from '@/components/Admin/WrapList';
import { toast } from '@/hooks/use-toast';

const Admin = () => {
  const [showWrapForm, setShowWrapForm] = useState(false);
  const [editingWrap, setEditingWrap] = useState(null);

  const { data: wraps, refetch: refetchWraps } = useQuery({
    queryKey: ['admin-wraps'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wraps')
        .select(`
          *,
          wrap_images (
            id,
            image_url,
            display_order
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleEditWrap = (wrap: any) => {
    setEditingWrap(wrap);
    setShowWrapForm(true);
  };

  const handleFormClose = () => {
    setShowWrapForm(false);
    setEditingWrap(null);
    refetchWraps();
  };

  const handleDeleteWrap = async (wrapId: string) => {
    try {
      const { error } = await supabase
        .from('wraps')
        .delete()
        .eq('id', wrapId);

      if (error) throw error;

      toast({
        title: "Wrap deleted",
        description: "The wrap has been successfully deleted.",
      });
      
      refetchWraps();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete wrap.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="container-custom pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your wrap products and content</p>
        </div>

        <Tabs defaultValue="wraps" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-96">
            <TabsTrigger value="wraps" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Wraps
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Images
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Pricing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wraps" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Wrap Products</CardTitle>
                <Button
                  onClick={() => setShowWrapForm(true)}
                  className="bg-wrap-burgundy hover:bg-wrap-burgundy/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Wrap
                </Button>
              </CardHeader>
              <CardContent>
                <WrapList 
                  wraps={wraps || []}
                  onEdit={handleEditWrap}
                  onDelete={handleDeleteWrap}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Image Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Image management will be available when editing individual wraps.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Pricing can be managed when creating or editing wraps.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {showWrapForm && (
        <WrapForm
          wrap={editingWrap}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default Admin;
