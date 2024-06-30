const router = require('express').Router();

const shippingAddressController = require("../controller/shippingAddressController");
     
router.get('/getInfoShippingByUserID/:ID', shippingAddressController.getInfoShippingByUserID);

router.get('/getInfoShippingByOrderID/:orderID', shippingAddressController.getInfoShippingByOrderID);

router.get('/getShippingAddressIsDeleted', shippingAddressController.getShippingAddressIsDeleted);

router.put('/updateDeleted/:shippingAddress_id', shippingAddressController.updateDeleted);

router.get('/getInfoAddressWithOrderNearest', shippingAddressController.getInfoAddressWithOrderNearest);

module.exports = router