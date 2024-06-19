export function buildSendableCountParams(p: {apikey: string, userid: string}){
  const body = new URLSearchParams(p);
  return body;
}

export interface SuccessSendableCountResponse {
  code: 1,
  message: string,
  list: {
    SMS_CNT: number,
    LMS_CNT: number,
    MMS_CNT: number
  }
}