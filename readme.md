# Say it

[![NodeJS](https://github.com/webdeveric/say-it-web-ext/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdeveric/say-it-web-ext/actions/workflows/node.js.yml)

Say a word or phrase just by highlighting it and clicking the Say It context menu item.

The voice, pitch, rate, and volume can be customized in the add-on preferences.

## Install

You can get this addon at https://addons.mozilla.org/en-US/firefox/addon/say-it/

## Local development

1. `pnpm i`
1. `pnpm start`

### Building the web extension

```shell
pnpm build
```

The `zip` output will be in the `./build` folder and the webpack output will be in the `./dist` folder.

## Extension signing for Firefox

Define your api key / secret in your environment then run the following.

Credentials can be found at https://addons.mozilla.org/en-US/developers/addon/api/key/

This generates an `xpi` file and it will be put in `./build`.

```shell
pnpm sign --api-key=$WEB_EXT_API_KEY --api-secret=$WEB_EXT_API_SECRET
```

### Signing a listed plugin

```shell
pnpm sign --channel=listed --api-key=$WEB_EXT_API_KEY --api-secret=$WEB_EXT_API_SECRET
```

## Useful links

- https://hacks.mozilla.org/2019/10/developing-cross-browser-extensions-with-web-ext-3-2-0/
- https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/
