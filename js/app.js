    // Lucide 아이콘 컴포넌트 헬퍼
    const createLucideIcon = (iconName) => {
      return ({ className = '', size = 24, strokeWidth = 2, ...props }) => {
        const ref = React.useRef(null);
        React.useEffect(() => {
          if (ref.current && typeof lucide !== 'undefined' && lucide[iconName]) {
            ref.current.innerHTML = '';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const iconNode = lucide.createElement(lucide[iconName]);
            svg.innerHTML = iconNode.innerHTML;
            Array.from(iconNode.attributes).forEach(attr => {
              svg.setAttribute(attr.name, attr.value);
            });
            if (className) svg.setAttribute('class', className);
            svg.setAttribute('width', size);
            svg.setAttribute('height', size);
            svg.setAttribute('stroke-width', strokeWidth);
            ref.current.appendChild(svg);
          }
        }, [className, size, strokeWidth]);
        return React.createElement('span', {
          ref,
          style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
          ...props
        });
      };
    };
    const Activity = createLucideIcon('Activity');
    const ArrowRight = createLucideIcon('ArrowRight');
    const Bell = createLucideIcon('Bell');
    const Bookmark = createLucideIcon('Bookmark');
    const Calendar = createLucideIcon('Calendar');
    const Check = createLucideIcon('Check');
    const CheckCircle = createLucideIcon('CheckCircle');
    const ChevronDown = createLucideIcon('ChevronDown');
    const ChevronRight = createLucideIcon('ChevronRight');
    const Clock = createLucideIcon('Clock');
    const Copy = createLucideIcon('Copy');
    const Facebook = createLucideIcon('Facebook');
    const Globe = createLucideIcon('Globe');
    const Heart = createLucideIcon('Heart');
    const Home = createLucideIcon('Home');
    const Image = createLucideIcon('Image');
    const Info = createLucideIcon('Info');
    const Instagram = createLucideIcon('Instagram');
    const Link = createLucideIcon('Link');
    const Mail = createLucideIcon('Mail');
    const MapPin = createLucideIcon('MapPin');
    const Menu = createLucideIcon('Menu');
    const MessageSquare = createLucideIcon('MessageSquare');
    const MoreHorizontal = createLucideIcon('MoreHorizontal');
    const Navigation = createLucideIcon('Navigation');
    const Phone = createLucideIcon('Phone');
    const Play = createLucideIcon('Play');
    const Plus = createLucideIcon('Plus');
    const Search = createLucideIcon('Search');
    const Send = createLucideIcon('Send');
    const Share2 = createLucideIcon('Share2');
    const Sparkles = createLucideIcon('Sparkles');
    const Ticket = createLucideIcon('Ticket');
    const Train = createLucideIcon('Train');
    const Twitter = createLucideIcon('Twitter');
    const Users = createLucideIcon('Users');
    const X = createLucideIcon('X');
    const Youtube = createLucideIcon('Youtube');
    const Zap = createLucideIcon('Zap');

    

    const { useEffect, useMemo, useState } = React;

    const programData = [
      {
        id: 1,
        title: '몸의 언어',
        enTitle: 'Language of the Body',
        date: '5.24 (일)',
        day: '24',
        time: '15:00',
        place: '춘천 꿈어울림센터',
        genre: '마임',
        tags: ['마임', '실내'],
        artist: '김민준 × 움직임연구소',
        duration: '50분',
        audience: '전체 관람가',
        description: '말 없이도 선명하게 전해지는 몸의 리듬과 표정을 만나는 오프닝 퍼포먼스.',
        image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=85',
        gradient: 'from-orange-400 via-rose-500 to-fuchsia-700'
      },
      {
        id: 2,
        title: '경계의 놀이',
        enTitle: 'Play at the Edge',
        date: '5.25 (월)',
        day: '25',
        time: '19:00',
        place: '공지천 야외무대',
        genre: '퍼포먼스',
        tags: ['퍼포먼스', '야외'],
        artist: '이서연 & 프론티어 앙상블',
        duration: '60분',
        audience: '전체 관람가',
        description: '일상과 비일상의 경계를 넘나들며 관객과 함께 완성하는 야외 퍼포먼스 공연.',
        image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=85',
        gradient: 'from-blue-600 via-indigo-700 to-violet-900'
      },
      {
        id: 3,
        title: '침묵의 대화',
        enTitle: 'Silent Dialogue',
        date: '5.26 (화)',
        day: '26',
        time: '17:00',
        place: '중앙로 광장',
        genre: '마임',
        tags: ['마임', '거리극'],
        artist: '박지훈 컴퍼니',
        duration: '45분',
        audience: '전체 관람가',
        description: '도시 한가운데에서 시작되는 짧고 깊은 눈맞춤, 침묵으로 나누는 대화.',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85',
        gradient: 'from-cyan-500 via-blue-600 to-indigo-800'
      },
      {
        id: 4,
        title: '거리의 상상',
        enTitle: 'Street of Imagination',
        date: '5.25 (월)',
        day: '25',
        time: '17:00',
        place: '춘천 명동 일대',
        genre: '거리예술',
        tags: ['거리예술', '퍼레이드'],
        artist: '춘천시민예술단',
        duration: '90분',
        audience: '전체 관람가',
        description: '골목과 광장, 관객의 걸음이 무대가 되는 참여형 거리예술 퍼레이드.',
        image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=85',
        gradient: 'from-pink-500 via-red-500 to-orange-500'
      }
    ];

    const dates = [
      { day: '24', label: '5.24', week: '일' },
      { day: '25', label: '5.25', week: '월' },
      { day: '26', label: '5.26', week: '화' },
      { day: '27', label: '5.27', week: '수' },
      { day: '28', label: '5.28', week: '목' },
      { day: '29', label: '5.29', week: '금' },
      { day: '30', label: '5.30', week: '토' },
      { day: '31', label: '5.31', week: '일' }
    ];

    const IconButton = ({
      children,
      onClick,
      active = false,
      label,
      className = ''
    }) => (
      <button
        aria-label={label}
        title={label}
        onClick={onClick}
        className={`inline-flex items-center justify-center rounded-full transition-all duration-300 ${
          active
            ? 'bg-mime-lime text-mime-navy'
            : 'bg-white/10 text-white hover:bg-white/20'
        } ${className}`}
      >
        {children}
      </button>
    );

    const Logo = ({ compact = false }) => (
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-mime-lime text-mime-navy shadow-lg shadow-lime-300/10">
          <span className="absolute h-7 w-2 -rotate-45 rounded-full bg-mime-navy"></span>
          <span className="absolute h-7 w-2 rotate-45 rounded-full bg-mime-navy"></span>
          <span className="relative mt-3 h-2 w-2 rounded-full bg-mime-lime"></span>
        </div>
        {!compact && (
          <div className="leading-none">
            <p className="text-[10px] font-bold tracking-[0.24em] text-mime-lime">
              CHUNCHEON MIME FESTIVAL
            </p>
            <p className="mt-1 text-base font-black tracking-tight text-white">
              2026 춘천마임축제
            </p>
          </div>
        )}
      </div>
    );

    const App = () => {
      const [scrolled, setScrolled] = useState(false);
      const [mobileMenu, setMobileMenu] = useState(false);
      const [language, setLanguage] = useState('KO');
      const [activeTab, setActiveTab] = useState('홈');
      const [searchTerm, setSearchTerm] = useState('');
      const [genreFilter, setGenreFilter] = useState('전체');
      const [dateFilter, setDateFilter] = useState('전체');
      const [bookmarks, setBookmarks] = useState([2, 4]);
      const [selectedProgram, setSelectedProgram] = useState(null);
      const [shareProgram, setShareProgram] = useState(null);
      const [copied, setCopied] = useState(false);
      const [selectedDay, setSelectedDay] = useState('25');
      const [toast, setToast] = useState('');

      useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      useEffect(() => {
        if (!toast) return;
        const timeout = setTimeout(() => setToast(''), 2600);
        return () => clearTimeout(timeout);
      }, [toast]);

      const filteredPrograms = useMemo(() => {
        return programData.filter((program) => {
          const query = searchTerm.trim().toLowerCase();
          const matchesSearch =
            !query ||
            program.title.toLowerCase().includes(query) ||
            program.place.toLowerCase().includes(query) ||
            program.genre.toLowerCase().includes(query);

          const matchesGenre =
            genreFilter === '전체' || program.genre === genreFilter;

          const matchesDate =
            dateFilter === '전체' || program.day === dateFilter;

          return matchesSearch && matchesGenre && matchesDate;
        });
      }, [searchTerm, genreFilter, dateFilter]);

      const timelinePrograms = useMemo(() => {
        return programData
          .filter((program) => program.day === selectedDay)
          .sort((a, b) => a.time.localeCompare(b.time));
      }, [selectedDay]);

      const toggleBookmark = (id) => {
        setBookmarks((current) => {
          const exists = current.includes(id);

          if (exists) {
            setToast('북마크에서 삭제했습니다.');
            return current.filter((bookmarkId) => bookmarkId !== id);
          }

          setToast('북마크에 저장되었습니다!');
          return [...current, id];
        });
      };

      const scrollTo = (id, tab) => {
        setActiveTab(tab);
        setMobileMenu(false);
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      };

      const copyLink = () => {
        const link = 'https://mimefest2026.co.kr/e/12345';

        if (navigator.clipboard) {
          navigator.clipboard.writeText(link);
        }

        setCopied(true);
        setToast('공유 링크를 복사했습니다.');

        setTimeout(() => setCopied(false), 2000);
      };

      const navItems = [
        { label: '홈', id: 'home' },
        { label: '프로그램', id: 'programs' },
        { label: '일정·장소', id: 'schedule' },
        { label: '축제 안내', id: 'guide' },
        { label: '북마크', id: 'bookmarks' }
      ];

      const copy = language === 'KO'
        ? {
            heroTop: '2026 CHUNCHEON MIME FESTIVAL',
            heroTitle: '몸짓이 도시를\n깨우는 순간',
            heroText: '말보다 강렬한 움직임, 거리에서 피어나는 예술.\n2026 춘천마임축제에서 당신만의 장면을 북마크하세요.',
            program: '프로그램 보기',
            plan: '내 일정 만들기'
          }
        : {
            heroTop: '2026 CHUNCHEON MIME FESTIVAL',
            heroTitle: 'When movement\nawakens the city',
            heroText: 'Art beyond words, alive in every street.\nBookmark your own moment in Chuncheon.',
            program: 'Explore programs',
            plan: 'Make my schedule'
          };

      return (
        <div className="min-h-screen overflow-hidden bg-mime-navy">
          <header
            className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
              scrolled
                ? 'border-white/10 bg-slate-950/80 backdrop-blur-md'
                : 'border-transparent bg-transparent'
            }`}
          >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
              <button onClick={() => scrollTo('home', '홈')}>
                <Logo />
              </button>

              <nav className="hidden items-center gap-7 lg:flex">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollTo(item.id, item.label)}
                    className={`text-sm font-semibold transition-colors ${
                      activeTab === item.label
                        ? 'text-mime-lime'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLanguage(language === 'KO' ? 'EN' : 'KO')}
                  className="hidden items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs font-bold text-slate-200 transition hover:border-mime-lime hover:text-mime-lime sm:flex"
                >
                  <Globe className="h-4 w-4" />
                  {language}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>

                <IconButton
                  label="북마크 보기"
                  onClick={() => scrollTo('bookmarks', '북마크')}
                  active={bookmarks.length > 0}
                  className="h-10 w-10"
                >
                  <Bookmark className={`h-4 w-4 ${bookmarks.length > 0 ? 'fill-current' : ''}`} />
                </IconButton>

                <IconButton
                  label="메뉴 열기"
                  onClick={() => setMobileMenu(!mobileMenu)}
                  className="h-10 w-10 lg:hidden"
                >
                  {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </IconButton>
              </div>
            </div>

            {mobileMenu && (
              <div className="border-t border-white/10 bg-slate-950/95 px-5 py-5 backdrop-blur-xl lg:hidden">
                <div className="mx-auto flex max-w-7xl flex-col gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => scrollTo(item.id, item.label)}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-base font-bold text-white hover:bg-white/10"
                    >
                      {item.label}
                      <ChevronRight className="h-4 w-4 text-mime-lime" />
                    </button>
                  ))}
                  <button
                    onClick={() => setLanguage(language === 'KO' ? 'EN' : 'KO')}
                    className="mt-2 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-left text-sm font-bold"
                  >
                    <Globe className="h-4 w-4 text-mime-lime" />
                    Language · {language === 'KO' ? 'English' : '한국어'}
                  </button>
                </div>
              </div>
            )}
          </header>

          <main>
            <section
              id="home"
              className="noise hero-grid relative flex min-h-screen items-center overflow-hidden pt-20"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(120,58,237,.42),transparent_25%),radial-gradient(circle_at_20%_80%,rgba(23,105,224,.3),transparent_25%)]"></div>

              <div className="absolute -right-32 top-28 h-96 w-96 rounded-full bg-mime-lime/15 blur-[110px] animate-pulseSoft"></div>
              <div className="absolute -left-28 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[130px] animate-pulseSoft"></div>

              <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8">
                <div className="max-w-2xl">
                  <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-mime-lime/30 bg-mime-lime/10 px-4 py-2 text-xs font-bold tracking-wider text-mime-lime">
                    <Sparkles className="h-4 w-4" />
                    {copy.heroTop}
                  </div>

                  <h1 className="whitespace-pre-line text-5xl font-black leading-[1.03] tracking-[-0.07em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
                    {copy.heroTitle}
                  </h1>

                  <div className="my-8 h-1.5 w-24 rounded-full bg-mime-lime"></div>

                  <p className="whitespace-pre-line text-base leading-8 text-slate-300 sm:text-lg">
                    {copy.heroText}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
                      <p className="text-[11px] font-bold text-slate-400">FESTIVAL DATE</p>
                      <p className="mt-1 text-sm font-bold text-white">2026. 05. 24 — 05. 31</p>
                    </div>

                    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
                      <p className="text-[11px] font-bold text-slate-400">CHUNCHEON, KOREA</p>
                      <p className="mt-1 text-sm font-bold text-white">공지천 · 중앙로 · 춘천 일대</p>
                    </div>
                  </div>

                  <div className="mt-9 flex flex-wrap gap-3">
                    <button
                      onClick={() => scrollTo('programs', '프로그램')}
                      className="group inline-flex items-center gap-2 rounded-full bg-mime-lime px-6 py-4 text-sm font-black text-mime-navy transition hover:bg-white"
                    >
                      {copy.program}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <button
                      onClick={() => scrollTo('bookmarks', '북마크')}
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/15"
                    >
                      <Calendar className="h-4 w-4 text-mime-lime" />
                      {copy.plan}
                    </button>
                  </div>
                </div>

                <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                  <div className="absolute -left-10 top-12 z-10 hidden rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl md:block animate-float">
                    <p className="text-[10px] font-bold tracking-widest text-mime-lime">LIVE MOMENT</p>
                    <p className="mt-1 text-sm font-bold">도시가 무대가 됩니다</p>
                  </div>

                  <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-glow backdrop-blur-md">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.55rem]">
                      <img
                        src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1300&q=90"
                        alt="무대 위 퍼포먼스를 선보이는 예술가"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-mime-navy via-mime-navy/10 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/25 via-transparent to-fuchsia-500/30"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <p className="text-xs font-bold tracking-[0.2em] text-mime-lime">MIME, CITY & YOU</p>
                        <p className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                          8일간, 춘천 전체가<br />움직이는 예술이 됩니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-8 -right-2 flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-mime-pink text-center text-sm font-black leading-tight text-white shadow-2xl animate-float sm:h-36 sm:w-36">
                    BOOK<br />THE<br />MOMENT
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-y border-white/10 bg-white/5 py-4 backdrop-blur-sm">
                <div className="flex w-[200%] animate-marquee whitespace-nowrap text-sm font-black tracking-[0.2em] text-white/70">
                  <span className="mx-5">MIME WITHOUT BORDERS</span>
                  <span className="mx-5 text-mime-lime">✦</span>
                  <span className="mx-5">CHUNCHEON BECOMES A STAGE</span>
                  <span className="mx-5 text-mime-lime">✦</span>
                  <span className="mx-5">BOOKMARK YOUR MOMENT</span>
                  <span className="mx-5 text-mime-lime">✦</span>
                  <span className="mx-5">MIME WITHOUT BORDERS</span>
                  <span className="mx-5 text-mime-lime">✦</span>
                  <span className="mx-5">CHUNCHEON BECOMES A STAGE</span>
                  <span className="mx-5 text-mime-lime">✦</span>
                  <span className="mx-5">BOOKMARK YOUR MOMENT</span>
                </div>
              </div>
            </section>

            <section className="relative z-10 -mt-1 bg-mime-cream px-5 py-16 text-mime-navy lg:px-8">
              <div className="mx-auto max-w-7xl">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <InfoCard
                    icon={<Calendar className="h-5 w-5" />}
                    label="FESTIVAL DATE"
                    value="2026. 05. 24 (일) — 05. 31 (일)"
                  />
                  <InfoCard
                    icon={<MapPin className="h-5 w-5" />}
                    label="MAIN VENUE"
                    value="공지천 · 중앙로 · 춘천 시내 일대"
                  />
                  <InfoCard
                    icon={<Users className="h-5 w-5" />}
                    label="HOST"
                    value="춘천시 · 춘천문화재단"
                  />
                  <InfoCard
                    icon={<Phone className="h-5 w-5" />}
                    label="CONTACT"
                    value="033-250-4312"
                  />
                </div>
              </div>
            </section>

            <section id="programs" className="bg-slate-50 px-5 py-24 text-mime-navy lg:px-8">
              <div className="mx-auto max-w-7xl">
                <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                  <div>
                    <p className="text-sm font-black tracking-[0.18em] text-mime-blue">PROGRAM EXPLORE</p>
                    <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                      오늘, 어떤 몸짓을<br />만나고 싶나요?
                    </h2>
                  </div>

                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setGenreFilter('전체');
                      setDateFilter('전체');
                    }}
                    className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-mime-blue hover:text-mime-blue lg:self-auto"
                  >
                    <Activity className="h-4 w-4" />
                    필터 초기화
                  </button>
                </div>

                <div className="mt-10 rounded-3xl bg-white p-4 shadow-card sm:p-6">
                  <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr_1fr]">
                    <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-mime-blue focus-within:ring-4 focus-within:ring-blue-100">
                      <Search className="h-5 w-5 text-slate-400" />
                      <input
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
                        placeholder="프로그램명, 장소, 장르를 검색하세요"
                      />
                    </label>

                    <label className="relative">
                      <span className="sr-only">날짜 필터</span>
                      <select
                        value={dateFilter}
                        onChange={(event) => setDateFilter(event.target.value)}
                        className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-mime-blue"
                      >
                        <option value="전체">전체 날짜</option>
                        {dates.map((date) => (
                          <option key={date.day} value={date.day}>
                            {date.label} ({date.week})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-3.5 h-5 w-5 text-slate-400" />
                    </label>

                    <label className="relative">
                      <span className="sr-only">장르 필터</span>
                      <select
                        value={genreFilter}
                        onChange={(event) => setGenreFilter(event.target.value)}
                        className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-mime-blue"
                      >
                        <option value="전체">전체 장르</option>
                        <option value="마임">마임</option>
                        <option value="퍼포먼스">퍼포먼스</option>
                        <option value="거리예술">거리예술</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-3.5 h-5 w-5 text-slate-400" />
                    </label>
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-500">
                    총 <span className="font-black text-mime-navy">{filteredPrograms.length}</span>개의 프로그램
                  </p>
                  <p className="hidden text-sm text-slate-400 sm:block">카드를 클릭해 상세 정보를 확인하세요.</p>
                </div>

                <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {filteredPrograms.map((program) => (
                    <ProgramCard
                      key={program.id}
                      program={program}
                      bookmarked={bookmarks.includes(program.id)}
                      onBookmark={() => toggleBookmark(program.id)}
                      onOpen={() => setSelectedProgram(program)}
                    />
                  ))}
                </div>

                {filteredPrograms.length === 0 && (
                  <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white py-16 text-center">
                    <Search className="mx-auto h-8 w-8 text-slate-300" />
                    <p className="mt-3 font-bold text-slate-600">조건에 맞는 프로그램이 없습니다.</p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setGenreFilter('전체');
                        setDateFilter('전체');
                      }}
                      className="mt-4 text-sm font-black text-mime-blue"
                    >
                      전체 프로그램 보기
                    </button>
                  </div>
                )}
              </div>
            </section>

            <section id="schedule" className="bg-mime-navy px-5 py-24 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
                  <div>
                    <p className="text-sm font-black tracking-[0.18em] text-mime-lime">MY FESTIVAL PLAN</p>
                    <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
                      나만의 리듬으로<br />축제를 채우세요.
                    </h2>
                    <p className="mt-6 max-w-md leading-7 text-slate-300">
                      날짜별 공연을 확인하고 마음에 드는 프로그램을 저장하세요.
                      북마크한 공연은 나의 일정에서 시간순으로 다시 볼 수 있습니다.
                    </p>

                    <div className="mt-8 flex gap-3">
                      <button
                        onClick={() => scrollTo('bookmarks', '북마크')}
                        className="inline-flex items-center gap-2 rounded-full bg-mime-lime px-5 py-3 text-sm font-black text-mime-navy transition hover:bg-white"
                      >
                        <Bookmark className="h-4 w-4" />
                        나의 일정 보기
                      </button>
                      <button
                        onClick={() => setShareProgram(programData.find((program) => program.id === 2))}
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                      >
                        <Share2 className="h-4 w-4" />
                        일정 공유
                      </button>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-sm sm:p-6">
                    <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-2">
                      {dates.map((date) => (
                        <button
                          key={date.day}
                          onClick={() => setSelectedDay(date.day)}
                          className={`min-w-[72px] rounded-2xl px-3 py-3 text-center transition ${
                            selectedDay === date.day
                              ? 'bg-mime-lime text-mime-navy shadow-lg shadow-lime-300/20'
                              : 'bg-white/5 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          <p className="text-xs font-bold">{date.week}</p>
                          <p className="mt-1 text-xl font-black">{date.day}</p>
                          <p className="text-[10px] font-bold">MAY</p>
                        </button>
                      ))}
                    </div>

                    <div className="mt-6">
                      <p className="text-sm font-bold text-mime-lime">
                        2026. 5.{selectedDay} 일정
                      </p>

                      <div className="mt-4 space-y-3">
                        {timelinePrograms.length > 0 ? (
                          timelinePrograms.map((program) => (
                            <button
                              key={program.id}
                              onClick={() => setSelectedProgram(program)}
                              className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition hover:border-mime-lime/50 hover:bg-white/10"
                            >
                              <div className="w-12 shrink-0 text-center">
                                <p className="text-lg font-black text-white">{program.time}</p>
                                <p className="text-[10px] font-bold text-slate-400">START</p>
                              </div>

                              <img
                                src={program.image}
                                alt={program.title}
                                className="h-14 w-14 rounded-xl object-cover"
                              />

                              <div className="min-w-0 flex-1">
                                <p className="truncate font-black text-white">{program.title}</p>
                                <p className="mt-1 truncate text-xs text-slate-400">{program.place}</p>
                              </div>

                              <Bookmark
                                className={`h-5 w-5 shrink-0 ${
                                  bookmarks.includes(program.id)
                                    ? 'fill-mime-lime text-mime-lime'
                                    : 'text-slate-500 group-hover:text-white'
                                }`}
                              />
                            </button>
                          ))
                        ) : (
                          <div className="rounded-2xl border border-dashed border-white/15 py-10 text-center text-sm text-slate-400">
                            준비 중인 프로그램입니다.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="guide" className="bg-mime-cream px-5 py-24 text-mime-navy lg:px-8">
              <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-2">
                  <div>
                    <p className="text-sm font-black tracking-[0.18em] text-mime-blue">FESTIVAL GUIDE</p>
                    <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                      춘천에서 만나는<br />가장 자유로운 무대
                    </h2>

                    <p className="mt-6 max-w-xl leading-8 text-slate-600">
                      춘천마임축제는 몸, 거리, 도시 그리고 시민이 함께 만드는 공연예술축제입니다.
                      극장 밖 광장과 골목에서 예상치 못한 장면을 발견하고, 관객도 공연의 일부가 되어 보세요.
                    </p>

                    <div className="mt-9 grid gap-3">
                      <GuideItem
                        icon={<Train className="h-5 w-5" />}
                        title="찾아오는 길"
                        text="춘천역에서 공지천 야외무대까지 버스 또는 도보로 이동할 수 있습니다."
                      />
                      <GuideItem
                        icon={<Zap className="h-5 w-5" />}
                        title="관람 안내"
                        text="우천 시 프로그램별 안내에 따라 운영되며, 야외 공연은 편안한 복장을 권장합니다."
                      />
                      <GuideItem
                        icon={<Bell className="h-5 w-5" />}
                        title="변경 사항 알림"
                        text="공연 시간 및 장소 변경 사항은 공지와 북마크 알림에서 빠르게 확인할 수 있습니다."
                      />
                    </div>
                  </div>

                  <div className="relative min-h-[480px] overflow-hidden rounded-[2rem] shadow-card">
                    <div className="map-grid absolute inset-0"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-mime-navy/65 via-transparent to-transparent"></div>

                    <div className="absolute left-[51%] top-[39%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-mime-pink text-white shadow-xl animate-pulseSoft">
                        <MapPin className="h-7 w-7 fill-current" />
                      </div>
                      <div className="mt-2 rounded-lg bg-white px-3 py-2 text-xs font-black shadow-xl">
                        공지천 야외무대
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                      <div className="rounded-2xl bg-white p-5 shadow-2xl">
                        <p className="text-xs font-black tracking-wider text-mime-blue">MAIN VENUE</p>
                        <h3 className="mt-1 text-xl font-black">공지천 야외무대</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          강원특별자치도 춘천시 스포츠타운길 2
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <button className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-mime-navy hover:text-white">
                            길찾기
                          </button>
                          <button className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-mime-navy hover:text-white">
                            대중교통
                          </button>
                          <button className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-mime-navy hover:text-white">
                            주차 안내
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="bookmarks" className="bg-slate-50 px-5 py-24 text-mime-navy lg:px-8">
              <div className="mx-auto max-w-7xl">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                  <div>
                    <p className="text-sm font-black tracking-[0.18em] text-mime-blue">YOUR BOOKMARKS</p>
                    <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                      저장한 순간들을<br />한눈에 확인하세요.
                    </h2>
                  </div>

                  <button
                    onClick={() => setShareProgram(programData.find((program) => bookmarks.includes(program.id)) || programData[1])}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-mime-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-mime-blue"
                  >
                    <Share2 className="h-4 w-4" />
                    내 일정 링크 공유
                  </button>
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[2rem] bg-white p-5 shadow-card sm:p-7">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                      <div>
                        <p className="font-black">저장한 프로그램</p>
                        <p className="mt-1 text-sm text-slate-500">{bookmarks.length}개의 관심 공연</p>
                      </div>
                      <Bookmark className="h-6 w-6 fill-mime-blue text-mime-blue" />
                    </div>

                    <div className="mt-5 space-y-3">
                      {bookmarks.length > 0 ? (
                        programData
                          .filter((program) => bookmarks.includes(program.id))
                          .sort((a, b) => a.day.localeCompare(b.day) || a.time.localeCompare(b.time))
                          .map((program) => (
                            <div
                              key={program.id}
                              className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3"
                            >
                              <img
                                src={program.image}
                                alt={program.title}
                                className="h-16 w-16 rounded-xl object-cover"
                              />

                              <button
                                onClick={() => setSelectedProgram(program)}
                                className="min-w-0 flex-1 text-left"
                              >
                                <p className="truncate font-black">{program.title}</p>
                                <p className="mt-1 truncate text-xs text-slate-500">
                                  {program.date} {program.time} · {program.place}
                                </p>
                              </button>

                              <button
                                onClick={() => toggleBookmark(program.id)}
                                className="rounded-full p-2 text-mime-blue transition hover:bg-blue-100"
                                aria-label={`${program.title} 북마크 해제`}
                              >
                                <Bookmark className="h-5 w-5 fill-current" />
                              </button>
                            </div>
                          ))
                      ) : (
                        <div className="py-12 text-center">
                          <Bookmark className="mx-auto h-9 w-9 text-slate-300" />
                          <p className="mt-3 font-bold text-slate-500">아직 저장한 프로그램이 없습니다.</p>
                          <button
                            onClick={() => scrollTo('programs', '프로그램')}
                            className="mt-4 text-sm font-black text-mime-blue"
                          >
                            프로그램 둘러보기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[2rem] bg-mime-navy p-6 text-white shadow-card sm:p-8">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-black tracking-[0.18em] text-mime-lime">SHARE PREVIEW</p>
                        <h3 className="mt-2 text-2xl font-black">나의 마임축제 일정</h3>
                      </div>
                      <Logo compact />
                    </div>

                    <div className="mt-7 rounded-2xl border border-white/10 bg-white/10 p-4">
                      <p className="text-sm font-bold text-mime-lime">
                        내가 고른 2026 춘천마임축제 프로그램을 확인해 보세요.
                      </p>
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        {bookmarks.length > 0
                          ? `${bookmarks.length}개의 공연을 저장했어요. 춘천에서 함께 움직일 준비가 되셨나요?`
                          : '관심 있는 공연을 저장하고 나만의 축제 링크를 만들어 보세요.'}
                      </p>
                    </div>

                    <button
                      onClick={() => setShareProgram(programData.find((program) => bookmarks.includes(program.id)) || programData[1])}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-mime-lime px-4 py-4 text-sm font-black text-mime-navy transition hover:bg-white"
                    >
                      <Share2 className="h-4 w-4" />
                      북마크 링크 만들기
                    </button>

                    <p className="mt-4 text-center text-xs text-slate-400">
                      로그인 없이도 이 기기에서 임시 저장됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-mime-pink px-5 py-20 text-white lg:px-8">
              <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div>
                  <p className="text-sm font-black tracking-[0.18em] text-mime-navy">KEEP MOVING WITH US</p>
                  <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                    말보다 오래 남는<br />하나의 장면을 만나세요.
                  </h2>
                </div>

                <button
                  onClick={() => scrollTo('programs', '프로그램')}
                  className="group inline-flex items-center gap-3 rounded-full bg-mime-navy px-7 py-4 text-sm font-black text-white transition hover:bg-white hover:text-mime-navy"
                >
                  축제 프로그램 탐색하기
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </section>
          </main>

          <footer className="bg-[#041020] px-5 pb-24 pt-16 text-slate-400 lg:px-8 lg:pb-12">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                <div className="lg:col-span-2">
                  <Logo />
                  <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                    2026 춘천마임축제 북마크 링크 홍보 웹·앱.
                    하나의 링크로 축제를 발견하고, 저장하고, 공유하며 다시 찾게 합니다.
                  </p>
                </div>

                <div>
                  <p className="font-black text-white">OFFICIAL INFO</p>
                  <div className="mt-4 space-y-3 text-sm">
                    <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-mime-lime" /> mimefest2026@culture.kr</p>
                    <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-mime-lime" /> 033-250-4312</p>
                    <p className="flex items-center gap-2"><Globe className="h-4 w-4 text-mime-lime" /> www.mimefest2026.co.kr</p>
                  </div>
                </div>

                <div>
                  <p className="font-black text-white">FOLLOW THE MOVEMENT</p>
                  <div className="mt-4 flex gap-2">
                    <IconButton label="Instagram" className="h-10 w-10"><Instagram className="h-4 w-4" /></IconButton>
                    <IconButton label="Facebook" className="h-10 w-10"><Facebook className="h-4 w-4" /></IconButton>
                    <IconButton label="X" className="h-10 w-10"><Twitter className="h-4 w-4" /></IconButton>
                    <IconButton label="YouTube" className="h-10 w-10"><Youtube className="h-4 w-4" /></IconButton>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
                <p>© 2026 Chuncheon Mime Festival. All rights reserved.</p>
                <div className="flex gap-4">
                  <button className="hover:text-white">개인정보처리방침</button>
                  <button className="hover:text-white">이용약관</button>
                  <button className="hover:text-white">관리자</button>
                </div>
              </div>
            </div>
          </footer>

          <MobileTabBar
            activeTab={activeTab}
            onNavigate={(id, tab) => scrollTo(id, tab)}
          />

          {selectedProgram && (
            <ProgramModal
              program={selectedProgram}
              bookmarked={bookmarks.includes(selectedProgram.id)}
              onClose={() => setSelectedProgram(null)}
              onBookmark={() => toggleBookmark(selectedProgram.id)}
              onShare={() => {
                setShareProgram(selectedProgram);
                setSelectedProgram(null);
              }}
              onAddSchedule={() => {
                if (!bookmarks.includes(selectedProgram.id)) {
                  toggleBookmark(selectedProgram.id);
                }
                setToast('나의 일정에 추가되었습니다.');
              }}
            />
          )}

          {shareProgram && (
            <ShareModal
              program={shareProgram}
              copied={copied}
              onClose={() => setShareProgram(null)}
              onCopy={copyLink}
            />
          )}

          {toast && (
            <div className="fixed bottom-24 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full bg-mime-lime px-5 py-3 text-sm font-black text-mime-navy shadow-2xl lg:bottom-8">
              <CheckCircle className="h-4 w-4" />
              {toast}
            </div>
          )}
        </div>
      );
    };

    const InfoCard = ({ icon, label, value }) => (
      <div className="group rounded-2xl border border-mime-navy/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-mime-blue hover:shadow-xl">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mime-navy text-mime-lime">
          {icon}
        </div>
        <p className="mt-5 text-[11px] font-black tracking-[0.13em] text-slate-400">{label}</p>
        <p className="mt-2 font-black leading-6 text-mime-navy">{value}</p>
      </div>
    );

    const GuideItem = ({ icon, title, text }) => (
      <div className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-mime-blue">
          {icon}
        </div>
        <div>
          <h3 className="font-black">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
        </div>
      </div>
    );

    const ProgramCard = ({
      program,
      bookmarked,
      onBookmark,
      onOpen
    }) => (
      <article className="group overflow-hidden rounded-[1.5rem] bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:scale-105">
        <button onClick={onOpen} className="relative block aspect-[4/3] w-full overflow-hidden text-left">
          <img
            src={program.image}
            alt={program.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-tr ${program.gradient} opacity-35 mix-blend-color`}></div>
          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-black text-mime-navy backdrop-blur">
            {program.genre}
          </div>
        </button>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <button onClick={onOpen} className="min-w-0 text-left">
              <h3 className="truncate text-xl font-black tracking-tight">{program.title}</h3>
              <p className="mt-1 truncate text-xs font-bold text-slate-400">{program.enTitle}</p>
            </button>

            <button
              onClick={onBookmark}
              aria-label={`${program.title} 북마크`}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                bookmarked
                  ? 'bg-mime-blue text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-mime-blue'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>

          <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">{program.description}</p>

          <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs font-bold text-slate-500">
            <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-mime-blue" /> {program.date} · {program.time}</p>
            <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-mime-blue" /> {program.place}</p>
          </div>
        </div>
      </article>
    );

    const ProgramModal = ({
      program,
      bookmarked,
      onClose,
      onBookmark,
      onShare,
      onAddSchedule
    }) => (
      <div
        className="fixed inset-0 z-[60] flex items-end bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6"
        onClick={onClose}
      >
        <div
          className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-white text-mime-navy shadow-2xl sm:rounded-[2rem]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[300px] lg:min-h-full">
              <img
                src={program.image}
                alt={program.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-tr ${program.gradient} opacity-35 mix-blend-color`}></div>
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-mime-navy transition hover:bg-white"
                aria-label="상세 닫기"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="rounded-full bg-mime-lime px-3 py-1.5 text-xs font-black text-mime-navy">
                  {program.tags.join(' · ')}
                </span>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white">{program.title}</h2>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-sm font-black tracking-[0.15em] text-mime-blue">{program.enTitle}</p>
              <p className="mt-4 text-base leading-8 text-slate-600">{program.description}</p>

              <div className="mt-7 space-y-4 rounded-2xl bg-slate-50 p-5">
                <DetailRow label="출연진 · 단체" value={program.artist} />
                <DetailRow label="일시" value={`${program.date} ${program.time}`} />
                <DetailRow label="장소" value={program.place} />
                <DetailRow label="러닝타임" value={program.duration} />
                <DetailRow label="관람 정보" value={program.audience} />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={onBookmark}
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-black transition ${
                    bookmarked
                      ? 'bg-mime-blue text-white'
                      : 'bg-mime-navy text-white hover:bg-mime-blue'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                  {bookmarked ? '북마크 저장됨' : '북마크 저장'}
                </button>

                <button
                  onClick={onShare}
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3.5 text-sm font-black transition hover:bg-slate-200"
                >
                  <Share2 className="h-4 w-4" />
                  공유하기
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  onClick={onAddSchedule}
                  className="flex items-center justify-center gap-2 rounded-xl border border-mime-blue px-4 py-3.5 text-sm font-black text-mime-blue transition hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4" />
                  내 일정 추가
                </button>

                <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-black text-slate-600 transition hover:bg-slate-50">
                  <MapPin className="h-4 w-4" />
                  지도 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const DetailRow = ({ label, value }) => (
      <div className="flex gap-4 text-sm">
        <p className="w-24 shrink-0 font-black text-slate-400">{label}</p>
        <p className="font-bold text-mime-navy">{value}</p>
      </div>
    );

    const ShareModal = ({
      program,
      copied,
      onClose,
      onCopy
    }) => (
      <div
        className="fixed inset-0 z-[65] flex items-end bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6"
        onClick={onClose}
      >
        <div
          className="w-full max-w-lg rounded-t-[2rem] bg-white p-6 text-mime-navy shadow-2xl sm:rounded-[2rem] sm:p-8"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black tracking-[0.16em] text-mime-blue">SHARE YOUR MOMENT</p>
              <h2 className="mt-2 text-2xl font-black">북마크 링크 공유하기</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-slate-100 p-2 transition hover:bg-slate-200"
              aria-label="공유 창 닫기"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex gap-4 rounded-2xl bg-mime-navy p-4 text-white">
            <img
              src={program.image}
              alt={program.title}
              className="h-20 w-20 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-mime-lime">2026 춘천마임축제</p>
              <p className="mt-1 truncate text-lg font-black">{program.title}</p>
              <p className="mt-1 text-xs text-slate-300">{program.date} {program.time}</p>
              <p className="mt-1 truncate text-xs text-slate-300">{program.place}</p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 text-slate-600">
            내가 고른 2026 춘천마임축제 프로그램을 확인해 보세요.
            링크를 통해 누구나 로그인 없이 축제 정보와 일정을 확인할 수 있습니다.
          </p>

          <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 p-2">
            <input
              value="https://mimefest2026.co.kr/e/12345"
              readOnly
              className="min-w-0 flex-1 bg-transparent px-2 text-xs font-medium outline-none"
            />
            <button
              onClick={onCopy}
              className="flex shrink-0 items-center gap-2 rounded-lg bg-mime-navy px-3 py-2 text-xs font-black text-white transition hover:bg-mime-blue"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? '복사됨' : '복사'}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-3">
            <ShareButton icon={<Link className="h-5 w-5" />} label="링크 복사" onClick={onCopy} />
            <ShareButton icon={<Image className="h-5 w-5" />} label="QR 코드" />
            <ShareButton icon={<MessageSquare className="h-5 w-5" />} label="카카오톡" />
            <ShareButton icon={<Mail className="h-5 w-5" />} label="이메일" />
            <ShareButton icon={<Instagram className="h-5 w-5" />} label="인스타그램" />
            <ShareButton icon={<Facebook className="h-5 w-5" />} label="페이스북" />
            <ShareButton icon={<Twitter className="h-5 w-5" />} label="X" />
            <ShareButton icon={<Send className="h-5 w-5" />} label="문자" />
          </div>
        </div>
      </div>
    );

    const ShareButton = ({ icon, label, onClick }) => (
      <button
        onClick={onClick}
        className="flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-50 px-2 py-3 text-center text-[10px] font-bold text-slate-600 transition hover:-translate-y-1 hover:bg-blue-50 hover:text-mime-blue"
      >
        <span className="text-mime-blue">{icon}</span>
        <span>{label}</span>
      </button>
    );

    const MobileTabBar = ({
      activeTab,
      onNavigate
    }) => {
      const tabs = [
        { label: '홈', id: 'home', icon: <Home className="h-5 w-5" /> },
        { label: '프로그램', id: 'programs', icon: <Play className="h-5 w-5" /> },
        { label: '일정', id: 'schedule', icon: <Calendar className="h-5 w-5" /> },
        { label: '북마크', id: 'bookmarks', icon: <Bookmark className="h-5 w-5" /> },
        { label: '더보기', id: 'guide', icon: <MoreHorizontal className="h-5 w-5" /> }
      ];

      return (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-lg items-center justify-between">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => onNavigate(tab.id, tab.label)}
                className={`flex min-w-[58px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-bold transition ${
                  activeTab === tab.label
                    ? 'text-mime-blue'
                    : 'text-slate-400'
                }`}
              >
                <span className={activeTab === tab.label ? 'text-mime-blue' : ''}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      );
    };

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
