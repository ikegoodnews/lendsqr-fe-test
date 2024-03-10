/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   webpack(config) {
      config.module.rules.push({
         test: /\.svg$/i,
         issuer: /\.[jt]sx?$/,
         use: ['@svgr/webpack'],
      });

      return config;
   },
   images: {
      domains: ['ui-avatars.com'],
      dangerouslyAllowSVG: true,
   },
   transpilePackages: ['date-fns'],
};

export default nextConfig;
