// const express = require('express') ; 
// const cors = require('cors');
// const app = express() ; 
// const bodyParser = require('body-parser') ;
// const AuthRouter = require('./Router/AuthRouter');
// const landRouter = require("./Router/LandRouter");
// require('dotenv').config() ; 
// const NewsRouter = require('./Router/NewsRouter');
// const warehouseRoutes = require("./Router/warehouseRoutes");
// const path = require("path");
// const cropRoutes = require("./Router/cropRoutes");
// const machineryRoutes = require("./Router/machineryRoutes");
// const seedRoutes = require("./Router/seedRoutes");
// const transportRoutes = require("./Router/transportRoutes");
// const soilTestRoutes = require("./Router/soilTestRoutes");

//  require('./Router/AuthRouter');
 
//  require('./Models/db') ;
//  const advisoryRouter = require("./Router/advisoryRouter");
//    const insuranceRoutes = require("./Router/insuranceRoutes");
//   // const payAfterHarvestRoutes = require("./Router/payAfterHarvestRoutes");





//   const PORT = process.env.PORT || 5000;
 
//   app.use(bodyParser.json()) ; 
//   // app.use(cors());
  

// app.use(cors({
//   origin: "http://localhost:5173", 
//   credentials: true
// }));

//   app.use('/auth' , AuthRouter ); 
//   app.use('/news', NewsRouter);
//   app.use("/api/crops", cropRoutes);
//   app.use('/products' , AuthRouter ); 
//   app.use("/api/lands", landRouter);
//   app.use("/api/warehouses", warehouseRoutes);
//   app.use("/api/machinery", machineryRoutes);
//   app.use("/api/seeds", seedRoutes);
//   app.use("/api/transportation" , transportRoutes);
//   app.use("/api/soil-test", soilTestRoutes);

//   app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//   app.use("/api/advisory", advisoryRouter);


// app.use("/api/insurance", insuranceRoutes);
// // app.use("/api/pay-after-harvest", payAfterHarvestRoutes);


//   app.get('/', (req, res) => {
//   res.send('Kisan App API is running 🚀');
// });



//   app.listen(PORT , () =>{
//     console.log(`server is running on ${PORT}`)
//   })

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const AuthRouter = require('./Router/AuthRouter');
const landRouter = require("./Router/LandRouter");
require('dotenv').config();

const NewsRouter = require('./Router/NewsRouter');
const warehouseRoutes = require("./Router/warehouseRoutes");
const path = require("path");
const cropRoutes = require("./Router/cropRoutes");
const machineryRoutes = require("./Router/machineryRoutes");
const seedRoutes = require("./Router/seedRoutes");
const transportRoutes = require("./Router/transportRoutes");
const soilTestRoutes = require("./Router/soilTestRoutes");

// Tumhare routes
const expertRoutes = require("./Router/ExpertRouter");
const waterRoutes = require("./Router/WaterRouter");

// Friend ke routes
const profileRouter = require("./Router/profileRouter");
const advisoryRouter = require("./Router/advisoryRouter");
const insuranceRoutes = require("./Router/insuranceRoutes");

// const payAfterHarvestRoutes = require("./Router/payAfterHarvestRoutes");

require('./Models/db');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use('/auth', AuthRouter);
app.use('/products', AuthRouter);
app.use('/news', NewsRouter);

app.use("/api/crops", cropRoutes);
app.use("/api/lands", landRouter);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/machinery", machineryRoutes);
app.use("/api/seeds", seedRoutes);
app.use("/api/transportation", transportRoutes);
app.use("/api/soil-test", soilTestRoutes);

// Tumhare modules
app.use("/api/experts", expertRoutes);
app.use("/api/water", waterRoutes);

// Friend ke modules
app.use("/api/profile", profileRouter);
app.use("/api/advisory", advisoryRouter);
app.use("/api/insurance", insuranceRoutes);

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use("/api/pay-after-harvest", payAfterHarvestRoutes);

app.get('/', (req, res) => {
  res.send('Kisan App API is running 🚀');
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});