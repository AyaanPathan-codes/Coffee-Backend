import dotenv from 'dotenv'
dotenv.config({
    path:'./env'
})
import connectDB from "./db/index.js";

console.log(process.env.MONGODB_URI);

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log(`MongoDB connection Failed `,err);
    
})


// ;( async ()=>{
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     }
//     catch(error){
//         console.error(error);

//     }
// })()