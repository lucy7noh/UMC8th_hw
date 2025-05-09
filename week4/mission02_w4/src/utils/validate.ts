export type UserSingInformation = {
    email: string;
    password: string;
};

function validateUser(values: UserSingInformation) {
    const errors = {
        email: "",
        password: "",
    };

    if(!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
        values.email,
    )
) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
}

//비밀번호 4~20 자 사이 입력
if(!(values.password.length >= 4 && values.password.length < 20)) {
    errors.password = "비밀번호는 4~20자 사이로 입력해주세요.";
}
return errors;
}

//로그인 유효성 검사
function validateSignin(values: UserSingInformation) {
    return validateUser(values);
}

export {validateSignin};