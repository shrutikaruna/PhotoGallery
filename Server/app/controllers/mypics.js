var express = require('express'),
router = express.Router(),
logger = require('../../config/logger'),

mongoose = require('mongoose'),
Mypic = mongoose.model('Mypics'),
passportService = require('../../config/passport'),
passport = require('passport');
// multer = require('multer'),
// mkdirp = require('mkdirp');
var requireAuth = passport.authenticate('jwt', { session: false });  

module.exports = function (app, config) {
     app.use('/api', router);
   
    router.get('/Mypics/user/:userId', /*requireAuth,*/ function (req, res, next){
        logger.log('Get Gallery for a user', 'verbose');

       var query = Mypic.find({UserId:req.params.mypicId})
       .sort(req.query.order)
       .exec()
       .then(result => {
        if(result && result.length) {
            res.status(200).json(result);
        } else {
            res.status(404).json({message: "No Pictures"});
        }
       })
       .catch(err => {
         return next(err);
       });
   });

   router.get('/Mypics', /*requireAuth,*/ function (req, res, next){
    logger.log('Get user', 'verbose');

    Mypic.find()
               .then(Mypic => {
                   if(Mypic){
                       res.status(200).json(Mypic);
                   } else {
                       res.status(404).json({message: "No user found"});
                   }
               })
               .catch(error => {
                   return next(error);
               });
       });

    router.get('/Mypics/:mypicId', /*requireAuth,*/ function (req, res, next){
        logger.log('Get user'+ req.params.mypicId, 'verbose');

        Mypic.findById(req.params.mypicId)
                   .then(Mypic => {
                       if(Mypic){
                           res.status(200).json(Mypic);
                       } else {
                           res.status(404).json({message: "No user found"});
                       }
                   })
                   .catch(error => {
                       return next(error);
                   });
           });   

    router.post('/Mypics', function(req, res, next){
        logger.log('Create a Gallery', 'verbose');

       var mypic = new Mypic(req.body);
       mypic.save()
       .then(result => {
           res.status(201).json(result);
       })
       .catch( err => {
          return next(err);
       });
     });
  
    router.put('/Mypics/:mypicId', /*requireAuth,*/ function (req, res, next){
        logger.log('Update Gallery with id mypicid'+ req.params.mypicId, 'verbose');

        Mypic.findOneAndUpdate({_id: req.params.mypicId},       
           req.body, {new:true, multi:false})
               .then(Mypic => {
                   res.status(200).json(Mypic);
               })
               .catch(error => {
                   return next(error);
               });
       });  

    router.delete('/Mypics/:mypicId', /*requireAuth,*/  function (req, res, next){
        logger.log('Delete pictures with id mypicid'+ req.params.mypicId, 'verbose');

        Mypic.remove({ _id: req.params.mypicId })
               .then(Mypic => {
                   res.status(200).json({msg: "Picture Deleted"});
               })
               .catch(error => {
                   return next(error);
               });
       });
 
};
