const express=require('express');
const router=express.Router();
var bodyparser=require('body-parser')
const keySecret=require('../Setup/mongourl').secret;
const passport=require('passport');
var nodemailer=require('nodemailer');

var transporter1 = nodemailer.createTransport({
    service: 'gmail',
    secure:'true',
    port: 587,
ignoreTLS: false,
    auth: {
      user: 'evotingcrypto@gmail.com',
      pass: 'tsbdosttgjpzlopo'
      
    }
  });

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

router.get('/fetch_elections',(req,res)=>{
    Election.find({}).then(function(users){
        res.json(users);
    }).catch(err=>res.json(err));
});

router.post('/election_result', (req,res)=>{
    var winner=req.body.winner;
    var losers=req.body.losers;
    var winnervotes=req.body.votes;

    var mailOptionswinner = {
        from: `EvotingCrypto`,
        to: `${winner}`,
        subject: 'Election Results',
        text: `Congratulations!!! You have won the Elections by ${winnervotes}`
      };

      transporter1.sendMail(mailOptionswinner, function(error, info){
        if(error){
          console.log(error);
          res.status(500).json({error : error})
        }else{
          console.log(info);
          res.status(200).json({success: `Mail sent to ${winner}`});
        }
      });


      for(let i=0; i< losers.length; i++){
        var mailoptionsLoser={
            from: `EvotingCrypto`,
            to: `${losers[i]}`,
            subject: 'Election Results',
            text: `Sorry! You have lost the elections!`
          }
    
    
          transporter1.sendMail(mailoptionsLoser, function(error, info){
            if(error){
              console.log(error);
              res.status(500).json({error : error})
            }else{
              console.log(info);
              res.status(200).json({success: `Mail sent to ${losers[i]}`});
            }
          });
      }

      

      

})



module.exports=router;