const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors')

const path = require('path');

require('dotenv').config()



const sequelize=require('./utils/database');
const userRoutes=require('./routes/user');
const User=require('./models/user');
const Message=require('./models/chatapp');






app.use(express.static('Frontend'));

app.use(cors());
app.use(bodyParser.json());


app.use('/user',userRoutes)

app.use((req, res) => {
    console.log('url', req.url);
    res.sendFile(path.join(__dirname, `Frontend/${req.url}`))
})



//relationship
User.hasMany(Message);
Message.belongsTo(User);




sequelize.sync()
.then((res)=>{
    app.listen(3000,()=>console.log('Server starts....'))
})
.catch(err=>console.log(err));
