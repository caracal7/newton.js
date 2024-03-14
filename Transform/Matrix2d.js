

function Matrix2d() {
    this.m = [];
    this.m[0] = [];
    this.m[1] = [];
    this.m[2] = [];
};

Matrix2d.prototype.log = function() {
    var i;
    for (i = 0; i < 3; i += 1) {
        console.log("[" + this.m[i][0] + "," + this.m[i][1] + "," + this.m[i][2] + "]");
    }
};

Matrix2d.prototype.identity = function() {
    this.m[0][0] = 1;
    this.m[0][1] = 0;
    this.m[0][2] = 0;

    this.m[1][0] = 0;
    this.m[1][1] = 1;
    this.m[1][2] = 0;

    this.m[2][0] = 0;
    this.m[2][1] = 0;
    this.m[2][2] = 1;

    return this;
};

Matrix2d.prototype.translate = function(x, y) {
    this.m[0][0] = 1;
    this.m[0][1] = 0;
    this.m[0][2] = 0;

    this.m[1][0] = 0;
    this.m[1][1] = 1;
    this.m[1][2] = 0;

    this.m[2][0] = x;
    this.m[2][1] = y;
    this.m[2][2] = 1;

    return this;
};

Matrix2d.prototype.scale = function(x, y) {
    this.m[0][0] = x;
    this.m[0][1] = 0;
    this.m[0][2] = 0;

    this.m[1][0] = 0;
    this.m[1][1] = y;
    this.m[1][2] = 0;

    this.m[2][0] = 0;
    this.m[2][1] = 0;
    this.m[2][2] = 1;

    return this;
};

Matrix2d.prototype.rotate = function(deg) {
    if (deg === 0) return this.identity();

    var rad = deg * (Math.PI / 180), c = Math.cos(rad), s = Math.sin(rad);

    this.m[0][0] = c;
    this.m[0][1] = s;
    this.m[0][2] = 0;

    this.m[1][0] = -s;
    this.m[1][1] = c;
    this.m[1][2] = 0;

    this.m[2][0] = 0;
    this.m[2][1] = 0;
    this.m[2][2] = 1;

    return this;
};

Matrix2d.prototype.multiply = function(m1, m2) {
    var x, y, z, sum, d = new Matrix2d();
    for (x = 0; x < 3; x++) {
        for (y = 0; y < 3; y += 1) {
            sum = 0;
            for (z = 0; z < 3; z += 1) {
                sum += m1.m[x][z] * m2.m[z][y];
            }
            d.m[x][y] = sum;
        }
    }
    return d;
};

Matrix2d.prototype.multiplyVec = function(v, m) {
    return {
        x: v.x * m.m[0][0] + v.y * m.m[1][0] + v.w * m.m[2][0],
        y: v.x * m.m[0][1] + v.y * m.m[1][1] + v.w * m.m[2][1],
        w: v.x * m.m[0][2] + v.y * m.m[1][2] + v.w * m.m[2][2]
    };
};

export default Matrix2d;
