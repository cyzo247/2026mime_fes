import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout, { AuthField } from "../components/AuthLayout.jsx";

const SignupPage = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [error, setError] = useState("");

	const canSubmit = email.trim() && password && passwordConfirm;

	useEffect(() => {
		if (!error) return;
		const timeout = setTimeout(() => setError(""), 2600);
		return () => clearTimeout(timeout);
	}, [error]);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!canSubmit) return;

		if (password !== passwordConfirm) {
			setError("비밀번호가 일치하지 않습니다.");
			return;
		}

		navigate("/");
	};

	return (
		<>
			<AuthLayout
				eyebrow="JOIN THE MOVEMENT"
				title="회원가입"
				footer={
					<>
						이미 계정이 있으신가요?{" "}
						<Link
							to="/login"
							className="font-bold text-mime-lime transition hover:opacity-80"
						>
							로그인
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
						autoComplete="new-password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<AuthField
						label="비밀번호 확인"
						type="password"
						name="passwordConfirm"
						placeholder="비밀번호를 다시 입력하세요"
						autoComplete="new-password"
						value={passwordConfirm}
						onChange={(event) => setPasswordConfirm(event.target.value)}
					/>

					<button
						type="submit"
						disabled={!canSubmit}
						className="mt-2 w-full rounded-full bg-mime-lime px-6 py-4 text-sm font-black text-mime-navy transition hover:bg-white disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-slate-400 disabled:hover:bg-white/15"
					>
						회원가입
					</button>
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

export default SignupPage;
