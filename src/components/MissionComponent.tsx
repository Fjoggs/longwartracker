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
};

export const MissionComponent = ({
  id,
  label,
  state,
  onChange,
  onChangePotential,
  onClick,
}: InputComponentProps) => (
  <>
    <label htmlFor={id}>{label}</label>
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
