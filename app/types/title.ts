export interface TypeZstTitle {
  id: number;
  title: string;
  comment: string;
  create_at: string;
}

export interface TypeZstUserTitle {
  id: number;
  userid: number;
  title: string;
  comment: string;
  create_at: string;
}

export interface TypeImportTitle {
  isSelected?: boolean; // チェックボックスの状態を保持
  edit: string;
  state: string;
  title: string;
  create_at: string;
}
