import Image from "next/image"
import Link from "next/link"
import { Star, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Guide, Photographer } from "@/lib/data"

interface ProviderCardProps {
  provider: Guide | Photographer
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Link href={`/profile/${provider.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={provider.image}
            alt={provider.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge 
            className="absolute top-3 right-3 capitalize"
            variant={provider.type === "guide" ? "default" : "secondary"}
          >
            {provider.type}
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">{provider.name}</h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{provider.rating}</span>
              <span className="text-muted-foreground">({provider.reviewCount})</span>
            </div>
          </div>
          <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{provider.location}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {provider.specialties.slice(0, 2).map((specialty) => (
              <Badge key={specialty} variant="outline" className="text-xs font-normal">
                {specialty}
              </Badge>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-sm">
              <span className="font-semibold text-primary">${provider.price}</span>
              <span className="text-muted-foreground"> {provider.priceUnit}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
