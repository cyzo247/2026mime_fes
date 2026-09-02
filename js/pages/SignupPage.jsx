import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import AuthLayout, { AuthField } from "../components/AuthLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { translateAuthError } from "../lib/authErrors.js";

const SignupPage = () => {
	const navigate = useNavigate();
	const { signup } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [confirmationSent, setConfirmationSent] = useState(false);

	const canSubmit = email.trim() && password && passwordConfirm && !submitting;

	useEffect(() => {
		if (!error) return;
		const timeout = setTimeout(() => setError(""), 2600);
		return () => clearTimeout(timeout);
	}, [error]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!canSubmit) return;

		if (password !== passwordConfirm) {
			setError("비밀번호가 일치하지 않습니다.");
			return;
		}

		setSubmitting(true);
		const { data, error: signUpError } = await signup(
			email.trim(),
			password,
		);
		setSubmitting(false);

		if (signUpError) {
			setError(translateAuthError(signUpError));
			return;
		}

		// 이메일 인증이 꺼져 있는 등 가입 즉시 세션이 생기는 경우에만 바로 이동
		if (data.session) {
			navigate("/");
			return;
		}

		setConfirmationSent(true);
	};

	return (
		<>
			<AuthLayout
				eyebrow="JOIN THE MOVEMENT"
				title="회원가입"
				footer={
					<p>
						이미 계정이 있으신가요?{" "}
						<Link
							to="/login"
							className="font-bold text-mime-lime transition hover:opacity-80"
						>
							로그인
						</Link>
					</p>
				}
			>
				{confirmationSent ? (
					<div className="space-y-5">
						<div className="flex items-start gap-3 rounded-2xl border border-mime-lime/30 bg-mime-lime/10 p-4">
							<Mail className="mt-0.5 h-5 w-5 shrink-0 text-mime-lime" />
							<p className="text-sm leading-6 text-slate-200">
								<span className="font-bold text-white">
									{email}
								</span>{" "}
								주소로 인증 메일을 보냈습니다. 메일함에서 링크를
								확인한 뒤 로그인해주세요.
							</p>
						</div>

						<Link
							to="/login"
							className="block w-full rounded-full bg-mime-lime px-6 py-4 text-center text-sm font-black text-mime-navy transition hover:bg-white"
						>
							로그인 페이지로 이동
						</Link>
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
							onChange={(event) =>
								setPasswordConfirm(event.target.value)
							}
						/>

						<button
							type="submit"
							disabled={!canSubmit}
							className="mt-2 w-full rounded-full bg-mime-lime px-6 py-4 text-sm font-black text-mime-navy transition hover:bg-white disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-slate-400 disabled:hover:bg-white/15"
						>
							{submitting ? "가입 처리 중..." : "회원가입"}
						</button>
					</form>
				)}
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
