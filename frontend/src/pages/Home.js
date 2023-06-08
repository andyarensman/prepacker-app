import { useState } from "react";
import { useNavigate } from "react-router-dom";

// context
import { useAuthContext } from "../hooks/useAuthContext";

// components
import SignupModal from "../components/navbar/SignupModal";

// css modules
import HomeCSS from "../styles/Home.module.css";

// images
import hikerGreenSnowy from "../images/hikers-green-snowy.jpg";
import gearAll from "../images/gear-all.jpg";
import tentSunset from "../images/tent-sunset.jpg";
import mountaineer from "../images/mountaineer.jpg";
import demo1 from "../images/demo1.gif";
import demo2 from "../images/demo2.gif";

const Home = () => {
  const [hiddenSignup, setHiddenSignup] = useState(true);

  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className={HomeCSS.page}>
      <div className={`${HomeCSS.gridContainer} ${HomeCSS.center}`}>
        <div className={HomeCSS.textContainer}>
          <h1>Pack Your Next Trip</h1>
          <p>
            <i>- Helping hikers and backpackers stay organized -</i>
          </p>
          <p>Never forget that important item!</p>
          {!user && (
            <button
              className={HomeCSS.button}
              onClick={() => setHiddenSignup(false)}
            >
              Sign Up!
            </button>
          )}
          {user && (
            <button
              className={HomeCSS.button}
              onClick={() => navigate("/new-list")}
            >
              Get Started!
            </button>
          )}
        </div>
        <img
          src={hikerGreenSnowy}
          alt="Backpackers heading towards a snowy mountain from a green meadow"
        />
      </div>

      {/* Features */}
      <div className={HomeCSS.gridContainer}>
        <img
          src={mountaineer}
          alt="A mountaineer carrying an ice axe, rope, poles, and other gear posing next to a glacier"
        />
        <div className={`${HomeCSS.textContainer} ${HomeCSS.orderChange}`}>
          <h2>Create Checklists</h2>
          <ul className={HomeCSS.noBottom}>
            <li>
              Plan out exactly what you'll need to bring on your next adventure
            </li>
            <li>Automatically see how much your pack could weigh</li>
            <li>Easily adjust your list to make the perfect trip</li>
            <li>Save and edit lists to remember what did and didn't work</li>
          </ul>
        </div>
      </div>

      <div className={HomeCSS.gifContainer}>
        <div className={HomeCSS.gifInsideContainer}>
          <img src={demo1} alt="Demo of the checklist creator" />
        </div>
      </div>

      <div className={HomeCSS.gridContainer}>
        <div className={HomeCSS.textContainer}>
          <h2>Upload Your Gear</h2>
          <ul className={HomeCSS.noBottom}>
            <li>
              Store a digital record of each piece of gear so you can quickly
              plan your next trip
            </li>
            <li>Track weight, category, price, and more</li>
            <li>Upload data directly from other websites to save time</li>
          </ul>
        </div>
        <img
          src={gearAll}
          alt="A backpacker's gear neatly organized on a wooden floor"
        />
      </div>

      <div className={HomeCSS.gifContainer}>
        <div className={HomeCSS.gifInsideContainer}>
          <img src={demo2} alt="Demo of the gear closet" />
        </div>
      </div>

      <div className={HomeCSS.finalCall}>
        <h2>What are you waiting for?</h2>
        {!user && (
          <button
            className={HomeCSS.button}
            onClick={() => setHiddenSignup(false)}
          >
            Start PrePacking!
          </button>
        )}
        {user && (
          <button
            className={HomeCSS.button}
            onClick={() => navigate("/new-list")}
          >
            Start PrePacking!
          </button>
        )}
        <br />
        <img src={tentSunset} alt="Sunset behind a campsite with tent setup" />
      </div>
      <SignupModal
        hiddenSignup={hiddenSignup}
        setHiddenSignup={setHiddenSignup}
      />
    </div>
  );
};

export default Home;
