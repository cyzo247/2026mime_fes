-- bookmark_items: 서비스가 제공하는 공개 카탈로그. 누구나 읽기만 가능, 쓰기 정책은 만들지 않음.
alter table public.bookmark_items enable row level security;

create policy "bookmark_items_select_all"
  on public.bookmark_items
  for select
  to anon, authenticated
  using (true);

-- folders: 로그인한 사용자가 자신의 폴더만 조회/생성/수정/삭제 가능.
alter table public.folders enable row level security;

create policy "folders_select_own"
  on public.folders
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "folders_insert_own"
  on public.folders
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "folders_update_own"
  on public.folders
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "folders_delete_own"
  on public.folders
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- user_bookmarks: 로그인한 사용자가 자신의 북마크 기록만 조회/생성/수정/삭제 가능.
-- folder_id는 NULL이거나 반드시 본인 소유의 folders 행이어야 함.
alter table public.user_bookmarks enable row level security;

create policy "user_bookmarks_select_own"
  on public.user_bookmarks
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "user_bookmarks_insert_own"
  on public.user_bookmarks
  for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and (
      folder_id is null
      or exists (
        select 1
        from public.folders f
        where f.id = folder_id
          and f.user_id = auth.uid()
      )
    )
  );

create policy "user_bookmarks_update_own"
  on public.user_bookmarks
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and (
      folder_id is null
      or exists (
        select 1
        from public.folders f
        where f.id = folder_id
          and f.user_id = auth.uid()
      )
    )
  );

create policy "user_bookmarks_delete_own"
  on public.user_bookmarks
  for delete
  to authenticated
  using (auth.uid() = user_id);
