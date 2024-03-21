var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/utils/contact.js
function Contact(p, n, d, hash) {
  this.hash = hash;
  this.p = p;
  this.n = n;
  this.d = d;
  this.lambda_n_acc = 0;
  this.lambda_t_acc = 0;
}

// src/utils/math.js
function Clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}
function deg2rad(deg) {
  return deg / 180 * Math.PI;
}
function pixel2meter(px) {
  return px * 0.02;
}
function meter2pixel(mt) {
  return mt * 50;
}
function vec22(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}
vec22.zero = new vec22(0, 0);
vec22.prototype.toString = function() {
  return ["x:", this.x, "y:", this.y].join(" ");
};
vec22.prototype.set = function(x, y) {
  this.x = x;
  this.y = y;
  return this;
};
vec22.prototype.copy = function(v) {
  this.x = v.x;
  this.y = v.y;
  return this;
};
vec22.prototype.duplicate = function() {
  return new vec22(this.x, this.y);
};
vec22.prototype.equal = function(v) {
  return this.x != v.x || this.y != v.y ? false : true;
};
vec22.prototype.add = function(v1, v2) {
  this.x = v1.x + v2.x;
  this.y = v1.y + v2.y;
  return this;
};
vec22.prototype.addself = function(v) {
  this.x += v.x;
  this.y += v.y;
  return this;
};
vec22.prototype.sub = function(v1, v2) {
  this.x = v1.x - v2.x;
  this.y = v1.y - v2.y;
  return this;
};
vec22.prototype.subself = function(v) {
  this.x -= v.x;
  this.y -= v.y;
  return this;
};
vec22.prototype.scale = function(s) {
  this.x *= s;
  this.y *= s;
  return this;
};
vec22.prototype.scale2 = function(s) {
  this.x *= s.x;
  this.y *= s.y;
  return this;
};
vec22.prototype.mad = function(v, s) {
  this.x += v.x * s;
  this.y += v.y * s;
};
vec22.prototype.neg = function() {
  this.x *= -1;
  this.y *= -1;
  return this;
};
vec22.prototype.rcp = function() {
  this.x = 1 / this.x;
  this.y = 1 / this.y;
  return this;
};
vec22.prototype.lengthsq = function() {
  return this.x * this.x + this.y * this.y;
};
vec22.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};
vec22.prototype.normalize = function() {
  var inv = this.x != 0 || this.y != 0 ? 1 / Math.sqrt(this.x * this.x + this.y * this.y) : 0;
  this.x *= inv;
  this.y *= inv;
  return this;
};
vec22.prototype.dot = function(v) {
  return this.x * v.x + this.y * v.y;
};
vec22.prototype.cross = function(v) {
  return this.x * v.y - this.y * v.x;
};
vec22.prototype.toAngle = function() {
  return Math.atan2(this.y, this.x);
};
vec22.prototype.rotation = function(angle) {
  this.x = Math.cos(angle);
  this.y = Math.sin(angle);
  return this;
};
vec22.prototype.rotate = function(angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  return this.set(this.x * c - this.y * s, this.x * s + this.y * c);
};
vec22.prototype.lerp = function(v1, v2, t) {
  return this.add(vec22.scale(v1, 1 - t), vec22.scale(v2, t));
};
vec22.add = function(v1, v2) {
  return new vec22(v1.x + v2.x, v1.y + v2.y);
};
vec22.sub = function(v1, v2) {
  return new vec22(v1.x - v2.x, v1.y - v2.y);
};
vec22.scale = function(v, s) {
  return new vec22(v.x * s, v.y * s);
};
vec22.scale2 = function(v, s) {
  return new vec22(v.x * s.x, v.y * s.y);
};
vec22.mad = function(v1, v2, s) {
  return new vec22(v1.x + v2.x * s, v1.y + v2.y * s);
};
vec22.neg = function(v) {
  return new vec22(-v.x, -v.y);
};
vec22.rcp = function(v) {
  return new vec22(1 / v.x, 1 / v.y);
};
vec22.normalize = function(v) {
  var inv = v.x != 0 || v.y != 0 ? 1 / Math.sqrt(v.x * v.x + v.y * v.y) : 0;
  return new vec22(v.x * inv, v.y * inv);
};
vec22.dot = function(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
};
vec22.cross = function(v1, v2) {
  return v1.x * v2.y - v1.y * v2.x;
};
vec22.toAngle = function(v) {
  return Math.atan2(v.y, v.x);
};
vec22.rotation = function(angle) {
  return new vec22(Math.cos(angle), Math.sin(angle));
};
vec22.rotate = function(v, angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  return new vec22(v.x * c - v.y * s, v.x * s + v.y * c);
};
vec22.perp = function(v) {
  return new vec22(-v.y, v.x);
};
vec22.rperp = function(v) {
  return new vec22(v.y, -v.x);
};
vec22.dist = function(v1, v2) {
  var dx = v2.x - v1.x;
  var dy = v2.y - v1.y;
  return Math.sqrt(dx * dx + dy * dy);
};
vec22.distsq = function(v1, v2) {
  var dx = v2.x - v1.x;
  var dy = v2.y - v1.y;
  return dx * dx + dy * dy;
};
vec22.lerp = function(v1, v2, t) {
  return vec22.add(vec22.scale(v1, 1 - t), vec22.scale(v2, t));
};
vec22.truncate = function(v, length) {
  var ret = v.duplicate();
  var length_sq = v.x * v.x + v.y * v.y;
  if (length_sq > length * length)
    ret.scale(length / Math.sqrt(length_sq));
  return ret;
};
function vec3(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}
vec3.zero = new vec3(0, 0, 0);
vec3.prototype.toString = function() {
  return ["x:", this.x, "y:", this.y, "z:", this.z].join(" ");
};
vec3.prototype.set = function(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
  return this;
};
vec3.prototype.copy = function(v) {
  this.x = v.x;
  this.y = v.y;
  this.z = v.z;
  return this;
};
vec3.prototype.duplicate = function() {
  return new vec3(this.x, this.y, this.z);
};
vec3.prototype.equal = function(v) {
  return this.x != v.x || this.y != v.y || this.z != v.z ? false : true;
};
vec3.prototype.add = function(v1, v2) {
  this.x = v1.x + v2.x;
  this.y = v1.y + v2.y;
  this.z = v1.z + v2.z;
  return this;
};
vec3.prototype.addself = function(v) {
  this.x += v.x;
  this.y += v.y;
  this.z += v.z;
  return this;
};
vec3.prototype.sub = function(v1, v2) {
  this.x = v1.x - v2.x;
  this.y = v1.y - v2.y;
  this.z = v1.z - v2.z;
  return this;
};
vec3.prototype.subself = function(v) {
  this.x -= v.x;
  this.y -= v.y;
  this.z -= v.z;
  return this;
};
vec3.prototype.scale = function(s) {
  this.x *= s;
  this.y *= s;
  this.z *= s;
  return this;
};
vec3.prototype.mad = function(v, s) {
  this.x += v.x * s;
  this.y += v.y * s;
  this.z += v.z * s;
};
vec3.prototype.neg = function() {
  this.x *= -1;
  this.y *= -1;
  this.z *= -1;
  return this;
};
vec3.prototype.rcp = function() {
  this.x = 1 / this.x;
  this.y = 1 / this.y;
  this.z = 1 / this.z;
  return this;
};
vec3.prototype.lengthsq = function() {
  return this.x * this.x + this.y * this.y + this.z * this.z;
};
vec3.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};
vec3.prototype.normalize = function() {
  var inv = this.x != 0 || this.y != 0 || this.z != 0 ? 1 / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z) : 0;
  this.x *= inv;
  this.y *= inv;
  this.z *= inv;
  return this;
};
vec3.prototype.dot = function(v) {
  return this.x * v.x + this.y * v.y + this.z * v.z;
};
vec3.prototype.toVec2 = function() {
  return new vec22(this.x, this.y);
};
vec3.fromVec2 = function(v, z) {
  return new vec3(v.x, v.y, z);
};
vec3.truncate = function(v, length) {
  var ret = v.duplicate();
  var length_sq = v.x * v.x + v.y * v.y + v.z * v.z;
  if (length_sq > length * length) {
    ret.scale(length / Math.sqrt(length_sq));
  }
  return ret;
};
function mat2(_11, _12, _21, _22) {
  this._11 = _11 || 0;
  this._12 = _12 || 0;
  this._21 = _21 || 0;
  this._22 = _22 || 0;
}
mat2.zero = new mat2(0, 0, 0, 0);
mat2.prototype.toString = function() {
  return ["[", this._11, this._12, this_21, this._22, "]"].join(" ");
};
mat2.prototype.set = function(_11, _12, _21, _22) {
  this._11 = _11;
  this._12 = _12;
  this._21 = _21;
  this._22 = _22;
  return this;
};
mat2.prototype.copy = function(m) {
  this._11 = m._11;
  this._12 = m._12;
  this._21 = m._21;
  this._22 = m._22;
  return this;
};
mat2.prototype.duplicate = function() {
  return new mat2(this._11, this._12, this._21, this._22);
};
mat2.prototype.scale = function(s) {
  this._11 *= s;
  this._12 *= s;
  this._21 *= s;
  this._22 *= s;
  return this;
};
mat2.prototype.mul = function(m) {
  return this.set(
    this._11 * m2._11 + this._12 * m2._21,
    this._11 * m2._12 + this._12 * m2._22,
    this._21 * m2._11 + this._22 * m2._21,
    this._21 * m2._12 + this._22 * m2._22
  );
};
mat2.prototype.mulvec = function(v) {
  return new vec22(
    this._11 * v.x + this._12 * v.y,
    this._21 * v.x + this._22 * v.y
  );
};
mat2.prototype.invert = function() {
  var det = this._11 * this._22 - this._12 * this._21;
  if (det != 0)
    det = 1 / det;
  return this.set(
    this._22 * det,
    -this._12 * det,
    -this._21 * det,
    this._11 * det
  );
};
mat2.prototype.solve = function(b) {
  var det = this._11 * this._22 - this._12 * this._21;
  if (det != 0)
    det = 1 / det;
  return new vec22(
    det * (this._22 * b.x - this._12 * b.y),
    det * (this._11 * b.y - this._21 * b.x)
  );
};
mat2.mul = function(m1, m22) {
  return new mat2(
    m1._11 * m22._11 + m1._12 * m22._21,
    m1._11 * m22._12 + m1._12 * m22._22,
    m1._21 * m22._11 + m1._22 * m22._21,
    m1._21 * m22._12 + m1._22 * m22._22
  );
};
function mat3(_11, _12, _13, _21, _22, _23, _31, _32, _33) {
  this._11 = _11 || 0;
  this._12 = _12 || 0;
  this._13 = _13 || 0;
  this._21 = _21 || 0;
  this._22 = _22 || 0;
  this._23 = _23 || 0;
  this._31 = _31 || 0;
  this._32 = _32 || 0;
  this._33 = _33 || 0;
}
mat3.zero = new mat3(0, 0, 0, 0, 0, 0, 0, 0, 0);
mat3.prototype.toString = function() {
  return ["[", this._11, this._12, this._13, this_21, this._22, this._23, this._31, this._32, this._33, "]"].join(" ");
};
mat3.prototype.set = function(_11, _12, _13, _21, _22, _23, _31, _32, _33) {
  this._11 = _11;
  this._12 = _12;
  this._13 = _13;
  this._21 = _21;
  this._22 = _22;
  this._23 = _23;
  this._31 = _31;
  this._32 = _32;
  this._33 = _33;
  return this;
};
mat3.prototype.copy = function(m) {
  this._11 = m._11;
  this._12 = m._12;
  this._13 = m._13;
  this._21 = m._21;
  this._22 = m._22;
  this._23 = m._23;
  this._31 = m._31;
  this._32 = m._32;
  this._33 = m._33;
  return this;
};
mat3.prototype.duplicate = function() {
  return new mat3(this._11, this._12, this._13, this._21, this._22, this._23, this._31, this._32, this._33);
};
mat3.prototype.scale = function(s) {
  this._11 *= s;
  this._12 *= s;
  this._13 *= s;
  this._21 *= s;
  this._22 *= s;
  this._23 *= s;
  this._31 *= s;
  this._32 *= s;
  this._33 *= s;
  return this;
};
mat3.prototype.mul = function(m) {
  return this.set(
    this._11 * m2._11 + this._12 * m2._21 + this._13 * m2._31,
    this._11 * m2._12 + this._12 * m2._22 + this._13 * m2._32,
    this._11 * m2._13 + this._12 * m2._23 + this._13 * m2._33,
    this._21 * m2._11 + this._22 * m2._21 + this._23 * m2._31,
    this._21 * m2._12 + this._22 * m2._22 + this._23 * m2._32,
    this._21 * m2._13 + this._22 * m2._23 + this._23 * m2._33,
    this._31 * m2._11 + this._32 * m2._21 + this._33 * m2._31,
    this._31 * m2._12 + this._32 * m2._22 + this._33 * m2._32,
    this._31 * m2._13 + this._32 * m2._23 + this._33 * m2._33
  );
};
mat3.prototype.mulvec = function(v) {
  return new vec22(
    this._11 * v.x + this._12 * v.y + this._13 * v.z,
    this._21 * v.x + this._22 * v.y + this._23 * v.z,
    this._31 * v.x + this._32 * v.y + this._33 * v.z
  );
};
mat3.prototype.invert = function() {
  var det2_11 = this._22 * this._33 - this._23 * this._32;
  var det2_12 = this._23 * this._31 - this._21 * this._33;
  var det2_13 = this._21 * this._32 - this._22 * this._31;
  var det = this._11 * det2_11 + this._12 * det2_12 + this._13 * det2_13;
  if (det != 0)
    det = 1 / det;
  var det2_21 = this._13 * this._32 - this._12 * this._33;
  var det2_22 = this._11 * this._33 - this._13 * this._31;
  var det2_23 = this._12 * this._31 - this._11 * this._32;
  var det2_31 = this._12 * this._23 - this._13 * this._22;
  var det2_32 = this._13 * this._21 - this._11 * this._23;
  var det2_33 = this._11 * this._22 - this._12 * this._21;
  return this.set(
    det2_11 * det,
    det2_12 * det,
    det2_13 * det,
    det2_21 * det,
    det2_22 * det,
    det2_23 * det,
    det2_31 * det,
    det2_32 * det,
    det2_33 * det
  );
};
mat3.prototype.solve2x2 = function(b) {
  var det = this._11 * this._22 - this._12 * this._21;
  if (det != 0)
    det = 1 / det;
  return new vec22(
    det * (this._22 * b.x - this._12 * b.y),
    det * (this._11 * b.y - this._21 * b.x)
  );
};
mat3.prototype.solve = function(b) {
  var det2_11 = this._22 * this._33 - this._23 * this._32;
  var det2_12 = this._23 * this._31 - this._21 * this._33;
  var det2_13 = this._21 * this._32 - this._22 * this._31;
  var det = this._11 * det2_11 + this._12 * det2_12 + this._13 * det2_13;
  if (det != 0)
    det = 1 / det;
  var det2_21 = this._13 * this._32 - this._12 * this._33;
  var det2_22 = this._11 * this._33 - this._13 * this._31;
  var det2_23 = this._12 * this._31 - this._11 * this._32;
  var det2_31 = this._12 * this._23 - this._13 * this._22;
  var det2_32 = this._13 * this._21 - this._11 * this._23;
  var det2_33 = this._11 * this._22 - this._12 * this._21;
  return new vec3(
    det * (det2_11 * b.x + det2_12 * b.y + det2_13 * b.z),
    det * (det2_21 * b.x + det2_22 * b.y + det2_23 * b.z),
    det * (det2_31 * b.x + det2_32 * b.y + det2_33 * b.z)
  );
};
mat3.mul = function(m1, m22) {
  return new mat3(
    m1._11 * m22._11 + m1._12 * m22._21 + m1._13 * m22._31,
    m1._11 * m22._12 + m1._12 * m22._22 + m1._13 * m22._32,
    m1._11 * m22._13 + m1._12 * m22._23 + m1._13 * m22._33,
    m1._21 * m22._11 + m1._22 * m22._21 + m1._23 * m22._31,
    m1._21 * m22._12 + m1._22 * m22._22 + m1._23 * m22._32,
    m1._21 * m22._13 + m1._22 * m22._23 + m1._23 * m22._33,
    m1._31 * m22._11 + m1._32 * m22._21 + m1._33 * m22._31,
    m1._31 * m22._12 + m1._32 * m22._22 + m1._33 * m22._32,
    m1._31 * m22._13 + m1._32 * m22._23 + m1._33 * m22._33
  );
};
var Transform = function(pos, angle) {
  this.t = pos.duplicate();
  this.c = Math.cos(angle);
  this.s = Math.sin(angle);
};
Transform.prototype.set = function(pos, angle) {
  this.t.copy(pos);
  this.c = Math.cos(angle);
  this.s = Math.sin(angle);
  return this;
};
Transform.prototype.setRotation = function(angle) {
  this.c = Math.cos(angle);
  this.s = Math.sin(angle);
  return this;
};
Transform.prototype.setPosition = function(p) {
  this.t.copy(p);
  return this;
};
Transform.prototype.identity = function() {
  this.t.set(0, 0);
  this.c = 1;
  this.s = 0;
  return this;
};
Transform.prototype.rotate = function(v) {
  return new vec22(v.x * this.c - v.y * this.s, v.x * this.s + v.y * this.c);
};
Transform.prototype.unrotate = function(v) {
  return new vec22(v.x * this.c + v.y * this.s, -v.x * this.s + v.y * this.c);
};
Transform.prototype.transform = function(v) {
  return new vec22(v.x * this.c - v.y * this.s + this.t.x, v.x * this.s + v.y * this.c + this.t.y);
};
Transform.prototype.untransform = function(v) {
  var px = v.x - this.t.x;
  var py = v.y - this.t.y;
  return new vec22(px * this.c + py * this.s, -px * this.s + py * this.c);
};
var Bounds = function(mins2, maxs2) {
  this.mins = mins2 ? new vec22(mins2.x, mins2.y) : new vec22(Infinity, Infinity);
  this.maxs = maxs2 ? new vec22(maxs2.x, maxs2.y) : new vec22(-Infinity, -Infinity);
};
Bounds.prototype.toString = function() {
  return ["mins:", this.mins.toString(), "maxs:", this.maxs.toString()].join(" ");
};
Bounds.prototype.set = function(mins2, maxs2) {
  this.mins.set(mins2.x, mins2.y);
  this.maxs.set(maxs2.x, maxs2.y);
};
Bounds.prototype.copy = function(b) {
  this.mins.copy(b.mins);
  this.maxs.copy(b.maxs);
  return this;
};
Bounds.prototype.clear = function() {
  this.mins.set(Infinity, Infinity);
  this.maxs.set(-Infinity, -Infinity);
  return this;
};
Bounds.prototype.isEmpty = function() {
  if (this.mins.x === -Infinity || this.maxs.x === Infinity || this.mins.y === -Infinity || this.maxs.y === Infinity)
    return true;
  if (this.mins.x > this.maxs.x || this.mins.y > this.maxs.y)
    return true;
};
Bounds.prototype.getCenter = function() {
  return vec22.scale(vec22.add(this.mins, this.maxs), 0.5);
};
Bounds.prototype.getExtent = function() {
  return vec22.scale(vec22.sub(this.maxs, this.mins), 0.5);
};
Bounds.prototype.getPerimeter = function() {
  return (maxs.x - mins.x + maxs.y - mins.y) * 2;
};
Bounds.prototype.addPoint = function(p) {
  if (this.mins.x > p.x)
    this.mins.x = p.x;
  if (this.maxs.x < p.x)
    this.maxs.x = p.x;
  if (this.mins.y > p.y)
    this.mins.y = p.y;
  if (this.maxs.y < p.y)
    this.maxs.y = p.y;
  return this;
};
Bounds.prototype.addBounds = function(b) {
  if (this.mins.x > b.mins.x)
    this.mins.x = b.mins.x;
  if (this.maxs.x < b.maxs.x)
    this.maxs.x = b.maxs.x;
  if (this.mins.y > b.mins.y)
    this.mins.y = b.mins.y;
  if (this.maxs.y < b.maxs.y)
    this.maxs.y = b.maxs.y;
  return this;
};
Bounds.prototype.addBounds2 = function(mins2, maxs2) {
  if (this.mins.x > mins2.x)
    this.mins.x = mins2.x;
  if (this.maxs.x < maxs2.x)
    this.maxs.x = maxs2.x;
  if (this.mins.y > mins2.y)
    this.mins.y = mins2.y;
  if (this.maxs.y < maxs2.y)
    this.maxs.y = maxs2.y;
  return this;
};
Bounds.prototype.addExtents = function(center, extent_x, extent_y) {
  if (this.mins.x > center.x - extent_x)
    this.mins.x = center.x - extent_x;
  if (this.maxs.x < center.x + extent_x)
    this.maxs.x = center.x + extent_x;
  if (this.mins.y > center.y - extent_y)
    this.mins.y = center.y - extent_y;
  if (this.maxs.y < center.y + extent_y)
    this.maxs.y = center.y + extent_y;
  return this;
};
Bounds.prototype.expand = function(ax, ay) {
  this.mins.x -= ax;
  this.mins.y -= ay;
  this.maxs.x += ax;
  this.maxs.y += ay;
  return this;
};
Bounds.prototype.containPoint = function(p) {
  if (p.x < this.mins.x || p.x > this.maxs.x || p.y < this.mins.y || p.y > this.maxs.y)
    return false;
  return true;
};
Bounds.prototype.intersectsBounds = function(b) {
  if (this.mins.x > b.maxs.x || this.maxs.x < b.mins.x || this.mins.y > b.maxs.y || this.maxs.y < b.mins.y)
    return false;
  return true;
};
Bounds.expand = function(b, ax, ay) {
  var b = new Bounds(b.mins, b.maxs);
  b.expand(ax, ay);
  return b;
};

// src/shapes/shape.js
var Shape = function(type) {
  if (arguments.length == 0)
    return;
  if (Shape.id_counter == void 0)
    Shape.id_counter = 0;
  this.id = Shape.id_counter++;
  this.type = type;
  this.e = 0;
  this.u = 1;
  this.density = 1;
  this.bounds = new Bounds();
};
Shape.TYPE_CIRCLE = 0;
Shape.TYPE_SEGMENT = 1;
Shape.TYPE_POLY = 2;
Shape.NUM_TYPES = 3;
Shape.prototype.translateTo = function(pos) {
  switch (this.type) {
    case Shape.TYPE_CIRCLE:
      console.warn("Shape.TYPE_CIRCLE.translateTo: TODO tests", pos);
      this.c.copy(this.body.getLocalPoint(pos));
      break;
    case Shape.TYPE_SEGMENT:
      console.warn("Shape.TYPE_SEGMENT.translateTo: TODO tests", pos);
      var delta = vec22.sub(pos, this.centroid());
      var wa = vec22.add(this.ta, delta);
      var wb = vec22.add(this.ta, delta);
      this.a.copy(this.body.getLocalPoint(wa));
      this.b.copy(this.body.getLocalPoint(wb));
      break;
    case Shape.TYPE_POLY:
      var delta = vec22.sub(pos, this.centroid());
      for (var j = 0; j < this.tverts.length; j++) {
        var wv = vec22.add(this.tverts[j], delta);
        this.verts[j].copy(this.body.getLocalPoint(wv));
      }
      break;
  }
  this.finishVerts();
  this.body.resetMassData();
  this.body.awake(true);
  this.body.cacheData();
};
Shape.prototype.translateWithDelta = function(delta) {
  switch (this.type) {
    case Shape.TYPE_CIRCLE:
      var wc = vec22.add(this.tc, delta);
      this.c.copy(this.body.getLocalPoint(wc));
      break;
    case Shape.TYPE_SEGMENT:
      var wa = vec22.add(this.ta, delta);
      var wb = vec22.add(this.ta, delta);
      this.a.copy(this.body.getLocalPoint(wa));
      this.b.copy(this.body.getLocalPoint(wb));
      break;
    case Shape.TYPE_POLY:
      var transformCenter = this.body.p;
      var a = this.body.a;
      console.log(this.body.a);
      this.body.a = 0;
      for (var j = 0; j < this.tverts.length; j++) {
        var wv = vec22.add(this.tverts[j], delta);
        this.verts[j].copy(this.body.getLocalPoint(wv));
      }
      break;
  }
  this.finishVerts();
  this.body.resetMassData();
  this.body.awake(true);
  this.body.cacheData();
};

// src/utils/collision.js
var collision = {};
(function() {
  var colFuncs = [];
  function addCollideFunc(a, b, func) {
    colFuncs[a * Shape.NUM_TYPES + b] = func;
  }
  function _circle2Circle(c1, r1, c2, r2, contactArr) {
    var rmax = r1 + r2;
    var t = vec22.sub(c2, c1);
    var distsq = t.lengthsq();
    if (distsq > rmax * rmax) {
      return 0;
    }
    var dist = Math.sqrt(distsq);
    var p = vec22.mad(c1, t, 0.5 + (r1 - r2) * 0.5 / dist);
    var n = dist != 0 ? vec22.scale(t, 1 / dist) : vec22.zero;
    var d = dist - rmax;
    contactArr.push(new Contact(p, n, d, 0));
    return 1;
  }
  function circle2Circle(circ1, circ2, contactArr) {
    return _circle2Circle(circ1.tc, circ1.r, circ2.tc, circ2.r, contactArr);
  }
  function circle2Segment(circ, seg, contactArr) {
    var rsum = circ.r + seg.r;
    var dn = vec22.dot(circ.tc, seg.tn) - vec22.dot(seg.ta, seg.tn);
    var dist = (dn < 0 ? dn * -1 : dn) - rsum;
    if (dist > 0) {
      return 0;
    }
    var dt = vec22.cross(circ.tc, seg.tn);
    var dtMin = vec22.cross(seg.ta, seg.tn);
    var dtMax = vec22.cross(seg.tb, seg.tn);
    if (dt < dtMin) {
      if (dt < dtMin - rsum) {
        return 0;
      }
      return _circle2Circle(circ.tc, circ.r, seg.ta, seg.r, contactArr);
    } else if (dt > dtMax) {
      if (dt > dtMax + rsum) {
        return 0;
      }
      return _circle2Circle(circ.tc, circ.r, seg.tb, seg.r, contactArr);
    }
    var n = dn > 0 ? seg.tn : vec22.neg(seg.tn);
    contactArr.push(new Contact(vec22.mad(circ.tc, n, -(circ.r + dist * 0.5)), vec22.neg(n), dist, 0));
    return 1;
  }
  function circle2Poly(circ, poly, contactArr) {
    var minDist = -999999;
    var minIdx = -1;
    for (var i = 0; i < poly.verts.length; i++) {
      var plane = poly.tplanes[i];
      var dist = vec22.dot(circ.tc, plane.n) - plane.d - circ.r;
      if (dist > 0) {
        return 0;
      } else if (dist > minDist) {
        minDist = dist;
        minIdx = i;
      }
    }
    var n = poly.tplanes[minIdx].n;
    var a = poly.tverts[minIdx];
    var b = poly.tverts[(minIdx + 1) % poly.verts.length];
    var dta = vec22.cross(a, n);
    var dtb = vec22.cross(b, n);
    var dt = vec22.cross(circ.tc, n);
    if (dt > dta) {
      return _circle2Circle(circ.tc, circ.r, a, 0, contactArr);
    } else if (dt < dtb) {
      return _circle2Circle(circ.tc, circ.r, b, 0, contactArr);
    }
    contactArr.push(new Contact(vec22.mad(circ.tc, n, -(circ.r + minDist * 0.5)), vec22.neg(n), minDist, 0));
    return 1;
  }
  function segmentPointDistanceSq(seg, p) {
    var w = vec22.sub(p, seg.ta);
    var d = vec22.sub(seg.tb, seg.ta);
    var proj = w.dot(d);
    if (proj <= 0) {
      return w.dot(w);
    }
    var vsq = d.dot(d);
    if (proj >= vsq) {
      return w.dot(w) - 2 * proj + vsq;
    }
    return w.dot(w) - proj * proj / vsq;
  }
  function segment2Segment(seg1, seg2, contactArr) {
    var d = [];
    d[0] = segmentPointDistanceSq(seg1, seg2.ta);
    d[1] = segmentPointDistanceSq(seg1, seg2.tb);
    d[2] = segmentPointDistanceSq(seg2, seg1.ta);
    d[3] = segmentPointDistanceSq(seg2, seg1.tb);
    var idx1 = d[0] < d[1] ? 0 : 1;
    var idx2 = d[2] < d[3] ? 2 : 3;
    var idxm = d[idx1] < d[idx2] ? idx1 : idx2;
    var s, t;
    var u = vec22.sub(seg1.tb, seg1.ta);
    var v = vec22.sub(seg2.tb, seg2.ta);
    switch (idxm) {
      case 0:
        s = vec22.dot(vec22.sub(seg2.ta, seg1.ta), u) / vec22.dot(u, u);
        s = s < 0 ? 0 : s > 1 ? 1 : s;
        t = 0;
        break;
      case 1:
        s = vec22.dot(vec22.sub(seg2.tb, seg1.ta), u) / vec22.dot(u, u);
        s = s < 0 ? 0 : s > 1 ? 1 : s;
        t = 1;
        break;
      case 2:
        s = 0;
        t = vec22.dot(vec22.sub(seg1.ta, seg2.ta), v) / vec22.dot(v, v);
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        break;
      case 3:
        s = 1;
        t = vec22.dot(vec22.sub(seg1.tb, seg2.ta), v) / vec22.dot(v, v);
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        break;
    }
    var minp1 = vec22.mad(seg1.ta, u, s);
    var minp2 = vec22.mad(seg2.ta, v, t);
    return _circle2Circle(minp1, seg1.r, minp2, seg2.r, contactArr);
  }
  function findPointsBehindSeg(contactArr, seg, poly, dist, coef) {
    var dta = vec22.cross(seg.tn, seg.ta);
    var dtb = vec22.cross(seg.tn, seg.tb);
    var n = vec22.scale(seg.tn, coef);
    for (var i = 0; i < poly.verts.length; i++) {
      var v = poly.tverts[i];
      if (vec22.dot(v, n) < vec22.dot(seg.tn, seg.ta) * coef + seg.r) {
        var dt = vec22.cross(seg.tn, v);
        if (dta >= dt && dt >= dtb) {
          contactArr.push(new Contact(v, n, dist, poly.id << 16 | i));
        }
      }
    }
  }
  function segment2Poly(seg, poly, contactArr) {
    var seg_td = vec22.dot(seg.tn, seg.ta);
    var seg_d1 = poly.distanceOnPlane(seg.tn, seg_td) - seg.r;
    if (seg_d1 > 0) {
      return 0;
    }
    var seg_d2 = poly.distanceOnPlane(vec22.neg(seg.tn), -seg_td) - seg.r;
    if (seg_d2 > 0) {
      return 0;
    }
    var poly_d = -999999;
    var poly_i = -1;
    for (var i = 0; i < poly.verts.length; i++) {
      var plane = poly.tplanes[i];
      var dist = seg.distanceOnPlane(plane.n, plane.d);
      if (dist > 0) {
        return 0;
      }
      if (dist > poly_d) {
        poly_d = dist;
        poly_i = i;
      }
    }
    var poly_n = vec22.neg(poly.tplanes[poly_i].n);
    var va = vec22.mad(seg.ta, poly_n, seg.r);
    var vb = vec22.mad(seg.tb, poly_n, seg.r);
    if (poly.containPoint(va)) {
      contactArr.push(new Contact(va, poly_n, poly_d, seg.id << 16 | 0));
    }
    if (poly.containPoint(vb)) {
      contactArr.push(new Contact(vb, poly_n, poly_d, seg.id << 16 | 1));
    }
    poly_d -= 0.1;
    if (seg_d1 >= poly_d || seg_d2 >= poly_d) {
      if (seg_d1 > seg_d2) {
        findPointsBehindSeg(contactArr, seg, poly, seg_d1, 1);
      } else {
        findPointsBehindSeg(contactArr, seg, poly, seg_d2, -1);
      }
    }
    if (contactArr.length == 0) {
      var poly_a = poly.tverts[poly_i];
      var poly_b = poly.tverts[(poly_i + 1) % poly.verts.length];
      if (_circle2Circle(seg.ta, seg.r, poly_a, 0, contactArr))
        return 1;
      if (_circle2Circle(seg.tb, seg.r, poly_a, 0, contactArr))
        return 1;
      if (_circle2Circle(seg.ta, seg.r, poly_b, 0, contactArr))
        return 1;
      if (_circle2Circle(seg.tb, seg.r, poly_b, 0, contactArr))
        return 1;
    }
    return contactArr.length;
  }
  function findMSA(poly, planes, num) {
    var min_dist = -999999;
    var min_index = -1;
    for (var i = 0; i < num; i++) {
      var dist = poly.distanceOnPlane(planes[i].n, planes[i].d);
      if (dist > 0) {
        return { dist: 0, index: -1 };
      } else if (dist > min_dist) {
        min_dist = dist;
        min_index = i;
      }
    }
    return { dist: min_dist, index: min_index };
  }
  function findVertsFallback(contactArr, poly1, poly2, n, dist) {
    var num = 0;
    for (var i = 0; i < poly1.verts.length; i++) {
      var v = poly1.tverts[i];
      if (poly2.containPointPartial(v, n)) {
        contactArr.push(new Contact(v, n, dist, poly1.id << 16 | i));
        num++;
      }
    }
    for (var i = 0; i < poly2.verts.length; i++) {
      var v = poly2.tverts[i];
      if (poly1.containPointPartial(v, n)) {
        contactArr.push(new Contact(v, n, dist, poly2.id << 16 | i));
        num++;
      }
    }
    return num;
  }
  function findVerts(contactArr, poly1, poly2, n, dist) {
    var num = 0;
    for (var i = 0; i < poly1.verts.length; i++) {
      var v = poly1.tverts[i];
      if (poly2.containPoint(v)) {
        contactArr.push(new Contact(v, n, dist, poly1.id << 16 | i));
        num++;
      }
    }
    for (var i = 0; i < poly2.verts.length; i++) {
      var v = poly2.tverts[i];
      if (poly1.containPoint(v)) {
        contactArr.push(new Contact(v, n, dist, poly2.id << 16 | i));
        num++;
      }
    }
    return num > 0 ? num : findVertsFallback(contactArr, poly1, poly2, n, dist);
  }
  function poly2Poly(poly1, poly2, contactArr) {
    var msa1 = findMSA(poly2, poly1.tplanes, poly1.verts.length);
    if (msa1.index == -1) {
      return 0;
    }
    var msa2 = findMSA(poly1, poly2.tplanes, poly2.verts.length);
    if (msa2.index == -1) {
      return 0;
    }
    if (msa1.dist > msa2.dist) {
      return findVerts(contactArr, poly1, poly2, poly1.tplanes[msa1.index].n, msa1.dist);
    }
    return findVerts(contactArr, poly1, poly2, vec22.neg(poly2.tplanes[msa2.index].n), msa2.dist);
  }
  collision.init = function() {
    addCollideFunc(Shape.TYPE_CIRCLE, Shape.TYPE_CIRCLE, circle2Circle);
    addCollideFunc(Shape.TYPE_CIRCLE, Shape.TYPE_SEGMENT, circle2Segment);
    addCollideFunc(Shape.TYPE_CIRCLE, Shape.TYPE_POLY, circle2Poly);
    addCollideFunc(Shape.TYPE_SEGMENT, Shape.TYPE_SEGMENT, segment2Segment);
    addCollideFunc(Shape.TYPE_SEGMENT, Shape.TYPE_POLY, segment2Poly);
    addCollideFunc(Shape.TYPE_POLY, Shape.TYPE_POLY, poly2Poly);
  };
  collision.collide = function(a, b, contactArr) {
    if (a.type > b.type) {
      var c = a;
      a = b;
      b = c;
    }
    return colFuncs[a.type * Shape.NUM_TYPES + b.type](a, b, contactArr);
  };
})();

// src/utils/util.js
function areaForCircle(radius_outer, radius_inner) {
  return Math.PI * (radius_outer * radius_outer - radius_inner * radius_inner);
}
function inertiaForCircle(mass, center, radius_outer, radius_inner) {
  return mass * ((radius_outer * radius_outer + radius_inner * radius_inner) * 0.5 + center.lengthsq());
}
function areaForSegment(a, b, radius) {
  return radius * (Math.PI * radius + 2 * vec22.dist(a, b));
}
function centroidForSegment(a, b) {
  return vec22.scale(vec22.add(a, b), 0.5);
}
function inertiaForSegment(mass, a, b) {
  var distsq = vec22.distsq(b, a);
  var offset = vec22.scale(vec22.add(a, b), 0.5);
  return mass * (distsq / 12 + offset.lengthsq());
}
function areaForPoly(verts) {
  var area = 0;
  for (var i = 0; i < verts.length; i++) {
    area += vec22.cross(verts[i], verts[(i + 1) % verts.length]);
  }
  return area / 2;
}
function centroidForPoly(verts) {
  var area = 0;
  var vsum = new vec22(0, 0);
  for (var i = 0; i < verts.length; i++) {
    var v1 = verts[i];
    var v2 = verts[(i + 1) % verts.length];
    var cross = vec22.cross(v1, v2);
    area += cross;
    vsum.addself(vec22.scale(vec22.add(v1, v2), cross));
  }
  return vec22.scale(vsum, 1 / (3 * area));
}
function inertiaForPoly(mass, verts, offset) {
  var sum1 = 0;
  var sum2 = 0;
  for (var i = 0; i < verts.length; i++) {
    var v1 = vec22.add(verts[i], offset);
    var v2 = vec22.add(verts[(i + 1) % verts.length], offset);
    var a = vec22.cross(v2, v1);
    var b = vec22.dot(v1, v1) + vec22.dot(v1, v2) + vec22.dot(v2, v2);
    sum1 += a * b;
    sum2 += a;
  }
  return mass * sum1 / (6 * sum2);
}
function isAppleMobileDevice() {
  return navigator.userAgent.match(/iPhone|iPod|iPad/gi) ? true : false;
}

// src/shapes/shape_circle.js
var ShapeCircle = function(local_x, local_y, radius) {
  Shape.call(this, Shape.TYPE_CIRCLE);
  this.c = new vec22(local_x || 0, local_y || 0);
  this.r = radius;
  this.tc = vec22.zero;
  this.finishVerts();
};
ShapeCircle.prototype = new Shape();
ShapeCircle.prototype.constructor = ShapeCircle;
ShapeCircle.prototype.finishVerts = function() {
  this.r = Math.abs(this.r);
};
ShapeCircle.prototype.duplicate = function() {
  return new ShapeCircle(this.c.x, this.c.y, this.r);
};
ShapeCircle.prototype.serialize = function() {
  return {
    "type": "ShapeCircle",
    "e": this.e,
    "u": this.u,
    "density": this.density,
    "center": this.c,
    "radius": this.r
  };
};
ShapeCircle.prototype.recenter = function(c) {
  this.c.subself(c);
};
ShapeCircle.prototype.transform = function(xf) {
  this.c = xf.transform(this.c);
};
ShapeCircle.prototype.untransform = function(xf) {
  this.c = xf.untransform(this.c);
};
ShapeCircle.prototype.area = function() {
  return areaForCircle(this.r, 0);
};
ShapeCircle.prototype.centroid = function() {
  return this.c.duplicate();
};
ShapeCircle.prototype.inertia = function(mass) {
  return inertiaForCircle(mass, this.c, this.r, 0);
};
ShapeCircle.prototype.cacheData = function(xf) {
  this.tc = xf.transform(this.c);
  this.bounds.mins.set(this.tc.x - this.r, this.tc.y - this.r);
  this.bounds.maxs.set(this.tc.x + this.r, this.tc.y + this.r);
};
ShapeCircle.prototype.pointQuery = function(p) {
  return vec22.distsq(this.tc, p) < this.r * this.r;
};
ShapeCircle.prototype.findVertexByPoint = function(p, minDist) {
  var dsq = minDist * minDist;
  if (vec22.distsq(this.tc, p) < dsq) {
    return 0;
  }
  return -1;
};
ShapeCircle.prototype.distanceOnPlane = function(n, d) {
  return vec22.dot(n, this.tc) - this.r - d;
};

// src/shapes/shape_segment.js
var ShapeSegment = function(a, b, radius) {
  Shape.call(this, Shape.TYPE_SEGMENT);
  this.a = a.duplicate();
  this.b = b.duplicate();
  this.r = radius;
  this.n = vec22.perp(vec22.sub(b, a));
  this.n.normalize();
  this.ta = vec22.zero;
  this.tb = vec22.zero;
  this.tn = vec22.zero;
  this.finishVerts();
};
ShapeSegment.prototype = new Shape();
ShapeSegment.prototype.constructor = ShapeSegment;
ShapeSegment.prototype.finishVerts = function() {
  this.n = vec22.perp(vec22.sub(this.b, this.a));
  this.n.normalize();
  this.r = Math.abs(this.r);
};
ShapeSegment.prototype.duplicate = function() {
  return new ShapeSegment(this.a, this.b, this.r);
};
ShapeSegment.prototype.serialize = function() {
  return {
    "type": "ShapeSegment",
    "e": this.e,
    "u": this.u,
    "density": this.density,
    "a": this.a,
    "b": this.b,
    "radius": this.r
  };
};
ShapeSegment.prototype.recenter = function(c) {
  this.a.subself(c);
  this.b.subself(c);
};
ShapeSegment.prototype.transform = function(xf) {
  this.a = xf.transform(this.a);
  this.b = xf.transform(this.b);
};
ShapeSegment.prototype.untransform = function(xf) {
  this.a = xf.untransform(this.a);
  this.b = xf.untransform(this.b);
};
ShapeSegment.prototype.area = function() {
  return areaForSegment(this.a, this.b, this.r);
};
ShapeSegment.prototype.centroid = function() {
  return centroidForSegment(this.a, this.b);
};
ShapeSegment.prototype.inertia = function(mass) {
  return inertiaForSegment(mass, this.a, this.b);
};
ShapeSegment.prototype.cacheData = function(xf) {
  this.ta = xf.transform(this.a);
  this.tb = xf.transform(this.b);
  this.tn = vec22.perp(vec22.sub(this.tb, this.ta)).normalize();
  if (this.ta.x < this.tb.x) {
    var l = this.ta.x;
    var r = this.tb.x;
  } else {
    var l = this.tb.x;
    var r = this.ta.x;
  }
  if (this.ta.y < this.tb.y) {
    var b = this.ta.y;
    var t = this.tb.y;
  } else {
    var b = this.tb.y;
    var t = this.ta.y;
  }
  this.bounds.mins.set(l - this.r, b - this.r);
  this.bounds.maxs.set(r + this.r, t + this.r);
};
ShapeSegment.prototype.pointQuery = function(p) {
  if (!this.bounds.containPoint(p)) {
    return false;
  }
  var dn = vec22.dot(this.tn, p) - vec22.dot(this.ta, this.tn);
  var dist = Math.abs(dn);
  if (dist > this.r) {
    return false;
  }
  var dt = vec22.cross(p, this.tn);
  var dta = vec22.cross(this.ta, this.tn);
  var dtb = vec22.cross(this.tb, this.tn);
  if (dt <= dta) {
    if (dt < dta - this.r) {
      return false;
    }
    return vec22.distsq(this.ta, p) < this.r * this.r;
  } else if (dt > dtb) {
    if (dt > dtb + this.r) {
      return false;
    }
    return vec22.distsq(this.tb, p) < this.r * this.r;
  }
  return true;
};
ShapeSegment.prototype.findVertexByPoint = function(p, minDist) {
  var dsq = minDist * minDist;
  if (vec22.distsq(this.ta, p) < dsq) {
    return 0;
  }
  if (vec22.distsq(this.tb, p) < dsq) {
    return 1;
  }
  return -1;
};
ShapeSegment.prototype.distanceOnPlane = function(n, d) {
  var a = vec22.dot(n, this.ta) - this.r;
  var b = vec22.dot(n, this.tb) - this.r;
  return Math.min(a, b) - d;
};

// src/shapes/shape_poly.js
var ShapePoly = function(verts) {
  Shape.call(this, Shape.TYPE_POLY);
  this.verts = [];
  this.planes = [];
  this.tverts = [];
  this.tplanes = [];
  if (verts) {
    for (var i = 0; i < verts.length; i++) {
      this.verts[i] = verts[i].duplicate();
      this.tverts[i] = this.verts[i];
      this.tplanes[i] = {};
      this.tplanes[i].n = vec22.zero;
      this.tplanes[i].d = 0;
    }
  }
  this.finishVerts();
};
ShapePoly.prototype = new Shape();
ShapePoly.prototype.constructor = ShapePoly;
ShapePoly.prototype.finishVerts = function() {
  if (this.verts.length < 2) {
    this.convexity = false;
    this.planes = [];
    return;
  }
  this.convexity = true;
  this.tverts = [];
  this.tplanes = [];
  for (var i = 0; i < this.verts.length; i++) {
    var a = this.verts[i];
    var b = this.verts[(i + 1) % this.verts.length];
    var n = vec22.normalize(vec22.perp(vec22.sub(a, b)));
    this.planes[i] = {};
    this.planes[i].n = n;
    this.planes[i].d = vec22.dot(n, a);
    this.tverts[i] = this.verts[i];
    this.tplanes[i] = {};
    this.tplanes[i].n = vec22.zero;
    this.tplanes[i].d = 0;
  }
  for (var i = 0; i < this.verts.length; i++) {
    var b = this.verts[(i + 2) % this.verts.length];
    var n = this.planes[i].n;
    var d = this.planes[i].d;
    if (vec22.dot(n, b) - d > 0) {
      this.convexity = false;
    }
  }
};
ShapePoly.prototype.duplicate = function() {
  return new ShapePoly(this.verts);
};
ShapePoly.prototype.serialize = function() {
  return {
    "type": "ShapePoly",
    "e": this.e,
    "u": this.u,
    "density": this.density,
    "verts": this.verts
  };
};
ShapePoly.prototype.recenter = function(c) {
  for (var i = 0; i < this.verts.length; i++) {
    this.verts[i].subself(c);
  }
};
ShapePoly.prototype.transform = function(xf) {
  for (var i = 0; i < this.verts.length; i++) {
    this.verts[i] = xf.transform(this.verts[i]);
  }
};
ShapePoly.prototype.untransform = function(xf) {
  for (var i = 0; i < this.verts.length; i++) {
    this.verts[i] = xf.untransform(this.verts[i]);
  }
};
ShapePoly.prototype.area = function() {
  return areaForPoly(this.verts);
};
ShapePoly.prototype.centroid = function() {
  return centroidForPoly(this.verts);
};
ShapePoly.prototype.inertia = function(mass) {
  return inertiaForPoly(mass, this.verts, vec22.zero);
};
ShapePoly.prototype.cacheData = function(xf) {
  this.bounds.clear();
  var numVerts = this.verts.length;
  if (numVerts == 0) {
    return;
  }
  for (var i = 0; i < numVerts; i++) {
    this.tverts[i] = xf.transform(this.verts[i]);
  }
  if (numVerts < 2) {
    this.bounds.addPoint(this.tverts[0]);
    return;
  }
  for (var i = 0; i < numVerts; i++) {
    var a = this.tverts[i];
    var b = this.tverts[(i + 1) % numVerts];
    var n = vec22.normalize(vec22.perp(vec22.sub(a, b)));
    this.tplanes[i].n = n;
    this.tplanes[i].d = vec22.dot(n, a);
    this.bounds.addPoint(a);
  }
};
ShapePoly.prototype.pointQuery = function(p) {
  if (!this.bounds.containPoint(p)) {
    return false;
  }
  return this.containPoint(p);
};
ShapePoly.prototype.findVertexByPoint = function(p, minDist) {
  var dsq = minDist * minDist;
  for (var i = 0; i < this.tverts.length; i++) {
    if (vec22.distsq(this.tverts[i], p) < dsq) {
      return i;
    }
  }
  return -1;
};
ShapePoly.prototype.findEdgeByPoint = function(p, minDist) {
  var dsq = minDist * minDist;
  var numVerts = this.tverts.length;
  for (var i = 0; i < this.tverts.length; i++) {
    var v1 = this.tverts[i];
    var v2 = this.tverts[(i + 1) % numVerts];
    var n = this.tplanes[i].n;
    var dtv1 = vec22.cross(v1, n);
    var dtv2 = vec22.cross(v2, n);
    var dt = vec22.cross(p, n);
    if (dt > dtv1) {
      if (vec22.distsq(v1, p) < dsq) {
        return i;
      }
    } else if (dt < dtv2) {
      if (vec22.distsq(v2, p) < dsq) {
        return i;
      }
    } else {
      var dist = vec22.dot(n, p) - vec22.dot(n, v1);
      if (dist * dist < dsq) {
        return i;
      }
    }
  }
  return -1;
};
ShapePoly.prototype.distanceOnPlane = function(n, d) {
  var min = 999999;
  for (var i = 0; i < this.verts.length; i++) {
    min = Math.min(min, vec22.dot(n, this.tverts[i]));
  }
  return min - d;
};
ShapePoly.prototype.containPoint = function(p) {
  for (var i = 0; i < this.verts.length; i++) {
    var plane = this.tplanes[i];
    if (vec22.dot(plane.n, p) - plane.d > 0) {
      return false;
    }
  }
  return true;
};
ShapePoly.prototype.containPointPartial = function(p, n) {
  for (var i = 0; i < this.verts.length; i++) {
    var plane = this.tplanes[i];
    if (vec22.dot(plane.n, n) < 1e-4) {
      continue;
    }
    if (vec22.dot(plane.n, p) - plane.d > 0) {
      return false;
    }
  }
  return true;
};
var ShapeTriangle = function(p1, p2, p3) {
  var verts = [
    new vec22(p1.x, p1.y),
    new vec22(p2.x, p2.y),
    new vec22(p3.x, p3.y)
  ];
  return new ShapePoly(verts);
};
var ShapeBox = function(local_x, local_y, w, h) {
  local_x = local_x || 0;
  local_y = local_y || 0;
  var hw = w * 0.5;
  var hh = h * 0.5;
  var verts = [
    new vec22(-hw + local_x, +hh + local_y),
    new vec22(-hw + local_x, -hh + local_y),
    new vec22(+hw + local_x, -hh + local_y),
    new vec22(+hw + local_x, +hh + local_y)
  ];
  return new ShapePoly(verts);
};

// src/Body.js
var Body = function(type, pos, angle) {
  if (Body.id_counter == void 0)
    Body.id_counter = 0;
  this.id = Body.id_counter++;
  this.name = "body" + this.id;
  this.type = type;
  pos = pos || new vec22(0, 0);
  angle = angle || 0;
  this.xf = new Transform(pos, angle);
  this.centroid = new vec22(0, 0);
  this.p = new vec22(pos.x, pos.y);
  this.v = new vec22(0, 0);
  this.f = new vec22(0, 0);
  this.a = angle;
  this.w = 0;
  this.t = 0;
  this.linearDamping = 0;
  this.angularDamping = 0;
  this.sleepTime = 0;
  this.awaked = false;
  this.shapeArr = [];
  this.jointArr = [];
  this.jointHash = {};
  this.bounds = new Bounds();
  this.fixedRotation = false;
  this.categoryBits = 1;
  this.maskBits = 65535;
  this.stepCount = 0;
};
Body.STATIC = 0;
Body.KINETIC = 1;
Body.DYNAMIC = 2;
Body.prototype.duplicate = function() {
  var body = new Body(this.type, this.xf.t, this.a);
  for (var i = 0; i < this.shapeArr.length; i++)
    body.addShape(this.shapeArr[i].duplicate());
  body.resetMassData();
  return body;
};
Body.prototype.serialize = function() {
  var shapes = [];
  for (var i = 0; i < this.shapeArr.length; i++)
    shapes.push(this.shapeArr[i].serialize());
  return {
    type: ["static", "kinetic", "dynamic"][this.type],
    name: this.name,
    position: this.xf.t,
    angle: this.xf.a,
    shapes
  };
};
Body.prototype.isStatic = function() {
  return this.type == Body.STATIC ? true : false;
};
Body.prototype.isDynamic = function() {
  return this.type == Body.DYNAMIC ? true : false;
};
Body.prototype.isKinetic = function() {
  return this.type == Body.KINETIC ? true : false;
};
Body.prototype.setType = function(type) {
  if (type == this.type)
    return;
  this.f.set(0, 0);
  this.v.set(0, 0);
  this.t = 0;
  this.w = 0;
  this.type = type;
  this.awake(true);
};
Body.prototype.addShape = function(shape) {
  shape.body = this;
  this.shapeArr.push(shape);
  this.awake(true);
  this.cacheData();
};
Body.prototype.removeShape = function(shape) {
  var index = this.shapeArr.indexOf(shape);
  if (index != -1) {
    this.shapeArr.splice(index, 1);
    shape.body = void 0;
    this.awake(true);
    this.cacheData();
  }
};
Body.prototype.setMass = function(mass) {
  this.m = mass;
  this.m_inv = mass > 0 ? 1 / mass : 0;
};
Body.prototype.setInertia = function(inertia) {
  this.i = inertia;
  this.i_inv = inertia > 0 ? 1 / inertia : 0;
};
Body.prototype.setTransform = function(pos, angle) {
  this.xf.set(pos, angle);
  this.p = this.xf.transform(this.centroid);
  this.a = angle;
};
Body.prototype.syncTransform = function() {
  this.xf.setRotation(this.a);
  this.xf.setPosition(vec22.sub(this.p, this.xf.rotate(this.centroid)));
};
Body.prototype.getWorldPoint = function(p) {
  return this.xf.transform(p);
};
Body.prototype.getWorldVector = function(v) {
  return this.xf.rotate(v);
};
Body.prototype.getLocalPoint = function(p) {
  return this.xf.untransform(p);
};
Body.prototype.getLocalVector = function(v) {
  return this.xf.unrotate(v);
};
Body.prototype.setFixedRotation = function(flag) {
  this.fixedRotation = flag;
  this.resetMassData();
};
Body.prototype.resetMassData = function() {
  this.centroid.set(0, 0);
  this.m = 0;
  this.m_inv = 0;
  this.i = 0;
  this.i_inv = 0;
  if (!this.isDynamic()) {
    this.p = this.xf.transform(this.centroid);
    return;
  }
  var totalMassCentroid = new vec22(0, 0);
  var totalMass = 0;
  var totalInertia = 0;
  for (var i = 0; i < this.shapeArr.length; i++) {
    var shape = this.shapeArr[i];
    var centroid = shape.centroid();
    var mass = shape.area() * shape.density;
    var inertia = shape.inertia(mass);
    totalMassCentroid.mad(centroid, mass);
    totalMass += mass;
    totalInertia += inertia;
  }
  this.centroid.copy(vec22.scale(totalMassCentroid, 1 / totalMass));
  this.setMass(totalMass);
  if (!this.fixedRotation) {
    this.setInertia(totalInertia - totalMass * vec22.dot(this.centroid, this.centroid));
  }
  var old_p = this.p;
  this.p = this.xf.transform(this.centroid);
  this.v.mad(vec22.perp(vec22.sub(this.p, old_p)), this.w);
};
Body.prototype.resetJointAnchors = function() {
  for (var i = 0; i < this.jointArr.length; i++) {
    var joint = this.jointArr[i];
    if (!joint)
      continue;
    var anchor1 = joint.getWorldAnchor1();
    var anchor2 = joint.getWorldAnchor2();
    joint.setWorldAnchor1(anchor1);
    joint.setWorldAnchor2(anchor2);
  }
};
Body.prototype.cacheData = function() {
  this.bounds.clear();
  for (var i = 0; i < this.shapeArr.length; i++) {
    var shape = this.shapeArr[i];
    shape.cacheData(this.xf);
    this.bounds.addBounds(shape.bounds);
  }
};
Body.prototype.updateVelocity = function(gravity, dt, damping) {
  this.v = vec22.mad(this.v, vec22.mad(gravity, this.f, this.m_inv), dt);
  this.w = this.w + this.t * this.i_inv * dt;
  this.v.scale(Clamp(1 - dt * (damping + this.linearDamping), 0, 1));
  this.w *= Clamp(1 - dt * (damping + this.angularDamping), 0, 1);
  this.f.set(0, 0);
  this.t = 0;
};
Body.prototype.updatePosition = function(dt) {
  this.p.addself(vec22.scale(this.v, dt));
  this.a += this.w * dt;
};
Body.prototype.resetForce = function() {
  this.f.set(0, 0);
  this.t = 0;
};
Body.prototype.applyForce = function(force, p) {
  if (!this.isDynamic())
    return;
  if (!this.isAwake())
    this.awake(true);
  this.f.addself(force);
  this.t += vec22.cross(vec22.sub(p, this.p), force);
};
Body.prototype.applyForceToCenter = function(force) {
  if (!this.isDynamic())
    return;
  if (!this.isAwake())
    this.awake(true);
  this.f.addself(force);
};
Body.prototype.applyTorque = function(torque) {
  if (!this.isDynamic())
    return;
  if (!this.isAwake())
    this.awake(true);
  this.t += torque;
};
Body.prototype.applyLinearImpulse = function(impulse, p) {
  if (!this.isDynamic())
    return;
  if (!this.isAwake())
    this.awake(true);
  this.v.mad(impulse, this.m_inv);
  this.w += vec22.cross(vec22.sub(p, this.p), impulse) * this.i_inv;
};
Body.prototype.applyAngularImpulse = function(impulse) {
  if (!this.isDynamic())
    return;
  if (!this.isAwake())
    this.awake(true);
  this.w += impulse * this.i_inv;
};
Body.prototype.kineticEnergy = function() {
  var vsq = this.v.dot(this.v);
  var wsq = this.w * this.w;
  return 0.5 * (this.m * vsq + this.i * wsq);
};
Body.prototype.isAwake = function() {
  return this.awaked;
};
Body.prototype.awake = function(flag) {
  this.awaked = flag;
  if (flag) {
    this.sleepTime = 0;
  } else {
    this.v.set(0, 0);
    this.w = 0;
    this.f.set(0, 0);
    this.t = 0;
  }
};
Body.prototype.isCollidable = function(other) {
  if (this == other)
    return false;
  if (!this.isDynamic() && !other.isDynamic())
    return false;
  if (!(this.maskBits & other.categoryBits) || !(other.maskBits & this.categoryBits))
    return false;
  for (var i = 0; i < this.jointArr.length; i++) {
    var joint = this.jointArr[i];
    if (!joint)
      continue;
    if (!joint.collideConnected && other.jointHash[joint.id] != void 0)
      return false;
  }
  return true;
};
Body.prototype.translateWithDelta = function(delta) {
  var p = this.xf.t.duplicate();
  p.x += delta.x;
  p.y += delta.y;
  this.setTransform(p, this.a);
  this.resetJointAnchors();
  this.awake(true);
  this.cacheData();
};

// src/joints/joint.js
var Joint = function(type, body1, body2, collideConnected) {
  if (arguments.length == 0)
    return;
  if (Joint.id_counter == void 0)
    Joint.id_counter = 0;
  this.id = Joint.id_counter++;
  this.type = type;
  this.body1 = body1;
  this.body2 = body2;
  this.collideConnected = collideConnected;
  this.maxForce = 9999999999;
  this.breakable = false;
};
Joint.TYPE_ANGLE = Joint.prototype.TYPE_ANGLE = 0;
Joint.TYPE_REVOLUTE = Joint.prototype.TYPE_REVOLUTE = 1;
Joint.TYPE_WELD = Joint.prototype.TYPE_WELD = 2;
Joint.TYPE_WHEEL = Joint.prototype.TYPE_WHEEL = 3;
Joint.TYPE_PRISMATIC = Joint.prototype.TYPE_PRISMATIC = 4;
Joint.TYPE_DISTANCE = Joint.prototype.TYPE_DISTANCE = 5;
Joint.TYPE_ROPE = Joint.prototype.TYPE_ROPE = 6;
Joint.TYPE_MOUSE = Joint.prototype.TYPE_MOUSE = 7;
Joint.LINEAR_SLOP = 8e-4;
Joint.ANGULAR_SLOP = deg2rad(2);
Joint.MAX_LINEAR_CORRECTION = 0.5;
Joint.MAX_ANGULAR_CORRECTION = deg2rad(8);
Joint.LIMIT_STATE_INACTIVE = 0;
Joint.LIMIT_STATE_AT_LOWER = 1;
Joint.LIMIT_STATE_AT_UPPER = 2;
Joint.LIMIT_STATE_EQUAL_LIMITS = 3;
Joint.prototype.getWorldAnchor1 = function() {
  return this.body1.getWorldPoint(this.anchor1);
};
Joint.prototype.getWorldAnchor2 = function() {
  return this.body2.getWorldPoint(this.anchor2);
};
Joint.prototype.setWorldAnchor1 = function(anchor1) {
  this.anchor1 = this.body1.getLocalPoint(anchor1);
};
Joint.prototype.setWorldAnchor2 = function(anchor2) {
  this.anchor2 = this.body2.getLocalPoint(anchor2);
};

// src/utils/contactsolver.js
function ContactSolver(shape1, shape2) {
  this.shape1 = shape1;
  this.shape2 = shape2;
  this.contactArr = [];
  this.e = 1;
  this.u = 1;
}
ContactSolver.COLLISION_SLOP = 8e-4;
ContactSolver.BAUMGARTE = 0.28;
ContactSolver.MAX_LINEAR_CORRECTION = 1;
ContactSolver.prototype.update = function(newContactArr) {
  for (var i = 0; i < newContactArr.length; i++) {
    var newContact = newContactArr[i];
    var k = -1;
    for (var j = 0; j < this.contactArr.length; j++) {
      if (newContact.hash == this.contactArr[j].hash) {
        k = j;
        break;
      }
    }
    if (k > -1) {
      newContact.lambda_n_acc = this.contactArr[k].lambda_n_acc;
      newContact.lambda_t_acc = this.contactArr[k].lambda_t_acc;
    }
  }
  this.contactArr = newContactArr;
};
ContactSolver.prototype.initSolver = function(dt_inv) {
  var body1 = this.shape1.body;
  var body2 = this.shape2.body;
  var sum_m_inv = body1.m_inv + body2.m_inv;
  for (var i = 0; i < this.contactArr.length; i++) {
    var con = this.contactArr[i];
    con.r1 = vec22.sub(con.p, body1.p);
    con.r2 = vec22.sub(con.p, body2.p);
    con.r1_local = body1.xf.unrotate(con.r1);
    con.r2_local = body2.xf.unrotate(con.r2);
    var n = con.n;
    var t = vec22.perp(con.n);
    var sn1 = vec22.cross(con.r1, n);
    var sn2 = vec22.cross(con.r2, n);
    var emn_inv = sum_m_inv + body1.i_inv * sn1 * sn1 + body2.i_inv * sn2 * sn2;
    con.emn = emn_inv == 0 ? 0 : 1 / emn_inv;
    var st1 = vec22.cross(con.r1, t);
    var st2 = vec22.cross(con.r2, t);
    var emt_inv = sum_m_inv + body1.i_inv * st1 * st1 + body2.i_inv * st2 * st2;
    con.emt = emt_inv == 0 ? 0 : 1 / emt_inv;
    var v1 = vec22.mad(body1.v, vec22.perp(con.r1), body1.w);
    var v2 = vec22.mad(body2.v, vec22.perp(con.r2), body2.w);
    var rv = vec22.sub(v2, v1);
    con.bounce = vec22.dot(rv, con.n) * this.e;
  }
};
ContactSolver.prototype.warmStart = function() {
  var body1 = this.shape1.body;
  var body2 = this.shape2.body;
  for (var i = 0; i < this.contactArr.length; i++) {
    var con = this.contactArr[i];
    var n = con.n;
    var lambda_n = con.lambda_n_acc;
    var lambda_t = con.lambda_t_acc;
    var impulse = new vec22(lambda_n * n.x - lambda_t * n.y, lambda_t * n.x + lambda_n * n.y);
    body1.v.mad(impulse, -body1.m_inv);
    body1.w -= vec22.cross(con.r1, impulse) * body1.i_inv;
    body2.v.mad(impulse, body2.m_inv);
    body2.w += vec22.cross(con.r2, impulse) * body2.i_inv;
  }
};
ContactSolver.prototype.solveVelocityConstraints = function() {
  var body1 = this.shape1.body;
  var body2 = this.shape2.body;
  var m1_inv = body1.m_inv;
  var i1_inv = body1.i_inv;
  var m2_inv = body2.m_inv;
  var i2_inv = body2.i_inv;
  for (var i = 0; i < this.contactArr.length; i++) {
    var con = this.contactArr[i];
    var n = con.n;
    var t = vec22.perp(n);
    var r1 = con.r1;
    var r2 = con.r2;
    var v1 = vec22.mad(body1.v, vec22.perp(r1), body1.w);
    var v2 = vec22.mad(body2.v, vec22.perp(r2), body2.w);
    var rv = vec22.sub(v2, v1);
    var lambda_n = -con.emn * (vec22.dot(n, rv) + con.bounce);
    var lambda_n_old = con.lambda_n_acc;
    con.lambda_n_acc = Math.max(lambda_n_old + lambda_n, 0);
    lambda_n = con.lambda_n_acc - lambda_n_old;
    var lambda_t = -con.emt * vec22.dot(t, rv);
    var lambda_t_max = con.lambda_n_acc * this.u;
    var lambda_t_old = con.lambda_t_acc;
    con.lambda_t_acc = Clamp(lambda_t_old + lambda_t, -lambda_t_max, lambda_t_max);
    lambda_t = con.lambda_t_acc - lambda_t_old;
    var impulse = new vec22(lambda_n * n.x - lambda_t * n.y, lambda_t * n.x + lambda_n * n.y);
    body1.v.mad(impulse, -m1_inv);
    body1.w -= vec22.cross(r1, impulse) * i1_inv;
    body2.v.mad(impulse, m2_inv);
    body2.w += vec22.cross(r2, impulse) * i2_inv;
  }
};
ContactSolver.prototype.solvePositionConstraints = function() {
  var body1 = this.shape1.body;
  var body2 = this.shape2.body;
  var m1_inv = body1.m_inv;
  var i1_inv = body1.i_inv;
  var m2_inv = body2.m_inv;
  var i2_inv = body2.i_inv;
  var sum_m_inv = m1_inv + m2_inv;
  var max_penetration = 0;
  for (var i = 0; i < this.contactArr.length; i++) {
    var con = this.contactArr[i];
    var n = con.n;
    var r1 = vec22.rotate(con.r1_local, body1.a);
    var r2 = vec22.rotate(con.r2_local, body2.a);
    var p1 = vec22.add(body1.p, r1);
    var p2 = vec22.add(body2.p, r2);
    var dp = vec22.sub(p2, p1);
    var c = vec22.dot(dp, n) + con.d;
    var correction = Clamp(ContactSolver.BAUMGARTE * (c + ContactSolver.COLLISION_SLOP), -ContactSolver.MAX_LINEAR_CORRECTION, 0);
    if (correction == 0)
      continue;
    max_penetration = Math.max(max_penetration, -c);
    var sn1 = vec22.cross(r1, n);
    var sn2 = vec22.cross(r2, n);
    var em_inv = sum_m_inv + body1.i_inv * sn1 * sn1 + body2.i_inv * sn2 * sn2;
    var lambda_dt = em_inv == 0 ? 0 : -correction / em_inv;
    var impulse_dt = vec22.scale(n, lambda_dt);
    body1.p.mad(impulse_dt, -m1_inv);
    body1.a -= sn1 * lambda_dt * i1_inv;
    body2.p.mad(impulse_dt, m2_inv);
    body2.a += sn2 * lambda_dt * i2_inv;
  }
  return max_penetration <= ContactSolver.COLLISION_SLOP * 3;
};

// src/utils/stats.js
var stats = {};

// src/World.js
function World(renderer) {
  this.renderer = renderer;
  this.bodyArr = [];
  this.jointArr = [];
  this.jointHash = {};
  this.numContacts = 0;
  this.contactSolverArr = [];
  this.postSolve = function(arb) {
  };
  this.gravity = new vec22(0, 0);
  this.damping = 0;
}
World.TIME_TO_SLEEP = 0.5;
World.SLEEP_LINEAR_TOLERANCE = 0.5;
World.SLEEP_ANGULAR_TOLERANCE = deg2rad(2);
World.prototype.clear = function() {
  Shape.id_counter = 0;
  Body.id_counter = 0;
  Joint.id_counter = 0;
  while (this.jointArr.length)
    this.removeJoint(this.jointArr[this.jointArr.length - 1]);
  while (this.bodyArr.length)
    this.removeBody(this.bodyArr[this.bodyArr.length - 1]);
  this.bodyArr = [];
  this.jointArr = [];
  this.jointHash = {};
  this.contactSolverArr = [];
  this.stepCount = 0;
};
World.prototype.toJSON = function(key) {
  var o_bodies = [];
  for (var i = 0; i < this.bodyArr.length; i++) {
    if (this.bodyArr[i]) {
      o_bodies.push(this.bodyArr[i].serialize());
    }
  }
  var o_joints = [];
  for (var i = 0; i < this.jointArr.length; i++) {
    if (this.jointArr[i]) {
      o_joints.push(this.jointHash[i].serialize());
    }
  }
  return {
    bodies: o_bodies,
    joints: o_joints
  };
};
World.prototype.create = function(text) {
  var config = JSON.parse(text);
  this.clear();
  for (var i = 0; i < config.bodies.length; i++) {
    var config_body = config.bodies[i];
    var type = {
      static: Body.STATIC,
      kinetic: Body.KINETIC,
      dynamic: Body.DYNAMIC
    }[config_body.type];
    var body = new Body(type, config_body.position.x, config_body.position.y, config_body.angle);
    for (var j = 0; j < config_body.shapes.length; j++) {
      var config_shape = config_body.shapes[j];
      var shape;
      switch (config_shape.type) {
        case "ShapeCircle":
          shape = new ShapeCircle(config_shape.center.x, config_shape.center.y, config_shape.radius);
          break;
        case "ShapeSegment":
          shape = new ShapeSegment(config_shape.a, config_shape.b, config_shape.radius);
          break;
        case "ShapePoly":
          shape = new ShapePoly(config_shape.verts);
          break;
      }
      shape.e = config_shape.e;
      shape.u = config_shape.u;
      shape.density = config_shape.density;
      body.addShape(shape);
    }
    body.resetMassData();
    this.addBody(body);
  }
  for (var i = 0; i < config.joints.length; i++) {
    var config_joint = config.joints[i];
    var body1 = this.bodyArr.find((b) => b.id === config_joint.body1.id);
    var body2 = this.bodyArr.find((b) => b.id === config_joint.body2.id);
    var joint;
    switch (config_joint.type) {
      case "AngleJoint":
        joint = new AngleJoint(body1, body2);
        break;
      case "RevoluteJoint":
        joint = new RevoluteJoint(body1, body2, config_joint.anchor);
        joint.enableLimit(config_joint.limitEnabled);
        joint.setLimits(config_joint.limitLowerAngle, config_joint.limitUpperAngle);
        joint.enableMotor(config_joint.motorEnabled);
        joint.setMotorSpeed(config_joint.motorSpeed);
        joint.setMaxMotorTorque(config_joint.maxMotorTorque);
        break;
      case "WeldJoint":
        joint = new WeldJoint(body1, body2, config_joint.anchor);
        joint.setSpringFrequencyHz(config_joint.frequencyHz);
        joint.setSpringDampingRatio(config_joint.dampingRatio);
        break;
      case "WheelJoint":
        joint = new WheelJoint(body1, body2, config_joint.anchor1, config_joint.anchor2);
        joint.enableMotor(config_joint.motorEnabled);
        joint.setMotorSpeed(config_joint.motorSpeed);
        joint.setMaxMotorTorque(config_joint.maxMotorTorque);
        break;
      case "PrismaticJoint":
        joint = new PrismaticJoint(body1, body2, config_joint.anchor1, config_joint.anchor2);
        break;
      case "DistanceJoint":
        joint = new DistanceJoint(body1, body2, config_joint.anchor1, config_joint.anchor2);
        joint.setSpringFrequencyHz(config_joint.frequencyHz);
        joint.setSpringDampingRatio(config_joint.dampingRatio);
        break;
      case "RopeJoint":
        joint = new RopeJoint(body1, body2, config_joint.anchor1, config_joint.anchor2);
        break;
    }
    joint.collideConnected = config_joint.collideConnected;
    joint.maxForce = config_joint.maxForce;
    joint.breakable = config_joint.breakable;
    this.addJoint(joint);
  }
};
World.prototype.addBody = function(body) {
  var _a;
  if (this.bodyArr.find((b) => b.id === body.id))
    return;
  this.bodyArr.push(body);
  (_a = this.renderer) == null ? void 0 : _a.addBody(body);
  body.awake(true);
  body.world = this;
  body.cacheData();
};
World.prototype.removeBody = function(body) {
  var _a;
  var index = this.bodyArr.findIndex((b) => b.id === body.id);
  if (index === -1)
    return;
  (_a = this.renderer) == null ? void 0 : _a.removeBody(body);
  for (var i = 0; i < body.jointArr.length; i++) {
    this.removeJoint(body.jointArr[i]);
  }
  body.world = null;
  this.bodyArr.splice(index, 1);
};
World.prototype.addJoint = function(joint) {
  if (this.jointHash[joint.id] != void 0)
    return;
  this.jointHash[joint.id] = joint;
  joint.body1.jointHash[joint.id] = joint;
  joint.body2.jointHash[joint.id] = joint;
  this.jointArr.push(joint);
  joint.body1.jointArr.push(joint);
  joint.body2.jointArr.push(joint);
  joint.body1.awake(true);
  joint.body2.awake(true);
  this.renderer.addJoint(joint);
};
World.prototype.removeJoint = function(joint) {
  if (this.jointHash[joint.id] == void 0)
    return;
  delete this.jointHash[joint.id];
  delete joint.body1.jointHash[joint.id];
  delete joint.body2.jointHash[joint.id];
  var index = this.jointArr.findIndex((j) => j.id === joint.id);
  this.jointArr.splice(index, 1);
  var index = joint.body1.jointArr.findIndex((j) => j.id === joint.id);
  joint.body1.jointArr.splice(index, 1);
  var index = joint.body2.jointArr.findIndex((j) => j.id === joint.id);
  joint.body2.jointArr.splice(index, 1);
  joint.body1.awake(true);
  joint.body2.awake(true);
  this.renderer.removeJoint(joint);
};
World.prototype.findShapeByPoint = function(p, refShape) {
  var firstShape;
  for (var i = 0; i < this.bodyArr.length; i++) {
    var body = this.bodyArr[i];
    if (!body) {
      continue;
    }
    for (var j = 0; j < body.shapeArr.length; j++) {
      var shape = body.shapeArr[j];
      if (shape.pointQuery(p)) {
        if (!refShape)
          return shape;
        if (!firstShape)
          firstShape = shape;
        if (shape == refShape)
          refShape = null;
      }
    }
  }
  return firstShape;
};
World.prototype.findBodyByPoint = function(p, refBody) {
  var firstBody;
  for (var i = 0; i < this.bodyArr.length; i++) {
    var body = this.bodyArr[i];
    if (!body)
      continue;
    for (var j = 0; j < body.shapeArr.length; j++) {
      var shape = body.shapeArr[j];
      if (shape.pointQuery(p)) {
        if (!refBody)
          return shape.body;
        if (!firstBody)
          firstBody = shape.body;
        if (shape.body == refBody)
          refBody = null;
        break;
      }
    }
  }
  return firstBody;
};
World.prototype.shapeById = function(id) {
  var shape;
  for (var i = 0; i < this.bodyArr.length; i++) {
    var body = this.bodyArr[i];
    if (!body)
      continue;
    for (var j = 0; j < body.shapeArr.length; j++) {
      if (body.shapeArr[j].id == id)
        return body.shapeArr[j];
    }
  }
  return null;
};
World.prototype.jointById = function(id) {
  var index = this.jointHash[id];
  if (index != void 0)
    return this.jointArr[index];
  return null;
};
World.prototype.findVertexByPoint = function(p, minDist, refVertexId) {
  var firstVertexId = -1;
  refVertexId = refVertexId || -1;
  for (var i = 0; i < this.bodyArr.length; i++) {
    var body = this.bodyArr[i];
    if (!body)
      continue;
    for (var j = 0; j < body.shapeArr.length; j++) {
      var shape = body.shapeArr[j];
      var index = shape.findVertexByPoint(p, minDist);
      if (index != -1) {
        var vertex = shape.id << 16 | index;
        if (refVertexId == -1)
          return vertex;
        if (firstVertexId == -1)
          firstVertexId = vertex;
        if (vertex == refVertexId)
          refVertexId = -1;
      }
    }
  }
  return firstVertexId;
};
World.prototype.findEdgeByPoint = function(p, minDist, refEdgeId) {
  var firstEdgeId = -1;
  refEdgeId = refEdgeId || -1;
  for (var i = 0; i < this.bodyArr.length; i++) {
    var body = this.bodyArr[i];
    if (!body)
      continue;
    for (var j = 0; j < body.shapeArr.length; j++) {
      var shape = body.shapeArr[j];
      if (shape.type != Shape.TYPE_POLY)
        continue;
      var index = shape.findEdgeByPoint(p, minDist);
      if (index != -1) {
        var edge = shape.id << 16 | index;
        if (refEdgeId == -1)
          return edge;
        if (firstEdgeId == -1)
          firstEdgeId = edge;
        if (edge == refEdgeId)
          refEdgeId = -1;
      }
    }
  }
  return firstEdgeId;
};
World.prototype.findJointByPoint = function(p, minDist, refJointId) {
  var firstJointId = -1;
  var dsq = minDist * minDist;
  refJointId = refJointId || -1;
  for (var i = 0; i < this.jointArr.length; i++) {
    var joint = this.jointArr[i];
    if (!joint)
      continue;
    var jointId = -1;
    if (vec22.distsq(p, joint.getWorldAnchor1()) < dsq) {
      jointId = joint.id << 16 | 0;
    } else if (vec22.distsq(p, joint.getWorldAnchor2()) < dsq) {
      jointId = joint.id << 16 | 1;
    }
    if (jointId != -1) {
      if (refJointId == -1)
        return jointId;
      if (firstJointId == -1)
        firstJointId = jointId;
      if (jointId == refJointId)
        refJointId = -1;
    }
  }
  return firstJointId;
};
World.prototype.findContactSolver = function(shape1, shape2) {
  for (var i = 0; i < this.contactSolverArr.length; i++) {
    var contactSolver = this.contactSolverArr[i];
    if (shape1 == contactSolver.shape1 && shape2 == contactSolver.shape2)
      return contactSolver;
  }
  return null;
};
World.prototype.genTemporalContactSolvers = function() {
  var t0 = Date.now();
  var newContactSolverArr = [];
  this.numContacts = 0;
  for (var body1_index = 0; body1_index < this.bodyArr.length; body1_index++) {
    var body1 = this.bodyArr[body1_index];
    if (!body1)
      continue;
    body1.stepCount = this.stepCount;
    for (var body2_index = 0; body2_index < this.bodyArr.length; body2_index++) {
      var body2 = this.bodyArr[body2_index];
      if (!body2)
        continue;
      if (body1.stepCount == body2.stepCount)
        continue;
      var active1 = body1.isAwake() && !body1.isStatic();
      var active2 = body2.isAwake() && !body2.isStatic();
      if (!active1 && !active2)
        continue;
      if (!body1.isCollidable(body2))
        continue;
      if (!body1.bounds.intersectsBounds(body2.bounds))
        continue;
      for (var i = 0; i < body1.shapeArr.length; i++) {
        for (var j = 0; j < body2.shapeArr.length; j++) {
          var shape1 = body1.shapeArr[i];
          var shape2 = body2.shapeArr[j];
          var contactArr = [];
          if (!collision.collide(shape1, shape2, contactArr))
            continue;
          if (shape1.type > shape2.type) {
            var temp = shape1;
            shape1 = shape2;
            shape2 = temp;
          }
          this.numContacts += contactArr.length;
          var contactSolver = this.findContactSolver(shape1, shape2);
          if (contactSolver) {
            contactSolver.update(contactArr);
            newContactSolverArr.push(contactSolver);
          } else {
            body1.awake(true);
            body2.awake(true);
            var newContactSolver = new ContactSolver(shape1, shape2);
            newContactSolver.contactArr = contactArr;
            newContactSolver.e = Math.max(shape1.e, shape2.e);
            newContactSolver.u = Math.sqrt(shape1.u * shape2.u);
            newContactSolverArr.push(newContactSolver);
          }
        }
      }
    }
  }
  stats.timeCollision = Date.now() - t0;
  return newContactSolverArr;
};
World.prototype.initSolver = function(dt, dt_inv, warmStarting) {
  var t0 = Date.now();
  for (var i = 0; i < this.contactSolverArr.length; i++) {
    this.contactSolverArr[i].initSolver(dt_inv);
  }
  for (var i = 0; i < this.jointArr.length; i++) {
    if (this.jointArr[i]) {
      this.jointArr[i].initSolver(dt, warmStarting);
    }
  }
  if (warmStarting) {
    for (var i = 0; i < this.contactSolverArr.length; i++) {
      this.contactSolverArr[i].warmStart();
    }
  }
  stats.timeInitSolver = Date.now() - t0;
};
World.prototype.velocitySolver = function(iteration) {
  var t0 = Date.now();
  for (var i = 0; i < iteration; i++) {
    for (var j = 0; j < this.jointArr.length; j++) {
      this.jointArr[j].solveVelocityConstraints();
    }
    for (var j = 0; j < this.contactSolverArr.length; j++) {
      this.contactSolverArr[j].solveVelocityConstraints();
    }
  }
  stats.timeVelocitySolver = Date.now() - t0;
};
World.prototype.positionSolver = function(iteration) {
  var t0 = Date.now();
  var positionSolved = false;
  stats.positionIterations = 0;
  for (var i = 0; i < iteration; i++) {
    var contactsOk = true;
    var jointsOk = true;
    for (var j = 0; j < this.contactSolverArr.length; j++) {
      var contactOk = this.contactSolverArr[j].solvePositionConstraints();
      contactsOk = contactOk && contactsOk;
    }
    for (var j = 0; j < this.jointArr.length; j++) {
      if (this.jointArr[j]) {
        var jointOk = this.jointArr[j].solvePositionConstraints();
        jointsOk = jointOk && jointsOk;
      }
    }
    if (contactsOk && jointsOk) {
      positionSolved = true;
      break;
    }
    stats.positionIterations++;
  }
  stats.timePositionSolver = Date.now() - t0;
  return positionSolved;
};
World.prototype.step = function(dt, vel_iteration, pos_iteration, warmStarting, allowSleep) {
  var dt_inv = 1 / dt;
  this.stepCount++;
  this.contactSolverArr = this.genTemporalContactSolvers();
  this.initSolver(dt, dt_inv, warmStarting);
  for (var i = 0; i < this.bodyArr.length; i++) {
    var body = this.bodyArr[i];
    if (!body)
      continue;
    if (body.isDynamic() && body.isAwake()) {
      body.updateVelocity(this.gravity, dt, this.damping);
    }
  }
  for (var i = 0; i < this.jointArr.length; i++) {
    var joint = this.jointArr[i];
    if (!joint)
      continue;
    var body1 = joint.body1;
    var body2 = joint.body2;
    var awake1 = body1.isAwake() && !body1.isStatic();
    var awake2 = body2.isAwake() && !body2.isStatic();
    if (awake1 ^ awake2) {
      if (!awake1)
        body1.awake(true);
      if (!awake2)
        body2.awake(true);
    }
  }
  this.velocitySolver(vel_iteration);
  for (var i = 0; i < this.bodyArr.length; i++) {
    var body = this.bodyArr[i];
    if (!body)
      continue;
    if (body.isDynamic() && body.isAwake())
      body.updatePosition(dt);
  }
  for (var i = 0; i < this.jointArr.length; i++) {
    var joint = this.jointArr[i];
    if (!joint)
      continue;
    if (joint.breakable) {
      if (joint.getReactionForce(dt_inv).lengthsq() >= joint.maxForce * joint.maxForce)
        this.removeJoint(joint);
    }
  }
  var positionSolved = this.positionSolver(pos_iteration);
  for (var i = 0; i < this.bodyArr.length; i++) {
    var body = this.bodyArr[i];
    if (!body)
      continue;
    body.syncTransform();
  }
  for (var i = 0; i < this.contactSolverArr.length; i++) {
    var arb = this.contactSolverArr[i];
    this.postSolve(arb);
  }
  for (var i = 0; i < this.bodyArr.length; i++) {
    var body = this.bodyArr[i];
    if (!body)
      continue;
    if (body.isDynamic() && body.isAwake())
      body.cacheData();
  }
  if (allowSleep) {
    var minSleepTime = 999999;
    var linTolSqr = World.SLEEP_LINEAR_TOLERANCE * World.SLEEP_LINEAR_TOLERANCE;
    var angTolSqr = World.SLEEP_ANGULAR_TOLERANCE * World.SLEEP_ANGULAR_TOLERANCE;
    for (var i = 0; i < this.bodyArr.length; i++) {
      var body = this.bodyArr[i];
      if (!body)
        continue;
      if (!body.isDynamic())
        continue;
      if (body.w * body.w > angTolSqr || body.v.dot(body.v) > linTolSqr) {
        body.sleepTime = 0;
        minSleepTime = 0;
      } else {
        body.sleepTime += dt;
        minSleepTime = Math.min(minSleepTime, body.sleepTime);
      }
    }
    if (positionSolved && minSleepTime >= World.TIME_TO_SLEEP) {
      for (var i = 0; i < this.bodyArr.length; i++) {
        var body = this.bodyArr[i];
        if (!body)
          continue;
        body.awake(false);
      }
    }
  }
};
World.prototype.getBounds = function() {
  var bounds = new Bounds();
  for (var i = 0; i < this.bodyArr.length; i++)
    for (var j = 0; j < this.bodyArr[i].shapeArr.length; j++)
      bounds.addBounds(this.bodyArr[i].shapeArr[j].bounds);
  return bounds;
};

// src/joints/joint_mouse.js
var MouseJoint = function(mouseBody, body, anchor) {
  if (arguments.length == 0)
    return;
  Joint.call(this, Joint.TYPE_MOUSE, mouseBody, body, true);
  this.anchor1 = this.body1.getLocalPoint(anchor);
  this.anchor2 = this.body2.getLocalPoint(anchor);
  this.gamma = 0;
  this.beta_c = 0;
  this.frequencyHz = 5;
  this.dampingRatio = 0.9;
  this.lambda_acc = new vec22(0, 0);
};
MouseJoint.prototype = new Joint();
MouseJoint.prototype.constructor = MouseJoint;
MouseJoint.prototype.setSpringFrequencyHz = function(frequencyHz) {
  this.frequencyHz = frequencyHz;
};
MouseJoint.prototype.setSpringDampingRatio = function(dampingRatio) {
  this.dampingRatio = dampingRatio;
};
MouseJoint.prototype.initSolver = function(dt, warmStarting) {
  var body1 = this.body1;
  var body2 = this.body2;
  this.maxImpulse = this.maxForce * dt;
  var omega = 2 * Math.PI * this.frequencyHz;
  var k = body2.m * (omega * omega);
  var d = body2.m * 2 * this.dampingRatio * omega;
  this.gamma = (d + k * dt) * dt;
  this.gamma = this.gamma == 0 ? 0 : 1 / this.gamma;
  var beta = dt * k * this.gamma;
  this.r2 = body2.xf.rotate(vec22.sub(this.anchor2, body2.centroid));
  var r2 = this.r2;
  var r2y_i = r2.y * body2.i_inv;
  var k11 = body2.m_inv + r2.y * r2y_i + this.gamma;
  var k12 = -r2.x * r2y_i;
  var k22 = body2.m_inv + r2.x * r2.x * body2.i_inv + this.gamma;
  this.em_inv = new mat2(k11, k12, k12, k22);
  var c = vec22.sub(vec22.add(body2.p, this.r2), body1.p);
  this.beta_c = vec22.scale(c, beta);
  body2.w *= 0.98;
  if (warmStarting) {
    body2.v.mad(this.lambda_acc, body2.m_inv);
    body2.w += vec22.cross(this.r2, this.lambda_acc) * body2.i_inv;
  } else {
    this.lambda_acc.set(0, 0);
  }
};
MouseJoint.prototype.solveVelocityConstraints = function() {
  var body2 = this.body2;
  var cdot = vec22.mad(body2.v, vec22.perp(this.r2), body2.w);
  var soft = vec22.mad(this.beta_c, this.lambda_acc, this.gamma);
  var lambda = this.em_inv.solve(vec22.add(cdot, soft).neg());
  var lambda_old = this.lambda_acc.duplicate();
  this.lambda_acc.addself(lambda);
  var lsq = this.lambda_acc.lengthsq();
  if (lsq > this.maxImpulse * this.maxImpulse) {
    this.lambda_acc.scale(this.maxImpulse / Math.sqrt(lsq));
  }
  lambda = vec22.sub(this.lambda_acc, lambda_old);
  body2.v.mad(lambda, body2.m_inv);
  body2.w += vec22.cross(this.r2, lambda) * body2.i_inv;
};
MouseJoint.prototype.solvePositionConstraints = function() {
  return true;
};
MouseJoint.prototype.getReactionForce = function(dt_inv) {
  return vec22.scale(this.lambda_acc, dt_inv);
};
MouseJoint.prototype.getReactionTorque = function(dt_inv) {
  return 0;
};

// src/Runner.js
var HELPER_JOINT_ANCHOR_RADIUS = pixel2meter(2.5);
var PIXEL_UNIT = pixel2meter(1);
var App = Symbol("app");
var Pause = Symbol("pause");
var Events = Symbol("events");
var events = ["beforeRenderBody", "beforeRenderShape", "beforeRenderFrame", "afterRenderFrame"];
var definePrivate = (obj, name, symbol, set) => Object.defineProperty(obj, name, { get() {
  return this[symbol];
}, set });
function Runner(renderer, app) {
  this.renderer = renderer;
  this[App] = app;
  this[Events] = {};
  this.PIXEL_UNIT = PIXEL_UNIT;
  this.settings = Object.assign({
    gravity: new vec22(0, -10),
    frameRateHz: 60,
    velocityIterations: 8,
    positionIterations: 4,
    warmStarting: true,
    allowSleep: true,
    enableDirtyBounds: true,
    showJoints: true,
    backgroundColor: "rgb(95, 105, 118)",
    jointAnchorColor: "#11cf00"
  }, app.settings || {});
  const camera = this.camera = Object.assign({
    origin: new vec22(0, 0),
    scale: 1,
    minScale: 0.1,
    maxScale: 10,
    minX: -Infinity,
    maxX: Infinity,
    minY: -Infinity,
    maxY: Infinity,
    fit: true,
    bounds: new Bounds(),
    scroll: new vec22(0, 0),
    worldOrigin: {}
  }, app.camera || {});
  Object.defineProperty(this.camera.worldOrigin, "x", { get() {
    return camera.origin.x / camera.scale / meter2pixel(1);
  } });
  Object.defineProperty(this.camera.worldOrigin, "y", { get() {
    return camera.origin.y / camera.scale / meter2pixel(1);
  } });
  this.dirtyBounds = new Bounds();
  collision.init();
  this.world = new World(renderer);
  this.resetScene();
  definePrivate(this, "app", App, (value) => {
    this[App] = value;
    this.settings = Object.assign(this.settings, value.settings || {});
    this.camera = Object.assign(this.camera, value.camera || {});
    this.resetScene();
    this[Pause] && this.start();
  });
  definePrivate(this, "pause", Pause, (value) => {
    if (!value)
      this.start();
    else
      this[Pause] = true;
  });
  this.onResize = () => {
    this.renderer.resize();
    this.dirtyBoundsToFullscreen();
    this.static_outdated = true;
    if (this[Pause])
      this.drawFrame(0);
  };
  window.addEventListener("resize", this.onResize);
  window.addEventListener("orientationchange", this.onResize);
  this.onResize();
  this.start();
}
Runner.prototype.start = function() {
  this[Pause] = false;
  const update = () => {
    this.runFrame();
    this[Pause] || window.requestAnimationFrame(update);
  };
  window.requestAnimationFrame(update);
};
Runner.prototype.destroy = function() {
  window.removeEventListener("resize", this.onResize);
  window.removeEventListener("orientationchange", this.onResize);
  this[Pause] = true;
  this.world.clear();
};
Runner.prototype.resetScene = function() {
  this.world.clear();
  this.world.gravity.copy(this.settings.gravity);
  this[App].init(this.world);
  this.initFrame();
};
Runner.prototype.initFrame = function() {
  this.time = {
    fps: 0,
    fps_frameCount: 0,
    fps_time: 0,
    frameCount: 0,
    lastTime: Date.now(),
    timeDelta: 0
  };
  this.dirtyBoundsToFullscreen();
  this.static_outdated = true;
};
Runner.prototype.runFrame = function() {
  var time = Date.now();
  var frameTime = (time - this.time.lastTime) / 1e3;
  frameTime = Math.floor(frameTime * 60 + 0.5) / 60;
  this.time.lastTime = time;
  var h = 1 / this.settings.frameRateHz;
  this.time.timeDelta += frameTime;
  if (this[Pause])
    this.time.timeDelta = h;
  stats.timeStep = 0;
  stats.stepCount = 0;
  for (var maxSteps = 4; maxSteps > 0 && this.time.timeDelta >= h; maxSteps--) {
    var t0 = Date.now();
    this.world.step(h, this.settings.velocityIterations, this.settings.positionIterations, this.settings.warmStarting, this.settings.allowSleep);
    stats.timeStep += Date.now() - t0;
    stats.stepCount++;
    this.time.timeDelta -= h;
  }
  if (this.time.timeDelta > h)
    this.time.timeDelta = 0;
  this[App].runFrame && this[App].runFrame();
  if (stats.stepCount > 0)
    this.render(frameTime);
  this.time.frameCount++;
  this.time.fps_frameCount++;
  this.time.fps_time += frameTime;
  if (this.time.fps_time >= 1) {
    this.time.fps = this.time.fps_frameCount / this.time.fps_time;
    this.time.fps_time -= 1;
    this.time.fps_frameCount = 0;
  }
};
Runner.prototype.render = function(frameTime) {
  var t0 = Date.now();
  this.drawFrame(frameTime);
  stats.timeDrawFrame = Date.now() - t0;
};
Runner.prototype.redraw = function() {
  this.dirtyBoundsToFullscreen();
  this.static_outdated = true;
  this.drawFrame(0);
};
Runner.prototype.drawFrame = function(frameTime = 0) {
  var _a, _b, _c, _d, _e, _f, _g;
  (_b = (_a = this[Events]) == null ? void 0 : _a.beforeRenderFrame) == null ? void 0 : _b.forEach((callback) => callback(frameTime));
  for (var i = 0; i < this.world.bodyArr.length; i++) {
    var body = this.world.bodyArr[i];
    (_d = (_c = this[Events]) == null ? void 0 : _c.beforeRenderBody) == null ? void 0 : _d.forEach((callback) => callback(body));
    this.renderer.updateBody(body);
  }
  for (var i = 0; i < this.world.jointArr.length; i++) {
    (_e = this.renderer) == null ? void 0 : _e.updateJoint(this.world.jointArr[i]);
  }
  (_g = (_f = this[Events]) == null ? void 0 : _f.afterRenderFrame) == null ? void 0 : _g.forEach((callback) => callback(frameTime));
};
Runner.prototype.worldToCanvas = function(p) {
  return new vec22(
    this.renderer.width * 0.5 + (p.x * (this.camera.scale * meter2pixel(1)) - this.camera.origin.x),
    this.renderer.height * 0.5 - (p.y * (this.camera.scale * meter2pixel(1)) - this.camera.origin.y)
  );
};
Runner.prototype.canvasToWorld = function(p) {
  return new vec22(
    (this.camera.origin.x + (p.x - this.renderer.width * 0.5)) / (this.camera.scale * meter2pixel(1)),
    (this.camera.origin.y - (p.y - this.renderer.height * 0.5)) / (this.camera.scale * meter2pixel(1))
  );
};
Runner.prototype.dirtyBoundsToFullscreen = function() {
  this.dirtyBounds.set(
    this.canvasToWorld(new vec22(0, this.renderer.height)),
    this.canvasToWorld(new vec22(this.renderer.width, 0))
  );
};
Runner.prototype.fitCameraToBounds = function(bounds, max = false) {
  var scale = new vec22(
    this.renderer.width / meter2pixel(1) / (bounds.maxs.x - bounds.mins.x),
    this.renderer.height / meter2pixel(1) / (bounds.maxs.y - bounds.mins.y)
  );
  this.camera.scale = Math[max ? "max" : "min"](scale.x, scale.y);
  this.moveCameraTo((bounds.maxs.x + bounds.mins.x) * 0.5, (bounds.maxs.y + bounds.mins.y) * 0.5);
};
Runner.prototype.fitCameraToWorld = function(max = false) {
  this.fitCameraToBounds(this.world.getBounds(), max);
};
Runner.prototype.validateCameraBounds = function(x, y) {
  var pos = new vec22(x, y);
  var rw2 = this.renderer.width * 0.5;
  var rh2 = this.renderer.height * 0.5;
  var scale = this.camera.scale * meter2pixel(1);
  var wx = pos.x / scale;
  var wy = pos.y / scale;
  var minX = (wx - this.camera.minX) * scale < rw2;
  var maxX = (this.camera.maxX - wx) * scale < rw2;
  var minY = (wy - this.camera.minY) * scale < rh2;
  var maxY = (this.camera.maxY - wy) * scale < rh2;
  if (minX && maxX)
    pos.x = (this.camera.maxX + this.camera.minX) * 0.5 * scale;
  else {
    if (minX)
      pos.x = this.camera.minX * scale + rw2;
    if (maxX)
      pos.x = this.camera.maxX * scale - rw2;
  }
  if (minY && maxY)
    pos.y = (this.camera.maxY + this.camera.minY) * 0.5 * scale;
  else {
    if (minY)
      pos.y = this.camera.minY * scale + rh2;
    if (maxY)
      pos.y = this.camera.maxY * scale - rh2;
  }
  return pos;
};
Runner.prototype.restrictCameraToBounds = function(bounds, max = false, scaleFactor = 4) {
  this.camera.minX = bounds.mins.x;
  this.camera.maxX = bounds.maxs.x;
  this.camera.minY = bounds.mins.y;
  this.camera.maxY = bounds.maxs.y;
  var scale_v = new vec22(
    this.renderer.width / meter2pixel(1) / (bounds.maxs.x - bounds.mins.x),
    this.renderer.height / meter2pixel(1) / (bounds.maxs.y - bounds.mins.y)
  );
  this.camera.minScale = Math[max ? "max" : "min"](scale_v.x, scale_v.y);
  this.camera.maxScale = this.camera.minScale * scaleFactor;
  this.camera.scale = Clamp(this.camera.scale, this.camera.minScale, this.camera.maxScale);
  this.camera.origin = this.validateCameraBounds(
    this.camera.origin.x,
    this.camera.origin.y
  );
  this.redraw();
};
Runner.prototype.restrictCameraToWorld = function(max = false, scaleFactor = 4) {
  this.restrictCameraToBounds(this.world.getBounds(), max, scaleFactor);
};
Runner.prototype.resetCameraRestriction = function() {
  this.camera.minX = -Infinity;
  this.camera.maxX = Infinity;
  this.camera.minY = -Infinity;
  this.camera.minScale = 0.1;
  this.camera.maxScale = 10;
  this.redraw();
};
Runner.prototype.moveCameraTo = function(x, y) {
  this.camera.origin = this.validateCameraBounds(
    x * this.camera.scale * meter2pixel(1),
    y * this.camera.scale * meter2pixel(1)
  );
  this.redraw();
};
Runner.prototype.on = function(event, callback) {
  if (!events.includes(event))
    throw 'Unknown event "'.concat(event, '"');
  if (this[Events][event]) {
    if (this[Events][event].find((cb) => cb === callback))
      return;
  } else
    this[Events][event] = [];
  this[Events][event].push(callback);
};
Runner.prototype.off = function(event, callback) {
  if (!events.includes(event))
    throw 'Unknown event "'.concat(event, '"');
  if (!this[Events][event])
    return;
  const index = this[Events][event].findIndex((cb) => cb === callback);
  if (index !== -1)
    this[Events][event].splice(index, 1);
};

// src/Interaction.js
var SELECTABLE_LINE_DIST_THREHOLD = pixel2meter(isAppleMobileDevice() ? 8 : 4);
var Events2 = Symbol("events");
var events2 = ["mousedown", "mouseup", "mousemove"];
function Interaction(runner, settings) {
  this.settings = Object.assign({
    pick: true,
    zoom: true
  }, settings || {});
  this.runner = runner;
  this.runner.interaction = this;
  this.SELECTABLE_LINE_DIST_THREHOLD = SELECTABLE_LINE_DIST_THREHOLD;
  this.state = {
    mouseDown: false,
    pointerDownMoving: false
    /*
    mouseDownPosition:  new vec2(),
    mousePositionOld:   new vec2(),
    touchPosOld:        new Array(2),
    touchDist:          undefined,
    gestureStartScale:  undefined,*/
  };
  this.mouseJoint = null;
  this.mouseBody = new Body(Body.KINETIC);
  this.mouseBody.resetMassData();
  this.runner.world.addBody(this.mouseBody);
  this[Events2] = {};
  if (!this.runner.renderer.two)
    return;
  var renderer = this.runner.renderer;
  var interaction = this;
  const { Two: Two2, two, stage, camera } = renderer;
  var domElement = two.renderer.domElement;
  var mouse = new Two2.Vector();
  var touches = {};
  var distance2 = 0;
  var dragging = false;
  const createMouseJoint = (world_pos_vec) => {
    interaction.mouseBody.p.copy(world_pos_vec);
    interaction.mouseBody.syncTransform();
    interaction.mouseJoint = new MouseJoint(interaction.mouseBody, dragging, world_pos_vec);
    interaction.mouseJoint.maxForce = dragging.m * 5e4;
    runner.world.addJoint(interaction.mouseJoint);
  };
  const mousedown = (event) => {
    var _a, _b;
    this.state.mouseDown = true;
    this.state.pointerDownMoving = false;
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    interaction.removeJoint();
    const world_pos = camera.screenToWorld(event.offsetX, event.offsetY);
    const world_pos_vec = new vec22(world_pos.x, -world_pos.y);
    dragging = runner.world.findBodyByPoint(world_pos_vec);
    var block = false;
    if ((_b = (_a = this[Events2]) == null ? void 0 : _a.mousedown) == null ? void 0 : _b.length) {
      this[Events2].mousedown.forEach((callback) => {
        if (callback(dragging, new vec22(event.offsetX, event.offsetY), world_pos_vec))
          block = true;
      });
      if (this.runner.pause)
        this.runner.drawFrame(0);
    }
    if (block) {
      dragging = void 0;
      this.state.mouseDown = false;
    } else {
      if (this.settings.pick && dragging) {
        if (dragging.isStatic())
          dragging = void 0;
        else
          createMouseJoint(world_pos_vec);
      }
    }
  };
  const mousemove = (event) => {
    var _a, _b;
    if (this.state.mouseDown) {
      this.state.pointerDownMoving = true;
      if (dragging) {
        const world_pos = camera.screenToWorld(event.offsetX, event.offsetY);
        const world_pos_vec = new vec22(world_pos.x, -world_pos.y);
        interaction.mouseBody.p.copy(world_pos_vec);
        interaction.mouseBody.syncTransform();
      } else {
        var dx = event.clientX - mouse.x;
        var dy = event.clientY - mouse.y;
        camera.translateSurface(dx, dy);
        mouse.set(event.clientX, event.clientY);
      }
    }
    if ((_b = (_a = this[Events2]) == null ? void 0 : _a.mousemove) == null ? void 0 : _b.length) {
      const rect = runner.renderer.canvas.getBoundingClientRect();
      const world_pos = camera.screenToWorld(event.offsetX, event.offsetY);
      const world_pos_vec = new vec22(world_pos.x, -world_pos.y);
      this[Events2].mousemove.forEach((callback) => callback(new vec22(event.offsetX, event.offsetY), world_pos_vec));
      if (this.runner.pause)
        this.runner.drawFrame(0);
    }
    ;
  };
  const mouseup = (event) => {
    var _a, _b;
    if ((_b = (_a = this[Events2]) == null ? void 0 : _a.mouseup) == null ? void 0 : _b.length) {
      const rect = runner.renderer.canvas.getBoundingClientRect();
      var x = event.offsetX - rect.left;
      var y = event.offsetY - rect.top;
      const world_pos = camera.screenToWorld(x, y);
      const world_pos_vec = new vec22(world_pos.x, -world_pos.y);
      this[Events2].mouseup.forEach((callback) => callback(
        event.type == "mouseleave" ? void 0 : runner.world.findBodyByPoint(world_pos_vec),
        new vec22(x, y),
        world_pos_vec,
        this.state.pointerDownMoving
      ));
    }
    ;
    this.state.mouseDown = false;
    interaction.removeJoint();
  };
  const mouseleave = (event) => {
    mouseup(event);
  };
  const mousewheel = (event) => {
    var dy = (event.wheelDeltaY || -event.deltaY) / 1e3;
    var rect = domElement.getBoundingClientRect();
    camera.zoomBy(dy, event.clientX - rect.left, event.clientY - rect.top);
    event.preventDefault();
  };
  const touchstart = (event) => {
    switch (event.touches.length) {
      case 2:
        pinchstart(event);
        break;
      case 1:
        panstart(event);
        break;
    }
    e.preventDefault();
  };
  const touchmove = (event) => {
    switch (event.touches.length) {
      case 2:
        pinchmove(event);
        break;
      case 1:
        panmove(event);
        break;
    }
    event.preventDefault();
  };
  const touchend = (event) => {
    interaction.removeJoint();
    touches = {};
    var touch = event.touches[0];
    if (touch) {
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
    }
    event.preventDefault();
  };
  const panstart = (event) => {
    var touch = event.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
    var rect = runner.renderer.canvas.getBoundingClientRect();
    startDrag(touch.clientX - rect.left, touch.clientY - rect.top);
  };
  const panmove = (event) => {
    var touch = event.touches[0];
    if (dragging) {
      const rect = runner.renderer.canvas.getBoundingClientRect();
      const world_pos = camera.screenToWorld(touch.clientX - rect.left, touch.clientY - rect.top);
      const p = new vec22(world_pos.x, -world_pos.y);
      interaction.mouseBody.p.copy(p);
      interaction.mouseBody.syncTransform();
    } else {
      var dx = touch.clientX - mouse.x;
      var dy = touch.clientY - mouse.y;
      camera.translateSurface(dx, dy);
      mouse.set(touch.clientX, touch.clientY);
    }
  };
  const pinchstart = (event) => {
    var [a, b] = event.touches;
    var dx = b.clientX - a.clientX;
    var dy = b.clientY - a.clientY;
    distance2 = Math.sqrt(dx * dx + dy * dy);
    mouse.x = dx / 2 + a.clientX;
    mouse.y = dy / 2 + a.clientY;
  };
  const pinchmove = (event) => {
    var [a, b] = event.touches;
    var dx = b.clientX - a.clientX;
    var dy = b.clientY - a.clientY;
    var mx = dx / 2 + a.clientX;
    var my = dy / 2 + a.clientY;
    camera.translateSurface(mx - mouse.x, my - mouse.y);
    mouse.x = mx;
    mouse.y = my;
    var d = Math.sqrt(dx * dx + dy * dy);
    var delta = d - distance2;
    var rect = domElement.getBoundingClientRect();
    camera.zoomBy(delta / 250, mouse.x - rect.left, mouse.y - rect.top);
    distance2 = d;
  };
  domElement.addEventListener("mousedown", mousedown, false);
  domElement.addEventListener("mouseleave", mouseleave, false);
  domElement.addEventListener("mousewheel", mousewheel, false);
  domElement.addEventListener("wheel", mousewheel, false);
  domElement.addEventListener("touchstart", touchstart, false);
  domElement.addEventListener("touchmove", touchmove, false);
  domElement.addEventListener("touchend", touchend, false);
  domElement.addEventListener("touchcancel", touchend, false);
  domElement.addEventListener("mousemove", mousemove, false);
  window.addEventListener("mouseup", mouseup, false);
}
Interaction.prototype.destroy = function() {
  this.removeJoint();
  this.runner.world.removeBody(this.mouseBody);
};
Interaction.prototype.removeJoint = function() {
  if (this.mouseJoint) {
    this.runner.world.removeJoint(this.mouseJoint);
    this.mouseJoint = null;
  }
};
Interaction.prototype.on = function(event, callback) {
  if (!events2.includes(event))
    throw 'Unknown event "'.concat(event, '"');
  if (this[Events2][event]) {
    if (this[Events2][event].find((cb) => cb === callback))
      return;
  } else
    this[Events2][event] = [];
  this[Events2][event].push(callback);
};
Interaction.prototype.off = function(event, callback) {
  if (!events2.includes(event))
    throw 'Unknown event "'.concat(event, '"');
  if (!this[Events2][event])
    return;
  const index = this[Events2][event].findIndex((cb) => cb === callback);
  if (index !== -1)
    this[Events2][event].splice(index, 1);
};

// src/joints/joint_rope.js
var RopeJoint2 = function(body1, body2, anchor1, anchor2) {
  Joint.call(this, Joint.TYPE_ROPE, body1, body2, true);
  this.anchor1 = this.body1.getLocalPoint(anchor1);
  this.anchor2 = this.body2.getLocalPoint(anchor2);
  this.maxDistance = vec22.dist(anchor1, anchor2);
  this.lambda_acc = 0;
};
RopeJoint2.prototype = new Joint();
RopeJoint2.prototype.constructor = RopeJoint2;
RopeJoint2.prototype.setWorldAnchor1 = function(anchor1) {
  this.anchor1 = this.body1.getLocalPoint(anchor1);
  this.maxDistance = vec22.dist(anchor1, this.getWorldAnchor2());
};
RopeJoint2.prototype.setWorldAnchor2 = function(anchor2) {
  this.anchor2 = this.body2.getLocalPoint(anchor2);
  this.maxDistance = vec22.dist(anchor2, this.getWorldAnchor1());
};
RopeJoint2.prototype.serialize = function() {
  return {
    "type": "RopeJoint",
    "body1": this.body1.id,
    "body2": this.body2.id,
    "anchor1": this.body1.getWorldPoint(this.anchor1),
    "anchor2": this.body2.getWorldPoint(this.anchor2),
    "collideConnected": this.collideConnected,
    "maxForce": this.maxForce,
    "breakable": this.breakable
  };
};
RopeJoint2.prototype.initSolver = function(dt, warmStarting) {
  var body1 = this.body1;
  var body2 = this.body2;
  this.maxImpulse = this.maxForce * dt;
  this.r1 = body1.xf.rotate(vec22.sub(this.anchor1, body1.centroid));
  this.r2 = body2.xf.rotate(vec22.sub(this.anchor2, body2.centroid));
  var d = vec22.sub(vec22.add(body2.p, this.r2), vec22.add(body1.p, this.r1));
  this.distance = d.length();
  var c = this.distance - this.maxDistance;
  if (c > 0) {
    this.cdt = 0;
    this.limitState = Joint.LIMIT_STATE_AT_UPPER;
  } else {
    this.cdt = c / dt;
    this.limitState = Joint.LIMIT_STATE_INACTIVE;
  }
  if (this.distance > Joint.LINEAR_SLOP) {
    this.u = vec22.scale(d, 1 / this.distance);
  } else {
    this.u = vec22.zero;
  }
  this.s1 = vec22.cross(this.r1, this.u);
  this.s2 = vec22.cross(this.r2, this.u);
  var em_inv = body1.m_inv + body2.m_inv + body1.i_inv * this.s1 * this.s1 + body2.i_inv * this.s2 * this.s2;
  this.em = em_inv == 0 ? 0 : 1 / em_inv;
  if (warmStarting) {
    var impulse = vec22.scale(this.u, this.lambda_acc);
    body1.v.mad(impulse, -body1.m_inv);
    body1.w -= this.s1 * this.lambda_acc * body1.i_inv;
    body2.v.mad(impulse, body2.m_inv);
    body2.w += this.s2 * this.lambda_acc * body2.i_inv;
  } else {
    this.lambda_acc = 0;
  }
};
RopeJoint2.prototype.solveVelocityConstraints = function() {
  var body1 = this.body1;
  var body2 = this.body2;
  var cdot = this.u.dot(vec22.sub(body2.v, body1.v)) + this.s2 * body2.w - this.s1 * body1.w;
  var lambda = -this.em * (cdot + this.cdt);
  var lambda_old = this.lambda_acc;
  this.lambda_acc = Math.min(lambda_old + lambda, 0);
  lambda = this.lambda_acc - lambda_old;
  var impulse = vec22.scale(this.u, lambda);
  body1.v.mad(impulse, -body1.m_inv);
  body1.w -= this.s1 * lambda * body1.i_inv;
  body2.v.mad(impulse, body2.m_inv);
  body2.w += this.s2 * lambda * body2.i_inv;
};
RopeJoint2.prototype.solvePositionConstraints = function() {
  var body1 = this.body1;
  var body2 = this.body2;
  var r1 = vec22.rotate(vec22.sub(this.anchor1, body1.centroid), body1.a);
  var r2 = vec22.rotate(vec22.sub(this.anchor2, body2.centroid), body2.a);
  var d = vec22.sub(vec22.add(body2.p, r2), vec22.add(body1.p, r1));
  var dist = d.length();
  var u = vec22.scale(d, 1 / dist);
  var c = dist - this.maxDistance;
  var correction = Clamp(c, 0, Joint.MAX_LINEAR_CORRECTION);
  var s1 = vec22.cross(r1, u);
  var s2 = vec22.cross(r2, u);
  var em_inv = body1.m_inv + body2.m_inv + body1.i_inv * s1 * s1 + body2.i_inv * s2 * s2;
  var lambda_dt = em_inv == 0 ? 0 : -correction / em_inv;
  var impulse_dt = vec22.scale(u, lambda_dt);
  body1.p.mad(impulse_dt, -body1.m_inv);
  body1.a -= s1 * lambda_dt * body1.i_inv;
  body2.p.mad(impulse_dt, body2.m_inv);
  body2.a += s2 * lambda_dt * body2.i_inv;
  return c < Joint.LINEAR_SLOP;
};
RopeJoint2.prototype.getReactionForce = function(dt_inv) {
  return vec22.scale(this.u, this.lambda_acc * dt_inv);
};
RopeJoint2.prototype.getReactionTorque = function(dt_inv) {
  return 0;
};

// src/joints/joint_weld.js
var WeldJoint2 = function(body1, body2, anchor) {
  Joint.call(this, Joint.TYPE_WELD, body1, body2, false);
  this.anchor1 = this.body1.getLocalPoint(anchor);
  this.anchor2 = this.body2.getLocalPoint(anchor);
  this.gamma = 0;
  this.beta_c = 0;
  this.frequencyHz = 0;
  this.dampingRatio = 0;
  this.lambda_acc = new vec3(0, 0, 0);
};
WeldJoint2.prototype = new Joint();
WeldJoint2.prototype.constructor = WeldJoint2;
WeldJoint2.prototype.setWorldAnchor1 = function(anchor1) {
  this.anchor1 = this.body1.getLocalPoint(anchor1);
  this.anchor2 = this.body2.getLocalPoint(anchor1);
};
WeldJoint2.prototype.setWorldAnchor2 = function(anchor2) {
  this.anchor1 = this.body1.getLocalPoint(anchor2);
  this.anchor2 = this.body2.getLocalPoint(anchor2);
};
WeldJoint2.prototype.serialize = function() {
  return {
    "type": "WeldJoint",
    "body1": this.body1.id,
    "body2": this.body2.id,
    "anchor1": this.body1.getWorldPoint(this.anchor1),
    "anchor2": this.body2.getWorldPoint(this.anchor2),
    "collideConnected": this.collideConnected,
    "maxForce": this.maxForce,
    "breakable": this.breakable,
    "frequencyHz": this.frequencyHz,
    "dampingRatio": this.dampingRatio
  };
};
WeldJoint2.prototype.setSpringFrequencyHz = function(frequencyHz) {
  this.frequencyHz = frequencyHz;
};
WeldJoint2.prototype.setSpringDampingRatio = function(dampingRatio) {
  this.dampingRatio = dampingRatio;
};
WeldJoint2.prototype.initSolver = function(dt, warmStarting) {
  var body1 = this.body1;
  var body2 = this.body2;
  this.maxImpulse = this.maxForce * dt;
  this.r1 = body1.xf.rotate(vec22.sub(this.anchor1, body1.centroid));
  this.r2 = body2.xf.rotate(vec22.sub(this.anchor2, body2.centroid));
  var sum_m_inv = body1.m_inv + body2.m_inv;
  var r1 = this.r1;
  var r2 = this.r2;
  var r1x_i = r1.x * body1.i_inv;
  var r1y_i = r1.y * body1.i_inv;
  var r2x_i = r2.x * body2.i_inv;
  var r2y_i = r2.y * body2.i_inv;
  var k11 = sum_m_inv + r1.y * r1y_i + r2.y * r2y_i;
  var k12 = -r1.x * r1y_i - r2.x * r2y_i;
  var k13 = -r1y_i - r2y_i;
  var k22 = sum_m_inv + r1.x * r1x_i + r2.x * r2x_i;
  var k23 = r1x_i + r2x_i;
  var k33 = body1.i_inv + body2.i_inv;
  this.em_inv = new mat3(k11, k12, k13, k12, k22, k23, k13, k23, k33);
  if (this.frequencyHz > 0) {
    var m = k33 > 0 ? 1 / k33 : 0;
    var omega = 2 * Math.PI * this.frequencyHz;
    var k = m * omega * omega;
    var c = m * 2 * this.dampingRatio * omega;
    this.gamma = (c + k * dt) * dt;
    this.gamma = this.gamma == 0 ? 0 : 1 / this.gamma;
    var beta = dt * k * this.gamma;
    var pc = body2.a - body1.a;
    this.beta_c = beta * pc;
    this.em_inv._33 += this.gamma;
  } else {
    this.gamma = 0;
    this.beta_c = 0;
  }
  if (warmStarting) {
    var lambda_xy = new vec22(this.lambda_acc.x, this.lambda_acc.y);
    var lambda_z = this.lambda_acc.z;
    body1.v.mad(lambda_xy, -body1.m_inv);
    body1.w -= (vec22.cross(this.r1, lambda_xy) + lambda_z) * body1.i_inv;
    body2.v.mad(lambda_xy, body2.m_inv);
    body2.w += (vec22.cross(this.r2, lambda_xy) + lambda_z) * body2.i_inv;
  } else {
    this.lambda_acc.set(0, 0, 0);
  }
};
WeldJoint2.prototype.solveVelocityConstraints = function() {
  var body1 = this.body1;
  var body2 = this.body2;
  if (this.frequencyHz > 0) {
    var cdot2 = body2.w - body1.w;
    var lambda_z = -(cdot2 + this.beta_c + this.gamma * this.lambda_acc.z) / this.em_inv._33;
    body1.w -= lambda_z * body1.i_inv;
    body2.w += lambda_z * body2.i_inv;
    var v1 = vec22.mad(body1.v, vec22.perp(this.r1), body1.w);
    var v2 = vec22.mad(body2.v, vec22.perp(this.r2), body2.w);
    var cdot1 = vec22.sub(v2, v1);
    var lambda_xy = this.em_inv.solve2x2(cdot1.neg());
    this.lambda_acc.x += lambda_xy.x;
    this.lambda_acc.y += lambda_xy.y;
    this.lambda_acc.z += lambda_z;
    body1.v.mad(lambda_xy, -body1.m_inv);
    body1.w -= vec22.cross(this.r1, lambda_xy) * body1.i_inv;
    body2.v.mad(lambda_xy, body2.m_inv);
    body2.w += vec22.cross(this.r2, lambda_xy) * body2.i_inv;
  } else {
    var v1 = vec22.mad(body1.v, vec22.perp(this.r1), body1.w);
    var v2 = vec22.mad(body2.v, vec22.perp(this.r2), body2.w);
    var cdot1 = vec22.sub(v2, v1);
    var cdot2 = body2.w - body1.w;
    var cdot = vec3.fromVec2(cdot1, cdot2);
    var lambda = this.em_inv.solve(cdot.neg());
    this.lambda_acc.addself(lambda);
    var lambda_xy = new vec22(lambda.x, lambda.y);
    body1.v.mad(lambda_xy, -body1.m_inv);
    body1.w -= (vec22.cross(this.r1, lambda_xy) + lambda.z) * body1.i_inv;
    body2.v.mad(lambda_xy, body2.m_inv);
    body2.w += (vec22.cross(this.r2, lambda_xy) + lambda.z) * body2.i_inv;
  }
};
WeldJoint2.prototype.solvePositionConstraints = function() {
  var body1 = this.body1;
  var body2 = this.body2;
  var r1 = vec22.rotate(vec22.sub(this.anchor1, body1.centroid), body1.a);
  var r2 = vec22.rotate(vec22.sub(this.anchor2, body2.centroid), body2.a);
  var sum_m_inv = body1.m_inv + body2.m_inv;
  var r1x_i = r1.x * body1.i_inv;
  var r1y_i = r1.y * body1.i_inv;
  var r2x_i = r2.x * body2.i_inv;
  var r2y_i = r2.y * body2.i_inv;
  var k11 = sum_m_inv + r1.y * r1y_i + r2.y * r2y_i;
  var k12 = -r1.x * r1y_i - r2.x * r2y_i;
  var k13 = -r1y_i - r2y_i;
  var k22 = sum_m_inv + r1.x * r1x_i + r2.x * r2x_i;
  var k23 = r1x_i + r2x_i;
  var k33 = body1.i_inv + body2.i_inv;
  var em_inv = new mat3(k11, k12, k13, k12, k22, k23, k13, k23, k33);
  if (this.frequencyHz > 0) {
    var c1 = vec22.sub(vec22.add(body2.p, r2), vec22.add(body1.p, r1));
    var c2 = 0;
    var correction = vec22.truncate(c1, Joint.MAX_LINEAR_CORRECTION);
    var lambda_dt_xy = em_inv.solve2x2(correction.neg());
    body1.p.mad(lambda_dt_xy, -body1.m_inv);
    body1.a -= vec22.cross(r1, lambda_dt_xy) * body1.i_inv;
    body2.p.mad(lambda_dt_xy, body2.m_inv);
    body2.a += vec22.cross(r2, lambda_dt_xy) * body2.i_inv;
  } else {
    var c1 = vec22.sub(vec22.add(body2.p, r2), vec22.add(body1.p, r1));
    var c2 = body2.a - body1.a;
    var correction = vec3.fromVec2(
      vec22.truncate(c1, Joint.MAX_LINEAR_CORRECTION),
      Clamp(c2, -Joint.MAX_ANGULAR_CORRECTION, Joint.MAX_ANGULAR_CORRECTION)
    );
    var lambda_dt = em_inv.solve(correction.neg());
    var lambda_dt_xy = new vec22(lambda_dt.x, lambda_dt.y);
    body1.p.mad(lambda_dt_xy, -body1.m_inv);
    body1.a -= (vec22.cross(r1, lambda_dt_xy) + lambda_dt.z) * body1.i_inv;
    body2.p.mad(lambda_dt_xy, body2.m_inv);
    body2.a += (vec22.cross(r2, lambda_dt_xy) + lambda_dt.z) * body2.i_inv;
  }
  return c1.length() < Joint.LINEAR_SLOP && Math.abs(c2) <= Joint.ANGULAR_SLOP;
};
WeldJoint2.prototype.getReactionForce = function(dt_inv) {
  return vec22.scale(this.lambda_acc.toVec2(), dt_inv);
};
WeldJoint2.prototype.getReactionTorque = function(dt_inv) {
  return this.lambda_acc.z * dt_inv;
};

// src/joints/joint_wheel.js
var WheelJoint2 = function(body1, body2, anchor1, anchor2) {
  Joint.call(this, Joint.TYPE_WHEEL, body1, body2, true);
  this.anchor1 = this.body1.getLocalPoint(anchor1);
  this.anchor2 = this.body2.getLocalPoint(anchor2);
  var d = vec22.sub(anchor2, anchor1);
  this.restLength = d.length();
  this.u_local = this.body1.getLocalVector(vec22.normalize(d));
  this.n_local = vec22.perp(this.u_local);
  this.lambda_acc = 0;
  this.motorLambda_acc = 0;
  this.springLambda_acc = 0;
  this.motorEnabled = false;
  this.motorSpeed = 0;
  this.maxMotorTorque = 0;
  this.gamma = 0;
  this.beta_c = 0;
  this.frequencyHz = 0;
  this.dampingRatio = 0;
};
WheelJoint2.prototype = new Joint();
WheelJoint2.prototype.constructor = WheelJoint2;
WheelJoint2.prototype.setWorldAnchor1 = function(anchor1) {
  this.anchor1 = this.body1.getLocalPoint(anchor1);
  var d = vec22.sub(this.getWorldAnchor2(), anchor1);
  this.u_local = this.body1.getLocalVector(vec22.normalize(d));
  this.n_local = vec22.perp(this.u_local);
};
WheelJoint2.prototype.setWorldAnchor2 = function(anchor2) {
  this.anchor2 = this.body2.getLocalPoint(anchor2);
  var d = vec22.sub(anchor2, this.getWorldAnchor1());
  this.u_local = this.body1.getLocalVector(vec22.normalize(d));
  this.n_local = vec22.perp(this.u_local);
};
WheelJoint2.prototype.serialize = function() {
  return {
    "type": "WheelJoint",
    "body1": this.body1.id,
    "body2": this.body2.id,
    "anchor1": this.body1.getWorldPoint(this.anchor1),
    "anchor2": this.body2.getWorldPoint(this.anchor2),
    "collideConnected": this.collideConnected,
    "maxForce": this.maxForce,
    "breakable": this.breakable,
    "motorEnabled": this.motorEnabled,
    "motorSpeed": this.motorSpeed,
    "maxMotorTorque": this.maxMotorTorque,
    "frequencyHz": this.frequencyHz,
    "dampingRatio": this.dampingRatio
  };
};
WheelJoint2.prototype.setSpringFrequencyHz = function(frequencyHz) {
  this.frequencyHz = frequencyHz;
};
WheelJoint2.prototype.setSpringDampingRatio = function(dampingRatio) {
  this.dampingRatio = dampingRatio;
};
WheelJoint2.prototype.enableMotor = function(flag) {
  this.motorEnabled = flag;
};
WheelJoint2.prototype.setMotorSpeed = function(speed) {
  this.motorSpeed = speed;
};
WheelJoint2.prototype.setMaxMotorTorque = function(torque) {
  this.maxMotorTorque = torque;
};
WheelJoint2.prototype.initSolver = function(dt, warmStarting) {
  var body1 = this.body1;
  var body2 = this.body2;
  this.maxImpulse = this.maxForce * dt;
  this.r1 = body1.xf.rotate(vec22.sub(this.anchor1, body1.centroid));
  this.r2 = body2.xf.rotate(vec22.sub(this.anchor2, body2.centroid));
  var p1 = vec22.add(body1.p, this.r1);
  var p2 = vec22.add(body2.p, this.r2);
  var d = vec22.sub(p2, p1);
  this.r1_d = vec22.add(this.r1, d);
  this.n = vec22.rotate(this.n_local, body1.a);
  this.sn1 = vec22.cross(this.r1_d, this.n);
  this.sn2 = vec22.cross(this.r2, this.n);
  var em_inv = body1.m_inv + body2.m_inv + body1.i_inv * this.sn1 * this.sn1 + body2.i_inv * this.sn2 * this.sn2;
  this.em = em_inv > 0 ? 1 / em_inv : em_inv;
  if (this.frequencyHz > 0) {
    this.u = vec22.rotate(this.u_local, body1.a);
    this.su1 = vec22.cross(this.r1_d, this.u);
    this.su2 = vec22.cross(this.r2, this.u);
    var springEm_inv = body1.m_inv + body2.m_inv + body1.i_inv * this.su1 * this.su1 + body2.i_inv * this.su2 * this.su2;
    var springEm = springEm_inv == 0 ? 0 : 1 / springEm_inv;
    var omega = 2 * Math.PI * this.frequencyHz;
    var k = springEm * omega * omega;
    var c = springEm * 2 * this.dampingRatio * omega;
    this.gamma = (c + k * dt) * dt;
    this.gamma = this.gamma == 0 ? 0 : 1 / this.gamma;
    var beta = dt * k * this.gamma;
    var pc = vec22.dot(d, this.u) - this.restLength;
    this.beta_c = beta * pc;
    springEm_inv = springEm_inv + this.gamma;
    this.springEm = springEm_inv == 0 ? 0 : 1 / springEm_inv;
  } else {
    this.gamma = 0;
    this.beta_c = 0;
    this.springLambda_acc = 0;
  }
  if (this.motorEnabled) {
    this.maxMotorImpulse = this.maxMotorTorque * dt;
    var motorEm_inv = body1.i_inv + body2.i_inv;
    this.motorEm = motorEm_inv > 0 ? 1 / motorEm_inv : motorEm_inv;
  } else {
    this.motorEm = 0;
    this.motorLambda_acc = 0;
  }
  if (warmStarting) {
    var linearImpulse = vec22.scale(this.n, this.lambda_acc);
    var angularImpulse1 = this.sn1 * this.lambda_acc + this.motorLambda_acc;
    var angularImpulse2 = this.sn2 * this.lambda_acc + this.motorLambda_acc;
    if (this.frequencyHz > 0) {
      linearImpulse.addself(vec22.scale(this.u, this.springLambda_acc));
      angularImpulse1 += this.su1 * this.springLambda_acc;
      angularImpulse2 += this.su2 * this.springLambda_acc;
    }
    body1.v.mad(linearImpulse, -body1.m_inv);
    body1.w -= angularImpulse1 * body1.i_inv;
    body2.v.mad(linearImpulse, body2.m_inv);
    body2.w += angularImpulse2 * body2.i_inv;
  } else {
    this.lambda_acc = 0;
    this.springLambda_acc = 0;
    this.motorLambda_acc = 0;
  }
};
WheelJoint2.prototype.solveVelocityConstraints = function() {
  var body1 = this.body1;
  var body2 = this.body2;
  if (this.frequencyHz > 0) {
    var cdot = this.u.dot(vec22.sub(body2.v, body1.v)) + this.su2 * body2.w - this.su1 * body1.w;
    var soft = this.beta_c + this.gamma * this.springLambda_acc;
    var lambda = -this.springEm * (cdot + soft);
    this.springLambda_acc += lambda;
    var impulse = vec22.scale(this.u, lambda);
    body1.v.mad(impulse, -body1.m_inv);
    body1.w -= this.su1 * lambda * body1.i_inv;
    body2.v.mad(impulse, body2.m_inv);
    body2.w += this.su2 * lambda * body2.i_inv;
  }
  if (this.motorEnabled) {
    var cdot = body2.w - body1.w - this.motorSpeed;
    var lambda = -this.motorEm * cdot;
    var motorLambdaOld = this.motorLambda_acc;
    this.motorLambda_acc = Clamp(this.motorLambda_acc + lambda, -this.maxMotorImpulse, this.maxMotorImpulse);
    lambda = this.motorLambda_acc - motorLambdaOld;
    body1.w -= lambda * body1.i_inv;
    body2.w += lambda * body2.i_inv;
  }
  var cdot = this.n.dot(vec22.sub(body2.v, body1.v)) + this.sn2 * body2.w - this.sn1 * body1.w;
  var lambda = -this.em * cdot;
  this.lambda_acc += lambda;
  var impulse = vec22.scale(this.n, lambda);
  body1.v.mad(impulse, -body1.m_inv);
  body1.w -= this.sn1 * lambda * body1.i_inv;
  body2.v.mad(impulse, body2.m_inv);
  body2.w += this.sn2 * lambda * body2.i_inv;
};
WheelJoint2.prototype.solvePositionConstraints = function() {
  var body1 = this.body1;
  var body2 = this.body2;
  var r1 = vec22.rotate(vec22.sub(this.anchor1, body1.centroid), body1.a);
  var r2 = vec22.rotate(vec22.sub(this.anchor2, body2.centroid), body2.a);
  var p1 = vec22.add(body1.p, r1);
  var p2 = vec22.add(body2.p, r2);
  var d = vec22.sub(p2, p1);
  var r1_d = vec22.add(r1, d);
  var n = vec22.rotate(this.n_local, body1.a);
  var c = vec22.dot(n, d);
  var correction = Clamp(c, -Joint.MAX_LINEAR_CORRECTION, Joint.MAX_LINEAR_CORRECTION);
  var s1 = vec22.cross(r1_d, n);
  var s2 = vec22.cross(r2, n);
  var em_inv = body1.m_inv + body2.m_inv + body1.i_inv * s1 * s1 + body2.i_inv * s2 * s2;
  var k_inv = em_inv == 0 ? 0 : 1 / em_inv;
  var lambda_dt = k_inv * -correction;
  var impulse_dt = vec22.scale(n, lambda_dt);
  body1.p.mad(impulse_dt, -body1.m_inv);
  body1.a -= s1 * lambda_dt * body1.i_inv;
  body2.p.mad(impulse_dt, body2.m_inv);
  body2.a += s2 * lambda_dt * body2.i_inv;
  return Math.abs(c) < Joint.LINEAR_SLOP;
};
WheelJoint2.prototype.getReactionForce = function(dt_inv) {
  return vec22.scale(this.n, this.lambda_acc * dt_inv);
};
WheelJoint2.prototype.getReactionTorque = function(dt_inv) {
  return 0;
};

// src/joints/joint_angle.js
var AngleJoint2 = function(body1, body2) {
  Joint.call(this, Joint.TYPE_ANGLE, body1, body2, true);
  this.anchor1 = new vec22(0, 0);
  this.anchor2 = new vec22(0, 0);
  this.refAngle = body2.a - body1.a;
  this.lambda_acc = 0;
};
AngleJoint2.prototype = new Joint();
AngleJoint2.prototype.constructor = AngleJoint2;
AngleJoint2.prototype.setWorldAnchor1 = function(anchor1) {
  this.anchor1 = new vec22(0, 0);
};
AngleJoint2.prototype.setWorldAnchor2 = function(anchor2) {
  this.anchor2 = new vec22(0, 0);
};
AngleJoint2.prototype.serialize = function() {
  return {
    "type": "AngleJoint",
    "body1": this.body1.id,
    "body2": this.body2.id,
    "collideConnected": this.collideConnected
  };
};
AngleJoint2.prototype.initSolver = function(dt, warmStarting) {
  var body1 = this.body1;
  var body2 = this.body2;
  this.maxImpulse = this.maxForce * dt;
  var em_inv = body1.i_inv + body2.i_inv;
  this.em = em_inv == 0 ? 0 : 1 / em_inv;
  if (warmStarting) {
    body1.w -= this.lambda_acc * body1.i_inv;
    body2.w += this.lambda_acc * body2.i_inv;
  } else {
    this.lambda_acc = 0;
  }
};
AngleJoint2.prototype.solveVelocityConstraints = function() {
  var body1 = this.body1;
  var body2 = this.body2;
  var cdot = body2.w - body1.w;
  var lambda = -this.em * cdot;
  this.lambda_acc += lambda;
  body1.w -= lambda * body1.i_inv;
  body2.w += lambda * body2.i_inv;
};
AngleJoint2.prototype.solvePositionConstraints = function() {
  var body1 = this.body1;
  var body2 = this.body2;
  var c = body2.a - body1.a - this.refAngle;
  var correction = Clamp(c, -Joint.MAX_ANGULAR_CORRECTION, Joint.MAX_ANGULAR_CORRECTION);
  var lambda_dt = this.em * -correction;
  body1.a -= lambda_dt * body1.i_inv;
  body2.a += lambda_dt * body2.i_inv;
  return Math.abs(c) < Joint.ANGULAR_SLOP;
};
AngleJoint2.prototype.getReactionForce = function(dt_inv) {
  return vec22.zero;
};
AngleJoint2.prototype.getReactionTorque = function(dt_inv) {
  return this.lambda_acc * dt_inv;
};

// src/joints/joint_distance.js
var DistanceJoint2 = function(body1, body2, anchor1, anchor2) {
  Joint.call(this, Joint.TYPE_DISTANCE, body1, body2, true);
  this.anchor1 = this.body1.getLocalPoint(anchor1);
  this.anchor2 = this.body2.getLocalPoint(anchor2);
  this.restLength = vec22.dist(anchor1, anchor2);
  this.gamma = 0;
  this.beta_c = 0;
  this.frequencyHz = 0;
  this.dampingRatio = 0;
  this.lambda_acc = 0;
};
DistanceJoint2.prototype = new Joint();
DistanceJoint2.prototype.constructor = DistanceJoint2;
DistanceJoint2.prototype.setWorldAnchor1 = function(anchor1) {
  this.anchor1 = this.body1.getLocalPoint(anchor1);
  this.restLength = vec22.dist(anchor1, this.getWorldAnchor2());
};
DistanceJoint2.prototype.setWorldAnchor2 = function(anchor2) {
  this.anchor2 = this.body2.getLocalPoint(anchor2);
  this.restLength = vec22.dist(anchor2, this.getWorldAnchor1());
};
DistanceJoint2.prototype.serialize = function() {
  return {
    "type": "DistanceJoint",
    "body1": this.body1.id,
    "body2": this.body2.id,
    "anchor1": this.body1.getWorldPoint(this.anchor1),
    "anchor2": this.body2.getWorldPoint(this.anchor2),
    "collideConnected": this.collideConnected,
    "maxForce": this.maxForce,
    "breakable": this.breakable,
    "frequencyHz": this.frequencyHz,
    "dampingRatio": this.dampingRatio
  };
};
DistanceJoint2.prototype.setSpringFrequencyHz = function(frequencyHz) {
  this.frequencyHz = frequencyHz;
};
DistanceJoint2.prototype.setSpringDampingRatio = function(dampingRatio) {
  this.dampingRatio = dampingRatio;
};
DistanceJoint2.prototype.initSolver = function(dt, warmStarting) {
  var body1 = this.body1;
  var body2 = this.body2;
  this.maxImpulse = this.maxForce * dt;
  this.r1 = body1.xf.rotate(vec22.sub(this.anchor1, body1.centroid));
  this.r2 = body2.xf.rotate(vec22.sub(this.anchor2, body2.centroid));
  var d = vec22.sub(vec22.add(body2.p, this.r2), vec22.add(body1.p, this.r1));
  var dist = d.length();
  if (dist > Joint.LINEAR_SLOP) {
    this.u = vec22.scale(d, 1 / dist);
  } else {
    this.u = vec22.zero;
  }
  this.s1 = vec22.cross(this.r1, this.u);
  this.s2 = vec22.cross(this.r2, this.u);
  var em_inv = body1.m_inv + body2.m_inv + body1.i_inv * this.s1 * this.s1 + body2.i_inv * this.s2 * this.s2;
  this.em = em_inv == 0 ? 0 : 1 / em_inv;
  if (this.frequencyHz > 0) {
    var omega = 2 * Math.PI * this.frequencyHz;
    var k = this.em * omega * omega;
    var c = this.em * 2 * this.dampingRatio * omega;
    this.gamma = (c + k * dt) * dt;
    this.gamma = this.gamma == 0 ? 0 : 1 / this.gamma;
    var beta = dt * k * this.gamma;
    var pc = dist - this.restLength;
    this.beta_c = beta * pc;
    em_inv = em_inv + this.gamma;
    this.em = em_inv == 0 ? 0 : 1 / em_inv;
  } else {
    this.gamma = 0;
    this.beta_c = 0;
  }
  if (warmStarting) {
    var impulse = vec22.scale(this.u, this.lambda_acc);
    body1.v.mad(impulse, -body1.m_inv);
    body1.w -= this.s1 * this.lambda_acc * body1.i_inv;
    body2.v.mad(impulse, body2.m_inv);
    body2.w += this.s2 * this.lambda_acc * body2.i_inv;
  } else {
    this.lambda_acc = 0;
  }
};
DistanceJoint2.prototype.solveVelocityConstraints = function() {
  var body1 = this.body1;
  var body2 = this.body2;
  var cdot = this.u.dot(vec22.sub(body2.v, body1.v)) + this.s2 * body2.w - this.s1 * body1.w;
  var soft = this.beta_c + this.gamma * this.lambda_acc;
  var lambda = -this.em * (cdot + soft);
  this.lambda_acc += lambda;
  var impulse = vec22.scale(this.u, lambda);
  body1.v.mad(impulse, -body1.m_inv);
  body1.w -= this.s1 * lambda * body1.i_inv;
  body2.v.mad(impulse, body2.m_inv);
  body2.w += this.s2 * lambda * body2.i_inv;
};
DistanceJoint2.prototype.solvePositionConstraints = function() {
  if (this.frequencyHz > 0) {
    return true;
  }
  var body1 = this.body1;
  var body2 = this.body2;
  var r1 = vec22.rotate(vec22.sub(this.anchor1, body1.centroid), body1.a);
  var r2 = vec22.rotate(vec22.sub(this.anchor2, body2.centroid), body2.a);
  var d = vec22.sub(vec22.add(body2.p, r2), vec22.add(body1.p, r1));
  var dist = d.length();
  var u = vec22.scale(d, 1 / dist);
  var c = dist - this.restLength;
  var correction = Clamp(c, -Joint.MAX_LINEAR_CORRECTION, Joint.MAX_LINEAR_CORRECTION);
  var s1 = vec22.cross(r1, u);
  var s2 = vec22.cross(r2, u);
  var em_inv = body1.m_inv + body2.m_inv + body1.i_inv * s1 * s1 + body2.i_inv * s2 * s2;
  var lambda_dt = em_inv == 0 ? 0 : -correction / em_inv;
  var impulse_dt = vec22.scale(u, lambda_dt);
  body1.p.mad(impulse_dt, -body1.m_inv);
  body1.a -= s1 * lambda_dt * body1.i_inv;
  body2.p.mad(impulse_dt, body2.m_inv);
  body2.a += s2 * lambda_dt * body2.i_inv;
  return Math.abs(c) < Joint.LINEAR_SLOP;
};
DistanceJoint2.prototype.getReactionForce = function(dt_inv) {
  return vec22.scale(this.u, this.lambda_acc * dt_inv);
};
DistanceJoint2.prototype.getReactionTorque = function(dt_inv) {
  return 0;
};

// src/joints/joint_revolute.js
var RevoluteJoint2 = function(body1, body2, anchor) {
  Joint.call(this, Joint.TYPE_REVOLUTE, body1, body2, false);
  this.anchor1 = this.body1.getLocalPoint(anchor);
  this.anchor2 = this.body2.getLocalPoint(anchor);
  this.refAngle = body2.a - body1.a;
  this.lambda_acc = new vec3(0, 0, 0);
  this.motorLambda_acc = 0;
  this.limitEnabled = false;
  this.limitLowerAngle = 0;
  this.limitUpperAngle = 0;
  this.limitState = Joint.LIMIT_STATE_INACTIVE;
  this.motorEnabled = false;
  this.motorSpeed = 0;
  this.maxMotorTorque = 0;
};
RevoluteJoint2.prototype = new Joint();
RevoluteJoint2.prototype.constructor = RevoluteJoint2;
RevoluteJoint2.prototype.setWorldAnchor1 = function(anchor1) {
  this.anchor1 = this.body1.getLocalPoint(anchor1);
  this.anchor2 = this.body2.getLocalPoint(anchor1);
};
RevoluteJoint2.prototype.setWorldAnchor2 = function(anchor2) {
  this.anchor1 = this.body1.getLocalPoint(anchor2);
  this.anchor2 = this.body2.getLocalPoint(anchor2);
};
RevoluteJoint2.prototype.serialize = function() {
  return {
    "type": "RevoluteJoint",
    "body1": this.body1.id,
    "body2": this.body2.id,
    "anchor": this.body1.getWorldPoint(this.anchor1),
    "collideConnected": this.collideConnected,
    "maxForce": this.maxForce,
    "breakable": this.breakable,
    "limitEnabled": this.limitEnabled,
    "limitLowerAngle": this.limitLowerAngle,
    "limitUpperAngle": this.limitUpperAngle,
    "motorEnabled": this.motorEnabled,
    "motorSpeed": this.motorSpeed,
    "maxMotorTorque": this.maxMotorTorque
  };
};
RevoluteJoint2.prototype.enableMotor = function(flag) {
  this.motorEnabled = flag;
};
RevoluteJoint2.prototype.setMotorSpeed = function(speed) {
  this.motorSpeed = speed;
};
RevoluteJoint2.prototype.setMaxMotorTorque = function(torque) {
  this.maxMotorTorque = torque;
};
RevoluteJoint2.prototype.enableLimit = function(flag) {
  this.limitEnabled = flag;
};
RevoluteJoint2.prototype.setLimits = function(lower, upper) {
  this.limitLowerAngle = lower;
  this.limitUpperAngle = upper;
};
RevoluteJoint2.prototype.initSolver = function(dt, warmStarting) {
  var body1 = this.body1;
  var body2 = this.body2;
  this.maxImpulse = this.maxForce * dt;
  if (!this.motorEnabled) {
    this.motorLambda_acc = 0;
  } else {
    this.maxMotorImpulse = this.maxMotorTorque * dt;
  }
  if (this.limitEnabled) {
    var da = body2.a - body1.a - this.refAngle;
    if (Math.abs(this.limitUpperAngle - this.limitLowerAngle) < Joint.ANGULAR_SLOP) {
      this.limitState = Joint.LIMIT_STATE_EQUAL_LIMITS;
    } else if (da <= this.limitLowerAngle) {
      if (this.limitState != Joint.LIMIT_STATE_AT_LOWER) {
        this.lambda_acc.z = 0;
      }
      this.limitState = Joint.LIMIT_STATE_AT_LOWER;
    } else if (da >= this.limitUpperAngle) {
      if (this.limitState != Joint.LIMIT_STATE_AT_UPPER) {
        this.lambda_acc.z = 0;
      }
      this.limitState = Joint.LIMIT_STATE_AT_UPPER;
    } else {
      this.limitState = Joint.LIMIT_STATE_INACTIVE;
      this.lambda_acc.z = 0;
    }
  } else {
    this.limitState = Joint.LIMIT_STATE_INACTIVE;
  }
  this.r1 = body1.xf.rotate(vec22.sub(this.anchor1, body1.centroid));
  this.r2 = body2.xf.rotate(vec22.sub(this.anchor2, body2.centroid));
  var sum_m_inv = body1.m_inv + body2.m_inv;
  var r1 = this.r1;
  var r2 = this.r2;
  var r1x_i = r1.x * body1.i_inv;
  var r1y_i = r1.y * body1.i_inv;
  var r2x_i = r2.x * body2.i_inv;
  var r2y_i = r2.y * body2.i_inv;
  var k11 = sum_m_inv + r1.y * r1y_i + r2.y * r2y_i;
  var k12 = -r1.x * r1y_i - r2.x * r2y_i;
  var k13 = -r1y_i - r2y_i;
  var k22 = sum_m_inv + r1.x * r1x_i + r2.x * r2x_i;
  var k23 = r1x_i + r2x_i;
  var k33 = body1.i_inv + body2.i_inv;
  this.em_inv = new mat3(k11, k12, k13, k12, k22, k23, k13, k23, k33);
  if (k33 != 0) {
    this.em2 = 1 / k33;
  }
  if (warmStarting) {
    var lambda_xy = new vec22(this.lambda_acc.x, this.lambda_acc.y);
    var lambda_z = this.lambda_acc.z + this.motorLambda_acc;
    body1.v.mad(lambda_xy, -body1.m_inv);
    body1.w -= (vec22.cross(this.r1, lambda_xy) + lambda_z) * body1.i_inv;
    body2.v.mad(lambda_xy, body2.m_inv);
    body2.w += (vec22.cross(this.r2, lambda_xy) + lambda_z) * body2.i_inv;
  } else {
    this.lambda_acc.set(0, 0, 0);
    this.motorLambda_acc = 0;
  }
};
RevoluteJoint2.prototype.solveVelocityConstraints = function() {
  var body1 = this.body1;
  var body2 = this.body2;
  if (this.motorEnabled && this.limitState != Joint.LIMIT_STATE_EQUAL_LIMITS) {
    var cdot = body2.w - body1.w - this.motorSpeed;
    var lambda = -this.em2 * cdot;
    var motorLambdaOld = this.motorLambda_acc;
    this.motorLambda_acc = Clamp(this.motorLambda_acc + lambda, -this.maxMotorImpulse, this.maxMotorImpulse);
    lambda = this.motorLambda_acc - motorLambdaOld;
    body1.w -= lambda * body1.i_inv;
    body2.w += lambda * body2.i_inv;
  }
  if (this.limitEnabled && this.limitState != Joint.LIMIT_STATE_INACTIVE) {
    var v1 = vec22.mad(body1.v, vec22.perp(this.r1), body1.w);
    var v2 = vec22.mad(body2.v, vec22.perp(this.r2), body2.w);
    var cdot1 = vec22.sub(v2, v1);
    var cdot2 = body2.w - body1.w;
    var cdot = vec3.fromVec2(cdot1, cdot2);
    var lambda = this.em_inv.solve(cdot.neg());
    if (this.limitState == Joint.LIMIT_STATE_EQUAL_LIMITS) {
      this.lambda_acc.addself(lambda);
    } else if (this.limitState == Joint.LIMIT_STATE_AT_LOWER || this.limitState == Joint.LIMIT_STATE_AT_UPPER) {
      var newLambda_z = this.lambda_acc.z + lambda.z;
      var lowerLimited = this.limitState == Joint.LIMIT_STATE_AT_LOWER && newLambda_z < 0;
      var upperLimited = this.limitState == Joint.LIMIT_STATE_AT_UPPER && newLambda_z > 0;
      if (lowerLimited || upperLimited) {
        var rhs = vec22.add(cdot1, vec22.scale(new vec22(this.em_inv._13, this.em_inv._23), newLambda_z));
        var reduced = this.em_inv.solve2x2(rhs.neg());
        lambda.x = reduced.x;
        lambda.y = reduced.y;
        lambda.z = -this.lambda_acc.z;
        this.lambda_acc.x += lambda.x;
        this.lambda_acc.y += lambda.y;
        this.lambda_acc.z = 0;
      } else {
        this.lambda_acc.addself(lambda);
      }
    }
    var lambda_xy = new vec22(lambda.x, lambda.y);
    body1.v.mad(lambda_xy, -body1.m_inv);
    body1.w -= (vec22.cross(this.r1, lambda_xy) + lambda.z) * body1.i_inv;
    body2.v.mad(lambda_xy, body2.m_inv);
    body2.w += (vec22.cross(this.r2, lambda_xy) + lambda.z) * body2.i_inv;
  } else {
    var v1 = vec22.mad(body1.v, vec22.perp(this.r1), body1.w);
    var v2 = vec22.mad(body2.v, vec22.perp(this.r2), body2.w);
    var cdot = vec22.sub(v2, v1);
    var lambda = this.em_inv.solve2x2(cdot.neg());
    this.lambda_acc.addself(vec3.fromVec2(lambda, 0));
    body1.v.mad(lambda, -body1.m_inv);
    body1.w -= vec22.cross(this.r1, lambda) * body1.i_inv;
    body2.v.mad(lambda, body2.m_inv);
    body2.w += vec22.cross(this.r2, lambda) * body2.i_inv;
  }
};
RevoluteJoint2.prototype.solvePositionConstraints = function() {
  var body1 = this.body1;
  var body2 = this.body2;
  var angularError = 0;
  var positionError = 0;
  if (this.limitEnabled && this.limitState != Joint.LIMIT_STATE_INACTIVE) {
    var da = body2.a - body1.a - this.refAngle;
    var angularImpulseDt = 0;
    if (this.limitState == Joint.LIMIT_STATE_EQUAL_LIMITS) {
      var c = Clamp(da - this.limitLowerAngle, -Joint.MAX_ANGULAR_CORRECTION, Joint.MAX_ANGULAR_CORRECTION);
      angularError = Math.abs(c);
      angularImpulseDt = -this.em2 * c;
    } else if (this.limitState == Joint.LIMIT_STATE_AT_LOWER) {
      var c = da - this.limitLowerAngle;
      angularError = -c;
      c = Clamp(c + Joint.ANGULAR_SLOP, -Joint.MAX_ANGULAR_CORRECTION, 0);
      angularImpulseDt = -this.em2 * c;
    } else if (this.limitState == Joint.LIMIT_STATE_AT_UPPER) {
      var c = da - this.limitUpperAngle;
      angularError = c;
      c = Clamp(c - Joint.ANGULAR_SLOP, 0, Joint.MAX_ANGULAR_CORRECTION);
      angularImpulseDt = -this.em2 * c;
    }
    body1.a -= angularImpulseDt * body1.i_inv;
    body2.a += angularImpulseDt * body2.i_inv;
  }
  {
    var r1 = vec22.rotate(vec22.sub(this.anchor1, body1.centroid), body1.a);
    var r2 = vec22.rotate(vec22.sub(this.anchor2, body2.centroid), body2.a);
    var c = vec22.sub(vec22.add(body2.p, r2), vec22.add(body1.p, r1));
    var correction = vec22.truncate(c, Joint.MAX_LINEAR_CORRECTION);
    positionError = correction.length();
    var sum_m_inv = body1.m_inv + body2.m_inv;
    var r1y_i = r1.y * body1.i_inv;
    var r2y_i = r2.y * body2.i_inv;
    var k11 = sum_m_inv + r1.y * r1y_i + r2.y * r2y_i;
    var k12 = -r1.x * r1y_i - r2.x * r2y_i;
    var k22 = sum_m_inv + r1.x * r1.x * body1.i_inv + r2.x * r2.x * body2.i_inv;
    var em_inv = new mat2(k11, k12, k12, k22);
    var lambda_dt = em_inv.solve(correction.neg());
    body1.p.mad(lambda_dt, -body1.m_inv);
    body1.a -= vec22.cross(r1, lambda_dt) * body1.i_inv;
    body2.p.mad(lambda_dt, body2.m_inv);
    body2.a += vec22.cross(r2, lambda_dt) * body2.i_inv;
  }
  return positionError < Joint.LINEAR_SLOP && angularError < Joint.ANGULAR_SLOP;
};
RevoluteJoint2.prototype.getReactionForce = function(dt_inv) {
  return vec22.scale(this.lambda_acc, dt_inv);
};
RevoluteJoint2.prototype.getReactionTorque = function(dt_inv) {
  return 0;
};

// src/joints/joint_prismatic.js
var PrismaticJoint2 = function(body1, body2, anchor1, anchor2) {
  Joint.call(this, Joint.TYPE_PRISMATIC, body1, body2, true);
  this.anchor1 = this.body1.getLocalPoint(anchor1);
  this.anchor2 = this.body2.getLocalPoint(anchor2);
  var d = vec22.sub(anchor2, anchor1);
  this.n_local = this.body1.getLocalVector(vec22.normalize(vec22.perp(d)));
  this.da = body2.a - body1.a;
  this.lambda_acc = new vec22(0, 0);
};
PrismaticJoint2.prototype = new Joint();
PrismaticJoint2.prototype.constructor = PrismaticJoint2;
PrismaticJoint2.prototype.setWorldAnchor1 = function(anchor1) {
  this.anchor1 = this.body1.getLocalPoint(anchor1);
  var d = vec22.sub(this.getWorldAnchor2(), anchor1);
  this.n_local = this.body1.getLocalVector(vec22.normalize(vec22.perp(d)));
};
PrismaticJoint2.prototype.setWorldAnchor2 = function(anchor2) {
  this.anchor2 = this.body2.getLocalPoint(anchor2);
  var d = vec22.sub(anchor2, this.getWorldAnchor1());
  this.n_local = this.body1.getLocalVector(vec22.normalize(vec22.perp(d)));
};
PrismaticJoint2.prototype.serialize = function() {
  return {
    "type": "PrismaticJoint",
    "body1": this.body1.id,
    "body2": this.body2.id,
    "anchor1": this.body1.getWorldPoint(this.anchor1),
    "anchor2": this.body2.getWorldPoint(this.anchor2),
    "collideConnected": this.collideConnected,
    "maxForce": this.maxForce,
    "breakable": this.breakable
  };
};
PrismaticJoint2.prototype.initSolver = function(dt, warmStarting) {
  var body1 = this.body1;
  var body2 = this.body2;
  this.maxImpulse = this.maxForce * dt;
  this.r1 = body1.xf.rotate(vec22.sub(this.anchor1, body1.centroid));
  this.r2 = body2.xf.rotate(vec22.sub(this.anchor2, body2.centroid));
  var p1 = vec22.add(body1.p, this.r1);
  var p2 = vec22.add(body2.p, this.r2);
  var d = vec22.sub(p2, p1);
  this.r1_d = vec22.add(this.r1, d);
  this.n = vec22.normalize(vec22.perp(d));
  this.s1 = vec22.cross(this.r1_d, this.n);
  this.s2 = vec22.cross(this.r2, this.n);
  var s1 = this.s1;
  var s2 = this.s2;
  var s1_i = s1 * body1.i_inv;
  var s2_i = s2 * body2.i_inv;
  var k11 = body1.m_inv + body2.m_inv + s1 * s1_i + s2 * s2_i;
  var k12 = s1_i + s2_i;
  var k22 = body1.i_inv + body2.i_inv;
  this.em_inv = new mat2(k11, k12, k12, k22);
  if (warmStarting) {
    var impulse = vec22.scale(this.n, this.lambda_acc.x);
    body1.v.mad(impulse, -body1.m_inv);
    body1.w -= (this.s1 * this.lambda_acc.x + this.lambda_acc.y) * body1.i_inv;
    body2.v.mad(impulse, body2.m_inv);
    body2.w += (this.s2 * this.lambda_acc.x + this.lambda_acc.y) * body2.i_inv;
  } else {
    this.lambda_acc.set(0, 0);
  }
};
PrismaticJoint2.prototype.solveVelocityConstraints = function() {
  var body1 = this.body1;
  var body2 = this.body2;
  var cdot1 = this.n.dot(vec22.sub(body2.v, body1.v)) + this.s2 * body2.w - this.s1 * body1.w;
  var cdot2 = body2.w - body1.w;
  var lambda = this.em_inv.solve(new vec22(-cdot1, -cdot2));
  this.lambda_acc.addself(lambda);
  var impulse = vec22.scale(this.n, lambda.x);
  body1.v.mad(impulse, -body1.m_inv);
  body1.w -= (this.s1 * lambda.x + lambda.y) * body1.i_inv;
  body2.v.mad(impulse, body2.m_inv);
  body2.w += (this.s2 * lambda.x + lambda.y) * body2.i_inv;
};
PrismaticJoint2.prototype.solvePositionConstraints = function() {
  var body1 = this.body1;
  var body2 = this.body2;
  var r1 = vec22.rotate(vec22.sub(this.anchor1, body1.centroid), body1.a);
  var r2 = vec22.rotate(vec22.sub(this.anchor2, body2.centroid), body2.a);
  var p1 = vec22.add(body1.p, r1);
  var p2 = vec22.add(body2.p, r2);
  var d = vec22.sub(p2, p1);
  var r1_d = vec22.add(r1, d);
  var n = vec22.rotate(this.n_local, body1.a);
  var c1 = vec22.dot(n, d);
  var c2 = body2.a - body1.a - this.da;
  var correction = new vec22();
  correction.x = Clamp(c1, -Joint.MAX_LINEAR_CORRECTION, Joint.MAX_LINEAR_CORRECTION);
  correction.y = Clamp(c2, -Joint.MAX_ANGULAR_CORRECTION, Joint.MAX_ANGULAR_CORRECTION);
  var s1 = vec22.cross(r1_d, n);
  var s2 = vec22.cross(r2, n);
  var s1_i = s1 * body1.i_inv;
  var s2_i = s2 * body2.i_inv;
  var k11 = body1.m_inv + body2.m_inv + s1 * s1_i + s2 * s2_i;
  var k12 = s1_i + s2_i;
  var k22 = body1.i_inv + body2.i_inv;
  var em_inv = new mat2(k11, k12, k12, k22);
  var lambda_dt = em_inv.solve(correction.neg());
  var impulse_dt = vec22.scale(n, lambda_dt.x);
  body1.p.mad(impulse_dt, -body1.m_inv);
  body1.a -= (vec22.cross(r1_d, impulse_dt) + lambda_dt.y) * body1.i_inv;
  body2.p.mad(impulse_dt, body2.m_inv);
  body2.a += (vec22.cross(r2, impulse_dt) + lambda_dt.y) * body2.i_inv;
  return Math.abs(c1) <= Joint.LINEAR_SLOP && Math.abs(c2) <= Joint.ANGULAR_SLOP;
};
PrismaticJoint2.prototype.getReactionForce = function(dt_inv) {
  return vec22.scale(this.n, this.lambda_acc.x * dt_inv);
};
PrismaticJoint2.prototype.getReactionTorque = function(dt_inv) {
  return this.lambda_acc.y * dt_inv;
};

// src/renderers/CanvasRenderer.js
function drawLine2(ctx, p1, p2, lineWidth, strokeStyle) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
}
function drawBox2(ctx, center, rvec, uvec, lineWidth, strokeStyle, fillStyle, Newton) {
  ctx.beginPath();
  var l = Newton.vec2.sub(center, rvec);
  var r = Newton.vec2.add(center, rvec);
  var lb = Newton.vec2.sub(l, uvec);
  var lt = Newton.vec2.add(l, uvec);
  var rb = Newton.vec2.sub(r, uvec);
  var rt = Newton.vec2.add(r, uvec);
  ctx.moveTo(lb.x, lb.y);
  ctx.lineTo(rb.x, rb.y);
  ctx.lineTo(rt.x, rt.y);
  ctx.lineTo(lt.x, lt.y);
  ctx.lineTo(lb.x, lb.y);
  ctx.closePath();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  if (strokeStyle) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
  }
}
function drawCircle2(ctx, center, radius, angle, lineWidth, strokeStyle, fillStyle, Newton) {
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2, false);
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  if (strokeStyle) {
    if (typeof angle == "number") {
      ctx.moveTo(center.x, center.y);
      var rt = Newton.vec2.add(center, Newton.vec2.scale(Newton.vec2.rotation(angle), radius));
      ctx.lineTo(rt.x, rt.y);
    }
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
  }
}
function drawSegment2(ctx, a, b, radius, lineWidth, strokeStyle, fillStyle, Newton) {
  ctx.beginPath();
  var dn = Newton.vec2.normalize(Newton.vec2.perp(Newton.vec2.sub(b, a)));
  var start_angle = dn.toAngle();
  ctx.arc(a.x, a.y, radius, start_angle, start_angle + Math.PI, false);
  var ds = Newton.vec2.scale(dn, -radius);
  var bp = Newton.vec2.add(b, ds);
  ctx.lineTo(bp.x, bp.y);
  start_angle += Math.PI;
  ctx.arc(b.x, b.y, radius, start_angle, start_angle + Math.PI, false);
  ds = Newton.vec2.scale(dn, radius);
  var ap = Newton.vec2.add(a, ds);
  ctx.lineTo(ap.x, ap.y);
  ctx.closePath();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  if (strokeStyle) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
  }
}
function drawPolygon2(ctx, verts, lineWidth, strokeStyle, fillStyle) {
  ctx.beginPath();
  ctx.moveTo(verts[0].x, verts[0].y);
  for (var i = 0; i < verts.length; i++) {
    ctx.lineTo(verts[i].x, verts[i].y);
  }
  ctx.lineTo(verts[verts.length - 1].x, verts[verts.length - 1].y);
  ctx.closePath();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  if (strokeStyle) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
  }
}
function CanvasRenderer(Newton, canvas) {
  this.Newton = Newton;
  this.canvas = canvas;
  canvas.style.touchAction = "none";
  canvas.style.webkitTransform = "translate3d(0, 0, 0)";
  this.fg = {
    canvas,
    ctx: canvas.getContext("2d")
  };
  this.bg = {
    canvas: document.createElement("canvas")
  };
  this.bg.ctx = this.bg.canvas.getContext("2d");
  this.resize();
}
CanvasRenderer.prototype.drawShape = function(shape, isStatic, lineWidth, outlineColor, fillColor) {
  switch (shape.type) {
    case this.Newton.Shape.TYPE_CIRCLE:
      drawCircle2(isStatic ? this.bg.ctx : this.fg.ctx, shape.tc, shape.r, shape.body.a, lineWidth, outlineColor, fillColor, this.Newton);
      break;
    case this.Newton.Shape.TYPE_SEGMENT:
      drawSegment2(isStatic ? this.bg.ctx : this.fg.ctx, shape.ta, shape.tb, shape.r, lineWidth, outlineColor, fillColor, this.Newton);
      break;
    case this.Newton.Shape.TYPE_POLY:
      if (shape.convexity)
        drawPolygon2(isStatic ? this.bg.ctx : this.fg.ctx, shape.tverts, lineWidth, outlineColor, fillColor);
      else
        drawPolygon2(isStatic ? this.bg.ctx : this.fg.ctx, shape.tverts, lineWidth, outlineColor, fillColor);
      break;
  }
};
CanvasRenderer.prototype.copyBackground = function(x, y, w, h, x1, y1, w1, h1) {
  this.fg.ctx.drawImage(this.bg.canvas, x, y, w, h, x1, y1, w1, h1);
};
CanvasRenderer.prototype.beginStatic = function(camera, backgroundColor) {
  this.bg.ctx.fillStyle = backgroundColor;
  this.bg.ctx.fillRect(0, 0, this.width, this.height);
  this.bg.ctx.save();
  this.bg.ctx.setTransform(camera.scale * this.Newton.meter2pixel(1), 0, 0, -(camera.scale * this.Newton.meter2pixel(1)), this.width * 0.5 - camera.origin.x, this.height * 0.5 + camera.origin.y);
};
CanvasRenderer.prototype.endStatic = function() {
  this.bg.ctx.restore();
};
CanvasRenderer.prototype.addBody = function() {
};
CanvasRenderer.prototype.removeBody = function() {
};
CanvasRenderer.prototype.updateBody = function() {
};
CanvasRenderer.prototype.addJoint = function() {
};
CanvasRenderer.prototype.removeJoint = function() {
};
CanvasRenderer.prototype.updateJoint = function() {
};
CanvasRenderer.prototype.beginDynamic = function(camera) {
  this.fg.ctx.save();
  this.fg.ctx.setTransform(camera.scale * this.Newton.meter2pixel(1), 0, 0, -(camera.scale * this.Newton.meter2pixel(1)), this.width * 0.5 - camera.origin.x, this.height * 0.5 + camera.origin.y);
};
CanvasRenderer.prototype.endDynamic = function() {
  this.fg.ctx.restore();
};
CanvasRenderer.prototype.resize = function() {
  this.width = this.fg.canvas.width = this.bg.canvas.width = this.canvas.width = this.canvas.offsetWidth;
  this.height = this.fg.canvas.height = this.bg.canvas.height = this.canvas.height = this.canvas.offsetHeight;
};
CanvasRenderer.prototype.drawHelperJointAnchors = function(p1, p2, radius, lineWidth, jointAnchorColor) {
  var rvec = new this.Newton.vec2(radius, 0);
  var uvec = new this.Newton.vec2(0, radius);
  drawBox2(this.fg.ctx, p1, rvec, uvec, 0, "", jointAnchorColor, this.Newton);
  drawBox2(this.fg.ctx, p2, rvec, uvec, 0, "", jointAnchorColor, this.Newton);
  drawLine2(this.fg.ctx, p1, p2, lineWidth, jointAnchorColor);
};
CanvasRenderer.prototype.drawLine = function(p1, p2, lineWidth, strokeStyle) {
  drawLine2(this.fg.ctx, p1, p2, lineWidth, strokeStyle);
};

// src/renderers/two.min.js
var Two = (() => {
  var ye = Object.defineProperty;
  var Gi = Object.getOwnPropertyDescriptor;
  var qi = Object.getOwnPropertyNames;
  var Ki = Object.prototype.hasOwnProperty;
  var $i = (i, t, e2) => t in i ? ye(i, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : i[t] = e2;
  var Ce = (i, t) => {
    for (var e2 in t)
      ye(i, e2, { get: t[e2], enumerable: true });
  }, Ji = (i, t, e2, s) => {
    if (t && typeof t == "object" || typeof t == "function")
      for (let r of qi(t))
        !Ki.call(i, r) && r !== e2 && ye(i, r, { get: () => t[r], enumerable: !(s = Gi(t, r)) || s.enumerable });
    return i;
  };
  var Zi = (i) => Ji(ye({}, "__esModule", { value: true }), i);
  var x = (i, t, e2) => ($i(i, typeof t != "symbol" ? t + "" : t, e2), e2);
  var Ks = {};
  Ce(Ks, { default: () => I });
  var v = { move: "M", line: "L", curve: "C", arc: "A", close: "Z" };
  var Be = {};
  Ce(Be, { HALF_PI: () => Z, NumArray: () => yt, TWO_PI: () => J, decomposeMatrix: () => Rt, getComputedMatrix: () => Pe, getPoT: () => Ie, lerp: () => at, mod: () => st, setMatrix: () => Oe, toFixed: () => $ });
  var W;
  typeof window < "u" ? W = window : typeof global < "u" ? W = global : typeof self < "u" && (W = self);
  var li, J = Math.PI * 2, Z = Math.PI * 0.5;
  function Rt(i, t, e2, s, r, n) {
    let a;
    return arguments.length <= 1 ? (a = i.a, t = i.b, e2 = i.c, s = i.d, r = i.e, n = i.f) : a = i, { translateX: r, translateY: n, scaleX: Math.sqrt(a * a + t * t), scaleY: Math.sqrt(e2 * e2 + s * s), rotation: 180 * Math.atan2(t, a) / Math.PI };
  }
  function Oe(i) {
    li = i;
  }
  function Pe(i, t) {
    t = t && t.identity() || new li();
    let e2 = i, s = [];
    for (; e2 && e2._matrix; )
      s.push(e2._matrix), e2 = e2.parent;
    s.reverse();
    for (let r = 0; r < s.length; r++) {
      let a = s[r].elements;
      t.multiply(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9]);
    }
    return t;
  }
  function at(i, t, e2) {
    return e2 * (t - i) + i;
  }
  var Le = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
  function Ie(i) {
    let t = 0;
    for (; Le[t] && Le[t] < i; )
      t++;
    return Le[t];
  }
  function st(i, t) {
    for (; i < 0; )
      i += t;
    return i % t;
  }
  var yt = W.Float32Array || Array, Qi = Math.floor;
  function $(i) {
    return Qi(i * 1e6) / 1e6;
  }
  var ze = {};
  Ce(ze, { Curve: () => Nt, getAnchorsFromArcData: () => es, getComponentOnCubicBezier: () => zt, getControlPoints: () => ui, getCurveBoundingBox: () => je, getCurveFromPoints: () => Ve, getCurveLength: () => Ne, getReflection: () => be, integrate: () => ci, subdivide: () => re });
  var p = class {
    constructor() {
      __publicField(this, "_events", {});
      __publicField(this, "_bound", false);
    }
    addEventListener(t, e2) {
      return (this._events[t] || (this._events[t] = [])).push(e2), this._bound = true, this;
    }
    on() {
      return this.addEventListener.apply(this, arguments);
    }
    bind() {
      return this.addEventListener.apply(this, arguments);
    }
    removeEventListener(t, e2) {
      if (!this._events)
        return this;
      if (!t && !e2)
        return this._events = {}, this._bound = false, this;
      let s = t ? [t] : Object.keys(this._events);
      for (let r = 0, n = s.length; r < n; r++) {
        t = s[r];
        let a = this._events[t];
        if (a) {
          let o = [];
          if (e2)
            for (let h = 0, l = a.length; h < l; h++) {
              let f = a[h];
              f = f.handler ? f.handler : f, e2 !== f && o.push(f);
            }
          this._events[t] = o;
        }
      }
      return this;
    }
    off() {
      return this.removeEventListener.apply(this, arguments);
    }
    unbind() {
      return this.removeEventListener.apply(this, arguments);
    }
    dispatchEvent(t) {
      if (!this._events)
        return this;
      let e2 = Array.prototype.slice.call(arguments, 1), s = this._events[t];
      if (s)
        for (let r = 0; r < s.length; r++)
          s[r].call(this, ...e2);
      return this;
    }
    trigger() {
      return this.dispatchEvent.apply(this, arguments);
    }
    listen(t, e2, s) {
      let r = this;
      t && (n.obj = t, n.name = e2, n.handler = s, t.on(e2, n));
      function n() {
        s.apply(r, arguments);
      }
      return r;
    }
    ignore(t, e2, s) {
      return t.off(e2, s), this;
    }
  };
  x(p, "Types", { play: "play", pause: "pause", update: "update", render: "render", resize: "resize", change: "change", remove: "remove", insert: "insert", order: "order", load: "load" }), x(p, "Methods", ["addEventListener", "on", "removeEventListener", "off", "unbind", "dispatchEvent", "trigger", "listen", "ignore"]);
  var hi = { x: { enumerable: true, get: function() {
    return this._x;
  }, set: function(i) {
    this._x !== i && (this._x = i, this._bound && this.dispatchEvent(p.Types.change));
  } }, y: { enumerable: true, get: function() {
    return this._y;
  }, set: function(i) {
    this._y !== i && (this._y = i, this._bound && this.dispatchEvent(p.Types.change));
  } } }, bt = class extends p {
    constructor(t = 0, e2 = 0) {
      super();
      __publicField(this, "_x", 0);
      __publicField(this, "_y", 0);
      for (let s in hi)
        Object.defineProperty(this, s, hi[s]);
      this.x = t, this.y = e2;
    }
    static add(t, e2) {
      return new bt(t.x + e2.x, t.y + e2.y);
    }
    static sub(t, e2) {
      return new bt(t.x - e2.x, t.y - e2.y);
    }
    static subtract(t, e2) {
      return bt.sub(t, e2);
    }
    static ratioBetween(t, e2) {
      return (t.x * e2.x + t.y * e2.y) / (t.length() * e2.length());
    }
    static angleBetween(t, e2) {
      if (arguments.length >= 4) {
        let n = arguments[0] - arguments[2], a = arguments[1] - arguments[3];
        return Math.atan2(a, n);
      }
      let s = t.x - e2.x, r = t.y - e2.y;
      return Math.atan2(r, s);
    }
    static distanceBetween(t, e2) {
      return Math.sqrt(bt.distanceBetweenSquared(t, e2));
    }
    static distanceBetweenSquared(t, e2) {
      let s = t.x - e2.x, r = t.y - e2.y;
      return s * s + r * r;
    }
    set(t, e2) {
      return this.x = t, this.y = e2, this;
    }
    copy(t) {
      return this.x = t.x, this.y = t.y, this;
    }
    clear() {
      return this.x = 0, this.y = 0, this;
    }
    clone() {
      return new bt(this.x, this.y);
    }
    add(t, e2) {
      return arguments.length <= 0 ? this : (arguments.length <= 1 ? typeof t == "number" ? (this.x += t, this.y += t) : t && typeof t.x == "number" && typeof t.y == "number" && (this.x += t.x, this.y += t.y) : (this.x += t, this.y += e2), this);
    }
    addSelf(t) {
      return this.add.apply(this, arguments);
    }
    sub(t, e2) {
      return arguments.length <= 0 ? this : (arguments.length <= 1 ? typeof t == "number" ? (this.x -= t, this.y -= t) : t && typeof t.x == "number" && typeof t.y == "number" && (this.x -= t.x, this.y -= t.y) : (this.x -= t, this.y -= e2), this);
    }
    subtract() {
      return this.sub.apply(this, arguments);
    }
    subSelf(t) {
      return this.sub.apply(this, arguments);
    }
    subtractSelf(t) {
      return this.sub.apply(this, arguments);
    }
    multiply(t, e2) {
      return arguments.length <= 0 ? this : (arguments.length <= 1 ? typeof t == "number" ? (this.x *= t, this.y *= t) : t && typeof t.x == "number" && typeof t.y == "number" && (this.x *= t.x, this.y *= t.y) : (this.x *= t, this.y *= e2), this);
    }
    multiplySelf(t) {
      return this.multiply.apply(this, arguments);
    }
    multiplyScalar(t) {
      return this.multiply(t);
    }
    divide(t, e2) {
      return arguments.length <= 0 ? this : (arguments.length <= 1 ? typeof t == "number" ? (this.x /= t, this.y /= t) : t && typeof t.x == "number" && typeof t.y == "number" && (this.x /= t.x, this.y /= t.y) : (this.x /= t, this.y /= e2), isNaN(this.x) && (this.x = 0), isNaN(this.y) && (this.y = 0), this);
    }
    divideSelf(t) {
      return this.divide.apply(this, arguments);
    }
    divideScalar(t) {
      return this.divide(t);
    }
    negate() {
      return this.multiply(-1);
    }
    dot(t) {
      return this.x * t.x + this.y * t.y;
    }
    length() {
      return Math.sqrt(this.lengthSquared());
    }
    lengthSquared() {
      return this.x * this.x + this.y * this.y;
    }
    normalize() {
      return this.divideScalar(this.length());
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }
    distanceToSquared(t) {
      let e2 = this.x - t.x, s = this.y - t.y;
      return e2 * e2 + s * s;
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    equals(t, e2) {
      return e2 = typeof e2 > "u" ? 1e-4 : e2, this.distanceTo(t) < e2;
    }
    lerp(t, e2) {
      let s = (t.x - this.x) * e2 + this.x, r = (t.y - this.y) * e2 + this.y;
      return this.set(s, r);
    }
    isZero(t) {
      return t = typeof t > "u" ? 1e-4 : t, this.length() < t;
    }
    toString() {
      return this.x + ", " + this.y;
    }
    toObject() {
      return { x: this.x, y: this.y };
    }
    rotate(t) {
      let e2 = this.x, s = this.y, r = Math.cos(t), n = Math.sin(t);
      return this.x = e2 * r - s * n, this.y = e2 * n + s * r, this;
    }
  }, w = bt;
  x(w, "zero", new bt()), x(w, "left", new bt(-1, 0)), x(w, "right", new bt(1, 0)), x(w, "up", new bt(0, -1)), x(w, "down", new bt(0, 1));
  var T = class extends w {
    constructor(t = 0, e2 = 0, s = 0, r = 0, n = 0, a = 0, o = v.move) {
      super(t, e2);
      __publicField(this, "controls", { left: new w(), right: new w() });
      __publicField(this, "_command", v.move);
      __publicField(this, "_relative", true);
      __publicField(this, "_rx", 0);
      __publicField(this, "_ry", 0);
      __publicField(this, "_xAxisRotation", 0);
      __publicField(this, "_largeArcFlag", 0);
      __publicField(this, "_sweepFlag", 1);
      for (let l in fi)
        Object.defineProperty(this, l, fi[l]);
      this.command = o, this.relative = true;
      let h = T.makeBroadcast(this);
      this.controls.left.set(s, r).addEventListener(p.Types.change, h), this.controls.right.set(n, a).addEventListener(p.Types.change, h);
    }
    static makeBroadcast(t) {
      return e2;
      function e2() {
        t._bound && t.dispatchEvent(p.Types.change);
      }
    }
    copy(t) {
      return this.x = t.x, this.y = t.y, typeof t.command == "string" && (this.command = t.command), t.controls && (t.controls.left && this.controls.left.copy(t.controls.left), t.controls.right && this.controls.right.copy(t.controls.right)), typeof t.relative == "boolean" && (this.relative = t.relative), typeof t.rx == "number" && (this.rx = t.rx), typeof t.ry == "number" && (this.ry = t.ry), typeof t.xAxisRotation == "number" && (this.xAxisRotation = t.xAxisRotation), typeof t.largeArcFlag == "number" && (this.largeArcFlag = t.largeArcFlag), typeof t.sweepFlag == "number" && (this.sweepFlag = t.sweepFlag), this;
    }
    clone() {
      return new T().copy(this);
    }
    toObject() {
      return { x: this.x, y: this.y, command: this.command, relative: this.relative, controls: { left: this.controls.left.toObject(), right: this.controls.right.toObject() }, rx: this.rx, ry: this.ry, xAxisRotation: this.xAxisRotation, largeArcFlag: this.largeArcFlag, sweepFlag: this.sweepFlag };
    }
    toString() {
      return JSON.stringify(this.toObject());
    }
  }, fi = { command: { enumerable: true, get: function() {
    return this._command;
  }, set: function(i) {
    this._command !== i && (this._command = i, this._bound && this.dispatchEvent(p.Types.change));
  } }, relative: { enumerable: true, get: function() {
    return this._relative;
  }, set: function(i) {
    this._relative !== !!i && (this._relative = !!i, this._bound && this.dispatchEvent(p.Types.change));
  } }, rx: { enumerable: true, get: function() {
    return this._rx;
  }, set: function(i) {
    this._rx !== i && (this._rx = i, this._bound && this.dispatchEvent(p.Types.change));
  } }, ry: { enumerable: true, get: function() {
    return this._ry;
  }, set: function(i) {
    this._ry !== i && (this._ry = i, this._bound && this.dispatchEvent(p.Types.change));
  } }, xAxisRotation: { enumerable: true, get: function() {
    return this._xAxisRotation;
  }, set: function(i) {
    this._xAxisRotation !== i && (this._xAxisRotation = i, this._bound && this.dispatchEvent(p.Types.change));
  } }, largeArcFlag: { enumerable: true, get: function() {
    return this._largeArcFlag;
  }, set: function(i) {
    this._largeArcFlag !== i && (this._largeArcFlag = i, this._bound && this.dispatchEvent(p.Types.change));
  } }, sweepFlag: { get: function() {
    return this._sweepFlag;
  }, set: function(i) {
    this._sweepFlag !== i && (this._sweepFlag = i, this._bound && this.dispatchEvent(p.Types.change));
  } } };
  var ts = 0, G = { nextFrameID: null, Types: { webgl: "WebGLRenderer", svg: "SVGRenderer", canvas: "CanvasRenderer" }, Version: "v0.8.13", PublishDate: "2024-02-22T06:40:05.376Z", Identifier: "two-", Resolution: 12, AutoCalculateImportedMatrices: true, Instances: [], uniqueId: function() {
    return ts++;
  } };
  var Nt = { CollinearityEpsilon: Math.pow(10, -30), RecursionLimit: 16, CuspLimit: 0, Tolerance: { distance: 0.25, angle: 0, epsilon: Number.EPSILON }, abscissas: [[0.5773502691896257], [0, 0.7745966692414834], [0.33998104358485626, 0.8611363115940526], [0, 0.5384693101056831, 0.906179845938664], [0.2386191860831969, 0.6612093864662645, 0.932469514203152], [0, 0.4058451513773972, 0.7415311855993945, 0.9491079123427585], [0.1834346424956498, 0.525532409916329, 0.7966664774136267, 0.9602898564975363], [0, 0.3242534234038089, 0.6133714327005904, 0.8360311073266358, 0.9681602395076261], [0.14887433898163122, 0.4333953941292472, 0.6794095682990244, 0.8650633666889845, 0.9739065285171717], [0, 0.26954315595234496, 0.5190961292068118, 0.7301520055740494, 0.8870625997680953, 0.978228658146057], [0.1252334085114689, 0.3678314989981802, 0.5873179542866175, 0.7699026741943047, 0.9041172563704749, 0.9815606342467192], [0, 0.2304583159551348, 0.44849275103644687, 0.6423493394403402, 0.8015780907333099, 0.9175983992229779, 0.9841830547185881], [0.10805494870734367, 0.31911236892788974, 0.5152486363581541, 0.6872929048116855, 0.827201315069765, 0.9284348836635735, 0.9862838086968123], [0, 0.20119409399743451, 0.3941513470775634, 0.5709721726085388, 0.7244177313601701, 0.8482065834104272, 0.937273392400706, 0.9879925180204854], [0.09501250983763744, 0.2816035507792589, 0.45801677765722737, 0.6178762444026438, 0.755404408355003, 0.8656312023878318, 0.9445750230732326, 0.9894009349916499]], weights: [[1], [0.8888888888888888, 0.5555555555555556], [0.6521451548625461, 0.34785484513745385], [0.5688888888888889, 0.47862867049936647, 0.23692688505618908], [0.46791393457269104, 0.3607615730481386, 0.17132449237917036], [0.4179591836734694, 0.3818300505051189, 0.27970539148927664, 0.1294849661688697], [0.362683783378362, 0.31370664587788727, 0.22238103445337448, 0.10122853629037626], [0.3302393550012598, 0.31234707704000286, 0.26061069640293544, 0.1806481606948574, 0.08127438836157441], [0.29552422471475287, 0.26926671930999635, 0.21908636251598204, 0.1494513491505806, 0.06667134430868814], [0.2729250867779006, 0.26280454451024665, 0.23319376459199048, 0.18629021092773426, 0.1255803694649046, 0.05566856711617366], [0.24914704581340277, 0.2334925365383548, 0.20316742672306592, 0.16007832854334622, 0.10693932599531843, 0.04717533638651183], [0.2325515532308739, 0.22628318026289723, 0.2078160475368885, 0.17814598076194574, 0.13887351021978725, 0.09212149983772845, 0.04048400476531588], [0.2152638534631578, 0.2051984637212956, 0.18553839747793782, 0.15720316715819355, 0.12151857068790319, 0.08015808715976021, 0.03511946033175186], [0.2025782419255613, 0.19843148532711158, 0.1861610000155622, 0.16626920581699392, 0.13957067792615432, 0.10715922046717194, 0.07036604748810812, 0.03075324199611727], [0.1894506104550685, 0.18260341504492358, 0.16915651939500254, 0.14959598881657674, 0.12462897125553388, 0.09515851168249279, 0.062253523938647894, 0.027152459411754096]] };
  function zt(i, t, e2, s, r) {
    let n = 1 - i;
    return n * n * n * t + 3 * n * n * i * e2 + 3 * n * i * i * s + i * i * i * r;
  }
  function re(i, t, e2, s, r, n, a, o, h) {
    h = h || Nt.RecursionLimit;
    let l = h + 1;
    if (Math.abs(i - a) < 1e-3 && Math.abs(t - o) < 1e-3)
      return [new T(a, o)];
    let f = [];
    for (let c = 0; c < l; c++) {
      let d = c / l, _ = zt(d, i, e2, r, a), u = zt(d, t, s, n, o);
      f.push(new T(_, u));
    }
    return f;
  }
  function Ne(i, t, e2, s, r, n, a, o, h) {
    if (i === e2 && t === s && r === a && n === o) {
      let b = a - i, m = o - t;
      return Math.sqrt(b * b + m * m);
    }
    let l = 9 * (e2 - r) + 3 * (a - i), f = 6 * (i + r) - 12 * e2, c = 3 * (e2 - i), d = 9 * (s - n) + 3 * (o - t), _ = 6 * (t + n) - 12 * s, u = 3 * (s - t);
    function y(b) {
      let m = (l * b + f) * b + c, g = (d * b + _) * b + u;
      return Math.sqrt(m * m + g * g);
    }
    return ci(y, 0, 1, h || Nt.RecursionLimit);
  }
  function je(i, t, e2, s, r, n, a, o) {
    let h = [], l = [[], []], f, c, d, _, u, y, b, m;
    for (let A = 0; A < 2; ++A) {
      if (A == 0 ? (c = 6 * i - 12 * e2 + 6 * r, f = -3 * i + 9 * e2 - 9 * r + 3 * a, d = 3 * e2 - 3 * i) : (c = 6 * t - 12 * s + 6 * n, f = -3 * t + 9 * s - 9 * n + 3 * o, d = 3 * s - 3 * t), Math.abs(f) < 1e-12) {
        if (Math.abs(c) < 1e-12)
          continue;
        _ = -d / c, 0 < _ && _ < 1 && h.push(_);
        continue;
      }
      b = c * c - 4 * d * f, m = Math.sqrt(b), !(b < 0) && (u = (-c + m) / (2 * f), 0 < u && u < 1 && h.push(u), y = (-c - m) / (2 * f), 0 < y && y < 1 && h.push(y));
    }
    let g = h.length, k = g, R;
    for (; g--; )
      _ = h[g], R = 1 - _, l[0][g] = R * R * R * i + 3 * R * R * _ * e2 + 3 * R * _ * _ * r + _ * _ * _ * a, l[1][g] = R * R * R * t + 3 * R * R * _ * s + 3 * R * _ * _ * n + _ * _ * _ * o;
    return l[0][k] = i, l[1][k] = t, l[0][k + 1] = a, l[1][k + 1] = o, l[0].length = l[1].length = k + 2, { min: { x: Math.min.apply(0, l[0]), y: Math.min.apply(0, l[1]) }, max: { x: Math.max.apply(0, l[0]), y: Math.max.apply(0, l[1]) } };
  }
  function ci(i, t, e2, s) {
    let r = Nt.abscissas[s - 2], n = Nt.weights[s - 2], a = 0.5 * (e2 - t), o = a + t, h = 0, l = s + 1 >> 1, f = s & 1 ? n[h++] * i(o) : 0;
    for (; h < l; ) {
      let c = a * r[h];
      f += n[h++] * (i(o + c) + i(o - c));
    }
    return a * f;
  }
  function Ve(i, t) {
    let e2 = i.length, s = e2 - 1;
    for (let r = 0; r < e2; r++) {
      let n = i[r], a = t ? st(r - 1, e2) : Math.max(r - 1, 0), o = t ? st(r + 1, e2) : Math.min(r + 1, s), h = i[a], l = n, f = i[o];
      ui(h, l, f), l.command = r === 0 ? v.move : v.curve;
    }
  }
  function ui(i, t, e2) {
    let s = w.angleBetween(i, t), r = w.angleBetween(e2, t), n = w.distanceBetween(i, t), a = w.distanceBetween(e2, t), o = (s + r) / 2;
    return n < 1e-4 || a < 1e-4 ? (typeof t.relative == "boolean" && !t.relative && (t.controls.left.copy(t), t.controls.right.copy(t)), t) : (n *= 0.33, a *= 0.33, r < s ? o += Z : o -= Z, t.controls.left.x = Math.cos(o) * n, t.controls.left.y = Math.sin(o) * n, o -= Math.PI, t.controls.right.x = Math.cos(o) * a, t.controls.right.y = Math.sin(o) * a, typeof t.relative == "boolean" && !t.relative && (t.controls.left.x += t.x, t.controls.left.y += t.y, t.controls.right.x += t.x, t.controls.right.y += t.y), t);
  }
  function be(i, t, e2) {
    return new w(2 * i.x - (t.x + i.x) - (e2 ? i.x : 0), 2 * i.y - (t.y + i.y) - (e2 ? i.y : 0));
  }
  function es(i, t, e2, s, r, n, a) {
    let o = G.Resolution, h = [];
    for (let l = 0; l < o; l++) {
      let f = (l + 1) / o;
      a && (f = 1 - f);
      let c = f * n + r, d = e2 * Math.cos(c), _ = s * Math.sin(c), u = new T(d, _);
      u.command = v.line, h.push(u);
    }
  }
  var is = W.devicePixelRatio || 1;
  function ss(i) {
    return i.webkitBackingStorePixelRatio || i.mozBackingStorePixelRatio || i.msBackingStorePixelRatio || i.oBackingStorePixelRatio || i.backingStorePixelRatio || 1;
  }
  function Ut(i) {
    return is / ss(i);
  }
  var di = Array.prototype.slice;
  function rs(i) {
    if (i == null)
      return false;
    let t = i.length;
    return typeof t == "number" && t >= 0 && t < 4294967296;
  }
  var E = { isNaN: function(i) {
    return typeof i == "number" && i !== +i;
  }, isElement: function(i) {
    return !!(i && i.nodeType === 1);
  }, isObject: function(i) {
    let t = typeof i;
    return t === "function" || t === "object" && !!i;
  }, extend: function(i) {
    let t = di.call(arguments, 1);
    for (let e2 = 0; e2 < t.length; e2++) {
      let s = t[e2];
      for (let r in s)
        i[r] = s[r];
    }
    return i;
  }, defaults: function(i) {
    let t = di.call(arguments, 1);
    for (let e2 = 0; e2 < t.length; e2++) {
      let s = t[e2];
      for (let r in s)
        i[r] === void 0 && (i[r] = s[r]);
    }
    return i;
  }, each: function(i, t, e2) {
    let s = e2 || this, r = !rs(i) && Object.keys(i), n = (r || i).length;
    for (let a = 0; a < n; a++) {
      let o = r ? r[a] : a;
      t.call(s, i[o], o, i);
    }
    return i;
  }, performance: W.performance && W.performance.now ? W.performance : Date };
  var St = class extends p {
    constructor() {
      super();
      __publicField(this, "_flagId", false);
      __publicField(this, "_flagClassName", false);
      __publicField(this, "_renderer", {});
      __publicField(this, "_id", "");
      __publicField(this, "_className", "");
      __publicField(this, "classList", []);
      for (let t in _i)
        Object.defineProperty(this, t, _i[t]);
    }
    flagReset() {
      this._flagId = this._flagClassName = false;
    }
  }, _i = { renderer: { enumerable: false, get: function() {
    return this._renderer;
  } }, id: { enumerable: true, get: function() {
    return this._id;
  }, set: function(i) {
    let t = this._id;
    i !== this._id && (this._id = i, this._flagId = true, this.parent && (delete this.parent.children.ids[t], this.parent.children.ids[this._id] = this));
  } }, className: { enumerable: true, get: function() {
    return this._className;
  }, set: function(i) {
    this._className !== i && (this._flagClassName = true, this.classList = i.split(/\s+?/), this._className = i);
  } } };
  var ns = Math.cos, as = Math.sin, gi = Math.tan, Ue = [], gt = class extends p {
    constructor(t, e2, s, r, n, a) {
      super();
      __publicField(this, "elements", new yt(9));
      __publicField(this, "manual", false);
      let o = t;
      Array.isArray(o) || (o = Array.prototype.slice.call(arguments)), this.identity(), o.length > 0 && this.set(o);
    }
    static Multiply(t, e2, s) {
      if (e2.length <= 3) {
        let S = t, F, B, L, M = e2[0] || 0, V = e2[1] || 0, j = e2[2] || 0;
        return F = S[0] * M + S[1] * V + S[2] * j, B = S[3] * M + S[4] * V + S[5] * j, L = S[6] * M + S[7] * V + S[8] * j, [F, B, L];
      }
      let r = t[0], n = t[1], a = t[2], o = t[3], h = t[4], l = t[5], f = t[6], c = t[7], d = t[8], _ = e2[0], u = e2[1], y = e2[2], b = e2[3], m = e2[4], g = e2[5], k = e2[6], R = e2[7], A = e2[8];
      return s = s || new yt(9), s[0] = r * _ + n * b + a * k, s[1] = r * u + n * m + a * R, s[2] = r * y + n * g + a * A, s[3] = o * _ + h * b + l * k, s[4] = o * u + h * m + l * R, s[5] = o * y + h * g + l * A, s[6] = f * _ + c * b + d * k, s[7] = f * u + c * m + d * R, s[8] = f * y + c * g + d * A, s;
    }
    set(t, e2, s, r, n, a, o, h, l) {
      if (typeof e2 > "u") {
        let f = t;
        t = f[0], e2 = f[1], s = f[2], r = f[3], n = f[4], a = f[5], o = f[6], h = f[7], l = f[8];
      }
      return this.elements[0] = t, this.elements[1] = e2, this.elements[2] = s, this.elements[3] = r, this.elements[4] = n, this.elements[5] = a, this.elements[6] = o, this.elements[7] = h, this.elements[8] = l, this.trigger(p.Types.change);
    }
    copy(t) {
      return this.elements[0] = t.elements[0], this.elements[1] = t.elements[1], this.elements[2] = t.elements[2], this.elements[3] = t.elements[3], this.elements[4] = t.elements[4], this.elements[5] = t.elements[5], this.elements[6] = t.elements[6], this.elements[7] = t.elements[7], this.elements[8] = t.elements[8], this.manual = t.manual, this.trigger(p.Types.change);
    }
    identity() {
      return this.elements[0] = gt.Identity[0], this.elements[1] = gt.Identity[1], this.elements[2] = gt.Identity[2], this.elements[3] = gt.Identity[3], this.elements[4] = gt.Identity[4], this.elements[5] = gt.Identity[5], this.elements[6] = gt.Identity[6], this.elements[7] = gt.Identity[7], this.elements[8] = gt.Identity[8], this.trigger(p.Types.change);
    }
    multiply(t, e2, s, r, n, a, o, h, l) {
      if (typeof e2 > "u")
        return this.elements[0] *= t, this.elements[1] *= t, this.elements[2] *= t, this.elements[3] *= t, this.elements[4] *= t, this.elements[5] *= t, this.elements[6] *= t, this.elements[7] *= t, this.elements[8] *= t, this.trigger(p.Types.change);
      if (typeof s > "u" && (s = 1), typeof r > "u") {
        t = t || 0, e2 = e2 || 0, s = s || 0, n = this.elements;
        let z = n[0] * t + n[1] * e2 + n[2] * s, it = n[3] * t + n[4] * e2 + n[5] * s, ht = n[6] * t + n[7] * e2 + n[8] * s;
        return [z, it, ht];
      }
      let f = this.elements, c = [t, e2, s, r, n, a, o, h, l], d = f[0], _ = f[1], u = f[2], y = f[3], b = f[4], m = f[5], g = f[6], k = f[7], R = f[8], A = c[0], S = c[1], F = c[2], B = c[3], L = c[4], M = c[5], V = c[6], j = c[7], X = c[8];
      return this.elements[0] = d * A + _ * B + u * V, this.elements[1] = d * S + _ * L + u * j, this.elements[2] = d * F + _ * M + u * X, this.elements[3] = y * A + b * B + m * V, this.elements[4] = y * S + b * L + m * j, this.elements[5] = y * F + b * M + m * X, this.elements[6] = g * A + k * B + R * V, this.elements[7] = g * S + k * L + R * j, this.elements[8] = g * F + k * M + R * X, this.trigger(p.Types.change);
    }
    inverse(t) {
      let e2 = this.elements;
      t = t || new gt();
      let s = e2[0], r = e2[1], n = e2[2], a = e2[3], o = e2[4], h = e2[5], l = e2[6], f = e2[7], c = e2[8], d = c * o - h * f, _ = -c * a + h * l, u = f * a - o * l, y = s * d + r * _ + n * u;
      return y ? (y = 1 / y, t.elements[0] = d * y, t.elements[1] = (-c * r + n * f) * y, t.elements[2] = (h * r - n * o) * y, t.elements[3] = _ * y, t.elements[4] = (c * s - n * l) * y, t.elements[5] = (-h * s + n * a) * y, t.elements[6] = u * y, t.elements[7] = (-f * s + r * l) * y, t.elements[8] = (o * s - r * a) * y, t) : null;
    }
    scale(t, e2) {
      return arguments.length <= 1 && (e2 = t), this.multiply(t, 0, 0, 0, e2, 0, 0, 0, 1);
    }
    rotate(t) {
      let e2 = ns(t), s = as(t);
      return this.multiply(e2, -s, 0, s, e2, 0, 0, 0, 1);
    }
    translate(t, e2) {
      return this.multiply(1, 0, t, 0, 1, e2, 0, 0, 1);
    }
    skewX(t) {
      let e2 = gi(t);
      return this.multiply(1, e2, 0, 0, 1, 0, 0, 0, 1);
    }
    skewY(t) {
      let e2 = gi(t);
      return this.multiply(1, 0, 0, e2, 1, 0, 0, 0, 1);
    }
    toString(t) {
      return Ue.length = 0, this.toTransformArray(t, Ue), Ue.map($).join(" ");
    }
    toTransformArray(t, e2) {
      let s = this.elements, r = !!e2, n = s[0], a = s[1], o = s[2], h = s[3], l = s[4], f = s[5];
      if (t) {
        let c = s[6], d = s[7], _ = s[8];
        if (r) {
          e2[0] = n, e2[1] = h, e2[2] = c, e2[3] = a, e2[4] = l, e2[5] = d, e2[6] = o, e2[7] = f, e2[8] = _;
          return;
        }
        return [n, h, c, a, l, d, o, f, _];
      }
      if (r) {
        e2[0] = n, e2[1] = h, e2[2] = a, e2[3] = l, e2[4] = o, e2[5] = f;
        return;
      }
      return [n, h, a, l, o, f];
    }
    toArray(t, e2) {
      let s = this.elements, r = !!e2, n = s[0], a = s[1], o = s[2], h = s[3], l = s[4], f = s[5];
      if (t) {
        let c = s[6], d = s[7], _ = s[8];
        if (r) {
          e2[0] = n, e2[1] = a, e2[2] = o, e2[3] = h, e2[4] = l, e2[5] = f, e2[6] = c, e2[7] = d, e2[8] = _;
          return;
        }
        return [n, a, o, h, l, f, c, d, _];
      }
      if (r) {
        e2[0] = n, e2[1] = a, e2[2] = o, e2[3] = h, e2[4] = l, e2[5] = f;
        return;
      }
      return [n, a, o, h, l, f];
    }
    toObject() {
      return { elements: this.toArray(true), manual: !!this.manual };
    }
    clone() {
      return new gt().copy(this);
    }
  }, xt = gt;
  x(xt, "Identity", [1, 0, 0, 0, 1, 0, 0, 0, 1]);
  Oe(xt);
  var ot = class extends St {
    constructor() {
      super();
      __publicField(this, "_flagMatrix", true);
      __publicField(this, "_flagScale", false);
      __publicField(this, "_matrix", null);
      __publicField(this, "_worldMatrix", null);
      __publicField(this, "_position", null);
      __publicField(this, "_rotation", 0);
      __publicField(this, "_scale", 1);
      __publicField(this, "_skewX", 0);
      __publicField(this, "_skewY", 0);
      for (let t in xe)
        Object.defineProperty(this, t, xe[t]);
      this._renderer.flagMatrix = pi.bind(this), this.isShape = true, this.id = G.Identifier + G.uniqueId(), this.matrix = new xt(), this.worldMatrix = new xt(), this.position = new w(), this.rotation = 0, this.scale = 1, this.skewX = 0, this.skewY = 0;
    }
    get renderer() {
      return this._renderer;
    }
    set renderer(t) {
      this._renderer = t;
    }
    get translation() {
      return xe.position.get.apply(this, arguments);
    }
    set translation(t) {
      xe.position.set.apply(this, arguments);
    }
    addTo(t) {
      return t.add(this), this;
    }
    remove() {
      return this.parent ? (this.parent.remove(this), this) : this;
    }
    clone(t) {
      let e2 = new ot();
      return e2.position.copy(this.position), e2.rotation = this.rotation, e2.scale = this.scale, e2.skewX = this.skewX, e2.skewY = this.skewY, this.matrix.manual && e2.matrix.copy(this.matrix), t && t.add(e2), e2._update();
    }
    _update(t) {
      return !this._matrix.manual && this._flagMatrix && (this._matrix.identity().translate(this.position.x, this.position.y), this._scale instanceof w ? this._matrix.scale(this._scale.x, this._scale.y) : this._matrix.scale(this._scale), this._matrix.rotate(this.rotation), this._matrix.skewX(this.skewX), this._matrix.skewY(this.skewY)), t && this.parent && this.parent._update && this.parent._update(), this;
    }
    flagReset() {
      return this._flagMatrix = this._flagScale = false, super.flagReset.call(this), this;
    }
  }, xe = { position: { enumerable: true, get: function() {
    return this._position;
  }, set: function(i) {
    this._position && this._position.unbind(p.Types.change, this._renderer.flagMatrix), this._position = i, this._position.bind(p.Types.change, this._renderer.flagMatrix), pi.call(this);
  } }, rotation: { enumerable: true, get: function() {
    return this._rotation;
  }, set: function(i) {
    this._rotation = i, this._flagMatrix = true;
  } }, scale: { enumerable: true, get: function() {
    return this._scale;
  }, set: function(i) {
    this._scale instanceof w && this._scale.unbind(p.Types.change, this._renderer.flagMatrix), this._scale = i, this._scale instanceof w && this._scale.bind(p.Types.change, this._renderer.flagMatrix), this._flagMatrix = true, this._flagScale = true;
  } }, skewX: { enumerable: true, get: function() {
    return this._skewX;
  }, set: function(i) {
    this._skewX = i, this._flagMatrix = true;
  } }, skewY: { enumerable: true, get: function() {
    return this._skewY;
  }, set: function(i) {
    this._skewY = i, this._flagMatrix = true;
  } }, matrix: { enumerable: true, get: function() {
    return this._matrix;
  }, set: function(i) {
    this._matrix = i, this._flagMatrix = true;
  } }, worldMatrix: { enumerable: true, get: function() {
    return Pe(this, this._worldMatrix), this._worldMatrix;
  }, set: function(i) {
    this._worldMatrix = i;
  } } };
  function pi() {
    this._flagMatrix = true;
  }
  var lt = class extends Array {
    constructor() {
      super();
      __publicField(this, "_events", new p());
      arguments[0] && Array.isArray(arguments[0]) ? arguments[0].length > 0 && this.push.apply(this, arguments[0]) : arguments.length > 0 && this.push.apply(this, arguments);
    }
    get _bound() {
      return this._events._bound;
    }
    set _bound(t) {
      this._events._bound = t;
    }
    addEventListener() {
      return this._events.addEventListener.apply(this, arguments);
    }
    on() {
      return this._events.on.apply(this, arguments);
    }
    bind() {
      return this._events.bind.apply(this, arguments);
    }
    removeEventListener() {
      return this._events.removeEventListener.apply(this, arguments);
    }
    off() {
      return this._events.off.apply(this, arguments);
    }
    unbind() {
      return this._events.unbind.apply(this, arguments);
    }
    dispatchEvent() {
      return this._events.dispatchEvent.apply(this, arguments);
    }
    trigger() {
      return this._events.trigger.apply(this, arguments);
    }
    listen() {
      return this._events.listen.apply(this, arguments);
    }
    ignore() {
      return this._events.ignore.apply(this, arguments);
    }
    pop() {
      let t = super.pop.apply(this, arguments);
      return this.trigger(p.Types.remove, [t]), t;
    }
    shift() {
      let t = super.shift.apply(this, arguments);
      return this.trigger(p.Types.remove, [t]), t;
    }
    push() {
      let t = super.push.apply(this, arguments);
      return this.trigger(p.Types.insert, arguments), t;
    }
    unshift() {
      let t = super.unshift.apply(this, arguments);
      return this.trigger(p.Types.insert, arguments), t;
    }
    splice() {
      let t = super.splice.apply(this, arguments);
      if (this.trigger(p.Types.remove, t), arguments.length > 2) {
        let e2 = this.slice(arguments[0], arguments[0] + arguments.length - 2);
        this.trigger(p.Types.insert, e2), this.trigger(p.Types.order);
      }
      return t;
    }
    sort() {
      return super.sort.apply(this, arguments), this.trigger(p.Types.order), this;
    }
    reverse() {
      return super.reverse.apply(this, arguments), this.trigger(p.Types.order), this;
    }
    indexOf() {
      return super.indexOf.apply(this, arguments);
    }
    map(t, e2) {
      let s = [];
      for (let r = 0; r < this.length; r++) {
        let n = this[r], a;
        e2 ? a = t.call(e2, n, r) : a = t(n, r), s.push(a);
      }
      return s;
    }
  };
  var ne = class extends lt {
    constructor(t) {
      t = Array.isArray(t) ? t : Array.prototype.slice.call(arguments);
      super(t);
      __publicField(this, "ids", {});
      this.attach(t), this.on(p.Types.insert, this.attach), this.on(p.Types.remove, this.detach);
    }
    attach(t) {
      for (let e2 = 0; e2 < t.length; e2++) {
        let s = t[e2];
        s && s.id && (this.ids[s.id] = s);
      }
      return this;
    }
    detach(t) {
      for (let e2 = 0; e2 < t.length; e2++)
        delete this.ids[t[e2].id];
      return this;
    }
  };
  var ve = Math.min, we = Math.max, De = class extends ot {
    constructor(t) {
      super();
      __publicField(this, "_flagAdditions", false);
      __publicField(this, "_flagSubtractions", false);
      __publicField(this, "_flagOrder", false);
      __publicField(this, "_flagOpacity", true);
      __publicField(this, "_flagBeginning", false);
      __publicField(this, "_flagEnding", false);
      __publicField(this, "_flagLength", false);
      __publicField(this, "_flagMask", false);
      __publicField(this, "_fill", "#fff");
      __publicField(this, "_stroke", "#000");
      __publicField(this, "_linewidth", 1);
      __publicField(this, "_opacity", 1);
      __publicField(this, "_visible", true);
      __publicField(this, "_cap", "round");
      __publicField(this, "_join", "round");
      __publicField(this, "_miter", 4);
      __publicField(this, "_closed", true);
      __publicField(this, "_curved", false);
      __publicField(this, "_automatic", true);
      __publicField(this, "_beginning", 0);
      __publicField(this, "_ending", 1);
      __publicField(this, "_length", 0);
      __publicField(this, "_mask", null);
      for (let e2 in mi)
        Object.defineProperty(this, e2, mi[e2]);
      this._renderer.type = "group", this.additions = [], this.subtractions = [], this.children = Array.isArray(t) ? t : Array.prototype.slice.call(arguments);
    }
    static InsertChildren(t) {
      for (let e2 = 0; e2 < t.length; e2++)
        yi.call(this, t[e2], this);
    }
    static RemoveChildren(t) {
      for (let e2 = 0; e2 < t.length; e2++)
        yi.call(this, t[e2]);
    }
    static OrderChildren(t) {
      this._flagOrder = true;
    }
    clone(t) {
      let e2 = new De(), s = this.children.map(function(r) {
        return r.clone();
      });
      return e2.add(s), e2.opacity = this.opacity, this.mask && (e2.mask = this.mask), e2.translation.copy(this.translation), e2.rotation = this.rotation, e2.scale = this.scale, e2.className = this.className, this.matrix.manual && e2.matrix.copy(this.matrix), t && t.add(e2), e2._update();
    }
    toObject() {
      let t = { children: [], translation: this.translation.toObject(), rotation: this.rotation, scale: this.scale instanceof w ? this.scale.toObject() : this.scale, opacity: this.opacity, className: this.className, mask: this.mask ? this.mask.toObject() : null };
      return this.matrix.manual && (t.matrix = this.matrix.toObject()), E.each(this.children, function(e2, s) {
        t.children[s] = e2.toObject();
      }, this), t;
    }
    corner() {
      let t = this.getBoundingClientRect(true);
      for (let e2 = 0; e2 < this.children.length; e2++) {
        let s = this.children[e2];
        s.translation.x -= t.left, s.translation.y -= t.top;
      }
      return this.mask && (this.mask.translation.x -= t.left, this.mask.translation.y -= t.top), this;
    }
    center() {
      let t = this.getBoundingClientRect(true), e2 = t.left + t.width / 2 - this.translation.x, s = t.top + t.height / 2 - this.translation.y;
      for (let r = 0; r < this.children.length; r++) {
        let n = this.children[r];
        n.isShape && (n.translation.x -= e2, n.translation.y -= s);
      }
      return this.mask && (this.mask.translation.x -= e2, this.mask.translation.y -= s), this;
    }
    getById(t) {
      let e2 = null;
      function s(r) {
        if (r.id === t)
          return r;
        if (r.children) {
          for (let n = 0; n < r.children.length; n++)
            if (e2 = s(r.children[n]), e2)
              return e2;
        }
        return null;
      }
      return s(this);
    }
    getByClassName(t) {
      let e2 = [];
      function s(r) {
        if (Array.prototype.indexOf.call(r.classList, t) >= 0 && e2.push(r), r.children)
          for (let n = 0; n < r.children.length; n++) {
            let a = r.children[n];
            s(a);
          }
        return e2;
      }
      return s(this);
    }
    getByType(t) {
      let e2 = [];
      function s(r) {
        if (r instanceof t && e2.push(r), r.children)
          for (let n = 0; n < r.children.length; n++) {
            let a = r.children[n];
            s(a);
          }
        return e2;
      }
      return s(this);
    }
    add(t) {
      t instanceof Array ? t = t.slice() : t = Array.prototype.slice.call(arguments);
      for (let e2 = 0; e2 < t.length; e2++) {
        let s = t[e2];
        if (!(s && s.id))
          continue;
        let r = Array.prototype.indexOf.call(this.children, s);
        r >= 0 && this.children.splice(r, 1), this.children.push(s);
      }
      return this;
    }
    remove(t) {
      let e2 = arguments.length, s = this.parent;
      if (e2 <= 0 && s)
        return s.remove(this), this;
      t instanceof Array ? t = t.slice() : t = Array.prototype.slice.call(arguments);
      for (let r = 0; r < t.length; r++) {
        let n = t[r];
        if (!n || !this.children.ids[n.id])
          continue;
        let a = this.children.indexOf(n);
        a >= 0 && this.children.splice(a, 1);
      }
      return this;
    }
    getBoundingClientRect(t) {
      let e2, s, r, n, a, o;
      this._update(true);
      let h = 1 / 0, l = -1 / 0, f = 1 / 0, c = -1 / 0, d = /texture|gradient/i;
      s = t ? this.matrix : this.worldMatrix;
      for (let _ = 0; _ < this.children.length; _++) {
        let u = this.children[_];
        if (!(!u.visible || d.test(u._renderer.type)) && (e2 = u.getBoundingClientRect(t), r = typeof e2.top != "number" || E.isNaN(e2.top) || !isFinite(e2.top), n = typeof e2.left != "number" || E.isNaN(e2.left) || !isFinite(e2.left), a = typeof e2.right != "number" || E.isNaN(e2.right) || !isFinite(e2.right), o = typeof e2.bottom != "number" || E.isNaN(e2.bottom) || !isFinite(e2.bottom), !(r || n || a || o)))
          if (t) {
            let [y, b] = s.multiply(e2.left, e2.top), [m, g] = s.multiply(e2.right, e2.top), [k, R] = s.multiply(e2.left, e2.bottom), [A, S] = s.multiply(e2.right, e2.bottom);
            f = ve(b, g, R, S), h = ve(y, m, k, A), l = we(y, m, k, A), c = we(b, g, R, S);
          } else
            f = ve(e2.top, f), h = ve(e2.left, h), l = we(e2.right, l), c = we(e2.bottom, c);
      }
      return { top: f, left: h, right: l, bottom: c, width: l - h, height: c - f };
    }
    noFill() {
      return this.children.forEach(function(t) {
        t.noFill();
      }), this;
    }
    noStroke() {
      return this.children.forEach(function(t) {
        t.noStroke();
      }), this;
    }
    subdivide() {
      let t = arguments;
      return this.children.forEach(function(e2) {
        e2.subdivide.apply(e2, t);
      }), this;
    }
    _update() {
      let t, e2, s;
      if (this._flagBeginning || this._flagEnding) {
        let r = Math.min(this._beginning, this._ending), n = Math.max(this._beginning, this._ending), a = this.length, o = 0, h = r * a, l = n * a;
        for (t = 0; t < this.children.length; t++)
          s = this.children[t], e2 = s.length, h > o + e2 ? (s.beginning = 1, s.ending = 1) : l < o ? (s.beginning = 0, s.ending = 0) : h > o && h < o + e2 ? (s.beginning = (h - o) / e2, s.ending = 1) : l > o && l < o + e2 ? (s.beginning = 0, s.ending = (l - o) / e2) : (s.beginning = 0, s.ending = 1), o += e2;
      }
      return super._update.apply(this, arguments);
    }
    flagReset() {
      return this._flagAdditions && (this.additions.length = 0, this._flagAdditions = false), this._flagSubtractions && (this.subtractions.length = 0, this._flagSubtractions = false), this._flagOrder = this._flagMask = this._flagOpacity = this._flagBeginning = this._flagEnding = false, super.flagReset.call(this), this;
    }
  }, q = De;
  x(q, "Children", ne), x(q, "Properties", ["fill", "stroke", "linewidth", "cap", "join", "miter", "closed", "curved", "automatic"]);
  var mi = { visible: { enumerable: true, get: function() {
    return this._visible;
  }, set: function(i) {
    this._flagVisible = this._visible !== i || this._flagVisible, this._visible = i;
  } }, opacity: { enumerable: true, get: function() {
    return this._opacity;
  }, set: function(i) {
    this._flagOpacity = this._opacity !== i || this._flagOpacity, this._opacity = i;
  } }, beginning: { enumerable: true, get: function() {
    return this._beginning;
  }, set: function(i) {
    this._flagBeginning = this._beginning !== i || this._flagBeginning, this._beginning = i;
  } }, ending: { enumerable: true, get: function() {
    return this._ending;
  }, set: function(i) {
    this._flagEnding = this._ending !== i || this._flagEnding, this._ending = i;
  } }, length: { enumerable: true, get: function() {
    if (this._flagLength || this._length <= 0) {
      if (this._length = 0, !this.children)
        return this._length;
      for (let i = 0; i < this.children.length; i++) {
        let t = this.children[i];
        this._length += t.length;
      }
    }
    return this._length;
  } }, fill: { enumerable: true, get: function() {
    return this._fill;
  }, set: function(i) {
    this._fill = i;
    for (let t = 0; t < this.children.length; t++) {
      let e2 = this.children[t];
      e2.fill = i;
    }
  } }, stroke: { enumerable: true, get: function() {
    return this._stroke;
  }, set: function(i) {
    this._stroke = i;
    for (let t = 0; t < this.children.length; t++) {
      let e2 = this.children[t];
      e2.stroke = i;
    }
  } }, linewidth: { enumerable: true, get: function() {
    return this._linewidth;
  }, set: function(i) {
    this._linewidth = i;
    for (let t = 0; t < this.children.length; t++) {
      let e2 = this.children[t];
      e2.linewidth = i;
    }
  } }, join: { enumerable: true, get: function() {
    return this._join;
  }, set: function(i) {
    this._join = i;
    for (let t = 0; t < this.children.length; t++) {
      let e2 = this.children[t];
      e2.join = i;
    }
  } }, miter: { enumerable: true, get: function() {
    return this._miter;
  }, set: function(i) {
    this._miter = i;
    for (let t = 0; t < this.children.length; t++) {
      let e2 = this.children[t];
      e2.miter = i;
    }
  } }, cap: { enumerable: true, get: function() {
    return this._cap;
  }, set: function(i) {
    this._cap = i;
    for (let t = 0; t < this.children.length; t++) {
      let e2 = this.children[t];
      e2.cap = i;
    }
  } }, closed: { enumerable: true, get: function() {
    return this._closed;
  }, set: function(i) {
    this._closed = i;
    for (let t = 0; t < this.children.length; t++) {
      let e2 = this.children[t];
      e2.closed = i;
    }
  } }, curved: { enumerable: true, get: function() {
    return this._curved;
  }, set: function(i) {
    this._curved = i;
    for (let t = 0; t < this.children.length; t++) {
      let e2 = this.children[t];
      e2.curved = i;
    }
  } }, automatic: { enumerable: true, get: function() {
    return this._automatic;
  }, set: function(i) {
    this._automatic = i;
    for (let t = 0; t < this.children.length; t++) {
      let e2 = this.children[t];
      e2.automatic = i;
    }
  } }, children: { enumerable: true, get: function() {
    return this._children;
  }, set: function(i) {
    let t = q.InsertChildren.bind(this), e2 = q.RemoveChildren.bind(this), s = q.OrderChildren.bind(this);
    this._children && (this._children.unbind(), this._children.length > 0 && e2(this._children)), this._children = new ne(i), this._children.bind(p.Types.insert, t), this._children.bind(p.Types.remove, e2), this._children.bind(p.Types.order, s), i.length > 0 && t(i);
  } }, mask: { enumerable: true, get: function() {
    return this._mask;
  }, set: function(i) {
    this._mask = i, this._flagMask = true, E.isObject(i) && !i.clip && (i.clip = true);
  } } };
  function yi(i, t) {
    let e2 = i.parent, s;
    if (e2 === t) {
      r();
      return;
    }
    if (e2 && e2.children.ids[i.id] && (s = Array.prototype.indexOf.call(e2.children, i), e2.children.splice(s, 1), n()), t) {
      r();
      return;
    }
    n(), e2._flagAdditions && e2.additions.length === 0 && (e2._flagAdditions = false), e2._flagSubtractions && e2.subtractions.length === 0 && (e2._flagSubtractions = false), delete i.parent;
    function r() {
      t.subtractions.length > 0 && (s = Array.prototype.indexOf.call(t.subtractions, i), s >= 0 && t.subtractions.splice(s, 1)), t.additions.length > 0 && (s = Array.prototype.indexOf.call(t.additions, i), s >= 0 && t.additions.splice(s, 1)), i.parent = t, t.additions.push(i), t._flagAdditions = true;
    }
    function n() {
      s = Array.prototype.indexOf.call(e2.additions, i), s >= 0 && e2.additions.splice(s, 1), s = Array.prototype.indexOf.call(e2.subtractions, i), s < 0 && (e2.subtractions.push(i), e2._flagSubtractions = true);
    }
  }
  var We = [], Xe = Math.max, os = Math.min, bi = Math.abs, ke = Math.sin, Ae = Math.cos, ls = Math.acos, Se = Math.sqrt, Q = { isHidden: /(undefined|none|transparent)/i, alignments: { left: "start", middle: "center", right: "end" }, baselines: { top: "top", middle: "middle", bottom: "bottom", baseline: "alphabetic" }, shim: function(i, t) {
    return i.tagName = i.nodeName = t || "canvas", i.nodeType = 1, i.getAttribute = function(e2) {
      return this[e2];
    }, i.setAttribute = function(e2, s) {
      return this[e2] = s, this;
    }, i;
  }, group: { renderChild: function(i) {
    Q[i._renderer.type].render.call(i, this.ctx, true, this.clip);
  }, render: function(i) {
    if (!this._visible)
      return this;
    this._update();
    let t = this._matrix.elements, e2 = this.parent;
    this._renderer.opacity = this._opacity * (e2 && e2._renderer ? e2._renderer.opacity : 1);
    let s = this._mask, r = Re(t), n = !r || !!s;
    if (this._renderer.context || (this._renderer.context = {}), this._renderer.context.ctx = i, n && (i.save(), r || i.transform(t[0], t[3], t[1], t[4], t[2], t[5])), s && Q[s._renderer.type].render.call(s, i, true), this._opacity > 0 && this._scale !== 0)
      for (let a = 0; a < this.children.length; a++) {
        let o = this.children[a];
        Q[o._renderer.type].render.call(o, i);
      }
    return n && i.restore(), this.flagReset();
  } }, path: { render: function(i, t, e2) {
    let s, r, n, a, o, h, l, f, c, d, _, u, y, b, m, g, k, R, A, S, F, B, L, M, V, j, X, z, it, ht, tt, _t, nt, Tt;
    if (Tt = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1, it = this._mask, ht = this._clip, o = this._opacity * (Tt || 1), h = this._visible, !t && (!h || ht || o === 0))
      return this;
    this._update(), s = this._matrix.elements, r = this._stroke, n = this._linewidth, a = this._fill, l = this._cap, f = this._join, c = this._miter, d = this._closed, _ = this._renderer.vertices, u = _.length, y = u - 1, tt = Re(s), nt = this.dashes, tt || (i.save(), i.transform(s[0], s[3], s[1], s[4], s[2], s[5])), it && Q[it._renderer.type].render.call(it, i, true), a && (typeof a == "string" ? i.fillStyle = a : (Q[a._renderer.type].render.call(a, i, this), i.fillStyle = a._renderer.effect)), r && (typeof r == "string" ? i.strokeStyle = r : (Q[r._renderer.type].render.call(r, i, this), i.strokeStyle = r._renderer.effect), n && (i.lineWidth = n), c && (i.miterLimit = c), f && (i.lineJoin = f), !d && l && (i.lineCap = l)), typeof o == "number" && (i.globalAlpha = o), nt && nt.length > 0 && (i.lineDashOffset = nt.offset || 0, i.setLineDash(nt)), i.beginPath();
    let Ct, Qt, te, ee, ie, se, kt;
    for (let Y = 0; Y < u; Y++)
      switch (g = _[Y], X = g.x, z = g.y, g.command) {
        case v.close:
          i.closePath();
          break;
        case v.arc:
          Ct = g.rx, Qt = g.ry, te = g.xAxisRotation, ee = g.largeArcFlag, ie = g.sweepFlag, b = d ? st(Y - 1, u) : Xe(Y - 1, 0), m = _[b], se = m.x, kt = m.y, Q.renderSvgArcCommand(i, se, kt, Ct, Qt, ee, ie, te, X, z);
          break;
        case v.curve:
          b = d ? st(Y - 1, u) : Math.max(Y - 1, 0), m = _[b], L = m.controls && m.controls.right || w.zero, M = g.controls && g.controls.left || w.zero, m._relative ? (F = L.x + m.x, B = L.y + m.y) : (F = L.x, B = L.y), g._relative ? (A = M.x + g.x, S = M.y + g.y) : (A = M.x, S = M.y), i.bezierCurveTo(F, B, A, S, X, z), Y >= y && d && (k = R, V = g.controls && g.controls.right || w.zero, j = k.controls && k.controls.left || w.zero, g._relative ? (F = V.x + g.x, B = V.y + g.y) : (F = V.x, B = V.y), k._relative ? (A = j.x + k.x, S = j.y + k.y) : (A = j.x, S = j.y), X = k.x, z = k.y, i.bezierCurveTo(F, B, A, S, X, z));
          break;
        case v.line:
          i.lineTo(X, z);
          break;
        case v.move:
          R = g, i.moveTo(X, z);
          break;
      }
    return d && i.closePath(), !ht && !e2 && (Q.isHidden.test(a) || (_t = a._renderer && a._renderer.offset, _t && (i.save(), i.translate(-a._renderer.offset.x, -a._renderer.offset.y), i.scale(a._renderer.scale.x, a._renderer.scale.y)), i.fill(), _t && i.restore()), Q.isHidden.test(r) || (_t = r._renderer && r._renderer.offset, _t && (i.save(), i.translate(-r._renderer.offset.x, -r._renderer.offset.y), i.scale(r._renderer.scale.x, r._renderer.scale.y), i.lineWidth = n / r._renderer.scale.x), i.stroke(), _t && i.restore())), tt || i.restore(), ht && !e2 && i.clip(), nt && nt.length > 0 && i.setLineDash(We), this.flagReset();
  } }, points: { render: function(i, t, e2) {
    let s, r, n, a, o, h, l, f, c, d, _, u, y, b, m, g;
    if (g = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1, o = this._opacity * (g || 1), h = this._visible, !t && (!h || o === 0))
      return this;
    this._update(), s = this._matrix.elements, r = this._stroke, n = this._linewidth, a = this._fill, f = this._renderer.collection, c = f.length, y = Re(s), m = this.dashes, l = this._size, y || (i.save(), i.transform(s[0], s[3], s[1], s[4], s[2], s[5])), a && (typeof a == "string" ? i.fillStyle = a : (Q[a._renderer.type].render.call(a, i, this), i.fillStyle = a._renderer.effect)), r && (typeof r == "string" ? i.strokeStyle = r : (Q[r._renderer.type].render.call(r, i, this), i.strokeStyle = r._renderer.effect), n && (i.lineWidth = n)), typeof o == "number" && (i.globalAlpha = o), m && m.length > 0 && (i.lineDashOffset = m.offset || 0, i.setLineDash(m)), i.beginPath();
    let k = l * 0.5, R;
    this._sizeAttenuation || (R = this.worldMatrix.elements, R = Rt(R[0], R[3], R[1], R[4], R[2], R[5]), k /= Math.max(R.scaleX, R.scaleY));
    for (let A = 0; A < c; A++)
      d = f[A], _ = d.x, u = d.y, i.moveTo(_ + k, u), i.arc(_, u, k, 0, J);
    return e2 || (Q.isHidden.test(a) || (b = a._renderer && a._renderer.offset, b && (i.save(), i.translate(-a._renderer.offset.x, -a._renderer.offset.y), i.scale(a._renderer.scale.x, a._renderer.scale.y)), i.fill(), b && i.restore()), Q.isHidden.test(r) || (b = r._renderer && r._renderer.offset, b && (i.save(), i.translate(-r._renderer.offset.x, -r._renderer.offset.y), i.scale(r._renderer.scale.x, r._renderer.scale.y), i.lineWidth = n / r._renderer.scale.x), i.stroke(), b && i.restore())), y || i.restore(), m && m.length > 0 && i.setLineDash(We), this.flagReset();
  } }, text: { render: function(i, t, e2) {
    let s = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1, r = this._opacity * s, n = this._visible, a = this._mask, o = this._clip;
    if (!t && (!n || o || r === 0))
      return this;
    this._update();
    let h = this._matrix.elements, l = this._stroke, f = this._linewidth, c = this._fill, d = this._decoration, _ = this._direction, u = Re(h), y = c._renderer && c._renderer.offset && l._renderer && l._renderer.offset, b = this.dashes, m = Q.alignments[this._alignment] || this._alignment, g = Q.baselines[this._baseline] || this._baseline, k, R, A, S, F, B, L, M, V, j, X;
    if (u || (i.save(), i.transform(h[0], h[3], h[1], h[4], h[2], h[5])), a && Q[a._renderer.type].render.call(a, i, true), y || (i.font = [this._style, this._weight, this._size + "px/" + this._leading + "px", this._family].join(" ")), i.textAlign = m, i.textBaseline = g, i.direction = _, c && (typeof c == "string" ? i.fillStyle = c : (Q[c._renderer.type].render.call(c, i, this), i.fillStyle = c._renderer.effect)), l && (typeof l == "string" ? i.strokeStyle = l : (Q[l._renderer.type].render.call(l, i, this), i.strokeStyle = l._renderer.effect), f && (i.lineWidth = f)), typeof r == "number" && (i.globalAlpha = r), b && b.length > 0 && (i.lineDashOffset = b.offset || 0, i.setLineDash(b)), !o && !e2 && (Q.isHidden.test(c) || (c._renderer && c._renderer.offset ? (B = c._renderer.scale.x, L = c._renderer.scale.y, i.save(), i.translate(-c._renderer.offset.x, -c._renderer.offset.y), i.scale(B, L), k = this._size / c._renderer.scale.y, R = this._leading / c._renderer.scale.y, i.font = [this._style, this._weight, k + "px/", R + "px", this._family].join(" "), A = c._renderer.offset.x / c._renderer.scale.x, S = c._renderer.offset.y / c._renderer.scale.y, i.fillText(this.value, A, S), i.restore()) : i.fillText(this.value, 0, 0)), Q.isHidden.test(l) || (l._renderer && l._renderer.offset ? (B = l._renderer.scale.x, L = l._renderer.scale.y, i.save(), i.translate(-l._renderer.offset.x, -l._renderer.offset.y), i.scale(B, L), k = this._size / l._renderer.scale.y, R = this._leading / l._renderer.scale.y, i.font = [this._style, this._weight, k + "px/", R + "px", this._family].join(" "), A = l._renderer.offset.x / l._renderer.scale.x, S = l._renderer.offset.y / l._renderer.scale.y, F = f / l._renderer.scale.x, i.lineWidth = F, i.strokeText(this.value, A, S), i.restore()) : i.strokeText(this.value, 0, 0))), /(underline|strikethrough)/i.test(d)) {
      let z = i.measureText(this.value), it = 1;
      switch (d) {
        case "underline":
          V = z.actualBoundingBoxDescent, X = z.actualBoundingBoxDescent;
          break;
        case "strikethrough":
          V = 0, X = 0, it = 0.5;
          break;
      }
      switch (g) {
        case "top":
          V += this._size * it, X += this._size * it;
          break;
        case "baseline":
        case "bottom":
          V -= this._size * it, X -= this._size * it;
          break;
      }
      switch (m) {
        case "left":
        case "start":
          M = 0, j = z.width;
          break;
        case "right":
        case "end":
          M = -z.width, j = 0;
          break;
        default:
          M = -z.width / 2, j = z.width / 2;
      }
      i.lineWidth = Math.max(Math.floor(this._size / 15), 1), i.strokeStyle = i.fillStyle, i.beginPath(), i.moveTo(M, V), i.lineTo(j, X), i.stroke();
    }
    return u || i.restore(), o && !e2 && i.clip(), b && b.length > 0 && i.setLineDash(We), this.flagReset();
  } }, "linear-gradient": { render: function(i, t) {
    if (!!t) {
      if (this._update(), !this._renderer.effect || this._flagEndPoints || this._flagStops || this._flagUnits) {
        let e2, s = this.left._x, r = this.left._y, n = this.right._x, a = this.right._y;
        /objectBoundingBox/i.test(this._units) && (e2 = t.getBoundingClientRect(true), s = (s - 0.5) * e2.width, r = (r - 0.5) * e2.height, n = (n - 0.5) * e2.width, a = (a - 0.5) * e2.height), this._renderer.effect = i.createLinearGradient(s, r, n, a);
        for (let o = 0; o < this.stops.length; o++) {
          let h = this.stops[o];
          this._renderer.effect.addColorStop(h._offset, h._color);
        }
      }
      return this.flagReset();
    }
  } }, "radial-gradient": { render: function(i, t) {
    if (!!t) {
      if (this._update(), !this._renderer.effect || this._flagCenter || this._flagFocal || this._flagRadius || this._flagStops || this._flagUnits) {
        let e2, s = this.center._x, r = this.center._y, n = this.focal._x, a = this.focal._y, o = this._radius;
        /objectBoundingBox/i.test(this._units) && (e2 = t.getBoundingClientRect(true), s = s * e2.width * 0.5, r = r * e2.height * 0.5, n = n * e2.width * 0.5, a = a * e2.height * 0.5, o *= Math.min(e2.width, e2.height) * 0.5), this._renderer.effect = i.createRadialGradient(s, r, 0, n, a, o);
        for (let h = 0; h < this.stops.length; h++) {
          let l = this.stops[h];
          this._renderer.effect.addColorStop(l._offset, l._color);
        }
      }
      return this.flagReset();
    }
  } }, texture: { render: function(i) {
    this._update();
    let t = this.image;
    return (!this._renderer.effect || (this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded) && (this._renderer.effect = i.createPattern(this.image, this._repeat)), (this._flagOffset || this._flagLoaded || this._flagScale) && (this._renderer.offset instanceof w || (this._renderer.offset = new w()), this._renderer.offset.x = -this._offset.x, this._renderer.offset.y = -this._offset.y, t && (this._renderer.offset.x += t.width / 2, this._renderer.offset.y += t.height / 2, this._scale instanceof w ? (this._renderer.offset.x *= this._scale.x, this._renderer.offset.y *= this._scale.y) : (this._renderer.offset.x *= this._scale, this._renderer.offset.y *= this._scale))), (this._flagScale || this._flagLoaded) && (this._renderer.scale instanceof w || (this._renderer.scale = new w()), this._scale instanceof w ? this._renderer.scale.copy(this._scale) : this._renderer.scale.set(this._scale, this._scale)), this.flagReset();
  } }, renderSvgArcCommand: function(i, t, e2, s, r, n, a, o, h, l) {
    o = o * Math.PI / 180, s = bi(s), r = bi(r);
    let f = (t - h) / 2, c = (e2 - l) / 2, d = Ae(o) * f + ke(o) * c, _ = -ke(o) * f + Ae(o) * c, u = d * d, y = _ * _, b = s * s, m = r * r, g = u / b + y / m;
    if (g > 1) {
      let z = Se(g);
      s = z * s, r = z * r, b = s * s, m = r * r;
    }
    let k = b * y + m * u, R = (b * m - k) / k, A = Se(Xe(0, R));
    n === a && (A = -A);
    let S = A * s * _ / r, F = -A * r * d / s, B = Ae(o) * S - ke(o) * F + (t + h) / 2, L = ke(o) * S + Ae(o) * F + (e2 + l) / 2, M = xi(1, 0, (d - S) / s, (_ - F) / r), V = xi((d - S) / s, (_ - F) / r, (-d - S) / s, (-_ - F) / r) % J, j = M + V;
    hs(i, B, L, s, r, M, j, a === 0, o);
  } }, vt = class extends p {
    constructor(t) {
      super();
      let e2 = t.smoothing !== false;
      this.domElement = t.domElement || document.createElement("canvas"), this.ctx = this.domElement.getContext("2d"), this.overdraw = t.overdraw || false, typeof this.ctx.imageSmoothingEnabled < "u" && (this.ctx.imageSmoothingEnabled = e2), this.scene = new q(), this.scene.parent = this;
    }
    setSize(t, e2, s) {
      return this.width = t, this.height = e2, this.ratio = typeof s > "u" ? Ut(this.ctx) : s, this.domElement.width = t * this.ratio, this.domElement.height = e2 * this.ratio, this.domElement.style && E.extend(this.domElement.style, { width: t + "px", height: e2 + "px" }), this.trigger(p.Types.resize, t, e2, s);
    }
    render() {
      let t = this.ratio === 1;
      return t || (this.ctx.save(), this.ctx.scale(this.ratio, this.ratio)), this.overdraw || this.ctx.clearRect(0, 0, this.width, this.height), Q.group.render.call(this.scene, this.ctx), t || this.ctx.restore(), this;
    }
  };
  x(vt, "Utils", Q);
  function hs(i, t, e2, s, r, n, a, o, h) {
    let l = a - n, f = Nt.Tolerance.epsilon, c = Math.abs(l) < f, d = st(l, J);
    d < f && (c ? d = 0 : d = J), o === true && !c && (d === J ? d = -J : d = d - J);
    for (let _ = 0; _ < G.Resolution; _++) {
      let u = _ / (G.Resolution - 1), y = n + u * d, b = t + s * Math.cos(y), m = e2 + r * Math.sin(y);
      if (h !== 0) {
        let g = Math.cos(h), k = Math.sin(h), R = b - t, A = m - e2;
        b = R * g - A * k + t, m = R * k + A * g + e2;
      }
      i.lineTo(b, m);
    }
  }
  function xi(i, t, e2, s) {
    let r = i * e2 + t * s, n = Se(i * i + t * t) * Se(e2 * e2 + s * s), a = ls(Xe(-1, os(1, r / n)));
    return i * s - t * e2 < 0 && (a = -a), a;
  }
  function Re(i) {
    return i[0] == 1 && i[3] == 0 && i[1] == 0 && i[4] == 1 && i[2] == 0 && i[5] == 0;
  }
  var ft = { Image: null, isHeadless: false, shim: function(i, t) {
    return vt.Utils.shim(i), typeof t < "u" && (ft.Image = t), ft.isHeadless = true, i;
  } };
  var dt = { hasEventListeners: typeof W.addEventListener == "function", bind: function(i, t, e2, s) {
    return this.hasEventListeners ? i.addEventListener(t, e2, !!s) : i.attachEvent("on" + t, e2), dt;
  }, unbind: function(i, t, e2, s) {
    return dt.hasEventListeners ? i.removeEventListeners(t, e2, !!s) : i.detachEvent("on" + t, e2), dt;
  }, getRequestAnimationFrame: function() {
    let i = ["ms", "moz", "webkit", "o"], t = 0, e2 = W.requestAnimationFrame;
    if (!e2) {
      for (let r = 0; r < i.length; r++)
        e2 = W[i[r] + "RequestAnimationFrame"] || e2;
      e2 = e2 || s;
    }
    function s(r, n) {
      let a = (/* @__PURE__ */ new Date()).getTime(), o = Math.max(0, 16 - (a - t)), h = W.setTimeout(l, o);
      t = a + o;
      function l() {
        r(a + o);
      }
      return h;
    }
    return e2;
  } }, Dt = W.document ? W.document.createElement("div") : {};
  Dt.id = "help-two-load";
  Object.defineProperty(dt, "temp", { enumerable: true, get: function() {
    return E.isElement(Dt) && !W.document.head.contains(Dt) && (Dt.style.display = "none", W.document.head.appendChild(Dt)), Dt;
  } });
  var et = class extends Error {
    constructor(t) {
      super();
      __publicField(this, "name", "Two.js");
      __publicField(this, "message");
      this.message = t;
    }
  };
  var Et = class {
    constructor() {
      __publicField(this, "map", {});
    }
    add(t, e2) {
      return this.map[t] = e2, this;
    }
    remove(t) {
      return delete this.map[t], this;
    }
    get(t) {
      return this.map[t];
    }
    contains(t) {
      return t in this.map;
    }
  };
  function He(i, t) {
    if (t === 0 || t === 1)
      return true;
    let s = i._length * t, r = 0;
    for (let n = 0; n < i._lengths.length; n++) {
      let a = i._lengths[n];
      if (r >= s)
        return s - r >= 0;
      r += a;
    }
    return false;
  }
  function Wt(i, t) {
    let e2 = i._length;
    if (t <= 0)
      return 0;
    if (t >= e2)
      return i._lengths.length - 1;
    for (let s = 0, r = 0; s < i._lengths.length; s++) {
      if (r + i._lengths[s] >= t)
        return t -= r, Math.max(s - 1, 0) + t / i._lengths[s];
      r += i._lengths[s];
    }
    return -1;
  }
  function Ee(i, t, e2) {
    let s, r, n, a, o, h, l, f, c = t.controls && t.controls.right, d = i.controls && i.controls.left;
    return s = t.x, o = t.y, r = (c || t).x, h = (c || t).y, n = (d || i).x, l = (d || i).y, a = i.x, f = i.y, c && t._relative && (r += t.x, h += t.y), d && i._relative && (n += i.x, l += i.y), Ne(s, o, r, h, n, l, a, f, e2);
  }
  function Ye(i, t, e2) {
    let s, r, n, a, o, h, l, f, c = t.controls && t.controls.right, d = i.controls && i.controls.left;
    return s = t.x, o = t.y, r = (c || t).x, h = (c || t).y, n = (d || i).x, l = (d || i).y, a = i.x, f = i.y, c && t._relative && (r += t.x, h += t.y), d && i._relative && (n += i.x, l += i.y), re(s, o, r, h, n, l, a, f, e2);
  }
  var Mt = class extends St {
    constructor(t, e2, s) {
      super();
      __publicField(this, "_flagOffset", true);
      __publicField(this, "_flagOpacity", true);
      __publicField(this, "_flagColor", true);
      __publicField(this, "_offset", 0);
      __publicField(this, "_opacity", 1);
      __publicField(this, "_color", "#fff");
      for (let r in vi)
        Object.defineProperty(this, r, vi[r]);
      this._renderer.type = "stop", this.offset = typeof t == "number" ? t : Mt.Index <= 0 ? 0 : 1, this.opacity = typeof s == "number" ? s : 1, this.color = typeof e2 == "string" ? e2 : Mt.Index <= 0 ? "#fff" : "#000", Mt.Index = (Mt.Index + 1) % 2;
    }
    clone(t) {
      let e2 = new Mt();
      return E.each(Mt.Properties, function(s) {
        e2[s] = this[s];
      }, this), t && t.stops && t.stops.push(e2), e2;
    }
    toObject() {
      let t = {};
      return E.each(Mt.Properties, function(e2) {
        t[e2] = this[e2];
      }, this), t;
    }
    flagReset() {
      return this._flagOffset = this._flagColor = this._flagOpacity = false, super.flagReset.call(this), this;
    }
  }, ct = Mt;
  x(ct, "Index", 0), x(ct, "Properties", ["offset", "opacity", "color"]);
  var vi = { offset: { enumerable: true, get: function() {
    return this._offset;
  }, set: function(i) {
    this._offset = i, this._flagOffset = true, this.parent && (this.parent._flagStops = true);
  } }, opacity: { enumerable: true, get: function() {
    return this._opacity;
  }, set: function(i) {
    this._opacity = i, this._flagOpacity = true, this.parent && (this.parent._flagStops = true);
  } }, color: { enumerable: true, get: function() {
    return this._color;
  }, set: function(i) {
    this._color = i, this._flagColor = true, this.parent && (this.parent._flagStops = true);
  } } };
  var ae = class extends St {
    constructor(t) {
      super();
      __publicField(this, "_flagStops", false);
      __publicField(this, "_flagSpread", false);
      __publicField(this, "_flagUnits", false);
      __publicField(this, "_spread", "");
      __publicField(this, "_units", "");
      for (let e2 in wi)
        Object.defineProperty(this, e2, wi[e2]);
      this._renderer.type = "gradient", this.id = G.Identifier + G.uniqueId(), this.classList = [], this._renderer.flagStops = fs.bind(this), this._renderer.bindStops = cs.bind(this), this._renderer.unbindStops = us.bind(this), this.spread = "pad", this.units = "objectBoundingBox", t && (this.stops = t);
    }
    clone(t) {
      let e2 = this.stops.map(function(r) {
        return r.clone();
      }), s = new ae(e2);
      return E.each(ae.Properties, function(r) {
        s[r] = this[r];
      }, this), t && t.add(s), s;
    }
    toObject() {
      let t = { stops: this.stops.map(function(e2) {
        return e2.toObject();
      }) };
      return E.each(ae.Properties, function(e2) {
        t[e2] = this[e2];
      }, this), t;
    }
    _update() {
      return (this._flagSpread || this._flagStops) && this.trigger(p.Types.change), this;
    }
    flagReset() {
      return this._flagSpread = this._flagUnits = this._flagStops = false, super.flagReset.call(this), this;
    }
  }, H = ae;
  x(H, "Stop", ct), x(H, "Properties", ["spread", "stops", "renderer", "units"]);
  var wi = { spread: { enumerable: true, get: function() {
    return this._spread;
  }, set: function(i) {
    this._spread = i, this._flagSpread = true;
  } }, units: { enumerable: true, get: function() {
    return this._units;
  }, set: function(i) {
    this._units = i, this._flagUnits = true;
  } }, stops: { enumerable: true, get: function() {
    return this._stops;
  }, set: function(i) {
    let t = this._renderer.bindStops, e2 = this._renderer.unbindStops;
    this._stops && this._stops.unbind(p.Types.insert, t).unbind(p.Types.remove, e2), this._stops = new lt((i || []).slice(0)), this._stops.bind(p.Types.insert, t).bind(p.Types.remove, e2), t(this._stops);
  } } };
  function fs() {
    this._flagStops = true;
  }
  function cs(i) {
    let t = i.length;
    for (; t--; )
      i[t].bind(p.Types.change, this._renderer.flagStops), i[t].parent = this;
    this._renderer.flagStops();
  }
  function us(i) {
    let t = i.length;
    for (; t--; )
      i[t].unbind(p.Types.change, this._renderer.flagStops), delete i[t].parent;
    this._renderer.flagStops();
  }
  var Ge = class extends H {
    constructor(t, e2, s, r, n) {
      super(n);
      __publicField(this, "_flagEndPoints", false);
      __publicField(this, "_left", null);
      __publicField(this, "_right", null);
      for (let a in ki)
        Object.defineProperty(this, a, ki[a]);
      this._renderer.type = "linear-gradient", this._renderer.flagEndPoints = ds.bind(this), this.left = new w(), this.right = new w(), typeof t == "number" && (this.left.x = t), typeof e2 == "number" && (this.left.y = e2), typeof s == "number" && (this.right.x = s), typeof r == "number" && (this.right.y = r);
    }
    clone(t) {
      let e2 = this.stops.map(function(r) {
        return r.clone();
      }), s = new Ge(this.left._x, this.left._y, this.right._x, this.right._y, e2);
      return E.each(H.Properties, function(r) {
        s[r] = this[r];
      }, this), t && t.add(s), s;
    }
    toObject() {
      let t = super.toObject.call(this);
      return t.left = this.left.toObject(), t.right = this.right.toObject(), t;
    }
    _update() {
      return (this._flagEndPoints || this._flagSpread || this._flagStops) && this.trigger(p.Types.change), this;
    }
    flagReset() {
      return this._flagEndPoints = false, super.flagReset.call(this), this;
    }
  }, U = Ge;
  x(U, "Properties", ["left", "right"]), x(U, "Stop", ct);
  var ki = { left: { enumerable: true, get: function() {
    return this._left;
  }, set: function(i) {
    this._left instanceof w && this._left.unbind(p.Types.change, this._renderer.flagEndPoints), this._left = i, this._left.bind(p.Types.change, this._renderer.flagEndPoints), this._flagEndPoints = true;
  } }, right: { enumerable: true, get: function() {
    return this._right;
  }, set: function(i) {
    this._right instanceof w && this._right.unbind(p.Types.change, this._renderer.flagEndPoints), this._right = i, this._right.bind(p.Types.change, this._renderer.flagEndPoints), this._flagEndPoints = true;
  } } };
  function ds() {
    this._flagEndPoints = true;
  }
  var oe = class extends H {
    constructor(t, e2, s, r, n, a) {
      super(r);
      __publicField(this, "_flagRadius", false);
      __publicField(this, "_flagCenter", false);
      __publicField(this, "_flagFocal", false);
      __publicField(this, "_radius", 0);
      __publicField(this, "_center", null);
      __publicField(this, "_focal", null);
      for (let o in Ai)
        Object.defineProperty(this, o, Ai[o]);
      this._renderer.type = "radial-gradient", this._renderer.flagCenter = _s.bind(this), this._renderer.flagFocal = gs.bind(this), this.center = new w(), this.radius = typeof s == "number" ? s : 1, this.focal = new w(), typeof t == "number" && (this.center.x = t), typeof e2 == "number" && (this.center.y = e2), this.focal.copy(this.center), typeof n == "number" && (this.focal.x = n), typeof a == "number" && (this.focal.y = a);
    }
    clone(t) {
      let e2 = this.stops.map(function(r) {
        return r.clone();
      }), s = new oe(this.center._x, this.center._y, this._radius, e2, this.focal._x, this.focal._y);
      return E.each(H.Properties.concat(oe.Properties), function(r) {
        s[r] = this[r];
      }, this), t && t.add(s), s;
    }
    toObject() {
      let t = super.toObject.call(this);
      return E.each(oe.Properties, function(e2) {
        t[e2] = this[e2];
      }, this), t.center = this.center.toObject(), t.focal = this.focal.toObject(), t;
    }
    _update() {
      return (this._flagRadius || this._flatCenter || this._flagFocal || this._flagSpread || this._flagStops) && this.trigger(p.Types.change), this;
    }
    flagReset() {
      return this._flagRadius = this._flagCenter = this._flagFocal = false, super.flagReset.call(this), this;
    }
  }, D = oe;
  x(D, "Stop", ct), x(D, "Properties", ["center", "radius", "focal"]);
  var Ai = { radius: { enumerable: true, get: function() {
    return this._radius;
  }, set: function(i) {
    this._radius = i, this._flagRadius = true;
  } }, center: { enumerable: true, get: function() {
    return this._center;
  }, set: function(i) {
    this._center && this._center.unbind(p.Types.change, this._renderer.flagCenter), this._center = i, this._center.bind(p.Types.change, this._renderer.flagCenter), this._flagCenter = true;
  } }, focal: { enumerable: true, get: function() {
    return this._focal;
  }, set: function(i) {
    this._focal && this._focal.unbind(p.Types.change, this._renderer.flagFocal), this._focal = i, this._focal.bind(p.Types.change, this._renderer.flagFocal), this._flagFocal = true;
  } } };
  function _s() {
    this._flagCenter = true;
  }
  function gs() {
    this._flagFocal = true;
  }
  var Fe, Ri = { video: /\.(mp4|webm|ogg)$/i, image: /\.(jpe?g|png|gif|tiff|webp)$/i, effect: /texture|gradient/i };
  W.document && (Fe = document.createElement("a"));
  var rt = class extends St {
    constructor(t, e2) {
      super();
      __publicField(this, "_flagSrc", false);
      __publicField(this, "_flagImage", false);
      __publicField(this, "_flagVideo", false);
      __publicField(this, "_flagLoaded", false);
      __publicField(this, "_flagRepeat", false);
      __publicField(this, "_flagOffset", false);
      __publicField(this, "_flagScale", false);
      __publicField(this, "_src", "");
      __publicField(this, "_image", null);
      __publicField(this, "_loaded", false);
      __publicField(this, "_repeat", "no-repeat");
      __publicField(this, "_scale", 1);
      __publicField(this, "_offset", null);
      this._renderer = {};
      for (let s in Si)
        Object.defineProperty(this, s, Si[s]);
      if (this._renderer.type = "texture", this._renderer.flagOffset = ps.bind(this), this._renderer.flagScale = ms.bind(this), this.id = G.Identifier + G.uniqueId(), this.classList = [], this.loaded = false, this.repeat = "no-repeat", this.offset = new w(), typeof e2 == "function") {
        let s = (function() {
          this.unbind(p.Types.load, s), typeof e2 == "function" && e2();
        }).bind(this);
        this.bind(p.Types.load, s);
      }
      if (typeof t == "string")
        this.src = t;
      else if (typeof t == "object") {
        let s = Object.prototype.toString.call(t);
        (s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]" || s === "[object HTMLVideoElement]" || s === "[object Image]") && (this.image = t);
      }
      this._update();
    }
    static getAbsoluteURL(t) {
      return Fe ? (Fe.href = t, Fe.href) : t;
    }
    static loadHeadlessBuffer(t, e2) {
      t.image.onload = e2, t.image.src = t.src;
    }
    static getTag(t) {
      return t && t.nodeName && t.nodeName.toLowerCase() || "img";
    }
    static getImage(t) {
      let e2 = rt.getAbsoluteURL(t);
      if (rt.ImageRegistry.contains(e2))
        return rt.ImageRegistry.get(e2);
      let s;
      return ft.Image ? (s = new ft.Image(), vt.Utils.shim(s, "img")) : W.document ? Ri.video.test(e2) ? s = document.createElement("video") : s = document.createElement("img") : console.warn("Two.js: no prototypical image defined for Two.Texture"), s.crossOrigin = "anonymous", s.referrerPolicy = "no-referrer", s;
    }
    static load(t, e2) {
      let s = t.image, r = rt.getTag(s);
      t._flagImage && (/canvas/i.test(r) ? rt.Register.canvas(t, e2) : (t._src = !ft.isHeadless && s.getAttribute("two-src") || s.src, rt.Register[r](t, e2))), t._flagSrc && (s || (s = rt.getImage(t.src), t.image = s), r = rt.getTag(s), rt.Register[r](t, e2));
    }
    clone() {
      let t = new rt(this.src);
      return t.repeat = this.repeat, t.offset.copy(this.origin), t.scale = this.scale, t;
    }
    toObject() {
      return { src: this.src, repeat: this.repeat, origin: this.origin.toObject(), scale: typeof this.scale == "number" ? this.scale : this.scale.toObject() };
    }
    _update() {
      return (this._flagSrc || this._flagImage) && (this.trigger(p.Types.change), (this._flagSrc || this._flagImage) && (this.loaded = false, rt.load(this, (function() {
        this.loaded = true, this.trigger(p.Types.change).trigger(p.Types.load);
      }).bind(this)))), this._image && this._image.readyState >= 4 && (this._flagVideo = true), this;
    }
    flagReset() {
      return this._flagSrc = this._flagImage = this._flagLoaded = this._flagRepeat = this._flagVideo = this._flagScale = this._flagOffset = false, super.flagReset.call(this), this;
    }
  }, N = rt;
  x(N, "Properties", ["src", "loaded", "repeat", "scale", "offset", "image"]), x(N, "RegularExpressions", Ri), x(N, "ImageRegistry", new Et()), x(N, "Register", { canvas: function(t, e2) {
    t._src = "#" + t.id, rt.ImageRegistry.add(t.src, t.image), typeof e2 == "function" && e2();
  }, img: function(t, e2) {
    let s = t.image, r = function(a) {
      !ft.isHeadless && s.removeEventListener && typeof s.removeEventListener == "function" && (s.removeEventListener("load", r, false), s.removeEventListener("error", n, false)), typeof e2 == "function" && e2();
    }, n = function(a) {
      throw !ft.isHeadless && typeof s.removeEventListener == "function" && (s.removeEventListener("load", r, false), s.removeEventListener("error", n, false)), new et("unable to load " + t.src);
    };
    typeof s.width == "number" && s.width > 0 && typeof s.height == "number" && s.height > 0 ? r() : !ft.isHeadless && typeof s.addEventListener == "function" && (s.addEventListener("load", r, false), s.addEventListener("error", n, false)), t._src = rt.getAbsoluteURL(t._src), !(!ft.isHeadless && s && s.getAttribute("two-src")) && (ft.isHeadless || s.setAttribute("two-src", t.src), rt.ImageRegistry.add(t.src, s), ft.isHeadless ? rt.loadHeadlessBuffer(t, r) : t.image.src = t.src);
  }, video: function(t, e2) {
    if (ft.isHeadless)
      throw new et("video textures are not implemented in headless environments.");
    let s = function(n) {
      t.image.removeEventListener("canplaythrough", s, false), t.image.removeEventListener("error", r, false), t.image.width = t.image.videoWidth, t.image.height = t.image.videoHeight, typeof e2 == "function" && e2();
    }, r = function(n) {
      throw t.image.removeEventListener("canplaythrough", s, false), t.image.removeEventListener("error", r, false), new et("unable to load " + t.src);
    };
    t._src = rt.getAbsoluteURL(t._src), t.image.getAttribute("two-src") || (t.image.setAttribute("two-src", t.src), rt.ImageRegistry.add(t.src, t.image)), t.image.readyState >= 4 ? s() : (t.image.addEventListener("canplaythrough", s, false), t.image.addEventListener("error", r, false), t.image.src = t.src, t.image.load());
  } });
  var Si = { src: { enumerable: true, get: function() {
    return this._src;
  }, set: function(i) {
    this._src = i, this._flagSrc = true;
  } }, loaded: { enumerable: true, get: function() {
    return this._loaded;
  }, set: function(i) {
    this._loaded = i, this._flagLoaded = true;
  } }, repeat: { enumerable: true, get: function() {
    return this._repeat;
  }, set: function(i) {
    this._repeat = i, this._flagRepeat = true;
  } }, image: { enumerable: true, get: function() {
    return this._image;
  }, set: function(i) {
    let t = N.getTag(i), e2;
    switch (t) {
      case "canvas":
        e2 = "#" + i.id;
        break;
      default:
        e2 = i.src;
    }
    N.ImageRegistry.contains(e2) ? this._image = N.ImageRegistry.get(i.src) : this._image = i, this._flagImage = true;
  } }, offset: { enumerable: true, get: function() {
    return this._offset;
  }, set: function(i) {
    this._offset && this._offset.unbind(p.Types.change, this._renderer.flagOffset), this._offset = i, this._offset.bind(p.Types.change, this._renderer.flagOffset), this._flagOffset = true;
  } }, scale: { enumerable: true, get: function() {
    return this._scale;
  }, set: function(i) {
    this._scale instanceof w && this._scale.unbind(p.Types.change, this._renderer.flagScale), this._scale = i, this._scale instanceof w && this._scale.bind(p.Types.change, this._renderer.flagScale), this._flagScale = true;
  } } };
  function ps() {
    this._flagOffset = true;
  }
  function ms() {
    this._flagScale = true;
  }
  var Xt = Math.min, Ht = Math.max, ys = Math.ceil, bs = Math.floor, xs = new w(), Yt = class extends ot {
    constructor(t, e2, s, r) {
      super();
      __publicField(this, "_flagVertices", true);
      __publicField(this, "_flagLength", true);
      __publicField(this, "_flagFill", true);
      __publicField(this, "_flagStroke", true);
      __publicField(this, "_flagLinewidth", true);
      __publicField(this, "_flagOpacity", true);
      __publicField(this, "_flagVisible", true);
      __publicField(this, "_flagCap", true);
      __publicField(this, "_flagJoin", true);
      __publicField(this, "_flagMiter", true);
      __publicField(this, "_flagMask", false);
      __publicField(this, "_flagClip", false);
      __publicField(this, "_length", 0);
      __publicField(this, "_fill", "#fff");
      __publicField(this, "_stroke", "#000");
      __publicField(this, "_linewidth", 1);
      __publicField(this, "_opacity", 1);
      __publicField(this, "_visible", true);
      __publicField(this, "_cap", "round");
      __publicField(this, "_join", "round");
      __publicField(this, "_miter", 4);
      __publicField(this, "_closed", true);
      __publicField(this, "_curved", false);
      __publicField(this, "_automatic", true);
      __publicField(this, "_beginning", 0);
      __publicField(this, "_ending", 1);
      __publicField(this, "_mask", null);
      __publicField(this, "_clip", false);
      __publicField(this, "_dashes", null);
      for (let n in Ei)
        Object.defineProperty(this, n, Ei[n]);
      this._renderer.type = "path", this._renderer.flagVertices = qe.bind(this), this._renderer.bindVertices = Ke.bind(this), this._renderer.unbindVertices = $e.bind(this), this._renderer.flagFill = Je.bind(this), this._renderer.flagStroke = Ze.bind(this), this._renderer.vertices = [], this._renderer.collection = [], this.closed = !!e2, this.curved = !!s, this.beginning = 0, this.ending = 1, this.fill = "#fff", this.stroke = "#000", this.linewidth = 1, this.opacity = 1, this.className = "", this.visible = true, this.cap = "butt", this.join = "miter", this.miter = 4, this.vertices = t, this.automatic = !r, this.dashes = [], this.dashes.offset = 0;
    }
    clone(t) {
      let e2 = new Yt();
      for (let s = 0; s < this.vertices.length; s++)
        e2.vertices.push(this.vertices[s].clone());
      for (let s = 0; s < Yt.Properties.length; s++) {
        let r = Yt.Properties[s];
        e2[r] = this[r];
      }
      return e2.className = this.className, e2.translation.copy(this.translation), e2.rotation = this.rotation, e2.scale = this.scale, e2.skewX = this.skewX, e2.skewY = this.skewY, this.matrix.manual && e2.matrix.copy(this.matrix), t && t.add(e2), e2._update();
    }
    toObject() {
      let t = { vertices: this.vertices.map(function(e2) {
        return e2.toObject();
      }) };
      return E.each(Yt.Properties, function(e2) {
        typeof this[e2] < "u" && (this[e2].toObject ? t[e2] = this[e2].toObject() : t[e2] = this[e2]);
      }, this), t.className = this.className, t.translation = this.translation.toObject(), t.rotation = this.rotation, t.scale = this.scale instanceof w ? this.scale.toObject() : this.scale, t.skewX = this.skewX, t.skewY = this.skewY, this.matrix.manual && (t.matrix = this.matrix.toObject()), t;
    }
    noFill() {
      return this.fill = "none", this;
    }
    noStroke() {
      return this.stroke = "none", this;
    }
    corner() {
      let t = this.getBoundingClientRect(true), e2 = t.width / 2, s = t.height / 2, r = t.left + t.width / 2, n = t.top + t.height / 2;
      for (let a = 0; a < this.vertices.length; a++) {
        let o = this.vertices[a];
        o.x -= r, o.y -= n, o.x += e2, o.y += s;
      }
      return this.mask && (this.mask.translation.x -= r, this.mask.translation.x += e2, this.mask.translation.y -= n, this.mask.translation.y += s), this;
    }
    center() {
      let t = this.getBoundingClientRect(true), e2 = t.left + t.width / 2 - this.translation.x, s = t.top + t.height / 2 - this.translation.y;
      for (let r = 0; r < this.vertices.length; r++) {
        let n = this.vertices[r];
        n.x -= e2, n.y -= s;
      }
      return this.mask && (this.mask.translation.x -= e2, this.mask.translation.y -= s), this;
    }
    getBoundingClientRect(t) {
      let e2, s, r, n, a, o, h = 1 / 0, l = -1 / 0, f = 1 / 0, c = -1 / 0;
      if (this._update(true), e2 = t ? this.matrix : this.worldMatrix, s = (this.linewidth || 0) / 2, r = this._renderer.vertices.length, this.linewidth > 0 || this.stroke && !/(transparent|none)/i.test(this.stroke))
        if (this.matrix.manual) {
          let { scaleX: d, scaleY: _ } = Rt(e2.elements[0], e2.elements[3], e2.elements[1], e2.elements[4], e2.elements[2], e2.elements[5]);
          typeof d == "number" && typeof _ == "number" && (s = Math.max(d, _) * (this.linewidth || 0) / 2);
        } else
          s *= typeof this.scale == "number" ? this.scale : Math.max(this.scale.x, this.scale.y);
      if (r <= 0)
        return { width: 0, height: 0 };
      for (n = 0; n < r; n++) {
        o = this._renderer.vertices[n], a = this._renderer.vertices[(n + r - 1) % r];
        let [d, _] = e2.multiply(a.x, a.y), [u, y] = e2.multiply(o.x, o.y);
        if (a.controls && o.controls) {
          let b = a.controls.right.x, m = a.controls.right.y;
          a.relative && (b += a.x, m += a.y);
          let [g, k] = e2.multiply(b, m), R = o.controls.left.x, A = o.controls.left.y;
          o.relative && (R += o.x, A += o.y);
          let [S, F] = e2.multiply(R, A), B = je(d, _, g, k, S, F, u, y);
          f = Xt(B.min.y - s, f), h = Xt(B.min.x - s, h), l = Ht(B.max.x + s, l), c = Ht(B.max.y + s, c);
        } else
          n <= 1 && (f = Xt(_ - s, f), h = Xt(d - s, h), l = Ht(d + s, l), c = Ht(_ + s, c)), f = Xt(y - s, f), h = Xt(u - s, h), l = Ht(u + s, l), c = Ht(y + s, c);
      }
      return { top: f, left: h, right: l, bottom: c, width: l - h, height: c - f };
    }
    getPointAt(t, e2) {
      let s, r, n, a, o, h, l, f, c, d, _, u, y, b, m, g = this.length * Math.min(Math.max(t, 0), 1), k = this.vertices.length, R = k - 1, A = null, S = null;
      for (let tt = 0, _t = this._lengths.length, nt = 0; tt < _t; tt++) {
        if (nt + this._lengths[tt] >= g) {
          this._closed ? (s = st(tt, k), r = st(tt - 1, k), tt === 0 && (s = r, r = tt)) : (s = tt, r = Math.min(Math.max(tt - 1, 0), R)), A = this.vertices[s], S = this.vertices[r], g -= nt, this._lengths[tt] !== 0 ? t = g / this._lengths[tt] : t = 0;
          break;
        }
        nt += this._lengths[tt];
      }
      if (A === null || S === null)
        return null;
      if (A) {
        if (!S)
          return A;
      } else
        return S;
      m = S.controls && S.controls.right, b = A.controls && A.controls.left, o = S.x, d = S.y, h = (m || S).x, _ = (m || S).y, l = (b || A).x, u = (b || A).y, f = A.x, y = A.y, m && S.relative && (h += S.x, _ += S.y), b && A.relative && (l += A.x, u += A.y), a = zt(t, o, h, l, f), c = zt(t, d, _, u, y);
      let F = at(o, h, t), B = at(d, _, t), L = at(h, l, t), M = at(_, u, t), V = at(l, f, t), j = at(u, y, t), X = at(F, L, t), z = at(B, M, t), it = at(L, V, t), ht = at(M, j, t);
      return E.isObject(e2) ? (e2.x = a, e2.y = c, e2 instanceof T && (e2.controls.left.x = X, e2.controls.left.y = z, e2.controls.right.x = it, e2.controls.right.y = ht, (typeof e2.relative != "boolean" || e2.relative) && (e2.controls.left.x -= a, e2.controls.left.y -= c, e2.controls.right.x -= a, e2.controls.right.y -= c)), e2.t = t, e2) : (n = new T(a, c, X - a, z - c, it - a, ht - c, this._curved ? v.curve : v.line), n.t = t, n);
    }
    plot() {
      if (this.curved)
        return Ve(this._collection, this.closed), this;
      for (let t = 0; t < this._collection.length; t++)
        this._collection[t].command = t === 0 ? v.move : v.line;
      return this;
    }
    subdivide(t) {
      this._update();
      let e2 = this.vertices.length - 1, s = this._closed || this.vertices[e2]._command === v.close, r = this.vertices[e2], n = [], a;
      return E.each(this.vertices, function(o, h) {
        if (h <= 0 && !s) {
          r = o;
          return;
        }
        if (o.command === v.move) {
          n.push(new T(r.x, r.y)), h > 0 && (n[n.length - 1].command = v.line), r = o;
          return;
        }
        a = Ye(o, r, t), n = n.concat(a), E.each(a, function(l, f) {
          f <= 0 && r.command === v.move ? l.command = v.move : l.command = v.line;
        }), h >= e2 && (this._closed && this._automatic ? (r = o, a = Ye(o, r, t), n = n.concat(a), E.each(a, function(l, f) {
          f <= 0 && r.command === v.move ? l.command = v.move : l.command = v.line;
        })) : s && n.push(new T(o.x, o.y)), n[n.length - 1].command = s ? v.close : v.line), r = o;
      }, this), this._automatic = false, this._curved = false, this.vertices = n, this;
    }
    _updateLength(t, e2) {
      e2 || this._update();
      let s = this.vertices.length, r = s - 1, n = false, a = this.vertices[r], o = 0;
      return typeof this._lengths > "u" && (this._lengths = []), E.each(this.vertices, function(h, l) {
        if (l <= 0 && !n || h.command === v.move) {
          a = h, this._lengths[l] = 0;
          return;
        }
        this._lengths[l] = Ee(h, a, t), o += this._lengths[l], l >= r && n && (a = this.vertices[(l + 1) % s], this._lengths[l + 1] = Ee(h, a, t), o += this._lengths[l + 1]), a = h;
      }, this), this._length = o, this._flagLength = false, this;
    }
    _update() {
      if (this._flagVertices) {
        this._automatic && this.plot(), this._flagLength && this._updateLength(void 0, true);
        let t = this._collection.length, e2 = this._closed, s = Math.min(this._beginning, this._ending), r = Math.max(this._beginning, this._ending), n = Wt(this, s * this._length), a = Wt(this, r * this._length), o = ys(n), h = bs(a), l, f, c, d, _, u;
        for (this._renderer.vertices.length = 0, u = 0; u < t; u++)
          this._renderer.collection.length <= u && this._renderer.collection.push(new T()), u > h && !f ? (_ = this._renderer.collection[u].copy(this._collection[u]), this.getPointAt(r, _), _.command = this._renderer.collection[u].command, this._renderer.vertices.push(_), f = _, c = this._collection[u - 1], c && c.controls && (_.relative ? _.controls.right.clear() : _.controls.right.copy(_), c.relative ? this._renderer.collection[u - 1].controls.right.copy(c.controls.right).lerp(w.zero, 1 - _.t) : this._renderer.collection[u - 1].controls.right.copy(c.controls.right).lerp(c, 1 - _.t))) : u >= o && u <= h && (_ = this._renderer.collection[u].copy(this._collection[u]), this._renderer.vertices.push(_), u === h && He(this, r) ? (f = _, !e2 && f.controls && (f.relative ? f.controls.right.clear() : f.controls.right.copy(f))) : u === o && He(this, s) && (l = _, l.command = v.move, !e2 && l.controls && (l.relative ? l.controls.left.clear() : l.controls.left.copy(l))));
        o > 0 && !l && (u = o - 1, _ = this._renderer.collection[u].copy(this._collection[u]), this.getPointAt(s, _), _.command = v.move, this._renderer.vertices.unshift(_), d = this._collection[u + 1], d && d.controls && (_.controls.left.clear(), d.relative ? this._renderer.collection[u + 1].controls.left.copy(d.controls.left).lerp(w.zero, _.t) : (xs.copy(d), this._renderer.collection[u + 1].controls.left.copy(d.controls.left).lerp(d, _.t))));
      }
      return ot.prototype._update.apply(this, arguments), this;
    }
    flagReset() {
      return this._flagVertices = this._flagLength = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagCap = this._flagJoin = this._flagMiter = this._flagClip = false, ot.prototype.flagReset.call(this), this;
    }
  }, O = Yt;
  x(O, "Properties", ["fill", "stroke", "linewidth", "opacity", "visible", "cap", "join", "miter", "closed", "curved", "automatic", "beginning", "ending"]), x(O, "Utils", { getCurveLength: Ee });
  var Ei = { linewidth: { enumerable: true, get: function() {
    return this._linewidth;
  }, set: function(i) {
    this._linewidth = i, this._flagLinewidth = true;
  } }, opacity: { enumerable: true, get: function() {
    return this._opacity;
  }, set: function(i) {
    this._opacity = i, this._flagOpacity = true;
  } }, visible: { enumerable: true, get: function() {
    return this._visible;
  }, set: function(i) {
    this._visible = i, this._flagVisible = true;
  } }, cap: { enumerable: true, get: function() {
    return this._cap;
  }, set: function(i) {
    this._cap = i, this._flagCap = true;
  } }, join: { enumerable: true, get: function() {
    return this._join;
  }, set: function(i) {
    this._join = i, this._flagJoin = true;
  } }, miter: { enumerable: true, get: function() {
    return this._miter;
  }, set: function(i) {
    this._miter = i, this._flagMiter = true;
  } }, fill: { enumerable: true, get: function() {
    return this._fill;
  }, set: function(i) {
    (this._fill instanceof H || this._fill instanceof U || this._fill instanceof D || this._fill instanceof N) && this._fill.unbind(p.Types.change, this._renderer.flagFill), this._fill = i, this._flagFill = true, (this._fill instanceof H || this._fill instanceof U || this._fill instanceof D || this._fill instanceof N) && this._fill.bind(p.Types.change, this._renderer.flagFill);
  } }, stroke: { enumerable: true, get: function() {
    return this._stroke;
  }, set: function(i) {
    (this._stroke instanceof H || this._stroke instanceof U || this._stroke instanceof D || this._stroke instanceof N) && this._stroke.unbind(p.Types.change, this._renderer.flagStroke), this._stroke = i, this._flagStroke = true, (this._stroke instanceof H || this._stroke instanceof U || this._stroke instanceof D || this._stroke instanceof N) && this._stroke.bind(p.Types.change, this._renderer.flagStroke);
  } }, length: { get: function() {
    return this._flagLength && this._updateLength(), this._length;
  } }, closed: { enumerable: true, get: function() {
    return this._closed;
  }, set: function(i) {
    this._closed = !!i, this._flagVertices = true;
  } }, curved: { enumerable: true, get: function() {
    return this._curved;
  }, set: function(i) {
    this._curved = !!i, this._flagVertices = true;
  } }, automatic: { enumerable: true, get: function() {
    return this._automatic;
  }, set: function(i) {
    if (i === this._automatic)
      return;
    this._automatic = !!i;
    let t = this._automatic ? "ignore" : "listen";
    E.each(this.vertices, function(e2) {
      e2[t]();
    });
  } }, beginning: { enumerable: true, get: function() {
    return this._beginning;
  }, set: function(i) {
    this._beginning = i, this._flagVertices = true;
  } }, ending: { enumerable: true, get: function() {
    return this._ending;
  }, set: function(i) {
    this._ending = i, this._flagVertices = true;
  } }, vertices: { enumerable: true, get: function() {
    return this._collection;
  }, set: function(i) {
    let t = this._renderer.bindVertices, e2 = this._renderer.unbindVertices;
    this._collection && this._collection.unbind(p.Types.insert, t).unbind(p.Types.remove, e2), i instanceof lt ? this._collection = i : this._collection = new lt(i || []), this._collection.bind(p.Types.insert, t).bind(p.Types.remove, e2), t(this._collection);
  } }, mask: { enumerable: true, get: function() {
    return this._mask;
  }, set: function(i) {
    this._mask = i, this._flagMask = true, E.isObject(i) && !i.clip && (i.clip = true);
  } }, clip: { enumerable: true, get: function() {
    return this._clip;
  }, set: function(i) {
    this._clip = i, this._flagClip = true;
  } }, dashes: { enumerable: true, get: function() {
    return this._dashes;
  }, set: function(i) {
    typeof i.offset != "number" && (i.offset = this.dashes && this._dashes.offset || 0), this._dashes = i;
  } } };
  function qe() {
    this._flagVertices = true, this._flagLength = true, this.parent && (this.parent._flagLength = true);
  }
  function Ke(i) {
    let t = i.length;
    for (; t--; )
      i[t].bind(p.Types.change, this._renderer.flagVertices);
    this._renderer.flagVertices();
  }
  function $e(i) {
    let t = i.length;
    for (; t--; )
      i[t].unbind(p.Types.change, this._renderer.flagVertices);
    this._renderer.flagVertices();
  }
  function Je() {
    this._flagFill = true;
  }
  function Ze() {
    this._flagStroke = true;
  }
  var Qe = class extends O {
    constructor(t, e2, s, r) {
      let n = [new T(), new T(), new T(), new T()];
      super(n, true, false, true);
      __publicField(this, "_flagWidth", 0);
      __publicField(this, "_flagHeight", 0);
      __publicField(this, "_width", 0);
      __publicField(this, "_height", 0);
      __publicField(this, "_origin", null);
      for (let a in Fi)
        Object.defineProperty(this, a, Fi[a]);
      this.width = typeof s == "number" ? s : 1, this.height = typeof r == "number" ? r : 1, this.origin = new w(), typeof t == "number" && (this.translation.x = t), typeof e2 == "number" && (this.translation.y = e2), this._update();
    }
    _update() {
      if (this._flagVertices || this._flagWidth || this._flagHeight) {
        let t = this._width / 2, e2 = this._height / 2;
        !this._closed && this.vertices.length === 4 && this.vertices.push(new T()), this.vertices[0].set(-t, -e2).sub(this._origin).command = v.move, this.vertices[1].set(t, -e2).sub(this._origin).command = v.line, this.vertices[2].set(t, e2).sub(this._origin).command = v.line, this.vertices[3].set(-t, e2).sub(this._origin).command = v.line, this.vertices[4] && (this.vertices[4].set(-t, -e2).sub(this._origin).command = v.line);
      }
      return super._update.call(this), this;
    }
    flagReset() {
      return this._flagWidth = this._flagHeight = false, super.flagReset.call(this), this;
    }
    clone(t) {
      let e2 = new Qe(0, 0, this.width, this.height);
      e2.translation.copy(this.translation), e2.rotation = this.rotation, e2.scale = this.scale, e2.skewX = this.skewX, e2.skewY = this.skewY, this.matrix.manual && e2.matrix.copy(this.matrix);
      for (let s = 0; s < O.Properties.length; s++) {
        let r = O.Properties[s];
        e2[r] = this[r];
      }
      return t && t.add(e2), e2;
    }
    toObject() {
      let t = super.toObject.call(this);
      return t.width = this.width, t.height = this.height, t.origin = this.origin.toObject(), t;
    }
  }, pt = Qe;
  x(pt, "Properties", ["width", "height"]);
  var Fi = { width: { enumerable: true, get: function() {
    return this._width;
  }, set: function(i) {
    this._width = i, this._flagWidth = true;
  } }, height: { enumerable: true, get: function() {
    return this._height;
  }, set: function(i) {
    this._height = i, this._flagHeight = true;
  } }, origin: { enumerable: true, get: function() {
    return this._origin;
  }, set: function(i) {
    this._origin && this._origin.unbind(p.Types.change, this._renderer.flagVertices), this._origin = i, this._origin.bind(p.Types.change, this._renderer.flagVertices), this._renderer.flagVertices();
  } } };
  var ti = class extends pt {
    constructor(t, e2, s, r, n, a) {
      super(e2, s, 0, 0);
      __publicField(this, "_flagTexture", false);
      __publicField(this, "_flagColumns", false);
      __publicField(this, "_flagRows", false);
      __publicField(this, "_flagFrameRate", false);
      __publicField(this, "_flagIndex", false);
      __publicField(this, "_amount", 1);
      __publicField(this, "_duration", 0);
      __publicField(this, "_startTime", 0);
      __publicField(this, "_playing", false);
      __publicField(this, "_firstFrame", 0);
      __publicField(this, "_lastFrame", 0);
      __publicField(this, "_loop", true);
      __publicField(this, "_texture", null);
      __publicField(this, "_columns", 1);
      __publicField(this, "_rows", 1);
      __publicField(this, "_frameRate", 0);
      __publicField(this, "_index", 0);
      __publicField(this, "_origin", null);
      for (let o in Ti)
        Object.defineProperty(this, o, Ti[o]);
      this.noStroke(), this.noFill(), t instanceof N ? this.texture = t : typeof t == "string" && (this.texture = new N(t)), this.origin = new w(), this._update(), typeof r == "number" && (this.columns = r), typeof n == "number" && (this.rows = n), typeof a == "number" && (this.frameRate = a), this.index = 0;
    }
    play(t, e2, s) {
      return this._playing = true, this._firstFrame = 0, this._lastFrame = this.amount - 1, this._startTime = E.performance.now(), typeof t == "number" && (this._firstFrame = t), typeof e2 == "number" && (this._lastFrame = e2), typeof s == "function" ? this._onLastFrame = s : delete this._onLastFrame, this._index !== this._firstFrame && (this._startTime -= 1e3 * Math.abs(this._index - this._firstFrame) / this._frameRate), this;
    }
    pause() {
      return this._playing = false, this;
    }
    stop() {
      return this._playing = false, this._index = 0, this;
    }
    clone(t) {
      let e2 = new ti(this.texture, this.translation.x, this.translation.y, this.columns, this.rows, this.frameRate);
      return this.playing && (e2.play(this._firstFrame, this._lastFrame), e2._loop = this._loop), t && t.add(e2), e2;
    }
    toObject() {
      let t = super.toObject.call(this);
      return t.texture = this.texture.toObject(), t.columns = this.columns, t.rows = this.rows, t.frameRate = this.frameRate, t.index = this.index, t._firstFrame = this._firstFrame, t._lastFrame = this._lastFrame, t._loop = this._loop, t;
    }
    _update() {
      let t = this._texture, e2 = this._columns, s = this._rows, r, n, a, o, h, l, f, c, d;
      if (t && ((this._flagColumns || this._flagRows) && (this._amount = this._columns * this._rows), this._flagFrameRate && (this._duration = 1e3 * this._amount / this._frameRate), this._flagTexture && (this.fill = t), t.loaded)) {
        f = t.image.width, c = t.image.height, r = f / e2, n = c / s, o = this._amount, this.width !== r && (this.width = r), this.height !== n && (this.height = n), this._playing && this._frameRate > 0 && (E.isNaN(this._lastFrame) && (this._lastFrame = o - 1), a = E.performance.now() - this._startTime, d = this._lastFrame + 1, h = 1e3 * (d - this._firstFrame) / this._frameRate, this._loop ? a = a % h : a = Math.min(a, h), l = at(this._firstFrame, d, a / h), l = Math.floor(l), l !== this._index && (this._index = l, l >= this._lastFrame - 1 && this._onLastFrame && this._onLastFrame()));
        let _ = this._index % e2, u = Math.floor(this._index / e2), y = -r * _ + (f - r) / 2, b = -n * u + (c - n) / 2;
        y !== t.offset.x && (t.offset.x = y), b !== t.offset.y && (t.offset.y = b);
      }
      return super._update.call(this), this;
    }
    flagReset() {
      return this._flagTexture = this._flagColumns = this._flagRows = this._flagFrameRate = false, super.flagReset.call(this), this;
    }
  }, Lt = ti;
  x(Lt, "Properties", ["texture", "columns", "rows", "frameRate", "index"]);
  var Ti = { texture: { enumerable: true, get: function() {
    return this._texture;
  }, set: function(i) {
    this._texture = i, this._flagTexture = true;
  } }, columns: { enumerable: true, get: function() {
    return this._columns;
  }, set: function(i) {
    this._columns = i, this._flagColumns = true;
  } }, rows: { enumerable: true, get: function() {
    return this._rows;
  }, set: function(i) {
    this._rows = i, this._flagRows = true;
  } }, frameRate: { enumerable: true, get: function() {
    return this._frameRate;
  }, set: function(i) {
    this._frameRate = i, this._flagFrameRate = true;
  } }, index: { enumerable: true, get: function() {
    return this._index;
  }, set: function(i) {
    this._index = i, this._flagIndex = true;
  } } };
  var ei = Math.cos, ii = Math.sin, le = class extends O {
    constructor(t, e2, s, r) {
      let n = r ? Math.max(r, 2) : 4, a = [];
      for (let o = 0; o < n; o++)
        a.push(new T(0, 0, 0, 0, 0, 0));
      super(a, true, true, true);
      __publicField(this, "_flagRadius", false);
      __publicField(this, "_radius", 0);
      for (let o in Mi)
        Object.defineProperty(this, o, Mi[o]);
      typeof s == "number" && (this.radius = s), this._update(), typeof t == "number" && (this.translation.x = t), typeof e2 == "number" && (this.translation.y = e2);
    }
    _update() {
      if (this._flagVertices || this._flagRadius) {
        let t = this.vertices.length;
        !this._closed && t > 2 && (t -= 1);
        let e2 = 4 / 3 * Math.tan(Math.PI / (t * 2)), s = this._radius, r = s * e2;
        for (let n = 0; n < this.vertices.length; n++) {
          let o = n / t * J, h = s * ei(o), l = s * ii(o), f = r * ei(o - Z), c = r * ii(o - Z), d = r * ei(o + Z), _ = r * ii(o + Z), u = this.vertices[n];
          u.command = n === 0 ? v.move : v.curve, u.set(h, l), u.controls.left.set(f, c), u.controls.right.set(d, _);
        }
      }
      return super._update.call(this), this;
    }
    flagReset() {
      return this._flagRadius = false, super.flagReset.call(this), this;
    }
    clone(t) {
      let e2 = new le(0, 0, this.radius, this.vertices.length);
      e2.translation.copy(this.translation), e2.rotation = this.rotation, e2.scale = this.scale, e2.skewX = this.skewX, e2.skewY = this.skewY, this.matrix.manual && e2.matrix.copy(this.matrix);
      for (let s = 0; s < O.Properties.length; s++) {
        let r = O.Properties[s];
        e2[r] = this[r];
      }
      return t && t.add(e2), e2;
    }
    toObject() {
      let t = super.toObject.call(this);
      for (let e2 = 0; e2 < le.Properties.length; e2++) {
        let s = le.Properties[e2];
        t[s] = this[s];
      }
      return t;
    }
  }, Ot = le;
  x(Ot, "Properties", ["radius"]);
  var Mi = { radius: { enumerable: true, get: function() {
    return this._radius;
  }, set: function(i) {
    this._radius = i, this._flagRadius = true;
  } } };
  var si = Math.cos, ri = Math.sin, he = class extends O {
    constructor(t, e2, s, r, n) {
      typeof r != "number" && typeof s == "number" && (r = s);
      let a = n ? Math.max(n, 2) : 4, o = [];
      for (let h = 0; h < a; h++)
        o.push(new T());
      super(o, true, true, true);
      __publicField(this, "_flagWidth", false);
      __publicField(this, "_flagHeight", false);
      __publicField(this, "_width", 0);
      __publicField(this, "_height", 0);
      for (let h in Ci)
        Object.defineProperty(this, h, Ci[h]);
      typeof s == "number" && (this.width = s * 2), typeof r == "number" && (this.height = r * 2), this._update(), typeof t == "number" && (this.translation.x = t), typeof e2 == "number" && (this.translation.y = e2);
    }
    _update() {
      if (this._flagVertices || this._flagWidth || this._flagHeight) {
        let t = this.vertices.length;
        !this._closed && t > 2 && (t -= 1);
        let e2 = 4 / 3 * Math.tan(Math.PI / (this.vertices.length * 2)), s = this._width / 2, r = this._height / 2;
        for (let n = 0; n < this.vertices.length; n++) {
          let o = n / t * J, h = s * si(o), l = r * ri(o), f = s * e2 * si(o - Z), c = r * e2 * ri(o - Z), d = s * e2 * si(o + Z), _ = r * e2 * ri(o + Z), u = this.vertices[n];
          u.command = n === 0 ? v.move : v.curve, u.set(h, l), u.controls.left.set(f, c), u.controls.right.set(d, _);
        }
      }
      return super._update.call(this), this;
    }
    flagReset() {
      return this._flagWidth = this._flagHeight = false, super.flagReset.call(this), this;
    }
    clone(t) {
      let e2 = this.width / 2, s = this.height / 2, r = this.vertices.length, n = new he(0, 0, e2, s, r);
      n.translation.copy(this.translation), n.rotation = this.rotation, n.scale = this.scale, n.skewX = this.skewX, n.skewY = this.skewY, this.matrix.manual && n.matrix.copy(this.matrix);
      for (let a = 0; a < O.Properties.length; a++) {
        let o = O.Properties[a];
        n[o] = this[o];
      }
      return t && t.add(n), n;
    }
    toObject() {
      let t = super.toObject.call(this);
      for (let e2 = 0; e2 < he.Properties.length; e2++) {
        let s = he.Properties[e2];
        t[s] = this[s];
      }
      return t;
    }
  }, Pt = he;
  x(Pt, "Properties", ["width", "height"]);
  var Ci = { width: { enumerable: true, get: function() {
    return this._width;
  }, set: function(i) {
    this._width = i, this._flagWidth = true;
  } }, height: { enumerable: true, get: function() {
    return this._height;
  }, set: function(i) {
    this._height = i, this._flagHeight = true;
  } } };
  var jt = class extends O {
    constructor(t, e2, s, r) {
      let n = [new T(t, e2), new T(s, r)];
      super(n);
      for (let a in Li)
        Object.defineProperty(this, a, Li[a]);
      this.vertices[0].command = v.move, this.vertices[1].command = v.line, this.automatic = false;
    }
  }, Li = { left: { enumerable: true, get: function() {
    return this.vertices[0];
  }, set: function(i) {
    if (E.isObject(i))
      this.vertices.splice(0, 1, i);
    else {
      let t = new et("Two.Line.x argument is not an object.");
      console.warn(t.name, t.message);
    }
  } }, right: { enumerable: true, get: function() {
    return this.vertices[1];
  }, set: function(i) {
    if (E.isObject(i))
      this.vertices.splice(1, 1, i);
    else {
      let t = new et("Two.Line.y argument is not an object.");
      console.warn(t.name, t.message);
    }
  } } };
  var fe = class extends O {
    constructor(t, e2, s, r, n) {
      typeof n > "u" && typeof s == "number" && typeof r == "number" && (n = Math.floor(Math.min(s, r) / 12));
      let a = [];
      for (let o = 0; o < 10; o++)
        a.push(new T(0, 0, 0, 0, 0, 0, o === 0 ? v.move : v.curve));
      super(a);
      __publicField(this, "_flagWidth", false);
      __publicField(this, "_flagHeight", false);
      __publicField(this, "_flagRadius", false);
      __publicField(this, "_width", 0);
      __publicField(this, "_height", 0);
      __publicField(this, "_radius", 12);
      for (let o in Oi)
        Object.defineProperty(this, o, Oi[o]);
      this.closed = true, this.automatic = false, this._renderer.flagRadius = vs.bind(this), typeof s == "number" && (this.width = s), typeof r == "number" && (this.height = r), typeof n == "number" && (this.radius = n), this._update(), typeof t == "number" && (this.translation.x = t), typeof e2 == "number" && (this.translation.y = e2);
    }
    _update() {
      if (this._flagVertices || this._flagWidth || this._flagHeight || this._flagRadius) {
        let t = this._width, e2 = this._height, s, r;
        this._radius instanceof w ? (s = this._radius.x, r = this._radius.y) : (s = this._radius, r = this._radius);
        let n, a = t / 2, o = e2 / 2;
        n = this.vertices[0], n.x = -(a - s), n.y = -o, n = this.vertices[1], n.x = a - s, n.y = -o, n.controls.left.clear(), n.controls.right.x = s, n.controls.right.y = 0, n = this.vertices[2], n.x = a, n.y = -(o - r), n.controls.right.clear(), n.controls.left.clear(), n = this.vertices[3], n.x = a, n.y = o - r, n.controls.left.clear(), n.controls.right.x = 0, n.controls.right.y = r, n = this.vertices[4], n.x = a - s, n.y = o, n.controls.right.clear(), n.controls.left.clear(), n = this.vertices[5], n.x = -(a - s), n.y = o, n.controls.left.clear(), n.controls.right.x = -s, n.controls.right.y = 0, n = this.vertices[6], n.x = -a, n.y = o - r, n.controls.left.clear(), n.controls.right.clear(), n = this.vertices[7], n.x = -a, n.y = -(o - r), n.controls.left.clear(), n.controls.right.x = 0, n.controls.right.y = -r, n = this.vertices[8], n.x = -(a - s), n.y = -o, n.controls.left.clear(), n.controls.right.clear(), n = this.vertices[9], n.copy(this.vertices[8]);
      }
      return super._update.call(this), this;
    }
    flagReset() {
      return this._flagWidth = this._flagHeight = this._flagRadius = false, super.flagReset.call(this), this;
    }
    clone(t) {
      let e2 = this.width, s = this.height, r = this.radius, n = new fe(0, 0, e2, s, r);
      n.translation.copy(this.translation), n.rotation = this.rotation, n.scale = this.scale, n.skewX = this.skewX, n.skewY = this.skewY, this.matrix.manual && n.matrix.copy(this.matrix);
      for (let a = 0; a < O.Properties.length; a++) {
        let o = O.Properties[a];
        n[o] = this[o];
      }
      return t && t.add(n), n;
    }
    toObject() {
      let t = super.toObject.call(this);
      for (let e2 = 0; e2 < fe.Properties.length; e2++) {
        let s = fe.Properties[e2];
        t[s] = this[s];
      }
      return t.radius = typeof this.radius == "number" ? this.radius : this.radius.toObject(), t;
    }
  }, It = fe;
  x(It, "Properties", ["width", "height", "radius"]);
  var Oi = { width: { enumerable: true, get: function() {
    return this._width;
  }, set: function(i) {
    this._width = i, this._flagWidth = true;
  } }, height: { enumerable: true, get: function() {
    return this._height;
  }, set: function(i) {
    this._height = i, this._flagHeight = true;
  } }, radius: { enumerable: true, get: function() {
    return this._radius;
  }, set: function(i) {
    this._radius instanceof w && this._radius.unbind(p.Types.change, this._renderer.flagRadius), this._radius = i, this._radius instanceof w && this._radius.bind(p.Types.change, this._renderer.flagRadius), this._flagRadius = true;
  } } };
  function vs() {
    this._flagRadius = true;
  }
  var ni, Pi = Math.min, Ii = Math.max;
  W.document && (ni = document.createElement("canvas"));
  var At = class extends ot {
    constructor(t, e2, s, r) {
      super();
      __publicField(this, "_flagValue", true);
      __publicField(this, "_flagFamily", true);
      __publicField(this, "_flagSize", true);
      __publicField(this, "_flagLeading", true);
      __publicField(this, "_flagAlignment", true);
      __publicField(this, "_flagBaseline", true);
      __publicField(this, "_flagStyle", true);
      __publicField(this, "_flagWeight", true);
      __publicField(this, "_flagDecoration", true);
      __publicField(this, "_flagFill", true);
      __publicField(this, "_flagStroke", true);
      __publicField(this, "_flagLinewidth", true);
      __publicField(this, "_flagOpacity", true);
      __publicField(this, "_flagVisible", true);
      __publicField(this, "_flagMask", false);
      __publicField(this, "_flagClip", false);
      __publicField(this, "_value", "");
      __publicField(this, "_family", "sans-serif");
      __publicField(this, "_size", 13);
      __publicField(this, "_leading", 17);
      __publicField(this, "_alignment", "center");
      __publicField(this, "_baseline", "middle");
      __publicField(this, "_style", "normal");
      __publicField(this, "_weight", 500);
      __publicField(this, "_decoration", "none");
      __publicField(this, "_direction", "ltr");
      __publicField(this, "_fill", "#000");
      __publicField(this, "_stroke", "none");
      __publicField(this, "_linewidth", 1);
      __publicField(this, "_opacity", 1);
      __publicField(this, "_visible", true);
      __publicField(this, "_mask", null);
      __publicField(this, "_clip", false);
      __publicField(this, "_dashes", null);
      for (let n in Bi)
        Object.defineProperty(this, n, Bi[n]);
      if (this._renderer.type = "text", this._renderer.flagFill = ws.bind(this), this._renderer.flagStroke = ks.bind(this), this.value = t, typeof e2 == "number" && (this.translation.x = e2), typeof s == "number" && (this.translation.y = s), this.dashes = [], this.dashes.offset = 0, !E.isObject(r))
        return this;
      for (let n = 0; n < At.Properties.length; n++) {
        let a = At.Properties[n];
        a in r && (this[a] = r[a]);
      }
    }
    static Measure(t) {
      if (ni) {
        let e2 = ni.getContext("2d");
        e2.font = [t._style, t._weight, "".concat(t._size, "px/").concat(t._leading, "px"), t._family].join(" ");
        let s = e2.measureText(t.value, 0, 0), r = s.actualBoundingBoxDescent + s.actualBoundingBoxAscent;
        return { width: s.width, height: r };
      } else {
        let e2 = this.value.length * this.size * At.Ratio, s = this.leading;
        return console.warn("Two.Text: unable to accurately measure text, so using an approximation."), { width: e2, height: s };
      }
    }
    clone(t) {
      let e2 = new At(this.value);
      e2.translation.copy(this.translation), e2.rotation = this.rotation, e2.scale = this.scale;
      for (let s = 0; s < At.Properties.length; s++) {
        let r = At.Properties[s];
        e2[r] = this[r];
      }
      return this.matrix.manual && e2.matrix.copy(this.matrix), t && t.add(e2), e2._update();
    }
    toObject() {
      let t = { translation: this.translation.toObject(), rotation: this.rotation, scale: this.scale };
      this.matrix.manual && (t.matrix = this.matrix.toObject());
      for (let e2 = 0; e2 < At.Properties.length; e2++) {
        let s = At.Properties[e2];
        t[s] = this[s];
      }
      return t;
    }
    noFill() {
      return this.fill = "none", this;
    }
    noStroke() {
      return this.stroke = "none", this.linewidth = 0, this;
    }
    getBoundingClientRect(t) {
      let e2, s, r, n, a;
      this._update(true), e2 = t ? this.matrix : this.worldMatrix;
      let { width: o, height: h } = At.Measure(this), l = (this._linewidth || 0) / 2;
      switch (this.alignment) {
        case "left":
          s = -l, r = o + l;
          break;
        case "right":
          s = -(o + l), r = l;
          break;
        default:
          s = -(o / 2 + l), r = o / 2 + l;
      }
      switch (this.baseline) {
        case "middle":
          n = -(h / 2 + l), a = h / 2 + l;
          break;
        default:
          n = -(h + l), a = l;
      }
      let [f, c] = e2.multiply(s, n), [d, _] = e2.multiply(s, a), [u, y] = e2.multiply(r, n), [b, m] = e2.multiply(r, a);
      return n = Pi(c, _, y, m), s = Pi(f, d, u, b), r = Ii(f, d, u, b), a = Ii(c, _, y, m), { top: n, left: s, right: r, bottom: a, width: r - s, height: a - n };
    }
    flagReset() {
      return super.flagReset.call(this), this._flagValue = this._flagFamily = this._flagSize = this._flagLeading = this._flagAlignment = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagClip = this._flagDecoration = this._flagClassName = this._flagBaseline = this._flagWeight = this._flagStyle = false, this;
    }
  }, ut = At;
  x(ut, "Ratio", 0.6), x(ut, "Properties", ["value", "family", "size", "leading", "alignment", "linewidth", "style", "weight", "decoration", "direction", "baseline", "opacity", "visible", "fill", "stroke"]);
  var Bi = { value: { enumerable: true, get: function() {
    return this._value;
  }, set: function(i) {
    this._value = i, this._flagValue = true;
  } }, family: { enumerable: true, get: function() {
    return this._family;
  }, set: function(i) {
    this._family = i, this._flagFamily = true;
  } }, size: { enumerable: true, get: function() {
    return this._size;
  }, set: function(i) {
    this._size = i, this._flagSize = true;
  } }, leading: { enumerable: true, get: function() {
    return this._leading;
  }, set: function(i) {
    this._leading = i, this._flagLeading = true;
  } }, alignment: { enumerable: true, get: function() {
    return this._alignment;
  }, set: function(i) {
    this._alignment = i, this._flagAlignment = true;
  } }, linewidth: { enumerable: true, get: function() {
    return this._linewidth;
  }, set: function(i) {
    this._linewidth = i, this._flagLinewidth = true;
  } }, style: { enumerable: true, get: function() {
    return this._style;
  }, set: function(i) {
    this._style = i, this._flagStyle = true;
  } }, weight: { enumerable: true, get: function() {
    return this._weight;
  }, set: function(i) {
    this._weight = i, this._flagWeight = true;
  } }, decoration: { enumerable: true, get: function() {
    return this._decoration;
  }, set: function(i) {
    this._decoration = i, this._flagDecoration = true;
  } }, direction: { enumerable: true, get: function() {
    return this._direction;
  }, set: function(i) {
    this._direction = i, this._flagDirection = true;
  } }, baseline: { enumerable: true, get: function() {
    return this._baseline;
  }, set: function(i) {
    this._baseline = i, this._flagBaseline = true;
  } }, opacity: { enumerable: true, get: function() {
    return this._opacity;
  }, set: function(i) {
    this._opacity = i, this._flagOpacity = true;
  } }, visible: { enumerable: true, get: function() {
    return this._visible;
  }, set: function(i) {
    this._visible = i, this._flagVisible = true;
  } }, fill: { enumerable: true, get: function() {
    return this._fill;
  }, set: function(i) {
    (this._fill instanceof H || this._fill instanceof U || this._fill instanceof D || this._fill instanceof N) && this._fill.unbind(p.Types.change, this._renderer.flagFill), this._fill = i, this._flagFill = true, (this._fill instanceof H || this._fill instanceof U || this._fill instanceof D || this._fill instanceof N) && this._fill.bind(p.Types.change, this._renderer.flagFill);
  } }, stroke: { enumerable: true, get: function() {
    return this._stroke;
  }, set: function(i) {
    (this._stroke instanceof H || this._stroke instanceof U || this._stroke instanceof D || this._stroke instanceof N) && this._stroke.unbind(p.Types.change, this._renderer.flagStroke), this._stroke = i, this._flagStroke = true, (this._stroke instanceof H || this._stroke instanceof U || this._stroke instanceof D || this._stroke instanceof N) && this._stroke.bind(p.Types.change, this._renderer.flagStroke);
  } }, mask: { enumerable: true, get: function() {
    return this._mask;
  }, set: function(i) {
    this._mask = i, this._flagMask = true, E.isObject(i) && !i.clip && (i.clip = true);
  } }, clip: { enumerable: true, get: function() {
    return this._clip;
  }, set: function(i) {
    this._clip = i, this._flagClip = true;
  } }, dashes: { enumerable: true, get: function() {
    return this._dashes;
  }, set: function(i) {
    typeof i.offset != "number" && (i.offset = this.dashes && this._dashes.offset || 0), this._dashes = i;
  } } };
  function ws() {
    this._flagFill = true;
  }
  function ks() {
    this._flagStroke = true;
  }
  var Ft = { path: /[+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]\d+)?/g, cssBackgroundImage: /url\(['"]?#([\w\d-_]*)['"]?\)/i, unitSuffix: /[a-zA-Z%]*/i }, As = { start: "left", middle: "center", end: "right" }, Ni = ["id", "class", "transform", "xmlns", "viewBox"], Rs = ["x", "y", "width", "height", "href", "xlink:href"];
  function Ss(i) {
    return As[i];
  }
  function Es(i) {
    let t = i.getAttribute("dominant-baseline"), e2 = i.getAttribute("alignment-baseline");
    return t || e2;
  }
  function ce(i) {
    return i.replace(/svg:/ig, "").toLowerCase();
  }
  function ji(i, t) {
    if (t.x += i.translateX, t.y += i.translateY, t.x *= i.scaleX, t.y *= i.scaleY, i.rotation !== 0) {
      let e2 = t.length();
      t.x = e2 * Math.cos(i.rotation), t.y = e2 * Math.sin(i.rotation);
    }
  }
  function Fs(i, t) {
    t || (t = {});
    let e2 = i.split(";");
    for (let s = 0; s < e2.length; s++) {
      let r = e2[s].split(":"), n = r[0], a = r[1];
      typeof n > "u" || typeof a > "u" || (t[n] = a.replace(/\s/, ""));
    }
    return t;
  }
  function Ts(i) {
    let t = {}, e2 = Ms(i), s = Math.max(e2.length, i.style.length);
    for (let r = 0; r < s; r++) {
      let n = i.style[r], a = e2[r];
      n && (t[n] = i.style[n]), a && (t[a] = i.getAttribute(a));
    }
    return t;
  }
  function Ms(i) {
    let t = i.getAttributeNames();
    for (let e2 = 0; e2 < Ni.length; e2++) {
      let s = Ni[e2], r = Array.prototype.indexOf.call(t, s);
      r >= 0 && t.splice(r, 1);
    }
    return t;
  }
  function Cs(i, t) {
    let e2 = t.split(/[\s,]/), s = -parseFloat(e2[0]), r = -parseFloat(e2[1]), n = parseFloat(e2[2]), a = parseFloat(e2[3]);
    if (s && r)
      for (let c = 0; c < i.children.length; c++) {
        let d = i.children[c];
        "translation" in d ? d.translation.add(s, r) : "x" in d ? d.x = s : "y" in d && (d.y = r);
      }
    let o = typeof i.x == "number", h = typeof i.y == "number", l = typeof i.width == "number", f = typeof i.height == "number";
    return o && (i.translation.x += i.x), h && (i.translation.y += i.y), (l || f) && (i.scale = new w(1, 1)), l && (i.scale.x = i.width / n), f && (i.scale.y = i.height / a), i.mask = new pt(0, 0, n, a), i.mask.origin.set(-n / 2, -a / 2), i;
  }
  function wt(i, t, e2) {
    let s = {}, r = {}, n = {}, a, o, h, l, f, c, d, _, u, y, b, m, g, k, R, A, S;
    if (i === null)
      return s;
    if (W.getComputedStyle) {
      let F = W.getComputedStyle(i);
      for (a = F.length; a--; )
        h = F[a], l = F[h], typeof l < "u" && (s[h] = l);
    }
    for (a = 0; a < i.attributes.length; a++)
      c = i.attributes[a], /style/i.test(c.nodeName) ? Fs(c.value, n) : r[c.nodeName] = c.value;
    typeof s.opacity < "u" && (s["stroke-opacity"] = s.opacity, s["fill-opacity"] = s.opacity, delete s.opacity), e2 && E.defaults(s, e2), E.extend(s, n, r), s.visible = !(typeof s.display > "u" && /none/i.test(s.display)) || typeof s.visibility > "u" && /hidden/i.test(s.visibility);
    for (h in s)
      switch (l = s[h], h) {
        case "gradientTransform":
          if (/none/i.test(l) || (o = i.gradientTransform && i.gradientTransform.baseVal && i.gradientTransform.baseVal.length > 0 ? i.gradientTransform.baseVal[0].matrix : i.getCTM ? i.getCTM() : null, o === null))
            break;
          switch (d = Rt(o), t._renderer.type) {
            case "linear-gradient":
              ji(d, t.left), ji(d, t.right);
              break;
            case "radial-gradient":
              t.center.x += d.translateX, t.center.y += d.translateY, t.focal.x += d.translateX, t.focal.y += d.translateY, t.radius *= Math.max(d.scaleX, d.scaleY);
              break;
          }
          break;
        case "transform":
          if (/none/i.test(l) || (o = i.transform && i.transform.baseVal && i.transform.baseVal.length > 0 ? i.transform.baseVal[0].matrix : i.getCTM ? i.getCTM() : null, o === null))
            break;
          G.AutoCalculateImportedMatrices ? (d = Rt(o), t.translation.set(d.translateX, d.translateY), t.rotation = Math.PI * (d.rotation / 180), t.scale = new w(d.scaleX, d.scaleY), _ = parseFloat((s.x + "").replace("px")), u = parseFloat((s.y + "").replace("px")), _ && (t.translation.x = _), u && (t.translation.y = u)) : (o = i.getCTM(), t._matrix.manual = true, t._matrix.set(o.a, o.b, o.c, o.d, o.e, o.f));
          break;
        case "visible":
          if (t instanceof q) {
            t._visible = l;
            break;
          }
          t.visible = l;
          break;
        case "stroke-linecap":
          if (t instanceof q) {
            t._cap = l;
            break;
          }
          t.cap = l;
          break;
        case "stroke-linejoin":
          if (t instanceof q) {
            t._join = l;
            break;
          }
          t.join = l;
          break;
        case "stroke-miterlimit":
          if (t instanceof q) {
            t._miter = l;
            break;
          }
          t.miter = l;
          break;
        case "stroke-width":
          if (t instanceof q) {
            t._linewidth = parseFloat(l);
            break;
          }
          t.linewidth = parseFloat(l);
          break;
        case "opacity":
        case "stroke-opacity":
        case "fill-opacity":
          if (t instanceof q) {
            t._opacity = parseFloat(l);
            break;
          }
          t.opacity = parseFloat(l);
          break;
        case "clip-path":
          if (Ft.cssBackgroundImage.test(l) && (y = l.replace(Ft.cssBackgroundImage, "$1"), K.defs.current && K.defs.current.contains(y) && (m = K.defs.current.get(y), m && m.childNodes.length > 0)))
            switch (m = m.childNodes[0], g = ce(m.nodeName), t.mask = K[g].call(this, m, {}), t._renderer.type) {
              case "text":
              case "path":
                t.position.add(t.mask.position), t.mask.position.clear();
                break;
            }
          break;
        case "fill":
        case "stroke":
          f = (t instanceof q ? "_" : "") + h, Ft.cssBackgroundImage.test(l) ? (y = l.replace(Ft.cssBackgroundImage, "$1"), K.defs.current && K.defs.current.contains(y) ? (m = K.defs.current.get(y), m.object || (g = ce(m.nodeName), m.object = K[g].call(this, m, {})), m = m.object) : (b = Os(this), m = b.getById(y)), t[f] = m) : t[f] = l;
          break;
        case "id":
          t.id = l;
          break;
        case "class":
        case "className":
          t.classList = l.split(" "), t._flagClassName = true;
          break;
        case "x":
        case "y":
          if (k = t instanceof H, R = t instanceof U, A = t instanceof D, k || R || A)
            break;
          l.match("[a-z%]$") && !l.endsWith("px") && (S = new et("only pixel values are supported with the " + h + " attribute."), console.warn(S.name, S.message)), t.translation[h] = parseFloat(l);
          break;
        case "font-family":
          t instanceof ut && (t.family = l);
          break;
        case "font-size":
          t instanceof ut && (t.size = l);
          break;
        case "font-weight":
          t instanceof ut && (t.weight = l);
          break;
        case "font-style":
          t instanceof ut && (t.style = l);
          break;
        case "text-decoration":
          t instanceof ut && (t.decoration = l);
          break;
        case "line-height":
          t instanceof ut && (t.leading = l);
          break;
      }
    return Object.keys(i.dataset).length && (t.dataset = i.dataset), s;
  }
  function Ls(i, t) {
    for (let e2 = 0, s = i.childNodes.length; e2 < s; e2++) {
      let r = i.childNodes[e2];
      !r.id || ce(i.nodeName) === "#text" || t.add(r.id, r);
    }
  }
  function Os(i) {
    for (; i.parent; )
      i = i.parent;
    return i.scene;
  }
  var K = { svg: function(i) {
    let t = K.defs.current = new Et(), e2 = i.getElementsByTagName("defs");
    for (let u = 0; u < e2.length; u++)
      Ls(e2[u], t);
    let s = K.g.call(this, i), r = i.getAttribute("viewBox"), n = i.getAttribute("x"), a = i.getAttribute("y"), o = i.getAttribute("width"), h = i.getAttribute("height");
    s.defs = t;
    let l = r !== null, f = n !== null, c = a !== null, d = o !== null, _ = h !== null;
    return f && (s.x = parseFloat(n.replace(Ft.unitSuffix, ""))), c && (s.y = parseFloat(a.replace(Ft.unitSuffix, ""))), d && (s.width = parseFloat(o.replace(Ft.unitSuffix, ""))), _ && (s.height = parseFloat(h.replace(Ft.unitSuffix, ""))), l && Cs(s, r), delete K.defs.current, s;
  }, defs: function(i) {
    return null;
  }, use: function(i, t) {
    let e2, s = i.getAttribute("href") || i.getAttribute("xlink:href");
    if (!s)
      return e2 = new et("encountered <use /> with no href."), console.warn(e2.name, e2.message), null;
    let r = s.slice(1);
    if (!K.defs.current.contains(r))
      return e2 = new et("unable to find element for reference " + s + "."), console.warn(e2.name, e2.message), null;
    let a = K.defs.current.get(r).cloneNode(true);
    for (let h = 0; h < i.attributes.length; h++) {
      let l = i.attributes[h], f = Rs.includes(l.nodeName), c = !a.hasAttribute(l.nodeName);
      (f || c) && a.setAttribute(l.nodeName, l.value);
    }
    let o = ce(a.nodeName);
    return K[o].call(this, a, t);
  }, g: function(i, t) {
    let e2 = new q();
    wt.call(this, i, e2, t), this.add(e2);
    let s = Ts.call(this, i);
    for (let r = 0, n = i.childNodes.length; r < n; r++) {
      let a = i.childNodes[r], o = a.nodeName;
      if (!o)
        return;
      let h = ce(o);
      if (h in K) {
        let l = K[h].call(e2, a, s);
        !!l && !l.parent && e2.add(l);
      }
    }
    return e2;
  }, polygon: function(i, t) {
    let e2;
    typeof i == "string" ? e2 = i : e2 = i.getAttribute("points");
    let s = [];
    e2.replace(/(-?[\d.eE-]+)[,|\s](-?[\d.eE-]+)/g, function(n, a, o) {
      s.push(new T(parseFloat(a), parseFloat(o)));
    });
    let r = new O(s, true).noStroke();
    return r.fill = "black", wt.call(this, i, r, t), r;
  }, polyline: function(i, t) {
    let e2 = K.polygon.call(this, i, t);
    return e2.closed = false, e2;
  }, path: function(i, t) {
    let e2;
    typeof i == "string" ? (e2 = i, i = null) : e2 = i.getAttribute("d");
    let s = [], r = false, n = false;
    if (e2) {
      let o = new T(), h, l, f = e2.match(/[a-df-z][^a-df-z]*/ig), c = f.length - 1;
      E.each(f.slice(0), function(d, _) {
        let u = d.slice(1).trim().match(Ft.path), y = d[0], b = y.toLowerCase(), m, g, k, R, A, S = [];
        switch (_ === 0 && (f = []), b) {
          case "h":
          case "v":
            u.length > 1 && (m = 1);
            break;
          case "m":
          case "l":
          case "t":
            u.length > 2 && (m = 2);
            break;
          case "s":
          case "q":
            u.length > 4 && (m = 4);
            break;
          case "c":
            u.length > 6 && (m = 6);
            break;
          case "a":
            u.length > 7 && (m = 7);
            break;
        }
        if (m) {
          for (g = 0, k = u.length, A = 0; g < k; g += m) {
            if (R = y, A > 0)
              switch (y) {
                case "m":
                  R = "l";
                  break;
                case "M":
                  R = "L";
                  break;
              }
            S.push(R + u.slice(g, g + m).join(" ")), A++;
          }
          f = Array.prototype.concat.apply(f, S);
        } else
          f.push(d);
      }), E.each(f, function(d, _) {
        let u, y, b, m = d[0], g = m.toLowerCase();
        l = d.slice(1).trim().match(Ft.path), n = m === g;
        let k, R, A, S, F, B, L, M, V, j, X, z, it, ht, tt, _t, nt;
        switch (g) {
          case "z":
            if (_ >= c)
              r = true;
            else {
              y = o.x, b = o.y, u = new T(y, b, void 0, void 0, void 0, void 0, v.close);
              for (let Tt = s.length - 1; Tt >= 0; Tt--) {
                let Ct = s[Tt];
                if (/m/i.test(Ct.command)) {
                  o = Ct;
                  break;
                }
              }
            }
            break;
          case "m":
          case "l":
            h = void 0, y = parseFloat(l[0]), b = parseFloat(l[1]), u = new T(y, b, void 0, void 0, void 0, void 0, /m/i.test(g) ? v.move : v.line), n && u.addSelf(o), o = u;
            break;
          case "h":
          case "v":
            j = /h/i.test(g) ? "x" : "y", X = /x/i.test(j) ? "y" : "x", u = new T(void 0, void 0, void 0, void 0, void 0, void 0, v.line), u[j] = parseFloat(l[0]), u[X] = o[X], n && (u[j] += o[j]), o = u;
            break;
          case "c":
          case "s":
            k = o.x, R = o.y, h || (h = new w()), /c/i.test(g) ? (A = parseFloat(l[0]), S = parseFloat(l[1]), F = parseFloat(l[2]), B = parseFloat(l[3]), L = parseFloat(l[4]), M = parseFloat(l[5])) : (V = be(o, h, n), A = V.x, S = V.y, F = parseFloat(l[0]), B = parseFloat(l[1]), L = parseFloat(l[2]), M = parseFloat(l[3])), n && (A += k, S += R, F += k, B += R, L += k, M += R), o.controls.right.set(A - o.x, S - o.y), u = new T(L, M, F - L, B - M, void 0, void 0, v.curve), o = u, h = u.controls.left;
            break;
          case "t":
          case "q":
            k = o.x, R = o.y, h || (h = new w()), /q/i.test(g) ? (A = parseFloat(l[0]), S = parseFloat(l[1]), F = parseFloat(l[0]), B = parseFloat(l[1]), L = parseFloat(l[2]), M = parseFloat(l[3])) : (V = be(o, h, n), A = V.x, S = V.y, F = V.x, B = V.y, L = parseFloat(l[0]), M = parseFloat(l[1])), n && (A += k, S += R, F += k, B += R, L += k, M += R), o.controls.right.set((A - o.x) * 0.33, (S - o.y) * 0.33), u = new T(L, M, F - L, B - M, void 0, void 0, v.curve), o = u, h = u.controls.left;
            break;
          case "a":
            k = o.x, R = o.y, it = parseFloat(l[0]), ht = parseFloat(l[1]), tt = parseFloat(l[2]), _t = parseFloat(l[3]), nt = parseFloat(l[4]), L = parseFloat(l[5]), M = parseFloat(l[6]), n && (L += k, M += R), z = new T(L, M), z.command = v.arc, z.rx = it, z.ry = ht, z.xAxisRotation = tt, z.largeArcFlag = _t, z.sweepFlag = nt, u = z, o = z, h = void 0;
            break;
        }
        u && (Array.isArray(u) ? s = s.concat(u) : s.push(u));
      });
    }
    e2 = new O(s, r, void 0, true).noStroke(), e2.fill = "black";
    let a = e2.getBoundingClientRect(true);
    return a.centroid = { x: a.left + a.width / 2, y: a.top + a.height / 2 }, E.each(e2.vertices, function(o) {
      o.subSelf(a.centroid);
    }), wt.call(this, i, e2, t), e2.translation.addSelf(a.centroid), e2;
  }, circle: function(i, t) {
    let e2 = parseFloat(i.getAttribute("cx")), s = parseFloat(i.getAttribute("cy")), r = parseFloat(i.getAttribute("r")), n = new Ot(0, 0, r).noStroke();
    return n.fill = "black", wt.call(this, i, n, t), n.translation.x = e2, n.translation.y = s, n;
  }, ellipse: function(i, t) {
    let e2 = parseFloat(i.getAttribute("cx")), s = parseFloat(i.getAttribute("cy")), r = parseFloat(i.getAttribute("rx")), n = parseFloat(i.getAttribute("ry")), a = new Pt(0, 0, r, n).noStroke();
    return a.fill = "black", wt.call(this, i, a, t), a.translation.x = e2, a.translation.y = s, a;
  }, rect: function(i, t) {
    let e2 = parseFloat(i.getAttribute("rx")), s = parseFloat(i.getAttribute("ry"));
    if (!E.isNaN(e2) || !E.isNaN(s))
      return K["rounded-rect"](i);
    let r = parseFloat(i.getAttribute("width")), n = parseFloat(i.getAttribute("height")), a = r / 2, o = n / 2, h = new pt(0, 0, r, n).noStroke();
    return h.fill = "black", wt.call(this, i, h, t), h.translation.x += a, h.translation.y += o, h;
  }, "rounded-rect": function(i, t) {
    let e2 = parseFloat(i.getAttribute("rx")) || 0, s = parseFloat(i.getAttribute("ry")) || 0, r = parseFloat(i.getAttribute("width")), n = parseFloat(i.getAttribute("height")), a = r / 2, o = n / 2, h = new w(e2, s), l = new It(0, 0, r, n, h).noStroke();
    return l.fill = "black", wt.call(this, i, l, t), l.translation.x += a, l.translation.y += o, l;
  }, line: function(i, t) {
    let e2 = parseFloat(i.getAttribute("x1")), s = parseFloat(i.getAttribute("y1")), r = parseFloat(i.getAttribute("x2")), n = parseFloat(i.getAttribute("y2")), a = new jt(e2, s, r, n).noFill();
    return wt.call(this, i, a, t), a;
  }, lineargradient: function(i, t) {
    let e2 = i.getAttribute("gradientUnits"), s = i.getAttribute("spreadMethod");
    e2 || (e2 = "objectBoundingBox"), s || (s = "pad");
    let r = parseFloat(i.getAttribute("x1") || 0), n = parseFloat(i.getAttribute("y1") || 0), a = parseFloat(i.getAttribute("x2") || 0), o = parseFloat(i.getAttribute("y2") || 0), h = (a + r) / 2, l = (o + n) / 2;
    /userSpaceOnUse/i.test(e2) && (r -= h, n -= l, a -= h, o -= l);
    let f = [];
    for (let d = 0; d < i.children.length; d++) {
      let _ = i.children[d], u = _.getAttribute("offset");
      /%/ig.test(u) && (u = parseFloat(u.replace(/%/ig, "")) / 100), u = parseFloat(u);
      let y = _.getAttribute("stop-color"), b = _.getAttribute("stop-opacity"), m = _.getAttribute("style"), g;
      y === null && (g = m ? m.match(/stop-color:\s?([#a-fA-F0-9]*)/) : false, y = g && g.length > 1 ? g[1] : void 0), b === null ? (g = m ? m.match(/stop-opacity:\s?([0-9.-]*)/) : false, b = g && g.length > 1 ? parseFloat(g[1]) : 1) : b = parseFloat(b), f.push(new ct(u, y, b));
    }
    let c = new U(r, n, a, o, f);
    return c.spread = s, c.units = e2, wt.call(this, i, c, t), c;
  }, radialgradient: function(i, t) {
    let e2 = i.getAttribute("gradientUnits"), s = i.getAttribute("spreadMethod");
    e2 || (e2 = "objectBoundingBox"), s || (s = "pad");
    let r = parseFloat(i.getAttribute("cx")) || 0, n = parseFloat(i.getAttribute("cy")) || 0, a = parseFloat(i.getAttribute("r")), o = parseFloat(i.getAttribute("fx")), h = parseFloat(i.getAttribute("fy"));
    E.isNaN(o) && (o = r), E.isNaN(h) && (h = n);
    let l = Math.abs(r + o) / 2, f = Math.abs(n + h) / 2;
    /userSpaceOnUse/i.test(e2) && (r -= l, n -= f, o -= l, h -= f);
    let c = [];
    for (let _ = 0; _ < i.children.length; _++) {
      let u = i.children[_], y = u.getAttribute("offset");
      /%/ig.test(y) && (y = parseFloat(y.replace(/%/ig, "")) / 100), y = parseFloat(y);
      let b = u.getAttribute("stop-color"), m = u.getAttribute("stop-opacity"), g = u.getAttribute("style"), k;
      b === null && (k = g ? g.match(/stop-color:\s?([#a-fA-F0-9]*)/) : false, b = k && k.length > 1 ? k[1] : void 0), m === null ? (k = g ? g.match(/stop-opacity:\s?([0-9.-]*)/) : false, m = k && k.length > 1 ? parseFloat(k[1]) : 1) : m = parseFloat(m), c.push(new ct(y, b, m));
    }
    let d = new D(r, n, a, c, o, h);
    return d.spread = s, d.units = e2, wt.call(this, i, d, t), d;
  }, text: function(i, t) {
    let e2 = Ss(i.getAttribute("text-anchor")) || "left", s = Es(i) || "baseline", r = i.textContent, n = new ut(r);
    return wt.call(this, i, n, t), n.alignment = e2, n.baseline = s, n;
  }, clippath: function(i, t) {
    return K.defs.current && !K.defs.current.contains(i.id) && K.defs.current.add(i.id, i), null;
  }, image: function(i, t) {
    let e2, s = i.getAttribute("href") || i.getAttribute("xlink:href");
    if (!s)
      return e2 = new et("encountered <image /> with no href."), console.warn(e2.name, e2.message), null;
    let r = parseFloat(i.getAttribute("x")) || 0, n = parseFloat(i.getAttribute("y")) || 0, a = parseFloat(i.getAttribute("width")), o = parseFloat(i.getAttribute("height")), h = new Lt(s, r, n);
    return E.isNaN(a) || (h.width = a), E.isNaN(o) || (h.height = o), wt.call(this, i, h, t), h;
  } };
  function ai(i, t) {
    let e2 = new XMLHttpRequest();
    return e2.open("GET", i), e2.onreadystatechange = function() {
      e2.readyState === 4 && e2.status === 200 && t(e2.responseText);
    }, e2.send(), e2;
  }
  var Te = class extends pt {
    constructor(t, e2, s, r) {
      super(e2, s, 0, 0);
      __publicField(this, "_flagTextures", false);
      __publicField(this, "_flagFrameRate", false);
      __publicField(this, "_flagIndex", false);
      __publicField(this, "_amount", 1);
      __publicField(this, "_duration", 0);
      __publicField(this, "_index", 0);
      __publicField(this, "_startTime", 0);
      __publicField(this, "_playing", false);
      __publicField(this, "_firstFrame", 0);
      __publicField(this, "_lastFrame", 0);
      __publicField(this, "_loop", true);
      __publicField(this, "_textures", null);
      __publicField(this, "_frameRate", 0);
      __publicField(this, "_origin", null);
      for (let n in Vi)
        Object.defineProperty(this, n, Vi[n]);
      this._renderer.flagTextures = Ps.bind(this), this._renderer.bindTextures = Is.bind(this), this._renderer.unbindTextures = Bs.bind(this), this.noStroke(), this.noFill(), Array.isArray(t) ? this.textures = t.map(zi.bind(this)) : this.textures = [zi(t)], this.origin = new w(), this._update(), typeof r == "number" ? this.frameRate = r : this.frameRate = Te.DefaultFrameRate, this.index = 0;
    }
    play(t, e2, s) {
      return this._playing = true, this._firstFrame = 0, this._lastFrame = this.amount - 1, this._startTime = E.performance.now(), typeof t == "number" && (this._firstFrame = t), typeof e2 == "number" && (this._lastFrame = e2), typeof s == "function" ? this._onLastFrame = s : delete this._onLastFrame, this._index !== this._firstFrame && (this._startTime -= 1e3 * Math.abs(this._index - this._firstFrame) / this._frameRate), this;
    }
    pause() {
      return this._playing = false, this;
    }
    stop() {
      return this._playing = false, this._index = this._firstFrame, this;
    }
    clone(t) {
      let e2 = new Te(this.textures, this.translation.x, this.translation.y, this.frameRate);
      return e2._loop = this._loop, this._playing && e2.play(), t && t.add(e2), e2;
    }
    toObject() {
      let t = super.toObject.call(this);
      return t.textures = this.textures.map(function(e2) {
        return e2.toObject();
      }), t.frameRate = this.frameRate, t.index = this.index, t._firstFrame = this._firstFrame, t._lastFrame = this._lastFrame, t._loop = this._loop, t;
    }
    _update() {
      let t = this._textures, e2, s, r, n, a, o, h, l;
      return t && (this._flagTextures && (this._amount = t.length), this._flagFrameRate && (this._duration = 1e3 * this._amount / this._frameRate), this._playing && this._frameRate > 0 ? (n = this._amount, E.isNaN(this._lastFrame) && (this._lastFrame = n - 1), r = E.performance.now() - this._startTime, l = this._lastFrame + 1, a = 1e3 * (l - this._firstFrame) / this._frameRate, this._loop ? r = r % a : r = Math.min(r, a), h = at(this._firstFrame, l, r / a), h = Math.floor(h), h !== this._index && (this._index = h, o = t[this._index], o.loaded && (e2 = o.image.width, s = o.image.height, this.width !== e2 && (this.width = e2), this.height !== s && (this.height = s), this.fill = o, h >= this._lastFrame - 1 && this._onLastFrame && this._onLastFrame()))) : (this._flagIndex || !(this.fill instanceof N)) && (o = t[this._index], o.loaded && (e2 = o.image.width, s = o.image.height, this.width !== e2 && (this.width = e2), this.height !== s && (this.height = s)), this.fill = o)), super._update.call(this), this;
    }
    flagReset() {
      return this._flagTextures = this._flagFrameRate = false, super.flagReset.call(this), this;
    }
  }, Vt = Te;
  x(Vt, "Properties", ["textures", "frameRate", "index"]), x(Vt, "DefaultFrameRate", 30);
  var Vi = { frameRate: { enumerable: true, get: function() {
    return this._frameRate;
  }, set: function(i) {
    this._frameRate = i, this._flagFrameRate = true;
  } }, index: { enumerable: true, get: function() {
    return this._index;
  }, set: function(i) {
    this._index = i, this._flagIndex = true;
  } }, textures: { enumerable: true, get: function() {
    return this._textures;
  }, set: function(i) {
    let t = this._renderer.bindTextures, e2 = this._renderer.unbindTextures;
    this._textures && this._textures.unbind(p.Types.insert, t).unbind(p.Types.remove, e2), this._textures = new lt((i || []).slice(0)), this._textures.bind(p.Types.insert, t).bind(p.Types.remove, e2), t(this._textures);
  } } };
  function Ps() {
    this._flagTextures = true;
  }
  function Is(i) {
    let t = i.length;
    for (; t--; )
      i[t].bind(p.Types.change, this._renderer.flagTextures);
    this._renderer.flagTextures();
  }
  function Bs(i) {
    let t = i.length;
    for (; t--; )
      i[t].unbind(p.Types.change, this._renderer.flagTextures);
    this._renderer.flagTextures();
  }
  function zi(i) {
    if (i instanceof N)
      return i;
    if (typeof i == "string")
      return new N(i);
  }
  var ue = class extends O {
    constructor(t, e2, s, r, n, a, o) {
      let h = o || G.Resolution * 3, l = [];
      for (let f = 0; f < h; f++)
        l.push(new T());
      super(l, true, false, true);
      __publicField(this, "_flagStartAngle", false);
      __publicField(this, "_flagEndAngle", false);
      __publicField(this, "_flagInnerRadius", false);
      __publicField(this, "_flagOuterRadius", false);
      __publicField(this, "_startAngle", 0);
      __publicField(this, "_endAngle", J);
      __publicField(this, "_innerRadius", 0);
      __publicField(this, "_outerRadius", 0);
      for (let f in Ui)
        Object.defineProperty(this, f, Ui[f]);
      typeof s == "number" && (this.innerRadius = s), typeof r == "number" && (this.outerRadius = r), typeof n == "number" && (this.startAngle = n), typeof a == "number" && (this.endAngle = a), this._update(), typeof t == "number" && (this.translation.x = t), typeof e2 == "number" && (this.translation.y = e2);
    }
    _update() {
      if (this._flagVertices || this._flagStartAngle || this._flagEndAngle || this._flagInnerRadius || this._flagOuterRadius) {
        let t = this._startAngle, e2 = this._endAngle, s = this._innerRadius, r = this._outerRadius, n = st(t, J) === st(e2, J), a = s > 0, o = this.vertices, h = a ? o.length / 2 : o.length, l, f = 0, c, d, _, u, y, b, m, g, k;
        for (n ? h-- : a || (h -= 2), c = 0, d = h - 1; c < h; c++) {
          switch (_ = c / d, u = o[f], y = _ * (e2 - t) + t, b = (e2 - t) / h, m = r * Math.cos(y), g = r * Math.sin(y), c) {
            case 0:
              l = v.move;
              break;
            default:
              l = v.curve;
          }
          u.command = l, u.x = m, u.y = g, u.controls.left.clear(), u.controls.right.clear(), u.command === v.curve && (k = r * b / Math.PI, u.controls.left.x = k * Math.cos(y - Z), u.controls.left.y = k * Math.sin(y - Z), u.controls.right.x = k * Math.cos(y + Z), u.controls.right.y = k * Math.sin(y + Z), c === 1 && u.controls.left.multiplyScalar(2), c === d && u.controls.right.multiplyScalar(2)), f++;
        }
        if (a) {
          for (n ? (o[f].command = v.close, f++) : (h--, d = h - 1), c = 0; c < h; c++)
            _ = c / d, u = o[f], y = (1 - _) * (e2 - t) + t, b = (e2 - t) / h, m = s * Math.cos(y), g = s * Math.sin(y), l = v.curve, c <= 0 && (l = n ? v.move : v.line), u.command = l, u.x = m, u.y = g, u.controls.left.clear(), u.controls.right.clear(), u.command === v.curve && (k = s * b / Math.PI, u.controls.left.x = k * Math.cos(y + Z), u.controls.left.y = k * Math.sin(y + Z), u.controls.right.x = k * Math.cos(y - Z), u.controls.right.y = k * Math.sin(y - Z), c === 1 && u.controls.left.multiplyScalar(2), c === d && u.controls.right.multiplyScalar(2)), f++;
          o[f].copy(o[0]), o[f].command = v.line;
        } else
          n || (o[f].command = v.line, o[f].x = 0, o[f].y = 0, f++, o[f].copy(o[0]), o[f].command = v.line);
      }
      return super._update.call(this), this;
    }
    flagReset() {
      return super.flagReset.call(this), this._flagStartAngle = this._flagEndAngle = this._flagInnerRadius = this._flagOuterRadius = false, this;
    }
    clone(t) {
      let e2 = this.innerRadius, s = this.outerRadius, r = this.startAngle, n = this.endAngle, a = this.vertices.length, o = new ue(0, 0, e2, s, r, n, a);
      o.translation.copy(this.translation), o.rotation = this.rotation, o.scale = this.scale, o.skewX = this.skewX, o.skewY = this.skewY, this.matrix.manual && o.matrix.copy(this.matrix);
      for (let h = 0; h < O.Properties.length; h++) {
        let l = O.Properties[h];
        o[l] = this[l];
      }
      return t && t.add(o), o;
    }
    toObject() {
      let t = super.toObject.call(this);
      for (let e2 = 0; e2 < ue.Properties.length; e2++) {
        let s = ue.Properties[e2];
        t[s] = this[s];
      }
      return t;
    }
  }, Gt = ue;
  x(Gt, "Properties", ["startAngle", "endAngle", "innerRadius", "outerRadius"]);
  var Ui = { startAngle: { enumerable: true, get: function() {
    return this._startAngle;
  }, set: function(i) {
    this._startAngle = i, this._flagStartAngle = true;
  } }, endAngle: { enumerable: true, get: function() {
    return this._endAngle;
  }, set: function(i) {
    this._endAngle = i, this._flagEndAngle = true;
  } }, innerRadius: { enumerable: true, get: function() {
    return this._innerRadius;
  }, set: function(i) {
    this._innerRadius = i, this._flagInnerRadius = true;
  } }, outerRadius: { enumerable: true, get: function() {
    return this._outerRadius;
  }, set: function(i) {
    this._outerRadius = i, this._flagOuterRadius = true;
  } } };
  var Ns = Math.ceil, js = Math.floor, qt = class extends ot {
    constructor(t) {
      super();
      __publicField(this, "_flagVertices", true);
      __publicField(this, "_flagLength", true);
      __publicField(this, "_flagFill", true);
      __publicField(this, "_flagStroke", true);
      __publicField(this, "_flagLinewidth", true);
      __publicField(this, "_flagOpacity", true);
      __publicField(this, "_flagVisible", true);
      __publicField(this, "_flagSize", true);
      __publicField(this, "_flagSizeAttenuation", true);
      __publicField(this, "_length", 0);
      __publicField(this, "_fill", "#fff");
      __publicField(this, "_stroke", "#000");
      __publicField(this, "_linewidth", 1);
      __publicField(this, "_opacity", 1);
      __publicField(this, "_visible", true);
      __publicField(this, "_size", 1);
      __publicField(this, "_sizeAttenuation", false);
      __publicField(this, "_beginning", 0);
      __publicField(this, "_ending", 1);
      __publicField(this, "_dashes", null);
      __publicField(this, "noFill", O.prototype.noFill);
      __publicField(this, "noStroke", O.prototype.noStroke);
      __publicField(this, "corner", O.prototype.corner);
      __publicField(this, "center", O.prototype.center);
      __publicField(this, "getBoundingClientRect", O.prototype.getBoundingClientRect);
      __publicField(this, "_updateLength", O.prototype._updateLength);
      for (let e2 in Di)
        Object.defineProperty(this, e2, Di[e2]);
      this._renderer.type = "points", this._renderer.flagVertices = qe.bind(this), this._renderer.bindVertices = Ke.bind(this), this._renderer.unbindVertices = $e.bind(this), this._renderer.flagFill = Je.bind(this), this._renderer.flagStroke = Ze.bind(this), this._renderer.vertices = null, this._renderer.collection = null, this.sizeAttenuation = false, this.beginning = 0, this.ending = 1, this.fill = "#fff", this.stroke = "#000", this.className = "", this.visible = true, this.vertices = t, this.dashes = [], this.dashes.offset = 0;
    }
    clone(t) {
      let e2 = new qt();
      for (let s = 0; s < this.vertices.length; s++)
        e2.vertices.push(this.vertices[s].clone());
      for (let s = 0; s < qt.Properties.length; s++) {
        let r = qt.Properties[s];
        e2[r] = this[r];
      }
      return e2.className = this.className, e2.translation.copy(this.translation), e2.rotation = this.rotation, e2.scale = this.scale, e2.skewX = this.skewX, e2.skewY = this.skewY, this.matrix.manual && e2.matrix.copy(this.matrix), t && t.add(e2), e2._update();
    }
    toObject() {
      let t = { vertices: this.vertices.map(function(e2) {
        return e2.toObject();
      }) };
      return E.each(qt.Properties, function(e2) {
        t[e2] = this[e2];
      }, this), t.className = this.className, t.translation = this.translation.toObject(), t.rotation = this.rotation, t.scale = this.scale instanceof w ? this.scale.toObject() : this.scale, t.skewX = this.skewX, t.skewY = this.skewY, this.matrix.manual && (t.matrix = this.matrix.toObject()), t;
    }
    subdivide(t) {
      this._update();
      let e2 = [];
      for (let s = 0; s < this.vertices.length; s++) {
        let r = this.vertices[s], n = this.vertices[s - 1];
        if (!n)
          continue;
        let a = r.x, o = r.y, h = n.x, l = n.y, f = re(a, o, a, o, h, l, h, l, t);
        e2 = e2.concat(f);
      }
      return this.vertices = e2, this;
    }
    _update() {
      if (this._flagVertices) {
        this._flagLength && this._updateLength(void 0, true);
        let t = Math.min(this._beginning, this._ending), e2 = Math.max(this._beginning, this._ending), s = Wt(this, t * this._length), r = Wt(this, e2 * this._length), n = Ns(s), a = js(r), o = 0, h;
        this._renderer.vertices = [], this._renderer.collection = [];
        for (let l = 0; l < this._collection.length; l++)
          l >= n && l <= a && (h = this._collection[l], this._renderer.collection.push(h), this._renderer.vertices[o * 2 + 0] = h.x, this._renderer.vertices[o * 2 + 1] = h.y, o++);
      }
      return super._update.apply(this, arguments), this;
    }
    flagReset() {
      return this._flagVertices = this._flagLength = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagSize = this._flagSizeAttenuation = false, super.flagReset.call(this), this;
    }
  }, Kt = qt;
  x(Kt, "Properties", ["fill", "stroke", "linewidth", "opacity", "visible", "size", "sizeAttenuation", "beginning", "ending"]);
  var Di = { linewidth: { enumerable: true, get: function() {
    return this._linewidth;
  }, set: function(i) {
    this._linewidth = i, this._flagLinewidth = true;
  } }, opacity: { enumerable: true, get: function() {
    return this._opacity;
  }, set: function(i) {
    this._opacity = i, this._flagOpacity = true;
  } }, visible: { enumerable: true, get: function() {
    return this._visible;
  }, set: function(i) {
    this._visible = i, this._flagVisible = true;
  } }, size: { enumerable: true, get: function() {
    return this._size;
  }, set: function(i) {
    this._size = i, this._flagSize = true;
  } }, sizeAttenuation: { enumerable: true, get: function() {
    return this._sizeAttenuation;
  }, set: function(i) {
    this._sizeAttenuation = i, this._flagSizeAttenuation = true;
  } }, fill: { enumerable: true, get: function() {
    return this._fill;
  }, set: function(i) {
    (this._fill instanceof H || this._fill instanceof U || this._fill instanceof D || this._fill instanceof N) && this._fill.unbind(p.Types.change, this._renderer.flagFill), this._fill = i, this._flagFill = true, (this._fill instanceof H || this._fill instanceof U || this._fill instanceof D || this._fill instanceof N) && this._fill.bind(p.Types.change, this._renderer.flagFill);
  } }, stroke: { enumerable: true, get: function() {
    return this._stroke;
  }, set: function(i) {
    (this._stroke instanceof H || this._stroke instanceof U || this._stroke instanceof D || this._stroke instanceof N) && this._stroke.unbind(p.Types.change, this._renderer.flagStroke), this._stroke = i, this._flagStroke = true, (this._stroke instanceof H || this._stroke instanceof U || this._stroke instanceof D || this._stroke instanceof N) && this._stroke.bind(p.Types.change, this._renderer.flagStroke);
  } }, length: { get: function() {
    return this._flagLength && this._updateLength(), this._length;
  } }, beginning: { enumerable: true, get: function() {
    return this._beginning;
  }, set: function(i) {
    this._beginning = i, this._flagVertices = true;
  } }, ending: { enumerable: true, get: function() {
    return this._ending;
  }, set: function(i) {
    this._ending = i, this._flagVertices = true;
  } }, vertices: { enumerable: true, get: function() {
    return this._collection;
  }, set: function(i) {
    let t = this._renderer.bindVertices, e2 = this._renderer.unbindVertices;
    this._collection && this._collection.unbind(p.Types.insert, t).unbind(p.Types.remove, e2), i instanceof lt ? this._collection = i : this._collection = new lt(i || []), this._collection.bind(p.Types.insert, t).bind(p.Types.remove, e2), t(this._collection);
  } }, dashes: { enumerable: true, get: function() {
    return this._dashes;
  }, set: function(i) {
    typeof i.offset != "number" && (i.offset = this.dashes && this._dashes.offset || 0), this._dashes = i;
  } } };
  var Vs = Math.cos, zs = Math.sin, de = class extends O {
    constructor(t, e2, s, r) {
      r = Math.max(r || 0, 3);
      super();
      __publicField(this, "_flagWidth", false);
      __publicField(this, "_flagHeight", false);
      __publicField(this, "_flagSides", false);
      __publicField(this, "_radius", 0);
      __publicField(this, "_width", 0);
      __publicField(this, "_height", 0);
      __publicField(this, "_sides", 0);
      for (let n in Wi)
        Object.defineProperty(this, n, Wi[n]);
      this.closed = true, this.automatic = false, typeof s == "number" && (this.radius = s), typeof r == "number" && (this.sides = r), this._update(), typeof t == "number" && (this.translation.x = t), typeof e2 == "number" && (this.translation.y = e2);
    }
    _update() {
      if (this._flagVertices || this._flagWidth || this._flagHeight || this._flagSides) {
        let t = this._sides, e2 = t + 1, s = this.vertices.length;
        s > t && (this.vertices.splice(t - 1, s - t), s = t);
        for (let r = 0; r < e2; r++) {
          let n = (r + 0.5) / t, a = J * n + Math.PI / 2, o = this._width * Vs(a) / 2, h = this._height * zs(a) / 2;
          r >= s ? this.vertices.push(new T(o, h)) : this.vertices[r].set(o, h), this.vertices[r].command = r === 0 ? v.move : v.line;
        }
      }
      return super._update.call(this), this;
    }
    flagReset() {
      return this._flagWidth = this._flagHeight = this._flagSides = false, super.flagReset.call(this), this;
    }
    clone(t) {
      let e2 = new de(0, 0, 0, this.sides);
      e2.translation.copy(this.translation), e2.rotation = this.rotation, e2.scale = this.scale, e2.skewX = this.skewX, e2.skewY = this.skewY, e2.width = this.width, e2.height = this.height, this.matrix.manual && e2.matrix.copy(this.matrix);
      for (let s = 0; s < O.Properties.length; s++) {
        let r = O.Properties[s];
        e2[r] = this[r];
      }
      return t && t.add(e2), e2;
    }
    toObject() {
      let t = super.toObject.call(this);
      for (let e2 = 0; e2 < de.Properties.length; e2++) {
        let s = de.Properties[e2];
        t[s] = this[s];
      }
      return t;
    }
  }, $t = de;
  x($t, "Properties", ["width", "height", "sides"]);
  var Wi = { radius: { enumerable: true, get: function() {
    return this._radius;
  }, set: function(i) {
    this._radius = i, this.width = i * 2, this.height = i * 2;
  } }, width: { enumerable: true, get: function() {
    return this._width;
  }, set: function(i) {
    this._width = i, this._flagWidth = true, this._radius = Math.max(this.width, this.height) / 2;
  } }, height: { enumerable: true, get: function() {
    return this._height;
  }, set: function(i) {
    this._height = i, this._flagHeight = true, this._radius = Math.max(this.width, this.height) / 2;
  } }, sides: { enumerable: true, get: function() {
    return this._sides;
  }, set: function(i) {
    this._sides = i, this._flagSides = true;
  } } };
  var Us = Math.cos, Ds = Math.sin, _e = class extends O {
    constructor(t, e2, s, r, n) {
      arguments.length <= 3 && (r = s, s = r / 2), (typeof n != "number" || n <= 0) && (n = 5);
      super();
      __publicField(this, "_flagInnerRadius", false);
      __publicField(this, "_flagOuterRadius", false);
      __publicField(this, "_flagSides", false);
      __publicField(this, "_innerRadius", 0);
      __publicField(this, "_outerRadius", 0);
      __publicField(this, "_sides", 0);
      for (let a in Xi)
        Object.defineProperty(this, a, Xi[a]);
      this.closed = true, this.automatic = false, typeof s == "number" && (this.innerRadius = s), typeof r == "number" && (this.outerRadius = r), typeof n == "number" && (this.sides = n), this._update(), typeof t == "number" && (this.translation.x = t), typeof e2 == "number" && (this.translation.y = e2);
    }
    _update() {
      if (this._flagVertices || this._flagInnerRadius || this._flagOuterRadius || this._flagSides) {
        let t = this._sides * 2, e2 = t + 1, s = this.vertices.length;
        s > t && (this.vertices.splice(t - 1, s - t), s = t);
        for (let r = 0; r < e2; r++) {
          let n = (r + 0.5) / t, a = J * n, o = (r % 2 ? this._outerRadius : this._innerRadius) / 2, h = o * Us(a), l = o * Ds(a);
          r >= s ? this.vertices.push(new T(h, l)) : this.vertices[r].set(h, l), this.vertices[r].command = r === 0 ? v.move : v.line;
        }
      }
      return super._update.call(this), this;
    }
    flagReset() {
      return this._flagInnerRadius = this._flagOuterRadius = this._flagSides = false, super.flagReset.call(this), this;
    }
    clone(t) {
      let e2 = this.innerRadius, s = this.outerRadius, r = this.sides, n = new _e(0, 0, e2, s, r);
      n.translation.copy(this.translation), n.rotation = this.rotation, n.scale = this.scale, n.skewX = this.skewX, n.skewY = this.skewY, this.matrix.manual && n.matrix.copy(this.matrix);
      for (let a = 0; a < O.Properties.length; a++) {
        let o = O.Properties[a];
        n[o] = this[o];
      }
      return t && t.add(n), n;
    }
    toObject() {
      let t = super.toObject.call(this);
      for (let e2 = 0; e2 < _e.Properties.length; e2++) {
        let s = _e.Properties[e2];
        t[s] = this[s];
      }
      return t;
    }
  }, Jt = _e;
  x(Jt, "Properties", ["innerRadius", "outerRadius", "sides"]);
  var Xi = { innerRadius: { enumerable: true, get: function() {
    return this._innerRadius;
  }, set: function(i) {
    this._innerRadius = i, this._flagInnerRadius = true;
  } }, outerRadius: { enumerable: true, get: function() {
    return this._outerRadius;
  }, set: function(i) {
    this._outerRadius = i, this._flagOuterRadius = true;
  } }, sides: { enumerable: true, get: function() {
    return this._sides;
  }, set: function(i) {
    this._sides = i, this._flagSides = true;
  } } };
  var C = { version: 1.1, ns: "http://www.w3.org/2000/svg", xlink: "http://www.w3.org/1999/xlink", alignments: { left: "start", center: "middle", right: "end" }, baselines: { top: "hanging", middle: "middle", bottom: "ideographic", baseline: "alphabetic" }, createElement: function(i, t) {
    let e2 = i, s = document.createElementNS(C.ns, e2);
    return e2 === "svg" && (t = E.defaults(t || {}, { version: C.version })), t && Object.keys(t).length > 0 && C.setAttributes(s, t), s;
  }, setAttributes: function(i, t) {
    let e2 = Object.keys(t);
    for (let s = 0; s < e2.length; s++)
      /href/.test(e2[s]) ? i.setAttributeNS(C.xlink, e2[s], t[e2[s]]) : i.setAttribute(e2[s], t[e2[s]]);
    return this;
  }, removeAttributes: function(i, t) {
    for (let e2 in t)
      i.removeAttribute(e2);
    return this;
  }, toString: function(i, t) {
    let e2 = i.length, s = e2 - 1, r, n = "";
    for (let a = 0; a < e2; a++) {
      let o = i[a], h = t ? st(a - 1, e2) : Math.max(a - 1, 0), l = i[h], f, c, d, _, u, y, b, m, g, k, R, A, S, F, B, L = $(o.x), M = $(o.y);
      switch (o.command) {
        case v.close:
          f = v.close;
          break;
        case v.arc:
          R = o.rx, A = o.ry, S = o.xAxisRotation, F = o.largeArcFlag, B = o.sweepFlag, f = v.arc + " " + R + " " + A + " " + S + " " + F + " " + B + " " + L + " " + M;
          break;
        case v.curve:
          b = l.controls && l.controls.right || w.zero, m = o.controls && o.controls.left || w.zero, l.relative ? (d = $(b.x + l.x), _ = $(b.y + l.y)) : (d = $(b.x), _ = $(b.y)), o.relative ? (u = $(m.x + o.x), y = $(m.y + o.y)) : (u = $(m.x), y = $(m.y)), f = (a === 0 ? v.move : v.curve) + " " + d + " " + _ + " " + u + " " + y + " " + L + " " + M;
          break;
        case v.move:
          r = o, f = v.move + " " + L + " " + M;
          break;
        default:
          f = o.command + " " + L + " " + M;
      }
      a >= s && t && (o.command === v.curve && (c = r, g = o.controls && o.controls.right || o, k = c.controls && c.controls.left || c, o.relative ? (d = $(g.x + o.x), _ = $(g.y + o.y)) : (d = $(g.x), _ = $(g.y)), c.relative ? (u = $(k.x + c.x), y = $(k.y + c.y)) : (u = $(k.x), y = $(k.y)), L = $(c.x), M = $(c.y), f += " C " + d + " " + _ + " " + u + " " + y + " " + L + " " + M), o.command !== v.close && (f += " Z")), n += f + " ";
    }
    return n;
  }, pointsToString: function(i, t) {
    let e2 = "", s = t * 0.5;
    for (let r = 0; r < i.length; r++) {
      let n = i[r].x, a = i[r].y - s;
      e2 += v.move + " " + n + " " + a + " ", e2 += "a " + s + " " + s + " 0 1 0 0.001 0 Z";
    }
    return e2;
  }, getClip: function(i, t) {
    let e2 = i._renderer.clip;
    return e2 || (e2 = i._renderer.clip = C.createElement("clipPath", { "clip-rule": "nonzero" })), e2.parentNode === null && t.defs.appendChild(e2), e2;
  }, defs: { update: function(i) {
    let { defs: t } = i;
    if (t._flagUpdate) {
      let e2 = Array.prototype.slice.call(t.children, 0);
      for (let s = 0; s < e2.length; s++) {
        let r = e2[s], n = r.id, a = '[fill="url(#'.concat(n, ')"],[stroke="url(#').concat(n, ')"],[clip-path="url(#').concat(n, ')"]');
        i.querySelector(a) || t.removeChild(r);
      }
      t._flagUpdate = false;
    }
  } }, group: { appendChild: function(i) {
    let t = i._renderer.elem;
    if (!t)
      return;
    let e2 = t.nodeName;
    !e2 || /(radial|linear)gradient/i.test(e2) || i._clip || this.elem.appendChild(t);
  }, removeChild: function(i) {
    let t = i._renderer.elem;
    !t || t.parentNode != this.elem || !t.nodeName || i._clip || this.elem.removeChild(t);
  }, orderChild: function(i) {
    this.elem.appendChild(i._renderer.elem);
  }, renderChild: function(i) {
    C[i._renderer.type].render.call(i, this);
  }, render: function(i) {
    if (!this._visible && !this._flagVisible || this._opacity === 0 && !this._flagOpacity)
      return this;
    this._update(), this._renderer.elem || (this._renderer.elem = C.createElement("g", { id: this.id }), i.appendChild(this._renderer.elem));
    let t = this._matrix.manual || this._flagMatrix, e2 = { domElement: i, elem: this._renderer.elem };
    t && this._renderer.elem.setAttribute("transform", "matrix(" + this._matrix.toString() + ")");
    for (let s = 0; s < this.children.length; s++) {
      let r = this.children[s];
      C[r._renderer.type].render.call(r, i);
    }
    return this._flagId && this._renderer.elem.setAttribute("id", this._id), this._flagOpacity && this._renderer.elem.setAttribute("opacity", this._opacity), this._flagVisible && this._renderer.elem.setAttribute("display", this._visible ? "inline" : "none"), this._flagClassName && this._renderer.elem.setAttribute("class", this.classList.join(" ")), this._flagAdditions && this.additions.forEach(C.group.appendChild, e2), this._flagSubtractions && this.subtractions.forEach(C.group.removeChild, e2), this._flagOrder && this.children.forEach(C.group.orderChild, e2), this._flagMask && (this._mask ? (C[this._mask._renderer.type].render.call(this._mask, i), this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")")) : this._renderer.elem.removeAttribute("clip-path")), this.dataset && Object.assign(this._renderer.elem.dataset, this.dataset), this.flagReset();
  } }, path: { render: function(i) {
    if (this._opacity === 0 && !this._flagOpacity)
      return this;
    this._update();
    let t = {};
    if ((this._matrix.manual || this._flagMatrix) && (t.transform = "matrix(" + this._matrix.toString() + ")"), this._flagId && (t.id = this._id), this._flagVertices) {
      let s = C.toString(this._renderer.vertices, this._closed);
      t.d = s;
    }
    if (this._fill && this._fill._renderer && (this._renderer.hasFillEffect = true, this._fill._update(), C[this._fill._renderer.type].render.call(this._fill, i, true)), this._flagFill && (t.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill, this._renderer.hasFillEffect && typeof this._fill.id > "u" && (i.defs._flagUpdate = true, delete this._renderer.hasFillEffect)), this._stroke && this._stroke._renderer && (this._renderer.hasStrokeEffect = true, this._stroke._update(), C[this._stroke._renderer.type].render.call(this._stroke, i, true)), this._flagStroke && (t.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke, this._renderer.hasStrokeEffect && typeof this._stroke.id > "u" && (i.defs._flagUpdate = true, delete this._renderer.hasStrokeEffect)), this._flagLinewidth && (t["stroke-width"] = this._linewidth), this._flagOpacity && (t["stroke-opacity"] = this._opacity, t["fill-opacity"] = this._opacity), this._flagClassName && (t.class = this.classList.join(" ")), this._flagVisible && (t.visibility = this._visible ? "visible" : "hidden"), this._flagCap && (t["stroke-linecap"] = this._cap), this._flagJoin && (t["stroke-linejoin"] = this._join), this._flagMiter && (t["stroke-miterlimit"] = this._miter), this.dashes && this.dashes.length > 0 && (t["stroke-dasharray"] = this.dashes.join(" "), t["stroke-dashoffset"] = this.dashes.offset || 0), this._renderer.elem ? C.setAttributes(this._renderer.elem, t) : (t.id = this._id, this._renderer.elem = C.createElement("path", t), i.appendChild(this._renderer.elem)), this._flagClip) {
      let s = C.getClip(this, i), r = this._renderer.elem;
      this._clip ? (r.removeAttribute("id"), s.setAttribute("id", this.id), s.appendChild(r)) : (s.removeAttribute("id"), r.setAttribute("id", this.id), this.parent._renderer.elem.appendChild(r));
    }
    return this._flagMask && (this._mask ? (C[this._mask._renderer.type].render.call(this._mask, i), this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")")) : this._renderer.elem.removeAttribute("clip-path")), this.flagReset();
  } }, points: { render: function(i) {
    if (this._opacity === 0 && !this._flagOpacity)
      return this;
    this._update();
    let t = {};
    if ((this._matrix.manual || this._flagMatrix) && (t.transform = "matrix(" + this._matrix.toString() + ")"), this._flagId && (t.id = this._id), this._flagVertices || this._flagSize || this._flagSizeAttenuation) {
      let s = this._size;
      if (!this._sizeAttenuation) {
        let n = this.worldMatrix.elements, a = Rt(n[0], n[3], n[1], n[4], n[2], n[5]);
        s /= Math.max(a.scaleX, a.scaleY);
      }
      let r = C.pointsToString(this._renderer.collection, s);
      t.d = r;
    }
    return this._fill && this._fill._renderer && (this._renderer.hasFillEffect = true, this._fill._update(), C[this._fill._renderer.type].render.call(this._fill, i, true)), this._flagFill && (t.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill, this._renderer.hasFillEffect && typeof this._fill.id > "u" && (i.defs._flagUpdate = true, delete this._renderer.hasFillEffect)), this._stroke && this._stroke._renderer && (this._renderer.hasStrokeEffect = true, this._stroke._update(), C[this._stroke._renderer.type].render.call(this._stroke, i, true)), this._flagStroke && (t.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke, this._renderer.hasStrokeEffect && typeof this._stroke.id > "u" && (i.defs._flagUpdate = true, delete this._renderer.hasStrokeEffect)), this._flagLinewidth && (t["stroke-width"] = this._linewidth), this._flagOpacity && (t["stroke-opacity"] = this._opacity, t["fill-opacity"] = this._opacity), this._flagClassName && (t.class = this.classList.join(" ")), this._flagVisible && (t.visibility = this._visible ? "visible" : "hidden"), this.dashes && this.dashes.length > 0 && (t["stroke-dasharray"] = this.dashes.join(" "), t["stroke-dashoffset"] = this.dashes.offset || 0), this._renderer.elem ? C.setAttributes(this._renderer.elem, t) : (t.id = this._id, this._renderer.elem = C.createElement("path", t), i.appendChild(this._renderer.elem)), this.flagReset();
  } }, text: { render: function(i) {
    this._update();
    let t = {};
    if ((this._matrix.manual || this._flagMatrix) && (t.transform = "matrix(" + this._matrix.toString() + ")"), this._flagId && (t.id = this._id), this._flagFamily && (t["font-family"] = this._family), this._flagSize && (t["font-size"] = this._size), this._flagLeading && (t["line-height"] = this._leading), this._flagAlignment && (t["text-anchor"] = C.alignments[this._alignment] || this._alignment), this._flagBaseline && (t["dominant-baseline"] = C.baselines[this._baseline] || this._baseline), this._flagStyle && (t["font-style"] = this._style), this._flagWeight && (t["font-weight"] = this._weight), this._flagDecoration && (t["text-decoration"] = this._decoration), this._flagDirection && (t.direction = this._direction), this._fill && this._fill._renderer && (this._renderer.hasFillEffect = true, this._fill._update(), C[this._fill._renderer.type].render.call(this._fill, i, true)), this._flagFill && (t.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill, this._renderer.hasFillEffect && typeof this._fill.id > "u" && (i.defs._flagUpdate = true, delete this._renderer.hasFillEffect)), this._stroke && this._stroke._renderer && (this._renderer.hasStrokeEffect = true, this._stroke._update(), C[this._stroke._renderer.type].render.call(this._stroke, i, true)), this._flagStroke && (t.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke, this._renderer.hasStrokeEffect && typeof this._stroke.id > "u" && (i.defs._flagUpdate = true, delete this._renderer.hasStrokeEffect)), this._flagLinewidth && (t["stroke-width"] = this._linewidth), this._flagOpacity && (t.opacity = this._opacity), this._flagClassName && (t.class = this.classList.join(" ")), this._flagVisible && (t.visibility = this._visible ? "visible" : "hidden"), this.dashes && this.dashes.length > 0 && (t["stroke-dasharray"] = this.dashes.join(" "), t["stroke-dashoffset"] = this.dashes.offset || 0), this._renderer.elem ? C.setAttributes(this._renderer.elem, t) : (t.id = this._id, this._renderer.elem = C.createElement("text", t), i.appendChild(this._renderer.elem)), this._flagClip) {
      let s = C.getClip(this, i), r = this._renderer.elem;
      this._clip ? (r.removeAttribute("id"), s.setAttribute("id", this.id), s.appendChild(r)) : (s.removeAttribute("id"), r.setAttribute("id", this.id), this.parent._renderer.elem.appendChild(r));
    }
    return this._flagMask && (this._mask ? (C[this._mask._renderer.type].render.call(this._mask, i), this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")")) : this._renderer.elem.removeAttribute("clip-path")), this._flagValue && (this._renderer.elem.textContent = this._value), this.flagReset();
  } }, "linear-gradient": { render: function(i, t) {
    t || this._update();
    let e2 = {};
    if (this._flagId && (e2.id = this._id), this._flagEndPoints && (e2.x1 = this.left._x, e2.y1 = this.left._y, e2.x2 = this.right._x, e2.y2 = this.right._y), this._flagSpread && (e2.spreadMethod = this._spread), this._flagUnits && (e2.gradientUnits = this._units), this._renderer.elem ? C.setAttributes(this._renderer.elem, e2) : (e2.id = this._id, this._renderer.elem = C.createElement("linearGradient", e2)), this._renderer.elem.parentNode === null && i.defs.appendChild(this._renderer.elem), this._flagStops) {
      let s = this._renderer.elem.childNodes.length !== this.stops.length;
      if (s)
        for (; this._renderer.elem.lastChild; )
          this._renderer.elem.removeChild(this._renderer.elem.lastChild);
      for (let r = 0; r < this.stops.length; r++) {
        let n = this.stops[r], a = {};
        n._flagOffset && (a.offset = 100 * n._offset + "%"), n._flagColor && (a["stop-color"] = n._color), n._flagOpacity && (a["stop-opacity"] = n._opacity), n._renderer.elem ? C.setAttributes(n._renderer.elem, a) : n._renderer.elem = C.createElement("stop", a), s && this._renderer.elem.appendChild(n._renderer.elem), n.flagReset();
      }
    }
    return this.flagReset();
  } }, "radial-gradient": { render: function(i, t) {
    t || this._update();
    let e2 = {};
    if (this._flagId && (e2.id = this._id), this._flagCenter && (e2.cx = this.center._x, e2.cy = this.center._y), this._flagFocal && (e2.fx = this.focal._x, e2.fy = this.focal._y), this._flagRadius && (e2.r = this._radius), this._flagSpread && (e2.spreadMethod = this._spread), this._flagUnits && (e2.gradientUnits = this._units), this._renderer.elem ? C.setAttributes(this._renderer.elem, e2) : (e2.id = this._id, this._renderer.elem = C.createElement("radialGradient", e2)), this._renderer.elem.parentNode === null && i.defs.appendChild(this._renderer.elem), this._flagStops) {
      let s = this._renderer.elem.childNodes.length !== this.stops.length;
      if (s)
        for (; this._renderer.elem.lastChild; )
          this._renderer.elem.removeChild(this._renderer.elem.lastChild);
      for (let r = 0; r < this.stops.length; r++) {
        let n = this.stops[r], a = {};
        n._flagOffset && (a.offset = 100 * n._offset + "%"), n._flagColor && (a["stop-color"] = n._color), n._flagOpacity && (a["stop-opacity"] = n._opacity), n._renderer.elem ? C.setAttributes(n._renderer.elem, a) : n._renderer.elem = C.createElement("stop", a), s && this._renderer.elem.appendChild(n._renderer.elem), n.flagReset();
      }
    }
    return this.flagReset();
  } }, texture: { render: function(i, t) {
    t || this._update();
    let e2 = {}, s = { x: 0, y: 0 }, r = this.image;
    if (this._flagId && (e2.id = this._id), this._flagLoaded && this.loaded)
      switch (r.nodeName.toLowerCase()) {
        case "canvas":
          s.href = s["xlink:href"] = r.toDataURL("image/png");
          break;
        case "img":
        case "image":
          s.href = s["xlink:href"] = this.src;
          break;
      }
    if ((this._flagOffset || this._flagLoaded || this._flagScale) && (e2.x = this._offset.x, e2.y = this._offset.y, r && (e2.x -= r.width / 2, e2.y -= r.height / 2, this._scale instanceof w ? (e2.x *= this._scale.x, e2.y *= this._scale.y) : (e2.x *= this._scale, e2.y *= this._scale)), e2.x > 0 && (e2.x *= -1), e2.y > 0 && (e2.y *= -1)), (this._flagScale || this._flagLoaded || this._flagRepeat) && (e2.width = 0, e2.height = 0, r)) {
      switch (s.width = e2.width = r.width, s.height = e2.height = r.height, this._repeat) {
        case "no-repeat":
          e2.width += 1, e2.height += 1;
          break;
      }
      this._scale instanceof w ? (e2.width *= this._scale.x, e2.height *= this._scale.y) : (e2.width *= this._scale, e2.height *= this._scale);
    }
    return (this._flagScale || this._flagLoaded) && (this._renderer.image ? C.setAttributes(this._renderer.image, s) : this._renderer.image = C.createElement("image", s)), this._renderer.elem ? Object.keys(e2).length !== 0 && C.setAttributes(this._renderer.elem, e2) : (e2.id = this._id, e2.patternUnits = "userSpaceOnUse", this._renderer.elem = C.createElement("pattern", e2)), this._renderer.elem.parentNode === null && i.defs.appendChild(this._renderer.elem), this._renderer.elem && this._renderer.image && !this._renderer.appended && (this._renderer.elem.appendChild(this._renderer.image), this._renderer.appended = true), this.flagReset();
  } } }, ge = class extends p {
    constructor(t) {
      super(), this.domElement = t.domElement || C.createElement("svg"), this.scene = new q(), this.scene.parent = this, this.defs = C.createElement("defs"), this.defs._flagUpdate = false, this.domElement.appendChild(this.defs), this.domElement.defs = this.defs, this.domElement.style.overflow = "hidden";
    }
    setSize(t, e2) {
      return this.width = t, this.height = e2, C.setAttributes(this.domElement, { width: t, height: e2 }), this.trigger(p.Types.resize, t, e2);
    }
    render() {
      return C.group.render.call(this.scene, this.domElement), C.defs.update(this.domElement), this;
    }
  };
  x(ge, "Utils", C);
  var mt = { create: function(i, t, e2) {
    let s = i.createShader(i[e2]);
    if (i.shaderSource(s, t), i.compileShader(s), !i.getShaderParameter(s, i.COMPILE_STATUS)) {
      let n = i.getShaderInfoLog(s);
      throw i.deleteShader(s), new et("unable to compile shader " + s + ": " + n);
    }
    return s;
  }, types: { vertex: "VERTEX_SHADER", fragment: "FRAGMENT_SHADER" }, path: { vertex: "\n      precision mediump float;\n      attribute vec2 a_position;\n\n      uniform mat3 u_matrix;\n      uniform vec2 u_resolution;\n      uniform vec4 u_rect;\n\n      varying vec2 v_textureCoords;\n\n      void main() {\n        vec2 rectCoords = (a_position * (u_rect.zw - u_rect.xy)) + u_rect.xy;\n        vec2 projected = (u_matrix * vec3(rectCoords, 1.0)).xy;\n        vec2 normal = projected / u_resolution;\n        vec2 clipspace = (normal * 2.0) - 1.0;\n\n        gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);\n        v_textureCoords = a_position;\n      }\n    ", fragment: "\n      precision mediump float;\n\n      uniform sampler2D u_image;\n      varying vec2 v_textureCoords;\n\n      void main() {\n        vec4 texel = texture2D(u_image, v_textureCoords);\n        if (texel.a == 0.0) {\n          discard;\n        }\n        gl_FragColor = texel;\n      }\n    " }, points: { vertex: "\n      precision mediump float;\n      attribute vec2 a_position;\n\n      uniform float u_size;\n      uniform mat3 u_matrix;\n      uniform vec2 u_resolution;\n\n      varying vec2 v_textureCoords;\n\n      void main() {\n        vec2 projected = (u_matrix * vec3(a_position, 1.0)).xy;\n        vec2 normal = projected / u_resolution;\n        vec2 clipspace = (normal * 2.0) - 1.0;\n\n        gl_PointSize = u_size;\n        gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);\n        v_textureCoords = a_position;\n      }\n    ", fragment: "\n      precision mediump float;\n\n      uniform sampler2D u_image;\n\n      void main() {\n        vec4 texel = texture2D(u_image, gl_PointCoord);\n        if (texel.a == 0.0) {\n          discard;\n        }\n        gl_FragColor = texel;\n      }\n    " } };
  var Me = xt.Multiply, Ws = [1, 0, 0, 0, 1, 0, 0, 0, 1], Bt = new yt(9), Xs = vt.Utils, Hi = new w(), oi = new yt([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), P = { precision: 0.9, isHidden: /(undefined|none|transparent)/i, canvas: W.document ? W.document.createElement("canvas") : { getContext: function() {
  } }, alignments: { left: "start", middle: "center", right: "end" }, matrix: new xt(), group: { removeChild: function(i, t) {
    if (i.children)
      for (let e2 = 0; e2 < i.children.length; e2++)
        P.group.removeChild(i.children[e2], t);
    i._renderer.texture && (t.deleteTexture(i._renderer.texture), delete i._renderer.texture), i._renderer.positionBuffer && (t.deleteBuffer(i._renderer.positionBuffer), delete i._renderer.positionBuffer);
  }, render: function(i, t) {
    if (!this._visible)
      return;
    this._update();
    let e2 = this.parent, s = e2._matrix && e2._matrix.manual || e2._flagMatrix, r = this._matrix.manual || this._flagMatrix;
    (s || r) && (this._renderer.matrix || (this._renderer.matrix = new yt(9)), this._matrix.toTransformArray(true, Bt), Me(Bt, e2._renderer.matrix, this._renderer.matrix), this._renderer.scale instanceof w || (this._renderer.scale = new w()), this._scale instanceof w ? (this._renderer.scale.x = this._scale.x, this._renderer.scale.y = this._scale.y) : (this._renderer.scale.x = this._scale, this._renderer.scale.y = this._scale), /renderer/i.test(e2._renderer.type) || (this._renderer.scale.x *= e2._renderer.scale.x, this._renderer.scale.y *= e2._renderer.scale.y), s && (this._flagMatrix = true)), this._mask && (i.clear(i.STENCIL_BUFFER_BIT), i.enable(i.STENCIL_TEST), i.stencilFunc(i.ALWAYS, 1, 0), i.stencilOp(i.KEEP, i.KEEP, i.REPLACE), i.colorMask(false, false, false, false), P[this._mask._renderer.type].render.call(this._mask, i, t, this), i.stencilFunc(i.EQUAL, 1, 255), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.colorMask(true, true, true, true)), this._flagOpacity = e2._flagOpacity || this._flagOpacity, this._renderer.opacity = this._opacity * (e2 && e2._renderer ? e2._renderer.opacity : 1);
    let n;
    if (this._flagSubtractions)
      for (n = 0; n < this.subtractions.length; n++)
        P.group.removeChild(this.subtractions[n], i);
    for (n = 0; n < this.children.length; n++) {
      let a = this.children[n];
      P[a._renderer.type].render.call(a, i, t);
    }
    return this._mask && i.disable(i.STENCIL_TEST), this.flagReset();
  } }, path: { updateCanvas: function(i, t) {
    let e2, s, r, n, a, o, h, l, f, c, d, _, u, y, b = t._renderer.vertices, m = this.canvas, g = this.ctx, k = i.renderer.ratio, R = Hi.copy(t._renderer.scale).multiply(k), A = t._stroke, S = t._linewidth, F = t._fill, B = t._renderer.opacity || t._opacity, L = t._cap, M = t._join, V = t._miter, j = t._closed, X = t.dashes, z = b.length, it = z - 1;
    m.width = Math.max(Math.ceil(t._renderer.rect.width * R.x), 1), m.height = Math.max(Math.ceil(t._renderer.rect.height * R.y), 1);
    let ht = t._renderer.rect.centroid, tt = ht.x, _t = ht.y;
    g.clearRect(0, 0, m.width, m.height), F && (typeof F == "string" ? g.fillStyle = F : (P[F._renderer.type].render.call(F, g, t), g.fillStyle = F._renderer.effect)), A && (typeof A == "string" ? g.strokeStyle = A : (P[A._renderer.type].render.call(A, g, t), g.strokeStyle = A._renderer.effect), S && (g.lineWidth = S), V && (g.miterLimit = V), M && (g.lineJoin = M), !j && L && (g.lineCap = L)), typeof B == "number" && (g.globalAlpha = B), X && X.length > 0 && (g.lineDashOffset = X.offset || 0, g.setLineDash(X));
    let nt, Tt, Ct, Qt, te, ee, ie, se;
    g.save(), g.scale(R.x, R.y), g.translate(tt, _t), g.beginPath();
    for (let kt = 0; kt < b.length; kt++) {
      let Y = b[kt];
      switch (_ = Y.x, u = Y.y, Y.command) {
        case v.close:
          g.closePath();
          break;
        case v.arc:
          Tt = Y.rx, Ct = Y.ry, Qt = Y.xAxisRotation, te = Y.largeArcFlag, ee = Y.sweepFlag, e2 = j ? st(kt - 1, z) : Math.max(kt - 1, 0), s = b[e2], ie = s.x, se = s.y, Xs.renderSvgArcCommand(g, ie, se, Tt, Ct, te, ee, Qt, _, u);
          break;
        case v.curve:
          e2 = j ? st(kt - 1, z) : Math.max(kt - 1, 0), s = b[e2], l = s.controls && s.controls.right || w.zero, f = Y.controls && Y.controls.left || w.zero, s._relative ? (o = l.x + s.x, h = l.y + s.y) : (o = l.x, h = l.y), Y._relative ? (n = f.x + Y.x, a = f.y + Y.y) : (n = f.x, a = f.y), g.bezierCurveTo(o, h, n, a, _, u), kt >= it && j && (r = nt, c = Y.controls && Y.controls.right || w.zero, d = r.controls && r.controls.left || w.zero, Y._relative ? (o = c.x + Y.x, h = c.y + Y.y) : (o = c.x, h = c.y), r._relative ? (n = d.x + r.x, a = d.y + r.y) : (n = d.x, a = d.y), _ = r.x, u = r.y, g.bezierCurveTo(o, h, n, a, _, u));
          break;
        case v.line:
          g.lineTo(_, u);
          break;
        case v.move:
          nt = Y, g.moveTo(_, u);
          break;
      }
    }
    j && g.closePath(), P.isHidden.test(F) || (y = F._renderer && F._renderer.offset, y && (g.save(), g.translate(-F._renderer.offset.x, -F._renderer.offset.y), g.scale(F._renderer.scale.x, F._renderer.scale.y)), g.fill(), y && g.restore()), P.isHidden.test(A) || (y = A._renderer && A._renderer.offset, y && (g.save(), g.translate(-A._renderer.offset.x, -A._renderer.offset.y), g.scale(A._renderer.scale.x, A._renderer.scale.y), g.lineWidth = S / A._renderer.scale.x), g.stroke(), y && g.restore()), g.restore();
  }, getBoundingClientRect: function(i, t, e2) {
    let s = 1 / 0, r = -1 / 0, n = 1 / 0, a = -1 / 0, o, h;
    i.forEach(function(l) {
      let f = l.x, c = l.y, d = l.controls, _, u, y, b, m, g;
      n = Math.min(c, n), s = Math.min(f, s), r = Math.max(f, r), a = Math.max(c, a), l.controls && (m = d.left, g = d.right, !(!m || !g) && (_ = l._relative ? m.x + f : m.x, u = l._relative ? m.y + c : m.y, y = l._relative ? g.x + f : g.x, b = l._relative ? g.y + c : g.y, !(!_ || !u || !y || !b) && (n = Math.min(u, b, n), s = Math.min(_, y, s), r = Math.max(_, y, r), a = Math.max(u, b, a))));
    }), typeof t == "number" && (n -= t, s -= t, r += t, a += t), o = r - s, h = a - n, e2.top = n, e2.left = s, e2.right = r, e2.bottom = a, e2.width = o, e2.height = h, e2.centroid || (e2.centroid = {}), e2.centroid.x = -s, e2.centroid.y = -n;
  }, render: function(i, t, e2) {
    if (!this._visible || !this._opacity)
      return this;
    this._update();
    let s = e2 || this.parent, r = t[this._renderer.type], n = s._matrix.manual || s._flagMatrix, a = this._matrix.manual || this._flagMatrix, o = this._renderer.parent !== s, h = this._flagVertices || this._flagFill || this._fill instanceof U && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof D && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof N && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof U && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof D && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof N && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || s._flagOpacity || this._flagVisible || this._flagCap || this._flagJoin || this._flagMiter || this._flagScale || this.dashes && this.dashes.length > 0 || !this._renderer.texture;
    if ((n || a || o) && (this._renderer.matrix || (this._renderer.matrix = new yt(9)), this._matrix.toTransformArray(true, Bt), Me(Bt, s._renderer.matrix, this._renderer.matrix), this._renderer.scale instanceof w || (this._renderer.scale = new w()), this._scale instanceof w ? (this._renderer.scale.x = this._scale.x * s._renderer.scale.x, this._renderer.scale.y = this._scale.y * s._renderer.scale.y) : (this._renderer.scale.x = this._scale * s._renderer.scale.x, this._renderer.scale.y = this._scale * s._renderer.scale.y), o && (this._renderer.parent = s)), this._mask && (i.clear(i.STENCIL_BUFFER_BIT), i.enable(i.STENCIL_TEST), i.stencilFunc(i.ALWAYS, 1, 0), i.stencilOp(i.KEEP, i.KEEP, i.REPLACE), i.colorMask(false, false, false, false), P[this._mask._renderer.type].render.call(this._mask, i, t, this), i.stencilFunc(i.EQUAL, 1, 255), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.colorMask(true, true, true, true)), h ? (this._renderer.rect || (this._renderer.rect = {}), this._renderer.opacity = this._opacity * s._renderer.opacity, P.path.getBoundingClientRect(this._renderer.vertices, this._linewidth, this._renderer.rect), P.updateTexture.call(P, i, this)) : (this._fill && this._fill._update && this._fill._update(), this._stroke && this._stroke._update && this._stroke._update()), this._clip && !e2 || !this._renderer.texture)
      return this;
    t.current !== r && (i.useProgram(r), i.bindBuffer(i.ARRAY_BUFFER, t.buffers.position), i.vertexAttribPointer(r.position, 2, i.FLOAT, false, 0, 0), i.enableVertexAttribArray(r.position), i.bufferData(i.ARRAY_BUFFER, oi, i.STATIC_DRAW), t.resolution.flagged || i.uniform2f(i.getUniformLocation(r, "u_resolution"), t.resolution.width, t.resolution.height), t.current = r), t.resolution.flagged && i.uniform2f(i.getUniformLocation(r, "u_resolution"), t.resolution.width, t.resolution.height), i.bindTexture(i.TEXTURE_2D, this._renderer.texture);
    let l = this._renderer.rect;
    return i.uniformMatrix3fv(r.matrix, false, this._renderer.matrix), i.uniform4f(r.rect, l.left, l.top, l.right, l.bottom), i.drawArrays(i.TRIANGLES, 0, 6), this._mask && i.disable(i.STENCIL_TEST), this.flagReset();
  } }, points: { updateCanvas: function(i, t) {
    let e2, s = this.canvas, r = this.ctx, n = i.renderer.ratio, a = t._stroke, o = t._linewidth, h = t._fill, l = t._renderer.opacity || t._opacity, f = t.dashes, c = t._size * n, d = c;
    P.isHidden.test(a) || (d += o), s.width = Ie(d), s.height = s.width;
    let _ = d / s.width, u = s.width / 2, y = s.height / 2;
    r.clearRect(0, 0, s.width, s.height), h && (typeof h == "string" ? r.fillStyle = h : (P[h._renderer.type].render.call(h, r, t), r.fillStyle = h._renderer.effect)), a && (typeof a == "string" ? r.strokeStyle = a : (P[a._renderer.type].render.call(a, r, t), r.strokeStyle = a._renderer.effect), o && (r.lineWidth = o / _)), typeof l == "number" && (r.globalAlpha = l), f && f.length > 0 && (r.lineDashOffset = f.offset || 0, r.setLineDash(f)), r.save(), r.translate(u, y), r.scale(P.precision, P.precision), r.beginPath(), r.arc(0, 0, c / _ * 0.5, 0, J), r.restore(), closed && r.closePath(), P.isHidden.test(h) || (e2 = h._renderer && h._renderer.offset, e2 && (r.save(), r.translate(-h._renderer.offset.x, -h._renderer.offset.y), r.scale(h._renderer.scale.x, h._renderer.scale.y)), r.fill(), e2 && r.restore()), P.isHidden.test(a) || (e2 = a._renderer && a._renderer.offset, e2 && (r.save(), r.translate(-a._renderer.offset.x, -a._renderer.offset.y), r.scale(a._renderer.scale.x, a._renderer.scale.y), r.lineWidth = o / a._renderer.scale.x), r.stroke(), e2 && r.restore());
  }, render: function(i, t, e2) {
    if (!this._visible || !this._opacity)
      return this;
    this._update();
    let s = this._size, r = e2 || this.parent, n = t[this._renderer.type], a = this._sizeAttenuation, o = this._stroke, h = this._linewidth, l = r._matrix.manual || r._flagMatrix, f = this._matrix.manual || this._flagMatrix, c = this._renderer.parent !== r, d = this._renderer.vertices, _ = this._renderer.collection.length, u = this._flagVertices, y = this._flagFill || this._fill instanceof U && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof D && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof N && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof U && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof D && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof N && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || r._flagOpacity || this._flagVisible || this._flagScale || this.dashes && this.dashes.length > 0 || !this._renderer.texture;
    if ((l || f || c) && (this._renderer.matrix || (this._renderer.matrix = new yt(9)), this._matrix.toTransformArray(true, Bt), Me(Bt, r._renderer.matrix, this._renderer.matrix), this._renderer.scale instanceof w || (this._renderer.scale = new w()), this._scale instanceof w ? (this._renderer.scale.x = this._scale.x * r._renderer.scale.x, this._renderer.scale.y = this._scale.y * r._renderer.scale.y) : (this._renderer.scale.x = this._scale * r._renderer.scale.x, this._renderer.scale.y = this._scale * r._renderer.scale.y), c && (this._renderer.parent = r)), u) {
      let b = this._renderer.positionBuffer;
      b && i.deleteBuffer(b), this._renderer.positionBuffer = i.createBuffer(), i.bindBuffer(i.ARRAY_BUFFER, this._renderer.positionBuffer), i.vertexAttribPointer(n.position, 2, i.FLOAT, false, 0, 0), i.enableVertexAttribArray(n.position), i.bufferData(i.ARRAY_BUFFER, d, i.STATIC_DRAW);
    }
    return y ? (this._renderer.opacity = this._opacity * r._renderer.opacity, P.updateTexture.call(P, i, this)) : (this._fill && this._fill._update && this._fill._update(), this._stroke && this._stroke._update && this._stroke._update()), this._clip && !e2 || !this._renderer.texture ? this : (P.isHidden.test(o) || (s += h), s /= P.precision, a && (s *= Math.max(this._renderer.scale.x, this._renderer.scale.y)), t.current !== n && (i.useProgram(n), t.resolution.flagged || i.uniform2f(i.getUniformLocation(n, "u_resolution"), t.resolution.width, t.resolution.height), t.current = n), t.resolution.flagged && i.uniform2f(i.getUniformLocation(n, "u_resolution"), t.resolution.width, t.resolution.height), i.bindTexture(i.TEXTURE_2D, this._renderer.texture), i.uniformMatrix3fv(n.matrix, false, this._renderer.matrix), i.uniform1f(n.size, s * t.resolution.ratio), i.drawArrays(i.POINTS, 0, _), this.flagReset());
  } }, text: { updateCanvas: function(i, t) {
    let e2 = this.canvas, s = this.ctx, r = i.renderer.ratio, n = Hi.copy(t._renderer.scale).multiply(r), a = t._stroke, o = t._linewidth, h = t._fill, l = t._renderer.opacity || t._opacity, f = t.dashes, c = t._decoration, d = t._direction;
    e2.width = Math.max(Math.ceil(t._renderer.rect.width * n.x), 1), e2.height = Math.max(Math.ceil(t._renderer.rect.height * n.y), 1);
    let _ = t._renderer.rect.centroid, u = _.x, y = _.y, b, m, g, k, R, A, S, F, B, L, M, V = h._renderer && h._renderer.offset && a._renderer && a._renderer.offset;
    if (s.clearRect(0, 0, e2.width, e2.height), V || (s.font = [t._style, t._weight, t._size + "px/" + t._leading + "px", t._family].join(" ")), s.textAlign = "center", s.textBaseline = "middle", s.textDirection = d, h && (typeof h == "string" ? s.fillStyle = h : (P[h._renderer.type].render.call(h, s, t), s.fillStyle = h._renderer.effect)), a && (typeof a == "string" ? s.strokeStyle = a : (P[a._renderer.type].render.call(a, s, t), s.strokeStyle = a._renderer.effect), o && (s.lineWidth = o)), typeof l == "number" && (s.globalAlpha = l), f && f.length > 0 && (s.lineDashOffset = f.offset || 0, s.setLineDash(f)), s.save(), s.scale(n.x, n.y), s.translate(u, y), P.isHidden.test(h) || (h._renderer && h._renderer.offset ? (A = h._renderer.scale.x, S = h._renderer.scale.y, s.save(), s.translate(-h._renderer.offset.x, -h._renderer.offset.y), s.scale(A, S), b = t._size / h._renderer.scale.y, m = t._leading / h._renderer.scale.y, s.font = [t._style, t._weight, b + "px/", m + "px", t._family].join(" "), g = h._renderer.offset.x / h._renderer.scale.x, k = h._renderer.offset.y / h._renderer.scale.y, s.fillText(t.value, g, k), s.restore()) : s.fillText(t.value, 0, 0)), P.isHidden.test(a) || (a._renderer && a._renderer.offset ? (A = a._renderer.scale.x, S = a._renderer.scale.y, s.save(), s.translate(-a._renderer.offset.x, -a._renderer.offset.y), s.scale(A, S), b = t._size / a._renderer.scale.y, m = t._leading / a._renderer.scale.y, s.font = [t._style, t._weight, b + "px/", m + "px", t._family].join(" "), g = a._renderer.offset.x / a._renderer.scale.x, k = a._renderer.offset.y / a._renderer.scale.y, R = o / a._renderer.scale.x, s.lineWidth = R, s.strokeText(t.value, g, k), s.restore()) : s.strokeText(t.value, 0, 0)), /(underline|strikethrough)/i.test(c)) {
      let j = s.measureText(t.value);
      switch (c) {
        case "underline":
          B = j.actualBoundingBoxDescent, M = j.actualBoundingBoxDescent;
          break;
        case "strikethrough":
          B = 0, M = 0;
          break;
      }
      F = -j.width / 2, L = j.width / 2, s.lineWidth = Math.max(Math.floor(t._size / 15), 1), s.strokeStyle = s.fillStyle, s.beginPath(), s.moveTo(F, B), s.lineTo(L, M), s.stroke();
    }
    s.restore();
  }, getBoundingClientRect: function(i, t) {
    let e2 = P.ctx;
    e2.font = [i._style, i._weight, i._size + "px/" + i._leading + "px", i._family].join(" "), e2.textAlign = "center", e2.textBaseline = vt.Utils.baselines[i._baseline] || i._baseline;
    let s = e2.measureText(i._value), r = s.width, n = 1.15 * (s.actualBoundingBoxAscent + s.actualBoundingBoxDescent);
    this._linewidth && !P.isHidden.test(this._stroke) && (r += this._linewidth * 2, n += this._linewidth * 2);
    let a = r / 2, o = n / 2;
    switch (P.alignments[i._alignment] || i._alignment) {
      case P.alignments.left:
        i.direction === "ltr" ? (t.left = 0, t.right = r) : (t.left = -r, t.right = 0);
        break;
      case P.alignments.right:
        i.direction === "ltr" ? (t.left = -r, t.right = 0) : (t.left = 0, t.right = r);
        break;
      default:
        t.left = -a, t.right = a;
    }
    switch (i._baseline) {
      case "bottom":
        t.top = -n, t.bottom = 0;
        break;
      case "top":
        t.top = 0, t.bottom = n;
        break;
      case "baseline":
        t.top = -o * 1.5, t.bottom = o * 0.5;
        break;
      default:
        t.top = -o, t.bottom = o;
    }
    t.width = r, t.height = n, t.centroid || (t.centroid = {}), t.centroid.x = a, t.centroid.y = o;
  }, render: function(i, t, e2) {
    if (!this._visible || !this._opacity)
      return this;
    this._update();
    let s = e2 || this.parent, r = t[this._renderer.type], n = s._matrix.manual || s._flagMatrix, a = this._matrix.manual || this._flagMatrix, o = this._renderer.parent !== s, h = this._flagVertices || this._flagFill || this._fill instanceof U && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof D && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof N && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof U && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof D && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof N && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || s._flagOpacity || this._flagVisible || this._flagScale || this._flagValue || this._flagFamily || this._flagSize || this._flagLeading || this._flagAlignment || this._flagBaseline || this._flagStyle || this._flagWeight || this._flagDecoration || this.dashes && this.dashes.length > 0 || !this._renderer.texture;
    if ((n || a || o) && (this._renderer.matrix || (this._renderer.matrix = new yt(9)), this._matrix.toTransformArray(true, Bt), Me(Bt, s._renderer.matrix, this._renderer.matrix), this._renderer.scale instanceof w || (this._renderer.scale = new w()), this._scale instanceof w ? (this._renderer.scale.x = this._scale.x * s._renderer.scale.x, this._renderer.scale.y = this._scale.y * s._renderer.scale.y) : (this._renderer.scale.x = this._scale * s._renderer.scale.x, this._renderer.scale.y = this._scale * s._renderer.scale.y), o && (this._renderer.parent = s)), this._mask && (i.clear(i.STENCIL_BUFFER_BIT), i.enable(i.STENCIL_TEST), i.stencilFunc(i.ALWAYS, 1, 0), i.stencilOp(i.KEEP, i.KEEP, i.REPLACE), i.colorMask(false, false, false, false), P[this._mask._renderer.type].render.call(this._mask, i, t, this), i.stencilFunc(i.EQUAL, 1, 255), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.colorMask(true, true, true, true)), h ? (this._renderer.rect || (this._renderer.rect = {}), this._renderer.opacity = this._opacity * s._renderer.opacity, P.text.getBoundingClientRect(this, this._renderer.rect), P.updateTexture.call(P, i, this)) : (this._fill && this._fill._update && this._fill._update(), this._stroke && this._stroke._update && this._stroke._update()), this._clip && !e2 || !this._renderer.texture)
      return this;
    t.current !== r && (i.useProgram(r), i.bindBuffer(i.ARRAY_BUFFER, t.buffers.position), i.vertexAttribPointer(r.position, 2, i.FLOAT, false, 0, 0), i.enableVertexAttribArray(r.position), i.bufferData(i.ARRAY_BUFFER, oi, i.STATIC_DRAW), t.resolution.flagged || i.uniform2f(i.getUniformLocation(r, "u_resolution"), t.resolution.width, t.resolution.height), t.current = r), t.resolution.flagged && i.uniform2f(i.getUniformLocation(r, "u_resolution"), t.resolution.width, t.resolution.height), i.bindTexture(i.TEXTURE_2D, this._renderer.texture);
    let l = this._renderer.rect;
    return i.uniformMatrix3fv(r.matrix, false, this._renderer.matrix), i.uniform4f(r.rect, l.left, l.top, l.right, l.bottom), i.drawArrays(i.TRIANGLES, 0, 6), this._mask && i.disable(i.STENCIL_TEST), this.flagReset();
  } }, "linear-gradient": { render: function(i, t) {
    if (!(!i.canvas.getContext("2d") || !t)) {
      if (this._update(), !this._renderer.effect || this._flagEndPoints || this._flagStops || this._flagUnits) {
        let e2, s = this.left._x, r = this.left._y, n = this.right._x, a = this.right._y;
        /objectBoundingBox/i.test(this._units) && (e2 = t.getBoundingClientRect(true), s = (s - 0.5) * e2.width, r = (r - 0.5) * e2.height, n = (n - 0.5) * e2.width, a = (a - 0.5) * e2.height), this._renderer.effect = i.createLinearGradient(s, r, n, a);
        for (let o = 0; o < this.stops.length; o++) {
          let h = this.stops[o];
          this._renderer.effect.addColorStop(h._offset, h._color);
        }
      }
      return this.flagReset();
    }
  } }, "radial-gradient": { render: function(i, t) {
    if (!(!i.canvas.getContext("2d") || !t)) {
      if (this._update(), !this._renderer.effect || this._flagCenter || this._flagFocal || this._flagRadius || this._flagStops || this._flagUnits) {
        let e2, s = this.center._x, r = this.center._y, n = this.focal._x, a = this.focal._y, o = this._radius;
        /objectBoundingBox/i.test(this._units) && (e2 = t.getBoundingClientRect(true), s = s * e2.width * 0.5, r = r * e2.height * 0.5, n = n * e2.width * 0.5, a = a * e2.height * 0.5, o *= Math.min(e2.width, e2.height) * 0.5), this._renderer.effect = i.createRadialGradient(s, r, 0, n, a, o);
        for (let h = 0; h < this.stops.length; h++) {
          let l = this.stops[h];
          this._renderer.effect.addColorStop(l._offset, l._color);
        }
      }
      return this.flagReset();
    }
  } }, texture: { render: function(i, t) {
    if (!i.canvas.getContext("2d"))
      return;
    this._update();
    let e2 = this.image;
    if ((this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded)
      this._renderer.effect = i.createPattern(e2, this._repeat);
    else if (!this._renderer.effect)
      return this.flagReset();
    return (this._flagOffset || this._flagLoaded || this._flagScale) && (this._renderer.offset instanceof w || (this._renderer.offset = new w()), this._renderer.offset.x = -this._offset.x, this._renderer.offset.y = -this._offset.y, e2 && (this._renderer.offset.x += e2.width / 2, this._renderer.offset.y += e2.height / 2, this._scale instanceof w ? (this._renderer.offset.x *= this._scale.x, this._renderer.offset.y *= this._scale.y) : (this._renderer.offset.x *= this._scale, this._renderer.offset.y *= this._scale))), (this._flagScale || this._flagLoaded) && (this._renderer.scale instanceof w || (this._renderer.scale = new w()), this._scale instanceof w ? this._renderer.scale.copy(this._scale) : this._renderer.scale.set(this._scale, this._scale)), this.flagReset();
  } }, updateTexture: function(i, t) {
    if (this[t._renderer.type].updateCanvas.call(P, i, t), this.canvas.width <= 0 || this.canvas.height <= 0) {
      t._renderer.texture && i.deleteTexture(t._renderer.texture), delete t._renderer.texture;
      return;
    }
    t._renderer.texture || (t._renderer.texture = i.createTexture()), i.bindTexture(i.TEXTURE_2D, t._renderer.texture), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, this.canvas), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.LINEAR), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR);
  }, program: { create: function(i, t) {
    let e2, s, r;
    if (e2 = i.createProgram(), E.each(t, function(n) {
      i.attachShader(e2, n);
    }), i.linkProgram(e2), s = i.getProgramParameter(e2, i.LINK_STATUS), !s)
      throw r = i.getProgramInfoLog(e2), i.deleteProgram(e2), new et("unable to link program: " + r);
    return e2;
  } }, extensions: { init: function(i) {
    let t = {}, e2 = ["EXT_texture_filter_anisotropic", "WEBGL_compressed_texture_s3tc", "OES_texture_float_linear", "WEBGL_multisampled_render_to_texture"];
    for (let s = 0; s < e2.length; s++) {
      let r = e2[s];
      t[r] = P.extensions.get(i, r);
    }
    return t;
  }, get: function(i, t) {
    return i.getExtension(t) || i.getExtension("MOZ_".concat(t)) || i.getExtension("WEBKIT_".concat(t));
  } }, TextureRegistry: new Et() };
  P.ctx = P.canvas.getContext("2d");
  var pe = class extends p {
    constructor(t) {
      super();
      let e2, s, r, n;
      if (this.domElement = t.domElement || document.createElement("canvas"), typeof t.offscreenElement < "u" && (P.canvas = t.offscreenElement, P.ctx = P.canvas.getContext("2d")), this.scene = new q(), this.scene.parent = this, this._renderer = { type: "renderer", matrix: new yt(Ws), scale: 1, opacity: 1 }, this._flagMatrix = true, t = E.defaults(t || {}, { antialias: false, alpha: true, premultipliedAlpha: true, stencil: true, preserveDrawingBuffer: true, overdraw: false }), this.overdraw = t.overdraw, e2 = this.ctx = this.domElement.getContext("webgl", t) || this.domElement.getContext("experimental-webgl", t), !this.ctx)
        throw new et("unable to create a webgl context. Try using another renderer.");
      r = mt.create(e2, mt.path.vertex, mt.types.vertex), n = mt.create(e2, mt.path.fragment, mt.types.fragment), this.programs = { current: null, buffers: { position: e2.createBuffer() }, resolution: { width: 0, height: 0, ratio: 1, flagged: false } }, s = this.programs.path = P.program.create(e2, [r, n]), this.programs.text = this.programs.path, e2.extensions = P.extensions.init(e2), e2.renderer = this, s.position = e2.getAttribLocation(s, "a_position"), s.matrix = e2.getUniformLocation(s, "u_matrix"), s.rect = e2.getUniformLocation(s, "u_rect");
      let a = e2.createBuffer();
      e2.bindBuffer(e2.ARRAY_BUFFER, a), e2.vertexAttribPointer(s.position, 2, e2.FLOAT, false, 0, 0), e2.enableVertexAttribArray(s.position), e2.bufferData(e2.ARRAY_BUFFER, oi, e2.STATIC_DRAW), r = mt.create(e2, mt.points.vertex, mt.types.vertex), n = mt.create(e2, mt.points.fragment, mt.types.fragment), s = this.programs.points = P.program.create(e2, [r, n]), s.position = e2.getAttribLocation(s, "a_position"), s.matrix = e2.getUniformLocation(s, "u_matrix"), s.size = e2.getUniformLocation(s, "u_size"), e2.enable(e2.BLEND), e2.pixelStorei(e2.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true), e2.blendEquation(e2.FUNC_ADD), e2.blendFunc(e2.ONE, e2.ONE_MINUS_SRC_ALPHA);
    }
    setSize(t, e2, s) {
      let r, n, a = this.ctx;
      return this.width = t, this.height = e2, this.ratio = typeof s > "u" ? Ut(a) : s, this.domElement.width = t * this.ratio, this.domElement.height = e2 * this.ratio, E.isObject(this.domElement.style) && E.extend(this.domElement.style, { width: t + "px", height: e2 + "px" }), this._renderer.matrix[0] = this._renderer.matrix[4] = this._renderer.scale = this.ratio, this._flagMatrix = true, r = t * this.ratio, n = e2 * this.ratio, a.viewport(0, 0, r, n), this.programs.resolution.width = r, this.programs.resolution.height = n, this.programs.resolution.ratio = this.ratio, this.programs.resolution.flagged = true, this.trigger(p.Types.resize, t, e2, s);
    }
    render() {
      let t = this.ctx;
      return this.overdraw || t.clear(t.COLOR_BUFFER_BIT), P.group.render.call(this.scene, t, this.programs), this._flagMatrix = false, this.programs.resolution.flagged = true, this;
    }
  };
  x(pe, "Utils", P);
  var Hs = E.extend({ Error: et, getRatio: Ut, read: K, xhr: ai }, E, ft, ze, Be), Zt = class {
    constructor(t) {
      __publicField(this, "_events", new p());
      __publicField(this, "type", "");
      __publicField(this, "renderer", null);
      __publicField(this, "scene", null);
      __publicField(this, "width", 0);
      __publicField(this, "height", 0);
      __publicField(this, "frameCount", 0);
      __publicField(this, "timeDelta", 0);
      __publicField(this, "playing", false);
      let e2 = E.defaults(t || {}, { fullscreen: false, fitted: false, width: 640, height: 480, type: Zt.Types.svg, autostart: false });
      if (E.each(e2, function(s, r) {
        /fullscreen/i.test(r) || /autostart/i.test(r) || (this[r] = s);
      }, this), E.isElement(e2.domElement)) {
        let s = e2.domElement.tagName.toLowerCase();
        /^(CanvasRenderer-canvas|WebGLRenderer-canvas|SVGRenderer-svg)$/.test(this.type + "-" + s) || (this.type = Zt.Types[s]);
      }
      this.renderer = new Zt[this.type](this), this.setPlaying(e2.autostart), this.frameCount = 0, e2.fullscreen ? (this.fit = Ys.bind(this), this.fit.domElement = window, this.fit.attached = true, E.extend(document.body.style, { overflow: "hidden", margin: 0, padding: 0, top: 0, left: 0, right: 0, bottom: 0, position: "fixed" }), E.extend(this.renderer.domElement.style, { display: "block", top: 0, left: 0, right: 0, bottom: 0, position: "fixed" }), dt.bind(this.fit.domElement, "resize", this.fit), this.fit()) : e2.fitted ? (this.fit = Gs.bind(this), E.extend(this.renderer.domElement.style, { display: "block" })) : E.isElement(e2.domElement) || (this.renderer.setSize(e2.width, e2.height, this.ratio), this.width = e2.width, this.height = e2.height), this.renderer.bind(p.Types.resize, qs.bind(this)), this.scene = this.renderer.scene, Zt.Instances.push(this), e2.autostart && me.init();
    }
    get _bound() {
      return this._events._bound;
    }
    set _bound(t) {
      this._events._bound = t;
    }
    addEventListener() {
      return this._events.addEventListener.apply(this, arguments);
    }
    on() {
      return this._events.addEventListener.apply(this, arguments);
    }
    bind() {
      return this._events.addEventListener.apply(this, arguments);
    }
    removeEventListener() {
      return this._events.removeEventListener.apply(this, arguments);
    }
    off() {
      return this._events.removeEventListener.apply(this, arguments);
    }
    unbind() {
      return this._events.removeEventListener.apply(this, arguments);
    }
    dispatchEvent() {
      return this._events.dispatchEvent.apply(this, arguments);
    }
    trigger() {
      return this._events.dispatchEvent.apply(this, arguments);
    }
    listen() {
      return this._events.listen.apply(this, arguments);
    }
    ignore() {
      return this._events.ignore.apply(this, arguments);
    }
    appendTo(t) {
      return t.appendChild(this.renderer.domElement), this.fit && (this.fit.domElement !== window && (this.fit.domElement = t, this.fit.attached = false), this.update()), this;
    }
    play() {
      return this.playing = true, me.init(), this.trigger(p.Types.play);
    }
    pause() {
      return this.playing = false, this.trigger(p.Types.pause);
    }
    setPlaying(t) {
      this.playing = t;
    }
    release(t) {
      let e2, s, r;
      if (!E.isObject(t))
        return this.release(this.scene);
      if (typeof t.unbind == "function" && t.unbind(), t.vertices)
        for (typeof t.vertices.unbind == "function" && t.vertices.unbind(), e2 = 0; e2 < t.vertices.length; e2++)
          s = t.vertices[e2], typeof s.unbind == "function" && s.unbind(), s.controls && (s.controls.left && typeof s.controls.left.unbind == "function" && s.controls.left.unbind(), s.controls.right && typeof s.controls.right.unbind == "function" && s.controls.right.unbind());
      if (t.children) {
        for (e2 = 0; e2 < t.children.length; e2++)
          r = t.children[e2], this.release(r);
        typeof t.children.unbind == "function" && t.children.unbind();
      }
      return t;
    }
    update() {
      let t = !!this._lastFrame, e2 = E.performance.now();
      t && (this.timeDelta = parseFloat((e2 - this._lastFrame).toFixed(3))), this._lastFrame = e2, this.fit && this.fit.domElement && !this.fit.attached && (dt.bind(this.fit.domElement, "resize", this.fit), this.fit.attached = true, this.fit());
      let s = this.width, r = this.height, n = this.renderer;
      return (s !== n.width || r !== n.height) && n.setSize(s, r, this.ratio), this.trigger(p.Types.update, this.frameCount, this.timeDelta), this.render();
    }
    render() {
      return this.renderer.render(), this.trigger(p.Types.render, this.frameCount++);
    }
    add(t) {
      return t instanceof Array || (t = Array.prototype.slice.call(arguments)), this.scene.add(t), this;
    }
    remove(t) {
      return t instanceof Array || (t = Array.prototype.slice.call(arguments)), this.scene.remove(t), this;
    }
    clear() {
      return this.scene.remove(this.scene.children), this;
    }
    makeLine(t, e2, s, r) {
      let n = new jt(t, e2, s, r);
      return this.scene.add(n), n;
    }
    makeArrow(t, e2, s, r, n) {
      let a = typeof n == "number" ? n : 10, o = Math.atan2(r - e2, s - t), h = [new T(t, e2, void 0, void 0, void 0, void 0, v.move), new T(s, r, void 0, void 0, void 0, void 0, v.line), new T(s - a * Math.cos(o - Math.PI / 4), r - a * Math.sin(o - Math.PI / 4), void 0, void 0, void 0, void 0, v.line), new T(s, r, void 0, void 0, void 0, void 0, v.move), new T(s - a * Math.cos(o + Math.PI / 4), r - a * Math.sin(o + Math.PI / 4), void 0, void 0, void 0, void 0, v.line)], l = new O(h, false, false, true);
      return l.noFill(), l.cap = "round", l.join = "round", this.scene.add(l), l;
    }
    makeRectangle(t, e2, s, r) {
      let n = new pt(t, e2, s, r);
      return this.scene.add(n), n;
    }
    makeRoundedRectangle(t, e2, s, r, n) {
      let a = new It(t, e2, s, r, n);
      return this.scene.add(a), a;
    }
    makeCircle(t, e2, s, r) {
      let n = new Ot(t, e2, s, r);
      return this.scene.add(n), n;
    }
    makeEllipse(t, e2, s, r, n) {
      let a = new Pt(t, e2, s, r, n);
      return this.scene.add(a), a;
    }
    makeStar(t, e2, s, r, n) {
      let a = new Jt(t, e2, s, r, n);
      return this.scene.add(a), a;
    }
    makeCurve(t) {
      let e2 = arguments.length;
      if (!Array.isArray(t)) {
        t = [];
        for (let a = 0; a < e2; a += 2) {
          let o = arguments[a];
          if (typeof o != "number")
            break;
          let h = arguments[a + 1];
          t.push(new T(o, h));
        }
      }
      let s = arguments[e2 - 1], r = new O(t, !(typeof s == "boolean" && s), true), n = r.getBoundingClientRect();
      return r.center().translation.set(n.left + n.width / 2, n.top + n.height / 2), this.scene.add(r), r;
    }
    makePolygon(t, e2, s, r) {
      let n = new $t(t, e2, s, r);
      return this.scene.add(n), n;
    }
    makeArcSegment(t, e2, s, r, n, a, o) {
      let h = new Gt(t, e2, s, r, n, a, o);
      return this.scene.add(h), h;
    }
    makePoints(t) {
      let e2 = arguments.length, s = t;
      if (!Array.isArray(t)) {
        s = [];
        for (let n = 0; n < e2; n += 2) {
          let a = arguments[n];
          if (typeof a != "number")
            break;
          let o = arguments[n + 1];
          s.push(new w(a, o));
        }
      }
      let r = new Kt(s);
      return this.scene.add(r), r;
    }
    makePath(t) {
      let e2 = arguments.length, s = t;
      if (!Array.isArray(t)) {
        s = [];
        for (let o = 0; o < e2; o += 2) {
          let h = arguments[o];
          if (typeof h != "number")
            break;
          let l = arguments[o + 1];
          s.push(new T(h, l));
        }
      }
      let r = arguments[e2 - 1], n = new O(s, !(typeof r == "boolean" && r)), a = n.getBoundingClientRect();
      return typeof a.top == "number" && typeof a.left == "number" && typeof a.right == "number" && typeof a.bottom == "number" && n.center().translation.set(a.left + a.width / 2, a.top + a.height / 2), this.scene.add(n), n;
    }
    makeText(t, e2, s, r) {
      let n = new ut(t, e2, s, r);
      return this.add(n), n;
    }
    makeLinearGradient(t, e2, s, r) {
      let n = Array.prototype.slice.call(arguments, 4), a = new U(t, e2, s, r, n);
      return this.add(a), a;
    }
    makeRadialGradient(t, e2, s) {
      let r = Array.prototype.slice.call(arguments, 3), n = new D(t, e2, s, r);
      return this.add(n), n;
    }
    makeSprite(t, e2, s, r, n, a, o) {
      let h = new Lt(t, e2, s, r, n, a);
      return o && h.play(), this.add(h), h;
    }
    makeImageSequence(t, e2, s, r, n) {
      let a = new Vt(t, e2, s, r);
      return n && a.play(), this.add(a), a;
    }
    makeTexture(t, e2) {
      return new N(t, e2);
    }
    makeGroup(t) {
      t instanceof Array || (t = Array.prototype.slice.call(arguments));
      let e2 = new q();
      return this.scene.add(e2), e2.add(t), e2;
    }
    interpret(t, e2, s) {
      let r = t.tagName.toLowerCase();
      if (s = typeof s < "u" ? s : true, !(r in K))
        return null;
      let n = K[r].call(this, t);
      return s ? this.add(e2 && n instanceof q ? n.children : n) : n.parent && n.remove(), n;
    }
    load(t, e2) {
      let s = new q(), r, n, a, o = (function(h) {
        for (dt.temp.innerHTML = h, n = 0; n < dt.temp.children.length; n++)
          r = dt.temp.children[n], a = this.interpret(r, false, false), a !== null && s.add(a);
        if (typeof e2 == "function") {
          let l = dt.temp.children.length <= 1 ? dt.temp.children[0] : dt.temp.children;
          e2(s, l);
        }
      }).bind(this);
      return /\.svg$/i.test(t) ? (ai(t, o), s) : (o(t), s);
    }
  }, I = Zt;
  x(I, "nextFrameID", G.nextFrameID), x(I, "Types", G.Types), x(I, "Version", G.Version), x(I, "PublishDate", G.PublishDate), x(I, "Identifier", G.Identifier), x(I, "Resolution", G.Resolution), x(I, "AutoCalculateImportedMatrices", G.AutoCalculateImportedMatrices), x(I, "Instances", G.Instances), x(I, "uniqueId", G.uniqueId), x(I, "Anchor", T), x(I, "Collection", lt), x(I, "Events", p), x(I, "Group", q), x(I, "Matrix", xt), x(I, "Path", O), x(I, "Registry", Et), x(I, "Shape", ot), x(I, "Text", ut), x(I, "Vector", w), x(I, "Gradient", H), x(I, "ImageSequence", Vt), x(I, "LinearGradient", U), x(I, "RadialGradient", D), x(I, "Sprite", Lt), x(I, "Stop", ct), x(I, "Texture", N), x(I, "ArcSegment", Gt), x(I, "Circle", Ot), x(I, "Ellipse", Pt), x(I, "Line", jt), x(I, "Points", Kt), x(I, "Polygon", $t), x(I, "Rectangle", pt), x(I, "RoundedRectangle", It), x(I, "Star", Jt), x(I, "CanvasRenderer", vt), x(I, "SVGRenderer", ge), x(I, "WebGLRenderer", pe), x(I, "Commands", v), x(I, "Utils", Hs);
  function Ys() {
    let i = document.body.getBoundingClientRect(), t = this.width = i.width, e2 = this.height = i.height;
    this.renderer.setSize(t, e2, this.ratio);
  }
  function Gs() {
    let i = this.renderer.domElement.parentElement;
    if (!i) {
      console.warn("Two.js: Attempting to fit to parent, but no parent found.");
      return;
    }
    let t = i.getBoundingClientRect(), e2 = this.width = t.width, s = this.height = t.height;
    this.renderer.setSize(e2, s, this.ratio);
  }
  function qs(i, t) {
    this.width = i, this.height = t, this.trigger(p.Types.resize, i, t);
  }
  var me = dt.getRequestAnimationFrame();
  function Yi() {
    for (let i = 0; i < I.Instances.length; i++) {
      let t = I.Instances[i];
      t.playing && t.update();
    }
    I.nextFrameID = me(Yi);
  }
  me.init = function() {
    Yi(), me.init = function() {
    };
  };
  return Zi(Ks);
})().default;
var two_min_default = Two;

// src/renderers/Camera.js
var Camera = class {
  constructor(group, domElement, renderer) {
    this.renderer = renderer;
    this.limits = {
      minScale: -Infinity,
      maxScale: Infinity,
      minX: -Infinity,
      maxX: Infinity,
      minY: -Infinity,
      maxY: Infinity
    };
    this.viewport = domElement;
    this.viewportMatrix = new two_min_default.Matrix();
    this.surfaceMatrix = new two_min_default.Matrix();
    this.zoom = 0;
    this.scale = 1;
    this.surface = group;
  }
  setScaleLimits(min, max) {
    this.limits.minScale = min;
    this.limits.maxScale = max;
  }
  setWorldLimits(bounds, max = false, scaleFactor = 4) {
    return;
    this.limits.minX = bounds.mins.x;
    this.limits.maxX = bounds.maxs.x;
    this.limits.minY = bounds.mins.y;
    this.limits.maxY = bounds.maxs.y;
    var scale = {
      x: this.renderer.width / (bounds.maxs.x - bounds.mins.x),
      y: this.renderer.height / (bounds.maxs.y - bounds.mins.y)
    };
    this.limits.minScale = Math[max ? "max" : "min"](scale.x, scale.y);
    this.limits.maxScale = this.limits.minScale * scaleFactor;
    this.scale = this.fitScaleToLimits(this.scale);
    this.zoomSet(this.scale);
    console.log(this.limits);
  }
  fitCameraToBounds(bounds, max = false) {
    var scale = {
      x: this.renderer.width / (bounds.maxs.x - bounds.mins.x),
      y: this.renderer.height / (bounds.maxs.y - bounds.mins.y)
    };
    this.zoomSet(Math[max ? "max" : "min"](scale.x, scale.y));
    this.moveCameraTo((bounds.maxs.x + bounds.mins.x) * 0.5, (bounds.maxs.y + bounds.mins.y) * 0.5);
  }
  validateCameraBounds(x, y) {
    var pos = { x, y };
    var rw2 = this.renderer.width * 0.5;
    var rh2 = this.renderer.height * 0.5;
    var scale = this.scale;
    var wx = x / scale;
    var wy = y / scale;
    var minX = (wx - this.limits.minX) * scale < rw2;
    var maxX = (this.limits.maxX - wx) * scale < rw2;
    var minY = (wy - this.limits.minY) * scale < rh2;
    var maxY = (this.limits.maxY - wy) * scale < rh2;
    if (minX && maxX)
      pos.x = (this.limits.maxX + this.limits.minX) * 0.5 * scale;
    else {
      if (minX)
        pos.x = this.limits.minX * scale + rw2;
      if (maxX)
        pos.x = this.limits.maxX * scale - rw2;
    }
    if (minY && maxY)
      pos.y = (this.limits.maxY + this.limits.minY) * 0.5 * scale;
    else {
      if (minY)
        pos.y = this.limits.minY * scale + rh2;
      if (maxY)
        pos.y = this.limits.maxY * scale - rh2;
    }
    return pos;
  }
  screenToWorld(x, y) {
    const n = this.viewportMatrix.inverse().multiply(x, y, 1);
    const r = this.surfaceMatrix.inverse().multiply(n[0], n[1], n[2]);
    return { x: r[0], y: r[1], z: r[2] };
  }
  worldToScreen(x, y) {
    const s = this.surfaceMatrix.multiply(x, y, 1);
    const r = this.viewportMatrix.multiply(s[0], s[1], s[2]);
    return { x: r[0], y: r[1], z: r[2] };
  }
  fitScaleToLimits(scale) {
    return Math.min(Math.max(scale, this.limits.minScale), this.limits.maxScale);
  }
  zoomBy(byF, clientX = 0, clientY = 0) {
    this.zoomSet(Math.exp(Math.log(this.scale) + byF), clientX, clientY);
  }
  zoomSet(zoom, clientX = 0, clientY = 0) {
    const scale = this.fitScaleToLimits(zoom);
    if (scale === this.scale)
      return this;
    this.surfaceMatrix.scale(scale / this.scale);
    this.scale = scale;
    const world_pos = this.screenToWorld(clientX, clientY);
    const c = this.worldToScreen(world_pos.x, world_pos.y);
    const dx = clientX - c.x;
    const dy = clientY - c.y;
    this.translateSurface(dx, dy);
  }
  translateSurface(x, y) {
    this.surfaceMatrix.elements[2] += x;
    this.surfaceMatrix.elements[5] += y;
    this.updateSurface();
  }
  updateSurface() {
    const e2 = this.surfaceMatrix.elements;
    this.surface.translation.set(e2[2], e2[5]);
    this.surface.scale = new two_min_default.Vector(e2[0], -e2[0]);
  }
  moveCameraTo(x, y) {
    const c = this.worldToScreen(x, -y);
    this.translateSurface(this.renderer.width * 0.5 - c.x, this.renderer.height * 0.5 - c.y);
  }
};
var Camera_default = Camera;

// src/renderers/TwoRenderer.js
function TwoRenderer(Newton, canvas) {
  this.Newton = Newton;
  this.canvas = canvas;
  two_min_default.Camera = Camera_default;
  this.Two = two_min_default;
  this.two = new two_min_default({
    //	type: Two.Types.canvas,
    //	type: Two.Types.webgl,
    type: two_min_default.Types.svg,
    //fullscreen: true,
    autostart: true
  }).appendTo(canvas);
  this.stage = new two_min_default.Group();
  this.two.add(this.stage);
  this.joints_group = new two_min_default.Group();
  this.stage.add(this.joints_group);
  var rect = this.two.makeRectangle(-4.4, 3, 12, 7);
  rect.stroke = "#aaaaaa";
  rect.fill = "none";
  rect.linewidth = 0.2;
  this.stage.add(rect);
  this.camera = new two_min_default.Camera(this.stage, this.two.renderer.domElement, this);
  this.camera.setScaleLimits(10, 1e3);
  this.resize();
  this.camera.setWorldLimits({
    mins: {
      x: -4.4 - 12 / 2,
      y: 3 - 7 / 2
    },
    maxs: {
      x: -4.4 + 12 / 2,
      y: 3 + 7 / 2
    }
  }, false, 4);
  this.camera.translateSurface(this.width / 2, this.height / 2);
  this.camera.zoomSet(35, this.width / 2, this.height / 2);
}
TwoRenderer.prototype.resize = function() {
  var dx = this.canvas.offsetWidth - (this.width || this.canvas.offsetWidth);
  var dy = this.canvas.offsetHeight - (this.height || this.canvas.offsetHeight);
  this.width = this.canvas.offsetWidth;
  this.height = this.canvas.offsetHeight;
  this.two.renderer.setSize(this.width, this.height);
  this.camera.translateSurface(dx / 2, dy / 2);
};
TwoRenderer.prototype.jointsVisible = function(visible) {
  this.joints_group.visible = visible;
};
TwoRenderer.prototype.createCircle = function(body_group, shape, body) {
  var pos = this.Newton.vec2.sub(shape.tc, body.p);
  const circle = this.two.makeCircle(pos.x, pos.y, shape.r);
  circle.fill = "#FF8000";
  circle.stroke = "orangered";
  circle.linewidth = 0.05;
  const line = this.two.makeLine(pos.x, pos.y, pos.x, pos.y + shape.r);
  line.linewidth = 0.05;
  line.stroke = "rgba(255, 0, 0, 0.5)";
  body_group.add(circle, line);
  shape.render_entity = circle;
};
TwoRenderer.prototype.createPolygon = function(body_group, shape, body) {
  const poly = this.two.makePath(...shape.tverts.reduce((a, v) => {
    var pos = this.Newton.vec2.sub(v, body.p);
    return a.concat([pos.x, pos.y]);
  }, []));
  poly.linewidth = 0.05;
  poly.stroke = "#aaaaaa";
  poly.fill = "#ececec";
  body_group.add(poly);
  shape.render_entity = poly;
};
TwoRenderer.prototype.createSegment = function(body_group, shape, body) {
  var a = this.Newton.vec2.sub(shape.ta, body.p);
  var b = this.Newton.vec2.sub(shape.tb, body.p);
  var d = shape.r * 2;
  var angle = this.Newton.vec2.perp(this.Newton.vec2.sub(b, a)).toAngle() - body.a;
  const len = this.Newton.vec2.dist(b, a) + d;
  const c = this.Newton.vec2.add(b, a).scale(0.5);
  var rect = this.two.makeRoundedRectangle(c.x, c.y, d, len, shape.r);
  rect.rotation = angle;
  rect.stroke = "#aaaaaa";
  rect.fill = "#ececec";
  rect.linewidth = 0.05;
  body_group.add(rect);
  shape.render_entity = rect;
};
TwoRenderer.prototype.addBody = function(body) {
  body.render_group = this.two.makeGroup();
  body.render_group.position.set(body.p.x, body.p.y);
  body.render_group.rotation = body.a;
  this.stage.add(body.render_group);
  for (var k = 0; k < body.shapeArr.length; k++) {
    var shape = body.shapeArr[k];
    switch (shape.type) {
      case this.Newton.Shape.TYPE_CIRCLE:
        this.createCircle(body.render_group, shape, body);
        break;
      case this.Newton.Shape.TYPE_SEGMENT:
        this.createSegment(body.render_group, shape, body);
        break;
      case this.Newton.Shape.TYPE_POLY:
        this.createPolygon(body.render_group, shape, body);
        break;
    }
  }
};
TwoRenderer.prototype.removeBody = function(body) {
  body.render_group.remove();
};
TwoRenderer.prototype.updateBody = function(body) {
  body.render_group.position.set(body.p.x, body.p.y);
  body.render_group.rotation = body.a;
};
TwoRenderer.prototype.addJoint = function(joint) {
  joint.render_group = this.two.makeGroup();
  if (joint.type === joint.TYPE_DISTANCE || joint.type === joint.TYPE_ROPE || joint.type === joint.TYPE_PRISMATIC || joint.type === joint.TYPE_MOUSE) {
    var p1 = joint.getWorldAnchor1();
    var p2 = joint.getWorldAnchor2();
    var line = this.two.makeLine(p1.x, p1.y, p2.x, p2.y);
    if (joint.type === joint.TYPE_PRISMATIC) {
      line.linewidth = 0.02;
      line.stroke = "rgba(255, 0, 0, 1)";
      line.dashes = [0.5, 0.1];
    } else if (joint.type === joint.TYPE_MOUSE) {
      line.linewidth = 0.02;
      line.stroke = "rgba(255, 0, 0, 1)";
      line.dashes = [0.05, 0.05];
    } else if (joint.type === joint.TYPE_DISTANCE) {
      line.linewidth = 0.05;
      line.stroke = "rgba(0, 155, 255, 0.7)";
      line.dashes = [0.1, 0.1];
    } else {
      line.linewidth = 0.05;
      line.stroke = "rgba(0, 255, 0, 0.5)";
    }
    const circle1 = this.two.makeCircle(p1.x, p1.y, 0.08);
    circle1.fill = "red";
    circle1.linewidth = 0;
    const circle2 = this.two.makeCircle(p2.x, p2.y, 0.08);
    circle2.fill = "red";
    circle2.linewidth = 0;
    joint.render_group.add(line, circle1, circle2);
  } else if (joint.type === joint.TYPE_REVOLUTE) {
    var p1 = joint.getWorldAnchor1();
    const circle = this.two.makeCircle(p1.x, p1.y, 0.08);
    circle.stroke = "green";
    circle.linewidth = 0.05;
    joint.render_group.add(circle);
  } else if (joint.type === joint.TYPE_WELD) {
    var p1 = joint.getWorldAnchor1();
    const circle = this.two.makeCircle(p1.x, p1.y, 0.05);
    circle.stroke = "blue";
    circle.linewidth = 0.02;
    joint.render_group.add(circle);
  } else if (joint.type === joint.TYPE_WHEEL) {
    var p1 = joint.getWorldAnchor1();
    var p2 = joint.getWorldAnchor2();
    const circle = this.two.makeCircle(p2.x, p2.y, 0.08);
    circle.fill = "red";
    circle.linewidth = 0;
    var line = this.two.makeLine(p1.x, p1.y, p2.x, p2.y);
    line.linewidth = 0.05;
    line.stroke = "rgba(0, 0, 0, 1)";
    joint.render_group.add(circle, line);
  } else {
    console.log(joint);
  }
  this.joints_group.add(joint.render_group);
  this.stage.add(this.joints_group);
};
TwoRenderer.prototype.removeJoint = function(joint) {
  joint.render_group.remove();
};
TwoRenderer.prototype.updateJoint = function(joint) {
  if (joint.type === joint.TYPE_DISTANCE || joint.type === joint.TYPE_ROPE || joint.type === joint.TYPE_PRISMATIC || joint.type === joint.TYPE_MOUSE) {
    var p1 = joint.getWorldAnchor1();
    var p2 = joint.getWorldAnchor2();
    var [a, b] = joint.render_group.children[0].vertices;
    var [circle1, circle2] = [joint.render_group.children[1], joint.render_group.children[2]];
    a.x = p1.x;
    a.y = p1.y;
    b.x = p2.x;
    b.y = p2.y;
    circle1.position.set(p1.x, p1.y);
    circle2.position.set(p2.x, p2.y);
  } else if (joint.type === joint.TYPE_REVOLUTE || joint.type === joint.TYPE_WELD) {
    var p1 = joint.getWorldAnchor1();
    joint.render_group.children[0].position.set(p1.x, p1.y);
  } else if (joint.type === joint.TYPE_WHEEL) {
    var p1 = joint.getWorldAnchor1();
    var p2 = joint.getWorldAnchor2();
    var circle = joint.render_group.children[0];
    circle.position.set(p2.x, p2.y);
    var [a, b] = joint.render_group.children[1].vertices;
    a.x = p1.x;
    a.y = p1.y;
    b.x = p2.x;
    b.y = p2.y;
  }
};
TwoRenderer.prototype.drawShape = function(shape, isStatic, lineWidth, outlineColor, fillColor) {
  return;
  switch (shape.type) {
    case this.Newton.Shape.TYPE_CIRCLE:
      drawCircle(isStatic ? this.bg.ctx : this.fg.ctx, shape.tc, shape.r, shape.body.a, lineWidth, outlineColor, fillColor, this.Newton);
      break;
    case this.Newton.Shape.TYPE_SEGMENT:
      drawSegment(isStatic ? this.bg.ctx : this.fg.ctx, shape.ta, shape.tb, shape.r, lineWidth, outlineColor, fillColor, this.Newton);
      break;
    case this.Newton.Shape.TYPE_POLY:
      if (shape.convexity)
        drawPolygon(isStatic ? this.bg.ctx : this.fg.ctx, shape.tverts, lineWidth, outlineColor, fillColor);
      else
        drawPolygon(isStatic ? this.bg.ctx : this.fg.ctx, shape.tverts, lineWidth, outlineColor, fillColor);
      break;
  }
};
TwoRenderer.prototype.copyBackground = function(x, y, w, h, x1, y1, w1, h1) {
  return;
  this.fg.ctx.drawImage(this.bg.canvas, x, y, w, h, x1, y1, w1, h1);
};
TwoRenderer.prototype.beginStatic = function(camera, backgroundColor) {
  return;
  this.bg.ctx.fillStyle = backgroundColor;
  this.bg.ctx.fillRect(0, 0, this.width, this.height);
  this.bg.ctx.save();
  this.bg.ctx.setTransform(camera.scale * this.Newton.meter2pixel(1), 0, 0, -(camera.scale * this.Newton.meter2pixel(1)), this.width * 0.5 - camera.origin.x, this.height * 0.5 + camera.origin.y);
};
TwoRenderer.prototype.endStatic = function() {
  return;
  this.bg.ctx.restore();
};
TwoRenderer.prototype.beginDynamic = function(camera) {
  return;
  this.fg.ctx.save();
  this.fg.ctx.setTransform(camera.scale * this.Newton.meter2pixel(1), 0, 0, -(camera.scale * this.Newton.meter2pixel(1)), this.width * 0.5 - camera.origin.x, this.height * 0.5 + camera.origin.y);
};
TwoRenderer.prototype.endDynamic = function() {
  return;
  this.fg.ctx.restore();
};
TwoRenderer.prototype.drawHelperJointAnchors = function(p1, p2, radius, lineWidth, jointAnchorColor) {
  return;
  var rvec = new this.Newton.vec2(radius, 0);
  var uvec = new this.Newton.vec2(0, radius);
  drawBox(this.fg.ctx, p1, rvec, uvec, 0, "", jointAnchorColor, this.Newton);
  drawBox(this.fg.ctx, p2, rvec, uvec, 0, "", jointAnchorColor, this.Newton);
  drawLine(this.fg.ctx, p1, p2, lineWidth, jointAnchorColor);
};
TwoRenderer.prototype.drawLine = function(p1, p2, lineWidth, strokeStyle) {
  return;
  drawLine(this.fg.ctx, p1, p2, lineWidth, strokeStyle);
};

// src/utils/animate.js
function animate(callback, ease, duration = 1e3, from = 0, to = 300) {
  var start = performance.now();
  var end = start + duration;
  var id;
  function frame(now) {
    var delta = now - start;
    if (delta >= duration)
      return cancelAnimationFrame(id);
    callback(from + (to - from) * ease(delta / duration));
    id = requestAnimationFrame(frame);
  }
  return id = requestAnimationFrame(frame);
}
function animateBatch(callback, ease, duration = 1e3, batch) {
  var start = performance.now();
  var end = start + duration;
  var id;
  var interpolated = new Array(batch[0].length);
  function frame(now) {
    var delta = now - start;
    if (delta >= duration)
      return cancelAnimationFrame(id);
    var easing = ease(delta / duration);
    batch.forEach((value, index) => interpolated[index] = value[0] + (value[1] - value[0]) * easing);
    callback(...interpolated);
    id = requestAnimationFrame(frame);
  }
  return id = requestAnimationFrame(frame);
}
var easings = {};
easings.linear = function(n) {
  return n;
};
easings.inQuad = function(n) {
  return n * n;
};
easings.outQuad = function(n) {
  return n * (2 - n);
};
easings.inOutQuad = function(n) {
  n *= 2;
  if (n < 1)
    return 0.5 * n * n;
  return -0.5 * (--n * (n - 2) - 1);
};
easings.inCube = function(n) {
  return n * n * n;
};
easings.outCube = function(n) {
  return --n * n * n + 1;
};
easings.inOutCube = function(n) {
  n *= 2;
  if (n < 1)
    return 0.5 * n * n * n;
  return 0.5 * ((n -= 2) * n * n + 2);
};
easings.inQuart = function(n) {
  return n * n * n * n;
};
easings.outQuart = function(n) {
  return 1 - --n * n * n * n;
};
easings.inOutQuart = function(n) {
  n *= 2;
  if (n < 1)
    return 0.5 * n * n * n * n;
  return -0.5 * ((n -= 2) * n * n * n - 2);
};
easings.inQuint = function(n) {
  return n * n * n * n * n;
};
easings.outQuint = function(n) {
  return --n * n * n * n * n + 1;
};
easings.inOutQuint = function(n) {
  n *= 2;
  if (n < 1)
    return 0.5 * n * n * n * n * n;
  return 0.5 * ((n -= 2) * n * n * n * n + 2);
};
easings.inSine = function(n) {
  return 1 - Math.cos(n * Math.PI / 2);
};
easings.outSine = function(n) {
  return Math.sin(n * Math.PI / 2);
};
easings.inOutSine = function(n) {
  return 0.5 * (1 - Math.cos(Math.PI * n));
};
easings.inExpo = function(n) {
  return 0 == n ? 0 : Math.pow(1024, n - 1);
};
easings.outExpo = function(n) {
  return 1 == n ? n : 1 - Math.pow(2, -10 * n);
};
easings.inOutExpo = function(n) {
  if (0 == n)
    return 0;
  if (1 == n)
    return 1;
  if ((n *= 2) < 1)
    return 0.5 * Math.pow(1024, n - 1);
  return 0.5 * (-Math.pow(2, -10 * (n - 1)) + 2);
};
easings.inCirc = function(n) {
  return 1 - Math.sqrt(1 - n * n);
};
easings.outCirc = function(n) {
  return Math.sqrt(1 - --n * n);
};
easings.inOutCirc = function(n) {
  n *= 2;
  if (n < 1)
    return -0.5 * (Math.sqrt(1 - n * n) - 1);
  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
};
easings.inBack = function(n) {
  var s = 1.70158;
  return n * n * ((s + 1) * n - s);
};
easings.outBack = function(n) {
  var s = 1.70158;
  return --n * n * ((s + 1) * n + s) + 1;
};
easings.inOutBack = function(n) {
  var s = 1.70158 * 1.525;
  if ((n *= 2) < 1)
    return 0.5 * (n * n * ((s + 1) * n - s));
  return 0.5 * ((n -= 2) * n * ((s + 1) * n + s) + 2);
};
easings.inBounce = function(n) {
  return 1 - easings.outBounce(1 - n);
};
easings.outBounce = function(n) {
  if (n < 1 / 2.75) {
    return 7.5625 * n * n;
  } else if (n < 2 / 2.75) {
    return 7.5625 * (n -= 1.5 / 2.75) * n + 0.75;
  } else if (n < 2.5 / 2.75) {
    return 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375;
  } else {
    return 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
  }
};
easings.inOutBounce = function(n) {
  if (n < 0.5)
    return easings.inBounce(n * 2) * 0.5;
  return easings.outBounce(n * 2 - 1) * 0.5 + 0.5;
};
easings.inElastic = function(n) {
  var s, a = 0.1, p = 0.4;
  if (n === 0)
    return 0;
  if (n === 1)
    return 1;
  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else
    s = p * Math.asin(1 / a) / (2 * Math.PI);
  return -(a * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - s) * (2 * Math.PI) / p));
};
easings.outElastic = function(n) {
  var s, a = 0.1, p = 0.4;
  if (n === 0)
    return 0;
  if (n === 1)
    return 1;
  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else
    s = p * Math.asin(1 / a) / (2 * Math.PI);
  return a * Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p) + 1;
};
easings.inOutElastic = function(n) {
  var s, a = 0.1, p = 0.4;
  if (n === 0)
    return 0;
  if (n === 1)
    return 1;
  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else
    s = p * Math.asin(1 / a) / (2 * Math.PI);
  if ((n *= 2) < 1)
    return -0.5 * (a * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - s) * (2 * Math.PI) / p));
  return a * Math.pow(2, -10 * (n -= 1)) * Math.sin((n - s) * (2 * Math.PI) / p) * 0.5 + 1;
};

// src/index.js
var src_default = {
  Interaction,
  Runner,
  World,
  Body,
  Shape,
  ShapeBox,
  ShapePoly,
  ShapeCircle,
  ShapeTriangle,
  ShapeSegment,
  RopeJoint: RopeJoint2,
  WeldJoint: WeldJoint2,
  WheelJoint: WheelJoint2,
  AngleJoint: AngleJoint2,
  MouseJoint,
  DistanceJoint: DistanceJoint2,
  RevoluteJoint: RevoluteJoint2,
  PrismaticJoint: PrismaticJoint2,
  Bounds,
  collision,
  stats,
  pixel2meter,
  meter2pixel,
  vec2: vec22,
  deg2rad,
  CanvasRenderer,
  TwoRenderer,
  animate,
  animateBatch,
  easings
};
export {
  AngleJoint2 as AngleJoint,
  Body,
  Bounds,
  CanvasRenderer,
  DistanceJoint2 as DistanceJoint,
  Interaction,
  MouseJoint,
  PrismaticJoint2 as PrismaticJoint,
  RevoluteJoint2 as RevoluteJoint,
  RopeJoint2 as RopeJoint,
  Runner,
  Shape,
  ShapeBox,
  ShapeCircle,
  ShapePoly,
  ShapeSegment,
  ShapeTriangle,
  TwoRenderer,
  WeldJoint2 as WeldJoint,
  WheelJoint2 as WheelJoint,
  World,
  animate,
  animateBatch,
  collision,
  src_default as default,
  deg2rad,
  easings,
  meter2pixel,
  pixel2meter,
  stats,
  vec22 as vec2
};
