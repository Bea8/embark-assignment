import axios from "axios";

export async function getAllComicStrips() {
  const { data } = await axios.get("https://xkcd.com/info.0.json");
  const lastStripNo = data.num + 1;

  let result;
  let promises = [];

  for (let i = 1; i < lastStripNo; i++) {
    try {
      promises.push(
        await axios.get(`https://xkcd.com/${i}/info.0.json`, {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
      );
    } catch (error) {
      console.warn(error);
    }
  }
  result = await Promise.allSettled(promises);

  const resultFilter = (result: any, error?: any) =>
    result
      .filter(
        (promise: any) => promise.status === (!error ? "fulfilled" : "rejected")
      )
      .map((promise: any) => (!error ? promise.value : promise.reason));

  const fulfilled = resultFilter(result); // all fulfilled results
  return fulfilled;
}
