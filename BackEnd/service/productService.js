const productRepository = require("../repository/productRepository");

const productService = {

  getTop5ProductBestSeller: async (Option) => {
    return await productRepository.getTop5ProductBestSeller(Option);
  },

  countBrand: async () => {
    return await productRepository.countBrand();
  },

  countProduct: async () => {
    return await productRepository.countProduct();
  },

  getTop6ProductByBrand: async (id) => {
    return await productRepository.getTop6ProductByBrand(id);
  },

  getProductInforID: async (id) => {
    return await productRepository.getProductInforID(id);
  },

  getAllBrandByCategory: async (pc) => {
    return await productRepository.getAllBrandByCategory(pc);
  },

  getProductByCategory: async (pc) => {
    return await productRepository.getProductByCategory(pc);
  },
  getAllBrands: async () => {
    return await productRepository.getAllBrands();
  },

  searchWithProductCategory: async ( pc) => {
    return await productRepository.searchWithProductCategory( pc);
  },

  searchWithName: async (name) => {
    return await productRepository.searchWithName(name);
  },
  getInfoProductsDetail: async () => {
    return await productRepository.getInfoProductsDetail();
  },
  updateProduct: async (product_id, product) => {
    return await productRepository.updateProduct(product_id, product);
  },
  createProduct: async (product) => {
    return await productRepository.createProduct(product);
  },
  deleteProduct: async (product_id) => {
    return await productRepository.deleteProduct(product_id);
  },
  getProductInfoByID : async (product_id) => {
    return await productRepository.getProductInfoByID(product_id);
  },
  getTop6MilksForPregnantMother : async () => {
    return await productRepository.getTop6MilksForPregnantMother();
  },
  getTop6MilkForBaby : async () => {
    return await productRepository.getTop6MilkForBaby();
  },
  getTop5ProductBestSellerForUser: async () => {
    return await productRepository.getTop5ProductBestSellerForUser();
  },
};

module.exports = productService;
