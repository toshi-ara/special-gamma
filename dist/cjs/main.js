"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
*
* Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*
* Stephen L. Moshier
* moshier@na-net.ornl.gov
* ```
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamma = void 0;
// ## NOTE
// rewritten in Typescript
const sinpi_1 = require("@toshiara/sinpi");
// CONSTANTS
const PI = 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679; // eslint-disable-line max-len
const PINF = Number.POSITIVE_INFINITY;
const NINF = Number.NEGATIVE_INFINITY;
const SQRT_TWO_PI = 2.506628274631000502415765284811045253e+00;
const MAX_STIRLING = 143.01608;
// The Euler-Mascheroni constant
const EULER = 0.577215664901532860606512090082402431042;
// MAIN //
/**
* Evaluates the gamma function.
*
* ## Method
*
* 1.  Arguments \\(|x| \leq 34\\) are reduced by recurrence and the function approximated by a rational function of degree \\(6/7\\) in the interval \\((2,3)\\).
* 2.  Large negative arguments are made positive using a reflection formula.
* 3.  Large arguments are handled by Stirling's formula.
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain    | # trials | peak    | rms     |
*     |:----------:|:---------:|:--------:|:-------:|:-------:|
*     | DEC        | -34,34    | 10000    | 1.3e-16 | 2.5e-17 |
*     | IEEE       | -170,-33  | 20000    | 2.3e-15 | 3.3e-16 |
*     | IEEE       | -33, 33   | 20000    | 9.4e-16 | 2.2e-16 |
*     | IEEE       | 33, 171.6 | 20000    | 2.3e-15 | 3.2e-16 |
*
* -   Error for arguments outside the test range will be larger owing to error amplification by the exponential function.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* gamma(4.0);
* // returns 6.0
*
* @example
* gamma(-1.5);
* // returns 2.3632718012073544
*
* @example
* gamma(-0.5);
* // returns -3.5449077018110318
*
* @example
* gamma(0.5);
* // returns 1.7724538509055159
*
* @example
* gamma(0.0);
* // returns Infinity
*
* @example
* gamma(-0.0);
* // returns -Infinity
*
* @example
* gamma(NaN);
* // returns NaN
*/
function gamma(x) {
    let sign;
    if ((isInteger(x) && x < 0) || x === NINF || isNaN(x)) {
        return NaN;
    }
    if (x === 0.0) {
        return isNegativeZero(x) ? NINF : PINF;
    }
    if (x > 171.61447887182298) {
        return PINF;
    }
    if (x < -170.5674972726612) {
        return 0.0;
    }
    const q = Math.abs(x);
    if (q > 33.0) {
        if (x >= 0.0) {
            return stirlingApprox(x);
        }
        let p = Math.floor(q);
        // Check whether `x` is even...
        sign = ((p & 1) === 0) ? -1.0 : 1.0;
        let z = q - p;
        if (z > 0.5) {
            p += 1.0;
            z = q - p;
        }
        z = q * (0, sinpi_1.sinpi)(z);
        return sign * PI / (Math.abs(z) * stirlingApprox(q));
    }
    // Reduce `x`...
    let z = 1.0;
    while (x >= 3.0) {
        x -= 1.0;
        z *= x;
    }
    while (x < 0.0) {
        if (x > -1.0e-9) {
            return smallApprox(x, z);
        }
        z /= x;
        x += 1.0;
    }
    while (x < 2.0) {
        if (x < 1.0e-9) {
            return smallApprox(x, z);
        }
        z /= x;
        x += 1.0;
    }
    if (x === 2.0) {
        return z;
    }
    x -= 2.0;
    return z * rateval(x);
}
exports.gamma = gamma;
// functions
function isInteger(x) {
    return (Math.floor(x) === x);
}
function isNegativeZero(x) {
    return (x === 0.0 && 1.0 / x === NINF);
}
function rateval(x) {
    let ax;
    let s1;
    let s2;
    if (x === 0.0) {
        return 1.0;
    }
    ax = (x < 0.0) ? -x : x;
    if (ax <= 1.0) {
        s1 = 1.0 + (x * (0.4942148268014971 + (x * (0.20744822764843598 + (x * (0.04763678004571372 + (x * (0.010421379756176158 + (x * (0.0011913514700658638 + (x * (0.00016011952247675185 + (x * 0.0))))))))))))); // eslint-disable-line max-len
        s2 = 1.0 + (x * (0.0714304917030273 + (x * (-0.23459179571824335 + (x * (0.035823639860549865 + (x * (0.011813978522206043 + (x * (-0.004456419138517973 + (x * (0.0005396055804933034 + (x * -0.000023158187332412014))))))))))))); // eslint-disable-line max-len
    }
    else {
        x = 1.0 / x;
        s1 = 0.0 + (x * (0.00016011952247675185 + (x * (0.0011913514700658638 + (x * (0.010421379756176158 + (x * (0.04763678004571372 + (x * (0.20744822764843598 + (x * (0.4942148268014971 + (x * 1.0))))))))))))); // eslint-disable-line max-len
        s2 = -0.000023158187332412014 + (x * (0.0005396055804933034 + (x * (-0.004456419138517973 + (x * (0.011813978522206043 + (x * (0.035823639860549865 + (x * (-0.23459179571824335 + (x * (0.0714304917030273 + (x * 1.0))))))))))))); // eslint-disable-line max-len
    }
    return s1 / s2;
}
// Stirling approximation
function stirlingApprox(x) {
    let w;
    let y;
    let v;
    w = 1.0 / x;
    w = polyval(w);
    y = Math.exp(x);
    // Check `x` to avoid `pow()` overflow...
    if (x > MAX_STIRLING) {
        v = Math.pow(x, (0.5 * x) - 0.25);
        y = v * (v / y);
    }
    else {
        y = Math.pow(x, x - 0.5) / y;
    }
    return SQRT_TWO_PI * y * w;
}
function polyval(x) {
    if (x === 0.0) {
        return 1.0;
    }
    return 1.0 + (x * (0.08333333333334822 + (x * (0.0034722222160545866 + (x * (-0.0026813261780578124 + (x * (-0.00022954996161337813 + (x * 0.0007873113957930937))))))))); // eslint-disable-line max-len
}
// small approximation
function smallApprox(x, z) {
    return z / ((1.0 + (EULER * x)) * x);
}
//# sourceMappingURL=main.js.map