import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const DESTINATIONS = [
  {
    name: "Goa",
    country: "India",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=700&q=80",
    tag: "Beach",
    price: "₹8,500",
    rating: 4.8,
    desc: "Golden sands, Portuguese heritage & endless sunsets",
  },
  {
    name: "Bali",
    country: "Indonesia",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=80",
    tag: "Island",
    price: "₹34,000",
    rating: 4.9,
    desc: "Rice terraces, sacred temples & surf-perfect waves",
  },
  {
    name: "Manali",
    country: "India",
    img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=700&q=80",
    tag: "Mountains",
    price: "₹12,000",
    rating: 4.7,
    desc: "Snow peaks, pine valleys & Himalayan adventure",
  },
  {
    name: "Santorini",
    country: "Greece",
    img: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=700&q=80",
    tag: "Luxury",
    price: "₹62,000",
    rating: 4.8,
    desc: "Whitewashed cliffs, cobalt domes & Aegean sunsets",
  },
  {
    name: "Kyoto",
    country: "Japan",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=700&q=80",
    tag: "Culture",
    price: "₹78,000",
    rating: 4.9,
    desc: "Bamboo forests, geisha lanes & temple serenity",
  },
  {
    name: "Maldives",
    country: "South Asia",
    img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=700&q=80",
    tag: "Luxury",
    price: "₹1,20,000",
    rating: 5.0,
    desc: "Overwater villas, crystal lagoons & reef life",
  },
];

const FEATURES = [
  {
    icon: "🗺",
    title: "Smart Trip Planning",
    desc: "AI-powered itinerary builder that adapts to your style, budget and travel pace.",
    color: "#1a8fda",
    bg: "rgba(26,143,218,0.08)",
  },
  {
    icon: "✈",
    title: "One-Click Booking",
    desc: "Flights, hotels and activities — book everything in a single seamless workflow.",
    color: "#22d3ee",
    bg: "rgba(34,211,238,0.08)",
  },
  {
    icon: "👥",
    title: "Group Management",
    desc: "Split costs, sync itineraries and coordinate with your entire travel group effortlessly.",
    color: "#f4b942",
    bg: "rgba(244,185,66,0.08)",
  },
  // {
  //   icon: "📊",
  //   title: "Expense Tracker",
  //   desc: "Real-time budget tracking with category insights and per-person breakdowns.",
  //   color: "#34d399",
  //   bg: "rgba(52,211,153,0.08)",
  // },
  // {
  //   icon: "🔔",
  //   title: "Live Updates",
  //   desc: "Flight status, hotel check-ins and destination alerts all in real time.",
  //   color: "#f87171",
  //   bg: "rgba(248,113,113,0.08)",
  // },
  // {
  //   icon: "🌐",
  //   title: "Offline Access",
  //   desc: "Download itineraries, maps and guides — travel confidently without data.",
  //   color: "#a78bfa",
  //   bg: "rgba(167,139,250,0.08)",
  // },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Solo Traveller",
    avatar: "PS",
    color: "#1a8fda",
    text: "SafarSetu completely changed how I plan trips. Booked a 3-week Rajasthan circuit in under 20 minutes. Absolutely seamless.",
    stars: 5,
  },
  {
    name: "Rahul Mehta",
    role: "Corporate Travel Manager",
    avatar: "RM",
    color: "#22d3ee",
    text: "Managing 40+ employee trips per month used to be chaos. Now it's one dashboard. The group sync feature is a lifesaver.",
    stars: 5,
  },
  {
    name: "Ananya Iyer",
    role: "Travel Blogger",
    avatar: "AI",
    color: "#f4b942",
    text: "The destination cards and expense tracker are gorgeous. I genuinely enjoy opening SafarSetu even just to browse.",
    stars: 5,
  },
];

const STATS = [
  { value: "2.4L+", label: "Happy Travellers" },
  { value: "190+", label: "Destinations" },
  { value: "₹48Cr+", label: "Trips Managed" },
  { value: "4.9★", label: "App Rating" },
];

