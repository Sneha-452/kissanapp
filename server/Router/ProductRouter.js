const router =  require('express').Router() ; 
router.get('/' , (req , res) => {
    console.log('----logged in user detail--' , req.user);
    res.status(200).json([
        {
            name: "mobile",
            price: 100000
        },
        {
            name: "tv" , 
             price: 200000
        }
    ])
})