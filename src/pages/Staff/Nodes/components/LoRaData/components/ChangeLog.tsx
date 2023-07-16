
import Pagination from '@mui/material/Pagination';
import { AlertProps } from 'src/utils/interface';

interface ChangeLogProps {
  alertList: any;
}

const ChangeLog: React.FC<ChangeLogProps> = (props) => {
  const { alertList } = props;
  return (
    <div className="p-5 border-[#B4BECF] border bg-white rounded w-full">
      <p className="text-t7 font-semibold mb-3">Alert History</p>
      {alertList.length > 0 ? (
        <>
          {alertList.map((alert: AlertProps) => (
            <div key={alert.id}>
              <div className="rounded-[8px] shadow-sm border border-gray-300 py-2 px-4 my-3">
                <div className="pb-2 border-b">
                  <p className="">{alert.content}</p>
                </div>
                {/* time */}
                <div className="flex w-full justify-end">
                  <p className="font-medium text-gray-400 text-t3">{alert.createdDate}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <p className="my-5 font-medium text-danger">
            No alert has been record
          </p>
        </>
      )}
      <div className="w-full flex justify-end">
        <Pagination
          count={10}
          shape="rounded"
          sx={{
            '& .Mui-selected': {
              backgroundColor: '#535CE8 !important',
              color: 'white',
            },
          }}
        />
      </div>
    </div>
  );
};

export default ChangeLog;
