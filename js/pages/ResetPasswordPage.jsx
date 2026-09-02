import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout, { AuthField } from "../components/AuthLayout.jsx";

const ResetPasswordPage = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const email = searchParams.get("email") || "";

	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [error, setError] = useState("");

	const canSubmit = password && passwordConfirm;

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

		navigate("/login");
	};

	return (
		<>
			<AuthLayout
				eyebrow="SET NEW PASSWORD"
				title="비밀번호 재설정"
				footer={
					<p>
						<Link
							to="/login"
							className="font-bold text-mime-lime transition hover:opacity-80"
						>
							로그인으로 돌아가기
						</Link>
					</p>
				}
			>
				{email && (
					<p className="mb-5 text-sm text-slate-300">
						<span className="font-bold text-white">{email}</span>{" "}
						계정의 새 비밀번호를 설정합니다.
					</p>
				)}

				<form className="space-y-4" onSubmit={handleSubmit}>
					<AuthField
						label="새 비밀번호"
						type="password"
						name="password"
						placeholder="새 비밀번호를 입력하세요"
						autoComplete="new-password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<AuthField
						label="새 비밀번호 확인"
						type="password"
						name="passwordConfirm"
						placeholder="새 비밀번호를 다시 입력하세요"
						autoComplete="new-password"
						value={passwordConfirm}
						onChange={(event) =>
							setPasswordConfirm(event.target.value)
						}
					/>

					<button
						type="submit"
						disabled={!canSubmit}
						className="mt-2 w-full rounded-full bg-mime-lime px-6 py-4 text-sm font-black text-mime-navy transition hover:bg-white disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-slate-400 disabled:hover:bg-white/15"
					>
						비밀번호 재설정
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

export default ResetPasswordPage;
