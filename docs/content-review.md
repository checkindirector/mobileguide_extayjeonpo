# 전포점 1차 구현 · 자료 기준과 확인 사항

자료 확인일: 2026-11-10. 공개 소스에는 호스트 개인 이메일, 전화번호, 출입번호, Wi-Fi 비밀번호를 포함하지 않습니다.

## 구현한 구조

기존 어나더하우스와 스테이네모의 모바일 우선 사용 흐름을 분석하여 홈 → 공간 → 교통 → 투숙 안내 → 동네 → 예약으로 연결했습니다. 기존 사이트의 숙소 데이터·예약 링크·외부 지역 사진은 가져오지 않았습니다. 공통 EXTAY 로고만 기존 브랜드 자산을 재사용했습니다.

공간별 원본 사진 35장과 동선·기기 사진 24장을 최적화했습니다. 색상 보정이나 생성형 이미지 변경 없이 원래 사진의 색을 유지했습니다.

## 확정 자료의 반영

- 부산 부산진구 동성로 113, 5층 / 한 팀 독채 / 최대 10인
- 침실 2, 퀸 베드 4, 욕실 2
- 체크인 16:00, 체크아웃 11:00, 출입번호 당일 14:00 전달
- 엘리베이터 없음 / 건물 주차 불가 / 인근 명성주차장 요금은 호스트 안내임을 명시
- 무료 짐 보관 / 운반 서비스 3일 전 예약, 09:00–21:00 / 얼리·레이트 체크인 협의 조건
- 퇴실 정리, 쓰레기 분리, 수건·식기·창문·전원 정리
- 금연·반려동물 불가·예약 외 인원 제한·CCTV·테라스 22시 이후 소음 제한·취사 제한
- 확인된 기기 모델, 실제 컨트롤러 사진, 호스트가 제공한 바닥 난방·TV·세탁 안내
- Airbnb 예약·호스트 문의 연결

## 공개 전에 다시 확인하면 좋은 정보

1. 최대 10인에 퀸 베드 4개입니다. 9–10인 추가 침구 구성을 확인하면 예약 안내를 더 명확하게 보완할 수 있습니다. 추가 침구가 있다고 임의로 적지 않았습니다.
2. 호스트 자료의 ‘전포역 도보 8분’은 정확한 동선이 확인되지 않아 게시하지 않았습니다. 제공된 사진 동선과 부전역 2번 출구 약 450m, 도보 5–8분을 우선했습니다.
3. ‘부산 모든 관광지 30분 이내’는 일괄 보장할 수 없어 게시하지 않았습니다. 바다 여행의 이동 시간은 지도에서 확인하도록 했습니다.
4. 명성주차장 요금은 호스트 자료 기준입니다. 현장 요금·운영 상태 확인이 필요합니다.
5. 에어컨 세부 모델과 일부 기기의 공식 설명서가 확보되지 않아, 임의로 버튼 순서나 설정 값을 만들지 않았습니다. 현재는 호스트가 제공한 실제 조작법과 기기 정보만 안내합니다.
6. 개별 식당의 호스트 추천은 비어 있어 ‘호스트 추천 맛집’이라는 이름을 쓰지 않았습니다. 시장 먹거리와 카페거리, 지도 검색을 연결했습니다. 검증한 개별 식당과 사용 가능한 사진 확보 후 상세 맛집 큐레이션으로 확장할 수 있습니다.
7. 숙소의 네이버·구글 Place가 미등록이므로 정확한 도로명 주소 검색을 사용합니다. 등록된 Place 링크를 받으면 교체할 수 있습니다.
8. 정식 검색 등록 전 검토용 noindex 상태입니다. 현재 화면은 온라인 예약 흐름을 연결하지만 결제·요금·예약 재고를 직접 관리하지 않습니다.

## 출처

- 사용자 제공 Drive 폴더: https://drive.google.com/drive/folders/1-PvruIbsJyux-BRljZCpJxvRGBbAIAPr
- 숙소정보: https://docs.google.com/document/d/1BQjTm2Y4gFJMQrmqsCAYE5meuVk4vij-gv8Fs6uCkzU/edit
- 제공 사진: https://drive.google.com/drive/folders/1_vwaDPbo54xwBrm-anypesEls7qfPyII
- 전포카페거리: https://www.visitbusan.net/archive/dataSearch/view.nm?dataSid=METADATA001738&menuCd=36
- 부전시장: https://www.visitbusan.net/index.do?lang_cd=ko&menuCd=DOM_000000202012001000&uc_seq=327
- 부산시민공원: https://www.visitbusan.net/archive/dataSearch/view.nm?dataSid=METADATA000774
- 부산 도시철도: https://data.humetro.busan.kr/default/main.do
- 김해공항: https://www.airport.co.kr/gimhae/
- 광안리: https://visitbusan.net/archive/dataSearch/view.nm?dataSid=METADATA006340
- LG F9WTB 공식 설명서: https://www.lge.co.kr/support/product-F9WTB
- 삼성 DV20CB8600BW 공식 설명서: https://www.samsung.com/sec/support/model/DV20CB8600BW/

공공누리 제4유형 관광사진은 상업 이용 제한 때문에 가져오지 않았습니다. 현재 방문지 화면은 숙소에서 실제로 촬영한 전포 전망 사진을 정확한 캡션과 함께 사용합니다.
