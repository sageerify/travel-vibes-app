"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  placeholder?: string
  className?: string
  size?: "default" | "lg"
}

export function SearchBar({ 
  placeholder = "Find guides or photographers in Gilgit-Baltistan", 
  className = "",
  size = "default"
}: SearchBarProps) {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/explore?search=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={`relative flex items-center ${size === "lg" ? "max-w-2xl" : "max-w-md"}`}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`pl-10 pr-4 ${size === "lg" ? "h-12 text-base" : "h-10"} rounded-full border-border bg-background`}
          />
        </div>
        <Button 
          type="submit" 
          className={`ml-2 ${size === "lg" ? "h-12 px-6" : "h-10"} rounded-full`}
        >
          Search
        </Button>
      </div>
    </form>
  )
}
