import { MissionType, State } from "@/app/page";
import styles from "./missionComponent.module.scss";
import { RemainingComponent } from "./RemainingComponent";

export type InputComponentProps = {
  id: MissionType;
  label: string;
  state: State;
  onChange: Function;
  onChangePotential: Function;
  onClick: Function;
  month?: string;
};

const specialTerror = (label: string, month?: string) => {
  if (month === "june" && label === "Terror") {
    return "Terror (Zombie)";
  } else if (month === "october" && label === "Terror") {
    return "Terror (Queen Lid)";
  } else {
    return label;
  }
};

export const MissionComponent = ({
  id,
  label,
  state,
  onChange,
  onChangePotential,
  onClick,
  month,
}: InputComponentProps) => (
  <>
    <label htmlFor={id}>{specialTerror(label, month)}</label>
    <input
      value={state[id].potential}
      disabled={state.disableEditing}
      className={styles.potential}
      type="number"
      onChange={(event) => onChangePotential(event, id)}
      step={0.5}
    />
    <div className={styles.inputRow}>
      <button
        onClick={() => onClick("sub", id)}
        style={{ borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px" }}
      >
        -
      </button>
      <input
        id={id}
        type="number"
        value={state[id].current}
        onChange={(event) => onChange(event, id)}
        onFocus={(event) => event.target.select()}
        maxLength={1}
      />
      <button
        onClick={() => onClick("add", id)}
        style={{ borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }}
      >
        +
      </button>
    </div>
    <RemainingComponent missionStats={state[id]} />
  </>
);
