const { authJwt } = require("../middleware");
const controller = require("../controller/contacts.controller");

const router = require('express').Router();


router.post(
    "/create/cbasicinfo",
    [authJwt.verifyToken],
    controller.addContactBasicInfo
);


router.put(
    "/update/cbasicinfo",
    [authJwt.verifyToken],
    controller.updateContactBasicInfo
);

router.post(
    "/create/caddress",
    [authJwt.verifyToken],
    controller.addContactAddress
);

router.put(
    "/update/caddress",
    [authJwt.verifyToken],
    controller.updateContactAddress
);

router.post(
    "/create/cid",
    [authJwt.verifyToken],
    controller.addContactIdentification
);

router.put(
    "/update/cid",
    [authJwt.verifyToken],
    controller.updateContactIdentification
);

router.delete(
    "/delete/contact",
    [authJwt.verifyToken],
    controller.contactdelete
  );


router.get(
    "/get/contactslist",
    [authJwt.verifyToken],
    controller.contactslist
  );

  router.get(
    "/get/relationwiselist",
      [authJwt.verifyToken],
    controller.contactslistbyrelation
  );


  router.get(
    "/get/contactsdata",
      [authJwt.verifyToken],
    controller.importcontacts);



router.get(
    "/get/relationshiplist",
    controller.relationshiplist
);

router.get(
    "/get/modecomm",
    controller.modecomm
);

router.get(
    "/get/country",
    controller.country
);

router.get(
    '/get/addresstypelist',
    controller.addresstypelist
)

router.post(
    '/send/refer_email',
    controller.sendReferEmail
)

module.exports = router;
