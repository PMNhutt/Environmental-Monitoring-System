import ReactMapGL, { FullscreenControl, Marker, NavigationControl } from '@goongmaps/goong-map-react';
import { Modal } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
// assest
import '@goongmaps/goong-js/dist/goong-js.css';
import { getNodeLocations } from 'src/redux/slices/nodeSlice';
import { useAppDispatch } from 'src/redux/store/hooks';
import NodeMarker from './NodeMarker';
// import NodeMarker from './NodeMarker';

interface CreateModalProps {
  openMapModal: boolean;
  setOpenMapModal: any;
}

const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: '10px'
};

const navStyle = {
  top: 72,
  left: 0,
  padding: '10px'
};

const CreateModal: React.FC<CreateModalProps> = (props) => {
  const { openMapModal, setOpenMapModal } = props;
  const [nodeData, setNodeData] = useState([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getNodeLocations()).then((res: any) => {
      const nodeList = res.payload;
      setNodeData(nodeList);
    });
  }, []);

  const [viewport, setViewport] = useState({
    longitude: 106.70105355500004,
    latitude: 10.776553100000058,
    zoom: 11,
  });

  const markers = useMemo(
    () =>
      nodeData.map((node: any) => (
        <Marker
          offsetLeft={-20}
          offsetTop={-10}
          key={node.name}
          longitude={node.longitude}
          latitude={node.latitude}>
          {/* <img src={pin} className="w-[50px]" /> */}
          <NodeMarker nodeInfo={node} />
        </Marker>
      )),
    [nodeData],
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
              height="500px"
              onViewportChange={setViewport}
              goongApiAccessToken={import.meta.env.VITE_TILESMAP_API}
            >
              {markers}
              <FullscreenControl style={fullscreenControlStyle} />
              <NavigationControl style={navStyle} />
            </ReactMapGL>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateModal;
