import AcousticGuitar from './acousticGuitar.js'
import GuitarWorld from './guitarWorld.js'
import GuitarPlayer from "./guitarPlayer.js";
import GuitarGirlMag from './guitarGirlMag.js'

export default {
  AcousticGuitar, 
  GuitarWorld, 
  GuitarPlayer, 
  GuitarGirlMag
}

// TODO: Refactor this for autoloading source directory!!!

//#region Autoloading attempt

// import requireContext from "require-context";
// const path = "../../news/sources"
// const requireSource = requireContext( path, false, /\.js$/ ); //extract js files inside Sources folder
// const srcFiles = requireSource.keys()
// let Sources = {}
// let all;

// async function loadSource ( file ) {
//   return await import( file )
//     .then( module => {
//       return module.default;
//     } )
//     .catch( err => console.error( err ) )
// }

// srcFiles.forEach( fileName => {
//   if ( fileName !== "index.js" ) {
//     console.log( 'file: ' + fileName )
//     const SourceName = fileName.replace( /(\.\/|\.js)/g, "" );

//     Sources[SourceName] = loadSource( path + '/' + fileName )
//   }
// } )

// // async function loadSource ( file ) {
// //   const { default: defaultExport } = await import( file )
// //     // .then( module => module.default )
// //     // .catch( err => console.error( err ) )
// //   return defaultExport
// // }
// console.log( 'Sources', Sources )
// export default Sources;

//#endregion