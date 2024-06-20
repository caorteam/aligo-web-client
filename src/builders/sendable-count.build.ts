export function buildSendableCountParams(p: {apikey: string, userid: string}){
  const body = new URLSearchParams(p);
  return body;
}

export interface SuccessSendableCountResponse {
  code: 1,
  message: string,
  list: {
    //단문전송시 발송가능한건수
    SMS_CNT: number,
    //장문전송시 발송가능한건수
    LMS_CNT: number,
    //그림(사진)전송시 발송가능한건수
    MMS_CNT: number,
    //알림톡 전송시 발송가능한건수
    ALT_CNT: number,

    FTS_CNT: number,
    FTM_CNT: number,
    FTW_CNT: number,
    FTL_CNT: number,
    FTC_CNT: number
  }
}