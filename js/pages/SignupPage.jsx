import { Link } from "react-router-dom";
import AuthLayout, { AuthField } from "../components/AuthLayout.jsx";

const SignupPage = () => (
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
				autoComplete="new-password"
			/>
			<AuthField
				label="비밀번호 확인"
				type="password"
				name="passwordConfirm"
				placeholder="비밀번호를 다시 입력하세요"
				autoComplete="new-password"
			/>

			<button
				type="submit"
				className="mt-2 w-full rounded-full bg-mime-lime px-6 py-4 text-sm font-black text-mime-navy transition hover:bg-white"
			>
				회원가입
			</button>
		</form>
	</AuthLayout>
);

export default SignupPage;
