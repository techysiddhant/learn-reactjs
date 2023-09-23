import {
 DataGrid,
 GridColDef,
 GridToolbar,
 GridValueGetterParams,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type Props = {
 columns: GridColDef[];
 rows: object[];
 slug: string;
};



const rows = [
 { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
 { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
 { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
 { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
 { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
 { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
 { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
 { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
 { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const DataTable = (props: Props) => {
 // TEST THE API

 const queryClient = useQueryClient();
 const mutation = useMutation({
  mutationFn: (id: number) => {
   return fetch(`http://localhost:8800/api/${props.slug}/${id}`, {
    method: "delete",
   });
  },
  onSuccess: () => {
   queryClient.invalidateQueries([`all${props.slug}`]);
  }
 });
 const handleDelete = (id: number) => {
  //delete the item
  mutation.mutate(id)
 };
 const actionColumn: GridColDef = {
  field: "action",
  headerName: "Action",
  width: 150,
  renderCell: (params) => {
   return (
    <div className="action">
     <Link to={`/${props.slug}/${params.row.id}`}>
      <img src="/view.svg" alt="" />
     </Link>
     <div className="delete" onClick={() => handleDelete(params.row.id)}>
      <img src="/delete.svg" alt="" />
     </div>
    </div>
   );
  },
 };




 return (
  <div className="dataTable">
   <DataGrid
    className="dataGrid"
    rows={props.rows}
    columns={[...props.columns, actionColumn]}
    initialState={{
     pagination: {
      paginationModel: {
       pageSize: 10,
      },
     },
    }}
    slots={{ toolbar: GridToolbar }}
    slotProps={{
     toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
     },
    }}
    pageSizeOptions={[5]}
    checkboxSelection
    disableRowSelectionOnClick
    disableColumnFilter
    disableDensitySelector
    disableColumnSelector
   />
  </div>
 );
};

export default DataTable;