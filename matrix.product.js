/*
  The multiply function (a.k.a product) receive two arrays
  that could be as the show above:

    For a row vector:
      [
        [a, b, c]
      ]
    
    For a column vector:
      [
        [x],
        [y],
        [z]
      ]

    For rectangle row vector:
      [
        [a, b, c],
        [d, e, f]
      ]

    For rectangle column vector:
      [
        [x, i],
        [y, j],
        [z, k]
      ]

  The result will be the Tensor product or a Dot product
  depending on the type of arrays passed as arguments.

  For example:

    Dot Product:
      [
        [a]
      ]

    Tensor product: 
      [
        [a, b, c],
        [d, e, f],
        [g, h, i]
      ] 
*/

module.exports = (function(){

  function getSize(m){
    return [m.length, m[0].length];
  }

  function canBeMultiply(a, b){

    return a[1] === b[0] ? true : false;
  }

  function buildProduct(rn, cn, m){

    var result = [],
        tmp,
        i, j;

    for (i = 0; i !== rn; i++){

      tmp = [];
      for (j = 0; j !== cn; j++){

        (function(i, j, m){

          tmp.push(function(a, b){

            var products = [],
                k;

            for (k = 0; k !== m; k++){
              products.push(
                a[i][k] * b[k][j]
              );
            }

            return products.reduce(function(x, y){
              return x + y;
            });
          });
        })(i, j, m);
      }

      result.push(tmp);
    }

    return result;
  }

  function multiply(a, b){

    var aSize = getSize(a),
        bSize = getSize(b),
        result = [],
        products, tmp;
    
    if (canBeMultiply(aSize, bSize)){

      products = buildProduct(aSize[0], bSize[1], aSize[1]);

      products.forEach(function(p){
      
        tmp = [];

        p.forEach(function(fn){
          tmp.push(fn(a, b));
        });

        result.push(tmp);
      });
    } else {
      throw new Error('multiply(): Cannot multiply a * b');
    }
    
    return result;
  }

  return {
    product: multiply
  };

})();