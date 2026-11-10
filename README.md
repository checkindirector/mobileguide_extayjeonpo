# EXTAY JEONPO · 홈페이지 및 모바일 게스트 가이드

어나더하우스·스테이네모와 같은 게스트 흐름을 따르는 독립 정적 사이트입니다. 화면 너비는 최대 480px이며 큰 화면에서도 같은 모바일 레이아웃을 유지합니다. 전포점 실제 사진에 맞춰 웜화이트·샌드·올리브 그레이를 적용했습니다.

## 실행 및 검증

```powershell
npm start
npm run build
npm test
```

로컬 주소는 `http://127.0.0.1:8796`입니다. 별도 설치나 API 키가 필요하지 않습니다. 언어 글꼴은 Google Fonts의 Noto Sans KR을 사용하며, 연결되지 않으면 시스템 글꼴로 대체됩니다.

## 구성

- 홈 / 공간 갤러리(35장, 분류·확대·스와이프) / 교통·입구 사진 안내
- 체크인·체크아웃 / Wi-Fi / 가전·시설 / 세탁·분리배출 / 이용 규칙
- 로컬 노트(검색·분류·지도) / 부산 추천 코스 / Airbnb 예약·문의
- 한국어, 영어, 일본어, 중국어 간체·번체. 언어 선택은 기기에 저장됩니다.
- 모바일 고정 하단 메뉴, 데스크톱 내비게이션, 키보드 동작과 모달 포커스 관리
- 사용자 제공 원본 사진 59장을 자연색 그대로 WebP로 최적화

## 수정 위치

- 안내 문구·외부 링크: `assets/data.js`
- 화면·내비게이션: `assets/app.js`
- 레이아웃·색상: `assets/styles.css`
- 사진: `assets/images/photo-00.webp`–`photo-58.webp`

## 배포 대상

- GitHub: https://github.com/checkindirector/mobileguide_extayjeonpo
- Vercel 프로젝트명: `extayjeonpo-guide`
- 사용자가 2026-11-10 승인한 배포 주소: https://extayjeonpo-guide.vercel.app
- 빌드 명령: `npm run build` / 출력 디렉터리: `.` / 프레임워크: Other
- 승인된 운영 주소를 canonical 및 sitemap에 반영했으며 검색 수집을 허용합니다. 내용 검토 이력은 `docs/content-review.md`를 참고합니다.

Wi-Fi 비밀번호·출입번호·호스트 개인 전화번호는 공개 소스에 포함하지 않습니다. 서비스 워커는 검토 중 자료를 오래 캐시하지 않도록 적용하지 않았습니다.
