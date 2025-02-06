import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons bubble">
        <div className="social-icon">
          <img src="/images/fb-icon.png" alt="facebook" />
        </div>
        <div className="social-icon">
          <img src="/images/x-icon.png" alt="x" />
        </div>
        <div className="social-icon">
          <img src="/images/ig-icon.png" alt="instagram" />
        </div>
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/about-us">About Us</Link>
        </li>
        <li>
          <Link href="/faq">FAQ</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      <div className="signup-container">
        <form action="#" method="post">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <p className="copyright">&copy; 2024 kolliflower. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
