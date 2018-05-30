Jekyll boilerplate for static websites deployed to Netlify. If not using Netlify, disregard `netlify.toml`.

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
  
  
  # TODO
  * Add css purify
  * Strip vendor comments (gulp-strip-comments)
  * Create multiple versions of images for `srcset` (gulp-responsive)
  * Add site map
  * Add oEmbed support ?
  
