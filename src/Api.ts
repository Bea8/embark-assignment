import axios from "axios";

export interface IComic {
  data: {
    alt: string;
    day: string;
    img: string;
    link: string;
    month: string;
    news: string;
    num: number;
    safe_title: string;
    title: string;
    transcript: string;
    year: string;
  };
}

export async function getAllComicStrips(): Promise<IComic[]> {
  const { data } = await axios.get("https://xkcd.com/info.0.json");
  const lastStripNo = data.num - 2400;

  let result;
  let promises = [];

  for (let i = 1; i <= lastStripNo; i++) {
    try {
      promises.push(
        await axios.get<IComic>(`https://xkcd.com/${i}/info.0.json`)
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

  const fulfilled = resultFilter(result) as IComic[]; // all fulfilled results
  return fulfilled;
}
