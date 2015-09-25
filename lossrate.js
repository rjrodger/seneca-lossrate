/* Copyright (c) 2015 Richard Rodger, MIT License */
"use strict";


module.exports = function lossrate( options ) {
  var seneca = this

  options = seneca.util.deepextend({
    rate:      0.0,
    pin:       null,
    immediate: false
  }, options)


  this.add('init:lossrate', function( msg, respond ){
    if( null != options.pin ) {
      this.wrap(options.pin,function( msg, respond ){
        if( 0 == options.rate || options.rate <= Math.random() ) {
          this.prior( msg, respond )
        }
        else if( options.immediate ) {
          respond( new Error( msg.meta$.pattern+' forced fail') )
        }
      })
    }
    respond()
  })

}
