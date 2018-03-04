var mongoose = require( 'mongoose' );
var Story = mongoose.model( 'Story' );

exports.index=function(req,res){
                  res.render('Module4/index',{session:req.session});
              }


exports.techStack=function(req,res){
                                res.render('Module4/techStack',{session:req.session});
  }

exports.home=function(req,res){
             Story.find({}, function(err,stories){
                  res.render('Module4/home',{stories:stories});
              });
}

exports.register=function(req,res){
  res.render('Module4/register');
                  }



exports.login=function(req,res){
                    res.render('Module4/login');
                                    }

exports.newStory=function(req,res){
          if(req.session.loggedIn !== true){
            console.log("Logged In :"+req.session.loggedIn);
            res.redirect('Module4/login');
          }else{
              res.render('Module4/new-story',{session:req.session});
          }

    }
