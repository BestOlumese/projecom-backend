declare function hash(
  data: string | Buffer,
  saltOrRounds: string | number
): Promise<string>;

declare function compare(
  data: string | Buffer,
  encrypted: string
): Promise<boolean>;