const { static } = require('express');
const express =require('express');
const morgan = require('morgan');
const mongoose= require('mongoose');
const Med=require('./models/Med');
const { render } = require('ejs');
const app=express();


//database connection
const dburl = 'mongodb+srv://Anand:Anand@123@cluster0.opy4w.mongodb.net/meds-info?retryWrites=true&w=majority'
mongoose.connect(dburl ,{useNewUrlParser : true ,useUnifiedTopology :true})
    .then((res)=>{
        console.log("connected to DB");
        //Listening to request after connection complete
        app.listen(3000,'localhost', ()=>{
            console.log('listening');
        });
    })
    .catch((err)=>{
        console.log(err);
    })
//register view engine
app.set('view engine','ejs');



app.use(morgan('dev'));
app.use(express.static('public'));

//middleware to encoded form data
app.use(express.urlencoded({extended : true}));

// app.use((req,res,next)=>{
//     console.log('new Request Made');
//     console.log('host : ',req.hostname);
//     console.log('Path : ',req.path);
//     console.log('Method : ',req.method);
//     console.log('IP : ',req.ip);
//     next();
// });

app.get('/',(req,res) =>{
    res.redirect('/meds');
});

app.get('/meds',(req,res) =>{
    Med.find().sort({createdAt : -1})
        .then((result)=>{
            res.render('index',{title : 'All Med ', meds : result})
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.get('/about',(req,res) =>{
    res.render('about',{title : 'about'});
})


app.get('/med/insert',(req,res) =>{
    res.render('create',{title : 'Contribute'});
})

app.get('/med/:id',(req,res)=>{
    const id=req.params.id;
    Med.findById(id)
        .then((result)=>{
            res.render('details',{med : result ,title : 'Med details'});
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.delete('/med/:id',(req,res)=>{
    const id=req.params.id;

    Med.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect : '/meds'})
    })
    .catch((err)=>{
        console.log(err);
    })

})

app.post('/meds',(req,res)=>{
    const med=new Med(req.body);
    med.save()
        .then((result)=>{
            res.redirect('/meds');
        })
        .catch((err)=>{
            console.log(err);
        })
})


app.use((req,res)=>{
    res.status(404).render('404',{title : '404'});
})