/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, context) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    config.externals.push("pino-pretty", "lokijs", "encoding");

    return config
  }
}

module.exports = nextConfig
