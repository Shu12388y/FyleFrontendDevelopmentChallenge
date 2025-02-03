/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,  // Enable SWC minification (this is enabled by default)
    experimental: {
      fontLoaders: [
        {
          loader: 'next/font',
          options: {
            enableNextFonts: false, // Disable font loader to use SWC instead
          },
        },
      ],
    },
};

export default nextConfig;
