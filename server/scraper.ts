import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedProduct {
  title: string;
  price: string;
  description: string;
  originalDescription: string;
  imageUrl: string;
  category: string;
  inStock: boolean;
}

// Sample products that represent typical software offerings
const SAMPLE_PRODUCTS: ScrapedProduct[] = [
  {
    title: "Microsoft Windows 11 Professional",
    price: "₦25,500",
    description: "Genuine Microsoft Windows 11 Professional license with lifetime validity. Full operating system features, security updates, and Microsoft support. Perfect for personal and professional use with instant digital delivery.",
    originalDescription: "Windows 11 Pro license key",
    imageUrl: "https://images.unsplash.com/photo-1611262588019-db6cc2032da3?w=400&h=300&fit=crop",
    category: "Operating Systems",
    inStock: true
  },
  {
    title: "Microsoft Office 2021 Professional Plus",
    price: "₦18,750",
    description: "Complete Microsoft Office 2021 Professional Plus suite with Word, Excel, PowerPoint, Outlook, Access, and Publisher. Lifetime license with full productivity features, premium templates, and professional tools.",
    originalDescription: "Office 2021 Pro Plus suite",
    imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
    category: "Productivity",
    inStock: true
  },
  {
    title: "Norton 360 Deluxe Security Suite",
    price: "₦12,300",
    description: "Advanced Norton 360 Deluxe protection for your devices. Real-time threat detection, malware protection, VPN, password manager, and privacy features. Keep your data secure with industry-leading security technology.",
    originalDescription: "Norton 360 security software",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
    category: "Security",
    inStock: true
  },
  {
    title: "Adobe Creative Cloud All Apps",
    price: "₦45,000",
    description: "Professional Adobe Creative Cloud subscription with access to all creative applications including Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, and more. Perfect for designers and content creators.",
    originalDescription: "Adobe CC All Apps subscription",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    category: "Design & Creative",
    inStock: true
  },
  {
    title: "McAfee Total Protection",
    price: "₦8,900",
    description: "Comprehensive McAfee Total Protection with antivirus, web protection, password manager, and identity theft protection. Multi-device support with real-time scanning and automatic updates.",
    originalDescription: "McAfee Total Protection suite",
    imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    category: "Security",
    inStock: true
  },
  {
    title: "Windows Server 2022 Standard",
    price: "₦85,000",
    description: "Microsoft Windows Server 2022 Standard edition for enterprise environments. Advanced server management, virtualization capabilities, and enhanced security features for business infrastructure.",
    originalDescription: "Windows Server 2022 license",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    category: "Operating Systems",
    inStock: true
  },
  {
    title: "Kaspersky Internet Security",
    price: "₦7,500",
    description: "Robust Kaspersky Internet Security with advanced threat protection, safe banking, privacy tools, and parental controls. Trusted by millions worldwide for comprehensive digital protection.",
    originalDescription: "Kaspersky Internet Security license",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
    category: "Security",
    inStock: true
  },
  {
    title: "Microsoft Visio Professional 2021",
    price: "₦32,500",
    description: "Professional Microsoft Visio 2021 for creating detailed diagrams, flowcharts, and technical drawings. Essential tool for business process mapping and technical documentation.",
    originalDescription: "Visio Professional 2021",
    imageUrl: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop",
    category: "Productivity",
    inStock: true
  },
  {
    title: "Autodesk AutoCAD 2024",
    price: "₦125,000",
    description: "Industry-leading Autodesk AutoCAD 2024 for 2D and 3D design and drafting. Essential tool for architects, engineers, and designers with advanced modeling and collaboration features.",
    originalDescription: "AutoCAD 2024 license",
    imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=300&fit=crop",
    category: "Design & Creative",
    inStock: true
  },
  {
    title: "VMware Workstation Pro",
    price: "₦55,000",
    description: "Professional VMware Workstation Pro for advanced virtualization. Run multiple operating systems simultaneously with enhanced performance, networking, and development features.",
    originalDescription: "VMware Workstation Pro license",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    category: "Software",
    inStock: true
  }
];

export class ProductScraper {
  private baseUrl = 'https://esdcodes.com';
  
  // Get sample products (we'll use these as reliable data source)
  getSampleProducts(): ScrapedProduct[] {
    return SAMPLE_PRODUCTS;
  }
  
  async scrapeProducts(): Promise<ScrapedProduct[]> {
    try {
      console.log('Starting to scrape products from ESDcodes.com...');
      
      // Get the main page first
      const mainPageResponse = await axios.get(`${this.baseUrl}/en/`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        }
      });

      const $ = cheerio.load(mainPageResponse.data);
      const products: ScrapedProduct[] = [];

      // Look for product containers - common selectors for e-commerce sites
      const productSelectors = [
        '.product-item',
        '.product',
        '.item',
        '.product-card',
        '[data-product]',
        '.grid-item',
        '.product-box'
      ];

      let foundProducts = false;

      for (const selector of productSelectors) {
        const productElements = $(selector);
        if (productElements.length > 0) {
          console.log(`Found ${productElements.length} products using selector: ${selector}`);
          foundProducts = true;
          
          productElements.each((index, element) => {
            const product = this.extractProductData($, element);
            if (product) {
              products.push(product);
            }
          });
          break;
        }
      }

      if (!foundProducts) {
        // Try to find products by looking for common patterns
        console.log('No products found with standard selectors, trying alternative methods...');
        
        // Look for elements with price patterns
        $('*').each((index, element) => {
          const text = $(element).text();
          if (text.match(/\$\d+|\€\d+|£\d+/) && $(element).find('img').length > 0) {
            const product = this.extractProductData($, element);
            if (product) {
              products.push(product);
            }
          }
        });
      }

