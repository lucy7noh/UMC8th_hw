import { RequestSignupDto, RequestSigninDto, ResponseSignupDto, ResponseSigninDto } from "../types/auth";
import { axiosInstance } from "./axios";

export const postSignup = async (body: RequestSignupDto): Promise<RequestSignupDto> => {
    const { data } = await axiosInstance.post(
        "/v1/auth/signup",
        body
    );
    return data;
};

export const postSignin = async (body: RequestSigninDto): Promise<RequestSigninDto> => {
    const { data } = await axiosInstance.post(
        "/v1/auth/signin",
        body
    );
    return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    const {data: T} = await axiosInstance.get("/v1/users/me");

    headers: {
        Authorization: 'Bearer ${'
    }

    return data;
};