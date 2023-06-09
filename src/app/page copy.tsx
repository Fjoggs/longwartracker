"use client";

import { RemainingComponent } from "@/components/RemainingComponent";
import styles from "./page.module.scss";
import { ChangeEvent, useState } from "react";

type MissionType =
  | "abductions"
  | "terror"
  | "research"
  | "scout"
  | "harvest"
  | "hunt"
  | "bomb"
  | "council";

export type MissionStats = {
  potential: number;
  current: number;
};

type CampaignInfo = {
  year: number;
  month: string;
  alienResources: number;
  alienResearch: number;
  threatLevel: number;
};

type State = {
  campaignInfo: CampaignInfo;
  abductions: MissionStats;
  terror: MissionStats;
  research: MissionStats;
  scout: MissionStats;
  harvest: MissionStats;
  hunt: MissionStats;
  bomb: MissionStats;
  council: MissionStats;
};

const defaultState: State = {
  campaignInfo: {
    year: 2016,
    month: "march",
    alienResources: 0,
    alienResearch: 0,
    threatLevel: 0,
  },
  abductions: {
    potential: 3.5,
    current: 0,
  },
  terror: {
    potential: 0,
    current: 0,
  },
  research: {
    potential: 3,
    current: 0,
  },
  scout: {
    potential: 3,
    current: 0,
  },
  harvest: {
    potential: 3,
    current: 0,
  },
  hunt: {
    potential: 0,
    current: 0,
  },
  bomb: {
    potential: 0,
    current: 0,
  },
  council: {
    potential: 1,
    current: 0,
  },
};

