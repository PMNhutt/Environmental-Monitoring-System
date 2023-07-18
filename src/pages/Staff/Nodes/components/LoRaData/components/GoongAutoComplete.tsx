import { useEffect, useState } from 'react';
import useDebounce from 'src/share/hooks/useDebounce';
import { goong } from 'src/utils/plugins/axios';

import { useDispatch } from 'react-redux';

const GoongAutoComplete = (props: any) => {
  const { bounds, setMapAddress, setLocation, mapAddressError, initSearchValue } = props;

  const dispatch = useDispatch();
  const HCMLocation = '10.75, 106.67';
  const [searchValue, setSearchValue] = useState(initSearchValue ? initSearchValue : '');
  const [predictions, setPredictions] = useState([]);
  const searchDebounce = useDebounce(searchValue, 400);
  const [allowSearch, setAllowSearch] = useState(false);

  const handleInput = (e: any) => {
    setSearchValue(e.target.value);
    setAllowSearch(true);
  };

  const handleSelect = async (id: any) => {
    const res = await goong.get('/Place/Detail', {
      params: {
        place_id: id,
        api_key: import.meta.env.VITE_MAP_API,
      },
    });
    if (res.data.status == 'OK') {
      console.log(res.data.result);
      setSearchValue(res.data.result.formatted_address);
      setAllowSearch(false);
      setPredictions([]);
      const suggestAddress = res.data.result.formatted_address;
      setMapAddress(suggestAddress);
      setLocation(res.data.result.geometry.location);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await goong.get(`/Place/AutoComplete`, {
        params: {
          api_key: import.meta.env.VITE_MAP_API,
          location: HCMLocation,
          more_compound: true,
          input: searchDebounce,
        },
      });
      if (res.data.status == 'OK') {
        setPredictions(res.data.predictions);
      } else {
        setPredictions([]);
      }
    };

    if (allowSearch) {
      fetch();
    }
  }, [searchDebounce, allowSearch]);

  return (
    <div className="relative">
      <input
        onBlur={() => {
          setSearchValue('');
          setMapAddress('');
        }}
        value={searchValue}
        onChange={handleInput}
        className={`block w-full h-[36px] mb-[10px]
        p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
      />
      {predictions?.length > 0 && (
        <ul className="bg-white shadow-md absolute z-20 w-full top-12 rounded-[5px]">
          {predictions?.map((item: any) => (
            <li
              className="py-2 px-3 hover:bg-gray-100 cursor-pointer"
              key={item.place_id}
              onClick={() => handleSelect(item.place_id)}
            >
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoongAutoComplete;
