const express =require('express');
const morgan = require('morgan');
const app=express();

//register view engine
app.set('view engine','ejs');

app.listen(3000,'localhost', ()=>{
    console.log('listening');
});

app.use(morgan('dev'));

// app.use((req,res,next)=>{
//     console.log('new Request Made');
//     console.log('host : ',req.hostname);
//     console.log('Path : ',req.path);
//     console.log('Method : ',req.method);
//     console.log('IP : ',req.ip);
//     next();
// });

app.get('/',(req,res) =>{
    const meds=[
        {title : 'first' ,snippet : 'here to help'},
        {title : 'Second' ,snippet : 'here to help again'}
    ];
    res.render('index',{title : 'Home',meds});
});

app.get('/about',(req,res) =>{
    res.render('about',{title : 'about'});
})


app.get('/med/insert',(req,res) =>{
    res.render('create',{title : 'Contribute'});
})


app.use((req,res)=>{
    res.status(404).render('404',{title : '404'});
})