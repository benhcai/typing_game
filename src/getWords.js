const link = `https://api.yourdictionary.com/wordfinder/v1/wordlist?contains=__TARGET__&limit=35&offset=0&order_by=score&interlink_type=contains&group_by=word_length&has_definition=check&suggest_links=true&dictionary=US`;

function search(link) {
  return new Promise(async (res) => {
    const response = await fetch(link);
    const json = await response.json();
    res(json);
  });
}
async function searchContaining(link, target) {
  const linkWithTarget = link.replace("__TARGET__", target);
  return await search(linkWithTarget);
}

async function parseResponse(res) {
  return res.data._groups;
}

async function getWordsOfLength(arr, wordLength) {
  const words = arr.find((el) => el.word_length === Number(wordLength));
  return words._items;
}

async function toRawWords(arr) {
  return arr.join(" ");
}

async function getWords(target, wordLength) {
  try {
    const res = await searchContaining(link, target);
    const groups = await parseResponse(res);
    const words = await getWordsOfLength(groups, wordLength);
    const rawWords = await toRawWords(words);
    return rawWords;
  } catch (err) {
    return err;
  }
}

export default getWords;
