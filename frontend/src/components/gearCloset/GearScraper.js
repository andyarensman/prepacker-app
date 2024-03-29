// css modules
import GearFormCSS from '../../styles/gearCloset/GearForm.module.css'

// hooks/context
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'


const GearScraper = ({url_scrape, setUrlScrape, setGearName, setPounds, setOunces, setCategory, setUrl, setPrice,/* setImageUrl,*/ scraperError, setScraperError, setError, setEmptyFields}) => {

  const { user } = useAuthContext()
  const { logout } = useLogout()

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

    if (!user) {
      setError('You must be logged in')
      return
    }
    
    setError(null)
    setEmptyFields([])

    const urlReiRegex = /^(https:\/\/www\.rei\.com\/product\/)/i

    // Make sure only rei links are allowed
    if (urlReiRegex.test(url_scrape)) {
      const url = {url_scrape}

      // Get data to frontend
      const scrapeResponse = await fetch(process.env.REACT_APP_BACKEND + '/api/closet/scrape-gear', {
        method: 'POST',
        body: JSON.stringify(url),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })

      // Update state with new data
      const jsonScrapeObj = await scrapeResponse.json()
      // console.log(jsonScrapeObj)

      // checks if access token is still good
      if (scrapeResponse.status === 401) {
        logout()
      }

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
      /*if (jsonScrapeObj.gear_image_url) {
        setImageUrl(jsonScrapeObj.gear_image_url)
      }*/
      
      setUrlScrape('')
      setScraperError(false)
    } else {
      setScraperError(true)
    }
    
  }

  return (
    <form className={GearFormCSS.scrape} onSubmit={handleUrlSubmit}>
      <h3>Import from Webpage</h3>
      <label htmlFor='scraper'>REI Web Address</label>
      <div className={GearFormCSS.scrapeInput}>
        <input 
          type="url"
          onChange={(e) => setUrlScrape(e.target.value)}
          value={url_scrape}
          className={scraperError ? 'error' : ''}
          id="scraper"
        />
        <button>Find Gear</button>
      </div>
      {scraperError && <div className="error">Must begin with: https://www.rei.com/product/</div>}
    </form>
  );
}
 
export default GearScraper;