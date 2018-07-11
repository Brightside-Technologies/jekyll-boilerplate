Opiniated Jekyll boilerplate for static websites deployed to Netlify. If not using Netlify, disregard `netlify.toml`.

**Note** : assumes all site javascript exists in site.js. Bundling is only done for vendors

# Features
* Includes Bootrstrap 4 and jQuery
* Uses Browserify as a vendors bundler
* Build scripts
  * Minify css (gulp-clean-css)
  * Auto prefix css (gulp-autoprefixer)
  * Minify js (gulp-uglify)
  * Minify html (gulp-htmlmin)
  * Optimize images (gulp-imagemin)
 * Includes netlify.toml for configuration
 * Includes Open Graph, Twitter, and SEO tags
 * Google Analytics script
 * Emoji support via `jemoji` jekyll plugin
 * Cross-browser line-clamping using pure css
  
  
  # TODO
  * Remove dead css with `css-purify`
  * Add cache busting to build script
  * ~Strip vendor comments (gulp-strip-comments)~ This is done by the minification process.
  * Add support for `srcset` andn `image-set()` with appropriate fallbacks as needed 
    * Currently in development. Solution includes `gulp-responsive` to generate different versions of image and a jekyll include as a template to generate the `<img>` tage or `div` with in-line `image-set()` style for background images
  * Add site map
  * Add `normalize.css`
  * Explore oEmbed support
  
