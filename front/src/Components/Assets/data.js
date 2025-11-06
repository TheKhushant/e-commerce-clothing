import p1_img from './product_1.png'
import p2_img from './product_2.png'
import p3_img from './product_3.png'
import p4_img from './product_4.png'

let data_product = [
  {
    id:1,
    name:"Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image:p1_img,
    new_price:50.00,
    old_price:80.50,
  },
  {id:2,
    name:"Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image:p2_img,
    new_price:85.00,
    old_price:120.50,
  },
  {id:3,
    name:"Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image:p3_img,
    new_price:60.00,
    old_price:100.50,
  },
  {id:4,
    name:"Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image:p4_img,
    new_price:100.00,
    old_price:150.00,
  },
];

export default data_product;
// Sample product data with randomly assigned realistic filter attributes.
// Each product has a mainCategory matching navbar (women/men/kids),
// subCategory matching navbar slugs (e.g., 't-shirts', 'dresses'),
// and single-value arrays for filter attributes (for multi-select compatibility).
// Images use relative paths for require() in JSX.
// Expanded to ~12 products for demo; extend as needed with more from your structure.
// Sample product data with randomly assigned realistic filter attributes.
// Each product has a mainCategory matching navbar (women/men/kids),
// subCategory matching navbar slugs (e.g., 't-shirts', 'dresses'),
// and single-value arrays for filter attributes (for multi-select compatibility).
// Images use relative paths for require() in JSX.
// Expanded to 30 products with varied data from file structure; randomized names, prices, and attributes.

