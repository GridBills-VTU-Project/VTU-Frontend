import logo from "@/../public/logo.png"
import facebook from "@/../public/facebook.png"
import twitter from "@/../public/twitter.png"
import linkedin from "@/../public/linkedin.png"
import instagram from "@/../public/instagram.png"
import Image from "next/image"
const Footer = () => {
  return (
    <div className="bg-footer text-white p-4 w-full">
      <div className="w-[80%] mx-auto p-5 max-mobile:w-full">
        
          <Image src={logo} width={50} height={50} alt="Grid Bills logo" className=""/>
          <p className="text-sm mb-4">GRIDBILLS</p>
        <div className="justify-between flex flex-wrap gap-4">
          <div>

          <h4 className="font-bold mb-2">
            Earn with Gridbills
          </h4>
          <ul className="text-xs flex flex-col gap-4">
            <li>Become an Agent</li>
            <li>Start earning</li>
            <li>Terms and Conditions</li>
            <li>Privacy and Policy</li>
          </ul>
          </div>
          <div>

          <h4 className="font-bold mb-2">
            About
          </h4>
          <ul className="text-xs flex flex-col gap-4">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>FAQ</li>
          </ul>
          </div>
          <div>

          <h4 className="font-bold mb-2">
            Contact Us
          </h4>
          <p className="text-xs">133H Trans-Amadi Industrial Layout Aberdin Yard Port Harcourt</p>
          </div>
          <div>

          <h4 className="font-bold mb-2">
            Socials
          </h4>
          <ul className="text-xs flex gap-2">
            <li><Image className="w-[32px] hover:cursor-pointer " src={facebook} width={50} height={50} alt="facebook icon"/></li>
            <li><Image className="w-[32px] hover:cursor-pointer " src={twitter} width={50} height={50} alt="twitter icon"/></li>
            <li><Image className="w-[32px] hover:cursor-pointer " src={instagram} width={50} height={50} alt="instagram icon"/></li>
            <li><Image className="w-[32px] hover:cursor-pointer " src={linkedin} width={50} height={50} alt="linkedin icon"/></li>
          </ul>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Footer