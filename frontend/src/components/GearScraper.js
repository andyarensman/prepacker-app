const GearScraper = ({url_scrape, setUrlScrape, setGearName, setPounds, setOunces, setPrice}) => {

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
    //TODO: make sure they can only use rei.com links
    const url = {url_scrape}

    const scrapeResponse = await fetch('/api/closet/scrape-gear', {
      method: 'POST',
      body: JSON.stringify(url),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    //TODO: Get data to frontend and handle it
    const jsonScrapeObj = await scrapeResponse.json()
    console.log(jsonScrapeObj)
    setGearName(jsonScrapeObj.gear_name)
    handleWeight(jsonScrapeObj.gear_weight_ounces)

    
  }

  return (
    <form className="scrape" onSubmit={handleUrlSubmit}>
      <h3>Import from Webpage</h3>
      <label>REI Web Address:</label>
      <input 
        type="url"
        onChange={(e) => setUrlScrape(e.target.value)}
        value={url_scrape}
      />
      <button>Find Gear</button>
    </form>
  );
}
 
export default GearScraper;