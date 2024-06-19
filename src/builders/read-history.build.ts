// 전송결과조회(상세)
// API에서 조회되는 mid를 사용하여 수신번호별 상태를 조회하실 수 있습니다.
// 수신전화번호별 전송상태를 조회하실 수 있으며 목록에 없거나 전송중인 문자는 만24시간동안 전송시도중인것입니다.
// 최종 24시간이 경과 후 조회하셔야 완료된 내역을 확인하실 수 있습니다.
export function buildReadHistoryParams(p: {
  apikey: string,
  userid: string,
  mid: string,
  page?: number,
  limit?: number,
}){
  const {page, limit,...rest} = p;
  const params: Record<string, string> = {
    //
    ...rest,
  };

  if(page){
    params.page = page.toString();
  }
  if(limit){
    params.limit = limit.toString();
  }

  return params;
}

export interface SuccessReadHistoryResponse {
  code: 0,
  message: "성공적으로 조회되었습니다.",
  list: {
    msgid: string,
    type: string,
    sender: string,
    phone: string,
    status: string,
    reqdate: string,
    sentdate: string,
    rsltdate: string,
    reportdate: string,
    rslt: string,
    rslt_message: string,
    message: string,
    button_json: string,
    tpl_code: string,
    senderKey: string,
    smid: string
  }[],
  currentPage: string,
  totalPage: string,
  totalCount: string
}