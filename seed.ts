import { PrismaClient, ProductStatus } from "@prisma/client";
const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    // First, fetch all subcategories to get their actual IDs
    const subcategories = await prisma.subcategory.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    console.log("Available subcategories:", subcategories);

    // Create a mapping from slug to ID
    const subcategoryMap = subcategories.reduce((acc, sub) => {
      acc[sub.slug] = sub.id;
      return acc;
    }, {} as Record<string, string>);

    // Also fetch vendors to get their actual IDs
    const vendors = await prisma.vendor.findMany({
      select: {
        id: true,
        businessName: true,
      },
    });

    console.log("Available vendors:", vendors);

    // Create a mapping from slug to ID
    const vendorMap: Record<string, string> = {};
    
    vendors.forEach(vendor => {
      const businessName = vendor.businessName.toLowerCase();
      
      // Map common brand names to their business entities
      if (businessName.includes('dell')) {
        vendorMap['dell'] = vendor.id;
      }
      if (businessName.includes('apple')) {
        vendorMap['apple'] = vendor.id;
      }
      if (businessName.includes('lenovo')) {
        vendorMap['lenovo'] = vendor.id;
      }
      if (businessName.includes('asus')) {
        vendorMap['asus'] = vendor.id;
      }
      if (businessName.includes('hp')) {
        vendorMap['hp'] = vendor.id;
      }
      if (businessName.includes('microsoft')) {
        vendorMap['microsoft'] = vendor.id;
      }
      if (businessName.includes('acer')) {
        vendorMap['acer'] = vendor.id;
      }
      if (businessName.includes('lg')) {
        vendorMap['lg'] = vendor.id;
      }
      if (businessName.includes('razer')) {
        vendorMap['razer'] = vendor.id;
      }
      if (businessName.includes('micro-star') || businessName.includes('msi')) {
        vendorMap['msi'] = vendor.id;
      }
      if (businessName.includes('samsung')) {
        vendorMap['samsung'] = vendor.id;
      }
      if (businessName.includes('alienware')) {
        vendorMap['alienware'] = vendor.id;
      }
      if (businessName.includes('framework')) {
        vendorMap['framework'] = vendor.id;
      }
    });

    console.log("Vendor mapping:", vendorMap);

    const laptops = [
      {
        title: "Dell XPS 13 9310",
        slug: "dell-xps-13-9310",
        description:
          "The Dell XPS 13 is a premium ultrabook featuring a stunning edge-to-edge display, exceptional build quality, and powerful performance in a compact form factor.",
        price: 2079990.0,
        stock: 25,
        specifications: {
          processor: "Intel Core i7-1165G7",
          ram: "16GB LPDDR4X",
          storage: "512GB SSD",
          display: {
            size: 13.4,
            resolution: "1920x1200",
            type: "IPS",
            touchscreen: true,
            nits: 500,
          },
          gpu: "Intel Iris Xe Graphics",
          battery: "52 Whr",
          weight: 1.2,
          os: "Windows 11",
          ports: ["Thunderbolt 4", "USB-C", "microSD", "3.5mm audio"],
          features: [
            "Fingerprint reader",
            "Backlit keyboard",
            "Wi-Fi 6",
            "Bluetooth 5.1",
          ],
          dimensions: "295.7 x 198.7 x 14.8 mm",
        },
        subcategoryId:
          subcategoryMap["ultrabook"] || subcategoryMap["ultrabooks"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["dell"],
        isApproved: true,
      },
      {
        title: "Apple MacBook Pro 14",
        slug: "apple-macbook-pro-14",
        description:
          "The MacBook Pro 14 with M2 Pro delivers exceptional performance for creative professionals with its liquid retina XDR display and industry-leading battery life.",
        price: 3199990.0,
        stock: 15,
        specifications: {
          processor: "Apple M2 Pro",
          ram: "16GB Unified Memory",
          storage: "512GB SSD",
          display: {
            size: 14.2,
            resolution: "3024x1964",
            type: "Liquid Retina XDR",
            touchscreen: false,
            nits: 1000,
          },
          gpu: "16-core integrated GPU",
          battery: "70 Whr",
          weight: 1.6,
          os: "macOS Ventura",
          ports: [
            "Thunderbolt 4",
            "HDMI",
            "MagSafe",
            "3.5mm audio",
            "SD card reader",
          ],
          features: [
            "Touch ID",
            "Backlit keyboard",
            "Wi-Fi 6E",
            "Bluetooth 5.3",
            "ProMotion",
          ],
          dimensions: "312.6 x 221.2 x 15.5 mm",
        },
        subcategoryId:
          subcategoryMap["professional"] || subcategoryMap["workstation"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["apple"],
        isApproved: true,
      },
      {
        title: "Lenovo ThinkPad X1 Carbon Gen 10",
        slug: "lenovo-thinkpad-x1-carbon-gen-10",
        description:
          "The ThinkPad X1 Carbon combines legendary durability, enterprise-grade security features, and powerful performance in an ultralight package perfect for business professionals.",
        price: 2319990.0,
        stock: 20,
        specifications: {
          processor: "Intel Core i7-1260P",
          ram: "16GB LPDDR5",
          storage: "1TB SSD",
          display: {
            size: 14,
            resolution: "1920x1200",
            type: "IPS",
            touchscreen: false,
            nits: 400,
          },
          gpu: "Intel Iris Xe Graphics",
          battery: "57 Whr",
          weight: 1.12,
          os: "Windows 11 Pro",
          ports: ["Thunderbolt 4", "USB-A", "HDMI", "3.5mm audio"],
          features: [
            "Fingerprint reader",
            "TrackPoint",
            "Wi-Fi 6E",
            "Bluetooth 5.2",
            "Spill-resistant keyboard",
          ],
          dimensions: "315.6 x 222.5 x 14.9 mm",
        },
        subcategoryId:
          subcategoryMap["business"] ||
          subcategoryMap["ultrabook"] ||
          subcategoryMap["ultrabooks"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["lenovo"],
        isApproved: true,
      },
      {
        title: "ASUS ROG Zephyrus G14",
        slug: "asus-rog-zephyrus-g14",
        description:
          "The ROG Zephyrus G14 redefines what's possible in a gaming laptop, packing immense power into a compact 14-inch form factor with exceptional battery life and unique AniMe Matrix display.",
        price: 2399990.0,
        stock: 12,
        specifications: {
          processor: "AMD Ryzen 9 6900HS",
          ram: "32GB DDR5",
          storage: "1TB SSD",
          display: {
            size: 14,
            resolution: "2560x1600",
            type: "IPS",
            touchscreen: false,
            nits: 500,
            refreshRate: 120,
          },
          gpu: "NVIDIA RTX 3070 Ti",
          battery: "76 Whr",
          weight: 1.72,
          os: "Windows 11",
          ports: ["USB-C", "USB-A", "HDMI", "3.5mm audio"],
          features: [
            "AniMe Matrix display",
            "RGB keyboard",
            "Wi-Fi 6E",
            "Bluetooth 5.2",
            "Dolby Atmos",
          ],
          dimensions: "312 x 227 x 19.5 mm",
        },
        subcategoryId: subcategoryMap["gaming"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["asus"],
        isApproved: true,
      },
      {
        title: "HP Spectre x360 14",
        slug: "hp-spectre-x360-14",
        description:
          "The HP Spectre x360 combines stunning design with versatile 2-in-1 functionality, featuring a brilliant OLED display and all-day battery life for productivity and entertainment.",
        price: 2159990.0,
        stock: 18,
        specifications: {
          processor: "Intel Core i7-1255U",
          ram: "16GB LPDDR4X",
          storage: "512GB SSD",
          display: {
            size: 13.5,
            resolution: "3000x2000",
            type: "OLED",
            touchscreen: true,
            nits: 400,
          },
          gpu: "Intel Iris Xe Graphics",
          battery: "66 Whr",
          weight: 1.34,
          os: "Windows 11 Home",
          ports: ["Thunderbolt 4", "USB-A", "microSD", "3.5mm audio"],
          features: [
            "Fingerprint reader",
            "Backlit keyboard",
            "Wi-Fi 6E",
            "Bluetooth 5.2",
            "Convertible",
          ],
          dimensions: "298.5 x 220.2 x 17 mm",
        },
        subcategoryId:
          subcategoryMap["2-in-1"] || subcategoryMap["convertible"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["hp"],
        isApproved: true,
      },
      {
        title: "Microsoft Surface Laptop 5",
        slug: "microsoft-surface-laptop-5",
        description:
          "The Surface Laptop 5 combines elegant design with everyday performance, featuring a vibrant PixelSense touchscreen display and premium build quality with all-day battery life.",
        price: 2079990.0,
        stock: 15,
        specifications: {
          processor: "Intel Core i5-1245U",
          ram: "8GB LPDDR5X",
          storage: "256GB SSD",
          display: {
            size: 13.5,
            resolution: "2256x1504",
            type: "PixelSense",
            touchscreen: true,
            nits: 350,
          },
          gpu: "Intel Iris Xe Graphics",
          battery: "47.4 Whr",
          weight: 1.27,
          os: "Windows 11",
          ports: ["USB-C", "USB-A", "Surface Connect", "3.5mm audio"],
          features: [
            "Windows Hello",
            "Backlit keyboard",
            "Wi-Fi 6",
            "Bluetooth 5.1",
          ],
          dimensions: "308 x 223 x 14.5 mm",
        },
        subcategoryId:
          subcategoryMap["ultrabook"] || subcategoryMap["ultrabooks"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["microsoft"],
        isApproved: true,
      },
      {
        title: "Acer Predator Helios 300",
        slug: "acer-predator-helios-300",
        description:
          "The Predator Helios 300 offers high-performance gaming capabilities with powerful specs, advanced cooling, and a fast display at a competitive price point.",
        price: 1919990.0,
        stock: 10,
        specifications: {
          processor: "Intel Core i7-12700H",
          ram: "16GB DDR5",
          storage: "1TB SSD",
          display: {
            size: 15.6,
            resolution: "1920x1080",
            type: "IPS",
            touchscreen: false,
            nits: 300,
            refreshRate: 144,
          },
          gpu: "NVIDIA RTX 3060",
          battery: "58 Whr",
          weight: 2.3,
          os: "Windows 11 Home",
          ports: ["USB-C", "USB-A", "HDMI", "Ethernet", "3.5mm audio"],
          features: [
            "RGB keyboard",
            "Wi-Fi 6",
            "Bluetooth 5.2",
            "PredatorSense",
          ],
          dimensions: "363 x 255 x 22.9 mm",
        },
        subcategoryId: subcategoryMap["gaming"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["acer"],
        isApproved: true,
      },
      {
        title: "LG Gram 17",
        slug: "lg-gram-17",
        description:
          "The LG Gram 17 defies expectations with an incredibly lightweight design despite its large screen, offering exceptional battery life and performance for productivity-focused users.",
        price: 2399990.0,
        stock: 8,
        specifications: {
          processor: "Intel Core i7-1260P",
          ram: "16GB LPDDR5",
          storage: "1TB SSD",
          display: {
            size: 17,
            resolution: "2560x1600",
            type: "IPS",
            touchscreen: false,
            nits: 350,
          },
          gpu: "Intel Iris Xe Graphics",
          battery: "80 Whr",
          weight: 1.35,
          os: "Windows 11 Home",
          ports: ["Thunderbolt 4", "USB-A", "HDMI", "microSD", "3.5mm audio"],
          features: [
            "Fingerprint reader",
            "Backlit keyboard",
            "Wi-Fi 6",
            "Bluetooth 5.1",
          ],
          dimensions: "378.8 x 258.8 x 17.8 mm",
        },
        subcategoryId:
          subcategoryMap["ultrabook"] || subcategoryMap["ultrabooks"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["lg"],
        isApproved: true,
      },
      {
        title: "Razer Blade 15",
        slug: "razer-blade-15",
        description:
          "The Razer Blade 15 combines gaming performance with premium build quality, featuring a precision-crafted aluminum chassis, powerful internals, and a stunning display.",
        price: 3999990.0,
        stock: 5,
        specifications: {
          processor: "Intel Core i9-12900H",
          ram: "32GB DDR5",
          storage: "1TB SSD",
          display: {
            size: 15.6,
            resolution: "2560x1440",
            type: "IPS",
            touchscreen: false,
            nits: 300,
            refreshRate: 240,
          },
          gpu: "NVIDIA RTX 3080 Ti",
          battery: "80 Whr",
          weight: 2.01,
          os: "Windows 11",
          ports: [
            "Thunderbolt 4",
            "USB-A",
            "HDMI",
            "SD card reader",
            "3.5mm audio",
          ],
          features: [
            "Per-key RGB",
            "CNC aluminum chassis",
            "Wi-Fi 6E",
            "Bluetooth 5.2",
            "THX Spatial Audio",
          ],
          dimensions: "355 x 235 x 16.9 mm",
        },
        subcategoryId: subcategoryMap["gaming"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["razer"],
        isApproved: true,
      },
      {
        title: "MSI Creator Z16",
        slug: "msi-creator-z16",
        description:
          "The MSI Creator Z16 is designed for creative professionals, featuring a brilliant 16:10 touchscreen display, powerful performance, and premium design elements.",
        price: 3519990.0,
        stock: 7,
        specifications: {
          processor: "Intel Core i7-12700H",
          ram: "32GB DDR5",
          storage: "2TB SSD",
          display: {
            size: 16,
            resolution: "2560x1600",
            type: "IPS",
            touchscreen: true,
            nits: 400,
          },
          gpu: "NVIDIA RTX 3060",
          battery: "90 Whr",
          weight: 2.2,
          os: "Windows 11 Pro",
          ports: [
            "Thunderbolt 4",
            "USB-A",
            "HDMI",
            "SD card reader",
            "3.5mm audio",
          ],
          features: [
            "Per-key RGB",
            "Wi-Fi 6E",
            "Bluetooth 5.2",
            "Creator Center software",
          ],
          dimensions: "359 x 256 x 15.9 mm",
        },
        subcategoryId:
          subcategoryMap["professional"] || subcategoryMap["workstation"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["msi"],
        isApproved: true,
      },
      {
        title: "Samsung Galaxy Book3 Pro",
        slug: "samsung-galaxy-book3-pro",
        description:
          "The Galaxy Book3 Pro features a stunning AMOLED display, ultra-thin design, and seamless integration with the Samsung ecosystem for productivity and entertainment.",
        price: 2319990.0,
        stock: 12,
        specifications: {
          processor: "Intel Core i7-1360P",
          ram: "16GB LPDDR5",
          storage: "512GB SSD",
          display: {
            size: 14,
            resolution: "2880x1800",
            type: "AMOLED",
            touchscreen: false,
            nits: 500,
          },
          gpu: "Intel Iris Xe Graphics",
          battery: "63 Whr",
          weight: 1.17,
          os: "Windows 11 Home",
          ports: ["Thunderbolt 4", "USB-A", "HDMI", "microSD", "3.5mm audio"],
          features: [
            "Fingerprint reader",
            "Backlit keyboard",
            "Wi-Fi 6E",
            "Bluetooth 5.1",
            "Samsung ecosystem integration",
          ],
          dimensions: "312.3 x 223.8 x 11.3 mm",
        },
        subcategoryId:
          subcategoryMap["ultrabook"] || subcategoryMap["ultrabooks"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["samsung"],
        isApproved: true,
      },
      {
        title: "Alienware m15 R7",
        slug: "alienware-m15-r7",
        description:
          "The Alienware m15 R7 delivers extreme gaming performance with advanced cooling technology, customizable AlienFX lighting, and immersive display options.",
        price: 3039990.0,
        stock: 6,
        specifications: {
          processor: "AMD Ryzen 9 6900HX",
          ram: "32GB DDR5",
          storage: "1TB SSD",
          display: {
            size: 15.6,
            resolution: "2560x1440",
            type: "IPS",
            touchscreen: false,
            nits: 400,
            refreshRate: 240,
          },
          gpu: "NVIDIA RTX 3070 Ti",
          battery: "86 Whr",
          weight: 2.42,
          os: "Windows 11 Home",
          ports: ["USB-C", "USB-A", "HDMI", "Ethernet", "3.5mm audio"],
          features: [
            "AlienFX RGB",
            "Advanced cooling",
            "Wi-Fi 6E",
            "Bluetooth 5.2",
            "Alienware Command Center",
          ],
          dimensions: "356.2 x 272.5 x 23.9 mm",
        },
        subcategoryId: subcategoryMap["gaming"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["alienware"] || vendorMap["dell"], // Alienware is owned by Dell
        isApproved: true,
      },
      {
        title: "Acer Swift 5",
        slug: "acer-swift-5",
        description:
          "The Acer Swift 5 combines a lightweight design with powerful performance, featuring a vibrant touchscreen display and antimicrobial coating for added protection.",
        price: 1599990.0,
        stock: 20,
        specifications: {
          processor: "Intel Core i7-1255U",
          ram: "16GB LPDDR4X",
          storage: "512GB SSD",
          display: {
            size: 14,
            resolution: "1920x1080",
            type: "IPS",
            touchscreen: true,
            nits: 300,
          },
          gpu: "Intel Iris Xe Graphics",
          battery: "56 Whr",
          weight: 1.2,
          os: "Windows 11 Home",
          ports: ["Thunderbolt 4", "USB-A", "HDMI", "3.5mm audio"],
          features: [
            "Fingerprint reader",
            "Backlit keyboard",
            "Wi-Fi 6",
            "Bluetooth 5.1",
            "Antimicrobial Corning Gorilla Glass",
          ],
          dimensions: "318.7 x 206.5 x 14.9 mm",
        },
        subcategoryId:
          subcategoryMap["ultrabook"] || subcategoryMap["ultrabooks"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["acer"],
        isApproved: true,
      },
      {
        title: "Lenovo Legion 5 Pro",
        slug: "lenovo-legion-5-pro",
        description:
          "The Legion 5 Pro delivers exceptional gaming performance with a 16-inch QHD display, advanced thermal design, and powerful components in a durable chassis.",
        price: 2559990.0,
        stock: 9,
        specifications: {
          processor: "AMD Ryzen 7 6800H",
          ram: "16GB DDR5",
          storage: "1TB SSD",
          display: {
            size: 16,
            resolution: "2560x1600",
            type: "IPS",
            touchscreen: false,
            nits: 500,
            refreshRate: 165,
          },
          gpu: "NVIDIA RTX 3070",
          battery: "80 Whr",
          weight: 2.49,
          os: "Windows 11 Home",
          ports: ["USB-C", "USB-A", "HDMI", "Ethernet", "3.5mm audio"],
          features: [
            "RGB keyboard",
            "Advanced cooling",
            "Wi-Fi 6",
            "Bluetooth 5.1",
            "Legion Coldfront 3.0",
          ],
          dimensions: "356 x 260.4 x 21.7 mm",
        },
        subcategoryId: subcategoryMap["gaming"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["lenovo"],
        isApproved: true,
      },
      {
        title: "HP Envy 13",
        slug: "hp-envy-13",
        description:
          "The HP Envy 13 offers premium features at a more accessible price point, with solid performance, a bright display, and excellent battery life for everyday productivity.",
        price: 1359990.0,
        stock: 25,
        specifications: {
          processor: "Intel Core i5-1235U",
          ram: "8GB LPDDR4X",
          storage: "256GB SSD",
          display: {
            size: 13.3,
            resolution: "1920x1080",
            type: "IPS",
            touchscreen: false,
            nits: 400,
          },
          gpu: "Intel Iris Xe Graphics",
          battery: "51 Whr",
          weight: 1.3,
          os: "Windows 11 Home",
          ports: ["Thunderbolt 4", "USB-A", "microSD", "3.5mm audio"],
          features: [
            "Fingerprint reader",
            "Backlit keyboard",
            "Wi-Fi 6",
            "Bluetooth 5.2",
          ],
          dimensions: "306.5 x 194.6 x 16.9 mm",
        },
        subcategoryId:
          subcategoryMap["ultrabook"] || subcategoryMap["ultrabooks"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["hp"],
        isApproved: true,
      },
      {
        title: "Apple MacBook Air M2",
        slug: "apple-macbook-air-m2",
        description:
          "The redesigned MacBook Air with M2 chip offers extraordinary battery life, impressive performance, and a beautiful Liquid Retina display in an impossibly thin design.",
        price: 1919990.0,
        stock: 15,
        specifications: {
          processor: "Apple M2",
          ram: "8GB Unified Memory",
          storage: "256GB SSD",
          display: {
            size: 13.6,
            resolution: "2560x1664",
            type: "Liquid Retina",
            touchscreen: false,
            nits: 500,
          },
          gpu: "8-core integrated GPU",
          battery: "52.6 Whr",
          weight: 1.24,
          os: "macOS Ventura",
          ports: ["Thunderbolt 4", "MagSafe", "3.5mm audio"],
          features: [
            "Touch ID",
            "Backlit keyboard",
            "Wi-Fi 6",
            "Bluetooth 5.0",
            "1080p FaceTime HD camera",
          ],
          dimensions: "304.1 x 215 x 11.3 mm",
        },
        subcategoryId:
          subcategoryMap["ultrabook"] || subcategoryMap["ultrabooks"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["apple"],
        isApproved: true,
      },
      {
        title: "ASUS Zenbook 14 OLED",
        slug: "asus-zenbook-14-oled",
        description:
          "The Zenbook 14 OLED combines a stunning display with powerful AMD performance in a sleek, lightweight chassis perfect for productivity and content consumption.",
        price: 1599990.0,
        stock: 18,
        specifications: {
          processor: "AMD Ryzen 7 6800U",
          ram: "16GB LPDDR5",
          storage: "512GB SSD",
          display: {
            size: 14,
            resolution: "2880x1800",
            type: "OLED",
            touchscreen: false,
            nits: 600,
          },
          gpu: "AMD Radeon 680M",
          battery: "75 Whr",
          weight: 1.39,
          os: "Windows 11 Home",
          ports: ["USB-C", "USB-A", "HDMI", "microSD", "3.5mm audio"],
          features: [
            "NumberPad 2.0",
            "Backlit keyboard",
            "Wi-Fi 6E",
            "Bluetooth 5.2",
            "ASUS ErgoLift hinge",
          ],
          dimensions: "313.6 x 220.6 x 16.9 mm",
        },
        subcategoryId:
          subcategoryMap["ultrabook"] || subcategoryMap["ultrabooks"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["asus"],
        isApproved: true,
      },
      {
        title: "Microsoft Surface Pro 9",
        slug: "microsoft-surface-pro-9",
        description:
          "The Surface Pro 9 offers true versatility as a 2-in-1 device, featuring a stunning PixelSense display, improved performance, and the flexibility to switch between tablet and laptop modes.",
        price: 1759990.0,
        stock: 12,
        specifications: {
          processor: "Intel Core i5-1235U",
          ram: "8GB LPDDR5",
          storage: "256GB SSD",
          display: {
            size: 13,
            resolution: "2880x1920",
            type: "PixelSense",
            touchscreen: true,
            nits: 450,
          },
          gpu: "Intel Iris Xe Graphics",
          battery: "47.7 Whr",
          weight: 0.879,
          os: "Windows 11 Home",
          ports: ["USB-C", "Surface Connect"],
          features: [
            "Windows Hello",
            "Kickstand",
            "Wi-Fi 6E",
            "Bluetooth 5.1",
            "Compatible with Surface Pen",
          ],
          dimensions: "287 x 208.3 x 9.4 mm",
        },
        subcategoryId:
          subcategoryMap["2-in-1"] || subcategoryMap["convertible"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["microsoft"],
        isApproved: true,
      },
      {
        title: "Dell G15 Gaming",
        slug: "dell-g15-gaming",
        description:
          "The Dell G15 Gaming provides solid gaming performance at an affordable price point, featuring a robust cooling system and essential gaming features.",
        price: 1439990.0,
        stock: 22,
        specifications: {
          processor: "AMD Ryzen 5 6600H",
          ram: "8GB DDR5",
          storage: "512GB SSD",
          display: {
            size: 15.6,
            resolution: "1920x1080",
            type: "IPS",
            touchscreen: false,
            nits: 250,
            refreshRate: 120,
          },
          gpu: "NVIDIA RTX 3050",
          battery: "56 Whr",
          weight: 2.57,
          os: "Windows 11 Home",
          ports: ["USB-C", "USB-A", "HDMI", "Ethernet", "3.5mm audio"],
          features: [
            "Backlit keyboard",
            "Wi-Fi 6",
            "Bluetooth 5.2",
            "Alienware-inspired thermal design",
          ],
          dimensions: "357.3 x 272.8 x 26.9 mm",
        },
        subcategoryId: subcategoryMap["gaming"],
        status: ProductStatus.APPROVED,
        vendorId: vendorMap["dell"],
        isApproved: true,
      },
    ];

    // Filter out laptops with missing subcategory or vendor IDs and log them
    const validLaptops = laptops.filter((laptop) => {
      if (!laptop.subcategoryId) {
        console.log(`Skipping ${laptop.title} - subcategory not found`);
        return false;
      }
      if (!laptop.vendorId) {
        console.log(`Skipping ${laptop.title} - vendor not found`);
        return false;
      }
      return true;
    });

    console.log(
      `Seeding ${validLaptops.length} laptops out of ${laptops.length} total`
    );

    // Seed products
    for (const laptop of validLaptops) {
      await prisma.product.create({
        data: laptop,
      });
      console.log(`✓ Seeded: ${laptop.title}`);
    }

    console.log("Database seeding completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
