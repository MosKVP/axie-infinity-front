export interface CalculateRequest {
  axieParentID1: string;
  axieParentID2: string;
}
export interface CalculateResult {
  axieParent1: AxieParentDetail;
  axieParent2: AxieParentDetail;
  axieChildren: AxieChild[];
}
export interface AxieParentDetail {
  breedCount: number;
  currentPrice: number | null;
  salePrice: number | null;
}
export interface AxieChild {
  chance: number;
  price: number | null;
  class: string;
  mouth: AxiePart;
  horn: AxiePart;
  back: AxiePart;
  tail: AxiePart;
}
export interface AxiePart {
  partID: string;
  class: string;
  name: string;
  chance: number;
}
