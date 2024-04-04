"use client";

import styles from "./page.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { MissionComponent } from "@/components/MissionComponent";
import { Missions, missionArray } from "./state/missionTable";

export type MissionType =
  | "abductions"
  | "terror"
  | "research"
  | "scout"
  | "harvest"
  | "hunt"
  | "bomb"
  | "council"
  | "infiltrate";

export type Month =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

export type MissionStats = {
  potential: number;
  current: number;
};

type CampaignInfo = {
  year: number;
  month: Month;
  slingshotEnabled: boolean;
  alienResources: number;
  resourceLevel: number;
  alienResearch: number;
  threatLevel: number;
  threatIndex: number;
};

export type State = {
  campaignInfo: CampaignInfo;
  abductions: MissionStats;
  terror: MissionStats;
  research: MissionStats;
  scout: MissionStats;
  harvest: MissionStats;
  hunt: MissionStats;
  bomb: MissionStats;
  council: MissionStats;
  infiltrate: MissionStats;
  nextMonth: Missions;
  showPreview: "block" | "none";
  disableEditing: boolean;
  airgame: Airgame;
};

export interface Airgame {
  stance: Stance;
  singlePlasma: number;
  doublePlasma: number;
  fusionLance: number;
}

type Stance = "defensive" | "balanced" | "aggressive";

