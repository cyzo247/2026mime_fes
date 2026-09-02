-- user_id 컬럼을 Supabase Auth 사용자(auth.users.id)와 FK로 연결
-- 컬럼/타입/기본값 등 기존 구조는 변경하지 않음, RLS도 그대로 둠
alter table public.folders
  add constraint folders_user_id_fkey
  foreign key (user_id) references auth.users (id);

alter table public.user_bookmarks
  add constraint user_bookmarks_user_id_fkey
  foreign key (user_id) references auth.users (id);
