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
  isInserted?: boolean;
  title: string;
  create_at: Date;
}
