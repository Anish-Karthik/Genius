import { LandingContent } from "@/components/LandingContent";
import { LandingHero } from "@/components/LandingHero";
import LandingNavbar from "@/components/LandingNavbar";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
export default function LandingPage() {
  return (
    <div className="h-full" >
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  )
}