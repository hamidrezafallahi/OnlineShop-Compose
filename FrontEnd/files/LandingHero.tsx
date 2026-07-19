import { getLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

/**
 * LandingHero — Cinematic full-screen hero
 *
 * Design language: deep charcoal film with the hero perfume image
 * dominant right, editorial headline left. The page's signature moment:
 * floating scent-note pills drift upward via CSS keyframes, evoking
 * fragrance diffusing into air. No JS needed — pure CSS animations.
 *
 * RTL-ready: flex-row-reverse on desktop when locale is fa/ar.
 */
export default async function LandingHero() {
  const locale = await getLocale();
  const isRtl = ['fa', 'ar'].includes(locale);

  return (
    <section className="relative flex justify-center items-center bg-[#141210] min-h-screen overflow-hidden">

      {/* ── Ambient background orbs ── */}
      <div className="top-1/4 left-1/2 absolute bg-[#C8955A]/8 blur-[120px] rounded-full w-[600px] h-[600px] -translate-x-1/2 pointer-events-none" />
      <div className="right-10 bottom-0 absolute bg-[#E8C4B0]/5 blur-[80px] rounded-full w-72 h-72 pointer-events-none" />
      <div className="top-20 left-10 absolute bg-[#8B9E8A]/6 blur-[60px] rounded-full w-48 h-48 pointer-events-none" />

      {/* ── Subtle grid texture overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Main content grid ── */}
      <div
        className={`
          relative z-10 flex flex-col md:flex-row items-center justify-between
          w-full max-w-7xl mx-auto px-6 md:px-16 pt-28 pb-16 gap-12
          ${isRtl ? 'md:flex-row-reverse' : ''}
        `}
      >

        {/* ── Left / Text side ── */}
        <div
          className={`flex flex-col gap-7 max-w-lg
            ${isRtl ? 'items-end text-right md:items-end' : 'items-start text-left'}
            animate-[fadeSlideUp_1s_ease_forwards] opacity-0
          `}
          style={{ animationDelay: '0.3s' }}
        >
          {/* Eyebrow */}
          <span
            className="opacity-0 font-light text-[#C8955A] text-xs uppercase tracking-[0.4em]"
            style={{ animation: 'fadeSlideUp 0.8s ease 0.4s forwards' }}
          >
            کالکشن پاییز ۱۴۰۳
          </span>

          {/* Headline */}
          <h1
            className="opacity-0 font-['Cormorant_Garamond'] font-light text-white leading-[1.05]"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              animation: 'fadeSlideUp 1s ease 0.6s forwards',
            }}
          >
            عطری که
            <br />
            <em className="text-[#C8955A] not-italic">امضای</em>
            <br />
            توست
          </h1>

          {/* Subline */}
          <p
            className="opacity-0 font-light text-white/50 text-base md:text-lg leading-relaxed"
            style={{ animation: 'fadeSlideUp 1s ease 0.9s forwards' }}
          >
            رایحه‌هایی ماندگار از اصالت و ظرافت.
            <br />
            بهترین برندهای جهان، یک‌جا برای تو.
          </p>

          {/* Scent note tags */}
          <div
            className="flex flex-wrap gap-2 opacity-0"
            style={{ animation: 'fadeSlideUp 1s ease 1.1s forwards' }}
          >
            {['بالای: برگاموت', 'میانی: رز', 'پایه: عود'].map((note) => (
              <span
                key={note}
                className="px-4 py-1.5 border border-white/15 rounded-full text-white/60 text-xs tracking-wide"
              >
                {note}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="flex sm:flex-row flex-col gap-4 opacity-0 mt-2 w-full sm:w-auto"
            style={{ animation: 'fadeSlideUp 1s ease 1.3s forwards' }}
          >
            <Link
              href={`/${locale}/products`}
              className="group relative bg-[#C8955A] hover:bg-[#b8854a] px-8 py-3.5 overflow-hidden font-medium text-white text-sm text-center tracking-[0.15em] transition-all duration-500"
            >
              <span className="z-10 relative">مشاهده محصولات</span>
            </Link>
            <Link
              href={`/${locale}/discounts`}
              className="px-8 py-3.5 border border-white/25 hover:border-white/60 font-light text-white/70 hover:text-white text-sm text-center tracking-[0.15em] transition-all duration-500"
            >
              تخفیف‌های ویژه
            </Link>
          </div>

          {/* Stats bar */}
          <div
            className="flex gap-8 opacity-0 pt-6 border-white/10 border-t w-full"
            style={{ animation: 'fadeSlideUp 1s ease 1.5s forwards' }}
          >
            {[
              { num: '+۵۰۰', label: 'برند معتبر' },
              { num: '+۱۲K', label: 'مشتری راضی' },
              { num: '۷', label: 'روز ضمانت' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="font-['Cormorant_Garamond'] font-light text-white text-2xl">
                  {stat.num}
                </span>
                <span className="text-white/40 text-xs tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right / Bottle side ── */}
        <div
          className="relative flex flex-shrink-0 justify-center items-center opacity-0"
          style={{ animation: 'bottleReveal 1.8s cubic-bezier(0.25,0.1,0,1) 0.8s forwards' }}
        >
          {/* Glow ring behind bottle */}
          <div className="absolute bg-[#C8955A]/12 blur-[50px] rounded-full w-[340px] h-[340px]" />

          {/* Bottle image frame */}
          <div className="relative border border-white/8 rounded-3xl w-[260px] md:w-[340px] h-[380px] md:h-[500px] overflow-hidden">
            <Image
              src=""
              alt="عطر لاکچری"
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000"
              priority
            />
            {/* Inner shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
          </div>

          {/* Floating scent particles */}
          {[
            { size: 3, left: '55%', delay: '1.8s', dur: '3.2s' },
            { size: 2, left: '48%', delay: '2.4s', dur: '2.8s' },
            { size: 4, left: '62%', delay: '2.1s', dur: '3.6s' },
            { size: 2, left: '44%', delay: '3.0s', dur: '4.0s' },
            { size: 3, left: '58%', delay: '3.4s', dur: '3.4s' },
          ].map((p, i) => (
            <div
              key={i}
              className="top-4 absolute bg-[#C8955A] rounded-full"
              style={{
                width: p.size,
                height: p.size,
                left: p.left,
                opacity: 0,
                animation: `particleFloat ${p.dur} linear ${p.delay} infinite`,
              }}
            />
          ))}

          {/* Floating badge — Limited Edition */}
          <div
            className="-bottom-3 -left-6 absolute bg-[#1e1a16] opacity-0 px-5 py-3 border border-white/15 rounded-2xl"
            style={{ animation: 'fadeSlideUp 1s ease 2s forwards' }}
          >
            <p className="font-light text-[#C8955A] text-xs uppercase tracking-widest">محدود</p>
            <p className="mt-0.5 font-['Cormorant_Garamond'] text-white text-sm">Edition Nuit</p>
          </div>

          {/* Floating badge — Rating */}
          <div
            className="-top-3 -right-6 absolute flex items-center gap-2 bg-[#1e1a16] opacity-0 px-4 py-2.5 border border-white/15 rounded-2xl"
            style={{ animation: 'fadeSlideUp 1s ease 2.2s forwards' }}
          >
            <span className="text-[#C8955A] text-sm">★</span>
            <div>
              <p className="font-medium text-white text-sm leading-none">۴.۹</p>
              <p className="mt-0.5 text-white/40 text-xs">از ۱۲۰۰+ نظر</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="bottom-8 left-1/2 absolute flex flex-col items-center gap-2 opacity-0 -translate-x-1/2"
        style={{ animation: 'fadeSlideUp 1s ease 2.5s forwards, breathe 2.5s ease-in-out 3s infinite' }}
      >
        <span className="text-[10px] text-white/30 uppercase tracking-[0.4em]">اسکرول</span>
        <div className="bg-gradient-to-b from-white/30 to-transparent w-px h-10" />
      </div>

      {/* ── Keyframe definitions ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bottleReveal {
          0%   { opacity: 0; transform: scale(0.86) translateY(30px); filter: blur(8px); }
          60%  { filter: blur(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes particleFloat {
          0%   { opacity: 0; transform: translateY(0) scale(1); }
          20%  { opacity: 0.7; }
          80%  { opacity: 0.2; }
          100% { opacity: 0; transform: translateY(-110px) scale(0.2); }
        }
        @keyframes breathe {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </section>
  );
}
