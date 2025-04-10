import { CommonResponse } from "./common.ts";

//회원가입
export type RequestSignupDto = {
    name: string;
      email: string;
      bio?: string;
      avatar?: string;
      password: string;
    };
    
    export type ResponseSignupDto = CommonResponse<{
            id: number;
            name: string;
            email: string;
            bio: string | null;
            avatar: string | null;
            createdAt: Date; 
            updatedAt: Date; 
    }>;
    
    //로그인
    export type RequestSignupDto = {
          email: string;
          password: string;
        };
        export type ResponseSignupDto = CommonResponse<{
            id: number;
            name: string;
            accessTocken: string;
            refreshTocken: string;
    }>;

    //내 정보 조회
    export type MyInfoResponseDto = CommonResponse<{
            id: number;
            name: string;
            email: string;
            bio: string | null;
            avatar: string | null;
            createdAt: Date; 
            updatedAt: Date; 
    }>;
