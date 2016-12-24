# BotPartner CoT API server

## Requires

 * node.js : ^6.9
 * sails : ~0.12.9

## Installation

 * install:
```sh
   npm install
```

 * edit ``api/controllers/CotController.js`` for config your setting
```js
var vendor = '__YOUR_COT_VENDER_ID__';
var device = '__YOUR_COT_DEVICE_ID__';
var uuid  = '__YOUR_COT_HOST_UUID__'; //your UUID
var auth_token = '__YOUR_COT_TOKEN__';

var owner  = '__YOUR_COT_OWENER_ID__';
var group  = '__YOUR_COT_GROUP_ID__';

var remote_ip = '__YOUR_COT_SMQ_SERVER_IP__';
var remote_port = __YOUR_COT_SMQ_SERVER_PORT__;
```
 * launch
```sh
   node app.js
```
or 
```sh
   sails l
```  
 * enjoy

## Source Code License

(The MIT License)

Copyright (c) 2016 Jun-Yuan Yan (bot@botpartner.me) , BotPartner Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
