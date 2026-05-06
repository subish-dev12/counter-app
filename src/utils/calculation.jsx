export default getTime;

function getTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const timeFormat = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");
  const time = `${hours}:${minutes}:${seconds}${timeFormat}`;
  return time;
}
