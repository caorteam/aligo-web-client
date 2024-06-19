import { buildReadHistoriesParams, SuccessReadHistoryResponse} from "./builders/read-histories.build";
import { buildReadHistoryParams } from "./builders/read-history.build";
import { Message, SuccessResponse, buildSendParams } from "./builders/send.build";
import { buildSendableCountParams, SuccessSendableCountResponse } from "./builders/sendable-count.build";
export interface ErrorResponse {
  code: -99|-101|number,
  message: string
}
export class AligoKakaoApiClient {
  private readonly base_url: string;
  private readonly api_key: string;
  private readonly user_id: string;
  private readonly senderkey: string;

  constructor(p: {base_url?: string, api_key: string, user_id: string, senderkey: string}) {
    this.base_url = p.base_url ?? 'https://kakaoapi.aligo.in';
    this.api_key = p.api_key;
    this.user_id = p.user_id;
    this.senderkey = p.senderkey;
  }

  async send(p: {
    tpl_code: string,
    sender: string,
    senddate?: string,//20240619131900
    messages: Message[],
    //
    failover?: 'Y'|'N',
    testMode?: 'Y'|'N',
  }): Promise<SuccessResponse | ErrorResponse>{

    const {tpl_code, sender, senddate, messages} = p;

    if(senddate){
      const senddateRegex = /^\d{14}$/;
      if (!senddateRegex.test(senddate)) {
        //todo
        throw new Error("senddate는 YYYYMMDDHHMMSS 형태여야 합니다.");
      }
    }

    const url = new URL(`${this.base_url}/akv10/alimtalk/send/`);

    const params = buildSendParams({
      apikey: this.api_key,
      userid: this.user_id,
      senderkey: this.senderkey,
      tpl_code,
      sender,
      senddate,
      messages,
    })

    // return params;

    const body = new URLSearchParams(params);
    // return body;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body
    });

    const response_body = await response.json()

    return response_body;
  }

  async readHistories(p:{
    page?: number,
    limit?: number,
    // YYYYMMDD
    startdate?: string,
    // YYYYMMDD
    enddate?: string,
    senderkey?: string,
  }): Promise<SuccessReadHistoryResponse|ErrorResponse>{
    const url = new URL(`${this.base_url}/akv10/history/list/`);

    const params = buildReadHistoriesParams({
      apikey: this.api_key,
      userid: this.user_id,
      ...p,
    })

    const body = new URLSearchParams(params);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body
    });
    
    const response_body = await response.json()

    return response_body;
  }

  async readHistory(p:{
    //
    mid: string,
    page?: number,
    limit?: number,
  }): Promise<SuccessReadHistoryResponse|ErrorResponse>{
    const url = new URL(`${this.base_url}/akv10/history/detail/`);

    const params = buildReadHistoryParams({
      apikey: this.api_key,
      userid: this.user_id,
      ...p,
    })


    const body = new URLSearchParams(params);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body
    });
    
    const response_body = await response.json()

    return response_body;
  }

  async getSendableCount(p:{apikey: string, userid: string}):Promise<ErrorResponse|SuccessSendableCountResponse>{
    const url = new URL(`${this.base_url}/akv10/heartinfo/`);

    const body = buildSendableCountParams(p)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body
    });
    
    const response_body = await response.json()

    return response_body;
  }
}