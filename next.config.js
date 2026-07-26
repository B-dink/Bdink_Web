/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.bdink.co.kr",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
      protocol: "https",
      hostname: "bdinks3.s3.ap-northeast-2.amazonaws.com",
      },
      {
      protocol: "https",
      hostname: "i.ifh.cc",
      },
    ],
  },
  async rewrites() {
    // 로컬 개발 시 CORS 없이 Spring API 호출하기 위한 프록시.
    // 운영 환경에서는 Spring 쪽 CORS 허용 설정 + NEXT_PUBLIC_API_BASE_URL 직접 사용.
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_BASE_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
