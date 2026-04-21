import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MapPin, Star, Globe, Award, Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarRating } from "@/components/star-rating"
import { Footer } from "@/components/footer"
import { getProviderById, getReviewsByProviderId, type Photographer } from "@/lib/data"

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params
  const provider = getProviderById(id)
  
  if (!provider) {
    notFound()
  }

  const reviews = getReviewsByProviderId(id)
  const isPhotographer = provider.type === "photographer"

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Image */}
      <div className="relative h-64 bg-muted md:h-80 lg:h-96">
        <Image
          src={isPhotographer ? (provider as Photographer).portfolio[0] : "https://images.unsplash.com/photo-1586076545232-6c787bafc2b0?w=1920&h=600&fit=crop"}
          alt={`${provider.name}'s cover`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute left-4 top-4">
          <Link href="/explore">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Explore
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto flex-1 px-4">
        <div className="relative -mt-20 mb-8 lg:-mt-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            {/* Profile Info Card */}
            <div className="lg:w-1/3">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="-mt-16 mb-4 flex justify-center lg:-mt-20">
                    <div className="rounded-full border-4 border-card bg-card">
                      <Avatar className="h-28 w-28 lg:h-36 lg:w-36">
                        <AvatarImage src={provider.image} alt={provider.name} />
                        <AvatarFallback className="text-2xl">
                          {provider.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  <div className="text-center">
                    <Badge variant={provider.type === "guide" ? "default" : "secondary"} className="mb-2 capitalize">
                      {provider.type}
                    </Badge>
                    <h1 className="font-serif text-2xl font-bold text-foreground">
                      {provider.name}
                    </h1>
                    <div className="mt-2 flex items-center justify-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{provider.location}</span>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-center">
                      <StarRating
                        rating={provider.rating}
                        showValue
                        reviewCount={provider.reviewCount}
                      />
                    </div>
                  </div>

                  <div className="mt-6 border-t border-border pt-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-muted-foreground">Price</span>
                      <span className="text-xl font-bold text-primary">
                        ${provider.price}
                        <span className="text-sm font-normal text-muted-foreground">
                          {" "}/{provider.priceUnit.replace("per ", "")}
                        </span>
                      </span>
                    </div>
                    
                    <Link href={`/booking/${provider.id}`} className="block">
                      <Button className="w-full" size="lg">
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Now
                      </Button>
                    </Link>
                  </div>

                  {/* Quick Info */}
                  <div className="mt-6 space-y-3 border-t border-border pt-6">
                    {"languages" in provider && (
                      <div className="flex items-start gap-3">
                        <Globe className="mt-0.5 h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Languages</p>
                          <p className="text-sm text-muted-foreground">
                            {provider.languages.join(", ")}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <Award className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Specialties</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {provider.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-8 pb-12 lg:pt-24">
              {/* Bio */}
              <Card>
                <CardHeader>
                  <CardTitle>About {provider.name.split(" ")[0]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-muted-foreground">
                    {provider.bio}
                  </p>
                </CardContent>
              </Card>

              {/* Portfolio (for photographers) */}
              {isPhotographer && (
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {(provider as Photographer).portfolio.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-[3/2] overflow-hidden rounded-lg"
                        >
                          <Image
                            src={image}
                            alt={`Portfolio image ${index + 1}`}
                            fill
                            className="object-cover transition-transform hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Reviews
                    <Badge variant="secondary">{provider.reviewCount}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {reviews.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={review.userImage} alt={review.userName} />
                              <AvatarFallback>
                                {review.userName.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{review.userName}</p>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                              <StarRating rating={review.rating} size="sm" />
                              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No reviews yet. Be the first to book and leave a review!
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
