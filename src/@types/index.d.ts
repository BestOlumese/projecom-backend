declare function hash(
  data: string | Buffer,
  saltOrRounds: string | number
): Promise<string>;

declare function compare(
  data: string | Buffer,
  encrypted: string
): Promise<boolean>;

interface ProductQuery {
  query?: string;
  minPrice?: string;
  maxPrice?: string;
  subcategory?: string;
  status?: string;
  inStock?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  limit?: string;
  specifications?: string;
}

interface VendorProductQuery {
  location?: string;
  name?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "businessName";
  sortOrder?: "asc" | "desc";
}
