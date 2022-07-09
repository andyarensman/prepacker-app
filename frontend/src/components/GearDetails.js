// TODO: Need to add any other gear information here. Images, etc.

const GearDetails = ({ gear }) => {
  return ( 
    <div className="gear-details">
      <h4>{gear.gear_name}</h4>
      {gear.weight && <p><strong>Weight (lbs): </strong>{gear.weight}</p>}
      {gear.price && <p><strong>Price ($): </strong>{gear.price}</p>}
      {gear.createdAt}
    </div>
   );
}
 
export default GearDetails;