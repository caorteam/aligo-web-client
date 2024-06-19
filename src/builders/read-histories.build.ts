// 전송내역조회
export function buildReadHistoriesParams(p: {
  apikey: string,
  userid: string,
  page?: number,
  limit?: number,
  // YYYYMMDD
  startdate?: string,
  // YYYYMMDD
  enddate?: string,
}){
  const {page, limit, startdate, enddate,...rest} = p;

  const params: Record<string, string> = {
    //
    ...rest,
  };

  if(startdate){
    const startdateRegex = /^\d{8}$/;
    if (!startdateRegex.test(startdate)) {
      throw new Error("startdate는 YYYYMMDD 형태여야 합니다.");
    }
    params.startdate = startdate;
  }

  if(enddate){
    const enddateRegex = /^\d{8}$/;
    if (!enddateRegex.test(enddate)) {
      throw new Error("enddate는 YYYYMMDD 형태여야 합니다.");
    }
    params.enddate = enddate;
  }

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
  message: "성공적으로 전송요청 하였습니다.",
  list : {
    mid: string,
    type: string,
    sender: string,
    msg_count: string,
    reserve_date: string,
    reserve_state: string,
    mbody: string,
    reg_date: string
  }[],
  currentPage: string,
  totalPage: string,
  totalCount: string
}
