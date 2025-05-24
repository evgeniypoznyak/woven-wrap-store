
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface WrapListProps {
  wraps: any[];
  onEdit: (wrap: any) => void;
  onDelete: (wrapId: string) => void;
}

const WrapList = ({ wraps, onEdit, onDelete }: WrapListProps) => {
  if (wraps.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No wraps found. Create your first wrap to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {wraps.map((wrap) => (
        <Card key={wrap.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{wrap.name}</h3>
                  <div className="flex gap-1">
                    {wrap.is_new && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        New
                      </Badge>
                    )}
                    {wrap.is_featured && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Featured
                      </Badge>
                    )}
                    <Badge variant={wrap.in_stock ? "default" : "destructive"}>
                      {wrap.in_stock ? (
                        <><Eye className="h-3 w-3 mr-1" />In Stock</>
                      ) : (
                        <><EyeOff className="h-3 w-3 mr-1" />Out of Stock</>
                      )}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-2 line-clamp-2">{wrap.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Price:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-wrap-burgundy">
                        ${wrap.price}
                      </span>
                      {wrap.original_price && (
                        <span className="text-gray-500 line-through">
                          ${wrap.original_price}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium">Category:</span>
                    <p className="text-gray-600">{wrap.category || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium">Material:</span>
                    <p className="text-gray-600">{wrap.material || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium">Size:</span>
                    <p className="text-gray-600">{wrap.size || 'N/A'}</p>
                  </div>
                </div>

                {wrap.colors && wrap.colors.length > 0 && (
                  <div className="mt-2">
                    <span className="font-medium text-sm">Colors:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {wrap.colors.map((color: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {wrap.wrap_images && wrap.wrap_images.length > 0 && (
                  <div className="mt-3">
                    <div className="flex gap-2">
                      {wrap.wrap_images.slice(0, 3).map((image: any, index: number) => (
                        <img
                          key={image.id}
                          src={image.image_url}
                          alt={`${wrap.name} ${index + 1}`}
                          className="w-16 h-16 object-cover rounded border"
                        />
                      ))}
                      {wrap.wrap_images.length > 3 && (
                        <div className="w-16 h-16 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-500">
                          +{wrap.wrap_images.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(wrap)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this wrap?')) {
                      onDelete(wrap.id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WrapList;
