const diffusion = require( './diffusion.js' );
let canvas;
let ctx;
let grid_width = 0;
let grid_height = 0;

let fit = function(){
  grid_width = canvas.clientWidth / diffusion.width;
  grid_height = canvas.clientHeight /diffusion.height;
  canvas.width = diffusion.width * grid_width;
  canvas.height = diffusion.height * grid_height;
}

let draw = function( obj ){

  for( let y = 0; y < diffusion.height; y++ ){
    for( let x = 0; x < diffusion.width; x++ ){
      let value = Math.floor( diffusion.grid[ y ][ x ].b * 255 );
      ctx.fillStyle = "rgb(" + Math.floor( diffusion.grid[ y ][ x ].a * 255 ) + "," + Math.floor( diffusion.grid[ y ][ x ].b * 255 ) + ",0)";
      ctx.fillRect( x * grid_width, y * grid_height, grid_width, grid_height );
    }
  }
}

window.addEventListener( 'load', function(){
  canvas = document.querySelector( 'canvas' );
  ctx = canvas.getContext( '2d' );

  console.log( 'onload via watchify', diffusion );
  diffusion.init();
  fit();
  window.onresize = fit();
  setInterval( () => diffusion.calculate( draw ), 125 );
});
