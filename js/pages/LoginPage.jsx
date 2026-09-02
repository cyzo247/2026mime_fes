import { Link } from "react-router-dom";
import AuthLayout, { AuthField } from "../components/AuthLayout.jsx";

const LoginPage = () => (
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
		<form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
			<AuthField
				label="이메일"
				type="email"
				name="email"
				placeholder="you@example.com"
				autoComplete="email"
			/>
			<AuthField
				label="비밀번호"
				type="password"
				name="password"
				placeholder="비밀번호를 입력하세요"
				autoComplete="current-password"
			/>

			<button
				type="submit"
				className="mt-2 w-full rounded-full bg-mime-lime px-6 py-4 text-sm font-black text-mime-navy transition hover:bg-white"
			>
				로그인
			</button>
		</form>
	</AuthLayout>
);

export default LoginPage;
