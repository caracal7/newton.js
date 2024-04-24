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
function vec2(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}
vec2.zero = new vec2(0, 0);
vec2.prototype.toString = function() {
  return ["x:", this.x, "y:", this.y].join(" ");
};
vec2.prototype.set = function(x, y) {
  this.x = x;
  this.y = y;
  return this;
};
vec2.prototype.copy = function(v) {
  this.x = v.x;
  this.y = v.y;
  return this;
};
vec2.prototype.duplicate = function() {
  return new vec2(this.x, this.y);
};
vec2.prototype.equal = function(v) {
  return this.x != v.x || this.y != v.y ? false : true;
};
vec2.prototype.add = function(v1, v2) {
  this.x = v1.x + v2.x;
  this.y = v1.y + v2.y;
  return this;
};
vec2.prototype.addself = function(v) {
  this.x += v.x;
  this.y += v.y;
  return this;
};
vec2.prototype.sub = function(v1, v2) {
  this.x = v1.x - v2.x;
  this.y = v1.y - v2.y;
  return this;
};
vec2.prototype.subself = function(v) {
  this.x -= v.x;
  this.y -= v.y;
  return this;
};
vec2.prototype.scale = function(s) {
  this.x *= s;
  this.y *= s;
  return this;
};
vec2.prototype.scale2 = function(s) {
  this.x *= s.x;
  this.y *= s.y;
  return this;
};
vec2.prototype.mad = function(v, s) {
  this.x += v.x * s;
  this.y += v.y * s;
};
vec2.prototype.neg = function() {
  this.x *= -1;
  this.y *= -1;
  return this;
};
vec2.prototype.rcp = function() {
  this.x = 1 / this.x;
  this.y = 1 / this.y;
  return this;
};
vec2.prototype.lengthsq = function() {
  return this.x * this.x + this.y * this.y;
};
vec2.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};
vec2.prototype.normalize = function() {
  var inv = this.x != 0 || this.y != 0 ? 1 / Math.sqrt(this.x * this.x + this.y * this.y) : 0;
  this.x *= inv;
  this.y *= inv;
  return this;
};
vec2.prototype.dot = function(v) {
  return this.x * v.x + this.y * v.y;
};
vec2.prototype.cross = function(v) {
  return this.x * v.y - this.y * v.x;
};
vec2.prototype.toAngle = function() {
  return Math.atan2(this.y, this.x);
};
vec2.prototype.rotation = function(angle) {
  this.x = Math.cos(angle);
  this.y = Math.sin(angle);
  return this;
};
vec2.prototype.rotate = function(angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  return this.set(this.x * c - this.y * s, this.x * s + this.y * c);
};
vec2.prototype.lerp = function(v1, v2, t) {
  return this.add(vec2.scale(v1, 1 - t), vec2.scale(v2, t));
};
vec2.add = function(v1, v2) {
  return new vec2(v1.x + v2.x, v1.y + v2.y);
};
vec2.sub = function(v1, v2) {
  return new vec2(v1.x - v2.x, v1.y - v2.y);
};
vec2.scale = function(v, s) {
  return new vec2(v.x * s, v.y * s);
};
vec2.scale2 = function(v, s) {
  return new vec2(v.x * s.x, v.y * s.y);
};
vec2.mad = function(v1, v2, s) {
  return new vec2(v1.x + v2.x * s, v1.y + v2.y * s);
};
vec2.neg = function(v) {
  return new vec2(-v.x, -v.y);
};
vec2.rcp = function(v) {
  return new vec2(1 / v.x, 1 / v.y);
};
vec2.normalize = function(v) {
  var inv = v.x != 0 || v.y != 0 ? 1 / Math.sqrt(v.x * v.x + v.y * v.y) : 0;
  return new vec2(v.x * inv, v.y * inv);
};
vec2.dot = function(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
};
vec2.cross = function(v1, v2) {
  return v1.x * v2.y - v1.y * v2.x;
};
vec2.toAngle = function(v) {
  return Math.atan2(v.y, v.x);
};
vec2.rotation = function(angle) {
  return new vec2(Math.cos(angle), Math.sin(angle));
};
vec2.rotate = function(v, angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  return new vec2(v.x * c - v.y * s, v.x * s + v.y * c);
};
vec2.perp = function(v) {
  return new vec2(-v.y, v.x);
};
vec2.rperp = function(v) {
  return new vec2(v.y, -v.x);
};
vec2.dist = function(v1, v2) {
  var dx = v2.x - v1.x;
  var dy = v2.y - v1.y;
  return Math.sqrt(dx * dx + dy * dy);
};
vec2.distsq = function(v1, v2) {
  var dx = v2.x - v1.x;
  var dy = v2.y - v1.y;
  return dx * dx + dy * dy;
};
vec2.lerp = function(v1, v2, t) {
  return vec2.add(vec2.scale(v1, 1 - t), vec2.scale(v2, t));
};
vec2.truncate = function(v, length) {
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
  return new vec2(this.x, this.y);
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
  return new vec2(
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
  return new vec2(
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
  return new vec2(
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
  return new vec2(
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
  return new vec2(v.x * this.c - v.y * this.s, v.x * this.s + v.y * this.c);
};
Transform.prototype.unrotate = function(v) {
  return new vec2(v.x * this.c + v.y * this.s, -v.x * this.s + v.y * this.c);
};
Transform.prototype.transform = function(v) {
  return new vec2(v.x * this.c - v.y * this.s + this.t.x, v.x * this.s + v.y * this.c + this.t.y);
};
Transform.prototype.untransform = function(v) {
  var px = v.x - this.t.x;
  var py = v.y - this.t.y;
  return new vec2(px * this.c + py * this.s, -px * this.s + py * this.c);
};
var Bounds = function(mins2, maxs2) {
  this.mins = mins2 ? new vec2(mins2.x, mins2.y) : new vec2(Infinity, Infinity);
  this.maxs = maxs2 ? new vec2(maxs2.x, maxs2.y) : new vec2(-Infinity, -Infinity);
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
  return vec2.scale(vec2.add(this.mins, this.maxs), 0.5);
};
Bounds.prototype.getExtent = function() {
  return vec2.scale(vec2.sub(this.maxs, this.mins), 0.5);
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
  console.warn("Unimplemented");
  switch (this.type) {
    case Shape.TYPE_CIRCLE:
      console.warn("Shape.TYPE_CIRCLE.translateTo: TODO tests", pos);
      this.c.copy(this.body.getLocalPoint(pos));
      break;
    case Shape.TYPE_SEGMENT:
      console.warn("Shape.TYPE_SEGMENT.translateTo: TODO tests", pos);
      var delta = vec2.sub(pos, this.centroid());
      var wa = vec2.add(this.ta, delta);
      var wb = vec2.add(this.ta, delta);
      this.a.copy(this.body.getLocalPoint(wa));
      this.b.copy(this.body.getLocalPoint(wb));
      break;
    case Shape.TYPE_POLY:
      var delta = vec2.sub(pos, this.centroid());
      for (var j = 0; j < this.tverts.length; j++) {
        var wv = vec2.add(this.tverts[j], delta);
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
  console.warn("Unimplemented");
  switch (this.type) {
    case Shape.TYPE_CIRCLE:
      var wc = vec2.add(this.tc, delta);
      this.c.copy(this.body.getLocalPoint(wc));
      break;
    case Shape.TYPE_SEGMENT:
      var wa = vec2.add(this.ta, delta);
      var wb = vec2.add(this.ta, delta);
      this.a.copy(this.body.getLocalPoint(wa));
      this.b.copy(this.body.getLocalPoint(wb));
      break;
    case Shape.TYPE_POLY:
      var transformCenter = this.body.p;
      var a = this.body.a;
      for (var j = 0; j < this.tverts.length; j++) {
        var wv = vec2.add(this.tverts[j], delta);
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
    var t = vec2.sub(c2, c1);
    var distsq = t.lengthsq();
    if (distsq > rmax * rmax) {
      return 0;
    }
    var dist = Math.sqrt(distsq);
    var p = vec2.mad(c1, t, 0.5 + (r1 - r2) * 0.5 / dist);
    var n = dist != 0 ? vec2.scale(t, 1 / dist) : vec2.zero;
    var d = dist - rmax;
    contactArr.push(new Contact(p, n, d, 0));
    return 1;
  }
  function circle2Circle(circ1, circ2, contactArr) {
    return _circle2Circle(circ1.tc, circ1.r, circ2.tc, circ2.r, contactArr);
  }
  function circle2Segment(circ, seg, contactArr) {
    var rsum = circ.r + seg.r;
    var dn = vec2.dot(circ.tc, seg.tn) - vec2.dot(seg.ta, seg.tn);
    var dist = (dn < 0 ? dn * -1 : dn) - rsum;
    if (dist > 0) {
      return 0;
    }
    var dt = vec2.cross(circ.tc, seg.tn);
    var dtMin = vec2.cross(seg.ta, seg.tn);
    var dtMax = vec2.cross(seg.tb, seg.tn);
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
    var n = dn > 0 ? seg.tn : vec2.neg(seg.tn);
    contactArr.push(new Contact(vec2.mad(circ.tc, n, -(circ.r + dist * 0.5)), vec2.neg(n), dist, 0));
    return 1;
  }
  function circle2Poly(circ, poly, contactArr) {
    var minDist = -999999;
    var minIdx = -1;
    for (var i = 0; i < poly.verts.length; i++) {
      var plane = poly.tplanes[i];
      var dist = vec2.dot(circ.tc, plane.n) - plane.d - circ.r;
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
    var dta = vec2.cross(a, n);
    var dtb = vec2.cross(b, n);
    var dt = vec2.cross(circ.tc, n);
    if (dt > dta) {
      return _circle2Circle(circ.tc, circ.r, a, 0, contactArr);
    } else if (dt < dtb) {
      return _circle2Circle(circ.tc, circ.r, b, 0, contactArr);
    }
    contactArr.push(new Contact(vec2.mad(circ.tc, n, -(circ.r + minDist * 0.5)), vec2.neg(n), minDist, 0));
    return 1;
  }
  function segmentPointDistanceSq(seg, p) {
    var w = vec2.sub(p, seg.ta);
    var d = vec2.sub(seg.tb, seg.ta);
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
    var u = vec2.sub(seg1.tb, seg1.ta);
    var v = vec2.sub(seg2.tb, seg2.ta);
    switch (idxm) {
      case 0:
        s = vec2.dot(vec2.sub(seg2.ta, seg1.ta), u) / vec2.dot(u, u);
        s = s < 0 ? 0 : s > 1 ? 1 : s;
        t = 0;
        break;
      case 1:
        s = vec2.dot(vec2.sub(seg2.tb, seg1.ta), u) / vec2.dot(u, u);
        s = s < 0 ? 0 : s > 1 ? 1 : s;
        t = 1;
        break;
      case 2:
        s = 0;
        t = vec2.dot(vec2.sub(seg1.ta, seg2.ta), v) / vec2.dot(v, v);
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        break;
      case 3:
        s = 1;
        t = vec2.dot(vec2.sub(seg1.tb, seg2.ta), v) / vec2.dot(v, v);
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        break;
    }
    var minp1 = vec2.mad(seg1.ta, u, s);
    var minp2 = vec2.mad(seg2.ta, v, t);
    return _circle2Circle(minp1, seg1.r, minp2, seg2.r, contactArr);
  }
  function findPointsBehindSeg(contactArr, seg, poly, dist, coef) {
    var dta = vec2.cross(seg.tn, seg.ta);
    var dtb = vec2.cross(seg.tn, seg.tb);
    var n = vec2.scale(seg.tn, coef);
    for (var i = 0; i < poly.verts.length; i++) {
      var v = poly.tverts[i];
      if (vec2.dot(v, n) < vec2.dot(seg.tn, seg.ta) * coef + seg.r) {
        var dt = vec2.cross(seg.tn, v);
        if (dta >= dt && dt >= dtb) {
          contactArr.push(new Contact(v, n, dist, poly.id << 16 | i));
        }
      }
    }
  }
  function segment2Poly(seg, poly, contactArr) {
    var seg_td = vec2.dot(seg.tn, seg.ta);
    var seg_d1 = poly.distanceOnPlane(seg.tn, seg_td) - seg.r;
    if (seg_d1 > 0) {
      return 0;
    }
    var seg_d2 = poly.distanceOnPlane(vec2.neg(seg.tn), -seg_td) - seg.r;
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
    var poly_n = vec2.neg(poly.tplanes[poly_i].n);
    var va = vec2.mad(seg.ta, poly_n, seg.r);
    var vb = vec2.mad(seg.tb, poly_n, seg.r);
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
    return findVerts(contactArr, poly1, poly2, vec2.neg(poly2.tplanes[msa2.index].n), msa2.dist);
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
  return radius * (Math.PI * radius + 2 * vec2.dist(a, b));
}
function centroidForSegment(a, b) {
  return vec2.scale(vec2.add(a, b), 0.5);
}
function inertiaForSegment(mass, a, b) {
  var distsq = vec2.distsq(b, a);
  var offset = vec2.scale(vec2.add(a, b), 0.5);
  return mass * (distsq / 12 + offset.lengthsq());
}
function areaForPoly(verts) {
  var area = 0;
  for (var i = 0; i < verts.length; i++) {
    area += vec2.cross(verts[i], verts[(i + 1) % verts.length]);
  }
  return area / 2;
}
function centroidForPoly(verts) {
  var area = 0;
  var vsum = new vec2(0, 0);
  for (var i = 0; i < verts.length; i++) {
    var v1 = verts[i];
    var v2 = verts[(i + 1) % verts.length];
    var cross = vec2.cross(v1, v2);
    area += cross;
    vsum.addself(vec2.scale(vec2.add(v1, v2), cross));
  }
  return vec2.scale(vsum, 1 / (3 * area));
}
function inertiaForPoly(mass, verts, offset) {
  var sum1 = 0;
  var sum2 = 0;
  for (var i = 0; i < verts.length; i++) {
    var v1 = vec2.add(verts[i], offset);
    var v2 = vec2.add(verts[(i + 1) % verts.length], offset);
    var a = vec2.cross(v2, v1);
    var b = vec2.dot(v1, v1) + vec2.dot(v1, v2) + vec2.dot(v2, v2);
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
  this.c = new vec2(local_x || 0, local_y || 0);
  this.r = radius;
  this.tc = vec2.zero;
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
  return vec2.distsq(this.tc, p) < this.r * this.r;
};
ShapeCircle.prototype.findVertexByPoint = function(p, minDist) {
  var dsq = minDist * minDist;
  if (vec2.distsq(this.tc, p) < dsq) {
    return 0;
  }
  return -1;
};
ShapeCircle.prototype.distanceOnPlane = function(n, d) {
  return vec2.dot(n, this.tc) - this.r - d;
};

// src/shapes/shape_segment.js
var ShapeSegment = function(a, b, radius) {
  Shape.call(this, Shape.TYPE_SEGMENT);
  this.a = a.duplicate();
  this.b = b.duplicate();
  this.r = radius;
  this.n = vec2.perp(vec2.sub(b, a));
  this.n.normalize();
  this.ta = vec2.zero;
  this.tb = vec2.zero;
  this.tn = vec2.zero;
  this.finishVerts();
};
ShapeSegment.prototype = new Shape();
ShapeSegment.prototype.constructor = ShapeSegment;
ShapeSegment.prototype.finishVerts = function() {
  this.n = vec2.perp(vec2.sub(this.b, this.a));
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
  this.tn = vec2.perp(vec2.sub(this.tb, this.ta)).normalize();
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
  var dn = vec2.dot(this.tn, p) - vec2.dot(this.ta, this.tn);
  var dist = Math.abs(dn);
  if (dist > this.r) {
    return false;
  }
  var dt = vec2.cross(p, this.tn);
  var dta = vec2.cross(this.ta, this.tn);
  var dtb = vec2.cross(this.tb, this.tn);
  if (dt <= dta) {
    if (dt < dta - this.r) {
      return false;
    }
    return vec2.distsq(this.ta, p) < this.r * this.r;
  } else if (dt > dtb) {
    if (dt > dtb + this.r) {
      return false;
    }
    return vec2.distsq(this.tb, p) < this.r * this.r;
  }
  return true;
};
ShapeSegment.prototype.findVertexByPoint = function(p, minDist) {
  var dsq = minDist * minDist;
  if (vec2.distsq(this.ta, p) < dsq) {
    return 0;
  }
  if (vec2.distsq(this.tb, p) < dsq) {
    return 1;
  }
  return -1;
};
ShapeSegment.prototype.distanceOnPlane = function(n, d) {
  var a = vec2.dot(n, this.ta) - this.r;
  var b = vec2.dot(n, this.tb) - this.r;
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
      this.tplanes[i].n = vec2.zero;
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
    var n = vec2.normalize(vec2.perp(vec2.sub(a, b)));
    this.planes[i] = {};
    this.planes[i].n = n;
    this.planes[i].d = vec2.dot(n, a);
    this.tverts[i] = this.verts[i];
    this.tplanes[i] = {};
    this.tplanes[i].n = vec2.zero;
    this.tplanes[i].d = 0;
  }
  for (var i = 0; i < this.verts.length; i++) {
    var b = this.verts[(i + 2) % this.verts.length];
    var n = this.planes[i].n;
    var d = this.planes[i].d;
    if (vec2.dot(n, b) - d > 0) {
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
  return inertiaForPoly(mass, this.verts, vec2.zero);
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
    var n = vec2.normalize(vec2.perp(vec2.sub(a, b)));
    this.tplanes[i].n = n;
    this.tplanes[i].d = vec2.dot(n, a);
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
    if (vec2.distsq(this.tverts[i], p) < dsq) {
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
    var dtv1 = vec2.cross(v1, n);
    var dtv2 = vec2.cross(v2, n);
    var dt = vec2.cross(p, n);
    if (dt > dtv1) {
      if (vec2.distsq(v1, p) < dsq) {
        return i;
      }
    } else if (dt < dtv2) {
      if (vec2.distsq(v2, p) < dsq) {
        return i;
      }
    } else {
      var dist = vec2.dot(n, p) - vec2.dot(n, v1);
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
    min = Math.min(min, vec2.dot(n, this.tverts[i]));
  }
  return min - d;
};
ShapePoly.prototype.containPoint = function(p) {
  for (var i = 0; i < this.verts.length; i++) {
    var plane = this.tplanes[i];
    if (vec2.dot(plane.n, p) - plane.d > 0) {
      return false;
    }
  }
  return true;
};
ShapePoly.prototype.containPointPartial = function(p, n) {
  for (var i = 0; i < this.verts.length; i++) {
    var plane = this.tplanes[i];
    if (vec2.dot(plane.n, n) < 1e-4) {
      continue;
    }
    if (vec2.dot(plane.n, p) - plane.d > 0) {
      return false;
    }
  }
  return true;
};
var ShapeTriangle = function(p1, p2, p3) {
  var verts = [
    new vec2(p1.x, p1.y),
    new vec2(p2.x, p2.y),
    new vec2(p3.x, p3.y)
  ];
  return new ShapePoly(verts);
};
var ShapeBox = function(local_x, local_y, w, h) {
  local_x = local_x || 0;
  local_y = local_y || 0;
  var hw = w * 0.5;
  var hh = h * 0.5;
  var verts = [
    new vec2(-hw + local_x, +hh + local_y),
    new vec2(-hw + local_x, -hh + local_y),
    new vec2(+hw + local_x, -hh + local_y),
    new vec2(+hw + local_x, +hh + local_y)
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
  pos = pos || new vec2(0, 0);
  angle = angle || 0;
  this.xf = new Transform(pos, angle);
  this.centroid = new vec2(0, 0);
  this.p = new vec2(pos.x, pos.y);
  this.v = new vec2(0, 0);
  this.f = new vec2(0, 0);
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
  this.xf.setPosition(vec2.sub(this.p, this.xf.rotate(this.centroid)));
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
  var totalMassCentroid = new vec2(0, 0);
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
  this.centroid.copy(vec2.scale(totalMassCentroid, 1 / totalMass));
  this.setMass(totalMass);
  if (!this.fixedRotation) {
    this.setInertia(totalInertia - totalMass * vec2.dot(this.centroid, this.centroid));
  }
  var old_p = this.p;
  this.p = this.xf.transform(this.centroid);
  this.v.mad(vec2.perp(vec2.sub(this.p, old_p)), this.w);
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
  this.v = vec2.mad(this.v, vec2.mad(gravity, this.f, this.m_inv), dt);
  this.w = this.w + this.t * this.i_inv * dt;
  this.v.scale(Clamp(1 - dt * (damping + this.linearDamping), 0, 1));
  this.w *= Clamp(1 - dt * (damping + this.angularDamping), 0, 1);
  this.f.set(0, 0);
  this.t = 0;
};
Body.prototype.updatePosition = function(dt) {
  this.p.addself(vec2.scale(this.v, dt));
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
  this.t += vec2.cross(vec2.sub(p, this.p), force);
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
  this.w += vec2.cross(vec2.sub(p, this.p), impulse) * this.i_inv;
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
    con.r1 = vec2.sub(con.p, body1.p);
    con.r2 = vec2.sub(con.p, body2.p);
    con.r1_local = body1.xf.unrotate(con.r1);
    con.r2_local = body2.xf.unrotate(con.r2);
    var n = con.n;
    var t = vec2.perp(con.n);
    var sn1 = vec2.cross(con.r1, n);
    var sn2 = vec2.cross(con.r2, n);
    var emn_inv = sum_m_inv + body1.i_inv * sn1 * sn1 + body2.i_inv * sn2 * sn2;
    con.emn = emn_inv == 0 ? 0 : 1 / emn_inv;
    var st1 = vec2.cross(con.r1, t);
    var st2 = vec2.cross(con.r2, t);
    var emt_inv = sum_m_inv + body1.i_inv * st1 * st1 + body2.i_inv * st2 * st2;
    con.emt = emt_inv == 0 ? 0 : 1 / emt_inv;
    var v1 = vec2.mad(body1.v, vec2.perp(con.r1), body1.w);
    var v2 = vec2.mad(body2.v, vec2.perp(con.r2), body2.w);
    var rv = vec2.sub(v2, v1);
    con.bounce = vec2.dot(rv, con.n) * this.e;
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
    var impulse = new vec2(lambda_n * n.x - lambda_t * n.y, lambda_t * n.x + lambda_n * n.y);
    body1.v.mad(impulse, -body1.m_inv);
    body1.w -= vec2.cross(con.r1, impulse) * body1.i_inv;
    body2.v.mad(impulse, body2.m_inv);
    body2.w += vec2.cross(con.r2, impulse) * body2.i_inv;
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
    var t = vec2.perp(n);
    var r1 = con.r1;
    var r2 = con.r2;
    var v1 = vec2.mad(body1.v, vec2.perp(r1), body1.w);
    var v2 = vec2.mad(body2.v, vec2.perp(r2), body2.w);
    var rv = vec2.sub(v2, v1);
    var lambda_n = -con.emn * (vec2.dot(n, rv) + con.bounce);
    var lambda_n_old = con.lambda_n_acc;
    con.lambda_n_acc = Math.max(lambda_n_old + lambda_n, 0);
    lambda_n = con.lambda_n_acc - lambda_n_old;
    var lambda_t = -con.emt * vec2.dot(t, rv);
    var lambda_t_max = con.lambda_n_acc * this.u;
    var lambda_t_old = con.lambda_t_acc;
    con.lambda_t_acc = Clamp(lambda_t_old + lambda_t, -lambda_t_max, lambda_t_max);
    lambda_t = con.lambda_t_acc - lambda_t_old;
    var impulse = new vec2(lambda_n * n.x - lambda_t * n.y, lambda_t * n.x + lambda_n * n.y);
    body1.v.mad(impulse, -m1_inv);
    body1.w -= vec2.cross(r1, impulse) * i1_inv;
    body2.v.mad(impulse, m2_inv);
    body2.w += vec2.cross(r2, impulse) * i2_inv;
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
    var r1 = vec2.rotate(con.r1_local, body1.a);
    var r2 = vec2.rotate(con.r2_local, body2.a);
    var p1 = vec2.add(body1.p, r1);
    var p2 = vec2.add(body2.p, r2);
    var dp = vec2.sub(p2, p1);
    var c = vec2.dot(dp, n) + con.d;
    var correction = Clamp(ContactSolver.BAUMGARTE * (c + ContactSolver.COLLISION_SLOP), -ContactSolver.MAX_LINEAR_CORRECTION, 0);
    if (correction == 0)
      continue;
    max_penetration = Math.max(max_penetration, -c);
    var sn1 = vec2.cross(r1, n);
    var sn2 = vec2.cross(r2, n);
    var em_inv = sum_m_inv + body1.i_inv * sn1 * sn1 + body2.i_inv * sn2 * sn2;
    var lambda_dt = em_inv == 0 ? 0 : -correction / em_inv;
    var impulse_dt = vec2.scale(n, lambda_dt);
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
  this.gravity = new vec2(0, 0);
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
    if (vec2.distsq(p, joint.getWorldAnchor1()) < dsq) {
      jointId = joint.id << 16 | 0;
    } else if (vec2.distsq(p, joint.getWorldAnchor2()) < dsq) {
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
  this.lambda_acc = new vec2(0, 0);
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
  this.r2 = body2.xf.rotate(vec2.sub(this.anchor2, body2.centroid));
  var r2 = this.r2;
  var r2y_i = r2.y * body2.i_inv;
  var k11 = body2.m_inv + r2.y * r2y_i + this.gamma;
  var k12 = -r2.x * r2y_i;
  var k22 = body2.m_inv + r2.x * r2.x * body2.i_inv + this.gamma;
  this.em_inv = new mat2(k11, k12, k12, k22);
  var c = vec2.sub(vec2.add(body2.p, this.r2), body1.p);
  this.beta_c = vec2.scale(c, beta);
  body2.w *= 0.98;
  if (warmStarting) {
    body2.v.mad(this.lambda_acc, body2.m_inv);
    body2.w += vec2.cross(this.r2, this.lambda_acc) * body2.i_inv;
  } else {
    this.lambda_acc.set(0, 0);
  }
};
MouseJoint.prototype.solveVelocityConstraints = function() {
  var body2 = this.body2;
  var cdot = vec2.mad(body2.v, vec2.perp(this.r2), body2.w);
  var soft = vec2.mad(this.beta_c, this.lambda_acc, this.gamma);
  var lambda = this.em_inv.solve(vec2.add(cdot, soft).neg());
  var lambda_old = this.lambda_acc.duplicate();
  this.lambda_acc.addself(lambda);
  var lsq = this.lambda_acc.lengthsq();
  if (lsq > this.maxImpulse * this.maxImpulse) {
    this.lambda_acc.scale(this.maxImpulse / Math.sqrt(lsq));
  }
  lambda = vec2.sub(this.lambda_acc, lambda_old);
  body2.v.mad(lambda, body2.m_inv);
  body2.w += vec2.cross(this.r2, lambda) * body2.i_inv;
};
MouseJoint.prototype.solvePositionConstraints = function() {
  return true;
};
MouseJoint.prototype.getReactionForce = function(dt_inv) {
  return vec2.scale(this.lambda_acc, dt_inv);
};
MouseJoint.prototype.getReactionTorque = function(dt_inv) {
  return 0;
};

// src/Runner.js
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
  this.settings = Object.assign({
    gravity: new vec2(0, -10),
    frameRateHz: 60,
    velocityIterations: 8,
    positionIterations: 4,
    warmStarting: true,
    allowSleep: true,
    //	enableDirtyBounds: true,
    backgroundColor: "rgb(95, 105, 118)",
    jointAnchorColor: "#11cf00"
  }, app.settings || {});
  const camera = this.camera = Object.assign({
    /*        origin: new vec2(0, 0),
            scale: 1,
            minScale: 0.1,
            maxScale: 10,
            minX: -Infinity,
            maxX: Infinity,
            minY: -Infinity,
            maxY: Infinity,
            fit: true,
            bounds: new Bounds,
            scroll: new vec2(0, 0),
            worldOrigin: {}*/
  }, app.camera || {});
  const settings = {
    showJoints: true
  };
  Object.defineProperty(this.settings, "showJoints", {
    get() {
      return settings.showJoints;
    },
    set(value) {
      renderer.joints_group.visible = settings.showJoints = value;
    }
  });
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
  this[App].init(this.world, this);
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
  const { Two, two, stage, camera } = renderer;
  var domElement = two.renderer.domElement;
  var mouse = new Two.Vector();
  var touches = {};
  var distance2 = 0;
  var dragging = false;
  const startDrag = (x, y) => {
    var _a, _b;
    interaction.removeJoint();
    const world_pos = camera.screenToWorld(x, y);
    const world_pos_vec = new vec2(world_pos.x, -world_pos.y);
    dragging = runner.world.findBodyByPoint(world_pos_vec);
    var block = false;
    if ((_b = (_a = this[Events2]) == null ? void 0 : _a.mousedown) == null ? void 0 : _b.length) {
      this[Events2].mousedown.forEach((callback) => {
        if (callback(dragging, new vec2(x, y), world_pos_vec))
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
  const createMouseJoint = (world_pos_vec) => {
    interaction.mouseBody.p.copy(world_pos_vec);
    interaction.mouseBody.syncTransform();
    interaction.mouseJoint = new MouseJoint(interaction.mouseBody, dragging, world_pos_vec);
    interaction.mouseJoint.maxForce = dragging.m * 5e4;
    runner.world.addJoint(interaction.mouseJoint);
  };
  const mousedown = (event) => {
    this.state.mouseDown = true;
    this.state.pointerDownMoving = false;
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    startDrag(event.offsetX, event.offsetY);
  };
  const mousemove = (event) => {
    var _a, _b;
    if (this.state.mouseDown) {
      this.state.pointerDownMoving = true;
      if (dragging) {
        const world_pos = camera.screenToWorld(event.offsetX, event.offsetY);
        const world_pos_vec = new vec2(world_pos.x, -world_pos.y);
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
      const world_pos_vec = new vec2(world_pos.x, -world_pos.y);
      this[Events2].mousemove.forEach((callback) => callback(new vec2(event.offsetX, event.offsetY), world_pos_vec));
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
      const world_pos_vec = new vec2(world_pos.x, -world_pos.y);
      this[Events2].mouseup.forEach((callback) => callback(
        event.type == "mouseleave" ? void 0 : runner.world.findBodyByPoint(world_pos_vec),
        new vec2(x, y),
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
    event.preventDefault();
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
    startDrag(mouse.x - rect.left, mouse.y - rect.top);
  };
  const panmove = (event) => {
    var touch = event.touches[0];
    if (dragging) {
      const rect = runner.renderer.canvas.getBoundingClientRect();
      const world_pos = camera.screenToWorld(touch.clientX - rect.left, touch.clientY - rect.top);
      const p = new vec2(world_pos.x, -world_pos.y);
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
  this.maxDistance = vec2.dist(anchor1, anchor2);
  this.lambda_acc = 0;
};
RopeJoint2.prototype = new Joint();
RopeJoint2.prototype.constructor = RopeJoint2;
RopeJoint2.prototype.setWorldAnchor1 = function(anchor1) {
  this.anchor1 = this.body1.getLocalPoint(anchor1);
  this.maxDistance = vec2.dist(anchor1, this.getWorldAnchor2());
};
RopeJoint2.prototype.setWorldAnchor2 = function(anchor2) {
  this.anchor2 = this.body2.getLocalPoint(anchor2);
  this.maxDistance = vec2.dist(anchor2, this.getWorldAnchor1());
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
  this.r1 = body1.xf.rotate(vec2.sub(this.anchor1, body1.centroid));
  this.r2 = body2.xf.rotate(vec2.sub(this.anchor2, body2.centroid));
  var d = vec2.sub(vec2.add(body2.p, this.r2), vec2.add(body1.p, this.r1));
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
    this.u = vec2.scale(d, 1 / this.distance);
  } else {
    this.u = vec2.zero;
  }
  this.s1 = vec2.cross(this.r1, this.u);
  this.s2 = vec2.cross(this.r2, this.u);
  var em_inv = body1.m_inv + body2.m_inv + body1.i_inv * this.s1 * this.s1 + body2.i_inv * this.s2 * this.s2;
  this.em = em_inv == 0 ? 0 : 1 / em_inv;
  if (warmStarting) {
    var impulse = vec2.scale(this.u, this.lambda_acc);
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
  var cdot = this.u.dot(vec2.sub(body2.v, body1.v)) + this.s2 * body2.w - this.s1 * body1.w;
  var lambda = -this.em * (cdot + this.cdt);
  var lambda_old = this.lambda_acc;
  this.lambda_acc = Math.min(lambda_old + lambda, 0);
  lambda = this.lambda_acc - lambda_old;
  var impulse = vec2.scale(this.u, lambda);
  body1.v.mad(impulse, -body1.m_inv);
  body1.w -= this.s1 * lambda * body1.i_inv;
  body2.v.mad(impulse, body2.m_inv);
  body2.w += this.s2 * lambda * body2.i_inv;
};
RopeJoint2.prototype.solvePositionConstraints = function() {
  var body1 = this.body1;
  var body2 = this.body2;
  var r1 = vec2.rotate(vec2.sub(this.anchor1, body1.centroid), body1.a);
  var r2 = vec2.rotate(vec2.sub(this.anchor2, body2.centroid), body2.a);
  var d = vec2.sub(vec2.add(body2.p, r2), vec2.add(body1.p, r1));
  var dist = d.length();
  var u = vec2.scale(d, 1 / dist);
  var c = dist - this.maxDistance;
  var correction = Clamp(c, 0, Joint.MAX_LINEAR_CORRECTION);
  var s1 = vec2.cross(r1, u);
  var s2 = vec2.cross(r2, u);
  var em_inv = body1.m_inv + body2.m_inv + body1.i_inv * s1 * s1 + body2.i_inv * s2 * s2;
  var lambda_dt = em_inv == 0 ? 0 : -correction / em_inv;
  var impulse_dt = vec2.scale(u, lambda_dt);
  body1.p.mad(impulse_dt, -body1.m_inv);
  body1.a -= s1 * lambda_dt * body1.i_inv;
  body2.p.mad(impulse_dt, body2.m_inv);
  body2.a += s2 * lambda_dt * body2.i_inv;
  return c < Joint.LINEAR_SLOP;
};
RopeJoint2.prototype.getReactionForce = function(dt_inv) {
  return vec2.scale(this.u, this.lambda_acc * dt_inv);
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
  this.r1 = body1.xf.rotate(vec2.sub(this.anchor1, body1.centroid));
  this.r2 = body2.xf.rotate(vec2.sub(this.anchor2, body2.centroid));
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
    var lambda_xy = new vec2(this.lambda_acc.x, this.lambda_acc.y);
    var lambda_z = this.lambda_acc.z;
    body1.v.mad(lambda_xy, -body1.m_inv);
    body1.w -= (vec2.cross(this.r1, lambda_xy) + lambda_z) * body1.i_inv;
    body2.v.mad(lambda_xy, body2.m_inv);
    body2.w += (vec2.cross(this.r2, lambda_xy) + lambda_z) * body2.i_inv;
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
    var v1 = vec2.mad(body1.v, vec2.perp(this.r1), body1.w);
    var v2 = vec2.mad(body2.v, vec2.perp(this.r2), body2.w);
    var cdot1 = vec2.sub(v2, v1);
    var lambda_xy = this.em_inv.solve2x2(cdot1.neg());
    this.lambda_acc.x += lambda_xy.x;
    this.lambda_acc.y += lambda_xy.y;
    this.lambda_acc.z += lambda_z;
    body1.v.mad(lambda_xy, -body1.m_inv);
    body1.w -= vec2.cross(this.r1, lambda_xy) * body1.i_inv;
    body2.v.mad(lambda_xy, body2.m_inv);
    body2.w += vec2.cross(this.r2, lambda_xy) * body2.i_inv;
  } else {
    var v1 = vec2.mad(body1.v, vec2.perp(this.r1), body1.w);
    var v2 = vec2.mad(body2.v, vec2.perp(this.r2), body2.w);
    var cdot1 = vec2.sub(v2, v1);
    var cdot2 = body2.w - body1.w;
    var cdot = vec3.fromVec2(cdot1, cdot2);
    var lambda = this.em_inv.solve(cdot.neg());
    this.lambda_acc.addself(lambda);
    var lambda_xy = new vec2(lambda.x, lambda.y);
    body1.v.mad(lambda_xy, -body1.m_inv);
    body1.w -= (vec2.cross(this.r1, lambda_xy) + lambda.z) * body1.i_inv;
    body2.v.mad(lambda_xy, body2.m_inv);
    body2.w += (vec2.cross(this.r2, lambda_xy) + lambda.z) * body2.i_inv;
  }
};
WeldJoint2.prototype.solvePositionConstraints = function() {
  var body1 = this.body1;
  var body2 = this.body2;
  var r1 = vec2.rotate(vec2.sub(this.anchor1, body1.centroid), body1.a);
  var r2 = vec2.rotate(vec2.sub(this.anchor2, body2.centroid), body2.a);
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
    var c1 = vec2.sub(vec2.add(body2.p, r2), vec2.add(body1.p, r1));
    var c2 = 0;
    var correction = vec2.truncate(c1, Joint.MAX_LINEAR_CORRECTION);
    var lambda_dt_xy = em_inv.solve2x2(correction.neg());
    body1.p.mad(lambda_dt_xy, -body1.m_inv);
    body1.a -= vec2.cross(r1, lambda_dt_xy) * body1.i_inv;
    body2.p.mad(lambda_dt_xy, body2.m_inv);
    body2.a += vec2.cross(r2, lambda_dt_xy) * body2.i_inv;
  } else {
    var c1 = vec2.sub(vec2.add(body2.p, r2), vec2.add(body1.p, r1));
    var c2 = body2.a - body1.a;
    var correction = vec3.fromVec2(
      vec2.truncate(c1, Joint.MAX_LINEAR_CORRECTION),
      Clamp(c2, -Joint.MAX_ANGULAR_CORRECTION, Joint.MAX_ANGULAR_CORRECTION)
    );
    var lambda_dt = em_inv.solve(correction.neg());
    var lambda_dt_xy = new vec2(lambda_dt.x, lambda_dt.y);
    body1.p.mad(lambda_dt_xy, -body1.m_inv);
    body1.a -= (vec2.cross(r1, lambda_dt_xy) + lambda_dt.z) * body1.i_inv;
    body2.p.mad(lambda_dt_xy, body2.m_inv);
    body2.a += (vec2.cross(r2, lambda_dt_xy) + lambda_dt.z) * body2.i_inv;
  }
  return c1.length() < Joint.LINEAR_SLOP && Math.abs(c2) <= Joint.ANGULAR_SLOP;
};
WeldJoint2.prototype.getReactionForce = function(dt_inv) {
  return vec2.scale(this.lambda_acc.toVec2(), dt_inv);
};
WeldJoint2.prototype.getReactionTorque = function(dt_inv) {
  return this.lambda_acc.z * dt_inv;
};

// src/joints/joint_wheel.js
var WheelJoint2 = function(body1, body2, anchor1, anchor2) {
  Joint.call(this, Joint.TYPE_WHEEL, body1, body2, true);
  this.anchor1 = this.body1.getLocalPoint(anchor1);
  this.anchor2 = this.body2.getLocalPoint(anchor2);
  var d = vec2.sub(anchor2, anchor1);
  this.restLength = d.length();
  this.u_local = this.body1.getLocalVector(vec2.normalize(d));
  this.n_local = vec2.perp(this.u_local);
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
  var d = vec2.sub(this.getWorldAnchor2(), anchor1);
  this.u_local = this.body1.getLocalVector(vec2.normalize(d));
  this.n_local = vec2.perp(this.u_local);
};
WheelJoint2.prototype.setWorldAnchor2 = function(anchor2) {
  this.anchor2 = this.body2.getLocalPoint(anchor2);
  var d = vec2.sub(anchor2, this.getWorldAnchor1());
  this.u_local = this.body1.getLocalVector(vec2.normalize(d));
  this.n_local = vec2.perp(this.u_local);
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
  this.r1 = body1.xf.rotate(vec2.sub(this.anchor1, body1.centroid));
  this.r2 = body2.xf.rotate(vec2.sub(this.anchor2, body2.centroid));
  var p1 = vec2.add(body1.p, this.r1);
  var p2 = vec2.add(body2.p, this.r2);
  var d = vec2.sub(p2, p1);
  this.r1_d = vec2.add(this.r1, d);
  this.n = vec2.rotate(this.n_local, body1.a);
  this.sn1 = vec2.cross(this.r1_d, this.n);
  this.sn2 = vec2.cross(this.r2, this.n);
  var em_inv = body1.m_inv + body2.m_inv + body1.i_inv * this.sn1 * this.sn1 + body2.i_inv * this.sn2 * this.sn2;
  this.em = em_inv > 0 ? 1 / em_inv : em_inv;
  if (this.frequencyHz > 0) {
    this.u = vec2.rotate(this.u_local, body1.a);
    this.su1 = vec2.cross(this.r1_d, this.u);
    this.su2 = vec2.cross(this.r2, this.u);
    var springEm_inv = body1.m_inv + body2.m_inv + body1.i_inv * this.su1 * this.su1 + body2.i_inv * this.su2 * this.su2;
    var springEm = springEm_inv == 0 ? 0 : 1 / springEm_inv;
    var omega = 2 * Math.PI * this.frequencyHz;
    var k = springEm * omega * omega;
    var c = springEm * 2 * this.dampingRatio * omega;
    this.gamma = (c + k * dt) * dt;
    this.gamma = this.gamma == 0 ? 0 : 1 / this.gamma;
    var beta = dt * k * this.gamma;
    var pc = vec2.dot(d, this.u) - this.restLength;
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
    var linearImpulse = vec2.scale(this.n, this.lambda_acc);
    var angularImpulse1 = this.sn1 * this.lambda_acc + this.motorLambda_acc;
    var angularImpulse2 = this.sn2 * this.lambda_acc + this.motorLambda_acc;
    if (this.frequencyHz > 0) {
      linearImpulse.addself(vec2.scale(this.u, this.springLambda_acc));
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
    var cdot = this.u.dot(vec2.sub(body2.v, body1.v)) + this.su2 * body2.w - this.su1 * body1.w;
    var soft = this.beta_c + this.gamma * this.springLambda_acc;
    var lambda = -this.springEm * (cdot + soft);
    this.springLambda_acc += lambda;
    var impulse = vec2.scale(this.u, lambda);
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
  var cdot = this.n.dot(vec2.sub(body2.v, body1.v)) + this.sn2 * body2.w - this.sn1 * body1.w;
  var lambda = -this.em * cdot;
  this.lambda_acc += lambda;
  var impulse = vec2.scale(this.n, lambda);
  body1.v.mad(impulse, -body1.m_inv);
  body1.w -= this.sn1 * lambda * body1.i_inv;
  body2.v.mad(impulse, body2.m_inv);
  body2.w += this.sn2 * lambda * body2.i_inv;
};
WheelJoint2.prototype.solvePositionConstraints = function() {
  var body1 = this.body1;
  var body2 = this.body2;
  var r1 = vec2.rotate(vec2.sub(this.anchor1, body1.centroid), body1.a);
  var r2 = vec2.rotate(vec2.sub(this.anchor2, body2.centroid), body2.a);
  var p1 = vec2.add(body1.p, r1);
  var p2 = vec2.add(body2.p, r2);
  var d = vec2.sub(p2, p1);
  var r1_d = vec2.add(r1, d);
  var n = vec2.rotate(this.n_local, body1.a);
  var c = vec2.dot(n, d);
  var correction = Clamp(c, -Joint.MAX_LINEAR_CORRECTION, Joint.MAX_LINEAR_CORRECTION);
  var s1 = vec2.cross(r1_d, n);
  var s2 = vec2.cross(r2, n);
  var em_inv = body1.m_inv + body2.m_inv + body1.i_inv * s1 * s1 + body2.i_inv * s2 * s2;
  var k_inv = em_inv == 0 ? 0 : 1 / em_inv;
  var lambda_dt = k_inv * -correction;
  var impulse_dt = vec2.scale(n, lambda_dt);
  body1.p.mad(impulse_dt, -body1.m_inv);
  body1.a -= s1 * lambda_dt * body1.i_inv;
  body2.p.mad(impulse_dt, body2.m_inv);
  body2.a += s2 * lambda_dt * body2.i_inv;
  return Math.abs(c) < Joint.LINEAR_SLOP;
};
WheelJoint2.prototype.getReactionForce = function(dt_inv) {
  return vec2.scale(this.n, this.lambda_acc * dt_inv);
};
WheelJoint2.prototype.getReactionTorque = function(dt_inv) {
  return 0;
};

// src/joints/joint_angle.js
var AngleJoint2 = function(body1, body2) {
  Joint.call(this, Joint.TYPE_ANGLE, body1, body2, true);
  this.anchor1 = new vec2(0, 0);
  this.anchor2 = new vec2(0, 0);
  this.refAngle = body2.a - body1.a;
  this.lambda_acc = 0;
};
AngleJoint2.prototype = new Joint();
AngleJoint2.prototype.constructor = AngleJoint2;
AngleJoint2.prototype.setWorldAnchor1 = function(anchor1) {
  this.anchor1 = new vec2(0, 0);
};
AngleJoint2.prototype.setWorldAnchor2 = function(anchor2) {
  this.anchor2 = new vec2(0, 0);
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
  return vec2.zero;
};
AngleJoint2.prototype.getReactionTorque = function(dt_inv) {
  return this.lambda_acc * dt_inv;
};

// src/joints/joint_distance.js
var DistanceJoint2 = function(body1, body2, anchor1, anchor2) {
  Joint.call(this, Joint.TYPE_DISTANCE, body1, body2, true);
  this.anchor1 = this.body1.getLocalPoint(anchor1);
  this.anchor2 = this.body2.getLocalPoint(anchor2);
  this.restLength = vec2.dist(anchor1, anchor2);
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
  this.restLength = vec2.dist(anchor1, this.getWorldAnchor2());
};
DistanceJoint2.prototype.setWorldAnchor2 = function(anchor2) {
  this.anchor2 = this.body2.getLocalPoint(anchor2);
  this.restLength = vec2.dist(anchor2, this.getWorldAnchor1());
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
  this.r1 = body1.xf.rotate(vec2.sub(this.anchor1, body1.centroid));
  this.r2 = body2.xf.rotate(vec2.sub(this.anchor2, body2.centroid));
  var d = vec2.sub(vec2.add(body2.p, this.r2), vec2.add(body1.p, this.r1));
  var dist = d.length();
  if (dist > Joint.LINEAR_SLOP) {
    this.u = vec2.scale(d, 1 / dist);
  } else {
    this.u = vec2.zero;
  }
  this.s1 = vec2.cross(this.r1, this.u);
  this.s2 = vec2.cross(this.r2, this.u);
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
    var impulse = vec2.scale(this.u, this.lambda_acc);
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
  var cdot = this.u.dot(vec2.sub(body2.v, body1.v)) + this.s2 * body2.w - this.s1 * body1.w;
  var soft = this.beta_c + this.gamma * this.lambda_acc;
  var lambda = -this.em * (cdot + soft);
  this.lambda_acc += lambda;
  var impulse = vec2.scale(this.u, lambda);
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
  var r1 = vec2.rotate(vec2.sub(this.anchor1, body1.centroid), body1.a);
  var r2 = vec2.rotate(vec2.sub(this.anchor2, body2.centroid), body2.a);
  var d = vec2.sub(vec2.add(body2.p, r2), vec2.add(body1.p, r1));
  var dist = d.length();
  var u = vec2.scale(d, 1 / dist);
  var c = dist - this.restLength;
  var correction = Clamp(c, -Joint.MAX_LINEAR_CORRECTION, Joint.MAX_LINEAR_CORRECTION);
  var s1 = vec2.cross(r1, u);
  var s2 = vec2.cross(r2, u);
  var em_inv = body1.m_inv + body2.m_inv + body1.i_inv * s1 * s1 + body2.i_inv * s2 * s2;
  var lambda_dt = em_inv == 0 ? 0 : -correction / em_inv;
  var impulse_dt = vec2.scale(u, lambda_dt);
  body1.p.mad(impulse_dt, -body1.m_inv);
  body1.a -= s1 * lambda_dt * body1.i_inv;
  body2.p.mad(impulse_dt, body2.m_inv);
  body2.a += s2 * lambda_dt * body2.i_inv;
  return Math.abs(c) < Joint.LINEAR_SLOP;
};
DistanceJoint2.prototype.getReactionForce = function(dt_inv) {
  return vec2.scale(this.u, this.lambda_acc * dt_inv);
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
  this.r1 = body1.xf.rotate(vec2.sub(this.anchor1, body1.centroid));
  this.r2 = body2.xf.rotate(vec2.sub(this.anchor2, body2.centroid));
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
    var lambda_xy = new vec2(this.lambda_acc.x, this.lambda_acc.y);
    var lambda_z = this.lambda_acc.z + this.motorLambda_acc;
    body1.v.mad(lambda_xy, -body1.m_inv);
    body1.w -= (vec2.cross(this.r1, lambda_xy) + lambda_z) * body1.i_inv;
    body2.v.mad(lambda_xy, body2.m_inv);
    body2.w += (vec2.cross(this.r2, lambda_xy) + lambda_z) * body2.i_inv;
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
    var v1 = vec2.mad(body1.v, vec2.perp(this.r1), body1.w);
    var v2 = vec2.mad(body2.v, vec2.perp(this.r2), body2.w);
    var cdot1 = vec2.sub(v2, v1);
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
        var rhs = vec2.add(cdot1, vec2.scale(new vec2(this.em_inv._13, this.em_inv._23), newLambda_z));
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
    var lambda_xy = new vec2(lambda.x, lambda.y);
    body1.v.mad(lambda_xy, -body1.m_inv);
    body1.w -= (vec2.cross(this.r1, lambda_xy) + lambda.z) * body1.i_inv;
    body2.v.mad(lambda_xy, body2.m_inv);
    body2.w += (vec2.cross(this.r2, lambda_xy) + lambda.z) * body2.i_inv;
  } else {
    var v1 = vec2.mad(body1.v, vec2.perp(this.r1), body1.w);
    var v2 = vec2.mad(body2.v, vec2.perp(this.r2), body2.w);
    var cdot = vec2.sub(v2, v1);
    var lambda = this.em_inv.solve2x2(cdot.neg());
    this.lambda_acc.addself(vec3.fromVec2(lambda, 0));
    body1.v.mad(lambda, -body1.m_inv);
    body1.w -= vec2.cross(this.r1, lambda) * body1.i_inv;
    body2.v.mad(lambda, body2.m_inv);
    body2.w += vec2.cross(this.r2, lambda) * body2.i_inv;
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
    var r1 = vec2.rotate(vec2.sub(this.anchor1, body1.centroid), body1.a);
    var r2 = vec2.rotate(vec2.sub(this.anchor2, body2.centroid), body2.a);
    var c = vec2.sub(vec2.add(body2.p, r2), vec2.add(body1.p, r1));
    var correction = vec2.truncate(c, Joint.MAX_LINEAR_CORRECTION);
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
    body1.a -= vec2.cross(r1, lambda_dt) * body1.i_inv;
    body2.p.mad(lambda_dt, body2.m_inv);
    body2.a += vec2.cross(r2, lambda_dt) * body2.i_inv;
  }
  return positionError < Joint.LINEAR_SLOP && angularError < Joint.ANGULAR_SLOP;
};
RevoluteJoint2.prototype.getReactionForce = function(dt_inv) {
  return vec2.scale(this.lambda_acc, dt_inv);
};
RevoluteJoint2.prototype.getReactionTorque = function(dt_inv) {
  return 0;
};

// src/joints/joint_prismatic.js
var PrismaticJoint2 = function(body1, body2, anchor1, anchor2) {
  Joint.call(this, Joint.TYPE_PRISMATIC, body1, body2, true);
  this.anchor1 = this.body1.getLocalPoint(anchor1);
  this.anchor2 = this.body2.getLocalPoint(anchor2);
  var d = vec2.sub(anchor2, anchor1);
  this.n_local = this.body1.getLocalVector(vec2.normalize(vec2.perp(d)));
  this.da = body2.a - body1.a;
  this.lambda_acc = new vec2(0, 0);
};
PrismaticJoint2.prototype = new Joint();
PrismaticJoint2.prototype.constructor = PrismaticJoint2;
PrismaticJoint2.prototype.setWorldAnchor1 = function(anchor1) {
  this.anchor1 = this.body1.getLocalPoint(anchor1);
  var d = vec2.sub(this.getWorldAnchor2(), anchor1);
  this.n_local = this.body1.getLocalVector(vec2.normalize(vec2.perp(d)));
};
PrismaticJoint2.prototype.setWorldAnchor2 = function(anchor2) {
  this.anchor2 = this.body2.getLocalPoint(anchor2);
  var d = vec2.sub(anchor2, this.getWorldAnchor1());
  this.n_local = this.body1.getLocalVector(vec2.normalize(vec2.perp(d)));
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
  this.r1 = body1.xf.rotate(vec2.sub(this.anchor1, body1.centroid));
  this.r2 = body2.xf.rotate(vec2.sub(this.anchor2, body2.centroid));
  var p1 = vec2.add(body1.p, this.r1);
  var p2 = vec2.add(body2.p, this.r2);
  var d = vec2.sub(p2, p1);
  this.r1_d = vec2.add(this.r1, d);
  this.n = vec2.normalize(vec2.perp(d));
  this.s1 = vec2.cross(this.r1_d, this.n);
  this.s2 = vec2.cross(this.r2, this.n);
  var s1 = this.s1;
  var s2 = this.s2;
  var s1_i = s1 * body1.i_inv;
  var s2_i = s2 * body2.i_inv;
  var k11 = body1.m_inv + body2.m_inv + s1 * s1_i + s2 * s2_i;
  var k12 = s1_i + s2_i;
  var k22 = body1.i_inv + body2.i_inv;
  this.em_inv = new mat2(k11, k12, k12, k22);
  if (warmStarting) {
    var impulse = vec2.scale(this.n, this.lambda_acc.x);
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
  var cdot1 = this.n.dot(vec2.sub(body2.v, body1.v)) + this.s2 * body2.w - this.s1 * body1.w;
  var cdot2 = body2.w - body1.w;
  var lambda = this.em_inv.solve(new vec2(-cdot1, -cdot2));
  this.lambda_acc.addself(lambda);
  var impulse = vec2.scale(this.n, lambda.x);
  body1.v.mad(impulse, -body1.m_inv);
  body1.w -= (this.s1 * lambda.x + lambda.y) * body1.i_inv;
  body2.v.mad(impulse, body2.m_inv);
  body2.w += (this.s2 * lambda.x + lambda.y) * body2.i_inv;
};
PrismaticJoint2.prototype.solvePositionConstraints = function() {
  var body1 = this.body1;
  var body2 = this.body2;
  var r1 = vec2.rotate(vec2.sub(this.anchor1, body1.centroid), body1.a);
  var r2 = vec2.rotate(vec2.sub(this.anchor2, body2.centroid), body2.a);
  var p1 = vec2.add(body1.p, r1);
  var p2 = vec2.add(body2.p, r2);
  var d = vec2.sub(p2, p1);
  var r1_d = vec2.add(r1, d);
  var n = vec2.rotate(this.n_local, body1.a);
  var c1 = vec2.dot(n, d);
  var c2 = body2.a - body1.a - this.da;
  var correction = new vec2();
  correction.x = Clamp(c1, -Joint.MAX_LINEAR_CORRECTION, Joint.MAX_LINEAR_CORRECTION);
  correction.y = Clamp(c2, -Joint.MAX_ANGULAR_CORRECTION, Joint.MAX_ANGULAR_CORRECTION);
  var s1 = vec2.cross(r1_d, n);
  var s2 = vec2.cross(r2, n);
  var s1_i = s1 * body1.i_inv;
  var s2_i = s2 * body2.i_inv;
  var k11 = body1.m_inv + body2.m_inv + s1 * s1_i + s2 * s2_i;
  var k12 = s1_i + s2_i;
  var k22 = body1.i_inv + body2.i_inv;
  var em_inv = new mat2(k11, k12, k12, k22);
  var lambda_dt = em_inv.solve(correction.neg());
  var impulse_dt = vec2.scale(n, lambda_dt.x);
  body1.p.mad(impulse_dt, -body1.m_inv);
  body1.a -= (vec2.cross(r1_d, impulse_dt) + lambda_dt.y) * body1.i_inv;
  body2.p.mad(impulse_dt, body2.m_inv);
  body2.a += (vec2.cross(r2, impulse_dt) + lambda_dt.y) * body2.i_inv;
  return Math.abs(c1) <= Joint.LINEAR_SLOP && Math.abs(c2) <= Joint.ANGULAR_SLOP;
};
PrismaticJoint2.prototype.getReactionForce = function(dt_inv) {
  return vec2.scale(this.n, this.lambda_acc.x * dt_inv);
};
PrismaticJoint2.prototype.getReactionTorque = function(dt_inv) {
  return this.lambda_acc.y * dt_inv;
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

// src/core.js
var core_default = {
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
  vec2,
  deg2rad,
  animate,
  animateBatch,
  easings
};
export {
  AngleJoint2 as AngleJoint,
  Body,
  Bounds,
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
  WeldJoint2 as WeldJoint,
  WheelJoint2 as WheelJoint,
  World,
  animate,
  animateBatch,
  collision,
  core_default as default,
  deg2rad,
  easings,
  meter2pixel,
  pixel2meter,
  stats,
  vec2
};
