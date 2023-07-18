import ReactMapGL, { Marker } from '@goongmaps/goong-map-react';
import { Modal } from '@mui/material';
import { useMemo, useState } from 'react';
import pin from 'src/assets/images/pin.png';
// assest
import '@goongmaps/goong-js/dist/goong-js.css';

interface CreateModalProps {
  openMapModal: boolean;
  setOpenMapModal: any;
}

const CreateModal: React.FC<CreateModalProps> = (props) => {
  const { openMapModal, setOpenMapModal } = props;
  const [data, setData] = useState([
    {
      name: 'place 1',
      longitude: 106.6525115,
      latitude: 10.7596269,
    },
    {
      name: 'place 2',
      longitude: 106.63426645500004,
      latitude: 10.769253775000038,
    },
    {
      name: 'place 3',
      longitude: 106.66048396400004,
      latitude: 10.835563540000066,
    },
    {
      name: 'place 4',
      longitude: 106.63531267900004,
      latitude: 10.749946617000035,
    },
  ]);

  const [viewport, setViewport] = useState({
    longitude: 106.70105355500004,
    latitude: 10.776553100000058,
    zoom: 11,
  });

  const markers = useMemo(
    () =>
      data.map((city) => (
        <Marker key={city.name} longitude={city.longitude} latitude={city.latitude}>
          <img src={pin} className="w-[50px]" />
        </Marker>
      )),
    [data],
  );

  return (
    <Modal open={openMapModal} onClose={() => setOpenMapModal(false)}>
      <div
        className="fixed left-[50%]
  top-[50%] translate-y-[-50%] translate-x-[-50%] sm:w-[1000px] w-full bg-white rounded-[4px] py-4 font-poppins"
      >
        {/* header */}
        <div className="px-[25px] pb-4 border-b border-b-[#F3F4F6] text-t7 font-medium">
          Node Map
        </div>
        {/* body */}
        <div className="px-[25px] my-3 h-[500px]">
          <div className="border border-[#333333]">
            <ReactMapGL
              {...viewport}
              width="948px"
              height="400px"
              onViewportChange={setViewport}
              goongApiAccessToken={import.meta.env.VITE_TILESMAP_API}
            >
              {markers}
            </ReactMapGL>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateModal;
