import strains from "@/data/strains"; // Mock data, replace with API call

export function fetchProductByName(name: string) {
  if (!name) return null;

  return (
    strains.find(
      (product) => product.name.toLowerCase() === name.toLowerCase()
    ) || null
  );
}
