/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import defaultValue from 'src/utils/default';
import TableLoading from 'src/share/loading/TableLoading';
import NoRowData from 'src/share/components/NoRowData';

import avatar from 'src/assets/images/avatar.svg';
import disable from 'src/assets/images/disable.svg';
import enable from 'src/assets/images/enable.svg';

interface Props {
  handleOpenEdit: (data: any) => void;
  handleOpenDelete: (data: any) => void;
  loading: boolean;
  rowData: any[];
}

// ** check user role
const getUserRole = (role: string) => {
  switch (role) {
    case 'ADMIN':
      return <p className="min-w-[70px] text-center text-primary px-3 py-1 rounded-full text-t3 bg-[#F3F4F6]">Admin</p>;
    case 'STAFF':
      return (
        <p className="min-w-[70px] text-center text-secondary px-3 py-1 rounded-full text-t3 bg-[#F3F4F6]">Staff</p>
      );
    case 'USER':
      return <p className="min-w-[70px] text-center text-black px-3 py-1 rounded-full text-t3 bg-[#F3F4F6]">User</p>;
    default:
      break;
  }
};

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 100,
    flex: 1,
    renderCell: (params: any) => (
      <div className="flex items-center gap-5">
        <img className="rounded-full h-[30px] w-[30vpx] object-cover" src={params.row.picture || avatar} />
        <p className="font-bold">{params.row.name}</p>
      </div>
    ),
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 150,
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    flex: 1,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 150,
    flex: 1,
    renderCell: (params: any) => getUserRole(params.row.role),
  },
  {
    field: 'isDeleted',
    headerName: 'Status',
    width: 150,
    // flex: 1,
    renderCell: (params: any) => (
      <div className={`cellWithStatus ${params.row.isDeleted}`}>
        {params.row.isDeleted === false ? (
          <p className="text-white px-3 rounded-full min-w-[90px] text-center text-[14px] bg-success-600">ACTIVE</p>
        ) : (
          <p className="text-white px-3 rounded-full min-w-[90px] text-center text-[14px] bg-danger-600">INACTIVE</p>
        )}
      </div>
      // <div className={`cellWithStatus ${params.row.status}`}>
      //   {params.row.status === true ? (
      //     <div className="flex items-center gap-3">
      //       <div className="bg-success rounded-full w-2 h-2" />
      //       <p className="text-[14px]">Active</p>
      //     </div>
      //   ) : (
      //     <div className="flex items-center gap-3">
      //       <div className="bg-danger rounded-full w-2 h-2" />
      //       <p className="text-[14px]">Inactive</p>
      //     </div>
      //   )}
      // </div>
    ),
  },
];

const DataTable: React.FC<Props> = (props) => {
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 80,
      renderCell: (params: any) => (
        <div className="cellAction">
          <Tooltip title={params.row.isDeleted == false ? 'Disable' : 'Enable'} placement="right">
            <IconButton onClick={() => props.handleOpenDelete(params.row)} aria-label="remove">
              {params.row.isDeleted == false ? (
                <img src={disable} className="object-contain w-[24px] h-[24px]" />
              ) : (
                <img src={enable} className="object-contain w-[24px] h-[24px]" />
              )}
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <div className="h-[75vh] bg-white">
      <DataGrid
        rows={props.rowData}
        columns={columns.concat(actionColumn)}
        pageSize={defaultValue.pageSize}
        rowsPerPageOptions={[defaultValue.pageSize]}
        className="datagrid"
        getRowId={(row: any) => row.id}
        // loading={props?.loading}
        loading={false}
        components={{
          LoadingOverlay: TableLoading,
          NoRowsOverlay: NoRowData,
        }}
        onRowClick={(params) => props.handleOpenEdit(params.row)}
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 700,
          },
        }}
      />
    </div>
  );
};

export default DataTable;
