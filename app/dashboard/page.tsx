import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Heart, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Footer } from "@/components/footer"
import { bookings, guides, photographers } from "@/lib/data"

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
}

const savedProviders = [guides[0], photographers[0], guides[1]]

export default function DashboardPage() {
  const upcomingBookings = bookings.filter(
    (b) => b.status === "pending" || b.status === "confirmed"
  )
  const pastBookings = bookings.filter(
    (b) => b.status === "completed" || b.status === "cancelled"
  )

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto flex-1 px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              My Dashboard
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage your bookings and saved guides
            </p>
          </div>
          <Link href="/explore">
            <Button>
              Find New Guides
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{upcomingBookings.length}</p>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pastBookings.length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{savedProviders.length}</p>
                <p className="text-sm text-muted-foreground">Saved</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                <MapPin className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Destinations</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Section */}
        <Tabs defaultValue="upcoming" className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold">My Bookings</h2>
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upcoming">
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-medium">No upcoming bookings</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Start exploring and book your next adventure!
                  </p>
                  <Link href="/explore">
                    <Button>Explore Guides</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastBookings.length > 0 ? (
              <div className="space-y-4">
                {pastBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Clock className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-medium">No past bookings</h3>
                  <p className="text-sm text-muted-foreground">
                    Your completed trips will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Saved Guides */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold">Saved Guides</h2>
            <Link href="/explore" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {savedProviders.map((provider) => (
              <Card key={provider.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <Link href={`/profile/${provider.id}`} className="flex gap-4 p-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={provider.image} alt={provider.name} />
                      <AvatarFallback>
                        {provider.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{provider.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {provider.location}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Heart className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge
                          variant={provider.type === "guide" ? "default" : "secondary"}
                          className="text-xs capitalize"
                        >
                          {provider.type}
                        </Badge>
                        <span className="text-sm font-medium text-primary">
                          ${provider.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

function BookingCard({ booking }: { booking: (typeof bookings)[0] }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={booking.providerImage}
                alt={booking.providerName}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{booking.providerName}</h3>
                <Badge
                  variant="outline"
                  className={`text-xs capitalize ${statusColors[booking.status]}`}
                >
                  {booking.status}
                </Badge>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(booking.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {booking.location}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-lg font-bold text-primary">${booking.totalPrice}</p>
            <Link href={`/profile/${booking.providerId}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
