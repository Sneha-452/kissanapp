const express = require('express') ; 
const cors = require('cors');
const app = express() ; 
const bodyParser = require('body-parser') ;
const AuthRouter = require('./Router/AuthRouter');
const landRouter = require("./Router/LandRouter");
require('dotenv').config() ; 
const NewsRouter = require('./Router/NewsRouter');
const warehouseRoutes = require("./Router/warehouseRoutes");
const path = require("path");
const cropRoutes = require("./Router/cropRoutes");
const machineryRoutes = require("./Router/machineryRoutes");
const seedRoutes = require("./Router/seedRoutes");
const transportRoutes = require("./Router/transportRoutes");
const soilTestRoutes = require("./Router/soilTestRoutes");
 require('./Router/AuthRouter');
 
 require('./Models/db') ;


  const PORT = process.env.PORT || 8080;
 
  app.use(bodyParser.json()) ; 
  app.use(cors());
  app.use('/auth' , AuthRouter ); 
  app.use('/news', NewsRouter);
  app.use("/api/crops", cropRoutes);
  app.use('/products' , AuthRouter ); 
  app.use("/api/lands", landRouter);
  app.use("/api/warehouses", warehouseRoutes);
  app.use("/api/machinery", machineryRoutes);
  app.use("/api/seeds", seedRoutes);
  app.use("/api/transportation" , transportRoutes);
  app.use("/api/soil-test", soilTestRoutes);
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  app.listen(PORT , () =>{
    console.log(`server is running on ${PORT}`)
  })