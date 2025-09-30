import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Download, Database, ExternalLink, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface ScrapedProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  priceAmount: string;
  imageUrl: string;
  category: string;
  source: string;
  inStock: boolean;
}

export default function ScrapeManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [maxProducts, setMaxProducts] = useState(20);
  const [scrapedProducts, setScrapedProducts] = useState<ScrapedProduct[]>([]);
  const [scrapeResult, setScrapeResult] = useState<any>(null);
  const { toast } = useToast();

  const handleScrapeESDCodes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/software/scrape-esdcodes?maxProducts=${maxProducts}`);
      const data = await response.json();
      
      if (data.success) {
        setScrapedProducts(data.products);
        setScrapeResult(data);
        toast({
          title: "Scraping Success",
          description: `Successfully scraped ${data.count} products from ESDCodes.com`,
          variant: "default",
        });
      } else {
        throw new Error(data.error || 'Scraping failed');
      }
    } catch (error: any) {
      toast({
        title: "Scraping Failed",
        description: error.message || 'Failed to scrape products',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateDatabase = async () => {
    if (!scrapedProducts.length) {
      toast({
        title: "No Products",
        description: "Please scrape products first before updating the database",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/software/update-from-scrape', {
        method: 'POST',
        body: JSON.stringify({ products: scrapedProducts }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to update database');
      }

      toast({
        title: "Database Updated",
        description: `Successfully updated database with ${scrapedProducts.length} products`,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || 'Failed to update database',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-green-600 bg-clip-text text-transparent">
            Product Scraper Management
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Import authentic software products from ESDCodes.com
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scraping Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                ESDCodes.com Scraper
              </CardTitle>
              <CardDescription>
                Scrape authentic software products with pricing and descriptions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxProducts">Maximum Products to Scrape</Label>
                <Input
                  id="maxProducts"
                  type="number"
                  value={maxProducts}
                  onChange={(e) => setMaxProducts(Number(e.target.value))}
                  min={1}
                  max={100}
                  disabled={isLoading}
                />
              </div>

              <Button 
                onClick={handleScrapeESDCodes}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scraping Products...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Scrape Products
                  </>
                )}
              </Button>

              {scrapeResult && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">Scraping Complete</span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    Found {scrapeResult.count} products from ESDCodes.com
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Database Update */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Management
              </CardTitle>
              <CardDescription>
                Update your software store with scraped products
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Products Ready:</strong> {scrapedProducts.length} products
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Scraped products will replace current database
                </p>
              </div>

              <Button 
                onClick={handleUpdateDatabase}
                disabled={isLoading || !scrapedProducts.length}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Database...
                  </>
                ) : (
                  <>
                    <Database className="mr-2 h-4 w-4" />
                    Update Database
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Product Preview */}
        {scrapedProducts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Scraped Products Preview</CardTitle>
              <CardDescription>
                Review products before updating the database
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {scrapedProducts.slice(0, 12).map((product) => (
                  <div
                    key={product.id}
                    className="p-3 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/api/placeholder/48/48';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{product.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {product.category}
                        </p>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">
                          {product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {scrapedProducts.length > 12 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
                  ... and {scrapedProducts.length - 12} more products
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}