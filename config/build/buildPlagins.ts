import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, { Configuration, DefinePlugin } from "webpack";
import { BuildOptions } from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

export function buildPlagins({
  mode,
  paths,
  analyzer,
  platform,
}: BuildOptions): Configuration["plugins"] {
  const isDev = mode === "development";
  const isProd = mode === "production";

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, "favicon.ico"),
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
    }),
  ];

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());
    plugins.push(
      // Выносит проверку типов в отдельный процесс - не нагружая сборку
      new ForkTsCheckerWebpackPlugin()
    );
    plugins.push(
      // Плагин Webpack для включения «быстрого обновления» (также известного как «горячая перезагрузка») для компонентов React.
      new ReactRefreshWebpackPlugin()
    );
  }
  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
    plugins.push(
      // Позволяет компилировать файлы в папку build - из указанной папки в указанную
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(paths.public, "locales"),
            to: path.resolve(paths.output, "locales"),
          },
        ],
      })
    );
  }
  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }
  return plugins;
}
