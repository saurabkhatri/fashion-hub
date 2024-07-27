const connectDB = require("../src/config/db");
const Billboard = require("../src/modules/billboard/billboard.model");
const Category = require("../src/modules/category/category.model");
const Product = require("../src/modules/product/product.model");

const collection = {
  image:
    "https://static.wixstatic.com/media/539a77_cd05fdad5f0041cbab9ebbec44d348be~mv2.jpg/v1/fill/w_1835,h_822,fp_0.16_0.31,q_85,usm_0.66_1.00_0.01,enc_auto/About%20Us%20Image.jpg",
  title: "Discover Men's trend from HUB",
  description: "MEN’S COLLECTION",
  products: [
    {
      name: "Summer T-Shirt",
      price: 1750,
      image:
        "https://static.wixstatic.com/media/a664ae_0018ebe12b5c44689a77a3d3ea9b36f0~mv2.jpg/v1/fill/w_471,h_627,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/a664ae_0018ebe12b5c44689a77a3d3ea9b36f0~mv2.jpg",
      description: "A comfortable and stylish summer t-shirt.",
      color: "Brown",
      size: "M",
      gender: "MALE",
      stock: 50,
      category: "T-shirt",
    },
    {
      name: "Summer T-Shirt",
      price: 1750,
      image:
        "https://static.wixstatic.com/media/a664ae_b582d988161d4e5cbd57cb15b0eb40f0~mv2.jpg/v1/fill/w_471,h_627,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/a664ae_b582d988161d4e5cbd57cb15b0eb40f0~mv2.jpg",
      description: "A comfortable and stylish summer t-shirt.",
      color: "Blue",
      size: "L",
      gender: "MALE",
      stock: 30,
      category: "Clothing",
    },
    {
      name: "Co-ord Shorts",
      price: 3000,
      image:
        "https://static.wixstatic.com/media/a664ae_3e9c6c5a78a74afcb8a3710d7eb472cd~mv2.jpg/v1/fill/w_471,h_627,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/a664ae_3e9c6c5a78a74afcb8a3710d7eb472cd~mv2.jpg",
      description:
        "Co-ord set Featuring a boxy fit and convenient drawstring closure, these set are both comfortable and stylish. Made from soft corduroy fabric, they offer a relaxed yet fashionable look for any casual occasion.",
      color: "Black",
      size: "l",
      gender: "FEMALE",
      stock: 20,
      category: "Shorts",
    },
    {
      name: "Basic T-shirt",
      price: 1750,
      image:
        "https://static.wixstatic.com/media/a664ae_36418ac51ecb4a5fbd2108645cc0261c~mv2.jpg/v1/fill/w_918,h_1173,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/file.jpg",
      description:
        "Basic t-shirt made with premium cotton terry fabric, this tee offers a luxurious feel against your skin. The ribbed collar adds a touch of sophistication, while the drop-shoulder fit brings a relaxed vibe. The boxy fit of this t-shirt provides a relaxed, contemporary silhouette that allows for ease of movement and a laid-back style which is suitable for a variety of casual occasions.",
      color: "Green",
      size: "S",
      gender: "MALE",
      stock: 100,
      category: "T-shirt",
    },
    {
      name: "Pant",
      price: 1900,
      image:
        "https://static.wixstatic.com/media/a664ae_c5bced3fb9d949d1af695097d7cbf135~mv2.jpg/v1/fill/w_918,h_1173,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/file.jpg",
      description:
        "Made from premium twill fabric, these pants offer a sophisticated aesthetic with a relaxed, baggy fit that exudes effortless cool. Designed for everyday wear, the Samo Pant boasts a durable construction that can withstand the demands of active lifestyle. The pant features a soft and breathable fabric that feels great against your skin.",
      color: "Green",
      size: "XL",
      gender: "MALE",
      stock: 40,
      category: "Pant",
    },
  ],
};

(async () => {
  try {
    await connectDB();

    const categoriesWithDescriptions = {
      Clothing: "Apparel suitable for everyday wear.",
      Footwear: "Shoes and sandals for various occasions.",
      Accessories: "Additional items to complement your outfit.",
      Swimwear: "Swimsuits and trunks for swimming.",
    };

    // Create the billboard
    await Billboard.create({
      title: collection.title,
      description: collection.description,
      gender: "MALE",
      image: collection.image,
    });
    const categoryNames = [
      ...new Set(collection.products.map((product) => product.category)),
    ];
    const existingCategories = await Category.find({
      name: { $in: categoryNames },
    })
      .select("name")
      .lean();

    const existingCategoryNames = existingCategories.map(
      (category) => category.name
    );
    const newCategories = categoryNames.filter(
      (name) => !existingCategoryNames.includes(name)
    );

    const newCategoryDocs = newCategories.map((name) => ({
      name,
      description: categoriesWithDescriptions[name],
    }));

    // Insert new categories if there are any
    let insertedCategories = [];
    if (newCategoryDocs.length > 0) {
      insertedCategories = await Category.insertMany(newCategoryDocs);
    }

    // Combine existing and newly inserted categories
    const allCategories = [...existingCategories, ...insertedCategories];

    // Create a map for category names to IDs
    const categoryMap = allCategories.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});

    // Create products and link to categories
    const productPromises = collection.products.map(async (product) => {
      product.category = categoryMap[product.category];
      const newProduct = new Product(product);
      return await newProduct.save();
    });

    await Promise.all(productPromises);
    console.log("Data successfully loaded into the database");
  } catch (error) {
    console.error("Error loading data into the database", error);
  }
})();
