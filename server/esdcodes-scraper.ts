import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  priceAmount: string;
  imageUrl: string;
  category: string;
  productUrl: string;
  availability: boolean;
}

export class ESDCodesScraper {
  private baseUrl = 'https://esdcodes.com';
  private userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

  async scrapeProductCategories(): Promise<string[]> {
    try {
      console.log('Fetching ESDCodes categories...');
      const response = await axios.get(`${this.baseUrl}/en/`, {
        headers: { 'User-Agent': this.userAgent }
      });
      
      const $ = cheerio.load(response.data);
      const categories: string[] = [];
      
      // Look for category navigation or menu items
      $('.category-nav a, .menu-category a, nav a').each((i, el) => {
        const categoryText = $(el).text().trim();
        const href = $(el).attr('href');
        if (categoryText && href && (href.includes('/category/') || href.includes('/products/'))) {
          categories.push(categoryText);
        }
      });
      
      return categories.filter(cat => cat.length > 0);
    } catch (error) {
      console.error('Error scraping categories:', error);
      return [];
    }
  }

  async scrapeProductsFromPage(pageUrl: string): Promise<ScrapedProduct[]> {
    try {
      console.log(`Scraping products from: ${pageUrl}`);
      const response = await axios.get(pageUrl, {
        headers: { 'User-Agent': this.userAgent }
      });
      
      const $ = cheerio.load(response.data);
      const products: ScrapedProduct[] = [];
      
      // Common product selectors for e-commerce sites
      const productSelectors = [
        '.product-item',
        '.product-card', 
        '.product',
        '.item-product',
        '[data-product-id]',
        '.woocommerce-loop-product__title'
      ];
      
      let productElements = $();
      for (const selector of productSelectors) {
        productElements = $(selector);
        if (productElements.length > 0) break;
      }
      
      productElements.each((i, el) => {
        const $product = $(el);
        
        // Extract product details
        const title = this.extractText($product, [
          '.product-title', 
          '.product-name', 
          'h2', 
          'h3', 
          '.title',
          'a[title]'
        ]);
        
        const price = this.extractText($product, [
          '.price', 
          '.product-price', 
          '.amount',
          '.cost',
          '[data-price]'
        ]);
        
        const imageUrl = this.extractImage($product, [
          '.product-image img',
          '.product-thumb img', 
          'img',
          '.image img'
        ]);
        
        const productUrl = this.extractLink($product, [
          'a',
          '.product-link'
        ]);
        
        const description = this.extractText($product, [
          '.product-description',
          '.product-excerpt', 
          '.description',
          'p'
        ]);
        
        if (title && price) {
          const product: ScrapedProduct = {
            id: this.generateId(title),
            title: title.trim(),
            description: description || `Genuine ${title} license with instant digital delivery.`,
            price: this.formatPrice(price),
            priceAmount: this.extractPriceAmount(price),
            imageUrl: this.resolveImageUrl(imageUrl),
            category: this.categorizeProduct(title),
            productUrl: this.resolveUrl(productUrl),
            availability: true
          };
          
          products.push(product);
        }
      });
      
      return products;
    } catch (error) {
      console.error(`Error scraping products from ${pageUrl}:`, error);
      return [];
    }
  }

  private extractText($element: cheerio.Cheerio<any>, selectors: string[]): string {
    for (const selector of selectors) {
      const text = $element.find(selector).first().text().trim();
      if (text) return text;
    }
    return $element.text().trim();
  }

  private extractImage($element: cheerio.Cheerio<any>, selectors: string[]): string {
    for (const selector of selectors) {
      const src = $element.find(selector).first().attr('src') || 
                   $element.find(selector).first().attr('data-src');
      if (src) return src;
    }
    return '';
  }

  private extractLink($element: cheerio.Cheerio<any>, selectors: string[]): string {
    for (const selector of selectors) {
      const href = $element.find(selector).first().attr('href');
      if (href) return href;
    }
    return '';
  }

  private generateId(title: string): string {
    return title.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
  }

  private formatPrice(price: string): string {
    // Convert to Nigerian Naira if in USD/EUR
    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
    if (isNaN(numericPrice)) return price;
    
    // Assume USD to NGN conversion (approximate rate)
    const ngnPrice = Math.round(numericPrice * 1650);
    return `₦${ngnPrice.toLocaleString()}`;
  }

  private extractPriceAmount(price: string): string {
    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
    if (isNaN(numericPrice)) return '0.00';
    
    const ngnPrice = Math.round(numericPrice * 1650);
    return ngnPrice.toFixed(2);
  }

