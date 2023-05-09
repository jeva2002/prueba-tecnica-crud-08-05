export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type NewPostDTO = Omit<Post, 'id'>;

export interface UpdatedPostDTO extends Partial<NewPostDTO> {
  id: number;
}
