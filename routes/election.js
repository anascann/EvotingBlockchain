const express=require('express');
const router=express.Router();
var bodyparser=require('body-parser')
const keySecret=require('../Setup/mongourl').secret;
const passport=require('passport');


router.get('/testelection',(req,res)=>res.json({test: 'election api working fine'}));

const Election=require('../Modals/Election');

router.post('/create_election',(req,res)=>{
    Election.findOne({name: req.body.name})
    .then(key=>{
        if(key){
            return res.status(400).json({name_error: 'Election name Already exists'})
        }else{
            const newElection=new Election({
                name: req.body.name,
                totalvoters: req.body.totalvoters,
                hostedby: req.body.hostedby
            })

            newElection.save()
            .then(key=>res.json(key))
                .catch(err=>res.json({err: 'unknown error caught'}))
        }
    })
        .catch(err=>res.json(err))
})

router.post('/get_election_data',(req,res)=>{
    Election.find ({hostedby : req.body.hostedby})
    .then(function(users){
        res.json(users);
    })
        .catch(err=>res.json(err));
        
            
})

module.exports=router;