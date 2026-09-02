import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout, { AuthField } from "../components/AuthLayout.jsx";

const DEMO_ACCOUNT = {
	email: "test@example.com",
	password: "password123",
};

const LoginPage = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const canSubmit = email.trim() && password;

	useEffect(() => {
		if (!error) return;
		const timeout = setTimeout(() => setError(""), 2600);
		return () => clearTimeout(timeout);
	}, [error]);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!canSubmit) return;

		if (
			email.trim() !== DEMO_ACCOUNT.email ||
			password !== DEMO_ACCOUNT.password
		) {
			setError("이메일 또는 비밀번호가 올바르지 않습니다.");
			return;
		}

		navigate("/");
	};

	return (
		<>
			<AuthLayout
				eyebrow="WELCOME BACK"
				title="로그인"
				footer={
					<>
						아직 계정이 없으신가요?{" "}
						<Link
							to="/signup"
							className="font-bold text-mime-lime transition hover:opacity-80"
						>
							회원가입
						</Link>
					</>
				}
			>
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
					<AuthField
						label="비밀번호"
						type="password"
						name="password"
						placeholder="비밀번호를 입력하세요"
						autoComplete="current-password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>

					<button
						type="submit"
						disabled={!canSubmit}
						className="mt-2 w-full rounded-full bg-mime-lime px-6 py-4 text-sm font-black text-mime-navy transition hover:bg-white disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-slate-400 disabled:hover:bg-white/15"
					>
						로그인
					</button>

					<p className="text-center text-xs text-slate-400">
						데모 계정: {DEMO_ACCOUNT.email} /{" "}
						{DEMO_ACCOUNT.password}
					</p>
				</form>
			</AuthLayout>

			{error && (
				<div className="fixed left-1/2 top-8 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#F04452] px-5 py-3 text-sm font-black text-white shadow-2xl">
					{error}
				</div>
			)}
		</>
	);
};

export default LoginPage;
