const MANIFEST_TON = import.meta.env.VITE_MANIFEST_TON || "https://hubaxis.github.io/web/turtle.json";
const REQUEST_TO_BALANCE =
  "https://testnet.toncenter.com/api/v2/getAddressBalance?address=";

export { MANIFEST_TON, REQUEST_TO_BALANCE };
