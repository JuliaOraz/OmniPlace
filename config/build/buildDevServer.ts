import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port ?? 3000,
    open: true,
    // если раздавать статику через nginx, то надо делать проксирование на index.html
    historyApiFallback: true, // для одностраничного приложения, когда навигация по js (используется History API) вместо 404 страниц
  };
}
