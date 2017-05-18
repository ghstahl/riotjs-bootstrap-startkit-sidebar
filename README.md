# Riotjs Starterkit with Bootstrap

* [live Demo](https://ghstahl.github.io/riot1/)

Like the original Riotjs Starterkit, this is based on:

* [Riot](https://muut.com/riotjs/)
* [RiotControl](https://github.com/jimsparkman/RiotControl/)
* [PostCSS](https://github.com/postcss/postcss)
* [Webpack](http://webpack.github.io/)
* [postcss-import](https://github.com/postcss/postcss-import)
* [postcss-nested](https://github.com/postcss/postcss-nested)
* [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties)
* [autoprefixer-core](https://github.com/postcss/autoprefixer-core)
* [csswring](https://github.com/hail2u/node-csswring)

This edition of the starterkit further adds:

* [jQuery](https://github.com/jquery/jquery)
* [Bootstrap](https://github.com/twbs/bootstrap)


## Get the kit

```
$ git clone https://github.com/ghstahl/riotjs-bootstrap3-startkit-sidebar.git && cd riotjs-bootstrap3-startkit-sidebar
```

## Installation

```
$ npm install
```

## Development

```
$ npm run dev
```

Now the server is runnning on localhost:1338

NOTE THIS IS NOT 1337.
You may run both the original startkit and this edition for comparison at the same time.


## Build

```
$ npm run build
```

## Bootswatch Theming

The index.js can be modified to use any of the existing themes provided by [Bootswatch](https://github.com/thomaspark/bootswatch/).
Change line 01 from `import 'bootswatch/slate/bootstrap.css';` to `import 'bootswatch/{bootswatch-theme-name}/bootstrap.css';` to do this.
Save and preview the page immediately with the live reload feature.

## Thanks

Thanks to [RiotJS Bootstrap Startkit](https://github.com/calben/riotjs-bootstrap-startkit) for their original Startkit initiative!


