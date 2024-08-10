const router = require("express").Router();

const productController = require("../controller/productController");

router.get("/getInfoProductsDetail", productController.getInfoProductsDetail);

router.put("/editProduct/:product_id", productController.updateProduct);

router.post("/createProduct", productController.createProduct);

router.put("/deleteProduct/:product_id", productController.deleteProduct);

router.get("/getAllBrands", productController.getAllBrands);

router.get(
  "/searchWithProductCategory/:pc",
  productController.searchWithProductCategory
);

router.get("/searchWithName", productController.searchWithName);

router.get("/getProductByCategory/:pc", productController.getProductByCategory);

router.get("/getAllBrandByCategory/:pc", productController.getAllBrandByCategory);

router.get("/getProductInforID/:id", productController.getProductInforID);

router.get('/getProductInfoByID/:product_id', productController.getProductInfoByID);

router.get('/getTop6MilksForPregnantMother', productController.getTop6MilksForPregnantMother);

router.get('/getTop6MilkForBaby', productController.getTop6MilkForBaby);

router.get('/getTop6ProductByBrand/:id', productController.getTop6ProductByBrand);

router.get('/countProduct', productController.countProduct);

router.get('/countBrand', productController.countBrand);

router.post('/getTop5ProductBestSeller', productController.getTop5ProductBestSeller);

router.get('/getTop5ProductBestSellerForUser', productController.getTop5ProductBestSellerForUser);

module.exports = router;
