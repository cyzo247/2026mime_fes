-- bookmark_items에 서비스 카탈로그 분류(category) 컬럼 추가.
-- folders(사용자 개인 폴더)와는 별개의 개념.
-- 현재 데이터가 0건이라 백필 없이 바로 NOT NULL로 추가.
-- 카테고리 확장 가능성을 고려해 CHECK constraint 없이 단순 text로 관리.
alter table public.bookmark_items
  add column category text not null;
