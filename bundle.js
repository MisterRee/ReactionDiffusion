(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
console.log( 'This has been browserified' );
module.exports = {
   width: 200,
  height: 200,
      da: 1,
      db: 0.5,
       f: 0.055,
       k: 0.062,
       t: 1,
    grid: [],
    next: [],
  init: function(){
    for( let y = 0; y < this.height; y++ ){
      this.grid[ y ] = [];
      for( let x = 0; x < this.width; x++ ){
        this.grid[ y ][ x ] = { a: 1, b: 0 };
      };
    };
    this.grid[100][100] = { a: 0, b: 1 };
    this.next = this.grid;
  },
  laplaceA: function( y, x ){
    let sum = 0;

    for( let n = 0; n < 9; n++ ){
      switch( n ){
        case 0:
          if( y < 0 || x < 0 ){
            continue;
          }
          sum += this.grid[ y - 1 ][ x - 1 ].a * 0.05;
          break;
        case 1:
          if( y < 0 ){
            continue;
          }
          sum += this.grid[ y - 1 ][ x ].a * 0.2;
          break;
        case 2:
          if( yIndex < 0 || xIndex >= this.width ){
            continue;
          }
          sum += this.grid[ y - 1 ][ x + 1 ].a * 0.05;
          break;
        case 3:
          if( xIndex < 0 ){
            continue;
          }
          sum += this.grid[ y ][ x - 1 ].a * 0.2;
          break;
        case 4:
          sum += this.grid[ y ][ x ].a * -1;
          break;
        case 5:
          if( xIndex >= this.width ){
            continue;
          }
          sum += this.grid[ y ][ x + 1 ].a * 0.2;
          break;
        case 6:
          if( yIndex >= this.height || xIndex < 0 ){
            continue;
          }
          sum += this.grid[ y + 1 ][ x - 1 ].a * 0.05;
          break;
        case 7:
          if( yIndex >= this.height ){
            continue;
          }
          sum += this.grid[ y + 1 ][ x ].a * 0.2;
          break;
        case 8:
          if( yIndex >= this.height || xIndex >= this.width ){
            continue;
          }
          sum += this.grid[ y + 1 ][ x + 1 ].a * 0.05;
          break;
      }
    }

    return sum;
  },
  laplaceB: function( y, x ){
    let sum = 0;

    for( let n = 0; n < 9; n++ ){
      switch( n ){
        case 0:
          if( y < 0 || x < 0 ){
            continue;
          }
          sum += this.grid[ y - 1 ][ x - 1 ].b * 0.05;
          break;
        case 1:
          if( y < 0 ){
            continue;
          }
          sum += this.grid[ y - 1 ][ x ].b * 0.2;
          break;
        case 2:
          if( yIndex < 0 || xIndex >= this.width ){
            continue;
          }
          sum += this.grid[ y - 1 ][ x + 1 ].b * 0.05;
          break;
        case 3:
          if( xIndex < 0 ){
            continue;
          }
          sum += this.grid[ y ][ x - 1 ].b * 0.2;
          break;
        case 4:
          sum += this.grid[ y ][ x ].b * -1;
          break;
        case 5:
          if( xIndex >= this.width ){
            continue;
          }
          sum += this.grid[ y ][ x + 1 ].b * 0.2;
          break;
        case 6:
          if( yIndex >= this.height || xIndex < 0 ){
            continue;
          }
          sum += this.grid[ y + 1 ][ x - 1 ].b * 0.05;
          break;
        case 7:
          if( yIndex >= this.height ){
            continue;
          }
          sum += this.grid[ y + 1 ][ x ].b * 0.2;
          break;
        case 8:
          if( yIndex >= this.height || xIndex >= this.width ){
            continue;
          }
          sum += this.grid[ y + 1 ][ x + 1 ].b * 0.05;
          break;
      }
    }

    return sum;
  },
  calculate: function( callback ){
    for( let cy = 0; cy < this.height; cy++ ){
      console.log( cy );
      for( let cx = 0; cx < this.width; cx++ ){
        console.log( cx );
        const a = this.grid[ cy ][ cx ].a;
        const b = this.grid[ cy ][ cx ].b;
        const nexta = a + (this.da * this.laplaceA( y, x ) * a - a * b * b  + this.f * ( 1 - a )) * this.t;
        const nextb = b + (this.db * this.laplaceB( y, x ) * b - a * b * b - ( this.k + this.f ) * b ) * this.t;
        this.next[ cy ][ cx ].a = nexta;
        this.next[ cy ][ cx ].b = nextb;
      }
    }

    this.grid = this.next;
    callback();
  }
};

},{}],2:[function(require,module,exports){
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
  ctx.fillStyle =  "rgb( 255 )";
  ctx.fillRect(0, 0, canvas.width, canvas.height );

  for( let y = 0; y < diffusion.height; y++ ){
    for( let x = 0; x < diffusion.width; x++ ){
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
  setInterval( diffusion.calculate.bind( null, draw ), 125 );

  document.body.onkeyup = function(e){
      if(e.keyCode == 32){
        console.log(diffusion.grid);
      }
  }
});

},{"./diffusion.js":1}]},{},[2]);
