import water from 'src/assets/images/Water.svg';
import dust from 'src/assets/images/Dust.svg';
import temp from 'src/assets/images/temperature.svg';
import humidity from 'src/assets/images/humidity_mid.svg';

import { LoRaTypeProps } from 'src/utils/interface';

const data = {
  id: 'adadad',
  unit: 'dp',
  value: 9.1,
  level: 'High',
};

const LoRaType: React.FC<LoRaTypeProps> = (props) => {
  const { unit, level, value, setLoRaUnit } = props;

  // ** get lora type data
  const getLoRaLevel = (data: any) => {
    switch (data) {
      case 'High':
        return 'text-danger';
      case 'Pretty High':
        return 'text-warning';
      case 'Normal':
        return 'text-success';
      default:
        break;
    }
  };

  // ** get icon src
  const getLoRaIcon = (data: any) => {
    switch (data) {
      case 'dp':
        return water;
      case 'mg':
        return dust;
      case 'Celsius':
        return temp;
      case 'Grams of water':
        return humidity;
      default:
        break;
    }
  };

  return (
    <div
      onClick={() => setLoRaUnit(unit)}
      className="min-w-[200px] min-h-[200px] border-[#B4BECF] border bg-white p-4 rounded cursor-pointer transition hover:bg-gray-100"
    >
      <div className="flex justify-between">
        {/* number */}
        <p className={`text-[60px] leading-[90px] ${getLoRaLevel(level)}`}>{value}</p>
        {/* icon descripe */}
        <img src={getLoRaIcon(unit)} className="object-contain" />
      </div>

      <p className="text-[#323743E5] text-t3">Unit: {unit}</p>
      <p className="text-[#323743] text-t4">
        Level: <span className={`${getLoRaLevel(level)} font-semibold`}>{level}</span>
      </p>
    </div>
  );
};

export default LoRaType;
