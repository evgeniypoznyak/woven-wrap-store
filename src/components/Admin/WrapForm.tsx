
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Upload, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface WrapFormProps {
  wrap?: any;
  onClose: () => void;
}

const WrapForm = ({ wrap, onClose }: WrapFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    material: '',
    size: '',
    category: '',
    colors: '',
    in_stock: true,
    is_new: false,
    is_featured: false,
  });
  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (wrap) {
      setFormData({
        name: wrap.name || '',
        description: wrap.description || '',
        price: wrap.price?.toString() || '',
        original_price: wrap.original_price?.toString() || '',
        material: wrap.material || '',
        size: wrap.size || '',
        category: wrap.category || '',
        colors: wrap.colors?.join(', ') || '',
        in_stock: wrap.in_stock ?? true,
        is_new: wrap.is_new ?? false,
        is_featured: wrap.is_featured ?? false,
      });
      setImages(wrap.wrap_images || []);
    }
  }, [wrap]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from('wrap-images')
          .upload(fileName, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('wrap-images')
          .getPublicUrl(fileName);

        return {
          image_url: publicUrl,
          display_order: images.length + 1
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);
      setImages(prev => [...prev, ...uploadedImages]);
      
      toast({
        title: "Images uploaded",
        description: `${uploadedImages.length} image(s) uploaded successfully.`,
      });
    } catch (error: any) {
      toast({
        title: "Upload error",
        description: error.message || "Failed to upload images.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const wrapData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        material: formData.material,
        size: formData.size,
        category: formData.category,
        colors: formData.colors.split(',').map(c => c.trim()).filter(c => c),
        in_stock: formData.in_stock,
        is_new: formData.is_new,
        is_featured: formData.is_featured,
        updated_at: new Date().toISOString(),
      };

      let wrapId: string;

      if (wrap) {
        // Update existing wrap
        const { error } = await supabase
          .from('wraps')
          .update(wrapData)
          .eq('id', wrap.id);

        if (error) throw error;
        wrapId = wrap.id;

        // Delete existing images from database
        await supabase
          .from('wrap_images')
          .delete()
          .eq('wrap_id', wrap.id);
      } else {
        // Create new wrap
        const { data, error } = await supabase
          .from('wraps')
          .insert(wrapData)
          .select()
          .single();

        if (error) throw error;
        wrapId = data.id;
      }

      // Insert images
      if (images.length > 0) {
        const imageData = images.map((img, index) => ({
          wrap_id: wrapId,
          image_url: img.image_url,
          display_order: index + 1,
        }));

        const { error: imageError } = await supabase
          .from('wrap_images')
          .insert(imageData);

        if (imageError) throw imageError;
      }

      toast({
        title: wrap ? "Wrap updated" : "Wrap created",
        description: `The wrap has been successfully ${wrap ? 'updated' : 'created'}.`,
      });

      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save wrap.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{wrap ? 'Edit Wrap' : 'Create New Wrap'}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                className="w-full min-h-20 px-3 py-2 border border-input rounded-md resize-none"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="original_price">Original Price</Label>
                <Input
                  id="original_price"
                  name="original_price"
                  type="number"
                  step="0.01"
                  value={formData.original_price}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                <Input
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="colors">Colors (comma-separated)</Label>
              <Input
                id="colors"
                name="colors"
                value={formData.colors}
                onChange={handleInputChange}
                placeholder="e.g., Red, Blue, Green"
              />
            </div>

            <div className="space-y-4">
              <Label>Images</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    {uploading ? 'Uploading...' : 'Click to upload images'}
                  </span>
                </label>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.image_url}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="in_stock"
                  checked={formData.in_stock}
                  onChange={handleInputChange}
                />
                <span className="text-sm">In Stock</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="is_new"
                  checked={formData.is_new}
                  onChange={handleInputChange}
                />
                <span className="text-sm">New Product</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleInputChange}
                />
                <span className="text-sm">Featured</span>
              </label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                className="bg-wrap-burgundy hover:bg-wrap-burgundy/90"
                disabled={saving || uploading}
              >
                {saving ? 'Saving...' : wrap ? 'Update Wrap' : 'Create Wrap'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WrapForm;