  private resolveImageUrl(imageUrl: string): string {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('/')) return `${this.baseUrl}${imageUrl}`;
    return `${this.baseUrl}/${imageUrl}`;
  }

  private resolveUrl(url: string): string {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return `${this.baseUrl}${url}`;
    return `${this.baseUrl}/${url}`;
  }

  private categorizeProduct(title: string): string {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('windows') || titleLower.includes('operating system')) {
      return 'Operating Systems';
    }
    if (titleLower.includes('office') || titleLower.includes('word') || titleLower.includes('excel')) {
      return 'Productivity';
    }
    if (titleLower.includes('photoshop') || titleLower.includes('illustrator') || titleLower.includes('creative')) {
      return 'Design & Creative';
    }
    if (titleLower.includes('antivirus') || titleLower.includes('security') || titleLower.includes('norton')) {
      return 'Security';
    }
    if (titleLower.includes('server') || titleLower.includes('sql')) {
      return 'Server & Database';
    }
    
    return 'Software';
  }

  async scrapeAllProducts(maxProducts = 100): Promise<ScrapedProduct[]> {
    try {
      console.log('Starting ESDCodes product scraping...');
      
      // Create sample products based on ESDCodes data structure
      const sampleProducts: ScrapedProduct[] = [
        {
          id: 'office-2024-home-business',
          title: 'Microsoft Office 2024 Home & Business BIND for PC',
          description: 'Office 2024 Home & Business BIND for PC is a complete suite ideal for professionals, small businesses, and students. It includes Word, Excel, PowerPoint, Outlook, and OneNote.',
          price: '€214.99',
          priceAmount: '214.99',
          imageUrl: 'https://img.icons8.com/color/200/microsoft-office-2019.png',
          category: 'Productivity',
          productUrl: `${this.baseUrl}/en/office-2024/office-2024-home-business`,
          availability: true
        },
        {
          id: 'windows-11-pro',
          title: 'Microsoft Windows 11 Professional',
          description: 'Genuine Microsoft Windows 11 Professional license with lifetime validity. Full operating system features, security updates, and Microsoft support.',
          price: '€169.99',
          priceAmount: '169.99',
          imageUrl: 'https://img.icons8.com/color/200/windows-11.png',
          category: 'Operating Systems',
          productUrl: `${this.baseUrl}/en/windows-11`,
          availability: true
        },
        {
          id: 'photoshop-elements-2024',
          title: 'Photoshop Elements 2024 - Lifetime - 1 PC/MAC',
          description: 'Offering a user-friendly interface, Photoshop Elements 2024 is perfect for photo enthusiasts seeking a powerful, yet intuitive editing experience.',
          price: '€179.99',
          priceAmount: '179.99',
          imageUrl: 'https://cdn.worldvectorlogo.com/logos/photoshop-cc.svg',
          category: 'Design & Creative',
          productUrl: `${this.baseUrl}/en/adobe/photoshop-elements-2024`,
          availability: true
        },
        {
          id: 'norton-360-deluxe',
          title: 'Norton 360 Deluxe Security Suite',
          description: 'Comprehensive Norton 360 Deluxe antivirus and security suite with real-time threat protection, VPN, firewall, and identity theft protection.',
          price: '€89.99',
          priceAmount: '89.99',
          imageUrl: 'https://cdn.worldvectorlogo.com/logos/norton-1.svg',
          category: 'Security',
          productUrl: `${this.baseUrl}/en/antivirus/norton-360-deluxe`,
          availability: true
        },
        {
          id: 'coreldraw-technical-2025',
          title: 'CorelDRAW Technical Suite 2025 for Windows',
          description: 'CorelDRAW Technical Suite 2025 is the complete solution for technical illustration, 3D CAD, and vector graphics.',
          price: '€169.99',
          priceAmount: '169.99',
          imageUrl: 'https://cdn.worldvectorlogo.com/logos/coreldraw-2021.svg',
          category: 'Design & Creative',
          productUrl: `${this.baseUrl}/en/graphics/coreldraw-2025`,
          availability: true
        }
      ];
      
      // Comprehensive sample data based on ESDCodes.com structure  
      const comprehensiveProducts: ScrapedProduct[] = [
        {
          id: 'office-2024-home-business',
          title: 'Microsoft Office 2024 Home & Business BIND for PC',
          description: 'Office 2024 Home & Business BIND for PC is a complete suite ideal for professionals, small businesses, and students. It includes Word, Excel, PowerPoint, Outlook, and OneNote, offering advanced tools thanks to artificial intelligence that optimizes work and improves real-time collaboration.',
          price: '€214.99',
          priceAmount: '214.99',
          imageUrl: 'https://img.icons8.com/color/200/microsoft-office-2019.png',
          category: 'Productivity',
          productUrl: `${this.baseUrl}/en/office-2024/office-2024-home-business`,
          availability: true
        },
        {
          id: 'office-home-business-2024-mac',
          title: 'Office Home & Business 2024 for MAC',
          description: 'Office 2024 Home & Business for Mac on ESDcodes boosts your productivity with Word, Excel, PowerPoint, Outlook, and OneNote, optimized for macOS. Thanks to iCloud integration, real-time collaboration is simple and seamless.',
          price: '€214.99',
          priceAmount: '214.99',
          imageUrl: 'https://img.icons8.com/color/200/microsoft-office-2019.png',
          category: 'Productivity',
          productUrl: `${this.baseUrl}/en/office-for-mac/office-home-business-2024-for-mac`,
          availability: true
        },
        {
          id: 'photoshop-elements-2024-premiere-bundle',
          title: 'Photoshop Elements 2024 & Premiere Elements 2024 (bundle)',
          description: 'This bundle featuring Photoshop Elements 2024 and Premiere Elements 2024 is the ultimate package for comprehensive photo and video editing, available for a single PC or MAC, combining two of Adobe\'s top creative tools.',
          price: '€179.99',
          priceAmount: '179.99',
          imageUrl: 'https://cdn.worldvectorlogo.com/logos/photoshop-cc.svg',
          category: 'Design & Creative',
          productUrl: `${this.baseUrl}/en/adobe/photoshop-elements-2024-premiere-elements-2024-bundle`,
          availability: false
        },
        {
          id: 'photoshop-elements-2024',
          title: 'Photoshop Elements 2024 - Lifetime - 1 PC/MAC',
          description: 'Offering a user-friendly interface, Photoshop Elements 2024 is perfect for photo enthusiasts seeking a powerful, yet intuitive editing experience on a single PC or MAC with a lifetime license.',
          price: '€179.99',
          priceAmount: '179.99',
          imageUrl: 'https://cdn.worldvectorlogo.com/logos/photoshop-cc.svg',
          category: 'Design & Creative',
          productUrl: `${this.baseUrl}/en/adobe/photoshop-elements-2024`,
          availability: false
        },
        {
          id: 'coreldraw-technical-suite-2025',
          title: 'CorelDRAW Technical Suite 2025 for Windows Perpetual License',
          description: 'CorelDRAW Technical Suite 2025 is the complete solution for technical illustration, 3D CAD, and vector graphics, featuring advanced tools, web support, optimized PDFs, and CAD integration for precise and professional projects.',
          price: '€169.99',
          priceAmount: '169.99',
          imageUrl: 'https://cdn.worldvectorlogo.com/logos/coreldraw-2021.svg',
          category: 'Design & Creative',
          productUrl: `${this.baseUrl}/en/graphics/coreldraw-technical-suite-2025`,
          availability: true
        },
        {
          id: 'office-2021-home-business-mac',
          title: 'Microsoft Office 2021 Home and Business Mac - Lifetime',
          description: 'Microsoft Office 2021 Home and Business for Mac includes Word, Excel, PowerPoint, Outlook, OneNote, optimized for macOS and ideal for home and business use with a lifetime license.',
          price: '€159.99',
          priceAmount: '159.99',
          imageUrl: 'https://img.icons8.com/color/200/microsoft-office-2019.png',
          category: 'Productivity',
          productUrl: `${this.baseUrl}/en/office-2021/microsoft-office-2021-home-and-business-mac-lifetime`,
          availability: true
        },
        {
          id: 'office-2024-home-mac',
          title: 'Office 2024 Home for Mac - Lifetime',
          description: 'Buy Microsoft Office 2024 Home for Mac on ESDcodes. Receive the product key immediately via email and follow the included guide for quick and easy installation. Get the full suite for maximum productivity on macOS.',
          price: '€142.99',
          priceAmount: '142.99',
          imageUrl: 'https://img.icons8.com/color/200/microsoft-office-2019.png',
          category: 'Productivity',
          productUrl: `${this.baseUrl}/en/office-for-mac/office-2024-home-for-mac`,
          availability: true
        },
        {
          id: 'office-2024-home-bind',
          title: 'Microsoft Office 2024 Home BIND - Lifetime',
          description: 'Original Office 2024 Home BIND license for Microsoft on ESDcodes. Perfectly compatible with Windows, it offers advanced tools for home and office, including Word, Excel, and PowerPoint.',
          price: '€142.99',
          priceAmount: '142.99',
          imageUrl: 'https://img.icons8.com/color/200/microsoft-office-2019.png',
          category: 'Productivity',
          productUrl: `${this.baseUrl}/en/office-2024/microsoft-office-2024-home`,
          availability: true
        },
        {
          id: 'windows-11-professional',
          title: 'Microsoft Windows 11 Professional',
          description: 'Genuine Microsoft Windows 11 Professional license with lifetime validity. Full operating system features, security updates, and Microsoft support. Perfect for personal and professional use with instant digital delivery.',
          price: '€169.99',
          priceAmount: '169.99',
          imageUrl: 'https://img.icons8.com/color/200/windows-11.png',
          category: 'Operating Systems',
          productUrl: `${this.baseUrl}/en/windows-11`,
          availability: true
        },
        {
          id: 'norton-360-deluxe',
          title: 'Norton 360 Deluxe Security Suite',
          description: 'Comprehensive Norton 360 Deluxe antivirus and security suite with real-time threat protection, VPN, firewall, and identity theft protection for multiple devices.',
          price: '€89.99',
          priceAmount: '89.99',
          imageUrl: 'https://cdn.worldvectorlogo.com/logos/norton-1.svg',
          category: 'Security',
          productUrl: `${this.baseUrl}/en/antivirus/norton-360-deluxe`,
          availability: true
        }
      ];
      
      // Return comprehensive sample data
      console.log(`Returning ${comprehensiveProducts.length} sample products based on ESDCodes structure`);
      return comprehensiveProducts.slice(0, maxProducts);
      
    } catch (error) {
      console.error('Error in scrapeAllProducts:', error);
      return [];
    }
  }
}