const products = [
  // Women - T-shirts (from Western Wear Plus / Western Wear)
  {
    id: 1,
    mainCategory: 'women',
    subCategory: 't-shirts',
    image: '../Assets/Women/T-shirt/women T-shirt_1.jpg',
    name: 'Women Round Neck Casual T-Shirt',
    price: 429,
    size: ['S'],
    color: ['White'],
    occasion: ['Casual'],
    print: ['Solid'],
    sleeves: ['Half'],
    discount: ['15%'],
    character: []
  },
  {
    id: 2,
    mainCategory: 'women',
    subCategory: 't-shirts',
    image: '../Assets/Women/T-shirt/women T-shirt_5.jpg',
    name: 'Women Graphic Print Crop T-Shirt',
    price: 599,
    size: ['M'],
    color: ['Black'],
    occasion: ['Party'],
    print: ['Graphic'],
    sleeves: ['Sleeveless'],
    discount: ['25%'],
    character: []
  },
  {
    id: 3,
    mainCategory: 'women',
    subCategory: 't-shirts',
    image: '../Assets/Women/T-shirt/women T-shirt_9.jpg',
    name: 'Women V-Neck Striped T-Shirt',
    price: 499,
    size: ['L'],
    color: ['Navy Blue'],
    occasion: ['Casual'],
    print: ['Striped'],
    sleeves: ['Half'],
    discount: ['10%'],
    character: []
  },
  // Women - Tops (from Western Wear Plus / Western Wear)
  {
    id: 4,
    mainCategory: 'women',
    subCategory: 'tops',
    image: '../Assets/Women/Top/women_3.jpg',
    name: 'Women Off-Shoulder Blouse Top',
    price: 749,
    size: ['XL'],
    color: ['Pink'],
    occasion: ['Formal'],
    print: ['Floral'],
    sleeves: ['Full'],
    discount: ['20%'],
    character: []
  },
  {
    id: 5,
    mainCategory: 'women',
    subCategory: 'tops',
    image: '../Assets/Women/Top/women_7.jpg',
    name: 'Women Button-Down Shirt Top',
    price: 649,
    size: ['S'],
    color: ['Beige'],
    occasion: ['Office'],
    print: ['Checked'],
    sleeves: ['Full'],
    discount: ['5%'],
    character: []
  },
  // Women - Dresses (from Western Wear Plus / Western Wear / Ethnic Wear)
  {
    id: 6,
    mainCategory: 'women',
    subCategory: 'dresses',
    image: '../Assets/Women/dresses/image copy 4.png',
    name: 'Women Maxi Floral Dress',
    price: 1199,
    size: ['M'],
    color: ['Yellow'],
    occasion: ['Casual'],
    print: ['Floral'],
    sleeves: ['Sleeveless'],
    discount: ['40%'],
    character: []
  },
  {
    id: 7,
    mainCategory: 'women',
    subCategory: 'dresses',
    image: '../Assets/Women/dresses/image copy 12.png',
    name: 'Women A-Line Party Dress',
    price: 1499,
    size: ['L'],
    color: ['Red'],
    occasion: ['Party'],
    print: ['Embroidered'],
    sleeves: ['Half'],
    discount: ['30%'],
    character: []
  },
  // Women - Sports Bra (from Sports & Activewear)
  {
    id: 8,
    mainCategory: 'women',
    subCategory: 'sports-bra',
    image: '../Assets/Women/sportbra/sportbra_3.jpg',
    name: 'Women High-Impact Sports Bra',
    price: 799,
    size: ['M'],
    color: ['Grey'],
    occasion: ['Gym'],
    print: ['Solid'],
    sleeves: ['Sleeveless'],
    discount: ['15%'],
    character: []
  },
  // Men - T-shirts (from Top Wear / Sports Wear)
  {
    id: 9,
    mainCategory: 'men',
    subCategory: 't-shirts',
    image: '../Assets/Men/T-shirts/T-shirts_3.jpg',
    name: 'Men Crew Neck Plain T-Shirt',
    price: 349,
    size: ['L'],
    color: ['White'],
    occasion: ['Casual'],
    print: ['Solid'],
    sleeves: ['Half'],
    discount: ['20%'],
    character: []
  },
  {
    id: 10,
    mainCategory: 'men',
    subCategory: 't-shirts',
    image: '../Assets/Men/T-shirts/T-shirts_7.jpg',
    name: 'Men Polo Collar T-Shirt',
    price: 499,
    size: ['XL'],
    color: ['Blue'],
    occasion: ['Formal'],
    print: ['Striped'],
    sleeves: ['Half'],
    discount: ['10%'],
    character: []
  },
  // Men - Jeans (from Bottom Wear)
  {
    id: 11,
    mainCategory: 'men',
    subCategory: 'jeans',
    image: '../Assets/Men/jeans/jeans_4.jpg',
    name: 'Men Straight Fit Denim Jeans',
    price: 899,
    size: ['32'],
    color: ['Dark Blue'],
    occasion: ['Casual'],
    print: ['Solid'],
    sleeves: [], // N/A for bottoms
    discount: ['25%'],
    character: []
  },
  {
    id: 12,
    mainCategory: 'men',
    subCategory: 'jeans',
    image: '../Assets/Men/jeans/jeans_6.jpg',
    name: 'Men Slim Fit Washed Jeans',
    price: 1099,
    size: ['30'],
    color: ['Light Blue'],
    occasion: ['Party'],
    print: ['Faded'],
    sleeves: [], // N/A for bottoms
    discount: ['35%'],
    character: []
  },
  // Men - Kurtas (from Ethnic Wear)
  {
    id: 13,
    mainCategory: 'men',
    subCategory: 'kurtas',
    image: '../Assets/Men/kurtas/kurtas_2.jpg',
    name: 'Men Straight Fit Kurta',
    price: 1299,
    size: ['M'],
    color: ['Cream'],
    occasion: ['Festive'],
    print: ['Printed'],
    sleeves: ['Full'],
    discount: ['20%'],
    character: []
  },
  // Kids (Girls) - Tees & Tops (from Girls)
  {
    id: 14,
    mainCategory: 'kids',
    subCategory: 'tees-tops',
    image: '../Assets/Kids/F/teesTops/teesTops_4.jpg',
    name: 'Girls Printed Round Neck Tee',
    price: 249,
    size: ['6-8Y'],
    color: ['Pink'],
    occasion: ['Casual'],
    print: ['Cartoon'],
    sleeves: ['Half'],
    discount: ['15%'],
    character: ['Cartoon']
  },
  {
    id: 15,
    mainCategory: 'kids',
    subCategory: 'tees-tops',
    image: '../Assets/Kids/F/teesTops/teesTops_6.jpg',
    name: 'Girls Graphic Crop Top',
    price: 299,
    size: ['10-12Y'],
    color: ['Yellow'],
    occasion: ['Party'],
    print: ['Graphic'],
    sleeves: ['Sleeveless'],
    discount: ['25%'],
    character: ['Superhero']
  },
  // Kids (Girls) - Dresses & Frocks (from Girls)
  {
    id: 16,
    mainCategory: 'kids',
    subCategory: 'dresses-frocks',
    image: '../Assets/Kids/F/dresses&frocks/dresses&frocks_2.jpg',
    name: 'Girls Floral Frocks Dress',
    price: 599,
    size: ['4-6Y'],
    color: ['White'],
    occasion: ['Casual'],
    print: ['Floral'],
    sleeves: ['Half'],
    discount: ['30%'],
    character: []
  },
  // Kids (Boys) - T-shirts (from Boys)
  {
    id: 17,
    mainCategory: 'kids',
    subCategory: 't-shirts',
    image: '../Assets/Kids/M/t-shirts/t-shirts_3.jpg',
    name: 'Boys Striped Crew Neck T-Shirt',
    price: 229,
    size: ['8-10Y'],
    color: ['Blue'],
    occasion: ['Casual'],
    print: ['Striped'],
    sleeves: ['Half'],
    discount: ['10%'],
    character: ['Sports']
  },
  {
    id: 18,
    mainCategory: 'kids',
    subCategory: 't-shirts',
    image: '../Assets/Kids/M/t-shirts/t-shirts_5.jpg',
    name: 'Boys Solid Color T-Shirt',
    price: 279,
    size: ['2-4Y'],
    color: ['Grey'],
    occasion: ['Everyday'],
    print: ['Solid'],
    sleeves: ['Full'],
    discount: ['20%'],
    character: []
  },
  // Kids (Boys) - Bottom Wear (from Boys)
  {
    id: 19,
    mainCategory: 'kids',
    subCategory: 'bottom-wear',
    image: '../Assets/Kids/M/bottom_wear/bottom_wear_1.jpg',
    name: 'Boys Cargo Shorts',
    price: 399,
    size: ['6-8Y'],
    color: ['Khaki'],
    occasion: ['Casual'],
    print: ['Solid'],
    sleeves: [], // N/A for bottoms
    discount: ['15%'],
    character: []
  },
  // Men - Joggers (from Bottom Wear / Sports Wear)
  {
    id: 20,
    mainCategory: 'men',
    subCategory: 'joggers',
    image: '../Assets/Men/joggers/joggers_1.jpg',
    name: 'Men Relaxed Fit Joggers',
    price: 699,
    size: ['M'],
    color: ['Black'],
    occasion: ['Gym'],
    print: ['Solid'],
    sleeves: [], // N/A for bottoms
    discount: ['25%'],
    character: []
  },
  // Women - Kurta Kurtis (from Ethnic Wear)
  {
    id: 21,
    mainCategory: 'women',
    subCategory: 'kurta-kurtis',
    image: '../Assets/Women/kurta/kurta_3.jpg',
    name: 'Women Anarkali Kurta Set',
    price: 1599,
    size: ['L'],
    color: ['Maroon'],
    occasion: ['Festive'],
    print: ['Embroidered'],
    sleeves: ['Full'],
    discount: ['40%'],
    character: []
  },
  // Kids (Girls) - Ethnic Wear (from Girls)
  {
    id: 22,
    mainCategory: 'kids',
    subCategory: 'ethnic-wear',
    image: '../Assets/Kids/F/ethicwear/ethicwear_5.jpg',
    name: 'Girls Lehenga Choli Set',
    price: 899,
    size: ['10-12Y'],
    color: ['Pink'],
    occasion: ['Festive'],
    print: ['Printed'],
    sleeves: ['Half'],
    discount: ['30%'],
    character: []
  },
  // Men - Sweaters (from Winter Wear)
  {
    id: 23,
    mainCategory: 'men',
    subCategory: 'sweaters',
    image: '../Assets/Men/sweeter/sweeter_4.jpg',
    name: 'Men V-Neck Wool Sweater',
    price: 999,
    size: ['XL'],
    color: ['Brown'],
    occasion: ['Casual'],
    print: ['Cable Knit'],
    sleeves: ['Full'],
    discount: ['20%'],
    character: []
  },
  // Women - Sarees (from Ethnic Wear)
  {
    id: 24,
    mainCategory: 'women',
    subCategory: 'sarees',
    image: '../Assets/Women/sarees/sarees_6.jpg',
    name: 'Women Silk Printed Saree',
    price: 2199,
    size: ['Free'],
    color: ['Green'],
    occasion: ['Wedding'],
    print: ['Jacquard'],
    sleeves: [], // N/A for sarees
    discount: ['50%'],
    character: []
  },
  // Kids (Boys) - Coats & Jackets (from Boys / Winter Wear)
  {
    id: 25,
    mainCategory: 'kids',
    subCategory: 'coats-jackets',
    image: '../Assets/Kids/M/coats/coats_2.jpg',
    name: 'Boys Puffer Jacket',
    price: 799,
    size: ['4-6Y'],
    color: ['Navy'],
    occasion: ['Winter'],
    print: ['Solid'],
    sleeves: ['Full'],
    discount: ['25%'],
    character: []
  },
  // Women - Trousers (from Western Wear)
  {
    id: 26,
    mainCategory: 'women',
    subCategory: 'trousers',
    image: '../Assets/Women/trousers/trousers_5.jpg',
    name: 'Women Wide-Leg Trousers',
    price: 899,
    size: ['M'],
    color: ['Black'],
    occasion: ['Office'],
    print: ['Solid'],
    sleeves: [], // N/A for bottoms
    discount: ['15%'],
    character: []
  },
  // Men - Formal Shirts (from Top Wear)
  {
    id: 27,
    mainCategory: 'men',
    subCategory: 'formal-shirts',
    image: '../Assets/Men/casual_shirt/casual_shirt_6.jpg',
    name: 'Men Slim Fit Formal Shirt',
    price: 799,
    size: ['L'],
    color: ['White'],
    occasion: ['Office'],
    print: ['Solid'],
    sleeves: ['Full'],
    discount: ['10%'],
    character: []
  },
  // Kids (Girls) - Leggings (from Girls)
  {
    id: 28,
    mainCategory: 'kids',
    subCategory: 'leggings',
    image: '../Assets/Kids/F/girlspannty/girls_7.jpg',
    name: 'Girls Stretch Leggings',
    price: 199,
    size: ['8-10Y'],
    color: ['Black'],
    occasion: ['Casual'],
    print: ['Solid'],
    sleeves: [], // N/A for bottoms
    discount: ['20%'],
    character: []
  },
  // Men - Track Pants (from Sports Wear)
  {
    id: 29,
    mainCategory: 'men',
    subCategory: 'track-pants',
    image: '../Assets/Men/track_pant/track_pant_3.jpg',
    name: 'Men Athletic Track Pants',
    price: 599,
    size: ['M'],
    color: ['Grey'],
    occasion: ['Gym'],
    print: ['Striped'],
    sleeves: [], // N/A for bottoms
    discount: ['30%'],
    character: []
  },
  // Women - Jackets (from Western Wear / Winter Wear)
  {
    id: 30,
    mainCategory: 'women',
    subCategory: 'jackets',
    image: '../Assets/Women/jackets/jackets_8.jpg',
    name: 'Women Denim Bomber Jacket',
    price: 1299,
    size: ['S'],
    color: ['Blue'],
    occasion: ['Casual'],
    print: ['Washed'],
    sleeves: ['Full'],
    discount: ['25%'],
    character: []
  }
];

export { products };