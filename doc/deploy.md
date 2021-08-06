# How to Deploy btcbam

btcbam is splitted into 3 repos:
* [https://github.com/SIProjects/btcbam](https://github.com/SIProjects/btcbam)
* [https://github.com/SIProjects/btcbam-api](https://github.com/SIProjects/btcbam-api)
* [https://github.com/SIProjects/btcbam-ui](https://github.com/SIProjects/btcbam-ui)

## Prerequisites

* node.js v12.0+
* mysql v8.0+
* redis v5.0+

## Deploy btcbam core
1. `git clone --recursive https://github.com/SIProjects/btcbam.git --branch=btcbam`
2. Follow the instructions of [https://github.com/SIProjects/btcbam/blob/master/README.md#building-btcbam-core](https://github.com/SIProjects/btcbam/blob/master/README.md#building-btcbam-core) to build btcbam
3. Run `btcbamd` with `-logevents=1` enabled

## Deploy btcbam
1. `git clone https://github.com/SIProjects/btcbam.git`
2. `cd btcbam && npm install`
3. Create a mysql database and import [docs/structure.sql](structure.sql)
4. Edit file `btcbam-node.json` and change the configurations if needed.
5. `npm run dev`

It is strongly recommended to run `btcbam` under a process manager (like `pm2`), to restart the process when `btcbam` crashes.

## Deploy btcbam-api
1. `git clone https://github.com/SIProjects/btcbam-api.git`
2. `cd btcbam-api && npm install`
3. Create file `config/config.prod.js`, write your configurations into `config/config.prod.js` such as:
    ```javascript
    exports.security = {
        domainWhiteList: ['http://example.com']  // CORS whitelist sites
    }
    // or
    exports.cors = {
        origin: '*'  // Access-Control-Allow-Origin: *
    }

    exports.sequelize = {
        logging: false  // disable sql logging
    }
    ```
    This will override corresponding field in `config/config.default.js` while running.
4. `npm start`

## Deploy btcbam-ui
This repo is optional, you may not deploy it if you don't need UI.
1. `git clone https://github.com/SIProjects/btcbam-ui.git`
2. `cd btcbam-ui && npm install`
3. Edit `package.json` for example:
   * Edit `script.build` to `"build": "BTCBAM_API_BASE_CLIENT=/api/ BTCBAM_API_BASE_SERVER=http://localhost:3001/ BTCBAM_API_BASE_WS=//example.com/ nuxt build"` in `package.json` to set the api URL base
   * Edit `script.start` to `"start": "PORT=3000 nuxt start"` to run `btcbam-ui` on port 3000
4. `npm run build`
5. `npm start`
