import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FeaturedStartups } from "@/components/featured-startups"
import { AllStartups } from "@/components/all-startups"
import { WhyUpforge } from "@/components/why-upforge"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedStartups />
        <AllStartups />
        <WhyUpforge />
      </main>
      <Footer />
    </div>
  )
}
