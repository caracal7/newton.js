import Matrix2d from "./Matrix2d.js";

function init() {
    translateRig();
    rotateRig();
    scaleRig();
    srt();
}

init();


function translateRig() {
    var t = -64,
        htmlCanvas = document.querySelector("#translate2d"),
        ctx = htmlCanvas.getContext('2d'),
        mat = new Matrix2d().identity();
    var shape = [
        [-64, -64],
        [64, -64],
        [64, 64],
        [-64, 64],
        [-64, -64]
    ];

    (function animate() {
        requestAnimationFrame(animate);
        viewPort(ctx, htmlCanvas);
        t++;
        if (t > 360 + 64) {
            t = -64;
        }
        mat.translate(t, 96);
        drawShape(ctx, shape, mat);
    }());
}

function rotateRig() {
    var r = 0,
        htmlCanvas = document.querySelector("#rotate2d"),
        ctx = htmlCanvas.getContext('2d'),
        shape = [
            [-64, -64],
            [64, -64],
            [64, 64],
            [-64, 64],
            [-64, -64]
        ];
    var mat = new Matrix2d().identity(),
        matRotate = new Matrix2d().identity(),
        matTranslate = new Matrix2d().identity();

    (function animate() {
        requestAnimationFrame(animate);
        viewPort(ctx, htmlCanvas);
        r += 1;
        r %= 360;
        matTranslate.translate(160, 100);
        matRotate.rotate(r, r);
        mat = mat.multiply(matRotate, matTranslate);
        drawShape(ctx, shape, mat);
    }());
}

function scaleRig() {
    var s = 0,
        htmlCanvas = document.querySelector("#scale2d"),
        ctx = htmlCanvas.getContext('2d'),
        matScale = new Matrix2d().identity(),
        matTranslate = new Matrix2d().identity(),
        mat = new Matrix2d().identity(),
        shape = [
            [-64, -64],
            [64, -64],
            [64, 64],
            [-64, 64],
            [-64, -64]
        ];

    (function animate() {
        requestAnimationFrame(animate);
        viewPort(ctx, htmlCanvas);
        s += 0.05;
        if (s > 3) {
            s = 0;
        }

        matTranslate.translate(160, 100);
        matScale.scale(s, s);
        mat = mat.multiply(matScale, matTranslate);
        drawShape(ctx, shape, mat);
    }());
}

function srt() {
    var s = 0, r = 0, t = -64,
        htmlCanvas = document.querySelector("#srt2d"),
        ctx = htmlCanvas.getContext('2d'),
        matScale = new Matrix2d().identity(),
        matRotate = new Matrix2d().identity(),
        matTranslate = new Matrix2d().identity(),
        mat = new Matrix2d().identity(),
        shape = [
            [-64, -64],
            [64, -64],
            [64, 64],
            [-64, 64],
            [-64, -64]
        ];

    (function animate() {

        viewPort(ctx, htmlCanvas);
        s += 0.01;
        if (s > 1.5) s = 0;

        r += 1;
        if (r > 360) r = 0;

        t += 1;
        if (t > 360 + 64) t = -64;

        matTranslate.translate(t, 96);
        matRotate.rotate(r);
        matScale.scale(s, s);
        mat = mat.multiply(matRotate, matTranslate);
        mat = mat.multiply(matScale, mat);
        drawShape(ctx, shape, mat);
        requestAnimationFrame(animate);
    }());
}

function viewPort(ctx, htmlCanvas) {
    var x, y;
    ctx.fillStyle = "000000";
    ctx.fillRect(0, 0, htmlCanvas.width, htmlCanvas.height);

    ctx.strokeStyle = "#002000";
    ctx.lineWidth = 1;
    for (x = 0; x < 320; x += 32) {
        for (y = 0; y < 200; y += 32) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(320, y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 200);
            ctx.stroke();
        }
    }

    ctx.strokeStyle = "#004000";
    ctx.beginPath();
    ctx.moveTo(0, 96);
    ctx.lineTo(320, 96);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(160, 0);
    ctx.lineTo(160, 200);
    ctx.stroke();
}

function drawShape(ctx, shape, mat) {
    var i, p1, p2;

    ctx.strokeStyle = "#00d000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    p1 = { x: 0, y: 0, w: 1};
    p2 = {};

    // draw shape
    for (i = 0; i < shape.length; i += 1) {
        p1.x = shape[i][0];
        p1.y = shape[i][1];
        p2 = mat.multiplyVec(p1, mat);

        if (i === 0) {
            ctx.moveTo(p2.x, p2.y);
        } else {
            ctx.lineTo(p2.x, p2.y);
        }
    }
    ctx.stroke();
}