const defaultState: State = {
  campaignInfo: {
    year: 2016,
    month: "march",
    slingshotEnabled: false,
    alienResources: 0,
    resourceLevel: 0,
    alienResearch: 0,
    threatLevel: 0,
    threatIndex: 0,
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
  nextMonth: {
    abductions: 3,
    terror: 0,
    research: 0,
    scout: 3,
    harvest: 3,
    hunt: 0,
    bomb: 0,
    council: 1,
  },
  showPreview: "none",
  disableEditing: true,
  airgame: {
    stance: "defensive",
    singlePlasma: 18,
    doublePlasma: 25,
    fusionLance: 30,
  },
  infiltrate: {
    potential: 1,
    current: 0,
  },
};

const monthTable: Month[] = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const LOCAL_STORAGE_KEY = "longWarTrackerState";

export default function Home() {
  const [state, setState] = useState<State>(defaultState);

  const getStateFromStorage = () => {
    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    const asState: State = storedState ? JSON.parse(storedState) : defaultState;
    return asState;
  };

  useEffect(() => {
    setState(getStateFromStorage());
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

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

  const onChangeNextMonth = (
    event: ChangeEvent<HTMLInputElement>,
    id: "resources" | "threat"
  ) => {
    const value = Number(event.target.value);
    let resourceLevel = Math.floor(state.campaignInfo.alienResources / 50);
    let threatIndex = Math.floor(state.campaignInfo.threatLevel / 2);
    if (threatIndex > 4) {
      threatIndex = 4;
    }
    if (id === "resources") {
      state.campaignInfo.alienResources = value;
      resourceLevel = Math.floor(value / 50);
    } else {
      state.campaignInfo.threatLevel = value;
      threatIndex = Math.floor(value / 2);
    }
    if (resourceLevel > 4) {
      resourceLevel = 4;
    }
    if (threatIndex > 4) {
      threatIndex = 4;
    }
    state.campaignInfo.resourceLevel = resourceLevel;
    state.campaignInfo.threatIndex = threatIndex;
    const nextMonthMissions = missionArray[resourceLevel][threatIndex];
    state.nextMonth.abductions = nextMonthMissions.abductions;
    state.nextMonth.terror = nextMonthMissions.terror;
    state.nextMonth.research = nextMonthMissions.research;
    state.nextMonth.scout = nextMonthMissions.scout;
    state.nextMonth.harvest = nextMonthMissions.harvest;
    state.nextMonth.hunt = nextMonthMissions.hunt;
    state.nextMonth.bomb = nextMonthMissions.bomb;
    state.nextMonth.council = nextMonthMissions.council;
    setState(Object.assign({}, state));
  };

  const activateNextMonth = () => {
    const selectedMonth = state.campaignInfo.month;
    const nextIndex =
      monthTable.findIndex((month) => month === selectedMonth) + 1;
    if (nextIndex === monthTable.length) {
      if (state.campaignInfo.year < 2020) {
        state.campaignInfo.year = Number(state.campaignInfo.year) + 1;
      }
      state.campaignInfo.month = monthTable[0];
    } else {
      state.campaignInfo.month = monthTable[nextIndex];
    }
    let resourceLevel = Math.floor(state.campaignInfo.alienResources / 50);
    if (resourceLevel > 4) {
      resourceLevel = 4;
    }
    let threatIndex = Math.floor(state.campaignInfo.threatLevel / 2);
    if (threatIndex > 4) {
      threatIndex = 4;
    }

    state.campaignInfo.resourceLevel = resourceLevel;
    state.campaignInfo.threatIndex = threatIndex;

    // Reset current months missions
    state.abductions.current = 0;
    state.terror.current = 0;
    state.council.current = 0;
    state.scout.current = 0;
    state.hunt.current = 0;
    state.bomb.current = 0;
    state.research.current = 0;
    state.harvest.current = 0;

    // Next months missions
    const nextMonthMissions = missionArray[resourceLevel][threatIndex];
    state.abductions.potential = nextMonthMissions.abductions;
    state.terror.potential = nextMonthMissions.terror;
    state.research.potential = nextMonthMissions.research;
    state.scout.potential = nextMonthMissions.scout;
    state.harvest.potential = nextMonthMissions.harvest;
    state.hunt.potential = nextMonthMissions.hunt;
    state.bomb.potential = nextMonthMissions.bomb;
    state.council.potential = nextMonthMissions.council;
    if (isSpecialCouncilMonth(state.campaignInfo.month)) {
      state.council.potential = 2;
    }
    setState(Object.assign({}, state));
  };

  const isSpecialCouncilMonth = (month: string) =>
    ["may", "june", "july"].includes(month) && state.campaignInfo.year === 2016;

  const onChange = (event: ChangeEvent<HTMLInputElement>, id: MissionType) => {
    state[id].current = Number(event.target.value);
    setState(Object.assign({}, state));
  };

  const onChangePotential = (
    event: ChangeEvent<HTMLInputElement>,
    id: MissionType
  ) => {
    state[id].potential = Number(event.target.value);
    setState(Object.assign({}, state));
  };

  const onClickSlingshot = () => {
    if (state.campaignInfo.slingshotEnabled) {
      state.campaignInfo.slingshotEnabled = false;
      state.council.potential = 1;
      console.log("yo");
    } else {
      if (
        state.campaignInfo.month === "may" ||
        state.campaignInfo.month === "june" ||
        state.campaignInfo.month === "july"
      ) {
        state.council.potential = 2;
      }
      console.log("hello");
      state.campaignInfo.slingshotEnabled = true;
    }
    console.log("state.camp", state.campaignInfo.slingshotEnabled);
    setState(Object.assign({}, state));
  };

  const setHitChance = (stance: Stance) => {
    const baseValues = {
      defensive: {
        singlePlasma: 18,
        doublePlasma: 25,
        fusionLance: 30,
      },
      balanced: {
        singlePlasma: 33,
        doublePlasma: 40,
        fusionLance: 45,
      },
      aggressive: {
        singlePlasma: 48,
        doublePlasma: 55,
        fusionLance: 60,
      },
    };
    const increases = Math.floor(state.campaignInfo.alienResearch / 30) * 2;
    console.log("increases", increases);
    state.airgame.stance = stance;
    state.airgame.singlePlasma = checkForMaxHitChance(
      baseValues[stance].singlePlasma + increases
    );
    state.airgame.doublePlasma = checkForMaxHitChance(
      baseValues[stance].doublePlasma + increases
    );
    state.airgame.fusionLance = checkForMaxHitChance(
      baseValues[stance].fusionLance + increases
    );
    setState(Object.assign({}, state));
  };

  const checkForMaxHitChance = (hitChance: number) => {
    return hitChance > 95 ? 95 : hitChance;
  };

  return (
    <main className={styles.main}>
      <header>
        <h1>Long War Tracker</h1>
      </header>
      <div className={styles.missionTable}>
        <div className={styles.headerEdit}>
          <h2>Ground missions</h2>
          <div
            onClick={() => {
              state.disableEditing = !state.disableEditing;
              setState(Object.assign({}, state));
            }}
          ></div>
        </div>
        <div className={styles.grid}>
          <span>Type</span>
          <span className={styles.iconRow}>
            Potential
            <img
              src="/pencil.svg"
              className={styles.pencilIcon}
              onClick={() => {
                state.disableEditing = !state.disableEditing;
                setState(Object.assign({}, state));
              }}
            />
          </span>
          <span className={styles.centerAlign}>Current</span>
          <span className={styles.endAlign}>Remaining</span>

          <MissionComponent
            id="abductions"
            label="Abductions"
            state={state}
            onChange={onChange}
            onChangePotential={onChangePotential}
            onClick={onClick}
          />

          <MissionComponent
            id="terror"
            label="Terror"
            state={state}
            onChange={onChange}
            onChangePotential={onChangePotential}
            onClick={onClick}
            month={state.campaignInfo.month}
          />

          <MissionComponent
            id="council"
            label="Council"
            state={state}
            onChange={onChange}
            onChangePotential={onChangePotential}
            onClick={onClick}
          />
        </div>
        <h2>Airgame</h2>
        <div className={styles.grid}>
          <MissionComponent
            id="scout"
            label="Scout"
            state={state}
            onChange={onChange}
            onChangePotential={onChangePotential}
            onClick={onClick}
          />

          <MissionComponent
            id="hunt"
            label="Hunt"
            state={state}
            onChange={onChange}
            onChangePotential={onChangePotential}
            onClick={onClick}
          />

          <MissionComponent
            id="bomb"
            label="Bomb"
            state={state}
            onChange={onChange}
            onChangePotential={onChangePotential}
            onClick={onClick}
          />

          <MissionComponent
            id="research"
            label="Research"
            state={state}
            onChange={onChange}
            onChangePotential={onChangePotential}
            onClick={onClick}
          />

          <MissionComponent
            id="harvest"
            label="Harvest"
            state={state}
            onChange={onChange}
            onChangePotential={onChangePotential}
            onClick={onClick}
          />

          {state.infiltrate ? (
            <MissionComponent
              id="infiltrate"
              label="Infiltrate"
              state={state}
              onChange={onChange}
              onChangePotential={onChangePotential}
              onClick={onClick}
            />
          ) : null}
        </div>
      </div>
      <div className={styles.flexCol}>
        <div className={styles.flexRow}>
          <div className={styles.campaignStats}>
            <div>
              <label htmlFor="research">Alien research</label>
              <input
                id="research"
                type="number"
                value={state.campaignInfo.alienResearch}
                onFocus={(event) => event.target.select()}
                onChange={(event) => {
                  state.campaignInfo.alienResearch = Number(event.target.value);
                  setState(Object.assign({}, state));
                  setHitChance(state.airgame.stance);
                }}
              />
            </div>
            <hr className={styles.hr} />
            <div>
              <label htmlFor="resources">Alien resources</label>
              <input
                id="resources"
                type="number"
                value={state.campaignInfo.alienResources}
                onChange={(event) => {
                  onChangeNextMonth(event, "resources");
                }}
                onFocus={(event) => event.target.select()}
              />
            </div>
            <div>
              <label htmlFor="threat">Threat level</label>
              <input
                id="threat"
                type="number"
                value={state.campaignInfo.threatLevel}
                onFocus={(event) => event.target.select()}
                onChange={(event) => {
                  onChangeNextMonth(event, "threat");
                }}
              />
            </div>
            <div className={styles.buttonRow}>
              <button
                onClick={() => {
                  if (state.showPreview === "none") {
                    state.showPreview = "block";
                  } else {
                    state.showPreview = "none";
                  }
                  setState(Object.assign({}, state));
                }}
                className={styles.secondaryButton}
              >
                Preview
              </button>
              <button onClick={activateNextMonth}>Activate next month</button>
            </div>
          </div>

          <div className={styles.campaignInfo}>
            <div>
              <label htmlFor="year">Year</label>
              <select
                value={state.campaignInfo.year}
                onChange={(event) => {
                  state.campaignInfo.year = Number(event.target.value);
                  setState(Object.assign({}, state));
                }}
              >
                <option value={2016}>2016</option>
                <option value={2017}>2017</option>
                <option value={2018}>2018</option>
                <option value={2019}>2019</option>
                <option value={2020}>2020+</option>
              </select>
            </div>
            <div>
              <label htmlFor="month">Month</label>
              <select
                id="month"
                value={state.campaignInfo.month}
                onChange={(event) => {
                  state.campaignInfo.month = event.target.value as Month;
                  if (isSpecialCouncilMonth(state.campaignInfo.month)) {
                    state.council.potential = 2;
                  } else {
                    state.council.potential = 1;
                  }
                  setState(Object.assign({}, state));
                }}
              >
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
            <div
              style={{ cursor: "pointer" }}
              className={styles.checkbox}
              onClick={onClickSlingshot}
            >
              <label htmlFor="slingshot" style={{ cursor: "pointer" }}>
                Slingshot DLC
              </label>
              <input
                type="checkbox"
                checked={state.campaignInfo.slingshotEnabled}
                style={{ cursor: "pointer" }}
                onChange={(event) => {
                  console.log("event", event.target.value);
                  if (event.target.value === "on") {
                    state.campaignInfo.slingshotEnabled = true;
                  } else {
                    state.campaignInfo.slingshotEnabled = false;
                  }
                  setState(Object.assign({}, state));
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <h2>Alien Research Milestones</h2>
          <ul>
            {state.campaignInfo.alienResearch > 270 ? (
              <>
                <li>Destroyer - Double plasma</li>
                <li>
                  Be more careful with Raiders in general at this point
                  <ul>
                    <li>
                      Crit can deal 50% of Interceptor HP (without Armored
                      Fighters)
                    </li>
                  </ul>
                </li>
              </>
            ) : null}
            {state.campaignInfo.alienResearch > 330 ? (
              <li>Fighter - Single plasma x 2</li>
            ) : null}
          </ul>
        </div>

        <div className={styles.airgameContainer}>
          <h2>UFO chance to hit you</h2>
          <div className={styles.stance}>
            <label htmlFor="stance">Stance</label>
            <select
              id="stance"
              value={state.airgame.stance}
              onChange={(event) => {
                const stance = event.target.value as Stance;
                setHitChance(stance);
              }}
            >
              <option value="defensive">Defensive</option>
              <option value="balanced">Balanced</option>
              <option value="aggressive">Aggressive</option>
            </select>
          </div>

          <div className={styles.airgame}>
            <div>
              <div>Single plasma</div>
              <div>{state.airgame.singlePlasma}%</div>
            </div>
            <div>
              <div>Double plasma</div>
              <div>{state.airgame.doublePlasma}%</div>
            </div>
            <div>
              <div>Fusion lance</div>
              <div>{state.airgame.fusionLance}%</div>
            </div>
          </div>
        </div>

        <div style={{ display: state.showPreview, width: "100%" }}>
          <h2>Next Month</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Type</th>
                <th style={{ textAlign: "right" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Abductions</td>
                <td>{state.nextMonth.abductions}</td>
              </tr>
              <tr>
                <td>Terror</td>
                <td>{state.nextMonth.terror}</td>
              </tr>
              <tr>
                <td>Research</td>
                <td>{state.nextMonth.research}</td>
              </tr>
              <tr>
                <td>Scout</td>
                <td>{state.nextMonth.scout}</td>
              </tr>
              <tr>
                <td>Harvest</td>
                <td>{state.nextMonth.harvest}</td>
              </tr>
              <tr>
                <td>Hunt</td>
                <td>{state.nextMonth.hunt}</td>
              </tr>
              <tr>
                <td>Bomb</td>
                <td>{state.nextMonth.bomb}</td>
              </tr>
              <tr>
                <td>Council</td>
                <td>{state.nextMonth.council}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
