const link = `https://api.yourdictionary.com/wordfinder/v1/wordlist?contains=__TARGET__&limit=35&offset=0&order_by=score&interlink_type=contains&group_by=word_length&has_definition=check&suggest_links=true&dictionary=US`;

function search(link: string): Promise<any> {
  return new Promise(async (res) => {
    const response = await fetch(link);
    const json = await response.json();
    res(json);
  });
}

async function searchContaining(link: string, target: string) {
  const linkWithTarget = link.replace("__TARGET__", target);
  return await search(linkWithTarget);
}

type ResponseType = {
  data: {
    _groups: [];
    w;
  };
};

function parseResponse(res: ResponseType): [] {
  return res.data._groups;
}

function getWordsOfLength(arr: [], wordLength: number) {
  console.log(arr, wordLength);

  const ass = arr.findIndex((el) => el.word_length === Number(wordLength));
  console.log(ass);
  // return arr[6]._items;
}

function toRawWords(arr: []) {
  return arr.join(" ");
}

async function getWords(target: string, wordLength: number) {
  try {
    const res = await searchContaining(link, target);
    const groups = parseResponse(res);
    console.log(groups);
    const words = getWordsOfLength(groups, wordLength);
    console.log(words, wordLength);
    // const rawWords = await toRawWords(words);
    return groups;
  } catch (err) {
    return err;
  }
}

export default getWords;
