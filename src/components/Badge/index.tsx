export function Badge({ genre }: { genre: string }) {
  return (
    <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
      {genre}
    </span>
  )
}
