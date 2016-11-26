var matrixProduct = require('./matrix.product.beta.js');

function transpose(x){

  // Transpose from row to column
  /*
    [
      [1,2,3],
      [4,5,6]
    ]

    [
      [1, 4],
      [2, 5],
      [3, 6]
    ]
  */

  var t = [],
      i, j;

  for (i = 0; i !== x.length; i++){

    for (j = 0; j !== x[i].length; j++){
      
      if (!t[j]){
        t[j] = [x[i][j]];
      } else {
        t[j].push(x[i][j]);
      }
    }
  }

  return t;
  
}

function exp(x){

  var xexp = [],
      tmp;

  x.forEach(function(r){

    tmp = r.map(Math.exp);
    xexp.push(tmp);
  });

  return xexp;
}

function negate(x){

  var neg = [],
      tmp;

  x.forEach(function(r){

    tmp = r.map(function(c){
      return -c;
    });
    neg.push(tmp);
  });

  return neg;
}

function plusByValue(x, n){

  var p = [],
      tmp;

  x.forEach(function(r){

    tmp = r.map(function(c){
      return c + n;
    });

    p.push(tmp);
  });

  return p;
}

function plusByMatrix(x, y){

  var p = [],
      row, tmp,
      i, j;

  for (i = 0; i !== x.length; i++){

    row = x[i];
    tmp = [];

    for (j = 0; j !== row.length; j++){
      tmp.push(row[j] + y[i][j]);
    }

    p.push(tmp);
  }

  return p;
}

function divide(x, n){

  var div = [],
      tmp;

  x.forEach(function(r){

    tmp = r.map(function(c){
      return n / c;
    });

    div.push(tmp);
  });

  return div;
}

function substractByValue(x, n){

  var sub = [],
      tmp;

  x.forEach(function(r){

    tmp = r.map(function(c){
      return n - c;
    });

    sub.push(tmp);
  });

  return sub;
}

function substractByMatrix(x, y){

  var sub = [],
      row, tmp,
      i, j;

  for (i = 0; i !== x.length; i++){

    row = x[i];
    tmp = [];

    for (j = 0; j !== row.length; j++){
      tmp.push(row[j] - y[i][j]);
    }

    sub.push(tmp);
  }

  return sub;
}

function multiplyColumByColumn(x, y){

  var subc = [],
      i;

  for (i = 0; i !== x.length; i++){
    subc.push([x[i][0] * y[i][0]]);
  }

  return subc;
}

function multiply(x, y){
  return matrixProduct.product(x, y);
}

function sigmoid(x){
  return divide(plusByValue(exp(negate(x)), 1), 1);
}

function sigmoidDerivative(x){
  return multiplyColumByColumn(x, substractByValue(x, 1));
}

function think(inputs, w){
  return sigmoid(multiply(inputs, w));
}

function train(ti, to, n){

  var weights = [
    [
      Number(Math.random().toFixed(8))
    ],
    [
      Number(Math.random().toFixed(8))
    ],
    [
      Number(Math.random().toFixed(8))
    ]
  ];

  var i,
      output,
      error,
      adjustment;

  console.info("start weights: ");
  console.info(weights);

  for (i = 0; i !== n; i++){
    
    output = think(ti, weights);

    error = substractByMatrix(to, output);

    adjustment = multiply(transpose(ti), multiplyColumByColumn(error, sigmoidDerivative(output)));

    weights = plusByMatrix(weights, adjustment);

  }

  console.info("weights despues de entrenadas: ");
  console.info(weights);

  return weights;
}

function execute(){
  
  var w = train(
    [[0, 0, 1], [1, 1, 1], [1, 0, 1], [0, 1, 1]],
    transpose([[0, 1, 1, 0]]),
    10000
  );

  console.info("Resultado con [1,0,0] -> debe ser 1");
  console.info(think([[1,0,0]], w)[0][0].toFixed(0));
}

execute();