import { useState, useEffect } from 'react';
import StandaloneSoftwareNav from '@/components/StandaloneSoftwareNav';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  ShoppingCart,
  Laptop,
  Shield,
  Gamepad2,
  Palette,
  Camera,
  Music,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GuestCheckout from '@/components/GuestCheckout';

interface SoftwareProduct {
  id: string;
  title: string;
  description: string;
  originalDescription: string | null;
  price: string;
  priceAmount: string;
  imageUrl: string | null;
  category: string;
  source: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Software() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState<{id: string, title: string, price: string, quantity: number}[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [guestInfo, setGuestInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const { toast } = useToast();

  // Fetch scraped products
  const { data: products = [], isLoading, refetch, isFetching, error } = useQuery<SoftwareProduct[]>({
    queryKey: ['/api/software/products'],
    queryFn: async () => {
      const response = await fetch('/api/software/products');
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (renamed from cacheTime in v5)
  });

  const categories = ['All', 'Operating Systems', 'Productivity', 'Security', 'Design & Creative', 'Software', 'Gaming'];

  const filteredProducts = products.filter((product: SoftwareProduct) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Debug logging
  console.log('Software Products Debug:', { 
    products, 
    productsLength: products?.length, 
    isLoading, 
    error, 
    filteredProductsLength: filteredProducts?.length 
  });

  // Cart functionality
  const addToCart = (product: SoftwareProduct) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { 
        id: product.id, 
        title: product.title, 
        price: product.price,
        quantity: 1 
      }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₦', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleOrderComplete = (orderId: string) => {
    // Clear cart and close modals
    setCartItems([]);
    setShowCheckout(false);
    setShowCart(false);
    
    // Reset guest info
    setGuestInfo({
      email: '',
      firstName: '',
      lastName: '',
      phone: ''
    });

    toast({
      title: "Order Completed!",
      description: `Order ${orderId} has been placed successfully. Check your email for software keys.`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <StandaloneSoftwareNav />
      <main>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Software Store</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Discover genuine software licenses at unbeatable prices - up to 50% off regular prices!
        </p>
        
        {/* Microsoft Partner Badge */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex-shrink-0">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" 
              alt="Microsoft Partner"
              className="w-10 h-10"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-bold text-blue-900 dark:text-blue-100">
                Microsoft Certified Partner
              </h3>
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                Verified
              </Badge>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Trusted partner for genuine software licenses
            </p>
          </div>
          <a 
            href="https://appsource.microsoft.com/en-us/marketplace/partner-dir/086ea8f8-72d6-44a6-8e33-32630eab33c5/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-800/30 rounded-md transition-colors"
            title="View Microsoft Partner Profile"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Cart Button - Repositioned to bottom right */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setShowCart(true)}
            className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white shadow-2xl rounded-full px-6 py-3 transform hover:scale-105 transition-all duration-200"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Cart ({cartItems.length})
          </Button>
        </div>
      )}

      {/* Cart Sidebar - Repositioned to slide from right */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end">
          <div className="bg-white dark:bg-gray-800 h-full w-full max-w-md shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCart(false)}
                >
                  <span className="text-2xl">&times;</span>
                </Button>
              </div>
              
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 border rounded">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold">Total:</span>
                      <span className="text-lg font-bold text-primary">
                        ₦{calculateTotal().toLocaleString()}
                      </span>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                      onClick={() => setShowCheckout(true)}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search software..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{products.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Available Products</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">50%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Average Discount</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{cartItems.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Items in Cart</div>
          </CardContent>
        </Card>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Debug Info */}
      {!isLoading && products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">No products found</div>
          <div className="text-sm text-gray-400">
            Products: {products?.length || 0} | 
            Filtered: {filteredProducts?.length || 0} | 
            Loading: {isLoading ? 'Yes' : 'No'} |
            Error: {error ? 'Yes' : 'No'}
          </div>
          <Button onClick={() => refetch()} className="mt-4">
            Retry Loading Products
          </Button>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product: SoftwareProduct) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.imageUrl || '/api/placeholder/300/200'}
                    alt={product.title}
                    className="w-full h-48 object-contain bg-white p-4 group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.log('Image failed to load:', product.imageUrl);
                      target.src = '/api/placeholder/300/200';
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', product.imageUrl);
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-green-500 text-white">
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-white/90 text-black">
                      Verified
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {product.price}
                    </div>
                    <div className="text-sm text-gray-500">
                      Digital Download
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">4.8</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => addToCart(product)}
                    disabled={cartItems.some(item => item.id === product.id)}
                    className="flex-1"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {cartItems.some(item => item.id === product.id) ? 'Added' : 'Add to Cart'}
                  </Button>
                  
                  <Button variant="outline" size="icon" title="View Details">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Laptop className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No software found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchQuery || selectedCategory !== 'All' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'No products available at the moment.'}
          </p>
          <Button onClick={() => {
            setSearchQuery('');
            setSelectedCategory('All');
          }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Guest Checkout Modal */}
      {showCheckout && (
        <GuestCheckout
          cartItems={cartItems}
          total={calculateTotal()}
          guestInfo={guestInfo}
          setGuestInfo={setGuestInfo}
          onClose={() => setShowCheckout(false)}
          onOrderComplete={handleOrderComplete}
        />
      )}
        </div>
      </main>
      <Footer />
    </div>
  );
}