export default function Home() {
  const [activeCard, setActiveCard] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveCard((p) => (p + 1) % DESTINATIONS.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}

        :root{
          --night:#05101f;
          --navy:#091526;
          --deep:#0d1f35;
          --sky:#1a8fda;
          --cyan:#22d3ee;
          --gold:#f4b942;
          --emerald:#34d399;
          --paper:#f8f4ee;
          --sand:#f0e6d0;
          --txt:#1a2535;
          --muted:#5f7080;
          --border:#e8e0d2;
        }

        body{font-family:'DM Sans',sans-serif;background:var(--night);color:#fff;overflow-x:hidden;}

        /* ── NAV ── */
        .ss-nav{
          position:fixed;top:0;left:0;right:0;z-index:200;
          padding:0 5%;height:70px;
          display:flex;align-items:center;justify-content:space-between;
          transition:background 0.4s,backdrop-filter 0.4s;
        }
        .ss-nav.scrolled{
          background:rgba(5,16,31,0.88);
          backdrop-filter:blur(18px);
          border-bottom:1px solid rgba(255,255,255,0.06);
        }
        .nav-brand{
          display:flex;align-items:center;gap:10px;text-decoration:none;
        }
        .nav-brand-icon{
          width:38px;height:38px;border-radius:11px;
          background:linear-gradient(135deg,var(--sky),var(--cyan));
          display:flex;align-items:center;justify-content:center;
          font-size:18px;box-shadow:0 4px 16px rgba(26,143,218,0.45);
          flex-shrink:0;
        }
        .nav-brand-text{
          font-family:'Syne',sans-serif;font-size:21px;font-weight:800;
          color:#fff;letter-spacing:-0.3px;
        }
        .nav-brand-text span{color:var(--cyan);}
        .nav-links{display:flex;align-items:center;gap:32px;}
        .nav-link{
          font-size:13.5px;font-weight:400;color:rgba(255,255,255,0.6);
          text-decoration:none;transition:color 0.2s;letter-spacing:0.2px;
        }
        .nav-link:hover{color:#fff;}
        .nav-actions{display:flex;gap:12px;align-items:center;}
        .btn-ghost{
          font-size:13px;font-weight:500;color:rgba(255,255,255,0.7);
          background:none;border:1px solid rgba(255,255,255,0.15);
          padding:8px 18px;border-radius:100px;cursor:pointer;
          text-decoration:none;transition:all 0.2s;font-family:'DM Sans',sans-serif;
        }
        .btn-ghost:hover{background:rgba(255,255,255,0.08);color:#fff;}
        .btn-primary{
          font-size:13px;font-weight:500;color:#fff;
          background:linear-gradient(135deg,var(--sky),#0a5fa8);
          border:none;padding:9px 22px;border-radius:100px;cursor:pointer;
          text-decoration:none;transition:all 0.2s;font-family:'DM Sans',sans-serif;
          box-shadow:0 4px 16px rgba(26,143,218,0.4);
        }
        .btn-primary:hover{transform:translateY(-1px);box-shadow:0 6px 22px rgba(26,143,218,0.55);}

        /* ── HERO ── */
        .hero{
          min-height:100vh;position:relative;
          display:flex;flex-direction:column;
          overflow:hidden;
        }
        .hero-bg{
          position:absolute;inset:0;
          background:url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1800&q=85') center/cover no-repeat;
          transform:translateY(calc(var(--parallax,0px)));
          transition:none;
        }
        .hero-bg::after{
          content:'';position:absolute;inset:0;
          background:
            linear-gradient(to bottom,rgba(5,16,31,0.55) 0%,rgba(5,16,31,0.35) 40%,rgba(5,16,31,0.8) 80%,rgba(5,16,31,1) 100%);
        }
        .hero-body{
          position:relative;z-index:2;
          flex:1;display:flex;align-items:center;
          padding:120px 6% 80px;
          max-width:1200px;margin:0 auto;width:100%;
        }
        .hero-left{flex:1;padding-right:40px;}
        .hero-eyebrow{
          display:inline-flex;align-items:center;gap:8px;
          background:rgba(34,211,238,0.1);border:1px solid rgba(34,211,238,0.25);
          color:var(--cyan);font-size:11.5px;font-weight:500;letter-spacing:2.5px;
          text-transform:uppercase;padding:7px 16px;border-radius:100px;
          margin-bottom:28px;
          animation:fadeSlideUp 0.8s ease both;
        }
        .hero-eyebrow-dot{width:6px;height:6px;border-radius:50%;background:var(--cyan);animation:pulse 2s infinite;}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.4)}}
        .hero-title{
          font-family:'Syne',sans-serif;
          font-size:clamp(44px,6.5vw,82px);
          font-weight:800;line-height:1.0;
          color:#fff;margin-bottom:24px;letter-spacing:-1.5px;
          animation:fadeSlideUp 0.9s 0.1s ease both;
        }
        .hero-title-accent{
          display:block;font-family:'Lora',serif;font-style:italic;
          font-weight:600;letter-spacing:-0.5px;
          background:linear-gradient(90deg,var(--sky) 0%,var(--cyan) 50%,var(--gold) 100%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }
        .hero-desc{
          font-size:16px;font-weight:300;line-height:1.8;
          color:rgba(200,225,245,0.72);max-width:480px;margin-bottom:36px;
          animation:fadeSlideUp 1s 0.2s ease both;
        }
        .hero-ctas{
          display:flex;gap:14px;align-items:center;flex-wrap:wrap;
          animation:fadeSlideUp 1.1s 0.3s ease both;
        }
        .cta-main{
          display:inline-flex;align-items:center;gap:10px;
          background:linear-gradient(135deg,var(--sky),#0a5fa8);
          color:#fff;border:none;border-radius:14px;
          padding:15px 32px;font-family:'DM Sans',sans-serif;
          font-size:15px;font-weight:500;cursor:pointer;text-decoration:none;
          box-shadow:0 8px 30px rgba(26,143,218,0.5);
          transition:transform 0.2s,box-shadow 0.2s;
          position:relative;overflow:hidden;
        }
        .cta-main::before{
          content:'';position:absolute;inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.12),transparent 60%);
        }
        .cta-main:hover{transform:translateY(-3px);box-shadow:0 14px 40px rgba(26,143,218,0.6);}
        .cta-secondary{
          display:inline-flex;align-items:center;gap:8px;
          color:rgba(255,255,255,0.75);font-size:14.5px;font-weight:400;
          text-decoration:none;padding:15px 10px;transition:color 0.2s;
        }
        .cta-secondary:hover{color:#fff;}
        .cta-arrow{
          width:32px;height:32px;border-radius:50%;
          border:1px solid rgba(255,255,255,0.25);
          display:flex;align-items:center;justify-content:center;
          font-size:13px;transition:all 0.2s;
        }
        .cta-secondary:hover .cta-arrow{background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.5);}

        /* hero right — destination ticker */
        .hero-right{
          width:340px;flex-shrink:0;
          animation:fadeSlideUp 1.2s 0.4s ease both;
        }
        .dest-ticker{
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.1);
          border-radius:22px;overflow:hidden;backdrop-filter:blur(12px);
        }
        .ticker-header{
          padding:16px 20px 12px;
          border-bottom:1px solid rgba(255,255,255,0.08);
          font-size:11px;font-weight:500;letter-spacing:2px;
          text-transform:uppercase;color:rgba(180,210,235,0.55);
          display:flex;align-items:center;gap:8px;
        }
        .ticker-live{
          width:7px;height:7px;border-radius:50%;background:#34d399;
          animation:pulse 2s infinite;
        }
        .ticker-img{
          width:100%;height:180px;object-fit:cover;display:block;
          transition:opacity 0.6s ease;
        }
        .ticker-body{padding:18px 20px 20px;}
        .ticker-tag{
          font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;
          color:var(--cyan);background:rgba(34,211,238,0.12);
          border:1px solid rgba(34,211,238,0.25);
          padding:3px 9px;border-radius:100px;display:inline-block;margin-bottom:8px;
        }
        .ticker-name{
          font-family:'Syne',sans-serif;font-size:22px;font-weight:700;
          color:#fff;margin-bottom:3px;
        }
        .ticker-loc{font-size:12px;font-weight:300;color:rgba(170,205,230,0.6);margin-bottom:10px;}
        .ticker-desc{font-size:12.5px;font-weight:300;color:rgba(185,215,235,0.65);line-height:1.6;margin-bottom:14px;}
        .ticker-meta{display:flex;justify-content:space-between;align-items:center;}
        .ticker-price{font-size:15px;font-weight:600;color:#fff;}
        .ticker-price span{font-size:11px;font-weight:300;color:rgba(180,210,230,0.55);}
        .ticker-rating{
          display:flex;align-items:center;gap:5px;
          font-size:12.5px;font-weight:500;color:#fff;
        }
        .star-g{color:var(--gold);font-size:13px;}
        .ticker-dots{
          display:flex;gap:6px;justify-content:center;padding:14px 20px;
          border-top:1px solid rgba(255,255,255,0.07);
        }
        .t-dot{
          width:7px;height:7px;border-radius:50%;
          background:rgba(255,255,255,0.2);cursor:pointer;transition:all 0.2s;
        }
        .t-dot.on{background:var(--cyan);transform:scale(1.3);}

        /* ── STATS BAR ── */
        .stats-bar{
          position:relative;z-index:2;
          border-top:1px solid rgba(255,255,255,0.07);
        }
        .stats-inner{
          max-width:1100px;margin:0 auto;padding:0 6%;
          display:grid;grid-template-columns:repeat(4,1fr);
          border-left:1px solid rgba(255,255,255,0.07);
        }
        .stat-item{
          padding:36px 28px;text-align:center;
          border-right:1px solid rgba(255,255,255,0.07);
        }
        .stat-val{
          font-family:'Syne',sans-serif;font-size:34px;font-weight:800;
          color:#fff;line-height:1;margin-bottom:6px;
          background:linear-gradient(135deg,#fff 0%,rgba(200,230,255,0.8) 100%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }
        .stat-lbl{font-size:12px;font-weight:400;color:rgba(150,185,215,0.55);letter-spacing:0.5px;}

        /* ── ABOUT SECTION ── */
        .about-section{
          padding:110px 6%;
          background:linear-gradient(180deg,var(--night) 0%,var(--navy) 50%,var(--night) 100%);
        }
        .about-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
        .about-label{
          font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;
          color:var(--cyan);margin-bottom:14px;
        }
        .about-title{
          font-family:'Syne',sans-serif;font-size:clamp(32px,3.5vw,50px);
          font-weight:800;line-height:1.1;color:#fff;margin-bottom:22px;letter-spacing:-0.8px;
        }
        .about-title em{font-family:'Lora',serif;font-style:italic;color:var(--gold);}
        .about-body{font-size:15px;font-weight:300;color:rgba(175,205,230,0.7);line-height:1.85;margin-bottom:20px;}
        .about-body strong{font-weight:500;color:rgba(210,235,255,0.9);}
        .about-pills{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px;}
        .about-pill{
          display:flex;align-items:center;gap:7px;
          background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);
          color:rgba(200,230,255,0.8);font-size:12.5px;font-weight:400;
          padding:8px 16px;border-radius:100px;
        }
        .pill-dot{width:7px;height:7px;border-radius:50%;background:var(--cyan);}
        .about-img-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .about-img-wrap{border-radius:18px;overflow:hidden;position:relative;}
        .about-img-wrap:first-child{grid-row:span 2;}
        .about-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.5s;}
        .about-img-wrap:hover .about-img{transform:scale(1.05);}
        .about-img-wrap:first-child{height:340px;}
        .about-img-wrap:not(:first-child){height:162px;}
        .about-img-overlay{
          position:absolute;inset:0;
          background:linear-gradient(to top,rgba(5,16,31,0.5) 0%,transparent 60%);
        }

        /* ── FEATURES ── */
        .features-section{padding:100px 6%;background:var(--paper);}
        .features-inner{max-width:1100px;margin:0 auto;}
        .section-label{font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:var(--sky);margin-bottom:12px;}
        .section-title{
          font-family:'Syne',sans-serif;font-size:clamp(30px,3.5vw,48px);
          font-weight:800;color:var(--txt);line-height:1.1;margin-bottom:10px;letter-spacing:-0.8px;
        }
        .section-sub{font-size:15px;font-weight:300;color:var(--muted);margin-bottom:56px;line-height:1.7;max-width:520px;}
        .feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
        .feat-card{
          background:#fff;border:1.5px solid var(--border);border-radius:20px;
          padding:28px 26px;transition:transform 0.3s,box-shadow 0.3s;
          position:relative;overflow:hidden;
        }
        .feat-card::before{
          content:'';position:absolute;top:0;left:0;right:0;height:3px;
          background:linear-gradient(90deg,var(--sky),var(--cyan));
          transform:scaleX(0);transform-origin:left;transition:transform 0.35s;
        }
        .feat-card:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,0.1);}
        .feat-card:hover::before{transform:scaleX(1);}
        .feat-icon{
          font-size:26px;width:52px;height:52px;border-radius:14px;
          display:flex;align-items:center;justify-content:center;
          margin-bottom:18px;transition:transform 0.3s;
        }
        .feat-card:hover .feat-icon{transform:scale(1.1);}
        .feat-title{font-family:'Syne',sans-serif;font-size:17px;font-weight:700;color:var(--txt);margin-bottom:8px;}
        .feat-desc{font-size:13.5px;font-weight:300;color:var(--muted);line-height:1.7;}

        /* ── DESTINATIONS ── */
        .dest-section{padding:100px 6%;background:var(--night);}
        .dest-section-inner{max-width:1200px;margin:0 auto;}
        .dest-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:50px;}
        .dest-main-grid{
          display:grid;
          grid-template-columns:1fr 1fr 1fr;
          grid-template-rows:auto auto;
          gap:18px;
        }
        .dest-card{
          position:relative;border-radius:20px;overflow:hidden;cursor:pointer;
          transition:transform 0.35s;
        }
        .dest-card:hover{transform:translateY(-6px);}
        .dest-card.large{grid-column:span 2;grid-row:span 2;}
        .dest-card img{
          width:100%;object-fit:cover;display:block;
          transition:transform 0.5s;
        }
        .dest-card.large img{height:460px;}
        .dest-card:not(.large) img{height:215px;}
        .dest-card:hover img{transform:scale(1.06);}
        .dest-overlay{
          position:absolute;inset:0;
          background:linear-gradient(to top,rgba(5,16,31,0.92) 0%,rgba(5,16,31,0.1) 55%,transparent 100%);
        }
        .dest-info{position:absolute;bottom:0;left:0;right:0;padding:20px;}
        .d-tag{
          display:inline-block;background:rgba(34,211,238,0.15);
          border:1px solid rgba(34,211,238,0.3);color:var(--cyan);
          font-size:9.5px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;
          padding:3px 9px;border-radius:100px;margin-bottom:7px;
        }
        .d-name{
          font-family:'Syne',sans-serif;font-weight:700;color:#fff;
          line-height:1.1;margin-bottom:4px;
        }
        .dest-card.large .d-name{font-size:28px;}
        .dest-card:not(.large) .d-name{font-size:18px;}
        .d-loc{font-size:11.5px;font-weight:300;color:rgba(175,210,235,0.6);margin-bottom:10px;}
        .d-meta{display:flex;gap:10px;flex-wrap:wrap;}
        .d-pill{
          font-size:10.5px;font-weight:500;color:rgba(210,235,255,0.8);
          background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);
          padding:4px 10px;border-radius:100px;backdrop-filter:blur(4px);
        }
        .dest-see-all{
          font-size:13.5px;font-weight:500;color:rgba(180,215,240,0.6);
          text-decoration:none;display:flex;align-items:center;gap:7px;
          transition:color 0.2s;
        }
        .dest-see-all:hover{color:var(--cyan);}

        /* ── TESTIMONIALS ── */
        .testimonials{padding:100px 6%;background:var(--paper);}
        .test-inner{max-width:1100px;margin:0 auto;}
        .test-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:50px;}
        .test-card{
          background:#fff;border:1.5px solid var(--border);border-radius:20px;
          padding:28px;transition:transform 0.3s,box-shadow 0.3s;
        }
        .test-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.08);}
        .test-stars{display:flex;gap:3px;margin-bottom:16px;}
        .test-star{color:var(--gold);font-size:14px;}
        .test-text{font-size:14px;font-weight:300;color:var(--muted);line-height:1.8;margin-bottom:22px;font-style:italic;}
        .test-author{display:flex;align-items:center;gap:12px;}
        .test-avatar{
          width:42px;height:42px;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          font-size:13px;font-weight:600;color:#fff;flex-shrink:0;
        }
        .test-name{font-size:14px;font-weight:500;color:var(--txt);}
        .test-role{font-size:11.5px;font-weight:300;color:var(--muted);}

        /* ── CTA BANNER ── */
        .cta-banner{
          padding:110px 6%;
          background:linear-gradient(135deg,#060f24 0%,#0a1f3c 40%,#0b2540 100%);
          position:relative;overflow:hidden;text-align:center;
        }
        .cta-banner::before{
          content:'';position:absolute;
          width:700px;height:700px;border-radius:50%;
          background:radial-gradient(circle,rgba(26,143,218,0.1) 0%,transparent 70%);
          top:-250px;left:50%;transform:translateX(-50%);
        }
        .cta-banner::after{
          content:'';position:absolute;
          width:400px;height:400px;border-radius:50%;
          background:radial-gradient(circle,rgba(244,185,66,0.06) 0%,transparent 70%);
          bottom:-100px;right:10%;
        }
        .cta-pre{
          font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;
          color:var(--cyan);margin-bottom:16px;position:relative;z-index:2;
        }
        .cta-title{
          font-family:'Syne',sans-serif;font-size:clamp(36px,5vw,64px);
          font-weight:800;letter-spacing:-1px;
          color:#fff;line-height:1.05;margin-bottom:18px;position:relative;z-index:2;
        }
        .cta-title em{font-family:'Lora',serif;font-style:italic;color:var(--gold);}
        .cta-sub{
          font-size:16px;font-weight:300;color:rgba(175,210,235,0.65);
          margin-bottom:40px;max-width:500px;margin-left:auto;margin-right:auto;
          line-height:1.75;position:relative;z-index:2;
        }
        .cta-actions{display:flex;gap:14px;justify-content:center;position:relative;z-index:2;}
        .cta-btn-main{
          display:inline-flex;align-items:center;gap:9px;
          background:linear-gradient(135deg,var(--sky),#0a5fa8);
          color:#fff;border:none;border-radius:14px;
          padding:16px 36px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;cursor:pointer;
          box-shadow:0 8px 30px rgba(26,143,218,0.5);
          transition:transform 0.2s,box-shadow 0.2s;text-decoration:none;
        }
        .cta-btn-main:hover{transform:translateY(-3px);box-shadow:0 14px 40px rgba(26,143,218,0.6);}
        .cta-btn-outline{
          display:inline-flex;align-items:center;gap:9px;
          background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.8);
          border:1px solid rgba(255,255,255,0.15);border-radius:14px;
          padding:16px 30px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:400;
          cursor:pointer;transition:all 0.2s;text-decoration:none;
          backdrop-filter:blur(6px);
        }
        .cta-btn-outline:hover{background:rgba(255,255,255,0.1);color:#fff;}

        /* ── FOOTER ── */
        footer{
          background:#03080f;
          border-top:1px solid rgba(255,255,255,0.06);
          padding:52px 6% 32px;
        }
        .footer-top{
          max-width:1100px;margin:0 auto;
          display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;
          padding-bottom:40px;
          border-bottom:1px solid rgba(255,255,255,0.07);
          margin-bottom:28px;
        }
        .footer-brand-name{
          font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#fff;
          margin-bottom:12px;
        }
        .footer-brand-name span{color:var(--cyan);}
        .footer-tagline{font-size:13.5px;font-weight:300;color:rgba(150,185,215,0.55);line-height:1.7;max-width:240px;}
        .footer-col-title{font-size:11.5px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:rgba(160,200,230,0.5);margin-bottom:18px;}
        .footer-links{display:flex;flex-direction:column;gap:10px;}
        .footer-link{font-size:13.5px;font-weight:300;color:rgba(160,195,225,0.5);text-decoration:none;transition:color 0.2s;}
        .footer-link:hover{color:rgba(200,230,255,0.85);}
        .footer-bottom{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;}
        .footer-copy{font-size:12.5px;color:rgba(100,140,170,0.45);}

        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}

        @media(max-width:900px){
          .about-inner,.feat-grid,.test-grid{grid-template-columns:1fr;}
          .dest-main-grid{grid-template-columns:1fr;}
          .dest-card.large{grid-column:span 1;grid-row:span 1;}
          .dest-card.large img{height:260px;}
          .hero-right{display:none;}
          .stats-inner{grid-template-columns:repeat(2,1fr);}
          .footer-top{grid-template-columns:1fr 1fr;}
          .nav-links{display:none;}
          .cta-actions{flex-direction:column;align-items:center;}
        }
      `}</style>

      {/* NAV */}
      {/* <NavBar scrollY={scrollY} /> */}

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div
          className="hero-bg"
          style={{ "--parallax": `${scrollY * 0.3}px` }}
        />
        <div className="hero-body">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              India's Smartest Travel Platform
            </div>
            <h1 className="hero-title">
              Plan Every<br />
              Journey with
              <span className="hero-title-accent">SafarSetu</span>
            </h1>
            <p className="hero-desc">
              From Himalayan trails to tropical coastlines — SafarSetu brings together smart planning, seamless booking and real-time travel management in one breathtaking platform.
            </p>
            <div className="hero-ctas">
              <Link to="/register" className="cta-main">
                ✈ Start Planning Free
              </Link>
              <Link to="/destinations" className="cta-secondary">
                Explore Destinations
                <span className="cta-arrow">→</span>
              </Link>
            </div>
          </div>

          {/* live destination ticker */}
          <div className="hero-right">
            <div className="dest-ticker">
              <div className="ticker-header">
                <span className="ticker-live" />
                Live Destinations
              </div>
              <img
                className="ticker-img"
                src={DESTINATIONS[activeCard].img}
                alt={DESTINATIONS[activeCard].name}
              />
              <div className="ticker-body">
                <span className="ticker-tag">{DESTINATIONS[activeCard].tag}</span>
                <div className="ticker-name">{DESTINATIONS[activeCard].name}</div>
                <div className="ticker-loc">{DESTINATIONS[activeCard].country}</div>
                <div className="ticker-desc">{DESTINATIONS[activeCard].desc}</div>
                <div className="ticker-meta">
                  <div className="ticker-price">
                    {DESTINATIONS[activeCard].price} <span>/ person</span>
                  </div>
                  <div className="ticker-rating">
                    <span className="star-g">★</span>
                    {DESTINATIONS[activeCard].rating}
                  </div>
                </div>
              </div>
              <div className="ticker-dots">
                {DESTINATIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`t-dot${i === activeCard ? " on" : ""}`}
                    onClick={() => setActiveCard(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="stats-bar">
          <div className="stats-inner">
            {STATS.map((s, i) => (
              <div className="stat-item" key={i}>
                <div className="stat-val">{s.value}</div>
                <div className="stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section">
        <div className="about-inner">
          <div>
            <div className="about-label">✦ About SafarSetu</div>
            <h2 className="about-title">
              Your bridge to<br />
              every <em>destination</em>
            </h2>
            <p className="about-body">
              <strong>SafarSetu</strong> — meaning "bridge of journeys" — was built for travellers who believe the journey is as important as the destination. We combine cutting-edge technology with a deep love for travel to make every trip unforgettable.
            </p>
            <p className="about-body">
              Whether you're a solo backpacker exploring Spiti Valley, a family planning a Bali holiday, or a corporate manager handling 50 business trips — SafarSetu gives you the tools, the clarity and the confidence to travel smarter.
            </p>
            <div className="about-pills">
              {["Founded in India 🇮🇳", "Pan-India Coverage", "24/7 Support", "Zero Hidden Fees"].map(p => (
                <span className="about-pill" key={p}>
                  <span className="pill-dot" />
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="about-img-grid">
            <div className="about-img-wrap">
              <img className="about-img" src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80" alt="travel" />
              <div className="about-img-overlay" />
            </div>
            <div className="about-img-wrap">
              <img className="about-img" src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&q=80" alt="travel" />
              <div className="about-img-overlay" />
            </div>
            <div className="about-img-wrap">
              <img className="about-img" src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=500&q=80" alt="travel" />
              <div className="about-img-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="features-inner">
          <div className="section-label">✦ Platform Features</div>
          <h2 className="section-title">Everything you need,<br />nothing you don't</h2>
          <p className="section-sub">Built by travellers, for travellers. Every feature solves a real problem on the road.</p>
          <div className="feat-grid">
            {FEATURES.map((f, i) => (
              <div className="feat-card" key={i}>
                <div className="feat-icon" style={{ background: f.bg }}>
                  {f.icon}
                </div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="dest-section">
        <div className="dest-section-inner">
          <div className="dest-header">
            <div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "var(--cyan)", marginBottom: "10px" }}>
                ✦ Top Destinations
              </div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.8px" }}>
                Where will you go?
              </h2>
            </div>
            <Link to="/destinations" className="dest-see-all">View all destinations →</Link>
          </div>
          <div className="dest-main-grid">
            {DESTINATIONS.slice(0, 5).map((d, i) => (
              <div className={`dest-card${i === 0 ? " large" : ""}`} key={i}>
                <img src={d.img} alt={d.name} />
                <div className="dest-overlay" />
                <div className="dest-info">
                  <span className="d-tag">{d.tag}</span>
                  <div className="d-name">{d.name}</div>
                  <div className="d-loc">{d.country}</div>
                  <div className="d-meta">
                    <span className="d-pill">⭐ {d.rating}</span>
                    <span className="d-pill">{d.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="test-inner">
          <div className="section-label">✦ Traveller Stories</div>
          <h2 className="section-title">Loved by explorers</h2>
          <p className="section-sub">Real stories from real travellers who changed the way they travel with SafarSetu.</p>
          <div className="test-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className="test-card" key={i}>
                <div className="test-stars">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <span className="test-star" key={j}>★</span>
                  ))}
                </div>
                <p className="test-text">"{t.text}"</p>
                <div className="test-author">
                  <div className="test-avatar" style={{ background: t.color }}>{t.avatar}</div>
                  <div>
                    <div className="test-name">{t.name}</div>
                    <div className="test-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="cta-pre">✦ Get Started Today</div>
        <h2 className="cta-title">
          Your next adventure<br />
          is <em>one click away</em>
        </h2>
        <p className="cta-sub">
          Join 2.4 lakh+ travellers who trust SafarSetu to plan, manage and experience every journey to the fullest.
        </p>
        <div className="cta-actions">
          <Link to="/register" className="cta-btn-main">✈ Create Free Account</Link>
          <Link to="/destinations" className="cta-btn-outline">🗺 Browse Destinations</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">Safar<span>Setu</span></div>
            <p className="footer-tagline">Your bridge to every destination. Smart travel management, beautifully designed.</p>
          </div>
          {[
            { title: "Explore", links: ["Destinations", "Experiences", "Deals", "Blog"] },
            { title: "Company", links: ["About Us", "Careers", "Press", "Contact"] },
            { title: "Support", links: ["Help Centre", "Safety", "Privacy Policy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <div className="footer-links">
                {col.links.map((l) => <a key={l} href="#" className="footer-link">{l}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 SafarSetu · Made with ♥ in India</span>
          <span className="footer-copy">Crafted for explorers everywhere 🌍</span>
        </div>
      </footer>
    </>
  );
}

function NavBar({ scrollY }) {
  return (
    <nav className={`ss-nav${scrollY > 40 ? " scrolled" : ""}`}>
      <Link to="/" className="nav-brand">
        <div className="nav-brand-icon">✈</div>
        <span className="nav-brand-text">Safar<span>Setu</span></span>
      </Link>
      <div className="nav-links">
        <Link to="/destinations" className="nav-link">Destinations</Link>
        <a href="#features" className="nav-link">Features</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#" className="nav-link">Deals</a>
      </div>
      <div className="nav-actions">
        <Link to="/login" className="btn-ghost">Sign in</Link>
        <Link to="/register" className="btn-primary">Get Started</Link>
      </div>
    </nav>
  );
}