export const getPage = async(p) => {
  const url = `https://api.opensea.io/api/v1/assets?format=json&owner=0x960DE9907A2e2f5363646d48D7FB675Cd2892e91&limit=20&offset=${p}`;
  const resp = await fetch(url, {
    mode: 'cors',
  });
  if (!resp.ok) {
    return { error: resp };
  }
  const json = await resp.json();
  return {
    data: json.assets,
  };
};

export const getDetails = async({ contractAddress, tokenId }) => {
  const url = `https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}?format=json`;
  const resp = await fetch(url, {
    mode: 'cors',
  });
  if (!resp.ok) {
    return { error: resp };
  }
  const json = await resp.json();
  return {
    data: json,
  };
};
