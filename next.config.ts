import type { NextConfig } from 'next';
const config: NextConfig = {
  outputFileTracingIncludes: { '/*': ['./content/blog/**/*.md'] },
};
export default config;
