import { Link } from "react-router-dom";

const Logo = () => (
	<div className="flex items-center gap-3">
		<div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-mime-lime text-mime-navy shadow-lg shadow-lime-300/10">
			<span className="absolute h-7 w-2 -rotate-45 rounded-full bg-mime-navy"></span>
			<span className="absolute h-7 w-2 rotate-45 rounded-full bg-mime-navy"></span>
			<span className="relative mt-3 h-2 w-2 rounded-full bg-mime-lime"></span>
		</div>
		<div className="leading-none">
			<p className="text-[10px] font-bold tracking-[0.24em] text-mime-lime">
				CHUNCHEON MIME FESTIVAL
			</p>
			<p className="mt-1 text-base font-black tracking-tight text-white">
				2026 춘천마임축제
			</p>
		</div>
	</div>
);

const AuthLayout = ({ eyebrow, title, children, footer }) => (
	<div className="noise hero-grid relative flex min-h-screen items-center justify-center overflow-hidden bg-mime-navy px-5 py-16">
		<div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(120,58,237,.35),transparent_25%),radial-gradient(circle_at_15%_85%,rgba(23,105,224,.28),transparent_25%)]"></div>
		<div className="absolute -right-32 top-16 h-96 w-96 rounded-full bg-mime-lime/15 blur-[110px]"></div>
		<div className="absolute -left-28 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[130px]"></div>

		<div className="relative w-full max-w-md">
			<Link to="/" className="mb-8 flex justify-center">
				<Logo />
			</Link>

			<div className="rounded-[2rem] border border-white/15 bg-white/10 p-7 shadow-glow backdrop-blur-md sm:p-9">
				<p className="text-xs font-black tracking-[0.18em] text-mime-lime">
					{eyebrow}
				</p>
				<h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
					{title}
				</h1>

				<div className="mt-7">{children}</div>
			</div>

			{footer && (
				<div className="mt-6 space-y-2 text-center text-sm text-slate-300">
					{footer}
				</div>
			)}

			<Link
				to="/"
				className="mt-6 block text-center text-xs font-bold text-slate-400 transition hover:text-white"
			>
				← 홈으로 돌아가기
			</Link>
		</div>
	</div>
);

export const AuthField = ({ label, ...inputProps }) => (
	<label className="block">
		<span className="mb-2 block text-xs font-bold text-slate-300">
			{label}
		</span>
		<input
			{...inputProps}
			className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm font-medium text-white placeholder:text-slate-400 outline-none transition focus:border-mime-lime focus:bg-white/15 focus:ring-4 focus:ring-mime-lime/20"
		/>
	</label>
);

export default AuthLayout;
