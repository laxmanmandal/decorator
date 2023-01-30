const express =require ("express")
const morgan = require("morgan")
const createError = require("http-errors")
require("dotenv").config()
require("./helpers/init_mongoDb")
const cors =require('cors');
const path = require('path');
const http = require('http');

const app = express()
app.use(cors({origin: '*'}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname + '/decorator-ui'));
app.use(express.static(__dirname + '/admin'));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname )));
const messageRoute =require("./routes/contact.route");
const inquiryRoute = require ('./routes/inquiry.routes')
const serviceRoute =require("./routes/services.route")
const galleryRoute =require("./routes/gallary.route")
const galleryCategoryRoute =require("./routes/galleryCategory")

const categoryServicesRoute =require("./routes/service.category")
const contactRoute =require("./routes/contact.route")
const newsRoute =require("./routes/news.routes")



app.use('/images',  express.static('uploads/images/'));

// app.use('/images',  express.static( path.join('uploads/images/','public')));
app.use("/message", messageRoute );
app.use("/news", newsRoute );

app.use('/gallery',galleryRoute);
app.use('/inquiry',inquiryRoute);
app.use("/services",serviceRoute)
app.use("/gallery-category",galleryCategoryRoute)
app.use("/services-category",categoryServicesRoute)
app.use("/contacts",contactRoute)


app.use(async (req,res,next) =>{
    next(createError.NotFound())
})

app.use( (err,req,res,next) =>{
    res.status(err.status || 500)
    res.send({
        error:{
            status:err.status || 500,
            message:err.message
        }
    })
})

const PORT = process.env.PORT
const server = http.createServer(app);



server.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`);
})