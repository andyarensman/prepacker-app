// images
import hikerGreenSnowy from '../images/hikers-green-snowy.jpg'
import gearAll from '../images/gear-all.jpg'
import tentSunset from '../images/tent-sunset.jpg'
import mountaineer from '../images/mountaineer.jpg'

//css modules
import HomeCSS from '../styles/Home.module.css'

const Home = () => {
  return ( 
    <div className={HomeCSS.page}>
      <div className={HomeCSS.gridContainer}>
        <div className={HomeCSS.textContainer}>
          <h1>Pack Your Next Trip</h1>
          <p><i>- Helping hikers and backpackers stay organized -</i></p>
          <p>Never forget that important item!</p>
          <button className={HomeCSS.button}>Signup</button>
        </div>
        <img src={hikerGreenSnowy} alt="" className=""/>
      </div>
      
      {/* Features */}
      <div className={HomeCSS.gridContainer}>
        <img src={mountaineer} alt="" className=""/>
        <div className={HomeCSS.textContainer}>
          <h2>Create Checklists</h2>
          <ul className={HomeCSS.noBottom}>
            <li>Plan out exactly what you'll need to bring on your next adventure</li>
            <li>Automatically see how much your pack could weigh</li>
            <li>Easily adjust your list to make the perfect trip</li>
            <li>Save and edit lists to remember what did and didn't work</li>
          </ul>
        </div>
      </div>
      <div className={HomeCSS.gridContainer}>
        <div className={HomeCSS.textContainer}>
          <h2>Upload Your Gear</h2>
          <ul className={HomeCSS.noBottom}>
            <li>Store a digital record of each piece of gear so you can quickly plan your next trip</li>
            <li>Track weight, category, price, and more</li>
            <li>Upload data directly from other websites to save time</li>
          </ul>
        </div>
        <img src={gearAll} alt="" className=""/>
      </div>
      
      <div className={HomeCSS.finalCall}>
        <h2>What are you waiting for?</h2>
        <button className={HomeCSS.button}>Start PrePacking!</button>
        <br />
        <img src={tentSunset} alt="" className=""/>
      </div>
    </div>
   );
}
 
export default Home;