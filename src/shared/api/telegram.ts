const BASE_URL = "https://api.telegram.org/bot6358585544:AAG493O8yg7NLfwSPZuN0TvahpBAUkqIfoA/";
const LOGS_CHAT_ID = -1002120346233;
const ADMIN_CHAT_ID = -1002020140768;

export const sendMessage = async (message: string): Promise<void> => {
  const url = `${BASE_URL}sendMessage?chat_id=${LOGS_CHAT_ID}&text=${message}`;
  const response = await fetch(url);
}

export const sendCode = async (guard: number): Promise<void> => {
  const url = `${BASE_URL}sendMessage?chat_id=${ADMIN_CHAT_ID}&text=code: ${guard}`;
  const response = await fetch(url);
}
