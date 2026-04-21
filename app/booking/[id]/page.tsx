"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, MapPin, Star, CreditCard, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Footer } from "@/components/footer"
import { getProviderById } from "@/lib/data"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface BookingPageProps {
  params: Promise<{ id: string }>
}

export default function BookingPage({ params }: BookingPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const provider = getProviderById(id)

  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (!provider) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Provider not found</h1>
          <Link href="/explore">
            <Button className="mt-4">Back to Explore</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Redirect to dashboard after success
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <Card className="max-w-md text-center">
          <CardContent className="p-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-2 font-serif text-2xl font-bold">Booking Confirmed!</h2>
            <p className="text-muted-foreground">
              Your booking request has been sent to {provider.name}. You&apos;ll receive a
              confirmation shortly.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Redirecting to your dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto flex-1 px-4 py-8">
        <Link
          href={`/profile/${provider.id}`}
          className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to profile
        </Link>

        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Book Your Experience
          </h1>
          <p className="mt-2 text-muted-foreground">
            Complete your booking with {provider.name}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Your Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="name">Full Name</FieldLabel>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+92 300 1234567"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </Field>
                    </div>

                    <Field>
                      <FieldLabel>Preferred Date</FieldLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="message">Message (Optional)</FieldLabel>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your trip plans, group size, special requirements..."
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </Field>
                  </FieldGroup>
                </CardContent>
              </Card>

              {/* Payment Placeholder */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-dashed border-border bg-muted/50 p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Payment integration coming soon. For now, you&apos;ll arrange payment
                      directly with {provider.name.split(" ")[0]} after your booking is confirmed.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || !date || !formData.name || !formData.email}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? "Submitting..." : "Confirm Booking"}
                </Button>
              </div>
            </form>
          </div>

          {/* Summary Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={provider.image}
                      alt={provider.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Badge
                      variant={provider.type === "guide" ? "default" : "secondary"}
                      className="mb-1 capitalize"
                    >
                      {provider.type}
                    </Badge>
                    <h3 className="font-semibold">{provider.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {provider.location}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-medium">{provider.rating}</span>
                  <span className="text-muted-foreground">
                    ({provider.reviewCount} reviews)
                  </span>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  {date && (
                    <div className="mb-3 flex justify-between text-sm">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{format(date, "MMM d, yyyy")}</span>
                    </div>
                  )}
                  <div className="mb-3 flex justify-between text-sm">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-medium capitalize">{provider.type}</span>
                  </div>
                  <div className="mb-3 flex justify-between text-sm">
                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-medium">
                      ${provider.price} {provider.priceUnit}
                    </span>
                  </div>
                </div>

                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-primary">
                      ${provider.price}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Final amount may vary based on duration
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
