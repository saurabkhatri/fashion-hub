const connectDB = require("../src/config/db");
const Billboard = require("../src/modules/billboard/billboard.model");
const Category = require("../src/modules/category/category.model");
const Product = require("../src/modules/product/product.model");

const collection = {
  image:
    "https://static.wixstatic.com/media/539a77_cef236f6c3804bbd8505c63657465c68~mv2.jpg/v1/fill/w_1895,h_663,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/539a77_cef236f6c3804bbd8505c63657465c68~mv2.jpg",
  title: "Discover Men's trend from HUB",
  description: "WOMEN’S COLLECTION",
  products: [
    {
      name: "Summer T-Shirt",
      price: 1750,
      image:
        "https://static.wixstatic.com/media/a664ae_037f4fa36956476dbfd24a35f2eda52a~mv2.jpg/v1/fill/w_471,h_627,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/a664ae_037f4fa36956476dbfd24a35f2eda52a~mv2.jpg",
      description: "A comfortable and stylish summer t-shirt.",
      color: "Blue",
      size: "M",
      gender: "FEMALE",
      stock: 50,
      category: "Clothing",
    },
    {
      name: "Casual Shorts",
      price: 1999,
      image:
        "https://static.wixstatic.com/media/a664ae_95e48e6a81b14e41b4fa31eb4c493e9b~mv2.jpg/v1/fill/w_471,h_627,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/a664ae_95e48e6a81b14e41b4fa31eb4c493e9b~mv2.jpg",
      description: "Lightweight and comfortable casual shorts.",
      color: "Khaki",
      size: "L",
      gender: "FEMALE",
      stock: 30,
      category: "Clothing",
    },
    {
      name: "Beach Sandals",
      price: 1299,
      image:
        "https://static.wixstatic.com/media/a664ae_353bbaac0a5d44b7bffc409098f1a7ef~mv2.jpg/v1/fill/w_471,h_627,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/a664ae_353bbaac0a5d44b7bffc409098f1a7ef~mv2.jpg",
      description: "Perfect sandals for the beach.",
      color: "Black",
      size: "10",
      gender: "FEMALE",
      stock: 200,
      category: "Footwear",
    },
    {
      name: "Summer Hat",
      price: 1199,
      image:
        "https://static.wixstatic.com/media/a664ae_49a5f2d77aa54c5bbd06a9e267bcc999~mv2.jpg/v1/fill/w_471,h_627,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/a664ae_49a5f2d77aa54c5bbd06a9e267bcc999~mv2.jpg",
      description: "Stylish hat to protect you from the sun.",
      color: "White",
      size: "One Size",
      gender: "FEMALE",
      stock: 100,
      category: "Accessories",
    },
    {
      name: "Sunglasses",
      price: 1999,
      image:
        "https://static.wixstatic.com/media/a664ae_05b176ae2ea04aa5ae1a57698703d279~mv2.jpg/v1/fill/w_471,h_627,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/a664ae_05b176ae2ea04aa5ae1a57698703d279~mv2.jpg",
      description: "Trendy sunglasses for summer.",
      color: "Brown",
      size: "Standard",
      gender: "UNISEX",
      stock: 70,
      category: "Accessories",
    },
    {
      name: "Swim Trunks",
      price: 1700,
      image:
        "https://static.wixstatic.com/media/a664ae_17bb3e0e81cb41a78aea88641dad22eb~mv2.jpg/v1/fill/w_471,h_627,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/a664ae_17bb3e0e81cb41a78aea88641dad22eb~mv2.jpg",
      description: "Comfortable swim trunks for the beach.",
      color: "Red",
      size: "XL",
      gender: "FEMALE",
      stock: 40,
      category: "Swimwear",
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
      gender: "FEMALE",
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
