/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites() {
        return {
            beforeFiles: [
                {
                    source: '/:path*',
                    has: [ { type: 'host', value: 'api.site.local' } ],
                    destination: '/api/:path*',
                },
                {
                    source: '/:path*',
                    has: [ { type: 'host', value: 'assets.site.local:3000' } ],
                    destination: '/assets/:path*',
                },
                {
                    source: '/:path*',
                    has: [ { type: 'host', value: 'api.slantedpress-2023.vercel.app' } ],
                    destination: '/api/:path*',
                },
                {
                    source: '/:path*',
                    has: [ { type: 'host', value: 'assets.slantedpress-2023.vercel.app' } ],
                    destination: '/assets/:path*',
                },
            ]
        }
    }
}

module.exports = nextConfig
