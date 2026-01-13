// Product catalog with pricing options for SanSat Fruit Co.

// ============================================
// 🎛️ STOCK AVAILABILITY CONTROL
// ============================================
// Set true = In Stock (clickable)
// Set false = Out of Stock (disabled)
// ============================================
export const stockAvailability = {
  'pom-large': false,      // Pomegranate Large
  'jambu-sweet': true,     // Jambu Sweet
  'jambu-granate': true,   // Jambu Granate (Dark Red)
  'jambu-combo': true,     // Jambu Combo Pack
  'jambu-large': true,     // Jambu Large (No-Sweet)
  'jambu-medium': true,    // Jambu Medium (No-Sweet)
};
// ============================================

export const productConfig = {
  'pom-large': {
    id: 'pom-large',
    name: 'Pomegranate (Large)',
    nameKey: 'pomLargeName',
    descKey: 'pomLargeDesc',
    unit: 'fruits',
    tag: '🏆 Large Fruits',
    image: './pom_large.webp',
    benefitsBadge: '💎 Health Benefits',
    category: 'pomegranate',
    options: [
      { qty: 3, price: 900, label: '3 Fruits - Rs.900' },
      { qty: 6, price: 1800, label: '6 Fruits - Rs.1,800' },
      { qty: 9, price: 2700, label: '9 Fruits - Rs.2,700' },
      { qty: 12, price: 3600, label: '12 Fruits - Rs.3,600' }
    ],
    benefits: [
      { icon: '❤️', text: 'Promotes heart health & reduces cholesterol' },
      { icon: '🦴', text: 'Strengthens bones & prevents osteoporosis' },
      { icon: '🛡️', text: 'Contains compounds that fight cancer cells' },
      { icon: '💪', text: 'Rich in antioxidants & boosts immunity' },
      { icon: '🧠', text: 'Improves memory & brain function' }
    ],
    farmNote: '🌴 Fresh from our Batticaloa Farm - Harvested Daily'
  },
  'jambu-sweet': {
    id: 'jambu-sweet',
    name: 'Jambu (Sweet)',
    nameKey: 'jambuSweetName',
    descKey: 'jambuSweetDesc',
    unit: 'kg',
    tag: '🍬 Sweet Variety',
    image: './jambu_medium.webp',
    benefitsBadge: '🍬 Sweet & Juicy',
    category: 'jambu',
    options: [
      { qty: 0.5, price: 625, label: '500g - Rs.625' },
      { qty: 1, price: 1250, label: '1 KG - Rs.1,250' },
      { qty: 2, price: 2500, label: '2 KG - Rs.2,500' },
      { qty: 3, price: 3750, label: '3 KG - Rs.3,750' },
      { qty: 4, price: 5000, label: '4 KG - Rs.5,000' },
      { qty: 5, price: 6250, label: '5 KG - Rs.6,250' }
    ],
    benefits: [
      { icon: '🍬', text: 'Naturally Sweet - Perfect for desserts & snacks' },
      { icon: '⚡', text: 'High in Potassium - Regulates blood pressure' },
      { icon: '💧', text: '93% Water Content - Extremely hydrating' },
      { icon: '🍊', text: 'Rich in Vitamin C - Boosts immunity' },
      { icon: '🌿', text: 'Natural Energy - Great for kids' }
    ],
    farmNote: '🌴 Sweet Variety from our Batticaloa Farm'
  },
  'jambu-granate': {
    id: 'jambu-granate',
    name: 'Jambu (Granate)',
    nameKey: 'jambuGranateName',
    descKey: 'jambuGranateDesc',
    unit: 'kg',
    tag: '💎 Rare Variety',
    image: './dark_red_thai_wax_apple.webp',
    benefitsBadge: '✨ Exotic & Crisp',
    category: 'jambu',
    options: [
      { qty: 0.5, price: 550, label: '500g - Rs.550' },
      { qty: 1, price: 1100, label: '1 KG - Rs.1,100' },
      { qty: 2, price: 2200, label: '2 KG - Rs.2,200' },
      { qty: 3, price: 3300, label: '3 KG - Rs.3,300' },
      { qty: 4, price: 4400, label: '4 KG - Rs.4,400' },
      { qty: 5, price: 5500, label: '5 KG - Rs.5,500' }
    ],
    benefits: [
      { icon: '🌹', text: 'Floral Aroma - Unique scent and taste' },
      { icon: '💎', text: 'Crisp Texture - Crunchy and refreshing' },
      { icon: '❤️', text: 'Antioxidant Rich - Deep red color power' },
      { icon: '💧', text: '93% Water Content - Highly hydrating' }
    ],
    farmNote: '🌴 Unique Red Variety from our Farm'
  },
  'jambu-combo': {
    id: 'jambu-combo',
    name: 'Jambu (Combo)',
    nameKey: 'jambuComboName',
    descKey: 'jambuComboDesc',
    unit: 'kg',
    tag: '🍱 All Variety Pack',
    image: './jambu_combo_variety.webp',
    benefitsBadge: '⭐ Best of Everything',
    category: 'jambu',
    options: [
      { qty: 0.5, price: 500, label: '500g - Rs.500' },
      { qty: 1, price: 1000, label: '1 KG - Rs.1,000' },
      { qty: 2, price: 2000, label: '2 KG - Rs.2,000' },
      { qty: 3, price: 3000, label: '3 KG - Rs.3,000' },
      { qty: 4, price: 4000, label: '4 KG - Rs.4,000' },
      { qty: 5, price: 5000, label: '5 KG - Rs.5,000' }
    ],
    benefits: [
      { icon: '🍱', text: 'Taste Everything - Sweet, Granate, & Classic' },
      { icon: '👨‍👩‍👧‍👦', text: 'Family Favorite - Something for everyone' },
      { icon: '🏷️', text: 'Flat Rate - Great value for mixed pack' }
    ],
    farmNote: '🌴 Handpicked Assortment'
  },
  'jambu-large': {
    id: 'jambu-large',
    name: 'Jambu (Large)',
    nameKey: 'jambuLargeName',
    descKey: 'jambuLargeDesc',
    unit: 'kg',
    tag: '🏆 Premium Size',
    image: './jambu_large.webp',
    benefitsBadge: '💚 Diabetic Friendly',
    category: 'jambu',
    options: [
      { qty: 0.5, price: 225, label: '500g - Rs.225' },
      { qty: 1, price: 450, label: '1 KG - Rs.450' },
      { qty: 2, price: 900, label: '2 KG - Rs.900' },
      { qty: 3, price: 1350, label: '3 KG - Rs.1,350' },
      { qty: 4, price: 1800, label: '4 KG - Rs.1,800' },
      { qty: 5, price: 2250, label: '5 KG - Rs.2,250' }
    ],
    benefits: [
      { icon: '🩺', text: 'Perfect for Diabetics - Controls blood sugar naturally' },
      { icon: '⚡', text: 'High in Potassium - Regulates blood pressure' },
      { icon: '💧', text: '93% Water Content - Extremely hydrating' },
      { icon: '🍊', text: 'Rich in Vitamin C - Boosts immunity' },
      { icon: '🌿', text: 'Low Glycemic Index - Safe for sugar patients' }
    ],
    farmNote: '🌴 No-Sweet Variety from our Batticaloa Farm'
  },
  'jambu-medium': {
    id: 'jambu-medium',
    name: 'Jambu (Medium)',
    nameKey: 'jambuMediumName',
    descKey: 'jambuMediumDesc',
    unit: 'kg',
    tag: '💰 Best Value',
    image: './jambu_medium.webp',
    benefitsBadge: '💚 Diabetic Friendly',
    category: 'jambu',
    options: [
      { qty: 0.5, price: 150, label: '500g - Rs.150' },
      { qty: 1, price: 300, label: '1 KG - Rs.300' },
      { qty: 2, price: 600, label: '2 KG - Rs.600' },
      { qty: 3, price: 900, label: '3 KG - Rs.900' },
      { qty: 4, price: 1200, label: '4 KG - Rs.1,200' },
      { qty: 5, price: 1500, label: '5 KG - Rs.1,500' }
    ],
    benefits: [
      { icon: '🩺', text: 'Perfect for Diabetics - Controls blood sugar naturally' },
      { icon: '⚡', text: 'High in Potassium - Regulates blood pressure' },
      { icon: '💧', text: '93% Water Content - Extremely hydrating' },
      { icon: '🍊', text: 'Rich in Vitamin C - Boosts immunity' },
      { icon: '🌿', text: 'Low Glycemic Index - Safe for sugar patients' }
    ],
    farmNote: '🌴 No-Sweet Variety from our Batticaloa Farm'
  }
};

