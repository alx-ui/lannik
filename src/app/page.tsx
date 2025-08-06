'use client';
import { useEffect, useState } from 'react';
import { FaXTwitter, FaTwitch, FaInstagram, FaTiktok, FaYoutube, FaDiscord, FaWhatsapp } from 'react-icons/fa6';

import Image from 'next/image';

import kick from '@/assets/kick.png';
import onabet from '@/assets/onabet.png';
import profile from '@/assets/profile.jpg';
import { Pulse } from '@/components/pulse';
import { Skeleton } from '@/components/skeleton';
import SocialButton from '@/components/social-button';
import SocialButtonSquare from '@/components/social-button-square';

export default function Home() {
  const [isLiveTwitch, setIsLiveTwitch] = useState(false);
  const [isLiveKick, setIsLiveKick] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkTwitchStatus = async () => {
      try {
        const response = await fetch('/.netlify/functions/twitchStatus');
        const data = await response.json();
        setIsLiveTwitch(data.isLive);
      } catch (error) {
        console.error('Erro ao verificar status da Twitch:', error);
        setIsLiveTwitch(false);
      } finally {
        setIsLoading(false);
      }
    };

    const checkKickStatus = async () => {
      try {
        const response = await fetch('/.netlify/functions/kickStatus');
        const data = await response.json();
        setIsLiveKick(data.isLive);
      } catch (error) {
        console.error('Erro ao verificar status da Kick:', error);
        setIsLiveKick(false);
      }
    };

    checkTwitchStatus();
    checkKickStatus();

    // Atualiza o status a cada 30 segundos
    const interval = setInterval(() => {
      checkTwitchStatus();
      checkKickStatus();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center">
        <div className="flex flex-col items-center justify-center w-full max-w-sm p-4 mt-8">
          <div className="relative">
            <Skeleton className="w-48 h-48 rounded-full mb-6" />
          </div>
          <Skeleton className="h-8 w-32 mb-8 rounded-lg" />

          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full mb-4 rounded-lg" />
          ))}
        </div>
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
              isLiveTwitch || isLiveKick ? 'border-green-500' : 'border-red-500'
            }`}
          />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            {isLiveTwitch || isLiveKick ? (
              <div className="bg-zinc-900/80 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 border border-green-500">
                <Pulse color="green" />
                AO VIVO
              </div>
            ) : (
              <div className="bg-zinc-900/80 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 border border-red-500">
                <Pulse color="red" />
                OFFLINE
              </div>
            )}
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-8">@lannik1</h1>

        <div className="hidden min-[320px]:grid grid-cols-2 gap-4 w-full mb-4">
          <SocialButtonSquare
            href="https://onabet.cxclick.com/visit/?bta=120399&brand=onabet"
            bgColor="#161a1e"
            icon={<Image src={onabet} alt="Onabet" width={96} height={96} className="text-white" />}
          >
            Onabet
          </SocialButtonSquare>

          <SocialButtonSquare
            href="https://chat.whatsapp.com/F2kQeOsXctq8ElzhOSzQFx"
            bgColor="#25D366"
            icon={<FaWhatsapp size={48} className="text-white" />}
            className="animate-pulse border-2 border-green-500"
          >
            🎯 Bancas Grátis
          </SocialButtonSquare>
        </div>

        <div className="min-[320px]:hidden w-full">
          <SocialButton
            href="https://onabet.cxclick.com/visit/?bta=120399&brand=onabet"
            bgColor="#161a1e"
            icon={<Image src={onabet} alt="Onabet" width={48} height={48} className="text-white" />}
          >
            Onabet
          </SocialButton>

          <SocialButton
            href="https://chat.whatsapp.com/F2kQeOsXctq8ElzhOSzQFx"
            bgColor="#25D366"
            icon={<FaWhatsapp size={24} className="text-white" />}
            className="animate-pulse border-2 border-green-500"
          >
            🎯 Bancas Grátis
          </SocialButton>
        </div>

        <SocialButton
          href="https://twitch.tv/lannik1"
          isLive={isLiveTwitch}
          bgColor="#6441a5"
          icon={<FaTwitch size={24} className="text-white" />}
        >
          {isLiveTwitch ? '🟢 AO VIVO NA TWITCH' : 'Twitch'}
        </SocialButton>

        <SocialButton
          href="https://kick.com/lannik"
          isLive={isLiveKick}
          bgColor="#53fc18"
          icon={<Image src={kick} alt="Kick" width={24} height={24} className="text-white" />}
        >
          {isLiveKick ? '🟢 AO VIVO NA KICK' : 'Kick'}
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
          href="https://www.tiktok.com/@lannikcortes"
          bgColor="#000000"
          icon={<FaTiktok size={24} className="text-white" />}
        >
          TikTok
        </SocialButton>

        <SocialButton
          href="https://www.youtube.com/channel/UCa0N0FY-lynXLdKStJIimlw"
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
