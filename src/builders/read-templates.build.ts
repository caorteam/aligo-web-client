// 전송내역조회
export function buildReadTemplateParams(p: {
  apikey: string,
  userid: string,
  page?: number,
  limit?: number,
  senderkey?: string,
  tpl_code?: string,
}){
  const {page, limit, senderkey, tpl_code,...rest} = p;

  const params: Record<string, string> = {
    //
    ...rest,
  };

  if(senderkey){
    params.senderkey = senderkey;
  }

  if(tpl_code){
    params.tpl_code = tpl_code;
  }

  if(page){
    params.page = page.toString();
  }

  if(limit){
    params.limit = limit.toString();
  }
  
  return params;
}

export interface SuccessReadTemplateResponse {
  code: 0,
  message: "성공적으로 전송요청 하였습니다.",
  list:{//등록된 발신프로필 목록
    templtCode: string,//템플릿 코드
    templtContent: string, //등록된 템플릿 콘텐츠
    templtName: string, // 템플릿 명
    //BA: 기본형, EX: 부가 정보형, AD: 광고 추가형, MI: 복합형
    templateType: 'BA'|'EX'|'AD'|'MI'|string,
    // NONE: 선택안함, TEXT: 강조표기형, IMAGE: 이미지형	
    templateEmType: 'NONE'|'TEXT'|'IMAGE'|string,
    //상태 (R: 등록, REQ: 심사요청, APR: 승인, REJ: 반려)
    templtTitle?: string,//강조표기 핵심정보
    templtSubtitle?: string,//강조표기 보조문구	
    templtImageName?: string,//템플릿 이미지 파일명	
    templtImageUrl?: string,//템플릿 이미지 링크	
    status: 'R'|'REQ'|'APR'|'REJ'|string,
    // 승인상태 (REG: 등록, REQ: 심사요청, APR: 승인, REJ: 반려)	
    inspStatus: 'REG'|'REQ'|'APR'|'REJ'|string,
    //발신프로필키
    senderKey: string,
    //템플릿 생성일	
    cdate: string,
    //템플릿 코멘트	
    comments: [],
    //템플릿에 사용된 버튼 정보	
    buttons:{
      //버튼 순서
      ordering: string,
      //버튼 이름
      name: string,
      // 버튼타입 (AC: 채널추가, DS: 배송조회, WL: 웹링크, AL: 앱링크, BK: 봇키워드, MD: 메시지전달)
      linkType: 'AC'|'DS'|'WL'|'AL'|'BK'|'MD'|string,
      //버튼 링크 타입명
      linkTypeName: "채널추가"|"배송조회"|"웹링크"|"앱링크"|"봇키워드"|"메시지전달"|string,
      //버튼 모바일 링크
      linkMo: string,
      //버튼 PC 링크
      linkPc: string,
      //버튼 IOS 링크
      linkIos: string,
      //버튼 안드로이드 링크
      linkAnd: string
    }[]
  }[],
  info: {
    // 승인상태 (REG: 등록, REQ: 심사요청, APR: 승인, REJ: 반려)
    REG: number,
    REQ: number,
    APR: number,
    REJ: number
  }
}
