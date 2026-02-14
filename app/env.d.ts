/// <reference types="vite/client" />

declare module "*?raw" {
  const content: string;
  export default content;
}

declare global {
  interface Window {
    closeModal?: () => void;
    closeReport?: () => void;
    deleteTask?: (id: string) => void;
    login?: () => void;
    logout?: () => void;
    openReport?: (id: string) => void;
    resetTimer?: () => void;
    setMode?: (mins: number, button: HTMLButtonElement, isBreak?: boolean) => void;
    signup?: () => void;
    toggleMode?: () => void;
    toggleTask?: (id: string, currentStatus: boolean) => void;
    toggleTheme?: () => void;
    toggleTimer?: () => void;
  }
}

export {};
