export interface Button{
  //버튼명
  name : string,
  // 링크 타입
  linkType : "AC"|"DS"|"WL"|"AL"|"BK"|"MD",
  // // 채널 추가, 배송조회, 웹링크, 앱링크, 봇키워드, 메시지전달 중에서 1개
  linkTypeName : "채널 추가"|"배송조회"|"웹링크"|"앱링크"|"봇키워드"|"메시지전달"|string,
  // 설정한 모바일 링크
  linkMo : string,
  // 설정한 PC 링크
  linkPc : string,
  // 설정한 IOS Scheme
  linkIos : string,
  // 설정한 Android Scheme
  linkAnd : string,
}

export interface Message {
  // 수신자 연락처	
  receiver: string,
  // 수신자 이름
  recvname?: string,
  // 알림톡 제목
  subject: string,
  // 알림톡 내용
  message: string,
  // 강조표기형의 타이이벤트 타이틀
  emtitle?: string,
  // 버튼 제목
  button?: { button:Button[]},
  // 알림톡 실패시 알림톡 제목
  fsubject?: string,
  fmessage?: string,
}

export function buildSendParams(p: {
  apikey: string,
  userid: string,
  senderkey: string,
  tpl_code: string,
  sender: string,
  senddate?: string,
  messages: Message[]
}) {
  const { messages:_messages,senddate, ...rest } = p;
  const messages = _messages.reduce((acc:{[key:string]:any}, message, index) => {
    if (message.receiver !== undefined) acc[`receiver_${index+1}`] = message.receiver;
    if (message.recvname !== undefined) acc[`recvname_${index+1}`] = message.recvname;
    if (message.subject !== undefined) acc[`subject_${index+1}`] = message.subject;
    if (message.message !== undefined) acc[`message_${index+1}`] = message.message;
    if (message.emtitle !== undefined) acc[`emtitle_${index+1}`] = message.emtitle;
    if (message.button !== undefined) acc[`button_${index+1}`] = JSON.stringify(message.button);
    if (message.fsubject !== undefined) acc[`fsubject_${index+1}`] = message.fsubject;
    if (message.fmessage !== undefined) acc[`fmessage_${index+1}`] = message.fmessage;
    return acc;
  }, {});

  const params: Record<string, string> = {
    //
    ...rest,
    ...messages
  };

  if(senddate){
    params.senddate = senddate;
  }

  return params;
}

export interface SuccessSendResponse {
  code: 0,
  message: "성공적으로 전송요청 하였습니다.",
  info : {
    type: string,
    mid: string,
    current: number,
    unit: number,
    total: number,
    scnt: number,
    fcnt: number
  }
}

