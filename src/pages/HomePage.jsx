import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import bgImage from "../assets/image.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const slides = [
  { url: bgImage,      caption: "SmartQ System" },
  { url: "https://media.getmyuni.com/azure/college-images-test/sri-vasavi-engineering-college-svec-tadepalligudam/2c8c943a70a94d059bc97ba5ffdb71db.jpeg", caption: "Smart Booking" },
  { url: "https://www.collegechalo.com/news/wp-content/uploads/2023/04/Sri-Vasavi-Engineering-College-Tadepalligudem.jpg",        caption: "Admin Made Easy" },
];
export default function HomePage() {
  const [idx, setIdx] = useState(0);
  return (
    <div
      className="relative min-h-screen text-white font-sans transition-all duration-700 ease-in-out"
      style={{
        backgroundImage: `url(${slides[idx].url})`,
        backgroundSize:    "cover",
        backgroundPosition:"center",
        backgroundRepeat:  "no-repeat",
        filter:            "brightness(1.4) contrast(0.85)",
      }}
    >
      <div className="relative z-10 bg-black bg-opacity-40 min-h-screen flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between items-center p-6">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="SmartQ Logo"
              className="w-12 h-12 rounded-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <h1 className="text-4xl font-bold drop-shadow-lg">SmartQ</h1>
          </div>
          <nav className="flex gap-4">
            <Link
              to="/register"
              className="bg-white text-black px-4 py-2 rounded-md font-semibold shadow hover:bg-gray-200 transition"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="bg-white text-black px-4 py-2 rounded-md font-semibold shadow hover:bg-gray-200 transition"
            >
              Login
            </Link>
          </nav>
        </header>

        {/* Hero / Carousel */}
        <main className="flex-1 flex flex-col justify-center items-center text-center px-4">
          <div className="w-full max-w-2xl mb-6">
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              autoPlay
              interval={5000}
              onChange={setIdx}
              showArrows={false}
              swipeable
              emulateTouch
            >
              {slides.map((s, i) => (
                <div key={i}>
                  <p className="legend text-xl font-semibold">{s.caption}</p>
                </div>
              ))}
            </Carousel>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to SmartQ!
          </h2>
          <p className="text-lg sm:text-xl max-w-2xl mb-8 drop-shadow">
            A smart and simple way for <span className="font-semibold">students</span> to book
            appointment slots for administrative tasks — no more long queues!
          </p>
          <Link
            to="/register"
            className="bg-white text-black font-bold text-lg px-6 py-3 rounded-full hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
        </main>
        {/* Footer */}
        <footer className="text-center p-4 text-white shadow-inner bg-transparent">
          &copy; {new Date().getFullYear()} SmartQ | Made for Students
        </footer>
      </div>
    </div>
  );
}