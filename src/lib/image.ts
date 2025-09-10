import { client } from '@/sanity/lib/client'
import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const imageBuilder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return imageBuilder.image(source)
}
