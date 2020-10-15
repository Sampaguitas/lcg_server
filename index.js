const express = require('express');
const mongoose = require('mongoose');
const glob = require('glob');
const _ = require('lodash');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const fs = require('fs');

app
.use(cors())
.use(bodyParser.urlencoded({extended:false}))
.use(bodyParser.json());

mongoose
.set('useFindAndModify', false)
.connect(require('./config/keys').mongoURI,{useNewUrlParser:true, useUnifiedTopology: true})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(process.env.PORT || 5000, () => console.log(`Server running on ${process.env.PORT || 5000}`));
 
var routeFolders = [],     
routePaths = "./routes"   
glob.sync('**/*', { cwd: routePaths }).forEach(route => {     
    var _isFolder = !_.endsWith(route, '.js')     
    route = '/' + route.replace(/\.[^/.]+$/, '')     
    if (!_.endsWith(route, 'index')) {       
        var _router = require(routePaths + route)       
        app.use(route, _router)       
        if (_isFolder) routeFolders.push(route)     
    }
})   
routeFolders.forEach(route => {
    var _pathDeindex = routePaths + route + '/deindex.js'     
    if (fs.existsSync(_pathDeindex))       
    app.use(route, require(_pathDeindex))   
})