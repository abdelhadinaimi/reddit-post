export const TOGGLE_SOUND = 'TOGGLE_SOUND';
export const TOGGLE_NOTIFICATION = 'TOGGLE_NOTIFICATION';
export const CHANGE_DELAY = 'CHANGE_DELAY';
export const CALL_NOTIFICATION = 'CALL_NOTIFICATION';


export function toggleSound(){
  return {
    type : TOGGLE_SOUND
  }
}

export function toggleNotification(){
  return {
    type : TOGGLE_NOTIFICATION
  }
}

export function changeDelay(delay){
  return {
    type : CHANGE_DELAY,
    delay
  }
}

export function callNotification(message){
  return{
    type : CALL_NOTIFICATION,
    message
  }
}
