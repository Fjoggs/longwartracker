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
      : "rgb(36,36,36)";

  const borderLeftColor =
    remainingMissions <= 0
      ? "green"
      : remainingMissions === 0.5
      ? "yellow"
      : "rgb(57, 75, 98)";

  const color = remainingMissions === 0.5 ? "black" : "white";
  return (
    <input
      style={{ backgroundColor, color, borderLeftColor }}
      className={styles.input}
      value={remainingMissions < 0 ? 0 : remainingMissions}
      disabled
    />
  );
};
