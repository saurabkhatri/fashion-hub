import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const SiteFooter = () => {
  return (
    <footer className="flex flex-col bg-black text-white mt-10">
      <div className="grid sm:grid-cols-3 p-10">
        <div className="space-y-2">
          <h2 className="font-semibold text-xl pb-4">STAY IN TOUCH</h2>
          <div className="flex items-center gap-2 text-sm">
            <MapPin />
            <span>SANKHAMUL, KATHMANDU</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone />
            <span>+977 98689777777</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail />
            <span>saurabkhatri68076@gmail.com</span>
          </div>
        
            <Link to="https://www.instagram.com/saurav_khatri_bae/ " className="flex items-center gap-2 text-sm " >
            <Instagram />
            <span>saurav_khatri_bae</span>
            </Link>
          
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="font-semibold text-xl pb-4">SHOPPINGS</h2>
          <Link to="/">SHOP</Link>
          <Link to="/men">MEN</Link>
          <Link to="/women">WOMEN</Link>
          <Link to="/trending">TRENDING</Link>
        </div>
        <div className="space-y-2">
          <h2 className="font-semibold text-xl pb-4">CUSTOMER SERVICE</h2>
          <p>Privacy Policy</p>
          <p>Terms and Conditions</p>
        </div>
      </div>

      {/*  */}
      <div className="border-t py-4 text-center">
        <span className="text-sm">
          &copy; Copyright 2024. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default SiteFooter;
