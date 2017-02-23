console.log( 'This has been browserified' );
module.exports = {
   width: 200,
  height: 200,
  sWidth: 16,
 sHeight: 16,
      da: 1.0,
      db: 0.5,
       f: 0.055,
       k: 0.062,
       t: 1.0,
     ldr: 0.05,
     lar: 0.2,
     lcr: -1,
    grid: [],
    next: [],
  init: function(){
    for( let y = 0; y < this.height; y++ ){
      this.grid[ y ] = [];
      this.next[ y ] = [];
      for( let x = 0; x < this.width; x++ ){
        this.grid[ y ][ x ] = { a: 1, b: 0 };
        this.next[ y ][ x ] = { a: 0, b: 0 };
      };
    };

    for( let ty = Math.floor( this.height / 2 - this.sHeight / 2 ); ty < Math.ceil( this.height / 2 + this.sHeight / 2 ); ty++ ){
      for( let tx = Math.floor( this.width / 2 - this.sWidth / 2 ); tx < Math.ceil( this.width / 2 + this.sWidth / 2 ); tx++ ){
        this.grid[ ty ][ tx ].b = 1;
      }
    }
  },
  laplaceA: function( y, x ){
    let sum = 0;

    sum += this.grid[ y - 1 ][ x - 1 ].a * this.ldr;
    sum += this.grid[ y - 1 ][ x ].a * this.lar;
    sum += this.grid[ y - 1 ][ x + 1 ].a * this.ldr;

    sum += this.grid[ y ][ x - 1 ].a * this.lar;
    sum += this.grid[ y ][ x ].a * this.lcr;
    sum += this.grid[ y ][ x + 1 ].a * this.lar;

    sum += this.grid[ y + 1 ][ x - 1 ].a * this.ldr;
    sum += this.grid[ y + 1 ][ x ].a * this.lar;
    sum += this.grid[ y + 1 ][ x + 1 ].a * this.ldr;

    /*
    for( let n = 0; n < 9; n++ ){
      switch( n ){
        case 0:
          if( y === 0 || x === 0 ){
            continue;
          }
          sum += this.grid[ y - 1 ][ x - 1 ].a * this.ldr;
          break;

        case 1:
          if( y === 0 ){
            continue;
          }
          sum += this.grid[ y - 1 ][ x ].a * this.lar;
          break;

        case 2:
          if( y === 0 || x + 1 === this.width ){
            continue;
          }
          sum += this.grid[ y - 1 ][ x + 1 ].a * this.ldr;
          break;

        case 3:
          if( x === 0 ){
            continue;
          }
          sum += this.grid[ y ][ x - 1 ].a * this.lar;
          break;

        case 4:
          sum += this.grid[ y ][ x ].a * this.lcr;
          break;

        case 5:
          if( x + 1 === this.width ){
            continue;
          }
          sum += this.grid[ y ][ x + 1 ].a * this.lar;
          break;

        case 6:
          if( y + 1 === this.height || x === 0 ){
            continue;
          }
          sum += this.grid[ y + 1 ][ x - 1 ].a * this.ldr;
          break;

        case 7:
          if( y + 1 === this.height ){
            continue;
          }
          sum += this.grid[ y + 1 ][ x ].a * this.lar;
          break;

        case 8:
          if( y + 1 === this.height || x + 1 === this.width ){
            continue;
          }
          sum += this.grid[ y + 1 ][ x + 1 ].a * this.ldr;
          break;
      }
    }
    */
    return sum;
  },
  laplaceB: function( y, x ){
    let sum = 0;

    sum += this.grid[ y - 1 ][ x - 1 ].b * this.ldr;
    sum += this.grid[ y - 1 ][ x ].b * this.lar;
    sum += this.grid[ y - 1 ][ x + 1 ].b * this.ldr;

    sum += this.grid[ y ][ x - 1 ].b * this.lar;
    sum += this.grid[ y ][ x ].b * this.lcr;
    sum += this.grid[ y ][ x + 1 ].b * this.lar;

    sum += this.grid[ y + 1 ][ x - 1 ].b * this.ldr;
    sum += this.grid[ y + 1 ][ x ].b * this.lar;
    sum += this.grid[ y + 1 ][ x + 1 ].b * this.ldr;

    /*
    for( let n = 0; n < 9; n++ ){
      switch( n ){
        case 0:
          if( y === 0 || x === 0 ){
            continue;
          }
          sum += this.grid[ y - 1 ][ x - 1 ].b * this.ldr;
          break;

        case 1:
          if( y === 0 ){
            continue;
          }
          sum += this.grid[ y - 1 ][ x ].b * this.lar;
          break;

        case 2:
          if( y === 0 || x + 1 === this.width ){
            continue;
          }
          sum += this.grid[ y - 1 ][ x + 1 ].b * this.ldr;
          break;

        case 3:
          if( x === 0 ){
            continue;
          }
          sum += this.grid[ y ][ x - 1 ].b * this.lar;
          break;

        case 4:
          sum += this.grid[ y ][ x ].b * this.lcr;
          break;

        case 5:
          if( x + 1 === this.width ){
            continue;
          }
          sum += this.grid[ y ][ x + 1 ].b * this.lar;
          break;

        case 6:
          if( y + 1 === this.height || x === 0 ){
            continue;
          }
          sum += this.grid[ y + 1 ][ x - 1 ].b * this.ldr;
          break;

        case 7:
          if( y + 1 === this.height ){
            continue;
          }
          sum += this.grid[ y + 1 ][ x ].b * this.lar;
          break;

        case 8:
          if( y + 1 === this.height || x + 1 === this.width ){
            continue;
          }
          sum += this.grid[ y + 1 ][ x + 1 ].b * this.ldr;
          break;
      }
    }
    */

    return sum;
  },
  calculate: function( callback ){
    for( let cy = 1; cy < this.height - 1; cy++ ){
      for( let cx = 1; cx < this.width - 1; cx++ ){
        const a = this.grid[ cy ][ cx ].a;
        const b = this.grid[ cy ][ cx ].b;
        this.next[ cy ][ cx ].a = a + ( this.da * this.laplaceA( cy, cx ) * a - a * b * b + this.f * ( 1 - a )) * this.t;
        this.next[ cy ][ cx ].b = b + ( this.db * this.laplaceB( cy, cx ) * b + a * b * b - ( this.k + this.f ) * b ) * this.t;
      }
    }

    let temp = this.grid;
    this.grid = this.next;
    this.next = temp;
    callback();
  }
};
