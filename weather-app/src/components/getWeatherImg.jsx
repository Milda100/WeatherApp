export default function getWeatherImg(condition) {
  const imgMap = {
  Clear: "clear.svg",
  Clouds: "cloudy.svg",
  Rain: "rain.svg",
  Snow: "snow.svg",
  Thunderstorm: "thunder.svg",
  Fog: "fog.svg",
  Drizzle: "drizzle.svg",
  Hail: "hail.svg",
  Haze: "haze.svg",
  NotAvailable: "not-available.svg"
};
  return `${process.env.PUBLIC_URL}/meteocons/${imgMap[condition] || "not-available.svg"}`;
}
