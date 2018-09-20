{
    "name": "jekyll-boilerplate",
    "version": "1.0.0",
    "description": "",
    "scripts": {
        "start": "bundle exec jekyll serve",
        "jekyll": "npm run browserify && bundle exec jekyll build",
        "build": "webpack && bundle exec jekyll build"
    },
    "dependencies": {
        "bootstrap": "^4.1.0",
        "jquery": "^3.3.1",
        "normalize.css": "^8.0.0",
        "popper.js": "^1.14.3"
    },
    "devDependencies": {
        "@babel/cli": "^7.1.0",
        "@babel/core": "^7.1.0",
        "@babel/plugin-proposal-class-properties": "^7.1.0",
        "@babel/preset-env": "^7.1.0",
        "autoprefixer": "^9.1.5",
        "babel-core": "^7.0.0-bridge.0",
        "babel-loader": "^8.0.2",
        "clean-webpack-plugin": "^0.1.19",
        "copy-webpack-plugin": "^4.5.2",
        "css-loader": "^1.0.0",
        "extract-text-webpack-plugin": "^3.0.2",
        "glob": "^7.1.3",
        "html-loader": "^0.5.5",
        "html-webpack-plugin": "^3.2.0",
        "mini-css-extract-plugin": "^0.4.2",
        "node-sass": "^4.9.3",
        "optimize-css-assets-webpack-plugin": "^5.0.1",
        "postcss-loader": "^3.0.0",
        "purify-css": "^1.2.5",
        "purifycss-webpack": "^0.7.0",
        "responsive-loader": "^1.1.0",
        "sass-loader": "^7.1.0",
        "sharp": "^0.20.8",
        "style-loader": "^0.23.0",
        "uglifyjs-webpack-plugin": "^2.0.1",
        "webpack": "^4.19.1",
        "webpack-cli": "^3.1.0"
    }
}
