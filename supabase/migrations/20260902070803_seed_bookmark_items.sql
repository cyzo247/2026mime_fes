-- js/pages/HomePage.jsx의 linkData(10개)를 bookmark_items 초기 데이터로 이관.
-- id는 identity 자동 생성, created_at은 now() 기본값, thumbnail_url은 데이터 없어 NULL.
-- url은 프론트에 있던 값을 그대로 옮김 (실 운영 주소 여부는 이 단계에서 판단하지 않음).
insert into public.bookmark_items (url, title, description, category) values
  ('https://www.mimefestival.com', '춘천마임축제 공식 홈페이지', '전체 프로그램, 공지사항, 참여 안내를 한곳에서 확인하세요.', '공식'),
  ('https://tickets.interpark.com', '온라인 티켓 예매 (인터파크)', '유료 공연 좌석 선택과 예매 내역 확인.', '예매'),
  ('https://www.instagram.com/chuncheonmime', '공식 인스타그램 @chuncheonmime', '현장 스케치와 실시간 소식, 이벤트 참여 안내.', 'SNS'),
  ('https://www.youtube.com/@chuncheonmimefestival', '공식 유튜브 채널', '지난 공연 다시보기와 아티스트 인터뷰 영상.', 'SNS'),
  ('https://www.facebook.com/mimefestival', '공식 페이스북 페이지', '축제 뉴스와 커뮤니티 소통 공간.', 'SNS'),
  ('https://www.chuncheon.go.kr/tour', '춘천시 문화관광 안내', '숙박, 맛집, 주변 명소 등 춘천 여행 정보.', '여행'),
  ('https://www.letskorail.com', 'ITX-청춘 열차 예매 (레츠코레일)', '용산~춘천 열차 시간표 확인과 승차권 예매.', '교통'),
  ('https://map.naver.com', '축제장 오시는 길 (지도)', '공지천 야외무대 위치와 대중교통·주차 안내.', '교통'),
  ('https://www.mimefestival.com/news', '보도자료 · 언론보도 모음', '최신 뉴스와 공식 보도자료 아카이브.', '미디어'),
  ('https://www.mimefestival.com/volunteer', '자원활동가 · 서포터즈 모집', '축제를 함께 만드는 자원활동 신청 페이지.', '참여');
