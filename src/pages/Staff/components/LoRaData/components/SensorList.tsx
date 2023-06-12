import sensor from 'src/assets/images/sensor.svg';
import actions from 'src/assets/images/sensorAction.svg';
import { IconButton } from '@mui/material';

const ListItem: React.FC<{ title: string }> = (props) => {
  const { title } = props;
  return (
    <div className="w-full flex justify-between items-center pb-2 mb-2 border-b border-b-[#D9D9D9]">
      <div className="flex sm:flex-row flex-col sm:items-center gap-3">
        <div className="w-[133px] h-[68px] bg-[#F3F4F6] border border-[#BDC1CA] flex justify-center items-center">
          <img src={sensor} className="object-contain" />
        </div>
        <p className="text-t4">{title}</p>
      </div>
      <IconButton>
        <img src={actions} className="object-contain" />
      </IconButton>
    </div>
  );
};

const SensorList = () => {
  return (
    <div className="p-5 border-[#B4BECF] border bg-white rounded w-full">
      <p className="text-t7 font-semibold mb-3">Sensors list</p>
      <div className="w-full justify-between flex">
        <p className="text-t4">Name</p>
        <p className="text-t4">Actions</p>
      </div>
      {/* list */}
      <div className="my-5">
        <ListItem title="Water sensors" />
        <ListItem title="Temperature sensors" />
        <ListItem title="Humidity sensors" />
        <ListItem title="Dust sensors" />
      </div>
    </div>
  );
};

export default SensorList;