export default function Home() {
  const [state, setState] = useState<State>(defaultState);

  const onClick = (operation: "add" | "sub", id: MissionType) => {
    switch (operation) {
      case "add":
        const newValue = state[id].current + 1;
        state[id].current = newValue;
        setState(Object.assign({}, state));
        break;
      case "sub":
        if (state[id].current < 2) {
          state[id].current = 0;
          setState(Object.assign({}, state));
        } else {
          const newValue = state[id].current - 1;
          state[id].current = newValue;
          setState(Object.assign({}, state));
        }
      default:
        break;
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>, id: MissionType) => {
    state[id].current = Number(event.target.value);
    setState(Object.assign({}, state));
  };

  return (
    <main className={styles.main}>
      <div className={styles.flexRow}>
        <div className={styles.campaignInfo}>
          <h2>Campaign stats</h2>
          <div>
            <label htmlFor="year">Current year</label>
            <select value={state.campaignInfo.year}>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020+">2020+</option>
            </select>
          </div>
          <div>
            <label htmlFor="month">Current month</label>
            <select id="month" value={state.campaignInfo.month}>
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="july">July</option>
              <option value="august">August</option>
              <option value="september">September</option>
              <option value="october">October</option>
              <option value="november">November</option>
              <option value="december">December</option>
            </select>
          </div>
          <div>
            <label htmlFor="resources">Alien resources</label>
            <input
              id="resources"
              type="text"
              value={state.campaignInfo.alienResources}
            />
          </div>
          <div>
            <span>Resource level</span>
            <span>2</span>
          </div>
          <div>
            <span>Meld reward</span>
            <span>5</span>
          </div>
          <div>
            <label htmlFor="research">Alien research</label>
            <input
              id="research"
              type="text"
              value={state.campaignInfo.alienResearch}
            />
          </div>
          <div>
            <label htmlFor="threat">Threat level</label>
            <input
              id="threat"
              type="text"
              value={state.campaignInfo.threatLevel}
            />
          </div>
        </div>
        <div>
          <h2>Mission table next month</h2>
          <table>
            <thead>
              <td>Type</td>
              <td>Amount</td>
            </thead>
            <tbody>
              <tr>
                <td>Abductions</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Terror</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Research</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Scout</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Harvest</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Hunt</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Bomb</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Council</td>
                <td>3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2>Mission Table</h2>
        <div className={styles.grid}>
          <span>Type</span>
          <span>Potential</span>
          <span>Current</span>
          <span>Remaining</span>

          <label htmlFor="abductions">Abductions</label>
          <span>{state.abductions.potential}</span>
          <div className={styles.inputRow}>
            <button onClick={() => onClick("add", "abductions")}>+</button>
            <input
              id="abductions"
              type="number"
              value={state["abductions"].current}
              onChange={(event) => onChange(event, "abductions")}
            />
            <button onClick={() => onClick("sub", "abductions")}>-</button>
          </div>
          <RemainingComponent missionStats={state.abductions} />

          <label htmlFor="terror">Terror</label>
          <span>{state.terror.potential}</span>
          <div className={styles.inputRow}>
            <button onClick={() => onClick("add", "terror")}>+</button>
            <input
              id="terror"
              type="number"
              value={state.terror.current}
              onChange={(event) => onChange(event, "terror")}
            />
            <button onClick={() => onClick("sub", "terror")}>-</button>
          </div>
          <RemainingComponent missionStats={state.terror} />

          <label htmlFor="research">Research</label>
          <span>{state.research.potential}</span>
          <div className={styles.inputRow}>
            <button onClick={() => onClick("add", "research")}>+</button>
            <input
              id="research"
              type="number"
              value={state.research.current}
              onChange={(event) => onChange(event, "research")}
            />
            <button onClick={() => onClick("sub", "research")}>-</button>
          </div>
          <RemainingComponent missionStats={state.research} />

          <label htmlFor="scout">Scout</label>
          <span>{state.scout.potential}</span>
          <div className={styles.inputRow}>
            <button onClick={() => onClick("add", "scout")}>+</button>
            <input
              id="scout"
              type="number"
              value={state.scout.current}
              onChange={(event) => onChange(event, "scout")}
            />
            <button onClick={() => onClick("sub", "scout")}>-</button>
          </div>
          <RemainingComponent missionStats={state.scout} />

          <label htmlFor="harvest">Harvest</label>
          <span>{state.harvest.potential}</span>
          <div className={styles.inputRow}>
            <button onClick={() => onClick("add", "harvest")}>+</button>
            <input
              id="harvest"
              type="number"
              value={state.harvest.current}
              onChange={(event) => onChange(event, "harvest")}
            />
            <button onClick={() => onClick("sub", "harvest")}>-</button>
          </div>
          <RemainingComponent missionStats={state.harvest} />

          <label htmlFor="hunt">Hunt</label>
          <span>{state.hunt.potential}</span>
          <div className={styles.inputRow}>
            <button onClick={() => onClick("add", "hunt")}>+</button>
            <input
              id="hunt"
              type="number"
              value={state.hunt.current}
              onChange={(event) => onChange(event, "hunt")}
            />
            <button onClick={() => onClick("sub", "hunt")}>-</button>
          </div>
          <RemainingComponent missionStats={state.hunt} />

          <label htmlFor="bomb">Bomb</label>
          <span>{state.bomb.potential}</span>
          <div className={styles.inputRow}>
            <button onClick={() => onClick("add", "bomb")}>+</button>
            <input
              id="bomb"
              type="number"
              value={state.bomb.current}
              onChange={(event) => onChange(event, "bomb")}
            />
            <button onClick={() => onClick("sub", "bomb")}>-</button>
          </div>
          <RemainingComponent missionStats={state.bomb} />

          <label htmlFor="council">Council</label>
          <span>{state.council.potential}</span>
          <div className={styles.inputRow}>
            <button onClick={() => onClick("add", "council")}>+</button>
            <input
              id="council"
              type="number"
              value={state.council.current}
              onChange={(event) => onChange(event, "council")}
            />
            <button onClick={() => onClick("sub", "council")}>-</button>
          </div>
          <RemainingComponent missionStats={state.council} />
        </div>
      </div>
    </main>
  );
}
