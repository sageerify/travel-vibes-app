"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ProviderCard } from "@/components/provider-card"
import { Footer } from "@/components/footer"
import { guides, photographers, categories, type ServiceProvider } from "@/lib/data"

const locations = ["Hunza Valley", "Skardu", "Gilgit"]
const serviceTypes = [
  { id: "guide", label: "Tour Guide" },
  { id: "photographer", label: "Photographer" },
]

export default function ExplorePage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""
  const initialType = searchParams.get("type") || ""
  const initialCategory = searchParams.get("category") || ""

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    initialType ? [initialType] : []
  )
  const [priceRange, setPriceRange] = useState([0, 300])
  const [minRating, setMinRating] = useState(0)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const allProviders: ServiceProvider[] = [...guides, ...photographers]

  const filteredProviders = useMemo(() => {
    return allProviders.filter((provider) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesName = provider.name.toLowerCase().includes(query)
        const matchesLocation = provider.location.toLowerCase().includes(query)
        const matchesSpecialties = provider.specialties.some((s) =>
          s.toLowerCase().includes(query)
        )
        if (!matchesName && !matchesLocation && !matchesSpecialties) {
          return false
        }
      }

      // Category filter
      if (initialCategory) {
        const category = categories.find((c) => c.id === initialCategory)
        if (category) {
          const matchesLocation = provider.location.toLowerCase().includes(category.name.toLowerCase())
          const matchesSpecialty = provider.specialties.some((s) =>
            s.toLowerCase().includes(category.name.toLowerCase())
          )
          if (!matchesLocation && !matchesSpecialty) {
            return false
          }
        }
      }

      // Location filter
      if (selectedLocations.length > 0) {
        if (!selectedLocations.includes(provider.location)) {
          return false
        }
      }

      // Type filter
      if (selectedTypes.length > 0) {
        if (!selectedTypes.includes(provider.type)) {
          return false
        }
      }

      // Price filter
      if (provider.price < priceRange[0] || provider.price > priceRange[1]) {
        return false
      }

      // Rating filter
      if (provider.rating < minRating) {
        return false
      }

      return true
    })
  }, [allProviders, searchQuery, initialCategory, selectedLocations, selectedTypes, priceRange, minRating])

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    )
  }

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedLocations([])
    setSelectedTypes([])
    setPriceRange([0, 300])
    setMinRating(0)
  }

  const activeFiltersCount = [
    selectedLocations.length > 0,
    selectedTypes.length > 0,
    priceRange[0] > 0 || priceRange[1] < 300,
    minRating > 0,
  ].filter(Boolean).length

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Service Type */}
      <div>
        <h3 className="mb-3 font-semibold text-foreground">Service Type</h3>
        <div className="space-y-2">
          {serviceTypes.map((type) => (
            <div key={type.id} className="flex items-center gap-2">
              <Checkbox
                id={`type-${type.id}`}
                checked={selectedTypes.includes(type.id)}
                onCheckedChange={() => toggleType(type.id)}
              />
              <Label
                htmlFor={`type-${type.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="mb-3 font-semibold text-foreground">Location</h3>
        <div className="space-y-2">
          {locations.map((location) => (
            <div key={location} className="flex items-center gap-2">
              <Checkbox
                id={`location-${location}`}
                checked={selectedLocations.includes(location)}
                onCheckedChange={() => toggleLocation(location)}
              />
              <Label
                htmlFor={`location-${location}`}
                className="text-sm font-normal cursor-pointer"
              >
                {location}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-3 font-semibold text-foreground">Price Range</h3>
        <div className="px-1">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={300}
            step={10}
            className="mb-2"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="mb-3 font-semibold text-foreground">Minimum Rating</h3>
        <div className="flex gap-2">
          {[0, 4, 4.5, 4.8].map((rating) => (
            <Button
              key={rating}
              variant={minRating === rating ? "default" : "outline"}
              size="sm"
              onClick={() => setMinRating(rating)}
              className="text-xs"
            >
              {rating === 0 ? "Any" : `${rating}+`}
            </Button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="ghost" onClick={clearFilters} className="w-full">
          <X className="mr-2 h-4 w-4" />
          Clear all filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto flex-1 px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Explore Guides & Photographers
          </h1>
          <p className="mt-2 text-muted-foreground">
            Find the perfect local expert for your adventure
          </p>
        </div>

        {/* Search and Mobile Filter */}
        <div className="mb-6 flex gap-3">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search by name, location, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11"
            />
          </div>
          
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-11 lg:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters Badges */}
        {(selectedLocations.length > 0 || selectedTypes.length > 0 || initialCategory) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {initialCategory && (
              <Badge variant="secondary" className="gap-1">
                {categories.find((c) => c.id === initialCategory)?.name}
              </Badge>
            )}
            {selectedTypes.map((type) => (
              <Badge key={type} variant="secondary" className="gap-1">
                {serviceTypes.find((t) => t.id === type)?.label}
                <button onClick={() => toggleType(type)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {selectedLocations.map((location) => (
              <Badge key={location} variant="secondary" className="gap-1">
                {location}
                <button onClick={() => toggleLocation(location)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 font-semibold text-foreground">Filters</h2>
              <FilterContent />
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-muted-foreground">
              {filteredProviders.length} {filteredProviders.length === 1 ? "result" : "results"} found
            </div>

            {filteredProviders.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 py-16 text-center">
                <p className="text-lg font-medium text-foreground">No results found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
