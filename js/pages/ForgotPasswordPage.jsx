import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import AuthLayout, { AuthField } from "../components/AuthLayout.jsx";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);

	const canSubmit = email.trim();

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!canSubmit) return;
		setSent(true);
	};

	return (
		<AuthLayout
			eyebrow="RESET PASSWORD"
			title="비밀번호 찾기"
			footer={
				<p>
					비밀번호가 기억나셨나요?{" "}
					<Link
						to="/login"
						className="font-bold text-mime-lime transition hover:opacity-80"
					>
						로그인
					</Link>
				</p>
			}
		>
			{sent ? (
				<div className="space-y-5">
					<div className="flex items-start gap-3 rounded-2xl border border-mime-lime/30 bg-mime-lime/10 p-4">
						<Mail className="mt-0.5 h-5 w-5 shrink-0 text-mime-lime" />
						<p className="text-sm leading-6 text-slate-200">
							<span className="font-bold text-white">
								{email}
							</span>
							{" "}주소로 비밀번호 재설정 링크를 발송했습니다.
							메일함을 확인해주세요.
						</p>
					</div>

					<div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-4">
						<p className="text-xs font-bold text-slate-400">
							데모 환경 안내
						</p>
						<p className="mt-1 text-xs leading-5 text-slate-400">
							실제 이메일은 발송되지 않습니다. 아래 링크를 눌러
							재설정 페이지로 이동해보세요.
						</p>
						<Link
							to={`/reset-password?email=${encodeURIComponent(email)}`}
							className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-mime-lime transition hover:opacity-80"
						>
							비밀번호 재설정 링크 열기 →
						</Link>
					</div>

					<button
						type="button"
						onClick={() => setSent(false)}
						className="w-full rounded-full border border-white/15 px-6 py-3.5 text-sm font-bold text-slate-200 transition hover:border-mime-lime hover:text-mime-lime"
					>
						다른 이메일로 다시 보내기
					</button>
				</div>
			) : (
				<form className="space-y-4" onSubmit={handleSubmit}>
					<AuthField
						label="이메일"
						type="email"
						name="email"
						placeholder="you@example.com"
						autoComplete="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>

					<button
						type="submit"
						disabled={!canSubmit}
						className="mt-2 w-full rounded-full bg-mime-lime px-6 py-4 text-sm font-black text-mime-navy transition hover:bg-white disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-slate-400 disabled:hover:bg-white/15"
					>
						비밀번호 리셋 링크 발송
					</button>
				</form>
			)}
		</AuthLayout>
	);
};

export default ForgotPasswordPage;
