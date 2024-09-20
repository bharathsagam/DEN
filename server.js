const express=require('express');
const mongoose=require('mongoose');
const devuser=require('./devusermodel');
const jwt=require('jsonwebtoken');
const middleware=require('./middleware')
const reviewmodel=require('./reviewmodel')
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors({origin:'*'}));
mongoose.connect('mongodb+srv://bharath:ZsrB1ybIuCON2y1l@cluster0.plhjgkj.mongodb.net/developerhub',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('db is connected')
})
app.get('/',(req,res)=>{
    return res.send('hello world');
});
app.post('/register',async(req,res)=>{
    try {
        const {fullname,email,mobile,skill,password,confirmpassword}=req.body;
        const exist=await devuser.findOne({email});
        if(exist){
            return res.status(400).send('user already registered');
        }
        if(password!=confirmpassword){
            return res.status(403).send('incorrect password');
        }
        let newUser=new devuser({
            fullname,email,mobile,skill,password,confirmpassword
        })
        newUser.save();
        return res.status(200).send('user registered')

    } catch (error) {
        console.log(error);
        return res.status(500).send('server error')
    }
})

app.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body;
        const exist=await devuser.findOne({email});
        if(!exist){
            return res.status(400).send('user not found');
        }
        if(exist.password !=password){
            return res.status(400).send('password incorrect');
        }
       let payload={
        user:{
            id:exist.id
        }
       }

       jwt.sign(payload,'jwtPassword',{expiresIn:360000000},(err,token)=>{
        if(err) return err

        return res.json({token})
       })

    } catch (error) {
        console.log(error);
        return res.status(500).send('server error')
    }
})


app.get('/allprofiles',middleware,async(req,res)=>{
    try {
        let allprofiles=await devuser.find();
        return res.json(allprofiles);
 } catch (error) {
        console.log(error);
        return res.status(500).send('server error')
    }
})

app.get('/myprofile',middleware,async(req,res)=>{
   try {
    let user=await devuser.findById(req.user.id)
    return res.json(user);
   } catch (error) {
    console.log(error);
    return res.status(500).send('server error')
   }
})


app.post('/addreview',middleware,async(req,res)=>{
    try {
        const {taskworker,rating}=req.body;
        const exist=await devuser.findById(req.user.id);
        const newReview=new reviewmodel({
            taskprovider:exist.fullname,
            taskworker,
            rating
        })
        newReview.save();
        return res.status(200).send('review added succesfully');

    } catch (error) {
    console.log(error);
    return res.status(500).send('server error')
    }
})

app.get('/myreview',middleware,async(req,res)=>{
    try {
        let allreviews=await reviewmodel.find();
        let myreview=allreviews.filter(review=>review.taskworker.toString()===req.user.id.toString())
        return res.status(200).send('my reviews')
    } catch (error) {
        console.log(error);
        return res.status(500).send('server error')
    }
})
app.listen(5001,()=>{
    console.log('server is running....');
});