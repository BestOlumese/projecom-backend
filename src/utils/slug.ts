export function generateSlug(name: string) {
  // Convert name to lowercase and replace spaces with hyphens
  const baseSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with hyphens

  // Add random string at the end
  const randomString = Math.random().toString(36).substring(2, 8); // 6 character random string

  return `${baseSlug}-${randomString}`;
}
