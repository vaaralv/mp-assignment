import {
  Cell,
  Column,
  Row,
  Table as AriaTable,
  TableBody,
  TableHeader,
} from "react-aria-components";
import { TableColumn } from "../../types";

interface TableProps<T> {
  data: (T & { id: string })[];
  columns: TableColumn<T>[];
  tableName: string;
}

function getAlignment(value: "left" | "right" | "center") {
  switch (value) {
    case "left":
      return "text-left";
    case "right":
      return "text-right";
    case "center":
      return "text-center";
    default:
      return "text-left";
  }
}

function isFirstElementInArray(index: number, array: any[]) {
  return index === 0;
}

function isLastElementInArray(index: number, array: any[]) {
  return index === array.length - 1;
}

function getCellPadding(index: number, array: any[]) {
  if (isFirstElementInArray(index, array)) {
    return "pl-3 pr-1.5";
  }
  if (isLastElementInArray(index, array)) {
    return "pr-3 pr-1.5";
  }
  return "px-1.5";
}

function getHeaderCellRounding(index: number, array: any[]) {
  if (isFirstElementInArray(index, array)) {
    return "rounded-tl-lg";
  }
  if (isLastElementInArray(index, array)) {
    return "rounded-tr-lg";
  }
  return "";
}

export default function Table<T extends Record<string, string | number>>({
  data,
  columns,
  tableName,
}: TableProps<T>) {
  function renderHeaderCells() {
    return columns.map(
      ({ id, title, align, headerCellComponent, isRowHeader, minWidth }, i) => (
        <Column
          minWidth={minWidth}
          key={`header-column-${id}`}
          isRowHeader={isRowHeader}
          className={`${getAlignment(align)} ${getCellPadding(
            i,
            columns
          )} ${getHeaderCellRounding(
            i,
            columns
          )} py-3 bg-slate-50 border-b-outline-light border-solid text-sm`}
        >
          {headerCellComponent
            ? headerCellComponent({ columnId: id, title })
            : title}
        </Column>
      )
    );
  }

  function renderBodyCells(rowID: string, dataPoint: T) {
    return columns.map(({ id, bodyCellComponent, align }, columnIndex) => (
      <Cell
        key={`cell-${rowID}-${id}`}
        className={`${getAlignment(align)} ${getCellPadding(
          columnIndex,
          columns
        )} py-3.5 text-sm focus:ring-2 focus:ring-btn-bg`}
      >
        {bodyCellComponent ? (
          bodyCellComponent({
            columnId: id,
            rowID: rowID,
            value: dataPoint[id],
          })
        ) : (
          <span
            className="text-text font-light truncate"
            key={`cell-${rowID}-${id}`}
          >
            {dataPoint[id]}
          </span>
        )}
      </Cell>
    ));
  }

  return (
    <div className="border border-solid border-outline-light rounded-lg">
      <AriaTable className="w-full" aria-label={tableName}>
        <TableHeader className="border-b border-b-outline-light">
          {renderHeaderCells()}
        </TableHeader>
        <TableBody className="divide-y divide-outline-light">
          {data.map((dataPoint) => (
            <Row
              key={`row-${dataPoint.id}`}
              className="focus:ring-2 focus:ring-btn-bg"
            >
              {renderBodyCells(dataPoint.id, dataPoint)}
            </Row>
          ))}
        </TableBody>
      </AriaTable>
    </div>
  );
}
