import Image from "next/image"
import Link from "next/link"

interface CategoryCardProps {
  id: string
  name: string
  image: string
}

export function CategoryCard({ id, name, image }: CategoryCardProps) {
  return (
    <Link 
      href={`/explore?category=${id}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-xl"
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-end p-4">
        <h3 className="font-serif text-xl font-semibold text-white drop-shadow-lg">
          {name}
        </h3>
      </div>
    </Link>
  )
}
