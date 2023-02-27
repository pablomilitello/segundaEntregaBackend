const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  askProductExists = async () => {
    if (fs.existsSync(this.path)) {
      const fileInformationProduct = await fs.promises.readFile(this.path, "utf-8");
      const productsInFile = JSON.parse(fileInformationProduct);
      return productsInFile;
    } else {
      console.log("--> File not found");
      return [];
    }
  };

  addProduct = async (product) => {
    const productsInFileFromAsk = await this.askProductExists();
    const id = this.#generateID(productsInFileFromAsk);
    const newProductFile = { id, ...product };
    productsInFileFromAsk.push(newProductFile);
    await fs.promises.writeFile(this.path, JSON.stringify(productsInFileFromAsk));
    return newProductFile;
  };

  getProductsById = async (id) => {
    const products = await this.askProductExists();
    const product = products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      return "--> Product not found";
    }
  };

  updateProduct = async (id, obj) => {
    const products = await this.askProductExists();
    const indexProduct = products.findIndex((elem) => elem.id === id);
    if (indexProduct == -1) {
      return "--> Product not found";
    } else {
      const actualProduct = { ...products[indexProduct] };
    }
  };

  deleteProducts = async () => {
    if (fs.existsSync(this.path)) {
      await fs.promises.unlink(this.path);
      return "Delete products";
    } else {
      return "--> Non-existent file";
    }
  };

  deleteProductsById = async (id) => {
    const products = await this.askProductExists();
    const arrayNewProducts = products.filter((user) => user.id !== id);
    await fs.promises.writeFile(this.path, JSON.stringify(arrayNewProducts));
    return arrayNewProducts;
  };

  getProducts = async () => {
    const fileInformationProduct = await fs.promises.readFile(this.path, "utf-8");
    const productsInFile = JSON.parse(fileInformationProduct);
    return productsInFile;
  };

  #generateID = (products) => {
    let id;
    if (products.length === 0) {
      id = 1;
    } else {
      id = products[products.length - 1].id + 1;
    }
    return id;
  };
}

const product1 = {
  title: "jeans",
  description: "blue jeans medium",
  price: 30,
  thumbnail: true,
  code: "ABC0001",
  stock: 10,
};

const product2 = {
  title: "shirt",
  description: "white shirt medium",
  price: 20,
  thumbnail: true,
  code: "ABC0002",
  stock: 7,
};

const product3 = {
  title: "shoes",
  description: "black shoes 41",
  price: 22,
  thumbnail: true,
  code: "ABC0003",
  stock: 15,
};

const product = new ProductManager("products.json");

const run = async () => {
  await product.addProduct(product1);
  await product.addProduct(product2);
  await product.addProduct(product3);
  console.log(await product.getProducts());
  //console.log(await product.getProductsById(6));
  //console.log(await product.deleteProducts());
  //console.log(await product.deleteProductsById(2));
  await product.updateProduct(3, 4);
};

run();
