export interface TypeTagMas {
  id: string;
  tag_name: string;
  name: string;
  description: string;
  visible_flg: boolean;
  favorite_flg: boolean;
  public_flg: boolean;
  create_at?: string; // DateTime
  update_at?: string; // DateTime
}

export interface TypeTagOrder {
  id: number;
  user_id: number;
  type: string;
  tag_ids: string;
  create_at?: string; // DateTime
  update_at?: string; // DateTime
}
