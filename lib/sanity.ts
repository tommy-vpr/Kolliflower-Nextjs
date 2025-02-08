import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-02-04",
  useCdn: false, // ✅ Set to false for fresh data
  token: process.env.SANITY_API_TOKEN, // ✅ Use token for secure API requests
  ignoreBrowserTokenWarning: true, // ✅ Prevents unnecessary warnings
});

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).url();
}
