var sc = require('seneca')({timeout:111,log:'silent'})
      .add('a:1',function(m){this.good({x:m.x+1})})
      .listen()
      .ready( function() {

        var ss = require('seneca')({timeout:111,log:'silent'})
              .client({pin:'a:1'})
              .use('..',{rate:0.5,pin:'a:1',immediate:true})
              .ready(function(){
                var c = {s:0,f:0}

                var n = 3000, i = 0

                function call() {
                  ss.act('a:1,x:1',function(e,o){
                    if(e) { 
                      c.f++
                      //console.log(e) 
                    }
                    else if(2==o.x) { c.s++ }

                    //console.log(i)
                    i++
                    if( i >= n ) { 
                      console.log(c)
                    }
                    else call()
                  })
                }

                call()
              })

      })





