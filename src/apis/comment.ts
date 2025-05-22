// src/apis/comment.ts
import axiosInstance from "./axios";
import { CursorBasedResponse } from "../types/common";
import { Comment } from "../types/lp";
import { PaginationDto } from "../types/common";

export const getCommentsByLpId = async (
  lpId: number,
  params: PaginationDto
): Promise<CursorBasedResponse<Comment[]>> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params,
  });
  return data;
};
