Opiniated Jekyll boilerplate for static websites deployed to Netlify. If not using Netlify, disregard `netlify.toml`.

# Features
-  Supports ES6
-   Includes Bootrstrap 4 and jQuery
-   Uses Webpack 4
    - minify css with `optimize-css-assets-webpack-plugin`
    - minify js with `uglifyjs-webpack-plugin`
    - generates responsive images with `responsive-loader`
    - css autoprefixes with `autoprefixer`
-   Supports scss through Webpack
-   Includes `netlify.toml` for Netlify deployment configurations
-   Includes Open Graph, Twitter, and SEO tags
-   Google Analytics script
-   Emoji support via `jemoji` jekyll plugin
-   Cross-browser line-clamping using pure css
-   Includes `normalize.css`
-   Auto-generated `sitemap.xml` via `jekyll-sitemap`
-   Cache busting through `gulp-buster`
-   Includes `robots.txt`

# TODO
-   explore purgecss webpack plugin
-   Add optional rss feed
-   Explore oEmbed support
