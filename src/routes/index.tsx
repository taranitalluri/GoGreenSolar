import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sun, Zap, Shield, Phone, Mail, MapPin, Star, Leaf, Battery, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-solar.jpg";
import rooftopImg from "@/assets/solar-rooftop.jpg";
import groundImg from "@/assets/solar-ground.jpg";
import commercialImg from "@/assets/solar-commercial.jpg";
import offgridImg from "@/assets/solar-offgrid.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Go Green — Sustainable Solar Solutions" },
      { name: "description", content: "Go Green provides premium solar panel installations for residential, commercial, and off-grid systems. Power your future sustainably." },
      { property: "og:title", content: "Go Green — Sustainable Solar Solutions" },
      { property: "og:description", content: "Premium solar installations for a greener tomorrow." },
    ],
  }),
  component: HomePage,
});

const fadeUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -80 }, visible: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 80 }, visible: { opacity: 1, x: 0 } };
const zoomIn = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } };
const fadeDown = { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0 } };

function FloatingShapes({ variant = "leaves" }: { variant?: "leaves" | "suns" | "mixed" }) {
  // Light, slow-moving decorative shapes for section backgrounds.
  const shapes = [
    { Icon: Leaf, size: 80, top: "8%", left: "6%", duration: 14, delay: 0, x: 30, y: 20, rotate: 25 },
    { Icon: Sun, size: 110, top: "15%", left: "78%", duration: 18, delay: 1, x: -40, y: 30, rotate: -20 },
    { Icon: Leaf, size: 60, top: "55%", left: "85%", duration: 16, delay: 2, x: -25, y: -35, rotate: 40 },
    { Icon: Leaf, size: 95, top: "70%", left: "10%", duration: 20, delay: 0.5, x: 35, y: -25, rotate: -30 },
    { Icon: Sun, size: 70, top: "40%", left: "45%", duration: 22, delay: 1.5, x: 20, y: 40, rotate: 15 },
    { Icon: Leaf, size: 50, top: "85%", left: "55%", duration: 15, delay: 2.5, x: -30, y: -20, rotate: -45 },
  ];
  const pick = (i: number) => {
    if (variant === "leaves") return Leaf;
    if (variant === "suns") return Sun;
    return i % 2 === 0 ? shapes[i].Icon : shapes[i].Icon;
  };
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {shapes.map((s, i) => {
        const Icon = pick(i);
        return (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            style={{ top: s.top, left: s.left }}
            animate={{ x: [0, s.x, 0], y: [0, s.y, 0], rotate: [0, s.rotate, 0] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon style={{ width: s.size, height: s.size }} strokeWidth={1.2} />
          </motion.div>
        );
      })}
    </div>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="w-8 h-8" />
          <span className="text-2xl font-bold tracking-tight">Go Green</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#about" className="hover:opacity-80 transition-opacity">About Us</a>
          <a href="#solar-types" className="hover:opacity-80 transition-opacity">Solar Types</a>
          <a href="#testimonials" className="hover:opacity-80 transition-opacity">Testimonials</a>
          <a href="#contact" className="hover:opacity-80 transition-opacity">Contact</a>
        </nav>
        <Button variant="secondary" size="sm" className="font-semibold">
          Get a Quote
        </Button>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Solar panels on green hills at sunrise" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.25 0.12 150 / 0.85), oklch(0.35 0.14 145 / 0.7), oklch(0.5 0.16 140 / 0.5))" }} />
      </div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <Leaf className="w-16 h-16 mx-auto mb-6 text-primary-glow" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6"
        >
          Powering a{" "}
          <span className="text-primary-glow">Greener</span>{" "}
          Tomorrow
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Harness the unlimited power of the sun with Go Green's premium solar installations tailored for every need.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Button size="lg" className="bg-primary-glow text-foreground font-bold px-8 py-6 text-lg hover:brightness-110 transition-all">
            Get Started Today
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
            Learn More
          </Button>
        </motion.div>
      </div>
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-white/70" />
      </motion.div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: "5,000+", label: "Panels Installed" },
    { value: "1,200+", label: "Happy Customers" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Customer Satisfaction" },
  ];
  return (
    <section className="bg-primary py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center text-primary-foreground"
          >
            <div className="text-3xl md:text-4xl font-extrabold">{s.value}</div>
            <div className="text-sm mt-1 opacity-80">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative py-24 bg-background overflow-hidden">
      <FloatingShapes variant="mixed" />
      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">About Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            We Make Solar{" "}
            <span className="text-primary">Simple</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Sun, text: "Clean Energy" },
              { icon: Shield, text: "25-Year Warranty" },
              { icon: Zap, text: "Fast Installation" },
              { icon: Battery, text: "Battery Storage" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden" style={{ boxShadow: "var(--shadow-leaf)" }}>
            <img src={rooftopImg} alt="Residential solar installation" className="w-full h-auto" width={1024} height={768} loading="lazy" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-5 shadow-xl">
            <div className="text-3xl font-extrabold">15+</div>
            <div className="text-sm opacity-80">Years of Excellence</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SolarTypesSection() {
  const types = [
    {
      title: "Residential Rooftop",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Perfect for homeowners looking to reduce their electricity bills and carbon footprint with sleek panel installations.",
      img: rooftopImg,
      features: ["Grid-tied system", "Net metering ready", "25-year panel warranty"],
    },
    {
      title: "Ground-Mounted",
      desc: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ideal for properties with ample land, offering maximum energy production with adjustable tilt angles.",
      img: groundImg,
      features: ["Adjustable angles", "Higher output", "Easy maintenance"],
    },
    {
      title: "Commercial Systems",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Large-scale installations for businesses, warehouses, and industrial facilities seeking energy independence.",
      img: commercialImg,
      features: ["Tax incentives", "Scalable design", "ROI in 3-5 years"],
    },
    {
      title: "Off-Grid Systems",
      desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore. Complete energy independence with battery storage for remote locations and cabins.",
      img: offgridImg,
      features: ["Battery backup", "Complete independence", "Remote monitoring"],
    },
  ];

  const animations = [fadeLeft, fadeRight, fadeLeft, fadeRight];

  return (
    <section id="solar-types" className="py-24 bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={fadeDown}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Our Solutions</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-3">
            Types of Solar We{" "}
            <span className="text-primary">Install</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Solar comes in many forms — each engineered for a different environment, scale, and goal. Explore the systems we expertly design and install.
          </p>
        </motion.div>

        <div className="space-y-20">
          {types.map((type, i) => (
            <motion.div
              key={type.title}
              variants={animations[i]}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "md:direction-rtl" : ""}`}
            >
              <div className={i % 2 !== 0 ? "md:order-2" : ""}>
                <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-leaf)" }}>
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={type.img}
                    alt={type.title}
                    className="w-full h-72 object-cover"
                    width={1024}
                    height={768}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className={i % 2 !== 0 ? "md:order-1" : ""}>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{type.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{type.desc}</p>
                <ul className="space-y-3">
                  {type.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Leaf className="w-3 h-3 text-primary-foreground" />
                      </div>
                      <span className="text-foreground font-medium text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { name: "Sarah Johnson", role: "Homeowner", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Go Green transformed our home with a beautiful rooftop installation. Our bills dropped by 70%!", rating: 5 },
    { name: "Michael Chen", role: "Business Owner", text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. The commercial system paid for itself in under 4 years. Highly recommended!", rating: 5 },
    { name: "Emma Williams", role: "Farm Owner", text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. The ground-mounted system was perfectly designed for our rural property.", rating: 5 },
  ];

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={zoomIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-3">
            What Our Customers{" "}
            <span className="text-primary">Say</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-lg"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-secondary">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Contact Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Ready to Go{" "}
            <span className="text-primary">Green?</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Reach out to us for a free consultation and custom quote for your solar installation.
          </p>
          <div className="space-y-5">
            {[
              { icon: Phone, text: "+1 (555) 123-4567" },
              { icon: Mail, text: "hello@gogreensolar.com" },
              { icon: MapPin, text: "123 Solar Avenue, Green City, GC 54321" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-foreground font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
            <h3 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder="Tell us about your solar needs..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <Button className="w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90">
                Send Message
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-7 h-7" />
              <span className="text-xl font-bold">Go Green</span>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leading the way in sustainable solar energy solutions since 2009.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#about" className="hover:opacity-100 transition-opacity">About Us</a></li>
              <li><a href="#solar-types" className="hover:opacity-100 transition-opacity">Solar Types</a></li>
              <li><a href="#testimonials" className="hover:opacity-100 transition-opacity">Testimonials</a></li>
              <li><a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Residential Solar</li>
              <li>Commercial Solar</li>
              <li>Ground-Mounted</li>
              <li>Off-Grid Systems</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>+1 (555) 123-4567</li>
              <li>hello@gogreensolar.com</li>
              <li>123 Solar Avenue</li>
              <li>Green City, GC 54321</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm opacity-70">&copy; {new Date().getFullYear()} Go Green Solar. All rights reserved.</p>
          <div className="flex gap-6 text-sm opacity-70">
            <span className="hover:opacity-100 cursor-pointer transition-opacity">Privacy Policy</span>
            <span className="hover:opacity-100 cursor-pointer transition-opacity">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <SolarTypesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
