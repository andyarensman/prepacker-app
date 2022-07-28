const GearScraper = ({url_scrape, setUrlScrape, setGearName, setPounds, setOunces, setCategory, setUrl, setPrice, setImageUrl, scraperError, setScraperError, setError, setEmptyFields}) => {

  const handleWeight = (weight) => {
    let pounds = Math.floor(weight/16)
    let ouncesNoRound = (weight - (Math.floor(weight/16))*16)
    let ounces = Math.round(ouncesNoRound * 10) / 10

    if (pounds !== 0 && ounces !== 0) {
      setPounds(pounds)
      setOunces(ounces)
      return
    }
    if (pounds === 0 && ounces !== 0) {
      setOunces(ounces)
    }
    if (pounds !== 0 && ounces === 0) {
      setPounds(pounds)
    }
  }

  const handleUrlSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setEmptyFields([])

    const urlReiRegex = /^(https:\/\/www\.rei\.com\/product\/)/i

    // Make sure only rei links are allowed
    if (urlReiRegex.test(url_scrape)) {
      const url = {url_scrape}

      // Get data to frontend
      const scrapeResponse = await fetch('/api/closet/scrape-gear', {
        method: 'POST',
        body: JSON.stringify(url),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // Update state with new data
      const jsonScrapeObj = await scrapeResponse.json()
      // console.log(jsonScrapeObj)

      if (jsonScrapeObj.gear_name) {
        setGearName(jsonScrapeObj.gear_name)
      }
      if (jsonScrapeObj.gear_weight_ounces) {
        handleWeight(jsonScrapeObj.gear_weight_ounces)
      }
      if (jsonScrapeObj.category) {
        setCategory(jsonScrapeObj.category)
      }
      setUrl(url_scrape)
      if (jsonScrapeObj.price) {
        setPrice(jsonScrapeObj.price)
      }
      if (jsonScrapeObj.gear_image_url) {
        setImageUrl(jsonScrapeObj.gear_image_url)
      }
      // setUrlScrape('')
      setScraperError(false)
    } else {
      setScraperError(true)
    }
    
  }

  return (
    <form className="scrape" onSubmit={handleUrlSubmit}>
      <h3>Import from Webpage</h3>
      <label>REI Web Address:</label>
      <input 
        type="url"
        onChange={(e) => setUrlScrape(e.target.value)}
        value={url_scrape}
        className={scraperError ? 'error' : ''}
      />
      <button>Find Gear</button>
      {scraperError && <div className="error">Must begin with: https://www.rei.com/product/</div>}
    </form>
  );
}
 
export default GearScraper;