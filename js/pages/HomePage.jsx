import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Activity,
	AlertTriangle,
	ArrowRight,
	Bell,
	Bookmark,
	Calendar,
	Check,
	CheckCircle,
	ChevronDown,
	ChevronRight,
	Clock,
	Compass,
	Copy,
	ExternalLink,
	Globe,
	Home,
	Image,
	Link as LinkIcon,
	Loader2,
	LogOut,
	Mail,
	MapPin,
	Menu,
	MessageSquare,
	Newspaper,
	Pencil,
	Phone,
	Play,
	RefreshCw,
	Search,
	Send,
	Share2,
	Sparkles,
	Star,
	Ticket,
	Train,
	Trash2,
	Users,
	X,
	Zap,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabase.js";

// ── 로컬 저장 헬퍼 ────────────────────────────────
const readStore = (key, fallback) => {
	try {
		const raw = window.localStorage.getItem(key);
		if (!raw) return fallback;
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : fallback;
	} catch (error) {
		return fallback;
	}
};

const writeStore = (key, value) => {
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		/* 저장 실패는 무시 (시크릿 모드 등) */
	}
};

const getHost = (url) => {
	try {
		return new URL(url).hostname.replace(/^www\./, "");
	} catch (error) {
		return url;
	}
};

const STORAGE_KEYS = {
	schedule: "mime.scheduleBookmarks",
};

// ── 외부 홍보 링크 데이터: Supabase의 bookmark_items 테이블에서 조회 ──

const linkCategories = [
	"전체",
	"공식",
	"예매",
	"SNS",
	"여행",
	"교통",
	"미디어",
	"참여",
];

const categoryIcon = {
	공식: Globe,
	예매: Ticket,
	SNS: Share2,
	여행: Compass,
	교통: Train,
	미디어: Newspaper,
	참여: Users,
};

const programData = [
	{
		id: 1,
		title: "몸의 언어",
		enTitle: "Language of the Body",
		date: "5.24 (일)",
		day: "24",
		time: "15:00",
		place: "춘천 꿈어울림센터",
		genre: "마임",
		tags: ["마임", "실내"],
		artist: "김민준 × 움직임연구소",
		duration: "50분",
		audience: "전체 관람가",
		description:
			"말 없이도 선명하게 전해지는 몸의 리듬과 표정을 만나는 오프닝 퍼포먼스.",
		image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=85",
		gradient: "from-orange-400 via-rose-500 to-fuchsia-700",
	},
	{
		id: 2,
		title: "경계의 놀이",
		enTitle: "Play at the Edge",
		date: "5.25 (월)",
		day: "25",
		time: "19:00",
		place: "공지천 야외무대",
		genre: "퍼포먼스",
		tags: ["퍼포먼스", "야외"],
		artist: "이서연 & 프론티어 앙상블",
		duration: "60분",
		audience: "전체 관람가",
		description:
			"일상과 비일상의 경계를 넘나들며 관객과 함께 완성하는 야외 퍼포먼스 공연.",
		image: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=85",
		gradient: "from-blue-600 via-indigo-700 to-violet-900",
	},
	{
		id: 3,
		title: "침묵의 대화",
		enTitle: "Silent Dialogue",
		date: "5.26 (화)",
		day: "26",
		time: "17:00",
		place: "중앙로 광장",
		genre: "마임",
		tags: ["마임", "거리극"],
		artist: "박지훈 컴퍼니",
		duration: "45분",
		audience: "전체 관람가",
		description:
			"도시 한가운데에서 시작되는 짧고 깊은 눈맞춤, 침묵으로 나누는 대화.",
		image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85",
		gradient: "from-cyan-500 via-blue-600 to-indigo-800",
	},
	{
		id: 4,
		title: "거리의 상상",
		enTitle: "Street of Imagination",
		date: "5.25 (월)",
		day: "25",
		time: "17:00",
		place: "춘천 명동 일대",
		genre: "거리예술",
		tags: ["거리예술", "퍼레이드"],
		artist: "춘천시민예술단",
		duration: "90분",
		audience: "전체 관람가",
		description:
			"골목과 광장, 관객의 걸음이 무대가 되는 참여형 거리예술 퍼레이드.",
		image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=85",
		gradient: "from-pink-500 via-red-500 to-orange-500",
	},
];

const dates = [
	{ day: "24", label: "5.24", week: "일" },
	{ day: "25", label: "5.25", week: "월" },
	{ day: "26", label: "5.26", week: "화" },
	{ day: "27", label: "5.27", week: "수" },
	{ day: "28", label: "5.28", week: "목" },
	{ day: "29", label: "5.29", week: "금" },
	{ day: "30", label: "5.30", week: "토" },
	{ day: "31", label: "5.31", week: "일" },
];

