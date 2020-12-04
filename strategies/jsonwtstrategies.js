const JwtStrategy=require('passport-jwt').JwtStrategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const mongoose=require('mongoose');
const Person=require('../Modals/Person');
const myKey=require('../Setup/mongourl');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = myKey.secret;

module.exports=passport=>{
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        Person.findById(jwt_payload.id)
        .then(person=>{
            if(person){
                return done(null,person)
            }
            return done(null,false);
        })
            .catch()
    }))
}