      console.log(`Successfully scraped ${products.length} products`);
      return products;

    } catch (error) {
      console.error('Error scraping products:', error);
      return [];
    }
  }

  private extractProductData($: cheerio.CheerioAPI, element: any): ScrapedProduct | null {
    try {
      const $element = $(element);
      
      // Extract title
      const title = this.extractTitle($element);
      if (!title) return null;

      // Extract price
      const price = this.extractPrice($element);
      if (!price) return null;

      // Extract image
      const imageUrl = this.extractImage($element);

      // Extract description
      const originalDescription = this.extractDescription($element);
      const description = this.rewriteDescription(originalDescription, title);

      // Determine category
      const category = this.determineCategory(title);

      return {
        title: title.trim(),
        price: price.trim(),
        description,
        originalDescription,
        imageUrl: imageUrl || '/placeholder-software.png',
        category,
        inStock: true
      };
    } catch (error) {
      console.error('Error extracting product data:', error);
      return null;
    }
  }

  private extractTitle($element: any): string {
    const titleSelectors = [
      'h1', 'h2', 'h3', 'h4',
      '.title', '.name', '.product-title', '.product-name',
      '[data-title]', '.heading'
    ];

    for (const selector of titleSelectors) {
      const title = $element.find(selector).first().text().trim();
      if (title && title.length > 3) {
        return title;
      }
    }

    // Fallback to element text if no specific title found
    const elementText = $element.text().trim();
    const lines = elementText.split('\n').filter(line => line.trim().length > 3);
    return lines[0] || '';
  }

  private extractPrice($element: any): string {
    const priceSelectors = [
      '.price', '.cost', '.amount', '.pricing',
      '[data-price]', '.price-current', '.sale-price'
    ];

    for (const selector of priceSelectors) {
      const price = $element.find(selector).first().text().trim();
      if (price && price.match(/\$\d+|\€\d+|£\d+|\₦\d+/)) {
        return price;
      }
    }

    // Look for price patterns in all text
    const allText = $element.text();
    const priceMatch = allText.match(/(\$|€|£|₦)\s*(\d+(?:\.\d{2})?)/);
    if (priceMatch) {
      return priceMatch[0];
    }

    return '';
  }

  private extractImage($element: any): string {
    const img = $element.find('img').first();
    if (img.length > 0) {
      let src = img.attr('src') || img.attr('data-src') || img.attr('data-lazy');
      if (src) {
        // Convert relative URLs to absolute
        if (src.startsWith('/')) {
          src = this.baseUrl + src;
        } else if (!src.startsWith('http')) {
          src = this.baseUrl + '/' + src;
        }
        return src;
      }
    }
    return '';
  }

  private extractDescription($element: any): string {
    const descSelectors = [
      '.description', '.desc', '.summary', '.details',
      '.product-description', '.product-details', '.content'
    ];

    for (const selector of descSelectors) {
      const desc = $element.find(selector).first().text().trim();
      if (desc && desc.length > 10) {
        return desc;
      }
    }

    // Fallback to element text
    const text = $element.text().trim();
    const lines = text.split('\n').filter(line => line.trim().length > 10);
    return lines.slice(1, 3).join(' ') || 'Professional software license with full features and support.';
  }

  private rewriteDescription(originalDesc: string, title: string): string {
    // Remove any source attribution and rewrite generically
    const cleanDesc = originalDesc
      .replace(/esdcodes\.com/gi, '')
      .replace(/ESDCodes/gi, '')
      .replace(/CDKeyPrices/gi, '')
      .replace(/cdkeyprices\.com/gi, '')
      .replace(/from\s+[a-z]+codes/gi, '')
      .replace(/available\s+at\s+[a-z]+/gi, '')
      .trim();

    if (!cleanDesc || cleanDesc.length < 20) {
      // Generate description based on title
      if (title.toLowerCase().includes('windows')) {
        return `Genuine ${title} license with lifetime validity. Full operating system features, security updates, and Microsoft support. Perfect for personal and professional use with instant digital delivery.`;
      } else if (title.toLowerCase().includes('office')) {
        return `Complete ${title} suite with Word, Excel, PowerPoint, and more. Lifetime license with full productivity features, cloud integration, and premium templates. Ideal for business and personal productivity.`;
      } else if (title.toLowerCase().includes('antivirus') || title.toLowerCase().includes('security')) {
        return `Advanced ${title} protection for your devices. Real-time threat detection, malware protection, and privacy features. Keep your data secure with industry-leading security technology.`;
      } else if (title.toLowerCase().includes('adobe')) {
        return `Professional ${title} software for creative professionals. Full-featured design and editing tools with premium effects, templates, and cloud storage. Perfect for designers and content creators.`;
      } else {
        return `Professional ${title} software with full features and comprehensive functionality. Genuine license with lifetime validity, instant digital delivery, and customer support included.`;
      }
    }

    return cleanDesc;
  }

  private determineCategory(title: string): string {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('windows') || titleLower.includes('operating system')) {
      return 'Operating Systems';
    } else if (titleLower.includes('office') || titleLower.includes('word') || titleLower.includes('excel')) {
      return 'Productivity';
    } else if (titleLower.includes('antivirus') || titleLower.includes('security') || titleLower.includes('norton') || titleLower.includes('mcafee')) {
      return 'Security';
    } else if (titleLower.includes('adobe') || titleLower.includes('photoshop') || titleLower.includes('design')) {
      return 'Design & Creative';
    } else if (titleLower.includes('game') || titleLower.includes('gaming')) {
      return 'Gaming';
    } else {
      return 'Software';
    }
  }
}