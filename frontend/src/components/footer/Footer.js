// css modules
import FooterCSS from '../../styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className={FooterCSS.footer}>
      <p>Created by Andy Arensman</p>
      <p><a href="https://github.com/andyarensman/prepacker-app" target="blank">About/GitHub Repo</a></p>
      
    </footer>
  );
}
 
export default Footer;