const IconButton = ({
	children,
	onClick,
	active = false,
	label,
	className = "",
}) => (
	<button
		aria-label={label}
		title={label}
		onClick={onClick}
		className={`inline-flex items-center justify-center rounded-full transition-all duration-300 ${
			active
				? "bg-mime-lime text-mime-navy"
				: "bg-white/10 text-white hover:bg-white/20"
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

const HomePage = () => {
	const { isLoggedIn, user, logout } = useAuth();
	const navigate = useNavigate();
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenu, setMobileMenu] = useState(false);
	const [language, setLanguage] = useState("KO");
	const [activeTab, setActiveTab] = useState("홈");
	const [searchTerm, setSearchTerm] = useState("");
	const [genreFilter, setGenreFilter] = useState("전체");
	const [dateFilter, setDateFilter] = useState("전체");
	const [linkCategory, setLinkCategory] = useState("전체");

	// 외부 홈페이지 링크 북마크(Supabase user_bookmarks) / 행사 일정 북마크(로컬)는 서로 분리해서 관리
	// linkBookmarks: [{ item_id, folder_id }]
	const [linkBookmarks, setLinkBookmarks] = useState([]);
	const [scheduleBookmarks, setScheduleBookmarks] = useState(() =>
		readStore(STORAGE_KEYS.schedule, [2, 4]),
	);

	// 사용자 북마크 폴더(Supabase folders)
	const [folders, setFolders] = useState([]);
	const [foldersLoading, setFoldersLoading] = useState(false);
	const [foldersError, setFoldersError] = useState(false);
	const [activeFolderFilter, setActiveFolderFilter] = useState("all");
	const [folderModal, setFolderModal] = useState(null);

	const [selectedProgram, setSelectedProgram] = useState(null);
	const [shareProgram, setShareProgram] = useState(null);
	const [copied, setCopied] = useState(false);
	const [selectedDay, setSelectedDay] = useState("25");
	const [toast, setToast] = useState("");

	// bookmark_items(서비스 제공 링크 카탈로그)는 Supabase에서 조회
	const [bookmarkItems, setBookmarkItems] = useState([]);
	const [linksLoading, setLinksLoading] = useState(true);
	const [linksError, setLinksError] = useState(false);

	const fetchBookmarkItems = () => {
		setLinksLoading(true);
		setLinksError(false);
		supabase
			.from("bookmark_items")
			.select("id, url, title, description, thumbnail_url, category, created_at")
			.order("created_at", { ascending: true })
			.then(({ data, error }) => {
				if (error) {
					setLinksError(true);
					setLinksLoading(false);
					return;
				}
				setBookmarkItems(data ?? []);
				setLinksLoading(false);
			});
	};

	useEffect(() => {
		fetchBookmarkItems();
	}, []);

	// 로그인한 사용자의 user_bookmarks를 조회해 현재 북마크한 item_id/folder_id 목록을 구성.
	// 로그아웃 상태이거나 로그아웃하면 즉시 비움 (이전 사용자 데이터가 화면에 남지 않도록).
	useEffect(() => {
		if (!isLoggedIn || !user) {
			setLinkBookmarks([]);
			return;
		}

		let active = true;
		supabase
			.from("user_bookmarks")
			.select("item_id, folder_id")
			.then(({ data, error }) => {
				if (!active || error) return;
				setLinkBookmarks(data ?? []);
			});

		return () => {
			active = false;
		};
	}, [isLoggedIn, user?.id]);

	const fetchFolders = () => {
		setFoldersLoading(true);
		setFoldersError(false);
		supabase
			.from("folders")
			.select("id, name, created_at")
			.order("created_at", { ascending: true })
			.then(({ data, error }) => {
				if (error) {
					setFoldersError(true);
					setFoldersLoading(false);
					return;
				}
				setFolders(data ?? []);
				setFoldersLoading(false);
			});
	};

	// 로그인한 사용자의 폴더 목록 조회. 로그아웃하면 즉시 비우고 필터도 초기화.
	useEffect(() => {
		if (!isLoggedIn || !user) {
			setFolders([]);
			setActiveFolderFilter("all");
			return;
		}
		fetchFolders();
	}, [isLoggedIn, user?.id]);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (!toast) return;
		const timeout = setTimeout(() => setToast(""), 2600);
		return () => clearTimeout(timeout);
	}, [toast]);

	useEffect(() => {
		writeStore(STORAGE_KEYS.schedule, scheduleBookmarks);
	}, [scheduleBookmarks]);

	const filteredPrograms = useMemo(() => {
		return programData.filter((program) => {
			const query = searchTerm.trim().toLowerCase();
			const matchesSearch =
				!query ||
				program.title.toLowerCase().includes(query) ||
				program.place.toLowerCase().includes(query) ||
				program.genre.toLowerCase().includes(query);

			const matchesGenre =
				genreFilter === "전체" || program.genre === genreFilter;

			const matchesDate =
				dateFilter === "전체" || program.day === dateFilter;

			return matchesSearch && matchesGenre && matchesDate;
		});
	}, [searchTerm, genreFilter, dateFilter]);

	const timelinePrograms = useMemo(() => {
		return programData
			.filter((program) => program.day === selectedDay)
			.sort((a, b) => a.time.localeCompare(b.time));
	}, [selectedDay]);

	const filteredLinks = useMemo(() => {
		return linkCategory === "전체"
			? bookmarkItems
			: bookmarkItems.filter((link) => link.category === linkCategory);
	}, [bookmarkItems, linkCategory]);

	const bookmarkedLinks = useMemo(() => {
		return linkBookmarks
			.map((bookmark) => {
				const item = bookmarkItems.find(
					(link) => link.id === bookmark.item_id,
				);
				return item ? { ...item, folder_id: bookmark.folder_id } : null;
			})
			.filter(Boolean);
	}, [bookmarkItems, linkBookmarks]);

	const selectedFolder = useMemo(() => {
		if (activeFolderFilter === "all" || activeFolderFilter === "none") {
			return null;
		}
		return (
			folders.find((folder) => folder.id === activeFolderFilter) ?? null
		);
	}, [folders, activeFolderFilter]);

	const visibleBookmarkedLinks = useMemo(() => {
		if (activeFolderFilter === "all") return bookmarkedLinks;
		if (activeFolderFilter === "none") {
			return bookmarkedLinks.filter((link) => link.folder_id === null);
		}
		return bookmarkedLinks.filter(
			(link) => link.folder_id === activeFolderFilter,
		);
	}, [bookmarkedLinks, activeFolderFilter]);

	const scheduledPrograms = useMemo(() => {
		return programData
			.filter((program) => scheduleBookmarks.includes(program.id))
			.sort(
				(a, b) =>
					a.day.localeCompare(b.day) || a.time.localeCompare(b.time),
			);
	}, [scheduleBookmarks]);

	const toggleLinkBookmark = async (itemId) => {
		if (!isLoggedIn || !user) {
			navigate("/login");
			return;
		}

		const alreadyBookmarked = linkBookmarks.some(
			(bookmark) => bookmark.item_id === itemId,
		);

		if (alreadyBookmarked) {
			setLinkBookmarks((current) =>
				current.filter((bookmark) => bookmark.item_id !== itemId),
			);
			const { error } = await supabase
				.from("user_bookmarks")
				.delete()
				.eq("user_id", user.id)
				.eq("item_id", itemId);

			if (error) {
				setLinkBookmarks((current) => [
					...current,
					{ item_id: itemId, folder_id: null },
				]);
				setToast("북마크 삭제에 실패했습니다.");
				return;
			}
			setToast("링크 북마크를 해제했습니다.");
		} else {
			setLinkBookmarks((current) => [
				...current,
				{ item_id: itemId, folder_id: null },
			]);
			const { error } = await supabase.from("user_bookmarks").insert({
				user_id: user.id,
				item_id: itemId,
				folder_id: null,
			});

			if (error) {
				setLinkBookmarks((current) =>
					current.filter((bookmark) => bookmark.item_id !== itemId),
				);
				setToast("북마크 저장에 실패했습니다.");
				return;
			}
			setToast("링크를 북마크에 저장했습니다!");
		}
	};

	const createFolder = async (name) => {
		const trimmed = name.trim();
		if (!trimmed) {
			setToast("폴더 이름을 입력해주세요.");
			return false;
		}
		if (trimmed.length > 30) {
			setToast("폴더 이름은 30자 이내로 입력해주세요.");
			return false;
		}

		const { data, error } = await supabase
			.from("folders")
			.insert({ user_id: user.id, name: trimmed })
			.select("id, name, created_at")
			.single();

		if (error || !data) {
			setToast("폴더 생성에 실패했습니다.");
			return false;
		}

		setFolders((current) => [...current, data]);
		setToast("폴더를 만들었습니다.");
		return true;
	};

	const renameFolder = async (folderId, name) => {
		const trimmed = name.trim();
		if (!trimmed) {
			setToast("폴더 이름을 입력해주세요.");
			return false;
		}
		if (trimmed.length > 30) {
			setToast("폴더 이름은 30자 이내로 입력해주세요.");
			return false;
		}

		const { error } = await supabase
			.from("folders")
			.update({ name: trimmed })
			.eq("id", folderId)
			.eq("user_id", user.id);

		if (error) {
			setToast("폴더 이름 변경에 실패했습니다.");
			return false;
		}

		setFolders((current) =>
			current.map((folder) =>
				folder.id === folderId ? { ...folder, name: trimmed } : folder,
			),
		);
		setToast("폴더 이름을 변경했습니다.");
		return true;
	};

	const deleteFolder = async (folderId) => {
		// 1) 이 폴더를 가진 user_bookmarks의 folder_id를 먼저 null로 변경
		const { error: clearError } = await supabase
			.from("user_bookmarks")
			.update({ folder_id: null })
			.eq("user_id", user.id)
			.eq("folder_id", folderId);

		if (clearError) {
			setToast("폴더 삭제에 실패했습니다.");
			return false;
		}

		// 2) 그 다음 folders 행 삭제
		const { error: deleteError } = await supabase
			.from("folders")
			.delete()
			.eq("id", folderId)
			.eq("user_id", user.id);

		if (deleteError) {
			setToast("폴더 삭제에 실패했습니다.");
			return false;
		}

		setFolders((current) => current.filter((folder) => folder.id !== folderId));
		setLinkBookmarks((current) =>
			current.map((bookmark) =>
				bookmark.folder_id === folderId
					? { ...bookmark, folder_id: null }
					: bookmark,
			),
		);
		setActiveFolderFilter("all");
		setToast("폴더를 삭제했습니다.");
		return true;
	};

	const updateBookmarkFolder = async (itemId, folderId) => {
		const previous = linkBookmarks;
		setLinkBookmarks((current) =>
			current.map((bookmark) =>
				bookmark.item_id === itemId
					? { ...bookmark, folder_id: folderId }
					: bookmark,
			),
		);

		const { error } = await supabase
			.from("user_bookmarks")
			.update({ folder_id: folderId })
			.eq("user_id", user.id)
			.eq("item_id", itemId);

		if (error) {
			setLinkBookmarks(previous);
			setToast("폴더 변경에 실패했습니다.");
			return;
		}
		setToast("북마크 폴더를 변경했습니다.");
	};

	const toggleSchedule = (id) => {
		setScheduleBookmarks((current) => {
			if (current.includes(id)) {
				setToast("내 일정에서 뺐습니다.");
				return current.filter((programId) => programId !== id);
			}
			setToast("내 일정에 저장했습니다!");
			return [...current, id];
		});
	};

	const scrollTo = (id, tab) => {
		setActiveTab(tab);
		setMobileMenu(false);
		document.getElementById(id)?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	const copyText = (text, message) => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(text);
		}
		setToast(message || "링크를 복사했습니다.");
	};

	const copyLink = () => {
		copyText(
			"https://mimefestival.com/my/12345",
			"공유 링크를 복사했습니다.",
		);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const navItems = [
		{ label: "홈", id: "home" },
		{ label: "프로그램", id: "programs" },
		{ label: "바로가기", id: "links" },
		{ label: "내 일정", id: "my-schedule" },
		{ label: "북마크", id: "bookmarks" },
		{ label: "안내", id: "guide" },
	];

	const copy =
		language === "KO"
			? {
					heroTop: "2026 CHUNCHEON MIME FESTIVAL",
					heroTitle: "몸짓이 도시를\n깨우는 순간",
					heroText:
						"말보다 강렬한 움직임, 거리에서 피어나는 예술.\n2026 춘천마임축제의 링크를 북마크하고 언제든 다시 찾아오세요.",
					program: "프로그램 보기",
					plan: "바로가기 링크",
				}
			: {
					heroTop: "2026 CHUNCHEON MIME FESTIVAL",
					heroTitle: "When movement\nawakens the city",
					heroText:
						"Art beyond words, alive in every street.\nBookmark the festival links and come back anytime.",
					program: "Explore programs",
					plan: "Quick links",
				};

	return (
		<div className="min-h-screen overflow-hidden bg-mime-navy">
			<header
				className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
					scrolled
						? "border-white/10 bg-slate-950/80 backdrop-blur-md"
						: "border-transparent bg-transparent"
				}`}
			>
				<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
					<button onClick={() => scrollTo("home", "홈")}>
						<Logo />
					</button>

					<nav className="hidden items-center gap-7 lg:flex">
						{navItems.map((item) => (
							<button
								key={item.label}
								onClick={() => scrollTo(item.id, item.label)}
								className={`text-sm font-semibold transition-colors ${
									activeTab === item.label
										? "text-mime-lime"
										: "text-slate-300 hover:text-white"
								}`}
							>
								{item.label}
							</button>
						))}
					</nav>

					<div className="flex items-center gap-2">
						<button
							onClick={() =>
								setLanguage(language === "KO" ? "EN" : "KO")
							}
							className="hidden items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs font-bold text-slate-200 transition hover:border-mime-lime hover:text-mime-lime sm:flex"
						>
							<Globe className="h-4 w-4" />
							{language}
							<ChevronDown className="h-3.5 w-3.5" />
						</button>

						{isLoggedIn ? (
							<button
								onClick={logout}
								className="hidden items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-slate-200 transition hover:border-mime-lime hover:text-mime-lime sm:flex"
							>
								<LogOut className="h-3.5 w-3.5" />
								로그아웃
							</button>
						) : (
							<>
								<Link
									to="/login"
									className="hidden items-center rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-slate-200 transition hover:border-mime-lime hover:text-mime-lime sm:flex"
								>
									로그인
								</Link>

								<Link
									to="/signup"
									className="hidden items-center rounded-full bg-mime-lime px-4 py-2 text-xs font-black text-mime-navy transition hover:bg-white sm:flex"
								>
									회원가입
								</Link>
							</>
						)}

						<IconButton
							label="북마크한 링크 보기"
							onClick={() => scrollTo("bookmarks", "북마크")}
							active={linkBookmarks.length > 0}
							className="relative h-10 w-10"
						>
							<Star
								className={`h-4 w-4 ${linkBookmarks.length > 0 ? "fill-current" : ""}`}
							/>
							{linkBookmarks.length > 0 && (
								<span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-mime-pink px-1 text-[10px] font-black text-white">
									{linkBookmarks.length}
								</span>
							)}
						</IconButton>

						<IconButton
							label="메뉴 열기"
							onClick={() => setMobileMenu(!mobileMenu)}
							className="h-10 w-10 lg:hidden"
						>
							{mobileMenu ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</IconButton>
					</div>
				</div>

				{mobileMenu && (
					<div className="border-t border-white/10 bg-slate-950/95 px-5 py-5 backdrop-blur-xl lg:hidden">
						<div className="mx-auto flex max-w-7xl flex-col gap-2">
							{navItems.map((item) => (
								<button
									key={item.label}
									onClick={() =>
										scrollTo(item.id, item.label)
									}
									className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-base font-bold text-white hover:bg-white/10"
								>
									{item.label}
									<ChevronRight className="h-4 w-4 text-mime-lime" />
								</button>
							))}
							<button
								onClick={() =>
									setLanguage(language === "KO" ? "EN" : "KO")
								}
								className="mt-2 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-left text-sm font-bold"
							>
								<Globe className="h-4 w-4 text-mime-lime" />
								Language ·{" "}
								{language === "KO" ? "English" : "한국어"}
							</button>
							{isLoggedIn ? (
								<button
									onClick={() => {
										logout();
										setMobileMenu(false);
									}}
									className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-white hover:border-mime-lime hover:text-mime-lime"
								>
									<LogOut className="h-4 w-4" />
									로그아웃
								</button>
							) : (
								<div className="mt-2 grid grid-cols-2 gap-2">
									<Link
										to="/login"
										className="flex items-center justify-center rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-white hover:border-mime-lime hover:text-mime-lime"
									>
										로그인
									</Link>
									<Link
										to="/signup"
										className="flex items-center justify-center rounded-xl bg-mime-lime px-4 py-3 text-sm font-black text-mime-navy hover:bg-white"
									>
										회원가입
									</Link>
								</div>
							)}
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
									<p className="text-[11px] font-bold text-slate-400">
										FESTIVAL DATE
									</p>
									<p className="mt-1 text-sm font-bold text-white">
										2026. 05. 24 — 05. 31
									</p>
								</div>

								<div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
									<p className="text-[11px] font-bold text-slate-400">
										CHUNCHEON, KOREA
									</p>
									<p className="mt-1 text-sm font-bold text-white">
										공지천 · 중앙로 · 춘천 일대
									</p>
								</div>
							</div>

							<div className="mt-9 flex flex-wrap gap-3">
								<button
									onClick={() =>
										scrollTo("programs", "프로그램")
									}
									className="group inline-flex items-center gap-2 rounded-full bg-mime-lime px-6 py-4 text-sm font-black text-mime-navy transition hover:bg-white"
								>
									{copy.program}
									<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
								</button>

								<button
									onClick={() =>
										scrollTo("links", "바로가기")
									}
									className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/15"
								>
									<ExternalLink className="h-4 w-4 text-mime-lime" />
									{copy.plan}
								</button>
							</div>
						</div>

						<div className="relative mx-auto w-full max-w-xl lg:max-w-none">
							<div className="absolute -left-10 top-12 z-10 hidden rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl md:block animate-float">
								<p className="text-[10px] font-bold tracking-widest text-mime-lime">
									LIVE MOMENT
								</p>
								<p className="mt-1 text-sm font-bold">
									도시가 무대가 됩니다
								</p>
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
										<p className="text-xs font-bold tracking-[0.2em] text-mime-lime">
											MIME, CITY & YOU
										</p>
										<p className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
											8일간, 춘천 전체가
											<br />
											움직이는 예술이 됩니다.
										</p>
									</div>
								</div>
							</div>

							<div className="absolute -bottom-8 -right-2 flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-mime-pink text-center text-sm font-black leading-tight text-white shadow-2xl animate-float sm:h-36 sm:w-36">
								BOOK
								<br />
								THE
								<br />
								MOMENT
							</div>
						</div>
					</div>

					<div className="absolute bottom-0 left-0 right-0 overflow-hidden border-y border-white/10 bg-white/5 py-4 backdrop-blur-sm">
						<div className="flex w-[200%] animate-marquee whitespace-nowrap text-sm font-black tracking-[0.2em] text-white/70">
							<span className="mx-5">MIME WITHOUT BORDERS</span>
							<span className="mx-5 text-mime-lime">✦</span>
							<span className="mx-5">
								CHUNCHEON BECOMES A STAGE
							</span>
							<span className="mx-5 text-mime-lime">✦</span>
							<span className="mx-5">BOOKMARK YOUR LINKS</span>
							<span className="mx-5 text-mime-lime">✦</span>
							<span className="mx-5">MIME WITHOUT BORDERS</span>
							<span className="mx-5 text-mime-lime">✦</span>
							<span className="mx-5">
								CHUNCHEON BECOMES A STAGE
							</span>
							<span className="mx-5 text-mime-lime">✦</span>
							<span className="mx-5">BOOKMARK YOUR LINKS</span>
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

				{/* ── 바로가기 링크: 외부 홈페이지 북마크 ───────────── */}
				<section
					id="links"
					className="bg-white px-5 py-24 text-mime-navy lg:px-8"
				>
					<div className="mx-auto max-w-7xl">
						<div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
							<div>
								<p className="text-sm font-black tracking-[0.18em] text-mime-blue">
									BOOKMARK LINKS
								</p>
								<h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
									축제로 이어지는 링크,
									<br />
									북마크해 두세요.
								</h2>
								<p className="mt-5 max-w-xl leading-7 text-slate-500">
									공식 홈페이지부터 예매처, SNS 채널,
									여행·교통 정보까지. 자주 찾는 바깥 링크를
									별표로 저장하면{" "}
									<span className="font-bold text-mime-navy">
										북마크
									</span>{" "}
									섹션에 모입니다.
								</p>
							</div>

							<div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-600">
								저장한 링크{" "}
								<span className="text-lg font-black text-mime-blue">
									{linkBookmarks.length}
								</span>
								개
							</div>
						</div>

						<div className="hide-scrollbar mt-9 flex gap-2 overflow-x-auto pb-1">
							{linkCategories.map((category) => (
								<button
									key={category}
									onClick={() => setLinkCategory(category)}
									className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
										linkCategory === category
											? "bg-mime-navy text-white"
											: "bg-slate-100 text-slate-500 hover:bg-slate-200"
									}`}
								>
									{category}
								</button>
							))}
						</div>

						{linksLoading ? (
							<div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white py-16 text-center">
								<Loader2 className="mx-auto h-8 w-8 animate-spin text-slate-300" />
								<p className="mt-3 font-bold text-slate-500">
									링크를 불러오는 중입니다...
								</p>
							</div>
						) : linksError ? (
							<div className="mt-8 rounded-3xl border border-dashed border-rose-300 bg-rose-50 py-16 text-center">
								<AlertTriangle className="mx-auto h-8 w-8 text-rose-400" />
								<p className="mt-3 font-bold text-rose-500">
									링크를 불러오지 못했습니다. 잠시 후 다시
									시도해주세요.
								</p>
								<button
									onClick={fetchBookmarkItems}
									className="mt-4 inline-flex items-center gap-1.5 text-sm font-black text-mime-blue"
								>
									<RefreshCw className="h-4 w-4" />
									다시 시도
								</button>
							</div>
						) : (
							<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
								{filteredLinks.map((link) => (
									<LinkCard
										key={link.id}
										link={link}
										bookmarked={linkBookmarks.some(
											(bookmark) =>
												bookmark.item_id === link.id,
										)}
										onBookmark={() =>
											toggleLinkBookmark(link.id)
										}
										onCopy={() =>
											copyText(
												link.url,
												"링크 주소를 복사했습니다.",
											)
										}
									/>
								))}
							</div>
						)}
					</div>
				</section>

				<section
					id="programs"
					className="bg-slate-50 px-5 py-24 text-mime-navy lg:px-8"
				>
					<div className="mx-auto max-w-7xl">
						<div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
							<div>
								<p className="text-sm font-black tracking-[0.18em] text-mime-blue">
									PROGRAM EXPLORE
								</p>
								<h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
									오늘, 어떤 몸짓을
									<br />
									만나고 싶나요?
								</h2>
							</div>

							<button
								onClick={() => {
									setSearchTerm("");
									setGenreFilter("전체");
									setDateFilter("전체");
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
										onChange={(event) =>
											setSearchTerm(event.target.value)
										}
										className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
										placeholder="프로그램명, 장소, 장르를 검색하세요"
									/>
								</label>

								<label className="relative">
									<span className="sr-only">날짜 필터</span>
									<select
										value={dateFilter}
										onChange={(event) =>
											setDateFilter(event.target.value)
										}
										className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-mime-blue"
									>
										<option value="전체">전체 날짜</option>
										{dates.map((date) => (
											<option
												key={date.day}
												value={date.day}
											>
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
										onChange={(event) =>
											setGenreFilter(event.target.value)
										}
										className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-mime-blue"
									>
										<option value="전체">전체 장르</option>
										<option value="마임">마임</option>
										<option value="퍼포먼스">
											퍼포먼스
										</option>
										<option value="거리예술">
											거리예술
										</option>
									</select>
									<ChevronDown className="pointer-events-none absolute right-4 top-3.5 h-5 w-5 text-slate-400" />
								</label>
							</div>
						</div>

						<div className="mt-7 flex items-center justify-between">
							<p className="text-sm font-medium text-slate-500">
								총{" "}
								<span className="font-black text-mime-navy">
									{filteredPrograms.length}
								</span>
								개의 프로그램
							</p>
							<p className="hidden text-sm text-slate-400 sm:block">
								카드를 클릭해 상세 정보를 확인하세요.
							</p>
						</div>

						<div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{filteredPrograms.map((program) => (
								<ProgramCard
									key={program.id}
									program={program}
									scheduled={scheduleBookmarks.includes(
										program.id,
									)}
									onSchedule={() =>
										toggleSchedule(program.id)
									}
									onOpen={() => setSelectedProgram(program)}
								/>
							))}
						</div>

						{filteredPrograms.length === 0 && (
							<div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white py-16 text-center">
								<Search className="mx-auto h-8 w-8 text-slate-300" />
								<p className="mt-3 font-bold text-slate-600">
									조건에 맞는 프로그램이 없습니다.
								</p>
								<button
									onClick={() => {
										setSearchTerm("");
										setGenreFilter("전체");
										setDateFilter("전체");
									}}
									className="mt-4 text-sm font-black text-mime-blue"
								>
									전체 프로그램 보기
								</button>
							</div>
						)}
					</div>
				</section>

				<section
					id="schedule"
					className="bg-mime-navy px-5 py-24 lg:px-8"
				>
					<div className="mx-auto max-w-7xl">
						<div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
							<div>
								<p className="text-sm font-black tracking-[0.18em] text-mime-lime">
									FESTIVAL TIMETABLE
								</p>
								<h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
									날짜별로 공연을
									<br />
									살펴보세요.
								</h2>
								<p className="mt-6 max-w-md leading-7 text-slate-300">
									날짜를 눌러 그날의 공연을 확인하고, 관심
									있는 공연은 북마크 아이콘으로
									<span className="font-bold text-white">
										{" "}
										내 일정
									</span>
									에 담아 두세요.
								</p>

								<div className="mt-8 flex gap-3">
									<button
										onClick={() =>
											scrollTo("my-schedule", "내 일정")
										}
										className="inline-flex items-center gap-2 rounded-full bg-mime-lime px-5 py-3 text-sm font-black text-mime-navy transition hover:bg-white"
									>
										<Calendar className="h-4 w-4" />내 일정
										보기
									</button>
									<button
										onClick={() =>
											setShareProgram(
												scheduledPrograms[0] ||
													programData[1],
											)
										}
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
											onClick={() =>
												setSelectedDay(date.day)
											}
											className={`min-w-[72px] rounded-2xl px-3 py-3 text-center transition ${
												selectedDay === date.day
													? "bg-mime-lime text-mime-navy shadow-lg shadow-lime-300/20"
													: "bg-white/5 text-slate-300 hover:bg-white/10"
											}`}
										>
											<p className="text-xs font-bold">
												{date.week}
											</p>
											<p className="mt-1 text-xl font-black">
												{date.day}
											</p>
											<p className="text-[10px] font-bold">
												MAY
											</p>
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
													onClick={() =>
														setSelectedProgram(
															program,
														)
													}
													className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition hover:border-mime-lime/50 hover:bg-white/10"
												>
													<div className="w-12 shrink-0 text-center">
														<p className="text-lg font-black text-white">
															{program.time}
														</p>
														<p className="text-[10px] font-bold text-slate-400">
															START
														</p>
													</div>

													<img
														src={program.image}
														alt={program.title}
														className="h-14 w-14 rounded-xl object-cover"
													/>

													<div className="min-w-0 flex-1">
														<p className="truncate font-black text-white">
															{program.title}
														</p>
														<p className="mt-1 truncate text-xs text-slate-400">
															{program.place}
														</p>
													</div>

													<Bookmark
														className={`h-5 w-5 shrink-0 ${
															scheduleBookmarks.includes(
																program.id,
															)
																? "fill-mime-lime text-mime-lime"
																: "text-slate-500 group-hover:text-white"
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

				{/* ── 행사 일정 북마크: 링크 북마크와 분리된 섹션 ────── */}
				<section
					id="my-schedule"
					className="bg-mime-cream px-5 py-24 text-mime-navy lg:px-8"
				>
					<div className="mx-auto max-w-7xl">
						<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
							<div>
								<p className="text-sm font-black tracking-[0.18em] text-mime-blue">
									MY FESTIVAL SCHEDULE
								</p>
								<h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
									북마크한 공연을
									<br />
									시간순으로 확인하세요.
								</h2>
								<p className="mt-4 text-sm font-medium text-slate-500">
									* 여기는{" "}
									<span className="font-bold text-mime-navy">
										행사 일정
									</span>{" "}
									전용입니다. 외부 링크 북마크는 아래{" "}
									<span className="font-bold text-mime-navy">
										북마크
									</span>{" "}
									섹션에 있습니다.
								</p>
							</div>

							<button
								onClick={() =>
									setShareProgram(
										scheduledPrograms[0] || programData[1],
									)
								}
								className="inline-flex items-center justify-center gap-2 rounded-full bg-mime-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-mime-blue"
							>
								<Share2 className="h-4 w-4" />내 일정 링크 공유
							</button>
						</div>

						<div className="mt-10 rounded-[2rem] bg-white p-5 shadow-card sm:p-7">
							<div className="flex items-center justify-between border-b border-slate-100 pb-5">
								<div>
									<p className="font-black">북마크한 공연</p>
									<p className="mt-1 text-sm text-slate-500">
										{scheduleBookmarks.length}개의 관심 공연
									</p>
								</div>
								<Calendar className="h-6 w-6 text-mime-blue" />
							</div>

							<div className="mt-5 space-y-3">
								{scheduledPrograms.length > 0 ? (
									scheduledPrograms.map((program) => (
										<div
											key={program.id}
											className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3"
										>
											<div className="w-14 shrink-0 text-center">
												<p className="text-xs font-bold text-slate-400">
													{program.date.split(" ")[0]}
												</p>
												<p className="text-base font-black text-mime-navy">
													{program.time}
												</p>
											</div>

											<img
												src={program.image}
												alt={program.title}
												className="h-16 w-16 rounded-xl object-cover"
											/>

											<button
												onClick={() =>
													setSelectedProgram(program)
												}
												className="min-w-0 flex-1 text-left"
											>
												<p className="truncate font-black">
													{program.title}
												</p>
												<p className="mt-1 truncate text-xs text-slate-500">
													{program.place} ·{" "}
													{program.genre}
												</p>
											</button>

											<button
												onClick={() =>
													toggleSchedule(program.id)
												}
												className="rounded-full p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
												aria-label={`${program.title} 일정에서 빼기`}
											>
												<Trash2 className="h-5 w-5" />
											</button>
										</div>
									))
								) : (
									<div className="py-12 text-center">
										<Calendar className="mx-auto h-9 w-9 text-slate-300" />
										<p className="mt-3 font-bold text-slate-500">
											아직 북마크한 공연이 없습니다.
										</p>
										<button
											onClick={() =>
												scrollTo("programs", "프로그램")
											}
											className="mt-4 text-sm font-black text-mime-blue"
										>
											프로그램 둘러보기
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>

				{/* ── 북마크한 링크 모음 ──────────────────────────── */}
				<section
					id="bookmarks"
					className="bg-slate-50 px-5 py-24 text-mime-navy lg:px-8"
				>
					<div className="mx-auto max-w-7xl">
						<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
							<div>
								<p className="text-sm font-black tracking-[0.18em] text-mime-blue">
									YOUR BOOKMARKED LINKS
								</p>
								<h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
									저장한 링크를
									<br />
									한곳에서 열어보세요.
								</h2>
							</div>

							{isLoggedIn &&
								(selectedFolder ? (
									<div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-slate-600 shadow-sm">
										<span className="truncate">
											이 폴더:{" "}
											<span className="text-mime-blue">
												{selectedFolder.name}
											</span>
										</span>
										<button
											onClick={() =>
												setFolderModal({
													mode: "rename",
													target: selectedFolder,
												})
											}
											aria-label="폴더 이름 변경"
											className="ml-1 rounded-full p-1.5 text-slate-400 transition hover:bg-blue-50 hover:text-mime-blue"
										>
											<Pencil className="h-4 w-4" />
										</button>
										<button
											onClick={() =>
												setFolderModal({
													mode: "delete",
													target: selectedFolder,
												})
											}
											aria-label="폴더 삭제"
											className="rounded-full p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
										>
											<Trash2 className="h-4 w-4" />
										</button>
									</div>
								) : (
									<div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-slate-600 shadow-sm">
										북마크{" "}
										<span className="text-lg font-black text-mime-blue">
											{linkBookmarks.length}
										</span>
										개 · 내 계정에 저장됨
									</div>
								))}
						</div>

						{!isLoggedIn ? (
							<div className="mt-10 rounded-[2rem] border border-dashed border-slate-300 bg-white py-16 text-center">
								<Star className="mx-auto h-9 w-9 text-slate-300" />
								<p className="mt-3 font-bold text-slate-500">
									로그인하면 나만의 폴더를 만들 수 있어요.
								</p>
								<Link
									to="/login"
									className="mt-4 inline-block text-sm font-black text-mime-blue"
								>
									로그인하기
								</Link>
							</div>
						) : (
							<>
								<div className="hide-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1">
									<button
										onClick={() =>
											setActiveFolderFilter("all")
										}
										className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
											activeFolderFilter === "all"
												? "bg-mime-navy text-white"
												: "bg-slate-100 text-slate-500 hover:bg-slate-200"
										}`}
									>
										전체
									</button>
									<button
										onClick={() =>
											setActiveFolderFilter("none")
										}
										className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
											activeFolderFilter === "none"
												? "bg-mime-navy text-white"
												: "bg-slate-100 text-slate-500 hover:bg-slate-200"
										}`}
									>
										폴더 없음
									</button>
									{folders.map((folder) => (
										<button
											key={folder.id}
											onClick={() =>
												setActiveFolderFilter(
													folder.id,
												)
											}
											className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
												activeFolderFilter ===
												folder.id
													? "bg-mime-navy text-white"
													: "bg-slate-100 text-slate-500 hover:bg-slate-200"
											}`}
										>
											{folder.name}
										</button>
									))}
									<button
										onClick={() =>
											setFolderModal({
												mode: "create",
												target: null,
											})
										}
										className="shrink-0 rounded-full border border-dashed border-slate-300 px-4 py-2 text-sm font-bold text-slate-500 transition hover:border-mime-blue hover:text-mime-blue"
									>
										+ 새 폴더
									</button>
								</div>

								<div className="mt-6 space-y-3">
									{visibleBookmarkedLinks.length > 0 ? (
										visibleBookmarkedLinks.map((link) => (
											<BookmarkedLinkRow
												key={link.id}
												link={link}
												folders={folders}
												onCopy={() =>
													copyText(
														link.url,
														"링크 주소를 복사했습니다.",
													)
												}
												onRemove={() =>
													toggleLinkBookmark(link.id)
												}
												onChangeFolder={(folderId) =>
													updateBookmarkFolder(
														link.id,
														folderId,
													)
												}
											/>
										))
									) : (
										<div className="rounded-[2rem] border border-dashed border-slate-300 bg-white py-16 text-center">
											<Star className="mx-auto h-9 w-9 text-slate-300" />
											<p className="mt-3 font-bold text-slate-500">
												아직 북마크한 링크가 없습니다.
											</p>
											<button
												onClick={() =>
													scrollTo(
														"links",
														"바로가기",
													)
												}
												className="mt-4 text-sm font-black text-mime-blue"
											>
												바로가기 링크 둘러보기
											</button>
										</div>
									)}
								</div>
							</>
						)}
					</div>
				</section>

				<section
					id="guide"
					className="bg-mime-cream px-5 py-24 text-mime-navy lg:px-8"
				>
					<div className="mx-auto max-w-7xl">
						<div className="grid gap-12 lg:grid-cols-2">
							<div>
								<p className="text-sm font-black tracking-[0.18em] text-mime-blue">
									FESTIVAL GUIDE
								</p>
								<h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
									춘천에서 만나는
									<br />
									가장 자유로운 무대
								</h2>

								<p className="mt-6 max-w-xl leading-8 text-slate-600">
									춘천마임축제는 몸, 거리, 도시 그리고 시민이
									함께 만드는 공연예술축제입니다. 극장 밖
									광장과 골목에서 예상치 못한 장면을 발견하고,
									관객도 공연의 일부가 되어 보세요.
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
										text="공연 시간 및 장소 변경 사항은 공지와 북마크한 링크에서 빠르게 확인할 수 있습니다."
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
										<p className="text-xs font-black tracking-wider text-mime-blue">
											MAIN VENUE
										</p>
										<h3 className="mt-1 text-xl font-black">
											공지천 야외무대
										</h3>
										<p className="mt-2 text-sm leading-6 text-slate-500">
											강원특별자치도 춘천시 스포츠타운길 2
										</p>

										<div className="mt-4 flex flex-wrap gap-2">
											<a
												href="https://map.naver.com"
												target="_blank"
												rel="noopener noreferrer"
												className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-mime-navy hover:text-white"
											>
												길찾기
											</a>
											<a
												href="https://www.letskorail.com"
												target="_blank"
												rel="noopener noreferrer"
												className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-mime-navy hover:text-white"
											>
												대중교통
											</a>
											<a
												href="https://www.chuncheon.go.kr/tour"
												target="_blank"
												rel="noopener noreferrer"
												className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-mime-navy hover:text-white"
											>
												주차 안내
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="bg-mime-pink px-5 py-20 text-white lg:px-8">
					<div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
						<div>
							<p className="text-sm font-black tracking-[0.18em] text-mime-navy">
								KEEP MOVING WITH US
							</p>
							<h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
								말보다 오래 남는
								<br />
								하나의 장면을 만나세요.
							</h2>
						</div>

						<button
							onClick={() => scrollTo("programs", "프로그램")}
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
								2026 춘천마임축제 북마크 링크 홍보 웹·앱. 하나의
								링크로 축제를 발견하고, 저장하고, 공유하며 다시
								찾게 합니다.
							</p>
						</div>

						<div>
							<p className="font-black text-white">
								OFFICIAL INFO
							</p>
							<div className="mt-4 space-y-3 text-sm">
								<p className="flex items-center gap-2">
									<Mail className="h-4 w-4 text-mime-lime" />{" "}
									mimefest2026@culture.kr
								</p>
								<p className="flex items-center gap-2">
									<Phone className="h-4 w-4 text-mime-lime" />{" "}
									033-250-4312
								</p>
								<p className="flex items-center gap-2">
									<Globe className="h-4 w-4 text-mime-lime" />{" "}
									www.mimefest2026.co.kr
								</p>
							</div>
						</div>

						<div>
							<p className="font-black text-white">
								FOLLOW THE MOVEMENT
							</p>
							<div className="mt-4 flex gap-2">
								<IconButton
									label="Instagram"
									className="h-10 w-10"
								>
									<FaInstagram className="h-4 w-4" />
								</IconButton>
								<IconButton
									label="Facebook"
									className="h-10 w-10"
								>
									<FaFacebookF className="h-4 w-4" />
								</IconButton>
								<IconButton label="X" className="h-10 w-10">
									<FaXTwitter className="h-4 w-4" />
								</IconButton>
								<IconButton
									label="YouTube"
									className="h-10 w-10"
								>
									<FaYoutube className="h-4 w-4" />
								</IconButton>
							</div>
						</div>
					</div>

					<div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
						<p>
							© 2026 Chuncheon Mime Festival. All rights reserved.
						</p>
						<div className="flex gap-4">
							<button className="hover:text-white">
								개인정보처리방침
							</button>
							<button className="hover:text-white">
								이용약관
							</button>
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
					scheduled={scheduleBookmarks.includes(selectedProgram.id)}
					onClose={() => setSelectedProgram(null)}
					onSchedule={() => toggleSchedule(selectedProgram.id)}
					onShare={() => {
						setShareProgram(selectedProgram);
						setSelectedProgram(null);
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

			{folderModal && (
				<FolderModal
					mode={folderModal.mode}
					target={folderModal.target}
					onClose={() => setFolderModal(null)}
					onCreate={createFolder}
					onRename={renameFolder}
					onDelete={deleteFolder}
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

export default HomePage;

const InfoCard = ({ icon, label, value }) => (
	<div className="group rounded-2xl border border-mime-navy/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-mime-blue hover:shadow-xl">
		<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mime-navy text-mime-lime">
			{icon}
		</div>
		<p className="mt-5 text-[11px] font-black tracking-[0.13em] text-slate-400">
			{label}
		</p>
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

const LinkCard = ({ link, bookmarked, onBookmark, onCopy }) => {
	const Icon = categoryIcon[link.category] || LinkIcon;

	return (
		<article className="group flex flex-col rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1">
			<div className="flex items-start justify-between">
				<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mime-navy text-mime-lime">
					<Icon className="h-5 w-5" />
				</div>

				<button
					onClick={onBookmark}
					aria-label={`${link.title} 북마크`}
					title={bookmarked ? "북마크 해제" : "북마크에 저장"}
					className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
						bookmarked
							? "bg-mime-lime text-mime-navy"
							: "bg-slate-100 text-slate-400 hover:bg-blue-50 hover:text-mime-blue"
					}`}
				>
					<Star
						className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`}
					/>
				</button>
			</div>

			<p className="mt-4 text-[11px] font-black tracking-[0.14em] text-mime-blue">
				{link.category}
			</p>
			<h3 className="mt-1 text-lg font-black leading-tight">
				{link.title}
			</h3>
			<p className="mt-2 flex-1 text-sm leading-6 text-slate-500">
				{link.description}
			</p>

			<div className="mt-5 flex items-center gap-2">
				<a
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-mime-navy px-4 py-3 text-sm font-black text-white transition hover:bg-mime-blue"
				>
					방문하기
					<ExternalLink className="h-4 w-4" />
				</a>

				<button
					onClick={onCopy}
					aria-label="링크 주소 복사"
					title="링크 주소 복사"
					className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-mime-blue hover:text-mime-blue"
				>
					<Copy className="h-4 w-4" />
				</button>
			</div>

			<p className="mt-3 truncate text-xs font-bold text-slate-400">
				{getHost(link.url)}
			</p>
		</article>
	);
};

const BookmarkedLinkRow = ({ link, folders, onCopy, onRemove, onChangeFolder }) => {
	const Icon = categoryIcon[link.category] || LinkIcon;

	return (
		<div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-4">
			<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mime-navy text-mime-lime">
				<Icon className="h-5 w-5" />
			</div>

			<div className="min-w-0 flex-1">
				<p className="truncate font-black">{link.title}</p>
				<p className="mt-1 truncate text-xs text-slate-500">
					{link.category} · {getHost(link.url)}
				</p>
			</div>

			<label className="shrink-0">
				<span className="sr-only">폴더 선택</span>
				<select
					value={link.folder_id ?? ""}
					onChange={(event) =>
						onChangeFolder(
							event.target.value
								? Number(event.target.value)
								: null,
						)
					}
					className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold outline-none transition focus:border-mime-blue sm:w-36"
				>
					<option value="">폴더 없음</option>
					{folders.map((folder) => (
						<option key={folder.id} value={folder.id}>
							{folder.name}
						</option>
					))}
				</select>
			</label>

			<div className="flex shrink-0 items-center gap-1 self-end sm:self-auto">
				<a
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-mime-navy px-4 py-2 text-xs font-black text-white transition hover:bg-mime-blue"
				>
					방문
					<ExternalLink className="h-3.5 w-3.5" />
				</a>

				<button
					onClick={onCopy}
					aria-label="링크 주소 복사"
					className="hidden shrink-0 rounded-full p-2 text-slate-400 transition hover:bg-blue-50 hover:text-mime-blue sm:block"
				>
					<Copy className="h-4 w-4" />
				</button>

				<button
					onClick={onRemove}
					aria-label={`${link.title} 북마크 삭제`}
					className="shrink-0 rounded-full p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
				>
					<Trash2 className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
};

const FolderModal = ({ mode, target, onClose, onCreate, onRename, onDelete }) => {
	const [name, setName] = useState(mode === "rename" ? (target?.name ?? "") : "");
	const [submitting, setSubmitting] = useState(false);
	const isDelete = mode === "delete";

	const handleConfirm = async () => {
		setSubmitting(true);
		let ok = false;
		if (mode === "create") ok = await onCreate(name);
		else if (mode === "rename") ok = await onRename(target.id, name);
		else if (mode === "delete") ok = await onDelete(target.id);
		setSubmitting(false);
		if (ok) onClose();
	};

	return (
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
						<p className="text-xs font-black tracking-[0.16em] text-mime-blue">
							{isDelete
								? "DELETE FOLDER"
								: mode === "rename"
									? "RENAME FOLDER"
									: "NEW FOLDER"}
						</p>
						<h2 className="mt-2 text-2xl font-black">
							{isDelete
								? "폴더 삭제"
								: mode === "rename"
									? "폴더 이름 변경"
									: "새 폴더 만들기"}
						</h2>
					</div>
					<button
						onClick={onClose}
						className="rounded-full bg-slate-100 p-2 transition hover:bg-slate-200"
						aria-label="닫기"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				{isDelete ? (
					<p className="mt-6 text-sm leading-6 text-slate-600">
						<span className="font-bold text-mime-navy">
							"{target?.name}"
						</span>{" "}
						폴더를 삭제하면 안의 링크는 '폴더 없음'으로
						이동합니다.
					</p>
				) : (
					<label className="mt-6 block">
						<span className="mb-2 block text-xs font-bold text-slate-500">
							폴더 이름
						</span>
						<input
							value={name}
							onChange={(event) => setName(event.target.value)}
							maxLength={30}
							autoFocus
							className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-sm font-medium outline-none transition focus:border-mime-blue focus:ring-4 focus:ring-blue-100"
							placeholder="예: 여행 링크 모음"
						/>
					</label>
				)}

				<div className="mt-6 grid grid-cols-2 gap-3">
					<button
						onClick={onClose}
						className="rounded-xl bg-slate-100 px-4 py-3.5 text-sm font-black text-slate-600 transition hover:bg-slate-200"
					>
						취소
					</button>
					<button
						onClick={handleConfirm}
						disabled={submitting || (!isDelete && !name.trim())}
						className={`rounded-xl px-4 py-3.5 text-sm font-black text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
							isDelete
								? "bg-rose-500 hover:bg-rose-600"
								: "bg-mime-navy hover:bg-mime-blue"
						}`}
					>
						{isDelete ? "삭제" : mode === "rename" ? "저장" : "만들기"}
					</button>
				</div>
			</div>
		</div>
	);
};

const ProgramCard = ({ program, scheduled, onSchedule, onOpen }) => (
	<article className="group overflow-hidden rounded-[1.5rem] bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:scale-105">
		<button
			onClick={onOpen}
			className="relative block aspect-[4/3] w-full overflow-hidden text-left"
		>
			<img
				src={program.image}
				alt={program.title}
				className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
			/>
			<div
				className={`absolute inset-0 bg-gradient-to-tr ${program.gradient} opacity-35 mix-blend-color`}
			></div>
			<div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-black text-mime-navy backdrop-blur">
				{program.genre}
			</div>
		</button>

		<div className="p-5">
			<div className="flex items-start justify-between gap-3">
				<button onClick={onOpen} className="min-w-0 text-left">
					<h3 className="truncate text-xl font-black tracking-tight">
						{program.title}
					</h3>
					<p className="mt-1 truncate text-xs font-bold text-slate-400">
						{program.enTitle}
					</p>
				</button>

				<button
					onClick={onSchedule}
					aria-label={`${program.title} 내 일정에 추가`}
					title={scheduled ? "내 일정에서 빼기" : "내 일정에 추가"}
					className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
						scheduled
							? "bg-mime-blue text-white"
							: "bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-mime-blue"
					}`}
				>
					<Bookmark
						className={`h-4 w-4 ${scheduled ? "fill-current" : ""}`}
					/>
				</button>
			</div>

			<p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
				{program.description}
			</p>

			<div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs font-bold text-slate-500">
				<p className="flex items-center gap-2">
					<Clock className="h-3.5 w-3.5 text-mime-blue" />{" "}
					{program.date} · {program.time}
				</p>
				<p className="flex items-center gap-2">
					<MapPin className="h-3.5 w-3.5 text-mime-blue" />{" "}
					{program.place}
				</p>
			</div>
		</div>
	</article>
);

const ProgramModal = ({ program, scheduled, onClose, onSchedule, onShare }) => (
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
					<div
						className={`absolute inset-0 bg-gradient-to-tr ${program.gradient} opacity-35 mix-blend-color`}
					></div>
					<button
						onClick={onClose}
						className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-mime-navy transition hover:bg-white"
						aria-label="상세 닫기"
					>
						<X className="h-5 w-5" />
					</button>
					<div className="absolute bottom-6 left-6 right-6">
						<span className="rounded-full bg-mime-lime px-3 py-1.5 text-xs font-black text-mime-navy">
							{program.tags.join(" · ")}
						</span>
						<h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white">
							{program.title}
						</h2>
					</div>
				</div>

				<div className="p-6 sm:p-8">
					<p className="text-sm font-black tracking-[0.15em] text-mime-blue">
						{program.enTitle}
					</p>
					<p className="mt-4 text-base leading-8 text-slate-600">
						{program.description}
					</p>

					<div className="mt-7 space-y-4 rounded-2xl bg-slate-50 p-5">
						<DetailRow
							label="출연진 · 단체"
							value={program.artist}
						/>
						<DetailRow
							label="일시"
							value={`${program.date} ${program.time}`}
						/>
						<DetailRow label="장소" value={program.place} />
						<DetailRow label="러닝타임" value={program.duration} />
						<DetailRow label="관람 정보" value={program.audience} />
					</div>

					<div className="mt-6 grid grid-cols-2 gap-3">
						<button
							onClick={onSchedule}
							className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-black transition ${
								scheduled
									? "bg-mime-blue text-white"
									: "bg-mime-navy text-white hover:bg-mime-blue"
							}`}
						>
							<Bookmark
								className={`h-4 w-4 ${scheduled ? "fill-current" : ""}`}
							/>
							{scheduled ? "내 일정에 추가됨" : "내 일정에 추가"}
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
						<a
							href="https://www.mimefestival.com"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-2 rounded-xl border border-mime-blue px-4 py-3.5 text-sm font-black text-mime-blue transition hover:bg-blue-50"
						>
							<ExternalLink className="h-4 w-4" />
							공식 홈페이지
						</a>

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

const ShareModal = ({ program, copied, onClose, onCopy }) => (
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
					<p className="text-xs font-black tracking-[0.16em] text-mime-blue">
						SHARE YOUR SCHEDULE
					</p>
					<h2 className="mt-2 text-2xl font-black">
						내 일정 링크 공유하기
					</h2>
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
					<p className="text-xs font-bold text-mime-lime">
						2026 춘천마임축제
					</p>
					<p className="mt-1 truncate text-lg font-black">
						{program.title}
					</p>
					<p className="mt-1 text-xs text-slate-300">
						{program.date} {program.time}
					</p>
					<p className="mt-1 truncate text-xs text-slate-300">
						{program.place}
					</p>
				</div>
			</div>

			<p className="mt-6 text-sm leading-6 text-slate-600">
				내가 고른 2026 춘천마임축제 일정을 확인해 보세요. 링크를 통해
				누구나 로그인 없이 축제 정보와 일정을 확인할 수 있습니다.
			</p>

			<div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 p-2">
				<input
					value="https://mimefestival.com/my/12345"
					readOnly
					className="min-w-0 flex-1 bg-transparent px-2 text-xs font-medium outline-none"
				/>
				<button
					onClick={onCopy}
					className="flex shrink-0 items-center gap-2 rounded-lg bg-mime-navy px-3 py-2 text-xs font-black text-white transition hover:bg-mime-blue"
				>
					{copied ? (
						<Check className="h-4 w-4" />
					) : (
						<Copy className="h-4 w-4" />
					)}
					{copied ? "복사됨" : "복사"}
				</button>
			</div>

			<div className="mt-6 grid grid-cols-4 gap-3">
				<ShareButton
					icon={<LinkIcon className="h-5 w-5" />}
					label="링크 복사"
					onClick={onCopy}
				/>
				<ShareButton
					icon={<Image className="h-5 w-5" />}
					label="QR 코드"
				/>
				<ShareButton
					icon={<MessageSquare className="h-5 w-5" />}
					label="카카오톡"
				/>
				<ShareButton
					icon={<Mail className="h-5 w-5" />}
					label="이메일"
				/>
				<ShareButton
					icon={<FaInstagram className="h-5 w-5" />}
					label="인스타그램"
				/>
				<ShareButton
					icon={<FaFacebookF className="h-5 w-5" />}
					label="페이스북"
				/>
				<ShareButton icon={<FaXTwitter className="h-5 w-5" />} label="X" />
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

const MobileTabBar = ({ activeTab, onNavigate }) => {
	const tabs = [
		{ label: "홈", id: "home", icon: <Home className="h-5 w-5" /> },
		{
			label: "프로그램",
			id: "programs",
			icon: <Play className="h-5 w-5" />,
		},
		{
			label: "바로가기",
			id: "links",
			icon: <ExternalLink className="h-5 w-5" />,
		},
		{
			label: "내 일정",
			id: "my-schedule",
			icon: <Calendar className="h-5 w-5" />,
		},
		{
			label: "북마크",
			id: "bookmarks",
			icon: <Star className="h-5 w-5" />,
		},
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
								? "text-mime-blue"
								: "text-slate-400"
						}`}
					>
						<span
							className={
								activeTab === tab.label ? "text-mime-blue" : ""
							}
						>
							{tab.icon}
						</span>
						{tab.label}
					</button>
				))}
			</div>
		</div>
	);
};
