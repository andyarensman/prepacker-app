import { useState } from "react";
import GearForm from "./GearForm";
import GearScraper from "./GearScraper";

const AddGear = () => {
  const [gear_name, setGearName] = useState('')
  const [pounds, setPounds] = useState('')
  const [ounces, setOunces] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState(null)
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
        setPrice={setPrice}
      />
      <GearForm 
        gear_name={gear_name}
        setGearName={setGearName}
        pounds={pounds}
        setPounds={setPounds}
        ounces={ounces}
        setOunces={setOunces}
        price={price}
        setPrice={setPrice}
        error={error}
        setError={setError}
        emptyFields={emptyFields}
        setEmptyFields={setEmptyFields}
      />
    </div>
   );
}
 
export default AddGear;