import React from 'react';

interface InfoTooltipProps {
  type: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = (props) => {
  const { type } = props;

  const getSensorLabel = (data: any) => {
    switch (data) {
      case 'HUMIDITY':
        return 'humidity';
      case 'LIGHT':
        return 'light';
      case 'TEMPERATURE':
        return 'temperature';
      case 'SMOKE':
        return 'Smoke';
      default:
        break;
    }
  };

  const getReq1Label = (type: any) => {
    switch (type) {
      case 'HUMIDITY':
        return 'High-humidity: ';
      case 'LIGHT':
        return 'High-light: ';
      case 'TEMPERATURE':
        return 'Warm-growth: ';
      default:
        break;
    }
  };

  const getReq2Label = (type: any) => {
    switch (type) {
      case 'HUMIDITY':
        return 'Moderate-humidity: ';
      case 'LIGHT':
        return 'Moderate-light: ';
      case 'TEMPERATURE':
        return 'Cool-growth: ';
      default:
        break;
    }
  };

  const getReq3Label = (type: any) => {
    switch (type) {
      case 'HUMIDITY':
        return 'Low-humidity: ';
      case 'LIGHT':
        return 'Low-light: ';
      case 'TEMPERATURE':
        return 'Intermediate-growth: ';
      default:
        break;
    }
  };

  return (
    <div className="p-2">
      {/* title */}
      {type !== 'SMOKE' && <p className="font-semibold text-t4">Recommended orchids {getSensorLabel(type)}:</p>}
      {/* body */}
      {type !== 'SMOKE' ? (
        <div className="mt-2">
          <div className="pb-2 border-b flex justify-between">
            <div>{getReq1Label(type)}</div>
            <div>
              <p>21 - 29 °C (day time)</p>
              <p>19 - 26 °C (night time)</p>
            </div>
          </div>
          <div className="pb-2 border-b flex justify-between">
            <div>{getReq2Label(type)}</div>
            <div>
              <p>21 - 29 °C (day time)</p>
              <p>19 - 26 °C (night time)</p>
            </div>
          </div>
          <div className="pb-2 flex justify-between">
            <div>{getReq3Label(type)}</div>
            <div>
              <p>21 - 29 °C (day time)</p>
              <p>19 - 26 °C (night time)</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          <p>
            Smoke quality should be in <span className="font-medium">100 - 500 AOQ</span>
          </p>
          <p>
            Too high <span className="font-medium">{`(> 500)`}</span> may cause fire
          </p>
          <p>
            Too low <span className="font-medium">{`(< 100)`}</span> may cause something
          </p>
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
