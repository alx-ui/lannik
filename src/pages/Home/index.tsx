import { useEffect, useState } from 'react';
import {
  FaTwitch,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';

import lannikImg from 'assets/lannik.jpg';

import { authTwitch } from 'services/auth/authentication';
import { getStreamer } from 'services/get/streamer';

import './styles.scss';

const LANNIK1 = import.meta.env.VITE_LANNIK_ID;

export function Homepage() {
  const [stream, setStream] = useState(null);

  useEffect(() => {
    async function auth() {
      const { data } = await authTwitch();

      localStorage.setItem('@lannik:token', data.access_token);
    }

    auth();
  }, []);

  useEffect(() => {
    async function getStream() {
      const { data } = await getStreamer(LANNIK1);

      setStream(data.data[0]);
    }

    getStream();
  }, []);

  return (
    <>
      <body className="fadeIn">
        <div id="container-link">
          <img className="profile profile_links" src={lannikImg} alt="Lannik" />

          <div className="links-container">
            <span className="description">
              Brota! <span className="waving-hand">🚩</span>
            </span>

            {stream && (
              <a
                className="links link-live-on"
                href="https://www.twitch.tv/lannik1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitch className="logo" />
                Live ON
              </a>
            )}

            {!stream && (
              <a
                className="links link-twitch"
                href="https://www.twitch.tv/lannik1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitch className="logo" />
                Twitch
              </a>
            )}

            <a
              className="links link-instagram"
              href="https://www.instagram.com/lannik1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="logo" />
              Instagram
            </a>

            <a
              className="links link-tiktok"
              href="https://www.tiktok.com/@lannik_"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="logo" />
              TikTok
            </a>
            <a
              className="links link-youtube"
              href="https://www.youtube.com/channel/UCa0N0FY-lynXLdKStJIimlw?view_as=subscriber"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="logo" />
              Youtube
            </a>
            <a
              className="links link-twitter"
              href="https://twitter.com/Lannik_"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="logo" />
              Twitter
            </a>
          </div>
        </div>
      </body>
    </>
  );
}
