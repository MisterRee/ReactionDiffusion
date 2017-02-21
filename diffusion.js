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
      this.next[ y ] = [];
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
    for( let y = 0; y < this.height; y++ ){
      for( let x = 0; x < this.width; x++ ){
        const a = cell.a;
        const b = cell.b;
        const nexta = a + (this.da * laplaceA( y, x ) * a - a * b * b  + this.f * ( 1 - a )) * this.t;
        const nextb = b + (this.db * laplaceB( y, x ) * b - a * b * b - ( this.k + this.f ) * b ) * this.t;
        this.next[ y ][ j ].a = nexta;
        this.next[ y ][ j ].b = nextb;
      };
    };

    this.grid = this.next;
    callback();
  }
};
