import { BuildOptions } from "./types/types";
import { buildPlagins } from "./buildPlagins";
import { buildLoaders } from "./buildLoaders";
import { buildResolves } from "./buildResolves";
import { buildDevServer } from "./buildDevServer";
import webpack from "webpack";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, port, paths } = options;
  const isDev = mode === "development";

  return {
    mode: mode ?? "development",
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    devtool: isDev && "inline-source-map",
    plugins: buildPlagins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolves(options),
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
