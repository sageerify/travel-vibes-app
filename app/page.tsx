import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Mountain, Camera, Shield, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { ProviderCard } from "@/components/provider-card"
import { CategoryCard } from "@/components/category-card"
import { Footer } from "@/components/footer"
import { guides, photographers, categories } from "@/lib/data"

export default function HomePage() {
  const featuredGuides = guides.slice(0, 4)
  const featuredPhotographers = photographers.slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
<Image
  src="/hunza.png"
  alt="Hunza Valley landscape with mountains"
  fill
  className="object-cover"
  priority
/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-balance">
            Discover the Magic of<br />Gilgit-Baltistan
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 leading-relaxed text-pretty">
            Connect with local tour guides and photographers who bring the beauty of Pakistan&apos;s northern regions to life.
          </p>
          
          <div className="mt-10 flex justify-center">
            <SearchBar size="lg" className="w-full max-w-2xl" />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <Mountain className="h-5 w-5" />
              <span>Expert Local Guides</span>
            </div>
            <div className="h-4 w-px bg-white/30 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              <span>Professional Photographers</span>
            </div>
            <div className="h-4 w-px bg-white/30 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>Verified & Trusted</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Guides Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Featured Guides
            </h2>
            <p className="mt-2 text-muted-foreground">
              Explore with experts who know every trail and hidden gem
            </p>
          </div>
          <Link href="/explore?type=guide" className="hidden sm:flex items-center gap-1 text-primary hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredGuides.map((guide) => (
            <ProviderCard key={guide.id} provider={guide} />
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link href="/explore?type=guide">
            <Button variant="outline">View all guides</Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-muted/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Explore Destinations
            </h2>
            <p className="mt-2 text-muted-foreground">
              From majestic valleys to ancient cultures, discover it all
            </p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                image={category.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Photographers Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Featured Photographers
            </h2>
            <p className="mt-2 text-muted-foreground">
              Capture your journey with talented local artists
            </p>
          </div>
          <Link href="/explore?type=photographer" className="hidden sm:flex items-center gap-1 text-primary hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPhotographers.map((photographer) => (
            <ProviderCard key={photographer.id} provider={photographer} />
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link href="/explore?type=photographer">
            <Button variant="outline">View all photographers</Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Why Travel With Us
            </h2>
            <p className="mt-2 opacity-90">
              The authentic way to experience Gilgit-Baltistan
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Mountain,
                title: "Local Expertise",
                description: "Our guides are born and raised in these mountains, offering unmatched local knowledge.",
              },
              {
                icon: Camera,
                title: "Pro Photography",
                description: "Award-winning photographers to capture your adventure in stunning detail.",
              },
              {
                icon: Shield,
                title: "Verified Profiles",
                description: "All our guides and photographers are verified for your safety and peace of mind.",
              },
              {
                icon: Heart,
                title: "Authentic Experience",
                description: "Immerse yourself in local culture with personalized, off-the-beaten-path tours.",
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/10">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground md:p-12">
            <div className="relative z-10">
              <h3 className="font-serif text-2xl font-bold md:text-3xl">Become a Guide</h3>
              <p className="mt-3 max-w-sm opacity-90 leading-relaxed">
                Share your knowledge of Gilgit-Baltistan with travelers from around the world and earn on your own terms.
              </p>
              <Link href="/signup?role=guide">
                <Button variant="secondary" className="mt-6">
                  Start Guiding <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <Mountain className="absolute -bottom-4 -right-4 h-32 w-32 opacity-10" />
          </div>
          
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent to-accent/80 p-8 text-accent-foreground md:p-12">
            <div className="relative z-10">
              <h3 className="font-serif text-2xl font-bold md:text-3xl">Join as Photographer</h3>
              <p className="mt-3 max-w-sm opacity-90 leading-relaxed">
                Showcase your portfolio, connect with travelers, and turn your passion for photography into a thriving business.
              </p>
              <Link href="/signup?role=photographer">
                <Button variant="secondary" className="mt-6">
                  Start Shooting <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <Camera className="absolute -bottom-4 -right-4 h-32 w-32 opacity-10" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
