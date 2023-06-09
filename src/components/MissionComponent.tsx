import { MissionType, State } from "@/app/page";
import styles from "../app/page.module.scss";
import { useRef } from "react";
import { RemainingComponent } from "./RemainingComponent";

export type InputComponentProps = {
  id: MissionType;
  label: string;
  state: State;
  onChange: Function;
};

export const MissionComponent = ({
  id,
  label,
  state,
  onChange,
}: InputComponentProps) => {
  const inputRef = useRef(null);

  const onClick = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <span>{state[id].potential}</span>
      <div className={styles.inputRow}>
        {/* <button onClick={() => onClick("add", "abductions")}>+</button> */}
        <input
          id={id}
          type="number"
          value={state[id].current}
          onChange={(event) => onChange(event, id)}
          onClick={onClick}
          ref={inputRef}
        />
        {/* <button onClick={() => onClick("sub", "abductions")}>-</button> */}
      </div>
      <RemainingComponent missionStats={state[id]} />
    </>
  );
};
