const connectDB = require("../src/config/db");
const Billboard = require("../src/modules/billboard/billboard.model");
const Category = require("../src/modules/category/category.model");
const Product = require("../src/modules/product/product.model");

const collection = {
  image:
    "https://static.wixstatic.com/media/539a77_f1f49890c1804d45a2822a83644c10de~mv2.jpg/v1/fill/w_1064,h_569,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/539a77_f1f49890c1804d45a2822a83644c10de~mv2.jpg",
  title: "Discover Men's trend from HUB",
  description: "Winter’S COLLECTION",
  products: [
    {
      name: "Bonber Jacket",
      price: 3000,
      image:
        "https://static.wixstatic.com/media/e1f805_1b56934645794165a1b305ba108e1b0a~mv2.jpg/v1/fill/w_918,h_1173,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/file.jpg",
      description:
        "Filled with silicon sheet insulation, it provides lightweight warmth without added bulk. With a regular fit for easy layering, this jacket is perfect for facing chilly weather in style featuring two bun pockets at the front for functional use. ",
      color: "Green",
      size: "M",
      gender: "MALE",
      season: "WINTER",
      stock: 50,
      category: "Jacket",
    },
    {
      name: "Artic Bomber Jacket",
      price: 3000,
      image:
        "https://static.wixstatic.com/media/e1f805_71a23dd1ae2d45d696bef26631d5ed49~mv2.jpg/v1/fill/w_918,h_1173,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/file.jpg",
      description:
        "Filled with silicon sheet insulation, it provides lightweight warmth without added bulk. With a regular fit for easy layering, this jacket is perfect for facing chilly weather in style featuring two bun pockets at the front for functional use. ",
      color: "Black",
      size: "L",
      gender: "FEMALE",
      season: "WINTER",
      stock: 30,
      category: "Jacket",
    },
    {
      name: "Puffer Jacket",
      price: 3000,
      image:
        "https://static.wixstatic.com/media/a664ae_b6d9634a4090489c81d01ea77038d255~mv2.jpg/v1/fill/w_918,h_1173,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/file.jpg",
      description:
        "Puffer Jacket, crafted with hollowfibre for lightweight warmth without bulk. Complete with two functional front pockets and a detachable hood, it offers added versatility. Stay stylish and cozy wherever you go!",
      color: "Brown",
      size: "l",
      gender: "MALE",
      season: "WINTER",
      stock: 200,
      category: "Jacket",
    },
    {
      name: "Puffer Jacket",
      price: 3000,
      image:
        "https://static.wixstatic.com/media/a664ae_369784b00f954634ad9ab7897931f806~mv2.jpg/v1/fill/w_918,h_1173,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/file.jpg",
      description:
        "Puffer Jacket, crafted with hollowfibre for lightweight warmth without bulk. Complete with two functional front pockets and a detachable hood, it offers added versatility. Stay stylish and cozy wherever you go!",
      color: "Black",
      size: "S",
      gender: "FEMALE",
      season: "WINTER",
      stock: 100,
      category: "Jacket",
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
      Jacket: "Outerwear for warmth and style.",
    };

    // Create the billboard
    await Billboard.create({
      title: collection.title,
      description: collection.description,
      season: "WINTER",
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
