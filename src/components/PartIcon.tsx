import React from "react";
import { ReactComponent as BeastMouth } from "../assets/images/beast_mouth.svg";
import { ReactComponent as BugMouth } from "../assets/images/bug_mouth.svg";
import { ReactComponent as BirdMouth } from "../assets/images/bird_mouth.svg";
import { ReactComponent as PlantMouth } from "../assets/images/plant_mouth.svg";
import { ReactComponent as AquaticMouth } from "../assets/images/aquatic_mouth.svg";
import { ReactComponent as ReptileMouth } from "../assets/images/reptile_mouth.svg";
import { ReactComponent as BeastHorn } from "../assets/images/beast_horn.svg";
import { ReactComponent as BugHorn } from "../assets/images/bug_horn.svg";
import { ReactComponent as BirdHorn } from "../assets/images/bird_horn.svg";
import { ReactComponent as PlantHorn } from "../assets/images/plant_horn.svg";
import { ReactComponent as AquaticHorn } from "../assets/images/aquatic_horn.svg";
import { ReactComponent as ReptileHorn } from "../assets/images/reptile_horn.svg";
import { ReactComponent as BeastBack } from "../assets/images/beast_back.svg";
import { ReactComponent as BugBack } from "../assets/images/bug_back.svg";
import { ReactComponent as BirdBack } from "../assets/images/bird_back.svg";
import { ReactComponent as PlantBack } from "../assets/images/plant_back.svg";
import { ReactComponent as AquaticBack } from "../assets/images/aquatic_back.svg";
import { ReactComponent as ReptileBack } from "../assets/images/reptile_back.svg";
import { ReactComponent as BeastTail } from "../assets/images/beast_tail.svg";
import { ReactComponent as BugTail } from "../assets/images/bug_tail.svg";
import { ReactComponent as BirdTail } from "../assets/images/bird_tail.svg";
import { ReactComponent as PlantTail } from "../assets/images/plant_tail.svg";
import { ReactComponent as AquaticTail } from "../assets/images/aquatic_tail.svg";
import { ReactComponent as ReptileTail } from "../assets/images/reptile_tail.svg";

interface Props extends React.SVGProps<SVGSVGElement> {
  partClass: string;
  partName: string;
}

const MAP_PART_ICON: { [key: string]: React.FunctionComponent } = {
  beast_mouth: BeastMouth,
  bug_mouth: BugMouth,
  bird_mouth: BirdMouth,
  plant_mouth: PlantMouth,
  aquatic_mouth: AquaticMouth,
  reptile_mouth: ReptileMouth,
  beast_horn: BeastHorn,
  bug_horn: BugHorn,
  bird_horn: BirdHorn,
  plant_horn: PlantHorn,
  aquatic_horn: AquaticHorn,
  reptile_horn: ReptileHorn,
  beast_back: BeastBack,
  bug_back: BugBack,
  bird_back: BirdBack,
  plant_back: PlantBack,
  aquatic_back: AquaticBack,
  reptile_back: ReptileBack,
  beast_tail: BeastTail,
  bug_tail: BugTail,
  bird_tail: BirdTail,
  plant_tail: PlantTail,
  aquatic_tail: AquaticTail,
  reptile_tail: ReptileTail,
};
export const PartIcon: React.FunctionComponent<Props> = ({
  partClass,
  partName,
  ...rest
}) => {
  const key = `${partClass.toLowerCase()}_${partName}`;
  if (!MAP_PART_ICON[key]) {
    return null;
  }
  return React.createElement(MAP_PART_ICON[key], { ...rest }, null);
};
