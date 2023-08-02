import { useEffect, useState } from 'react';
import map from 'src/assets/images/map.svg';
import plus from 'src/assets/images/plus_white.svg';
import Node from './components/Node';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CreateModal from './components/CreateModal';
import MapModal from './components/MapModal';

// ** redux
import { Autocomplete } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllLocationsVer2 } from 'src/redux/slices/loraDataSlice';
import { getNodes } from 'src/redux/slices/nodeSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/store/hooks';
import defaultValue from 'src/utils/default';
import { LocationProps, NodeProps } from 'src/utils/interface';

const defaultNoneOption =  {
  id: "",
  name: "All",
  address: "All",
  createdDate: "",
  latitude: 0,
  longitude: 0,
  updatedDate: "",
};

const LoRa = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const dispatch = useAppDispatch();
  const [activeDropdown, setActiveDropdown] = useState<any>(1);
  const [openModal, setOpenModal] = useState(false);
  const [openMapModal, setOpenMapModal] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [nodeList, setNodeList] = useState([]);
  const [options, setOptions] = useState<LocationProps[]>([defaultNoneOption]);
  // state to save node data
  const [editNodeData, setEditNodeData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reflectLocationId = searchParams.get("locationId");

  useEffect(() => {
    const params = {
      search: "",
    }
    dispatch(getAllLocationsVer2(params)).then((res: any) => {
      const locationOptionList = res.payload.data;
      setOptions(options.concat(locationOptionList));
    });
  }, []);

  const [defaultValueAuto, setDefaultValueAUto] = useState<LocationProps>(options[0]);

  useEffect(() => {
    if (reflectLocationId !== "") {
      const locationObject = options.find((option) => option.id === reflectLocationId);
      if (locationObject) {
        setDefaultValueAUto(locationObject);
      }
    } else {
      setDefaultValueAUto(defaultNoneOption);
    }
  }, [location, options]);

  useEffect(() => {
    const params = {
      sort: activeDropdown,
      locationId: reflectLocationId !== "" ? reflectLocationId : null
    }
    dispatch(getNodes(params)).then((res: any) => {
      setNodeList(res.payload.data);
    });
  }, [updateData, activeDropdown, location]);

  return (
    <>
      {openModal && (
        <CreateModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setUpdateData={setUpdateData}
          editData={editNodeData}
        />
      )}
      {openMapModal && (
        <MapModal
          openMapModal={openMapModal}
          setOpenMapModal={setOpenMapModal}
        />
      )}
      <div className="my-12 mx-14">
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-t7 font-semibold text-black">
              {currentUser.role === 'USER' ? 'Personal space' : 'Nodes list'}
            </h1>
            <p className="text-[#8792AB] text-t4">Node in Personal Space are only accessible to you</p>
          </div>

          <div className="flex">
            <button
              onClick={() => {
                setOpenMapModal(true);
              }}
              className="rounded-[6px] h-[36px] text-t3 bg-primary text-white font-medium py-1 px-3 flex items-center gap-2 pr-8 mr-2"
            >
              <img src={map} className="object-cover w-[20px] h-[20px]" />
              Map
            </button>
            <Autocomplete
              sx={{
                '& input': {
                  display: 'block',
                  width: '200px',
                  height: '36px',
                  marginBottom: '5px',
                  padding: '8px',
                  fontSize: '0.875rem',
                  lineHeight: '1.375rem',
                  fontFamily: 'Poppins',
                  borderRadius: '5px',
                  border: '1px solid #D9D9D9',
                  marginRight: '4px'
                },
              }}
              id="custom-input-demo"
              options={options}
              value={defaultValueAuto}
              defaultValue={options[0]}
              clearOnBlur={false}
              onChange={(_, newValue: LocationProps | null) => {
                searchParams.set('locationId', newValue ? newValue.id : '');
                navigate(`?${searchParams.toString()}`);
                // setSelectedLocation(newValue ? newValue.id : '');
              }}
              getOptionLabel={(option) => (option.name + " - " + option.address)}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input type="text"
                    {...params.inputProps} />
                </div>
              )}
            />
            <Select
              MenuProps={defaultValue.MenuProps}
              value={activeDropdown}
              onChange={(e) => setActiveDropdown(e.target.value)}
              className={`block w-full h-[36px] text-[#D9D9D9] text-t3  border rounded-[5px] focus:outline-primary`}
            >
              <MenuItem value={1}>Last created</MenuItem>
              <MenuItem value={0}>Oldest created</MenuItem>
            </Select>
          </div>
        </div>
        {/* body */}
        <div
          className={`flex xl:flex-row flex-col flex-wrap w-full gap-12 ${nodeList.length > 0 ? 'justify-left' : ''
            } `}
        >
          {currentUser.role == 'STAFF' && (
            <button
              onClick={() => {
                setOpenModal(true);
                setEditNodeData(undefined);
              }}
              className="rounded-[6px] transition hover:bg-[#F3F4F6] flex flex-col justify-center items-center w-full xl:w-[362px] min-h-[275px] border-2 border-dashed border-gray-300 text-t4 font-medium text-black"
            >
              <div className="rounded-full bg-primary w-[60px] h-[60px] mb-[24px] flex justify-center items-center">
                <img src={plus} className="object-cover w-[30px] h-[30px]" />
              </div>
              Create a new node
            </button>
          )}
          {nodeList.length > 0 ? (
            <>
              {nodeList.map((node: NodeProps) => (
                <div key={node.id}>
                  <Node
                    currentUser={currentUser}
                    nodeData={node}
                    setUpdateData={setUpdateData}
                    setEditNodeData={setEditNodeData}
                    setOpenEditModal={setOpenModal}
                  />
                </div>
              ))}
            </>
          ) : (
            <>
              {currentUser.role == 'USER' && (
                <p className="my-5 font-medium text-danger">
                  No nodes have been set up yet, Please reach out to our staff for assistance
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoRa;