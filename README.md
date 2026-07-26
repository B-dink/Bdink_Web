# Bdink Web (자사몰 웹앱)

## 스코프
로그인 · 결제 · 온라인 강의(클래스101 스타일 UI + 영상 플레이어) 3개 도메인만 구현.
운동일지/트레이너 연동 기능은 이 웹앱에서 다루지 않음 (기존 iOS/Android 앱 전용).

## 폴더 구조
```
src/
  app/                    # Next.js App Router (라우팅 전용, 로직 없음)
    (auth)/login/
    (lecture)/lectures/[slug]/
    (payment)/checkout/
  features/               # 도메인별 클린아키 유사 레이어
    auth/       {api, hooks, components, types}
    lecture/    {api, hooks, components, types}
    payment/    {api, hooks, components, types}
  shared/                 # 도메인 무관 공통 모듈
    api/     # axios client
    store/   # zustand global store
    lib/     # query provider 등
    components/  # 공통 UI (버튼, 인풋 등)
```

각 feature 내부 규칙 (안드로이드 클아키와 매핑):
- `types/`   → domain model (안드 domain layer의 Entity)
- `api/`     → repository (Retrofit/Moya 대응)
- `hooks/`   → usecase + viewmodel 역할 (React Query가 상태관리 겸함)
- `components/` → view

## 시작하기
```bash
npm install
cp .env.example .env.local   # API_BASE_URL 등 채우기
npm run dev
```

## 로그인 (카카오 소셜 로그인)
- 이메일/비밀번호 로그인 없음. 카카오 SDK로 인가 코드 받아 백엔드 `/api/v1/oauth2`에 전달하는 방식 (iOS AuthAPI와 동일 엔드포인트 재사용)
- 흐름: `/login` 버튼 클릭 → 카카오 인증 페이지 → `/login/callback`으로 리다이렉트 → 백엔드 로그인 호출 → 토큰 저장 → `/lectures`로 이동
- 카카오 개발자센터에 `http://localhost:3000` 웹 플랫폼 도메인 등록 필요 (배포 시 실제 도메인도 추가 등록)
- 애플 로그인은 미구현 (Apple JS SDK + Service ID 설정 완료 후 추가 예정)

## 아직 안 채워진 것 (다음 단계)
- [ ] 애플 로그인 추가
- [ ] payment 도메인: 포트원/토스 SDK 연동, 결제 성공/실패 페이지
- [ ] 백엔드: CORS 허용, 서명 URL 발급 엔드포인트, 결제 웹훅, lecture slug 필드
- [ ] HLS 트랜스코딩 파이프라인 (기존 MediaConvert 잡에 HLS 출력 추가)
- [ ] 토큰 저장 방식 보안 강화 (현재 JS 접근 가능 쿠키 → 추후 httpOnly + BFF 패턴 고려)
