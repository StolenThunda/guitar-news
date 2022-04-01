const http = require("http");
const hmr = require("node-hmr");
const PORT = process.env.PORT || 5000

let app;

hmr(
  () => {
    app = require("./app");
  },
  { watchDir: "./", watchFilePatterns: ["**/*.js", "**/*.html", "**/**/*.json"] }
);

const server = http.createServer((req, res) => app(req, res));
server.listen(PORT);
