import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "bdink_access_token";
const REFRESH_TOKEN_KEY = "bdink_refresh_token";

// 참고: httpOnly 쿠키가 아니라 JS에서 접근 가능한 쿠키라서 XSS에 완전히 안전하진 않음.
// 나중에 보안 강화할 땐 Next.js API route(BFF)를 거쳐 httpOnly 쿠키로 바꾸는 걸 권장.
export const tokenStorage = {
  getAccessToken: () => Cookies.get(ACCESS_TOKEN_KEY) ?? null,
  getRefreshToken: () => Cookies.get(REFRESH_TOKEN_KEY) ?? null,

  setTokens: (accessToken: string, refreshToken: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, { expires: 1, secure: true, sameSite: "strict" });
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 30, secure: true, sameSite: "strict" });
  },

  clearTokens: () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  },
};