// Default selected options for each product
export const defaultSelectedOptions = {
  'pom-large': { qty: 3, price: 900 },
  'jambu-sweet': { qty: 1, price: 1250 },
  'jambu-granate': { qty: 1, price: 1100 },
  'jambu-combo': { qty: 1, price: 1000 },
  'jambu-large': { qty: 1, price: 450 },
  'jambu-medium': { qty: 1, price: 300 }
};

// Product display order
export const productOrder = [
  'jambu-sweet',
  'jambu-granate',
  'jambu-combo',
  'jambu-large',
  'jambu-medium',
  'pom-large'
];

// Delivery areas
export const deliveryAreas = [
  'Arayampathy',
  'Kattankudy',
  'Kallady',
  'Batticaloa Town',
  'Kokkadicholai',
  'Thannamunai',
  'Mayilambavali',
  'Eravur',
  'Chenkalady',
  'Mavadivempu',
  'Vantharumoolai',
  'Sittandy',
  'Murakatanchenai',
  'Santhiveli',
  'Kiran',
  'Valaichchenai',
  'Kalkudah',
  'Oddamavadi',
  'Miravodai'
];

// WhatsApp configuration
export const WHATSAPP_NUMBER = '94771420406';
export const WHATSAPP_CHANNEL_LINK = 'https://whatsapp.com/channel/0029Vb7tWiC7DAX7gfZety1L';
