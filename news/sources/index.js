// import camelCase from "lodash/camelCase";

const requireSource = require.context(".", false, /\.js$/); //extract js files inside Sources folder
const Sources = {};

requireSource.keys().forEach(fileName => {
  if (fileName === "./index.js") return; //reject the index.js file

  // const SourceName = camelCase(fileName.replace(/(\.\/|\.js)/g, "")); //
  const SourceName = fileName.replace(/(\.\/|\.js)/g, ""); //

  Sources[SourceName] = requireSource(fileName).default;
});
export default Sources;
