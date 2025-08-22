"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Instagram } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function SushiTimePage() {
  const heroRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")

          // Add special effects for different elements
          if (entry.target.classList.contains("gallery-item")) {
            setTimeout(() => {
              entry.target.classList.add("reveal-complete")
            }, 600)
          }
        }
      })
    }, observerOptions)

    // Observe elements for scroll animations
    const elementsToObserve = document.querySelectorAll(".scroll-animate")
    elementsToObserve.forEach((el) => observer.observe(el))

    // Advanced parallax and mouse tracking
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.3

      if (heroRef.current) {
        const parallaxBg = heroRef.current.querySelector(".parallax-bg") as HTMLElement
        const heroContent = heroRef.current.querySelector(".hero-content") as HTMLElement

        if (parallaxBg) {
          parallaxBg.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0) scale(${1 + scrolled * 0.0002})`
        }

        if (heroContent) {
          heroContent.style.transform = `translate3d(0, ${rate}px, 0)`
        }
      }

      // Floating elements effect
      const floatingElements = document.querySelectorAll(".floating-element")
      floatingElements.forEach((el, index) => {
        const speed = 0.1 + index * 0.05
        const yPos = -(scrolled * speed)
        ;(el as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    // Staggered animation for gallery items with advanced timing
    const galleryItems = document.querySelectorAll(".gallery-item")
    galleryItems.forEach((item, index) => {
      const delay = index * 0.15 + Math.random() * 0.1
      ;(item as HTMLElement).style.animationDelay = `${delay}s`
    })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      className={`min-h-screen bg-background transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        .scroll-animate {
          opacity: 0;
          transform: translateY(60px) rotateX(10deg);
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }
        
        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0) rotateX(0deg);
        }
        
        .gallery-item {
          opacity: 0;
          transform: translateY(80px) scale(0.8) rotateY(15deg);
          animation: advancedFadeInUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-style: preserve-3d;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .gallery-item:hover {
          transform: translateY(-20px) scale(1.05) rotateY(0deg);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.25);
          z-index: 10;
        }
        
        .gallery-item.reveal-complete {
          transform: translateY(0) scale(1) rotateY(0deg);
        }
        
        @keyframes advancedFadeInUp {
          0% {
            opacity: 0;
            transform: translateY(80px) scale(0.8) rotateY(15deg);
          }
          60% {
            opacity: 0.8;
            transform: translateY(-10px) scale(1.02) rotateY(-2deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateY(0deg);
          }
        }
        
        .hero-content {
          animation: heroAdvancedFadeIn 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-style: preserve-3d;
        }
        
        @keyframes heroAdvancedFadeIn {
          0% {
            opacity: 0;
            transform: translateY(100px) scale(0.9) rotateX(20deg);
          }
          50% {
            opacity: 0.7;
            transform: translateY(-20px) scale(1.02) rotateX(-5deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
          }
        }
        
        .feature-card {
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
          position: relative;
          overflow: hidden;
        }
        
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.8s;
        }
        
        .feature-card:hover::before {
          left: 100%;
        }
        
        .feature-card:hover {
          transform: translateY(-20px) rotateX(5deg) rotateY(-5deg);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
        }
        
        .magnetic-btn {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }
        
        .floating-element {
          transition: transform 0.1s ease-out;
        }
        
        .parallax-bg {
          will-change: transform;
          transform-style: preserve-3d;
        }
        
        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .text-glow {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }
        
        .morphing-bg {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .image-reveal {
          overflow: hidden;
          position: relative;
        }
        
        .image-reveal::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.8s;
        }
        
        .image-reveal:hover::after {
          transform: translateX(100%);
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 parallax-bg">
          <Image
            src="/images/sushi-hero.jpg"
            alt="Sushi Time - Auténtico sushi japonés"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl floating-element"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 rounded-full bg-gradient-to-r from-accent/30 to-primary/30 blur-lg floating-element"></div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto hero-content">
          <div className="mb-8 floating-element">
            <Image
              src="/images/logo.png"
              alt="Sushi Time Logo"
              width={450}
              height={225}
              className="mx-auto drop-shadow-2xl"
              priority
            />
          </div>
          <p className="text-xl md:text-3xl mb-12 font-light opacity-90 text-glow floating-element">
            Auténtico sushi y poké en Buenos Aires
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center floating-element">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg font-bold rounded-2xl shadow-2xl border border-white/20 hover:scale-105 transition-all duration-500"
              asChild
            >
              <a href="https://pedidos.masdelivery.com/sushi-time" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-3 h-6 w-6" />
                Pedí Ahora
              </a>
            </Button>
            <Button
              size="lg"
              className="glass-effect text-white px-10 py-6 text-lg font-bold rounded-2xl shadow-2xl hover:bg-white/20 hover:scale-105 transition-all duration-500"
              asChild
            >
              <a href="https://www.instagram.com/sushitimebsas/" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-3 h-6 w-6" />
                Seguinos
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-muted to-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-20 text-foreground scroll-animate bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Nuestras Creaciones
          </h2>

          <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
              <div
                key={index}
                className="relative aspect-square rounded-3xl overflow-hidden group gallery-item scroll-animate image-reveal"
              >
                <Image
                  src={`/images/sushi-gallery-${index}.jpg`}
                  alt={`Creación de sushi ${index}`}
                  fill
                  className="object-cover group-hover:scale-125 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 morphing-bg opacity-5"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-12 text-foreground scroll-animate bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Tradición Japonesa
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-16 max-w-4xl mx-auto font-light scroll-animate">
            En Sushi Time, cada pieza es una obra de arte. Utilizamos ingredientes frescos de la más alta calidad y
            técnicas tradicionales japonesas para brindarte sushi auténtico y poké bowls únicos en Buenos Aires.
          </p>

          <div ref={featuresRef} className="grid md:grid-cols-3 gap-10 mt-20">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-3xl shadow-2xl feature-card scroll-animate">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <div className="text-3xl">🍣</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">Ingredientes Frescos</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Seleccionamos cuidadosamente cada ingrediente para garantizar la máxima frescura y calidad.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-3xl shadow-2xl feature-card scroll-animate">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <div className="text-3xl">👨‍🍳</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">Técnica Tradicional</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Nuestros chefs dominan las técnicas ancestrales japonesas para crear sushi auténtico.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-3xl shadow-2xl feature-card scroll-animate">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <div className="text-3xl">🚚</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">Delivery Rápido</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Llevamos el mejor sushi directamente a tu mesa, manteniendo la frescura y calidad.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-primary via-secondary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-white scroll-animate text-glow">
            ¿Listo para una experiencia única?
          </h2>
          <p className="text-2xl text-white/90 mb-12 font-light scroll-animate">
            Hacé tu pedido online y disfrutá del mejor sushi de Buenos Aires
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 px-16 py-8 text-2xl font-bold rounded-2xl shadow-2xl hover:scale-110 transition-all duration-500 scroll-animate"
            asChild
          >
            <a href="https://pedidos.masdelivery.com/sushi-time" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-4 h-8 w-8" />
              Hacer Pedido
            </a>
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-16 text-foreground scroll-animate">Contacto</h2>

          <div className="grid md:grid-cols-2 gap-10">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-3xl shadow-2xl feature-card scroll-animate">
              <CardContent className="p-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mr-4">
                    <Instagram className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground">Redes Sociales</h3>
                </div>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  Seguinos para ver nuestras últimas creaciones y promociones especiales.
                </p>
                <Button
                  variant="outline"
                  className="rounded-2xl bg-transparent hover:scale-105 transition-all duration-500 px-8 py-4 text-lg font-semibold"
                  asChild
                >
                  <a href="https://www.instagram.com/sushitimebsas/" target="_blank" rel="noopener noreferrer">
                    @sushitimebsas
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-3xl shadow-2xl feature-card scroll-animate">
              <CardContent className="p-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mr-4">
                    <ExternalLink className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground">Pedidos Online</h3>
                </div>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  Hacé tu pedido fácil y rápido a través de nuestra plataforma online.
                </p>
                <Button
                  variant="outline"
                  className="rounded-2xl bg-transparent hover:scale-105 transition-all duration-500 px-8 py-4 text-lg font-semibold"
                  asChild
                >
                  <a href="https://pedidos.masdelivery.com/sushi-time" target="_blank" rel="noopener noreferrer">
                    Ir a Pedidos
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted text-foreground py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6">
            <Image
              src="/images/logo.png"
              alt="Sushi Time Logo"
              width={250}
              height={125}
              className="mx-auto drop-shadow-lg"
            />
          </div>
          <p className="text-muted-foreground mb-8 text-lg">Auténtico sushi y poké en Buenos Aires</p>
          <div className="flex justify-center space-x-8">
            <a
              href="https://www.instagram.com/sushitimebsas/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-all duration-500 hover:scale-125"
            >
              <Instagram className="h-8 w-8" />
            </a>
            <a
              href="https://pedidos.masdelivery.com/sushi-time"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-all duration-500 hover:scale-125"
            >
              <ExternalLink className="h-8 w-8" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
