export interface Column {
  Header: string;
  width: number;
}
export interface TableProp {
  columns: Column[];
  data: any[];
}
