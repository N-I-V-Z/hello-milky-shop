const productService = require("../service/productService");

const getTop5ProductBestSeller = async (req, res) => {
  try {
    const { Option } = req.body;
    const obj = await productService.getTop5ProductBestSeller(Option);
    res.status(200).json(obj)
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

const countBrand = async (req, res) => {
  try {
    const obj = await productService.countBrand();
    res.status(200).json(obj)
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

const countProduct = async (req, res) => {
  try {
    const obj = await productService.countProduct();
    res.status(200).json(obj)
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

const getTop6ProductByBrand = async (req, res) => {
  try {
    const obj = await productService.getTop6ProductByBrand(req.params.id);
    res.status(200).json(obj)
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

const getProductInforID = async (req, res) => {
  try {
    const obj = await productService.getProductInforID(req.params.id);
    res.status(200).json(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

const getProductByCategory = async (req, res) => {
  try {
    const obj = await productService.getProductByCategory(req.params.pc);
    res.status(200).json(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getAllBrands = async (req, res) => {
  try {
    const obj = await productService.getAllBrands();
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const searchWithProductCategory = async (req, res) => {
  try {
    const obj = await productService.searchWithProductCategory(
      req.params.pc
    );
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const searchWithName = async (req, res) => {
  try {
    const name = req.query.search; // Lấy giá trị từ query parameter 'timkiem'

  if (!name) {
    return res.status(400).json({ error: 'Query không hợp lệ' });
  }
    const obj = await productService.searchWithName(name);
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getInfoProductsDetail = async (req, res) => {
  try {
    const obj = await productService.getInfoProductsDetail();
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const checkDateValid = (ExpirationDate, ManufacturingDate) => {
  if (Date.parse(ExpirationDate) < Date.parse(ManufacturingDate)) {
    return false;
  }
  return true;
};

const checkStockQuantity = (StockQuantity) => {
  if (Number.parseInt(StockQuantity) < 0) return false;
  return true;
};

const updateProduct = async (req, res) => {
  try {
    const product = req.body;
    if (!checkDateValid(product.ExpirationDate, product.ManufacturingDate))
      return res.status(400).send({
        err: 1,
        message: "ExpirationDate must be after ManufacturingDate!",
      });

    if (!checkStockQuantity(product.StockQuantity))
      return res.status(400).send({
        err: 1,
        message: "StockQuantity must be more than 0",
      });

    const obj = await productService.updateProduct(
      req.params.product_id,
      product
    );
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    if (!checkDateValid(product.ExpirationDate, product.ManufacturingDate))
      return res.status(400).send({
        err: 1,
        message: "ExpirationDate must be after ManufacturingDate!",
      });

    if (!checkStockQuantity(product.StockQuantity))
      return res.status(400).send({
        err: 1,
        message: "StockQuantity must be more than 0",
      });
    const obj = await productService.createProduct(product);
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const obj = await productService.deleteProduct(req.params.product_id);
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};


const getAllBrandByCategory = async (req, res) => {
  try {
    const obj = await productService.getAllBrandByCategory(req.params.pc);
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getProductInfoByID = async (req, res) => {
  try {
    const obj = await productService.getProductInfoByID(req.params.product_id);
    res.send(obj);
  } catch (error) {
    console.error("Error while getting all users:", error);
    res.status(500).send("Internal Server Error");
  }
};

  const getTop6MilksForPregnantMother = async (req, res) => {
    try {
      const obj = await productService.getTop6MilksForPregnantMother();
      res.send(obj);
    } catch (error) {
      console.error("Error while getting all users:", error);
      res.status(500).send("Internal Server Error");
    }
};
const getTop6MilkForBaby = async (req, res) => {
  try {
    const obj = await productService.getTop6MilkForBaby();
    res.send(obj);
  } catch (error) {
    console.error("Error while getting all users:", error);
    res.status(500).send("Internal Server Error");
  }
};
const getTop5ProductBestSellerForUser = async (req, res) => {
  try {
    const obj = await productService.getTop5ProductBestSellerForUser();
    res.status(200).json(obj)
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getInfoProductsDetail,
  updateProduct,
  createProduct,
  deleteProduct,
  getAllBrands,
  searchWithProductCategory,
  searchWithName,
  getProductByCategory,
  getAllBrandByCategory,
  getProductInfoByID,
  getTop6MilksForPregnantMother,
  getTop6MilkForBaby,
  getProductInforID,
  getTop6ProductByBrand,
  countProduct,
  countBrand,
  getTop5ProductBestSeller,
  getTop5ProductBestSellerForUser,
};
