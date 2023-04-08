export interface IGearInteractor {
  setGearPosition: (set: boolean) => void;
  updateGearPosition: () => void;
}

export class NullGearInteractor implements IGearInteractor {
  setGearPosition = (set: boolean) => {};
  updateGearPosition = () => {};
}
