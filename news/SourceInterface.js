import pkg from 'implement-js'
const { Interface, type } = pkg
const NewsSourceInterface = Interface( 'NewsSource' )( {
  name: type( 'string' ),
  address: type( 'string' ),
  selectors: type('array', [type( 'string')]),
  getArticles: type( 'function' )
}, {
  error: true,
  strict: true
} )

// const NewsSourceInterface = new Interface('getArticles')
export default NewsSourceInterface

// const sourceInfo = [
//   {
//     name: "acousticguitar",
//     address: "http://acousticguitar.com",
    
//   },
//   {
//     name: "guitarworld",
//     address: "http://guitarworld.com"
//   },
//   {
//     name: "guitarplayer",
//     address: "http://guitarplayer.com"
//   },
//   {
//     name: "guitargirlmag",
//     address: "http://guitargirlmag.com"
//   }
// ]
