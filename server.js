'use strict';

const express=require('express');
const app=express();

app.use(express.static('web'));

app.get('/',(req,res) => {

});

app.listen(8000,() =>{
    console.log('Listening at 8000...');
});