'use client';
import { useEffect, useState } from 'react';
import { FaXTwitter, FaTwitch, FaInstagram, FaTiktok, FaYoutube, FaDiscord, FaWhatsapp } from 'react-icons/fa6';

import Image from 'next/image';

import papigames from '@/assets/papigames.svg';
import profile from '@/assets/profile.jpg';
import SocialButton from '@/components/social-button';

export default function Home() {
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkTwitchStatus = async () => {
      try {
        const response = await fetch('/api/twitch-status');
        const data = await response.json();
        setIsLive(data.isLive);
      } catch (error) {
        console.error('Erro ao verificar status da Twitch:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkTwitchStatus();
    const interval = setInterval(checkTwitchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700"></div>
        <p className="mt-4 text-sm text-muted-foreground">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center">
      <div className="flex flex-col items-center justify-center w-full max-w-sm p-4 mt-8">
        <div className="relative">
          <Image
            src={profile}
            alt="Lannik1"
            className={`w-48 h-48 rounded-full mb-6 border-4 object-cover ${
              isLive ? 'border-green-500' : 'border-red-500'
            }`}
          />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            {isLive ? (
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">AO VIVO</div>
            ) : (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">OFFLINE</div>
            )}
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-8">@lannik1</h1>

        <SocialButton
          href="https://papigames.bet.br/lannik"
          bgColor="#161a1e"
          icon={<Image src={papigames} alt="Papigames" width={24} height={24} className="text-white" />}
        >
          Papigames
        </SocialButton>

        <SocialButton
          href="https://chat.whatsapp.com/F2kQeOsXctq8ElzhOSzQFx"
          bgColor="#25D366"
          icon={<FaWhatsapp size={24} className="text-white" />}
          className="animate-pulse border-2 border-green-500"
        >
          🎯 BANCAS GRÁTIS
        </SocialButton>

        <SocialButton
          href="https://twitch.tv/lannik1"
          isLive={isLive}
          bgColor="#6441a5"
          icon={<FaTwitch size={24} className="text-white" />}
        >
          {isLive ? '🟢 AO VIVO NA TWITCH' : 'Twitch'}
        </SocialButton>

        <SocialButton
          href="https://x.com/lannik_"
          bgColor="#000000"
          icon={<FaXTwitter size={24} className="text-white" />}
        >
          X (Twitter)
        </SocialButton>

        <SocialButton
          href="https://instagram.com/lannik1"
          bgColor="#E1306C"
          icon={<FaInstagram size={24} className="text-white" />}
        >
          Instagram
        </SocialButton>

        <SocialButton
          href="https://www.tiktok.com/@lannik_"
          bgColor="#000000"
          icon={<FaTiktok size={24} className="text-white" />}
        >
          TikTok
        </SocialButton>

        <SocialButton
          href="https://www.youtube.com/channel/UCa0N0FY-lynXLdKStJIimlw?view_as=subscriber"
          bgColor="#FF0000"
          icon={<FaYoutube size={24} className="text-white" />}
        >
          YouTube
        </SocialButton>

        <SocialButton
          href="https://discord.com/invite/UGA63eHzF2"
          bgColor="#5865F2"
          icon={<FaDiscord size={24} className="text-white" />}
        >
          Discord
        </SocialButton>
      </div>
      <footer className="w-full text-center py-4 text-sm text-muted-foreground mt-auto">
        © {new Date().getFullYear()} Lannik1 by{' '}
        <a href="https://ialexanderbrito.dev" target="_blank" rel="noopener noreferrer">
          ialexanderbrito
        </a>
      </footer>
    </main>
  );
}
