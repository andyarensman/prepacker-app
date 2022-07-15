const GearScraper = () => {
  return (
    <form className="scrape">
      <h3>Import from Webpage</h3>
      <label>REI Web Address:</label>
      <input type="url" />
      <button>Find Gear</button>
    </form>
  );
}
 
export default GearScraper;