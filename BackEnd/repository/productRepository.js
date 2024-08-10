const productDAO = require("../dao/productDAO");

const productRepository = {

  getTop5ProductBestSeller: async(Option) => {
    return await productDAO.getTop5ProductBestSeller(Option);
  },

  countBrand: async() => {
    return await productDAO.countBrand();
  },

  countProduct: async() => {
    return await productDAO.countProduct();
  },

  getTop6ProductByBrand: async (id) => {
    return await productDAO.getTop6ProductByBrand(id);
  },

  getProductInforID: async (id) => {
    return await productDAO.getProductInforID(id);
  },

  getAllBrandByCategory: async (pc) => {
    return await productDAO.getAllBrandByCategory(pc);
  },

  getProductByCategory: async (pc) => {
    return await productDAO.getProductByCategory(pc);
  },

  getAllBrands: async () => {
    return await productDAO.getAllBrands();
  },

  searchWithProductCategory: async ( pc) => {
    return await productDAO.searchWithProductCategory( pc);
  },
  searchWithName: async (name) => {
    return await productDAO.searchWithName(name);
  },

  getInfoProductsDetail: async () => {
    return await productDAO.findInfoProductsDetail();
  },
  updateProduct: async (product_id, product) => {
    return await productDAO.updateProduct(product_id, product);
  },
  createProduct: async (product) => {
    return await productDAO.createProduct(product);
  },
  deleteProduct: async (product_id) => {
    return await productDAO.deleteProduct(product_id);
  },
  getProductInfoByID: async (product_id) => {
    return await productDAO.getProductInfoByID(product_id);
  },
  getTop6MilksForPregnantMother: async () => {
    return await productDAO.getTop6MilksForPregnantMother();
  },
  getTop6MilkForBaby: async () => {
    return await productDAO.getTop6MilkForBaby();
  },
  getTop5ProductBestSellerForUser: async() => {
    return await productDAO.findTop5ProductBestSellerForUser();
  },
};

module.exports = productRepository;
