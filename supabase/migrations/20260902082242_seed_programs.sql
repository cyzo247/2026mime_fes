-- js/pages/HomePage.jsx의 programData(4개)를 programs 초기 데이터로 이관.
-- 원본 배열 순서 그대로 삽입 (id는 identity 자동 생성, 순서 유지 목적).
-- gradient는 순수 프론트 디자인 값이라 이관하지 않음.
insert into public.programs
  (title, en_title, date_label, day, start_time, place, genre, tags, artist, duration_label, audience, description, image_url)
values
  ('몸의 언어', 'Language of the Body', '5.24 (일)', '24', '15:00', '춘천 꿈어울림센터', '마임', array['마임','실내'], '김민준 × 움직임연구소', '50분', '전체 관람가', '말 없이도 선명하게 전해지는 몸의 리듬과 표정을 만나는 오프닝 퍼포먼스.', 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=85'),
  ('경계의 놀이', 'Play at the Edge', '5.25 (월)', '25', '19:00', '공지천 야외무대', '퍼포먼스', array['퍼포먼스','야외'], '이서연 & 프론티어 앙상블', '60분', '전체 관람가', '일상과 비일상의 경계를 넘나들며 관객과 함께 완성하는 야외 퍼포먼스 공연.', 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=85'),
  ('침묵의 대화', 'Silent Dialogue', '5.26 (화)', '26', '17:00', '중앙로 광장', '마임', array['마임','거리극'], '박지훈 컴퍼니', '45분', '전체 관람가', '도시 한가운데에서 시작되는 짧고 깊은 눈맞춤, 침묵으로 나누는 대화.', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85'),
  ('거리의 상상', 'Street of Imagination', '5.25 (월)', '25', '17:00', '춘천 명동 일대', '거리예술', array['거리예술','퍼레이드'], '춘천시민예술단', '90분', '전체 관람가', '골목과 광장, 관객의 걸음이 무대가 되는 참여형 거리예술 퍼레이드.', 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=85');
