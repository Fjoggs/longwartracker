import { MissionStats } from "@/app/page";
import styles from "./remainingComponent.module.scss";

type RemainingProps = {
  missionStats: MissionStats;
};

export const RemainingComponent = ({ missionStats }: RemainingProps) => {
  const remainingMissions = missionStats.potential - missionStats.current;
  const backgroundColor =
    remainingMissions <= 0
      ? "green"
      : remainingMissions === 0.5
      ? "yellow"
      : "transparent";

  const color = remainingMissions === 0.5 ? "black" : "white";
  return (
    <input
      style={{ backgroundColor, color }}
      className={styles.input}
      value={remainingMissions < 0 ? 0 : remainingMissions}
      disabled
    />
  );
};
