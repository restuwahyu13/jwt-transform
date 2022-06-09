# JWT Transform

[![Build Status](https://scrutinizer-ci.com/g/restuwahyu13/jwt-transform/badges/build.png?b=main)](https://scrutinizer-ci.com/g/restuwahyu13/jwt-transform/build-status/main) [![CodeFactor](https://www.codefactor.io/repository/github/restuwahyu13/jwt-transform/badge)](https://www.codefactor.io/repository/github/restuwahyu13/jwt-transform) [![codebeat badge](https://codebeat.co/badges/56d95df5-235b-4988-8a4e-b1b5aad6d796)](https://codebeat.co/projects/github-com-restuwahyu13-jwt-transform-main) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/b55a9532f9f84ebd94b37b52c32d7472)](https://www.codacy.com/gh/restuwahyu13/jwt-transform/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=restuwahyu13/jwt-transform&amp;utm_campaign=Badge_Grade) ![node-current](https://img.shields.io/node/v/jwt-transform?style=flat-square) ![npm](https://img.shields.io/npm/dm/jwt-transform) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/restuwahyu13/jwt-transform/blob/main/CONTRIBUTING.md)

**jwt-transform** is a simple utility tool for your transforming a real *jwt token* into a fake *jwt token*, because if you store *jwt token* into a `cookie` or `local storage` very unsafe, your *jwt token* can be seen data using [jwt.io](https://jwt.io) website or chrome extension, if you use **jwt-transform** you real *jwt token* cannot seen using  [jwt.io](https://jwt.io) website or chrome extension, because what you save is fake *jwt token*, you can get back real *jwt token* using decrypt method for parse fake *jwt token*.

## Table Of Content

- [Installation](#installation)
- [API Reference](#api-reference)
   + [encrypt](#encrypttext-string-rotate-number-string--promise)
   + [decrypt](#decrypttext-string-rotate-number-string--promise)
- [Example Usage](#example-usage)
- [Testing](#testing)
- [Bugs](#bugs)
- [License](#license)

## Installation

```bash
npm install jwt-transform -S or yarn add jwt-transform -S
```

## API Reference

- #### encrypt(token: string, rotate: number): string | Promise

  encrypt jwt token using caesar cipher cryptography from real jwt token into fake jwt token

- #### decrypt(token: string, rotate: number): string | Promise

  decrypt jwt token using caesar cipher cryptography from fake jwt token into real jwt token

## Example Usage

Follow this **[express tutorial](https://github.com/restuwahyu13/express-rest-api-clean-architecture)** for example usage using express, make this as middleware for transform your fake jwt token to real token, because jwt .verify need real token, if you pass fake token jwt.verify identification your token is not valid and if you not using express, make this as middleware.

- ##### Example Usage Using CommonJs With JavaScript

  ```javascript
   const { encrypt, decrypt } = require('jwt-transform')

   const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

   const resultEncrypt = encrypt(accessToken, 15)
   console.log(resultEncrypt)
   // fake jwt token
   // tnYwqVrxDxYXJoX1CxXhXcG5rRX6XzeMKRY9.tnYosLXxDxXmByB0CIN3DSzlXxlxqbUiOHX6XzekpV4vGV9aXxlxpLU0XydmCIT2ByB5BSXnuF.HuaZmlGYHBtZZU2FI4uleBtYu36EDz6nYK_psFhhl5r

   const resultDecrypt = decrypt(resultEncrypt, 15)
   console.log(resultDecrypt)
   // real jwt token
   // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
  ```

- ##### Example Usage Using ESM With JavaScript / TypeScript

  ```javascript
   import { encrypt, decrypt } from 'jwt-transform'

   const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

   const resultEncrypt = encrypt(accessToken, 15)
   console.log(resultEncrypt)
   // fake jwt token
   // tnYwqVrxDxYXJoX1CxXhXcG5rRX6XzeMKRY9.tnYosLXxDxXmByB0CIN3DSzlXxlxqbUiOHX6XzekpV4vGV9aXxlxpLU0XydmCIT2ByB5BSXnuF.HuaZmlGYHBtZZU2FI4uleBtYu36EDz6nYK_psFhhl5r

   const resultDecrypt = decrypt(resultEncrypt, 15)
   console.log(resultDecrypt)
   // real jwt token
   // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
  ```

## Testing

- Testing Via Local

  ```sh
  npm test or make test
  ```

- Testing Via Local And Build

  ```sh
  make build
  ```

- Testing Via Docker

  ```sh
  docker build -t jwt-transform or make dkb tag=jwt-transform
  ```

## Bugs

For information on bugs related to package libraries, please visit [here](https://github.com/restuwahyu13/jwt-transform/issues)

## Contributing

Want to make **jwt-transform** more perfect ? Let's contribute and follow the [contribution guide.](https://github.com/restuwahyu13/jwt-transform/blob/main/CONTRIBUTING.md)

## License

- [MIT License](https://github.com/restuwahyu13/jwt-transform/blob/main/LICENSE.md)

<p align="right" style="padding: 5px; border-radius: 100%; background-color: red; font-size: 2.5rem;">
  <b><a href="#jwt-transform">BACK TO TOP</a></b>
</p>
