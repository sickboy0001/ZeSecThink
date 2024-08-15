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
  isConvert?: boolean;
  state: string;
  title: string;
  create_at: string;
}
