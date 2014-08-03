angular.module('battleship')

.directive('explosion', function(){
  
  function link(scope, element, attrs) {

    var canvas = element[0],
      ctx = canvas.getContext("2d"),
      W = window.innerWidth,
      H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;
    var particles = [];

    //Lets create some particles now
    var particleCount = 20;
    for(var i = 0; i < particleCount; i++) {
      particles.push(new particle());
    }

    function particle() {
      //lets change the Y speed to make it look like a flame

      var randNum = Math.round(Math.random()*3);
      if(randNum === 3) this.speed = {x: -Math.random()*5, y: -Math.random()*5};
      if(randNum === 2) this.speed = {x: Math.random()*5, y: Math.random()*5};
      if(randNum === 1) this.speed = {x: -Math.random()*5, y: Math.random()*5};
      if(randNum === 0) this.speed = {x: Math.random()*5, y: -Math.random()*5};

      this.location_ = {x: W/2, y: H/2};

      //radius range = 10-30
      this.radius = 10+Math.random()*180;
    }

    function draw() {
      //reset bg over each iteration
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      
      for(var i = 0; i < particles.length; i++) {
        var p = particles[i];
        ctx.beginPath();

        ctx.fillStyle = "#FF4500";
        ctx.arc(p.location_.x, p.location_.y, p.radius, Math.PI*2, false);
        ctx.fill();

        //decrement size
        p.radius--;
        p.location_.x += p.speed.x;
        p.location_.y += p.speed.y;
        
        //regenerate particles
        if(p.radius < 0)
        {
          //a brand new particle replacing the dead one
          particles[i] = new particle();
        }
      }
    }

    var w = setInterval(draw, 3);
    setTimeout(function( ) { 
      clearInterval( w );  
      clearExplosion();
    }, 1);

  };

  function clearExplosion() {
    
  }

  return{
    restrict: 'A',
    link: link,
    scope: {
      isActive: '='
    },
  
  };

})