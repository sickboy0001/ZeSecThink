export interface TypeZstDay {
  date: Date;
  zstContent: TypeZstContent[];
}

export interface TypeZstContent {
  title: string;
  public_flg: boolean;
  content_public_flg: boolean;
  content: string;
}

export interface TypeZstPost {
  id: number;
  user_id: number;
  current_at: Date;
  title: string;
  content: string;
  second: number;
  public_flg: boolean;
  public_content_flg: boolean;
  delete_flg: boolean;
  write_start_at: Date;
  write_end_at: Date;
  create_at: Date;
  update_at: Date;
}
