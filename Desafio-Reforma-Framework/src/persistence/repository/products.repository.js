import { asDto } from "../dto/products.dto.js";
import { getDao } from "../daos/factory.js";

export default class ProductsRepository {
  constructor() {
    this.dao = getDao();
  }

  async save(prod) {
    const product = await this.dao.save(prod);
    return product;
  }

  async getAll() {
    const products = await this.dao.getAll();
    const prodsDTO = asDto(products);
    return prodsDTO;
  }

  async updateProductById(id, title, description, code, photo, value, stock) {
    const prod = await this.dao.updateProductById(
      id,
      title,
      description,
      code,
      photo,
      value,
      stock
    );
    return prod;
  }

  async deleteProductById(id) {
    const prod = await this.dao.deleteProductById(id);
    return prod;
  }
}
