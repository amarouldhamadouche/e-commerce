/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,eslint: {
    ignoreDuringBuilds: true,
},
  images: {
    domains:['ibb.co','res.cloudinary.com','images.pexels.com','d3o2e4jr3mxnm3.cloudfront.net','cdn.shopify.com','www.prada.com','www.burdastyle.com','images.ctfassets.net','www.vintageindustries.nl','www.pngarts.com','i.ibb.co']
  }
}

module.exports = nextConfig
