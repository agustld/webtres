'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    email: '',
    attendance: 'yes',
    guests: '1',
    message: '',
  });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    hoteles: false,
    regalo: false,
    calendario: false,
  });

  // Fecha de la boda - personalizar aquí
  const weddingDate = new Date('2026-03-07T18:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const handleAudioPlay = () => {
    const audio = new Audio('/audio/welcome.mp3');
    audio.play().catch(() => {
      setAudioError(true);
    });
    setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('RSVP submitted:', rsvpForm);
    setRsvpSubmitted(true);
    setTimeout(() => setRsvpSubmitted(false), 3000);
  };

  const generateCalendarLink = (type: 'google' | 'outlook' | 'microsoft365' | 'apple' | 'yahoo') => {
    const event = {
      title: 'Boda de Milagros y Matias',
      start: '20260307T190000', // 7 de Marzo 2026 19:00 hs
      end: '20260308T020000', // Termina a las 2:00 AM del día siguiente
      details: '¡Te esperamos en nuestra boda!',
      location: 'Hotel la secundina, Cerrillos, Salta',
    };

    const baseUrl = {
      google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`,
      outlook: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${event.start}&enddt=${event.end}&body=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`,
      microsoft365: `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${event.start}&enddt=${event.end}&body=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`,
      apple: `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${event.start}%0ADTEND:${event.end}%0ASUMMARY:${encodeURIComponent(event.title)}%0ADESCRIPTION:${encodeURIComponent(event.details)}%0ALOCATION:${encodeURIComponent(event.location)}%0AEND:VEVENT%0AEND:VCALENDAR`,
      yahoo: `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${encodeURIComponent(event.title)}&st=${event.start}&dur=0700&desc=${encodeURIComponent(event.details)}&in_loc=${encodeURIComponent(event.location)}`,
    };

    return baseUrl[type];
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - Desktop */}
        <div className="hidden md:block absolute inset-0 z-0">
          <Image
            src="/assets/background_MM.png"
            alt="Background"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        
        {/* Background Image - Mobile */}
        <div className="md:hidden absolute inset-0 z-0">
          <Image
            src="/assets/background_MM.png"
            alt="Background"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>
      </section>

      {/* Countdown Section */}
      <section id="countdown-section" className="pt-0 pb-0 px-4 flex items-center justify-center relative" style={{ backgroundColor: '#497f7f' }}>
        <div className="w-full max-w-[1350px] h-auto min-h-[351px] mx-auto text-center relative z-10 flex flex-col justify-center py-4 md:py-6">
          {/* Fecha */}
          <div className="mb-3 md:mb-4">
            <p className="font-montserrat text-sm md:text-base text-white uppercase tracking-[0.2em]">
              7 DE MARZO DE 2026
            </p>
          </div>
          
          {/* Texto principal - Pregunta */}
          <div className="mb-3 md:mb-4">
            <p className="font-greatvibes text-white leading-tight" style={{ fontSize: 'calc(3.75rem - 20px)' }}>
              <span className="hidden md:inline" style={{ fontSize: 'calc(8rem - 60px)' }}>¿Listos para festejar nuestro amor?</span>
              <span className="md:hidden" style={{ fontSize: 'calc(3.75rem - 20px)' }}>¿Listos para festejar nuestro amor?</span>
            </p>
          </div>
          
          {/* Texto "F A L T A N…" con espacios */}
          <div className="mb-3 md:mb-4">
            <p className="font-montserrat text-sm md:text-base text-white uppercase tracking-[0.3em]">
              F A L T A N…
            </p>
          </div>
          
          {/* Contador */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="px-3 py-4 md:px-4 md:py-5 text-center">
              <div className="text-4xl md:text-6xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                {String(timeLeft.days).padStart(3, '0')}
              </div>
              <div className="font-montserrat text-xs md:text-sm text-white uppercase tracking-wide">
                DÍAS
              </div>
            </div>
            <div className="px-3 py-4 md:px-4 md:py-5 text-center">
              <div className="text-4xl md:text-6xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="font-montserrat text-xs md:text-sm text-white uppercase tracking-wide">
                HORAS
              </div>
            </div>
            <div className="px-3 py-4 md:px-4 md:py-5 text-center">
              <div className="text-4xl md:text-6xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="font-montserrat text-xs md:text-sm text-white uppercase tracking-wide">
                MINUTOS
              </div>
            </div>
            <div className="px-3 py-4 md:px-4 md:py-5 text-center">
              <div className="text-4xl md:text-6xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="font-montserrat text-xs md:text-sm text-white uppercase tracking-wide">
                SEGUNDOS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ceremony & Party Section */}
      <section className="pb-0 pt-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative">
            {/* Línea divisoria delgada */}
            <div className="hidden md:block absolute left-1/2 top-1/4 bottom-1/4 w-[0.5px] bg-beige transform -translate-x-1/2"></div>
            
            {/* Ceremonia - Left Section */}
            <div className="px-8 md:px-12 py-12">
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="mb-6">
                  <Image 
                    src="/assets/Ceremonia-Estrella-Neutro-2.gif" 
                    alt="Ceremonia" 
                    width={150} 
                    height={150} 
                    style={{ filter: 'brightness(0) saturate(100%) invert(28%) sepia(30%) saturate(2000%) hue-rotate(150deg) brightness(95%) contrast(90%)' }}
                    unoptimized 
                  />
                </div>
                
                {/* Event Type */}
                <h2 className="font-montserrat text-xl md:text-2xl uppercase tracking-wider mb-8 text-black">
                  CEREMONIA
                </h2>
                
                {/* Venue Name */}
                <h3 className="font-greatvibes text-4xl md:text-6xl mb-4 text-black leading-tight">
                  Hotel la secundina
                </h3>
                
                {/* Date */}
                <p className="font-montserrat text-sm md:text-base mb-2 text-black">
                  7 de Marzo
                </p>
                
                {/* Address */}
                <p className="font-montserrat text-sm md:text-base mb-2 text-black">
                  Cerrillos, Salta
                </p>
                
                {/* Time */}
                <p className="font-montserrat text-sm md:text-base mb-8 text-black">
                  19:00 hs
                </p>
                
                {/* Button */}
                <a
                  href="https://www.google.com/maps/place/La+Secundina+-+hotel+de+campo/@-24.9169785,-65.4893283,17z/data=!4m9!3m8!1s0x941be7659dac82fb:0xe8b6337904d417eb!5m2!4m1!1i2!8m2!3d-24.9169785!4d-65.4867534!16s%2Fg%2F11h_5nhqt8?coh=277533&entry=tts&g_ep=EgoyMDI1MTIwNy4wIPu8ASoKLDEwMDc5MjA2N0gBUAM%3D&skid=f496cf53-5c3f-4499-998e-0210396aad0a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white px-8 py-3 rounded-full font-montserrat text-xs md:text-lg uppercase tracking-wide transition-opacity duration-200 hover:opacity-80 md:w-[350px] md:h-[50px] md:px-0 flex items-center justify-center"
                  style={{ backgroundColor: '#497f7f' }}
                >
                  CÓMO LLEGAR
                </a>
              </div>
            </div>
            
            {/* Fiesta - Right Section */}
            <div className="px-8 md:px-12 py-12">
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="mb-6">
                  <Image 
                    src="/assets/Fiesta-15-Estrella-Neutro-2.gif" 
                    alt="Fiesta" 
                    width={150} 
                    height={150} 
                    style={{ filter: 'brightness(0) saturate(100%) invert(28%) sepia(30%) saturate(2000%) hue-rotate(150deg) brightness(95%) contrast(90%)' }}
                    unoptimized 
                  />
                </div>
                
                {/* Event Type */}
                <h2 className="font-montserrat text-xl md:text-2xl uppercase tracking-wider mb-8 text-black">
                  FIESTA
                </h2>
                
                {/* Venue Name */}
                <h3 className="font-greatvibes text-4xl md:text-6xl mb-4 text-black leading-tight">
                  Hotel la secundina
                </h3>
                
                {/* Date */}
                <p className="font-montserrat text-sm md:text-base mb-2 text-black">
                  7 de Marzo
                </p>
                
                {/* Address */}
                <p className="font-montserrat text-sm md:text-base mb-2 text-black">
                  Cerrillos, Salta
                </p>
                
                {/* Time */}
                <p className="font-montserrat text-sm md:text-base mb-8 text-black">
                  Después de la ceremonia
                </p>
                
                {/* Button */}
                <a
                  href="https://www.google.com/maps/place/La+Secundina+-+hotel+de+campo/@-24.9169785,-65.4893283,17z/data=!4m9!3m8!1s0x941be7659dac82fb:0xe8b6337904d417eb!5m2!4m1!1i2!8m2!3d-24.9169785!4d-65.4867534!16s%2Fg%2F11h_5nhqt8?coh=277533&entry=tts&g_ep=EgoyMDI1MTIwNy4wIPu8ASoKLDEwMDc5MjA2N0gBUAM%3D&skid=f496cf53-5c3f-4499-998e-0210396aad0a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white px-8 py-3 rounded-full font-montserrat text-xs md:text-lg uppercase tracking-wide transition-opacity duration-200 hover:opacity-80 md:w-[350px] md:h-[50px] md:px-0 flex items-center justify-center"
                  style={{ backgroundColor: '#497f7f' }}
                >
                  CÓMO LLEGAR
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Image 1 */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-md">
              <Image
                src="/assets/Foto_1.jpeg"
                alt="Milagros y Matias"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            
            {/* Image 2 */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-md">
              <Image
                src="/assets/Foto_3.jpeg"
                alt="Milagros y Matias"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            
            {/* Image 3 */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-md">
              <Image
                src="/assets/Foto_4.jpeg"
                alt="Milagros y Matias"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Music Suggestion Section */}
      <section className="pb-4 md:pb-4 pt-16 md:pt-20 px-4" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/assets/Sugerencia-Estrella-Neutro-2.gif"
              alt="Sugerencia de música"
              width={150}
              height={150}
              style={{ filter: 'brightness(0) saturate(100%) invert(28%) sepia(30%) saturate(2000%) hue-rotate(150deg) brightness(95%) contrast(90%)' }}
              unoptimized
            />
          </div>
          
          {/* Main Heading */}
          <h2 className="font-playfair text-3xl md:text-4xl mb-6 leading-tight" style={{ color: '#5c4a37' }}>
            ¡Te invitamos a ser<br />nuestro DJ personal!
          </h2>
          
          {/* Sub-text */}
          <p className="font-montserrat text-base md:text-lg mb-8 leading-relaxed" style={{ color: '#5c4a37' }}>
            Ayudanos a armar<br />la lista de canciones<br />para nuestra fiesta
          </p>
          
          {/* Button */}
          <div className="flex justify-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfEO7d5UgNe-R7fSTuQCsy5uL9dhBFFPX2ukD6lThrYW6yyTg/viewform?pli=1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-montserrat text-sm md:text-lg uppercase tracking-wide transition-opacity duration-200 hover:opacity-80 md:w-[350px] md:h-[50px] md:px-0 flex items-center justify-center"
              style={{ backgroundColor: '#497f7f', color: '#ffffff' }}
            >
              SUGERÍ TU TEMA ACÁ
            </a>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 md:py-20 px-4" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl italic leading-tight" style={{ color: '#000000' }}>
              Te contamos<br />todos los detalles...
            </h2>
          </div>
          
          {/* Options */}
          <div className="space-y-6 md:space-y-8">
            {/* Option 1: Regalo */}
            <div>
              <div 
                className="flex items-center justify-between cursor-pointer group hover:opacity-80 transition-opacity"
                onClick={() => setOpenSections(prev => ({ ...prev, regalo: !prev.regalo }))}
              >
                <div className="flex-1">
                  <p className="font-montserrat text-lg md:text-xl uppercase tracking-wide mb-2" style={{ color: '#000000' }}>
                    SI QUERÉS REGALARNOS ALGO
                  </p>
                  <div className="h-[1px] w-full" style={{ backgroundColor: '#000000' }}></div>
                </div>
                <div className="ml-4">
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none"
                    className={`transition-transform duration-200 ${openSections.regalo ? 'rotate-90' : ''}`}
                  >
                    <path d="M4 2L8 6L4 10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              {/* Contenido Regalo */}
              {openSections.regalo && (
                <div className="mt-6 pl-4" style={{ borderLeft: '2px solid #000000' }}>
                  <h3 className="font-montserrat text-xl md:text-2xl uppercase tracking-wide mb-4" style={{ color: '#000000' }}>
                    Datos Bancarios
                  </h3>
                  <div className="space-y-3 font-montserrat text-base md:text-lg" style={{ color: '#000000' }}>
                    <p>* Nombre del Titular: Matias Federico Genovese</p>
                    <p>* Alias: miliymatiboda.com</p>
                    <p>* DNI: 32165089</p>
                    <p>* Banco: LEMON</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Option 2: Hospedaje */}
            <div>
              <div 
                className="flex items-center justify-between cursor-pointer group hover:opacity-80 transition-opacity"
                onClick={() => setOpenSections(prev => ({ ...prev, hoteles: !prev.hoteles }))}
              >
                <div className="flex-1">
                  <p className="font-montserrat text-lg md:text-xl uppercase tracking-wide mb-2" style={{ color: '#000000' }}>
                    SUGERENCIA DE HOSPEDAJE
                  </p>
                  <div className="h-[1px] w-full" style={{ backgroundColor: '#000000' }}></div>
                </div>
                <div className="ml-4">
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none"
                    className={`transition-transform duration-200 ${openSections.hoteles ? 'rotate-90' : ''}`}
                  >
                    <path d="M4 2L8 6L4 10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              {/* Contenido Hospedaje */}
              {openSections.hoteles && (
                <div className="mt-6 pl-4" style={{ borderLeft: '2px solid #000000' }}>
                  <h3 className="font-montserrat text-xl md:text-2xl uppercase tracking-wide mb-6" style={{ color: '#000000' }}>
                    Hoteles
                  </h3>
                  <div className="space-y-8">
                    {/* Hotel 1 */}
                    <div>
                      <h4 className="font-montserrat text-lg md:text-xl font-semibold mb-2" style={{ color: '#000000' }}>
                        Hotel El Creston II
                      </h4>
                      <p className="font-montserrat text-base md:text-lg mb-3" style={{ color: '#000000' }}>
                        387154132844
                      </p>
                      <a
                        href="https://maps.app.goo.gl/bihSScXb8NupQjTL6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-montserrat text-base md:text-lg underline hover:opacity-80 transition-opacity"
                        style={{ color: '#000000' }}
                      >
                        Cómo llegar
                      </a>
                    </div>
                    
                    {/* Hotel 2 */}
                    <div>
                      <h4 className="font-montserrat text-lg md:text-xl font-semibold mb-2" style={{ color: '#000000' }}>
                        Hostal Los Tarcos
                      </h4>
                      <p className="font-montserrat text-base md:text-lg mb-3" style={{ color: '#000000' }}>
                        3875378140
                      </p>
                      <a
                        href="https://maps.app.goo.gl/CZTQS2qvmzJDENtC7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-montserrat text-base md:text-lg underline hover:opacity-80 transition-opacity"
                        style={{ color: '#000000' }}
                      >
                        Cómo llegar
                      </a>
                    </div>
                    
                    {/* Hotel 3 */}
                    <div>
                      <h4 className="font-montserrat text-lg md:text-xl font-semibold mb-2" style={{ color: '#000000' }}>
                        Posta Ruiz Cabañas Urbanas
                      </h4>
                      <p className="font-montserrat text-base md:text-lg mb-3" style={{ color: '#000000' }}>
                        3875601617
                      </p>
                      <a
                        href="https://maps.app.goo.gl/cRRfoArpQnQnngDH8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-montserrat text-base md:text-lg underline hover:opacity-80 transition-opacity"
                        style={{ color: '#000000' }}
                      >
                        Cómo llegar
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 md:py-20 px-4" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-2xl mx-auto text-center">
          {/* Heading */}
          <h2 className="font-playfair text-3xl md:text-4xl italic mb-8 leading-tight" style={{ color: '#000000' }}>
            ¡Agendá la fecha en tu calendario!
          </h2>
          
          {/* Button */}
          <div className="relative inline-block">
            <button
              onClick={() => setOpenSections(prev => ({ ...prev, calendario: !prev.calendario }))}
              className="text-white px-8 py-4 rounded-full font-montserrat text-sm md:text-lg uppercase tracking-wide transition-opacity duration-200 hover:opacity-80 md:w-[350px] md:h-[50px] md:px-0 flex items-center justify-center mx-auto"
              style={{ backgroundColor: '#497f7f' }}
            >
              AGENDAR EVENTO
            </button>
            
            {/* Dropdown Menu */}
            {openSections.calendario && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-white rounded-lg shadow-lg w-[512px] z-50">
                <div className="py-4">
                  {/* Google */}
                  <a
                    href={generateCalendarLink('google')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-8 py-6 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-16 h-16 mr-6 flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <rect x="4" y="4" width="16" height="16" rx="2" fill="#4285F4"/>
                        <rect x="4" y="4" width="16" height="4" fill="#34A853"/>
                        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">31</text>
                      </svg>
                    </div>
                    <span className="font-montserrat text-xl text-black italic">Google</span>
                  </a>
                  
                  {/* Outlook */}
                  <a
                    href={generateCalendarLink('outlook')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-8 py-6 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-16 h-16 mr-6 flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="4" width="20" height="16" rx="2" fill="#0078D4"/>
                        <path d="M2 8 L12 14 L22 8" stroke="white" strokeWidth="2" fill="none"/>
                        <circle cx="12" cy="11" r="3" fill="white"/>
                      </svg>
                    </div>
                    <span className="font-montserrat text-xl text-black italic">Outlook</span>
                  </a>
                  
                  {/* Microsoft 365 */}
                  <a
                    href={generateCalendarLink('microsoft365')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-8 py-6 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-16 h-16 mr-6 flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <rect x="4" y="4" width="16" height="16" rx="2" fill="#F25022"/>
                        <circle cx="12" cy="12" r="4" fill="white"/>
                      </svg>
                    </div>
                    <span className="font-montserrat text-xl text-black italic">Microsoft 365</span>
                  </a>
                  
                  {/* Apple */}
                  <a
                    href={generateCalendarLink('apple')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-8 py-6 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-16 h-16 mr-6 flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="black">
                        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                    </div>
                    <span className="font-montserrat text-xl text-black italic">Apple</span>
                  </a>
                  
                  {/* Yahoo */}
                  <a
                    href={generateCalendarLink('yahoo')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-8 py-6 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-16 h-16 mr-6 flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <rect x="4" y="4" width="16" height="16" rx="2" fill="#6001D2"/>
                        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Y</text>
                      </svg>
                    </div>
                    <span className="font-montserrat text-xl text-black italic">Yahoo</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Confirmation Section */}
      <section className="relative pt-4 md:pt-4 pb-20 px-4 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/background_MM_3.png"
            alt="Background"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto text-center px-4">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/assets/Confirmacion-Estrella-Neutro-2.gif"
              alt="Confirmación"
              width={150}
              height={150}
              style={{ filter: 'brightness(0) invert(1)' }}
              unoptimized
            />
          </div>
          
          {/* Title */}
          <h2 className="font-montserrat text-2xl md:text-3xl text-black mb-6 uppercase tracking-wider">
            CONFIRMACIÓN DE ASISTENCIA
          </h2>
          
          {/* Message */}
          <p className="font-playfair text-lg md:text-xl text-black mb-8 leading-relaxed">
            ¡Esperamos que puedas acompañarnos<br />en este momento tan especial!
          </p>
          
          {/* Button */}
          <div className="flex justify-center">
            <a
              href="https://api.whatsapp.com/send/?phone=5493874642108&text=Hola%2C+Confirmo+mi+asistencia+a+la+boda%21&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-montserrat text-sm md:text-lg uppercase tracking-wide transition-opacity duration-200 hover:opacity-80 md:w-[350px] md:h-[50px] md:px-0 flex items-center justify-center"
              style={{ backgroundColor: '#fff', color: '#497f7f' }}
            >
              CONFIRMAR MI ASISTENCIA
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
