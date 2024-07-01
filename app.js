const express=require('express');
const mongoose=require('mongoose');
const sinhvien=require('./sinhvienModel');

const app=express();
app.set('view engine','ejs');

mongoose.connect('mongodb://localhost:27017/AND103',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Da ket noi thanh cong voi MongoDB");
}).catch((err)=>{
    console.error(err);
});

app.get('/sinhvien',async (req,res)=>{
    try{
        const sinhviens=await sinhvien.find();
        res.render('students',{sinhviens: sinhviens});
        console.log(sinhviens);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'Internel Server Error'});
    }
});

const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log('server dang chay o cong 3000');
});

// http://localhost:3000/sinhvien