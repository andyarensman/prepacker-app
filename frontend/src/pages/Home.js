// images
import hikerGreenSnowy from '../images/hikers-green-snowy.jpg'
import gearAll from '../images/gear-all.jpg'
import tentSunset from '../images/tent-sunset.jpg'
import mountaineer from '../images/mountaineer.jpg'

//css modules
import HomeCSS from '../styles/Home.module.css'

const Home = () => {
  return ( 
    <div>
      <div className={HomeCSS.gridContainer}>
        <div>
          <h2>Pack Your Next Trip</h2>
          <p>Helping hikers and backpackers stay organized</p>
          <p>Don't forget that important item!</p>
          <button>Signup</button>
        </div>
        <img src={hikerGreenSnowy} alt="" className=""/>
      </div>
      <div>
        {/* Features */}
        <div>
          <h3>Create Checklists</h3>
          <p>Plan out exactly what you'll need to bring on your next adventure</p>
          <img src={mountaineer} alt="" className=""/>
        </div>
        <div>
          <h3>Upload Your Gear</h3>
          <p>Store a digital record of your gear so you can quickly plan your next trip</p>
          <img src={gearAll} alt="" className=""/>
        </div>
      </div>
      <div>
        <h3>What are you waiting for?</h3>
        <button>Start PrePacking!</button>
        <img src={tentSunset} alt="" className=""/>
      </div>
    </div>
   );
}
 
export default Home;