import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Laptop, Star, Shield, Download } from 'lucide-react';
import { softwareProducts } from '@/lib/mockData';
import { useWallet } from '@/hooks/useWallet';

export function SoftwareMarketplace() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { purchaseService, isLoading } = useWallet();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handlePurchase = async (product: any) => {
    try {
      const serviceData = {
        type: 'software',
        provider: product.category,
        amount: product.price,
        recipient: 'user',
        metadata: { 
          productId: product.id,
          productName: product.name,
          category: product.category 
        },
      };

      await purchaseService(serviceData);
      setSelectedProduct(null);
    } catch (error) {
      // Error handling is done in the useWallet hook
    }
  };

  const categories = ['All', 'Productivity', 'Security', 'Design'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? softwareProducts 
    : softwareProducts.filter(product => product.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="card-hover">
            <div className="h-32 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <Laptop className="w-12 h-12 text-primary" />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </div>
              <CardDescription className="line-clamp-2">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4.8 (124 reviews)</span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Key Features:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Shield className="w-3 h-3 mr-2 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" onClick={() => setSelectedProduct(product)}>
                      <Download className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{product.name}</DialogTitle>
                      <DialogDescription>
                        {product.description}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">All Features:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {product.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <Shield className="w-3 h-3 mr-2 text-success" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <span className="font-semibold">Total Price:</span>
                        <span className="text-2xl font-bold text-primary">
                          {formatCurrency(product.price)}
                        </span>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        onClick={() => handlePurchase(product)}
                        disabled={isLoading}
                        className="w-full btn-primary"
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Processing...</span>
                          </div>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Purchase License
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
