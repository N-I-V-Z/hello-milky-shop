const router = require('express').Router();

const voucherController = require("../controller/voucherController");

router.get('/getAllVouchers', voucherController.getAllVouchers);

router.post('/addVoucher', voucherController.addVoucher);

router.put('/updateVoucher/:id', voucherController.updateVoucher);

router.post('/saveVoucherForUser', voucherController.saveVoucherForUser);

router.post('/removeVoucherFromUser', voucherController.removeVoucherFromUser);

router.get('/getVouchersByUserID/:userID', voucherController.getVouchersByUserID);

router.post('/getVouchersforUser', voucherController.getVouchersforUser);

router.put('/deleteVoucher/:voucherID', voucherController.deleteVoucher);

router.put('/openVoucher/:voucherID', voucherController.openVoucher);

module.exports = router



