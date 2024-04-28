const express = require("express");
const authRoute = require("./auth.route");
const adminAuthRoute = require("./admin/adminAuth.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/admin/auth",
    route: adminAuthRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
