import React, { useEffect, useState } from "react";
import { getNodeLatestData } from "src/redux/slices/nodeSlice";
import { useAppDispatch } from "src/redux/store/hooks";
import "./nodemarker.css";

interface NodeMarkerProps {
  nodeInfo: any;
}

const getLoRaLevel = (data: any) => {
  switch (data) {
    case "Extremely Low":
      return "text-[#006FFF]";
    case "Very Low":
      return "text-[#00ADFF]";
    case "Low":
      return "text-[#00D9F3]";
    case "Pretty Low":
      return "text-[#6CFACD]";
    case "Normal":
      return "text-success";
    case "Pretty High":
      return "text-warning";
    case "High":
      return "text-[#FF8C5E]";
    case "Very High":
      return "text-[#B50000]";
    case "Extremely High":
      return "text-[#FF0000]";
      // return "text-danger";
      break;
  }
};

const NodeMarker: React.FC<NodeMarkerProps> = (props) => {
  const { nodeInfo } = props;
  const [isDivVisible, setDivVisible] = useState(false);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [light, setLight] = useState<number | null>(null);
  const [smoke, setSmoke] = useState<number | null>(null);
  const [temperatureLevel, setTemperatureLevel] = useState("");
  const [humidityLevel, setHumidityLevel] = useState("");
  const [lightLevel, setLightLevel] = useState("");
  const [smokeLevel, setSmokeLevel] = useState("");
  const dispatch = useAppDispatch();
  const handleMarkerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const marker = event.currentTarget;
    marker.classList.toggle("highlight");
    setDivVisible(!isDivVisible);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isDivVisible) {
      const fetchData = async () => {
        dispatch(getNodeLatestData(nodeInfo.id)).then((res: any) => {
          const latestData = res.payload;
          setTemperature(latestData.temperature);
          setTemperatureLevel(latestData.temperatureLevel);
          setHumidity(latestData.humidity);
          setHumidityLevel(latestData.humidityLevel);
          setLight(latestData.light);
          setLightLevel(latestData.lightLevel);
          setSmoke(latestData.smoke);
          setSmokeLevel(latestData.smokeLevel);
        });
      };
      fetchData();
      intervalId = setInterval(fetchData, 5000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isDivVisible]);

  return (
    <>
      <div className={`marker`} onClick={handleMarkerClick}>
        <h2 className="text-t3">{nodeInfo.nodeCode}</h2>
        {isDivVisible && (
          <div>
            {temperature !== null && (
              <h1 className="text-t2">Temperature: <span className={`${getLoRaLevel(temperatureLevel)}`}>{temperature} {temperatureLevel}</span></h1>
            )}
            {smoke !== null && (
              <h1 className="text-t2">Humidity: <span className={`${getLoRaLevel(humidityLevel)}`}>{humidity} {humidityLevel}</span></h1>
            )}
            {humidity !== null && (
              <h1 className="text-t2">Light: <span className={`${getLoRaLevel(lightLevel)}`}>{light} {lightLevel}</span></h1>
            )}
            {light !== null && (
              <h1 className="text-t2">Smoke: <span className={`${getLoRaLevel(smokeLevel)}`}>{smoke} {smokeLevel}</span></h1>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default NodeMarker;
