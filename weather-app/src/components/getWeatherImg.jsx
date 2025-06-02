import clearSky from "../assets/clear-sky.jpg";
import cloudy from "../assets/cloudy.jpg";
import rainy from "../assets/rain.2.jpg";
import snowy from "../assets/snow.jpg";
import thunderstorm from "../assets/thunder.jpg";

const imgMap = {
  Clear: clearSky,
  Clouds: cloudy,
  Rain: rainy,
  Snow: snowy,
  Thunderstorm: thunderstorm,
};

function getWeatherImg(condition) {
  return imgMap[condition] || cloudy;
}

export default getWeatherImg;