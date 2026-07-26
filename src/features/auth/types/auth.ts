export type OAuthProvider = "KAKAO" | "APPLE";

export interface TokenDto {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponseData {
  memberId: string;
  tokenDto: TokenDto;
  isNewMember?: boolean; // 최초 로그인(회원가입 필요) 여부 - 백엔드 응답 필드명 확인 필요
}

export interface BaseResponseDTO<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface AuthUser {
  memberId: string;
}
