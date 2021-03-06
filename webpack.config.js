var project = require("./package.json");
var path = require("path");
var { VueLoaderPlugin } = require("vue-loader");

// Return the configuration
module.exports = (env, argv) => {
    return {
        // Set the main source as the entry point
        entry: path.resolve(__dirname, project.main),

        // Output location
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: project.name + (argv.mode === "production" ? ".min" : "") + ".js"
        },

        // Resolve the file names
        resolve: {
            extensions: [".js", ".css", ".scss", ".ts", ".vue"]
        },

        // Dev Server
        devServer: {
            inline: true,
            hot: true,
            open: true,
            publicPath: "/dist/"
        },

        // Plugins
        plugins: [
            new VueLoaderPlugin()
        ],

        // Loaders
        module: {
            rules: [
                // SASS to JavaScript
                {
                    // Target the sass and css files
                    test: /\.s?css$/,
                    // Define the compiler to use
                    use: [
                        // Create style nodes from the CommonJS code
                        { loader: "style-loader" },
                        // Translate css to CommonJS
                        { loader: "css-loader" },
                        // Compile sass to css
                        { loader: "sass-loader" }
                    ]
                },
                // TypeScript to JavaScript
                {
                    // Target TypeScript files
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        // JavaScript (ES5) -> JavaScript (Current)
                        {
                            loader: "babel-loader",
                            options: { presets: ["@babel/preset-env"] }
                        },
                        // TypeScript -> JavaScript (ES5)
                        { loader: "ts-loader" }
                    ]
                },
                // VueJS
                {
                    // Target VueJS files
                    test: /\.vue$/,
                    // Vue Template -> JavaScript
                    loader: "vue-loader"
                }
            ]
        }
    };
}