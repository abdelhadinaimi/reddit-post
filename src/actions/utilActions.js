export const OPEN_SETTINGS_MODAL = "OPEN_SETTINGS_MODAL";
export const CLOSE_SETTINGS_MODAL = "CLOSE_SETTINGS_MODAL";

export function openSettingsModal(){
  return {
      type: OPEN_SETTINGS_MODAL
    }
}
export function closeSettingsModal(){
  return {
      type: CLOSE_SETTINGS_MODAL
    }
}
