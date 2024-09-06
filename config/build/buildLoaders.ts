import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin"; // - позволяет отдельно генерировать файл css при сборке
import ReactRefreshTypeScript from "react-refresh-typescript";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";

  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  // const tsLoader = {
  //   //ts loader умеет работать с JSX
  //   // Если бы мы не использовали type script, то нужен был бы babel-loader
  //   test: /\.tsx?$/,
  //   use: [
  //     {
  //       loader: "ts-loader",
  //       options: {
  //         transpileOnly: true, //ускоряет компиляцию за счет остановки проверки типов
  //         getCustomTransformers: () => ({
  //           before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
  //         }), // для автоматической перезагрузки
  //       },
  //     },
  //   ],
  //   exclude: /node_modules/,
  // };

  const babelLoader = buildBabelLoader(options);

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  return [scssLoader, babelLoader, assetLoader, svgrLoader];
}
