<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# Gamma Function

> The gamma function.

The gamma function extends the factorial function to real and complex numbers.
If `n` is a positive `integer`,

```math
\Gamma (n) = (n-1)!
```

Generalized to all complex numbers `z`, except for nonpositive integers,
 the gamma function can be expressed as an infinite product

```math
\Gamma ( z ) = \frac{e^{-\gamma z}}{z} \prod^{\infty}_{n=1} \left ( 1+\frac{z}{n}\right )^{-1} e^{z/n}
```


This package is a rewrite of
 [@stdlib/math-base-special-gamma](https://www.npmjs.com/package/@stdlib/math-base-special-gamma)
 in Typescript.
This package supports both CommonJs and ES Modules.

## Usage

``` javascript
// for CommonJs
const { gamma } = require('@toshiara/special-gamma');

// for ES Modules
import { gamma } from '@toshiara/special-gamma';
```

### gamma(x)

Evaluates the gamma function.

```javascript
gamma(4.0);
// returns 6.0

gamma(-1.5);
// returns 2.3632718012073544

gamma(-0.5);
// returns -3.5449077018110318

gamma(0.5);
// returns 1.7724538509055159

gamma(0.0);
// returns Infinity

gamma(-0.0);
// returns -Infinity

gamma(NaN);
// returns NaN
```

