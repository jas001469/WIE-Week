import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

import ieeeLogo from './images/IEEE logo1.png';
import wieLogo from './images/WIE.png';

import sponsorA from './images/sponsor1.jpg';
import sponsorB from './images/sponsor2.jpg';

import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const sponsors = [
  { name: 'CloudyML', image: sponsorA },
  { name: 'Unstop', image: sponsorB }
];

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="header">
          <div className="logos">
            <img src={ieeeLogo} alt="IEEE Logo" className="logo-img" />
          </div>

          <div className="title-container">
            <h1 className="title">WIE WEEK</h1>
            <h1 className="subtitle">ClueQuest</h1>
          </div>

          <div className="wie-logo-right">
            <img src={wieLogo} alt="WIE Logo" className="logo-img" />
          </div>
        </div>
      </div>

      {/* ✅ Updated Sponsor Section */}
      <div className="sponsor-container">
        <h2 className="sponsor-heading">Sponsors</h2>
        <div className="sponsor-grid">
          {sponsors.map((sponsor, index) => (
            <div className="sponsor-card" key={index}>
              <img
                src={sponsor.image}
                alt={sponsor.name}
                className="sponsor-img"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="brief-container">
        <h2>GAME BRIEF</h2>
        <p>
          Players are recruited as agents by a secret women-led underground
          organization called <strong>The Aegis</strong> to stop a rogue AI,{' '}
          <strong>Nemora</strong>, from initiating a devastating cyberwar.
        </p>
        <p>
          The game is structured as a <strong>multi-level cryptic hunt</strong>,
          where each level increases in difficulty, mirroring the growing
          complexity of the mission.
        </p>
        <p>
          An AI assistant named <strong>ECHO</strong> acts as a guide throughout
          the game:
        </p>
        <ul>
          <li>Presents riddles/clues as pop-up messages</li>
          <li>Gives hints after 3 wrong attempts</li>
          <li>Offers storyline continuity and immersive interaction</li>
        </ul>
        <div className="link-container">
          <Link to="/Story" className="level-link">
            START GAME
          </Link>
        </div>
      </div>

      <footer className="footer">
        <div className="social-icons">
          <a
            href="https://www.instagram.com/ieeegtbit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/company/ieee-student-branch-at-gtbit/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} IEEE-GTBIT. All rights reserved.
        </p>
        <p className="footer-text">Created by IEEE-GTBIT</p>
      </footer>
    </>
  );
};

export default Home;