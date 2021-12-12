import blankAxie from "./assets/images/blank_axie.png";

export function genAxiePicture(
  axieClass: string,
  mouth: string,
  horn: string,
  back: string,
  tail: string
): string {
  let base = "https://axie.zone/func/axiegenerator.php";
  let color = MAP_COLOR[axieClass];
  let eyes = MAP_EYES[axieClass];
  mouth = formatPartID(mouth);
  horn = formatPartID(horn);
  back = formatPartID(back);
  tail = formatPartID(tail);
  return `${base}?color=${color}&class=${axieClass.toLowerCase()}&eyes=${eyes}&mouth=${mouth}&horn=${horn}&back=${back}&tail=${tail}`;
}

function formatPartID(partID: string): string {
  let arr = partID.split("-");
  return arr.length <= 1 ? partID : arr.slice(1).join("_");
}

const MAP_COLOR: { [key: string]: string } = {
  Beast: "f0c66e",
  Bug: "ff6d61",
  Bird: "ff9ab8",
  Plant: "ccef5e",
  Aquatic: "2de8f2",
  Reptile: "fdbcff",
  Mech: "dae2e2",
  Dusk: "5cbfea",
  Dawn: "e1d8ff",
};

const MAP_EYES: { [key: string]: string } = {
  Beast: "chubby",
  Bug: "bookworm",
  Bird: "mavis",
  Plant: "papi",
  Aquatic: "clear",
  Reptile: "scar",
  Mech: "chubby",
  Dusk: "scar",
  Dawn: "mavis",
};

export function getAxiePictureFromID(id: string): string {
  return id
    ? `https://storage.googleapis.com/assets.axieinfinity.com/axies/${id}/axie/axie-full-transparent.png`
    : blankAxie;
}

const slpPerBreed = [900, 1350, 2250, 3600, 5850, 9450, 15300];

export function calculateTokenNeeded(breedCount1: number, breedCount2: number) {
  return { slp: slpPerBreed[breedCount1] + slpPerBreed[breedCount2], axs: 0.5 };
}

export function subtractMarketFee(price: number): number {
  return price * (1 - 0.0425);
}

export function displayETH(eth: number): string {
  return (
    "Ξ" +
    eth.toLocaleString(undefined, {
      maximumFractionDigits: 3,
    })
  );
}

export function displayUSD(usd: number): string {
  return (
    "$" +
    usd.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })
  );
}

export function getAxieMarketPlaceLink(id: string): string {
  return id ? `https://marketplace.axieinfinity.com/axie/${id}/` : "#";
}
