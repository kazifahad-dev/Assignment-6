"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export const MAX_PLAN = 5;

const STORAGE_KEY = "fitlog-state-v1"; 
const CHANGE_EVENT = "fitlog-change"; 


type StoredState = {
  plan: number[];
  saved: number[];
  done: number[];
};

export type AddToPlanResult = "added" | "exists" | "full";
export type AddToSavedResult = "added" | "exists";

type PlanContextValue = StoredState & {
  addToPlan: (id: number) => AddToPlanResult;
  addToSaved: (id: number) => AddToSavedResult;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
};

const EMPTY: StoredState = { plan: [], saved: [], done: [] };

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback); 
  window.addEventListener(CHANGE_EVENT, callback); 
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}


function getSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return ""; 
  }
}

function getServerSnapshot(): string {
  return "";
}

function parse(raw: string): StoredState {
  if (!raw) return EMPTY;
  try {
    const data = JSON.parse(raw);
    return {
      plan: data.plan ?? [],
      saved: data.saved ?? [],
      done: data.done ?? [],
    };
  } catch {
    return EMPTY; 
  }
}

function save(next: StoredState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}



const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const state = useMemo(() => parse(raw), [raw]);
  const { plan, saved, done } = state;

  const addToPlan = (id: number): AddToPlanResult => {
    if (plan.includes(id)) return "exists";
    if (plan.length >= MAX_PLAN) return "full";
    save({ ...state, plan: [...plan, id] });
    return "added";
  };

  const addToSaved = (id: number): AddToSavedResult => {
    if (saved.includes(id)) return "exists";
    save({ ...state, saved: [...saved, id] });
    return "added";
  };

  const removeFromPlan = (id: number) => {
    save({
      ...state,
      plan: plan.filter((x) => x !== id),
      done: done.filter((x) => x !== id),
    });
  };

  const removeFromSaved = (id: number) => {
    save({ ...state, saved: saved.filter((x) => x !== id) });
  };

  const markDone = (id: number) => {
    if (!done.includes(id)) save({ ...state, done: [...done, id] });
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        done,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan(): PlanContextValue {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used inside <PlanProvider>");
  return context;
}