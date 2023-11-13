import { ReactNode } from "react";

export interface BodyCellComponentProps<T> {
  columnId: keyof T & string;
  rowID: string;
  value: T[keyof T & string];
}

export interface HeaderCellComponentProps<T> {
  columnId: keyof T & string;
  title: string;
}

export interface TableColumn<T> {
  id: keyof T & string;
  title: string;
  align: "left" | "right" | "center";
  isRowHeader?: true;
  bodyCellComponent?: (props: BodyCellComponentProps<T>) => ReactNode;
  headerCellComponent?: (props: HeaderCellComponentProps<T>) => ReactNode;
  minWidth?: number;
}

export interface Hotel {
  _id: string;
  name: string;
}

export interface Channel {
  _id: string;
  name: string;
  hotels: string[];
}
