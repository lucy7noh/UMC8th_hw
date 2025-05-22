import { CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userid: number;
  lpId: number;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorid: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;
