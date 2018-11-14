const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const glob = require("glob");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
//const Dotenv = require("dotenv-webpack")

module.exports = {
    entry: "./site.js",
    context: path.resolve(__dirname, "root/src"),
    output: {
        filename: "site.[contentHash].js",
        path: path.resolve(__dirname, "root/jekyll")
    },
    mode: "production",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /\.(jpe?g|png)$/i,
                loader: "responsive-loader",
                options: {
                    sizes: [500, 750, 1000],
                    adapter: require("responsive-loader/sharp"),
                    name: "assets/images/[name]-[hash]-[width].[ext]",
                    placeholder: true
                }
            }
            // {
            //     test: /\.html$/,
            //     use: {
            //         loader: "html-loader",
            //         options: {
            //             interpolate: true
            //         }
            //     }
            // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["root/jekyll/*.js", "root/jekyll/*.css", "root/jekyll/*.map",  "root/jekyll/assets/images/*"], {}),
        new MiniCssExtractPlugin({
            filename: "site.[contentHash].min.css"
        }),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, "root/jekyll/**/*.html"))
        }),
        new HtmlWebpackPlugin({
            inject: true,
            //hash: true,
            template: "./templates/layout.tmpl.html",
            filename: path.resolve(__dirname, "root/jekyll/_layouts/layout.html")
        }),
        new HtmlWebpackPlugin({
            inject: false,
            //hash: true,
            template: "./templates/images-metadata.tmpl.js",
            filename: path.resolve(__dirname, "root/jekyll/_data/images-metadata.json")
        }),
        new HtmlWebpackPlugin({
            inject: false,
            //hash: true,
            template: "./templates/srcset.tmpl.js",
            filename: path.resolve(__dirname, "root/jekyll/_includes/img_srcset.html")
        })
        //new CopyWebpackPlugin([{ from: "root/src/assets/images/favicon.ico", to: "root/jekyll/assets/images" }])
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        inline: false
                    }
                }
            })
        ]
    }
};
