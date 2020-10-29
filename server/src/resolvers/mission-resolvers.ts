import { MissionResolvers, PatchSize } from "../generated/graphql";
import { TContext } from "./resolvers";

const Mission: MissionResolvers<TContext> = {
  missionPatch: (mission, { size } = { size: PatchSize.Large }) =>
    size === PatchSize.Small
      ? // @ts-ignore
        mission.missionPatchSmall
      : // @ts-ignore
        mission.missionPatchLarge
};

export default Mission;
