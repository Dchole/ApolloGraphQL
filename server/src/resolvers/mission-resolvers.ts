import { MissionResolvers, PatchSize } from "../generated/graphql";
import { TContext } from "./resolvers";

const Mission: MissionResolvers<TContext> = {
  missionPatch: (mission, { size } = { size: PatchSize.Large }) =>
    size === PatchSize.Large
      ? // @ts-ignore
        mission.missionPatchLarge
      : // @ts-ignore
        mission.missionPatchSmall
};

export default Mission;
