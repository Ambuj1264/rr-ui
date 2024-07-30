import { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
export type Person = {
  item: string;
  quantity: number;
  price: number;
};

export const ItemTable = (props: any) => {
  let packageData = props;
let data =[]

  const packageKey = Object.keys(packageData.packageData);

  if (packageKey[0] === "basicPackage") {
    data= packageData?.packageData?.basicPackage?.map((value:any)=> ({
        item: value?.itemName,
        quantity: value.basicQuantity,
        
      }))
  }
  else if(packageKey[0] === "deluxePackage"){
    data= packageData?.packageData?.deluxePackage?.map((value:any)=> ({
        item: value?.itemName,
        quantity: value.deluxeQuantity,
        
      }))
  }
else if(packageKey[0] === "superDeluxePackage"){
    data= packageData?.packageData?.superDeluxePackage?.map((value:any)=> ({
        item: value?.itemName,
        quantity: value.superDeluxeQuantity,
        
      }))
  }

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "item",
        header: "Item",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnActions={false}
      enableColumnFilters={false}
      enablePagination={false}
      enableSorting={false}
      enableBottomToolbar={false}
      enableTopToolbar={false}
      muiTableBodyRowProps={{ hover: false }}
      muiTableProps={{
        sx: {
          border: "1px solid #EB5757",
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          border: "1px solid #EB5757",
          background: "#FEECEC",
          color: "#EB5757",
        },
      }}
      muiTableBodyCellProps={{
        sx: {
          border: "1px solid #EB5757",
        },
      }}
    />
  );
};

export default ItemTable;
