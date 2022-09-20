var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const link = `https://api.yourdictionary.com/wordfinder/v1/wordlist?contains=__TARGET__&limit=35&offset=0&order_by=score&interlink_type=contains&group_by=word_length&has_definition=check&suggest_links=true&dictionary=US`;
function search(link) {
    return new Promise((res) => __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(link);
        const json = yield response.json();
        res(json);
    }));
}
function searchContaining(link, target) {
    return __awaiter(this, void 0, void 0, function* () {
        const linkWithTarget = link.replace("__TARGET__", target);
        return yield search(linkWithTarget);
    });
}
function parseResponse(res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.data._groups;
    });
}
function getWordsOfLength(arr, wordLength) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(arr, wordLength);
        const ass = arr.findIndex((el) => el.word_length === wordLength);
        console.log(ass);
        // return arr[6]._items;
    });
}
function toRawWords(arr) {
    return __awaiter(this, void 0, void 0, function* () {
        return arr.join(" ");
    });
}
function getWords(target, wordLength) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const res = await searchContaining(link, target);
            // const groups = await parseResponse(res);
            // console.log(groups);
            // const words = getWordsOfLength(groups, wordLength);
            // console.log(words, wordLength);
            // // const rawWords = await toRawWords(words);
            // return groups;
            searchContaining(link, target)
                .then((res) => parseResponse(res))
                .then((groups) => getWordsOfLength(groups, wordLength))
                .then((ans) => ans);
        }
        catch (err) {
            return err;
        }
    });
}
export default getWords;
