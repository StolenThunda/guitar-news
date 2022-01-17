export default class NewsSource {
  constructor( defaults ) {
    this.sourceID = defaults.sourceID || 'shortNameForSite'
    this.address = defaults.address || 'siteURL'
    this.proper = defaults.proper || 'Proper Name Of Site'
    this.articles = []
  }

  getArticles ( obj ) {
    console.error( 'This function must be implemented' )
    return null
  }
}

