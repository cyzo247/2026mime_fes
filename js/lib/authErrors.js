const MESSAGES = {
	"Invalid login credentials": "이메일 또는 비밀번호가 올바르지 않습니다.",
	"Email not confirmed": "이메일 인증이 완료되지 않았습니다. 메일함에서 인증 링크를 확인해주세요.",
	"User already registered": "이미 가입된 이메일입니다.",
	"Password should be at least 6 characters.":
		"비밀번호는 최소 6자 이상이어야 합니다.",
};

export const translateAuthError = (error) =>
	MESSAGES[error?.message] || error?.message || "알 수 없는 오류가 발생했습니다.";
