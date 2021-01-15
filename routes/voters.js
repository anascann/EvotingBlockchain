const express=require('express');
const router=express.Router();
var bodyparser=require('body-parser')
const keySecret=require('../Setup/mongourl').secret;
const passport=require('passport');
var nodemailer=require('nodemailer');

const Voters=require('../Modals/Voters');
const { route } = require('./election');

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

router.post('/add_voters', (req,res)=>{
Voters.findOne({electionId: req.body.electionId})
    .then(key=>{
        var votersAdded=[];
        var temp=req.body.voters_new;
        for(let i=0; i<temp.length; i++){
            let obj={"email": temp[i], "password": Math.floor(Math.random() * 90000) + 10000 };
            votersAdded.push(obj);
        }
       const newVoters=new Voters({
          electionId: req.body.electionId,
          ElectionName: req.body.ElectionName,
           voters:   votersAdded 
    })

       newVoters.save()
        .then(function(response){
            res.json(response);
            }).catch(err=>res.json(err));

        })
            .catch(err=>res.json(err))
    })

//router.get('/send_mail', (req,res)=>res.json({success:'get is working'}))
router.post('/send_mail',(req,res)=>{
    Voters.findOne({ electionId: req.body.electionId}).then(function(users){
      //res.json(users);
      let array=users.voters;
      
      // array.map(key=>{
      //   console.log(array[key].email);
      // })
      var ename=users.ElectionName;
      array.forEach(element => {
        let email=element.email;
        let pass=element.password;
        
        let Eid=req.body.electionId;

        var mailOptions = {
          from: `EvotingCrypto`,
          to: `${email}`,
          subject: 'Credentials for login',
          text: `Hello User! Your credentials for the  election ${ename} and EMAIL: ${email} and Password: ${pass}
          ! Kindly don't share your password with someone else. a Link will be shared to you shortly. Please use that Link and Eid,Email & pass to login.`
        };
      
        
        

          
          //  transporter1.sendMail(mailOptions,(info,error))

            
           transporter1.sendMail(mailOptions, function(error, info){
              if(error){
                console.log(error);
                res.status(500).json({error : error})
              }else{
                console.log(info);
                res.status(200).json({success: `Mail sent to ${email}`});
              }
            })  
          

      });
    //  users.voters.map(key=>{
    //     let email=voters[key].email;
    //      let pass=voters[key].password;
    //      console.log(email);
    //      console.log(pass)
      
        
          
        // })
  
          
       
     //})  

    

      }).catch(function(response){
        res.json(response);
      })
    })
    





module.exports=router;