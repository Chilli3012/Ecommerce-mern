const app=require("./app");

// const dotenv=require("dotenv");
const connectDatabase=require("./config/database");
const cloudinary =require("cloudinary")

// handling uncaught exception 
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
})

// config 
if(process.env.NODE_ENV!=="PRODUCTION")
{ 
    require("dotenv").config({path:"backend/config/config.env"});
}


// connecting to databse 
connectDatabase();  

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});
// making the server on the given port 

const server=app.listen(process.env.PORT,()=>{
    console.log(`serer is working on http://localhost:${process.env.PORT}`);
})





// unhandled promise rejection 
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);


    server.close(()=>{
        process.exit(1);
    });

})


