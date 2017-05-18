# Riotjs Starterkit with Bootstrap

* [live Demo](https://ghstahl.github.io/riot1/)

## Features 
This is a riotjs app that loads other riotjs apps where the child apps could be more specifically considered plugins.
Other projects I have seen use terms like 'code spliting', 'componentization', etc.

Its a plugin, because the plugin has to obey some rules of the host and not carry code that that host provides.

In this example, you will notice the plugin bundle.js does not contain riot, bootstrap, or jquery amongst other libraries that are already present in the host app.  Its quite small, and the child plugin considers itself autonomous.

The plugin is selfcontained [here](riotjs-partial-tag) and I have prebuilt and checked it in for demo use.  
The plugin bundle is [here](build/partial/typicode_component)

## Housekeeping 
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
* [Bootswatch](http://bootswatch.com/)

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


