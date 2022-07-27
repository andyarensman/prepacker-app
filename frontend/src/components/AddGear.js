import { useState } from "react";
import GearForm from "./GearForm";
import GearScraper from "./GearScraper";

const AddGear = () => {
  const [gear_name, setGearName] = useState('')
  const [pounds, setPounds] = useState('')
  const [ounces, setOunces] = useState('')
  const [url, setUrl] = useState('')
  const [price, setPrice] = useState('')
  const [image_url, setImageUrl] = useState('')
  const [error, setError] = useState(null)
  const [scraperError, setScraperError] = useState(false)
  const [emptyFields, setEmptyFields] = useState([])
  const [url_scrape, setUrlScrape] = useState('')

  return ( 
    <div>
      <GearScraper
        url_scrape={url_scrape}
        setUrlScrape={setUrlScrape} 
        setGearName={setGearName}
        setPounds={setPounds}
        setOunces={setOunces}
        setUrl={setUrl}
        setPrice={setPrice}
        setImageUrl={setImageUrl}
        scraperError={scraperError}
        setScraperError={setScraperError}
        setError={setError}
        setEmptyFields={setEmptyFields}
      />
      <GearForm 
        gear_name={gear_name}
        setGearName={setGearName}
        pounds={pounds}
        setPounds={setPounds}
        ounces={ounces}
        setOunces={setOunces}
        url={url}
        setUrl={setUrl}
        price={price}
        setPrice={setPrice}
        image_url={image_url}
        setImageUrl={setImageUrl}
        error={error}
        setError={setError}
        emptyFields={emptyFields}
        setEmptyFields={setEmptyFields}
        setUrlScrape={setUrlScrape}
        setScraperError={setScraperError}
      />
    </div>
   );
}
 
export default AddGear;