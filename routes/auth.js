const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jsonwt=require('jsonwebtoken');
const passport=require('passport');
const key=require('../Setup/mongourl').secret


router.get('/',(req,res)=>res.json({test: 'auth is working'}))

//import Schema person

const Person=require('../Modals/Person');

//@type post
//@route /routes/register
//@desc for registering
//access public

router.post('/register',(req,res)=>{
    Person.findOne({email:req.body.email})
    .then(person=>{
        if(person){
            return res.status(400).json({emailerror: 'Email already registered'});
        }else{
            const newPerson=new Person({
                name:req.body.name,
                age:req.body.age,
                email:req.body.email,
                address:req.body.address,
                city:req.body.city,
                country:req.body.country,
                phone:req.body.phone,
                password: req.body.password
            })
            //encrypting the password
            bcrypt.genSalt(10, (err, salt)=> {
                bcrypt.hash(newPerson.password, salt, (err, hash)=> {
                    if(err) throw err;
                    newPerson.password=hash;
                    newPerson.save()
                    .then(person=>res.json(person))
                        .catch(err=>console.log(err))
                });
            });

        }
    })
        .catch(err=>console.log(err))
})


//@type post
//@route /routes/login
//@desc for login 
//access public

router.post('/login',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    Person.findOne({email})
        .then(person=>{
            if(!person){
                return res.status(404).json({emailerror:'User doesnt exists'})
            }else{
                bcrypt.compare(password,person.password)
                .then(isCorrect=>{
                    if(isCorrect){

                   //return res.json({success: 'Login successfully'})
                   const payload={
                       id: person.id,
                       name:person.name,
                       email:person.email
                   }

                   jsonwt.sign(
                       payload,
                       key,
                       {expiresIn:3600},
                       (err,token)=>{
                           res.json({
                               success: true,
                               token: 'bearer '+ token,
                               data: payload
                           })
                       }
                   )
                    }else{
                        return res.status(404).json({passworderror:'Incorrect password'})
                    }
                })
                    .catch(err=>console.log(err))
            }
        })
            .catch(err=>console.log(err))
})



module.exports=router