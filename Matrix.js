class Matrix {
  constructor(rows, colums) {
    if (rows == undefined || colums == undefined) {
      console.warn("Matrix function must include rows and colums count as arguments");
      return undefined;
    }
    this.rows = rows;
    this.colums = colums;
    this.data = [];
    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < this.colums; j++) {
        this.data[i][j] = 0;
      }
    }
  }

  randomize(min, max, floor) {
    let range = max - min;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.colums; j++) {
        let temp = (Math.random()*range)+min;
        if (floor) temp = Math.floor(temp);
        this.data[i][j] = temp;
      }
    }
  }

  transpose() {
    let b = new Matrix(this.colums, this.rows);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.colums; j++) {
        b.data[j][i] = this.data[i][j];
      }
    }

    this.colums = b.colums;
    this.rows = b.rows;
    this.data = b.data;
  }

  add(a) {
    if (!(a instanceof Matrix)) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.colums; j++) {
          this.data[i][j] += a;
        }
      }
      return undefined;
    }

    if (a.rows != this.rows || a.colums != this.colums) {
      console.warn("Rows and colums must be the same length");
      return undefined;
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.colums; j++) {
        this.data[i][j] += a.data[i][j];
      }
    }
  }

  substract(a) {
    if (!(a instanceof Matrix)) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.colums; j++) {
          this.data[i][j] -= a;
        }
      }
      return undefined;
    }

    if (a.rows != this.rows || a.colums != this.colums) {
      console.warn("Rows and colums must be the same length");
      return undefined;
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.colums; j++) {
        this.data[i][j] -= a.data[i][j];
      }
    }
  }

  multiply(a) {
    if (a.rows !== this.colums) {
      console.warn("The number of rows of the second Matrix must be same as the number of colums of the first Matrix");
      return undefined;
    }

    let b =  new Matrix(this.rows, a.colums);

    for (let i = 0; i < b.rows; i++) {
      for (let j = 0; j < b.colums; j++) {
        for (let k = 0; k < this.colums; k++) {
          b.data[i][j] += this.data[i][k] * a.data[k][j];
        }
      }
    }

    this.colums = a.colums;
    this.data = b.data;
  }

  map(fn, params) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.colums; j++) {
        this.data[i][j] = fn(this.data[i][j], params);
      }
    }
  }

  print() {
    console.table(this.data);
    return undefined;
  }

  static transpose(a) {
    let b = new Matrix(a.colums, a.rows);

    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.colums; j++) {
        b.data[j][i] = a.data[i][j];
      }
    }

    return b;
  }

  static add(a, b) {
    if (!(a instanceof Matrix) || !(b instanceof Matrix) ) {
      console.warn("Both arguments must be matrix");
      return undefined;
    }

    if (a.rows != b.rows || a.colums != b.colums) {
      console.warn("Rows and colums of both matrix must be the same length");
      return undefined;
    }

    let c = new Matrix(a.rows, a.colums);

    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.colums; j++) {
        c.data[i][j] = a.data[i][j] + b.data[i][j];
      }
    }

    return c;
  }

  static substract(a, b) {
    if (!(a instanceof Matrix) || !(b instanceof Matrix) ) {
      console.warn("Both arguments must be matrix");
      return undefined;
    }

    if (a.rows != b.rows || a.colums != b.colums) {
      console.warn("Rows and colums of both matrix must be the same length");
      return undefined;
    }

    let c = new Matrix(a.rows, a.colums);

    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.colums; j++) {
        c.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }

    return c;
  }

  static multiply(a, b) {
    if (b.rows !== a.colums) {
      console.warn("The number of rows of the second Matrix must be same as the number of colums of the first Matrix");
      return undefined;
    }

    let c =  new Matrix(a.rows, b.colums);

    for (let i = 0; i < c.rows; i++) {
      for (let j = 0; j < c.colums; j++) {
        for (let k = 0; k < a.colums; k++) {
          c.data[i][j] += a.data[i][k] * b.data[k][j];
        }
      }
    }

    return c;
  }

  static map(m, fn, pars) {
    let a = new Matrix(m.rows, m.colums);

    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.colums; j++) {
        a.data[i][j] = fn(m.data[i][j], pars);
      }
    }

    return a;
  }

  static mapElementWise(m1, m2, fn) {
    if (m1.rows != m2.rows || m1.colums != m2.colums) {
      console.warn("Rows and colums must be same lenght for element Wise operations");
      return undefined;
    }

    let a = new Matrix(m1.rows, m1.colums);

    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.colums; j++) {
        a.data[i][j] = fn(m1.data[i][j], m2.data[i][j]);
      }
    }

    return a;
  }

  static fromArray(arr) {
    if (!(arr instanceof Array)) {
      console.warn("Argument must be an Array");
      return undefined;
    }

    let a = new Matrix(arr.length, 1);

    for (let i = 0; i < arr.length; i++) {
      a.data[i][0] = arr[i];
    }

    return a;
  }

  static from2DArray(arr) {
    if (!(arr instanceof Array)) {
      console.warn("Argument must be a 2D Array");
      return undefined;
    }

    for (let i = 0; i < arr.length; i++) {
      if (!(arr[i] instanceof Array) || (arr[0].length !== arr[i].length)) {
        console.warn("Argument Array must contain only Array objects that have the same length");
        return undefined;
      }
    }

    let a = new Matrix(arr.length, arr[0].length);
    a.data = arr;

    return a;
  }

  static toSingleArray(a) {
    if (a.colums !== 1 && a.rows !== 1) {
      console.warn("The matrix must be a sigle row or a single colum matrix");
      return undefined;
    }

    let b = new Array;

    if (a.colums === 1) {
      for (let i = 0; i < a.rows; i++) {
        b.push(a.data[i][0]);
      }
      return b;
    }

    for (let i = 0; i < a.colums; i++) {
      b.push(a.data[0][i]);
    }

    return b;
  }
}
