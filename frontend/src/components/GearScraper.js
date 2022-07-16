import { useState } from "react";

const GearScraper = () => {

  const [url_scrape, setUrlScrape] = useState('')

  const handleUrlSubmit = async (e) => {
    e.preventDefault()

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