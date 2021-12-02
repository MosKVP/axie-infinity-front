import React from "react";
import MaUTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useTable, Column, Row, TableOptions } from "react-table";
import { TextField } from "@mui/material";

export interface TableProperties<T extends Record<string, unknown>>
  extends TableOptions<T> {
  getRowProps?: (row: Row<T>) => {};
  onUpdate: (rowIndex: number, columnId: string, value: any) => void;
}

export const EditableNumberCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  onUpdate, // This is a custom function that we supplied to our table instance
}: {
  value: number | null;
  row: Row;
  column: Column;
  onUpdate: (
    rowIndex: number,
    columnId: string | undefined,
    value: number | null
  ) => void;
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(
    initialValue === null ? "" : initialValue.toFixed(3)
  );

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  // // We'll only update the external data when the input is blurred
  const onBlur = () => {
    onUpdate(index, id, value ? parseFloat(value) : null);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue === null ? "" : initialValue.toFixed(3));
  }, [initialValue]);

  return (
    <TextField
      variant='outlined'
      type='number'
      InputProps={{
        inputProps: {
          min: 0,
          step: "0.001",
        },
      }}
      size="small"
      placeholder="Enter Price"
      value={value === null ? "" : value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export const Table = <T extends {}>(props: TableProperties<T>) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    ...props,
  });

  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow
              {...row.getRowProps(
                props.getRowProps ? props.getRowProps(row) : undefined
              )}
            >
              {row.cells.map((cell) => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
};
