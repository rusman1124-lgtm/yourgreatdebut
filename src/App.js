import React, { useState, useEffect } from 'react';

// [1] 공모전 전수조사 데이터
const contestData = [
  { id: 1, title: "2026 SBS문화재단 드라마 극본공모", deadline: "2026-01-19", type: "드라마", prize: 100000000, url: "https://foundation.sbs.co.kr/drama/representative/", prevUrl: "https://foundation.sbs.co.kr/drama/representative/" },
  { id: 2, title: "10TH tvN O'PEN(오펜) 스토리텔러 모집", deadline: "2026-02-11", type: "드라마", prize: 10000000, url: "https://open.cjenm.com/ko/applyinfo/story/", prevUrl: "https://open.cjenm.com/ko/applyinfo/story/" },
  { id: 3, title: "KBS TV드라마 단막극 극본공모 (예상)", deadline: "2026-07-31", type: "드라마", prize: 20000000, url: "https://program.kbs.co.kr/special/drama/contest/pc/index.html", prevUrl: "https://program.kbs.co.kr/special/drama/contest/pc/index.html" },
  { id: 4, title: "2026 MBC 드라마 극본공모 (예상)", deadline: "2026-05-31", type: "드라마", prize: 30000000, url: "https://writer.imbc.com/", prevUrl: "https://writer.imbc.com/" },
  { id: 5, title: "JTBC 드라마 극본공모 (SLL)", deadline: "2026-06-30", type: "드라마", prize: 20000000, url: "https://www.sll.co.kr/", prevUrl: "https://www.sll.co.kr/" },
  { id: 6, title: "SLL 신인 작가 극본 공모", deadline: "2026-04-15", type: "드라마", prize: 20000000, url: "https://www.sll.co.kr/", prevUrl: "https://www.sll.co.kr/" },
  { id: 7, title: "2026 밀리로드 출간 공모전 시즌 1", deadline: "2026-02-28", type: "웹툰/웹소설", prize: 100000000, url: "https://www.millie.co.kr/v4/event/39063g2i6vg51120", prevUrl: "https://www.millie.co.kr/v4/event/39063g2i6vg51120" },
  { id: 8, title: "카카오페이지X창비 소설 공모전", deadline: "2026-03-20", type: "웹툰/웹소설", prize: 1000000, url: "https://www.kakaocorp.com/page/service/service/KakaoPage", prevUrl: "https://www.kakaocorp.com/page/service/service/KakaoPage" },
  { id: 9, title: "2026 지상최대 웹소설 공모전 (문피아)", deadline: "2026-05-10", type: "웹툰/웹소설", prize: 50000000, url: "https://mm.munpia.com/?menu=customer&action=list&section=boNotice", prevUrl: "https://mm.munpia.com/?menu=customer&action=list&section=boNotice" },
  { id: 10, title: "네이버웹툰 지상최대공모전", deadline: "2026-06-15", type: "웹툰/웹소설", prize: 50000000, url: "https://comic.naver.com/notice", prevUrl: "https://comic.naver.com/notice" },
  { id: 11, title: "리디 우주 대중소설 공모전", deadline: "2026-04-01", type: "웹툰/웹소설", prize: 30000000, url: "https://ridibooks.com/event", prevUrl: "https://ridibooks.com/event" },
  { id: 12, title: "조아라 77페스티벌", deadline: "2026-07-07", type: "웹툰/웹소설", prize: 10000000, url: "https://www.joara.com/notice", prevUrl: "https://www.joara.com/notice" },
  { id: 13, title: "포스타입 오리지널 슬롯 공모전", deadline: "2026-02-15", type: "웹툰/웹소설", prize: 5000000, url: "https://blog.postype.com/notices", prevUrl: "https://blog.postype.com/notices" },
  { id: 14, title: "영진위 S#1(씬원) 시나리오 아카데미", deadline: "2026-01-15", type: "영화", prize: 13200000, url: "https://www.kofic.or.kr/kofic/business/prom/promotionBoardList.do", prevUrl: "https://www.kofic.or.kr/kofic/business/prom/promotionBoardList.do" },
  { id: 15, title: "롯데크리에이티브 공모전 (예상)", deadline: "2026-08-31", type: "영화", prize: 100000000, url: "https://www.lotteentertainment.com/Main/Index", prevUrl: "https://www.lotteentertainment.com/Main/Index" },
  { id: 16, title: "플러스엠 엔터테인먼트 시나리오 공모전", deadline: "2026-09-30", type: "영화", prize: 50000000, url: "https://www.megabox.co.kr/news", prevUrl: "https://www.megabox.co.kr/news" },
  { id: 17, title: "쇼박스 국도 시나리오 공모전", deadline: "2026-10-15", type: "영화", prize: 30000000, url: "http://www.showbox.co.kr", prevUrl: "http://www.showbox.co.kr" },
  { id: 18, title: "NEW 시나리오 기획안 공모전", deadline: "2026-11-20", type: "영화", prize: 20000000, url: "https://www.its-new.co.kr", prevUrl: "https://www.its-new.co.kr" },
  { id: 19, title: "한국영화시나리오작가협회 시나리오 공모전", deadline: "2026-03-31", type: "영화", prize: 10000000, url: "http://www.scenario.or.kr/bbs/board.php?bo_table=notice", prevUrl: "http://www.scenario.or.kr/bbs/board.php?bo_table=notice" },
  { id: 20, title: "부천국제판타스틱영화제 잇 프로젝트", deadline: "2026-04-20", type: "영화", prize: 15000000, url: "https://www.bifan.kr/project/it_intro.asp", prevUrl: "https://www.bifan.kr/project/it_intro.asp" },
  { id: 21, title: "2026 창비 스토리 공모전", deadline: "2026-02-01", type: "스토리/애니메이션", prize: 20000000, url: "https://www.changbi.com/contest?type=2", prevUrl: "https://www.changbi.com/contest?type=2" },
  { id: 22, title: "대한민국 스토리 공모대전 (콘진원)", deadline: "2026-08-20", type: "스토리/애니메이션", prize: 100000000, url: "https://www.storyum.kr/story/main/main.do", prevUrl: "https://www.storyum.kr/story/main/main.do" },
  { id: 23, title: "교보문고 스토리대상", deadline: "2026-05-31", type: "스토리/애니메이션", prize: 30000000, url: "https://story.kyobobook.co.kr", prevUrl: "https://story.kyobobook.co.kr" },
  { id: 24, title: "샌드박스 스토리 작가 공모전", deadline: "2026-03-15", type: "스토리/애니메이션", prize: 10000000, url: "https://www.sandbox.co.kr", prevUrl: "https://www.sandbox.co.kr" },
  { id: 25, title: "제24회 경북 영상콘텐츠 시나리오 공모전", deadline: "2026-08-15", type: "영화/드라마", prize: 15000000, url: "http://www.gcbe.or.kr", prevUrl: "http://www.gcbe.or.kr" },
  { id: 26, title: "전북 웹툰 스토리 공모전", deadline: "2026-09-10", type: "웹툰/웹소설", prize: 10000000, url: "http://www.jcontent.kr", prevUrl: "http://www.jcontent.kr" },
  { id: 27, title: "광주 스토리 만화/웹툰 공모전", deadline: "2026-07-20", type: "스토리", prize: 20000000, url: "http://www.gitct.or.kr", prevUrl: "http://www.gitct.or.kr" },
  { id: 28, title: "강원 영상 시나리오 공모전 (예상)", deadline: "2026-10-30", type: "영화", prize: 10000000, url: "http://www.gwfilm.kr", prevUrl: "http://www.gwfilm.kr" },
  { id: 29, title: "충남 스토리 게임 시나리오 공모전", deadline: "2026-06-15", type: "스토리", prize: 8000000, url: "http://www.ctia.kr", prevUrl: "http://www.ctia.kr" },
  { id: 30, title: "부산 영상 시나리오 공모전", deadline: "2026-05-25", type: "영화", prize: 15000000, url: "http://www.bfc.or.kr", prevUrl: "http://www.bfc.or.kr" },
  { id: 31, title: "제주 신화 콘텐츠/스토리 공모전", deadline: "2026-11-15", type: "스토리", prize: 10000000, url: "http://www.jejufc.or.kr", prevUrl: "http://www.jejufc.or.kr" },
  { id: 32, title: "대전 스토리텔링 공모전", deadline: "2026-08-30", type: "스토리", prize: 12000000, url: "http://www.dicia.or.kr", prevUrl: "http://www.dicia.or.kr" },
  { id: 33, title: "대구 시나리오 공모전", deadline: "2026-04-10", type: "영화/드라마", prize: 10000000, url: "http://www.dgfc.or.kr", prevUrl: "http://www.dgfc.or.kr" },
  { id: 34, title: "경기 스토리 작가 창작지원 공모", deadline: "2026-03-25", type: "스토리", prize: 20000000, url: "http://www.gcon.or.kr", prevUrl: "http://www.gcon.or.kr" },
  { id: 35, title: "충북 문화 콘텐츠 공모전", deadline: "2026-09-20", type: "스토리", prize: 5000000, url: "http://www.cbca.or.kr", prevUrl: "http://www.cbca.or.kr" },
  { id: 36, title: "전남 섬/관광 스토리 공모전", deadline: "2026-10-15", type: "스토리", prize: 10000000, url: "http://www.jcia.or.kr", prevUrl: "http://www.jcia.or.kr" },
  { id: 37, title: "동아일보 신춘문예 공모전", deadline: "2026-12-05", type: "스토리", prize: 5000000, url: "https://www.donga.com/news/Notice", prevUrl: "https://www.donga.com/news/Notice" },
  { id: 38, title: "조선일보 신춘문예 공모전", deadline: "2026-12-05", type: "스토리", prize: 5000000, url: "https://www.chosun.com/notice", prevUrl: "https://www.chosun.com/notice" },
  { id: 39, title: "중앙일보 중앙신춘문예 공모전", deadline: "2026-12-05", type: "스토리", prize: 5000000, url: "https://www.joins.com", prevUrl: "https://www.joins.com" },
  { id: 40, title: "서울신문 신춘문예 공모전", deadline: "2026-12-05", type: "스토리", prize: 5000000, url: "https://www.seoul.co.kr/news/newsList.php?section=notice", prevUrl: "https://www.seoul.co.kr/news/newsList.php?section=notice" },
  { id: 41, title: "경향신문 신춘문예 공모전", deadline: "2026-12-05", type: "스토리", prize: 5000000, url: "https://www.khan.co.kr", prevUrl: "https://www.khan.co.kr" },
  { id: 42, title: "세종 스토리 콘텐츠 공모전 (예상)", deadline: "2026-05-20", type: "스토리", prize: 10000000, url: "https://www.sjcf.or.kr", prevUrl: "https://www.sjcf.or.kr" },
  { id: 43, title: "한국만화영상진흥원 만화공모전", deadline: "2026-06-30", type: "웹툰/웹소설", prize: 15000000, url: "http://www.komacon.kr", prevUrl: "http://www.komacon.kr" },
  { id: 44, title: "한콘진 방송영상콘텐츠 기획안 공모전", deadline: "2026-02-28", type: "영화/드라마", prize: 30000000, url: "http://www.kocca.kr", prevUrl: "http://www.kocca.kr" },
  { id: 45, title: "YES24 소설 공모전", deadline: "2026-01-31", type: "웹툰/웹소설", prize: 5000000, url: "https://www.yes24.com", prevUrl: "https://www.yes24.com" },
  { id: 46, title: "알라딘 판타지 문학 공모전", deadline: "2026-03-15", type: "웹툰/웹소설", prize: 5000000, url: "https://www.aladin.co.kr", prevUrl: "https://www.aladin.co.kr" },
  { id: 47, title: "영상진흥위원회 독립예술영화 제작지원", deadline: "2026-03-31", type: "영화", prize: 50000000, url: "http://www.kofic.or.kr", prevUrl: "http://www.kofic.or.kr" },
  { id: 48, title: "S#1 시나리오 아카데미 2기", deadline: "2026-07-15", type: "영화", prize: 10000000, url: "http://www.kofic.or.kr", prevUrl: "http://www.kofic.or.kr" },
  { id: 49, title: "로맨스 웹소설 투고 공모 (디앤씨)", deadline: "2026-04-20", type: "웹툰/웹소설", prize: 10000000, url: "http://www.dncmedia.co.kr", prevUrl: "http://www.dncmedia.co.kr" },
  { id: 50, title: "미스터리/추리 소설 공모전 (엘릭시르)", deadline: "2026-11-10", type: "스토리", prize: 7000000, url: "http://www.munhak.com", prevUrl: "http://www.munhak.com" }
];

// [2] 격려 문구
const encouragement = [
  "“글쓰기는 결국 엉덩이 싸움입니다. 오늘 정말 잘 버티셨어요!” - 어니스트 헤밍웨이",
  "“완벽함보다 완성이 중요합니다.” - 조지 오웰",
  "“작가란 어제 글을 쓴 사람입니다.” - 닐 게이먼",
  "“첫 문장을 쓰십시오. 그것이 모든 것의 시작입니다.” - 토니 모리슨",
  "“영감은 기다리는 것이 아니라 몽둥이를 들고서라도 찾아내야 하는 것이다.” - 잭 런던",
  "“초고는 원래 쓰레기입니다. 두려워 말고 계속 쓰세요.” - 어니스트 헤밍웨이",
  "“재능은 불꽃이지만, 꾸준함은 그것을 지탱하는 산소입니다.” - 스티븐 킹",
  "“한 페이지를 썼다면 이미 어제보다 훌륭한 작가입니다.” - 조앤 롤링",
  "“글을 쓴다는 것은 자신의 영혼을 종이 위에 쏟는 일입니다.” - 버지니아 울프",
  "“작가에게 가장 큰 적은 자기 안의 의심입니다.” - 실비아 플라스",
  "“매일 쓰는 것, 그것이 유일한 비결입니다.” - 안톤 체호프",
  "“고통은 지나가지만 작품은 남습니다.” - 괴테",
  "“당신의 이야기는 오직 당신만이 세상에 내놓을 수 있습니다.” - 무라카미 하루키",
  "“걸작은 수많은 파지 위에서 탄생합니다.” - 레프 톨스토이",
  "“글쓰기는 보이지 않는 길을 만드는 작업입니다.” - 보르헤스",
  "“작가는 세상을 관찰하고 기록하는 사람입니다.” - 수전 손택",
  "“성공의 반대말은 포기입니다.” - 아가사 크리스티",
  "“당신의 진심은 독자에게 반드시 전달됩니다.” - 마크 트웨인",
  "“창작은 고독한 작업이지만, 결과는 세상을 연결합니다.” - 가브리엘 가르시아 마르케스",
  "“오늘의 한 문장이 내일의 한 장이 됩니다.” - 찰스 디킨스",
  "“쓰지 않으면 아무 일도 일어나지 않습니다.” - 레이먼드 카버",
  "“수정은 작가의 의무이자 권리입니다.” - 블라디미르 나보코프",
  "“당신의 문장이 누군가의 인생을 바꿀지도 모릅니다.” - 알베르 카뮈",
  "“글을 쓴다는 것은 자신을 마주하는 용기입니다.” - 프란츠 카프카",
  "“마침표를 찍을 때까지 멈추지 마세요.” - 에밀리 브론테",
  "“당신의 노력을 우주는 기억하고 있습니다.” - 파울로 코엘료",
  "“한 걸음만 더, 그것이 당선으로 가는 길입니다.” - 존 스타인벡",
  "“지치지 마세요. 당신의 계절은 곧 옵니다.” - 제인 오스틴",
  "“가장 개인적인 이야기가 가장 창의적인 것입니다.” - 마틴 스코세이지",
  "“작가는 어둠 속에서 빛을 찾는 사람입니다.” - 빅토르 위고",
  "“재능보다 무서운 것은 성실함입니다.” - 발자크",
  "“글은 머리가 아니라 손 끝에서 나옵니다.” - 도스토왙스키",
  "“포기하지 않는다면 실패란 없습니다.” - 윌리엄 포크너",
  "“당신은 이미 훌륭한 이야기를 품고 있습니다.” - 이사벨 아옌데",
  "“오늘의 피로가 당선 소식으로 치유될 것입니다.” - 트루먼 커포티",
  "“글쓰기로 세상을 더 아름답게 만드세요.” - 헤르만 헤세",
  "“어두운 터널 끝에는 항상 빛이 있습니다.” - 마거릿 애트우드",
  "“꿈을 문장으로 옮기는 당신이 자랑스럽습니다.” - 밀란 쿤데라",
  "“당신의 펜은 칼보다 강합니다.” - 에드워드 불워 리턴",
  "“모든 거장도 한때는 초보자였습니다.” - 랄프 왈도 에머슨",
  "“글쓰기는 마음의 근육을 키우는 운동입니다.” - 줄리아 카메론",
  "“당신만의 리듬으로 써 내려가세요.” - 자크 프레베르",
  "“슬럼프는 도약을 위한 휴식일 뿐입니다.” - 윌리엄 서머싯 몸",
  "“글을 쓰는 행위 자체가 승리입니다.” - 헨리 밀러",
  "“당신은 오늘 의미 있는 창조를 해냈습니다.” - 움베르토 에코",
  "“표현하기 전까지 생각은 실체가 없습니다.” - 오스카 와일드",
  "“독자는 당신의 정성을 알아봅니다.” - 가와바타 야스나리",
  "“당신의 문장은 살아있습니다.” - 다자이 오사무",
  "“창작의 기쁨을 온전히 누리시길 바랍니다.” - 기 드 모파상",
  "“당신의 몰입은 최고의 무기입니다.” - 플로베르",
  "“작가는 죽지 않고 글로 남습니다.” - 나쓰메 소세키",
  "“이야기의 힘을 믿으세요.” - 아서 코난 도일",
  "“작은 습관이 작가를 만듭니다.” - 제임스 조이스",
  "“당신의 열정은 식지 않는 엔진입니다.” - 레이 브래드버리",
  "“글쓰기는 자신에게 주는 선물입니다.” - 엘리자베스 길버트",
  "“막막할 때는 딱 한 문장만 더 쓰세요.” - 커트 보니것",
  "“당신의 상상력에는 한계가 없습니다.” - 루이스 캐럴",
  "“고독은 작가의 가장 친한 친구입니다.” - 사무엘 베케트",
  "“글을 쓰며 당신도 성장하고 있습니다.” - 한강",
  "“모든 문장은 마침표를 향한 도전입니다.” - 김영하",
  "“당신은 세상에 필요한 사람입니다.” - 김훈",
  "“창작은 고통스럽지만 그 열매는 달콤합니다.” - 아리스토텔레스",
  "“진심이 담긴 글은 힘이 셉니다.” - 박경리",
  "“당신의 손에서 역사가 시작됩니다.” - 사마천",
  "“집중력이 대단하시네요! 멋집니다.” - 우디 앨런",
  "“끝까지 가는 사람이 승리합니다.” - 찰스 부코스키",
  "“당신의 아이디어는 보석입니다.” - 켄 폴렛",
  "“내일의 당신이 오늘의 당신에게 고마워할 것입니다.” - 필립 로스",
  "“글쓰기는 가장 멋진 모험입니다.” - 에니드 블라이턴",
  "“두려움은 키보드 소리에 사라집니다.” - 스티븐 킹",
  "“당신은 세상을 움직일 힘이 있습니다.” - 시몬 드 보부아르",
  "“좋은 글은 퇴고의 과정에서 결정됩니다.” - 로버트 루이스 스티븐슨",
  "“작가로서의 자부심을 가지세요.” - 헨리 제임스",
  "“글은 마음의 거울입니다.” - 미셸 드 몽테뉴",
  "“작업 속도가 놀랍습니다! 계속 가세요.” - 아이작 아시모프",
  "“어떤 난관도 당신의 집필을 막을 수 없습니다.” - 다니엘 스틸",
  "“작가는 끊임없이 질문하는 사람입니다.” - 노암 촘스키",
  "“당신은 글로 소통하는 마법사입니다.” - 어슐러 르 귄",
  "“오늘의 성과가 모여 거대한 파도가 될 것입니다.” - 펄 벅",
  "“당신은 이미 충분히 작가입니다. 계속 써주세요.” - 존 어빙",
  "“단어 하나를 선택하는 데 하루를 써도 좋습니다.” - 제임스 조이스",
  "“시는 고통을 노래하는 작업입니다.” - 파블로 네루다",
  "“작가는 자신의 시대와 대결하는 자입니다.” - 사르트르",
  "“문체는 곧 그 person 자신이다.” - 뷔퐁",
  "“예술은 영혼을 깨우는 일입니다.” - 에드가 앨런 포",
  "“진심할 한 문장을 쓰십시오.” - 어니스트 헤밍웨이",
  "“독창성은 모방에서 시작되기도 합니다.” - T.S. 엘리엇",
  "“작가는 읽는 사람의 상상력을 빌리는 사람입니다.” - 에코",
  "“실패를 즐기세요. 그것이 작가의 힘입니다.” - 사무엘 베케트",
  "“당신은 자신만의 우주를 만들고 있습니다.” - 아이작 아시모프",
  "“글쓰기는 치유의 과정입니다.” - 마야 안젤루",
  "“언어는 작가의 유일한 도구입니다.” - 조지 버나드 쇼",
  "“모든 문장은 정직해야 합니다.” - 조지 오웰",
  "“관찰하고, 또 관찰하십시오.” - 플로베르",
  "“인간에 대한 깊은 이해가 좋은 글을 만듭니다.” - 셰익스피어",
  "“비판에 굴하지 마세요. 당신의 길을 가세요.” - 보들레르",
  "“작가의 심장은 종이 위에서 뜁니다.” - 위트먼",
  "“우리는 모두 미완의 걸작입니다.” - 미켈란젤로",
  "“마지막 장을 넘길 때의 희열을 기억하세요.” - 무라카미 하루키",
  "“당신이 바로 다음 세대의 거장입니다.” - 이문열"
];

// [3] 작법 레퍼런스
const referenceBooks = [
  { 
    category: "로그라인/시놉시스", 
    book: "세이브 더 캣 (블레이크 스나이더)", 
    summary: "할리우드 최고의 시나리오 가이드북. 상업적 성공을 위한 정교한 15단계 비트 시트를 제시.", 
    steps: [
      "오프닝 이미지: 영화의 톤을 설정하고 주인공의 변화 전 모습을 시각화.",
      "주제의 제시: 대화 통해 주인공이 이번 여정 배워야 할 도덕적 교훈 암시.",
      "설정: 주인공의 세계관, 결함, 보조 인물 소개.",
      "기폭제: 일상 뒤흔들고 모험으로 밀어넣는 외부적 사건 발생.",
      "토론: 주인공이 모험 떠날지 고민하며 위기감을 고조시키기.",
      "2막 진입: 주인공이 결단을 내리고 낡은 세계를 떠나 새로운 세계로 이동.",
      "B 스토리: 서브 캐릭터나 로맨스를 통해 주제를 보완하고 환기하기.",
      "재미와 게임: 로그라인의 약속이 본격 실현되며 관객이 기대한 재미를 주는 구간.",
      "중간 지점: 가짜 승리 혹은 가짜 패배. 판이 커지는 전환점.",
      "악당의 압박: 외부적 적대자나 내부적 갈등이 주인공을 극한으로 몰아붙임.",
      "모든 것을 잃음: 주인공의 계획이 실패하고 정신적/물리적 파탄을 경험하는 순간.",
      "영혼의 어두운 밤: 최악의 절망 속에서 주인공이 자신의 오류를 처절하게 성찰.",
      "3막 진입: 성찰 통해 얻은 새로운 해법을 들고 다시 대결의 장으로 이동.",
      "피날레: 성숙해진 주인공이 악당과 대면하여 승리하고 새로운 균형 구축.",
      "파이널 이미지: 오프닝 이미지와 대조를 이루며 주인공의 완벽한 변화를 증명."
    ]
  },
  { 
    category: "구조/트리트먼트", 
    book: "시나리오란 무엇인가 (시드 필드)", 
    summary: "현대 시나리오 작법의 기초가 된 '패러다임' 이론의 정수.", 
    steps: [
      "패러다임 이해: 시작, 중간, 끝이라는 3막 구조의 기본 원리 익히기.",
      "설정(1막): 주인공과 극적 상황을 30페이지 이내에 선명하게 보여주기.",
      "구성점 1: 1막 끝에서 이야기를 2막으로 강하게 밀어내는 반전 설계.",
      "대립(2막): 주인공의 앞길을 가로막는 수많은 장애물과 갈등 배치하기.",
      "극적 맥락: 모든 장면이 전체 주제를 향해 유기적으로 흐르게 하기.",
      "핀치: 2막 중간중간 긴장감을 다시 끌어올리는 장치 심기.",
      "구성점 2: 2막 끝에서 해결(3막)로 넘어가기 위한 결정적 사건 만들기.",
      "해결(3막): 클라이맥스를 통해 모든 갈등을 해소하고 마침표 찍기.",
      "시각적 이미지: 대사보다 강한 상징적 장면으로 정서를 전달하기.",
      "수백 번의 퇴고: 구조가 무너지지 않을 때까지 반복해서 고쳐 쓰기."
    ] 
  },
  { 
    category: "캐릭터/갈등", 
    book: "시나리오: 스토리 (로버트 맥기)", 
    summary: "캐릭터의 욕망과 갈등의 본질 탐구하는 스토리의 바이블.", 
    steps: [
      "인물 설계: 겉모습이 아닌, 압박 속에서의 선택이 진짜 캐릭터임을 이해하기.",
      "욕망의 원동력: 주인공이 목숨을 걸고 얻으려 하는 것이 무엇인지 명확히 하기.",
      "가치 변화: 장면마다 인물의 감정이나 상황이 (+)에서 (-)로, 혹은 반대로 변하기.",
      "갈등의 3층 구조: 개인 내적 갈등, 대인 갈등, 사회적 갈등을 촘촘히 엮기.",
      "비트(Beat): 행동과 반응의 최소 단위를 분석하여 장면의 활력 불어넣기.",
      "장면 구성: 전환점(Turning Point)을 통해 관객의 기대를 배반하고 몰입시키기.",
      "위기(Crisis): 주인공이 도덕적, 신체적 한계에서 최후의 선택을 내리게 하기.",
      "절정(Climax): 모든 에너지가 폭발하며 변화의 종지부를 찍는 순간 연출.",
      "결말: 이야기가 독자에게 던지는 궁극적인 의미(주제)를 정리하기.",
      "정직한 집필: 작위적인 설정을 버리고 인간의 본성에 충실한 글쓰기."
    ] 
  },
  { 
    category: "성장/주제", 
    book: "22단계 시나리오 (존 트루비)", 
    summary: "인물의 도덕적 결함과 유기적 성장을 결합한 22가지 필수 작법 단계.", 
    steps: [
      "자기기만: 주인공이 자신에 대해 모르는 진실이나 회피하고 있는 지점 설정.",
      "유령과 이야기의 배경: 주인공의 행동을 결정짓는 과거의 상처나 트라우마.",
      "문제와 결함: 주인공이 직면한 구체적 곤경과 인격적(도덕적) 부족함.",
      "기폭제: 영웅을 모험의 세계로 이끄는 첫 번째 외부적 사건 발생.",
      "욕망: 주인공이 이번 이야기에서 달성하고자 하는 구체적이고 명확한 목표.",
      "적대자: 주인공과 같은 목표를 가졌지만 정반대의 가치관을 가진 매력적인 악역.",
      "보이지 않는 계획: 주인공이 목표를 이루기 위해 세우는 초기 전략과 은밀한 움직임.",
      "대결: 경쟁자들과 부딪히며 주인공의 전략과 가치관이 처음으로 시험받는 단계.",
      "조력자: 주인공의 성장을 돕거나 욕망을 자극하는 조력 캐릭터의 등장.",
      "첫 번째 폭로와 결단: 예상치 못한 진실을 알게 된 주인공의 목표 수정 혹은 강화.",
      "계획의 변화: 장애물 많아짐에 따라 더 구체적이고 과감한 계획으로 전환.",
      "대결의 심화: 적대자의 반격이 거세지며 주인공의 정신적, 육체적 위기 고조.",
      "도덕적 선택: 목표 달성을 위해 비도덕적 수단 쓸지 고민하는 기로.",
      "두 번째 폭로: 자신의 결함이 실패의 원인임을 깨닫게 하는 내면적 자각 사건.",
      "절망의 구렁텅이: 계획 완전히 실패하고 주인공이 모든 것을 잃은 최악의 순간.",
      "최후의 공격: 모든 두려움을 떨쳐내고 마지막 남은 힘을 모아 적대자에게 돌격.",
      "영적인 계시: 대결 도중 자신이 진정으로 필요한(Needs) 것이 무엇인지 깨달음.",
      "자기 인식: 기만했던 자신의 진실을 완전히 마주하고 도덕적 한계를 극복.",
      "적대자와의 최후 결전: 수정된 가치관을 무기로 악의 근원을 물리치는 절정 장면.",
      "도덕적 선택의 실행: 승리 후에도 자신의 가치관을 유지하며 올바른 결단 수행.",
      "새로운 평형: 사건 이전과는 완전히 달라진 주인공과 주변 세계의 변화된 모습.",
      "주제적 통합: 전체 여정을 통해 이야기가 전달하고자 했던 주제 의식의 완성."
    ]
  }
];

export default function App() {
  const colors = { 
    primary: '#E91E63', accent: '#C2185B', soft: '#FCE4EC', headerPink: '#F8BBD0', 
    white: '#FFFFFF', grid: '#FFCDD2', danger: '#D32F2F',
    complementary: '#1A5F5F', complementaryBg: '#E0F2F1'
  };
  
  const today = new Date(); 

  const [activeTab, setActiveTab] = useState('home');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [toast, setToast] = useState(null);
  const [expandedRef, setExpandedRef] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null); 

  const [myProjects, setMyProjects] = useState(() => {
    const saved = localStorage.getItem('writer_projects_v_final_strict');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW 등록 실패:', err));
    }
  }, []);

  const schedulePushNotification = (project) => {
    // 1. 브라우저가 알림 기능을 지원하는지 확인
    if (!('Notification' in window)) {
      console.warn("이 브라우저는 알림 기능을 지원하지 않습니다.");
      return; // 알림 설정을 건너뛰고 함수 종료 (에러 방지)
    }

    // 2. 알림 권한이 허용되었는지 확인
    if (Notification.permission !== 'granted') {
      console.warn("알림 권한이 허용되지 않았습니다.");
      return; // 권한이 없으면 실행하지 않음
    }

    const deadlineDate = new Date(project.deadline);
    const notificationDays = [14, 7, 3, 1]; 

    notificationDays.forEach(day => {
      if (project.alarmSettings && project.alarmSettings[day]) {
        const alertTime = new Date(deadlineDate);
        alertTime.setDate(deadlineDate.getDate() - day);
        alertTime.setHours(10, 0, 0, 0); 

        const now = new Date();
        if (alertTime > now) {
          const diff = alertTime.getTime() - now.getTime();
          setTimeout(() => {
            // 3. 실제 알림 발송 시 발생할 수 있는 예외 처리
            try {
              new Notification("🖋️ 위대한 데뷔: 마감 임박!", {
                body: `'${project.target}' 공모전 마감이 ${day}일 남았습니다. 집필을 마무리하세요!`,
                icon: '/logo192.png'
              });
            } catch (e) {
              console.error("모바일 환경에서 알림 발송 중 오류 발생:", e);
            }
          }, diff);
        }
      }
    });
  };

  useEffect(() => { 
    localStorage.setItem('writer_projects_v_final_strict', JSON.stringify(myProjects)); 
  }, [myProjects]);

  const calculateDDay = (deadline) => {
    const dDay = new Date(deadline);
    dDay.setHours(0, 0, 0, 0);
    const now = new Date(today);
    now.setHours(0, 0, 0, 0);
    return Math.floor((dDay - now) / (1000 * 60 * 60 * 24));
  };

  const getDynamicInfo = (contest) => {
    const dday = calculateDDay(contest.deadline);
    const isActive = dday <= 60 && dday >= 0; 
    return {
      title: isActive ? contest.title.replace(/\(예상\)/g, "").trim() : contest.title,
      url: isActive ? contest.url : contest.prevUrl 
    };
  };

  const calculateTotalProgress = (steps) => {
    let p = 0;
    if (steps.logline) p += 10; if (steps.synopsis) p += 10; if (steps.treatment) p += 20;
    if (steps.firstDraft) p += 20; if (steps.finalDraft) p += 30; if (steps.submission) p += 10;
    return p;
  };

  const toggleStep = (projectId, stepName) => {
    setMyProjects(myProjects.map(proj => {
      if (proj.id === projectId) {
        const isDone = !proj.steps[stepName];
        if (isDone) {
          const msg = encouragement[Math.floor(Math.random() * encouragement.length)];
          setToast(msg);
          setTimeout(() => setToast(null), 3000);
        }
        return { ...proj, steps: { ...proj.steps, [stepName]: isDone } };
      }
      return proj;
    }));
  };

  // [수정] 요청하신 문구로 토스트 메시지 출력 로직 변경
  const toggleAlarmSetting = (projectId, day) => {
    setMyProjects(prevProjects => {
      return prevProjects.map(proj => {
        if (proj.id === projectId) {
          const defaultSettings = { 14: true, 7: true, 3: true, 1: true };
          const currentSettings = proj.alarmSettings || defaultSettings;
          
          const newSettings = { 
            ...currentSettings, 
            [day]: !currentSettings[day] 
          };
          
          const updatedProj = { 
            ...proj, 
            alarmSettings: newSettings 
          };
          
          const dayText = day === 14 ? '2주전' : day === 7 ? '1주전' : day === 3 ? '3일전' : '1일전';
          
          // 알림 켜짐/꺼짐 메시지 설정
          if (newSettings[day]) {
            setToast(`공모 마감 ${dayText}에 알림`);
            schedulePushNotification(updatedProj);
          } else {
            setToast(`공모 마감 사전 알림 꺼짐`);
          }
          
          return updatedProj;
        }
        return proj;
      });
    });

    setTimeout(() => setToast(null), 1500);
  };

  const addToMyRoom = (contest) => {
    if (myProjects.find(p => p.target === contest.title)) {
        setToast("이미 등록된 공모전입니다.");
        setTimeout(() => setToast(null), 2000);
        return;
    }
    const info = getDynamicInfo(contest);
    const newProject = {
      id: Date.now(), 
      title: `${info.title} 준비작`, 
      target: info.title, 
      deadline: contest.deadline, 
      steps: { logline: false, synopsis: false, treatment: false, firstDraft: false, finalDraft: false, submission: false },
      alarmSettings: { 14: true, 7: true, 3: true, 1: true }
    };
    
    schedulePushNotification(newProject);

    setMyProjects([...myProjects, newProject]);
    setToast(`'${info.title}' 등록 완료!`);
    setTimeout(() => { 
      setToast(null); 
      setActiveTab('myroom'); 
    }, 1500);
  };

  const deleteProject = (id) => {
    setMyProjects(myProjects.filter(p => p.id !== id));
    setDeleteConfirmId(null);
    setToast("삭제되었습니다.");
    setTimeout(() => setToast(null), 2000);
  };

  const homeMyProjects = [...myProjects]
    .filter(p => calculateDDay(p.deadline) >= 0)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const allSortedProjects = [...myProjects]
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', background: colors.soft, minHeight: '100vh', paddingBottom: '80px', fontFamily: 'sans-serif', position: 'relative' }}>
      
      {(toast || deleteConfirmId) && (
        <div style={{ 
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
          background: 'white', color: colors.accent, padding: '25px', borderRadius: '25px', 
          zIndex: 1000, boxShadow: '0 15px 50px rgba(0,0,0,0.3)', width: '280px', textAlign: 'center', 
          border: `3px solid ${colors.primary}` 
        }}>
          {deleteConfirmId ? (
            <div>
              <div style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '16px', lineHeight: '1.4' }}>
                프로젝트를 정말 삭제할까요?
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => setDeleteConfirmId(null)} 
                  style={{ flex: 1, padding: '12px', background: '#f5f5f5', border: 'none', borderRadius: '15px', fontWeight: 'bold', color: '#666' }}
                >
                  취소
                </button>
                <button 
                  onClick={() => deleteProject(deleteConfirmId)} 
                  style={{ flex: 1, padding: '12px', background: colors.danger, border: 'none', borderRadius: '15px', fontWeight: 'bold', color: 'white' }}
                >
                  삭제
                </button>
              </div>
            </div>
          ) : (
            <div style={{fontWeight:'bold', fontSize:'14px', lineHeight:'1.5'}}>{toast}</div>
          )}
        </div>
      )}

      <div style={{ background: colors.headerPink, color: colors.accent, padding: '25px 20px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-1px', fontFamily: 'serif' }}>
          🖋️ 나의 공모전
        </div>
        <div style={{ fontSize: '11px', marginTop: '6px', opacity: 0.8 }}>
          대한민국의 모든 공모전, 단 하나도 놓치지 마세요!
        </div>
      </div>

      {activeTab === 'home' && (
        <div style={{ padding: '20px' }}>
          {homeMyProjects.length > 0 && (
            <div style={{ background: colors.primary, color: 'white', padding: '18px', borderRadius: '20px', marginBottom: '25px', boxShadow: '0 5px 15px rgba(233,30,99,0.3)' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '8px' }}>
                🚀 나의 공모전 리스트
              </div>
              {homeMyProjects.slice(0, 3).map((p, idx) => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: idx !== 0 ? '10px' : '0' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{p.target}</span>
                  <span style={{ fontSize: '18px', fontWeight: '900' }}>D-{calculateDDay(p.deadline)}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '25px' }}>
            {['영화', '드라마', '웹툰/웹소설', '스토리'].map(g => (
              <button 
                key={g} 
                onClick={() => { setSelectedGenre(g); setActiveTab('discovery'); }} 
                style={{ padding: '28px 10px', background: 'white', border: `1px solid ${colors.grid}`, borderRadius: '22px', color: colors.accent, fontWeight: 'bold', fontSize: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
              >
                {g}
              </button>
            ))}
          </div>

          <div style={{ background: colors.complementaryBg, padding: '20px', borderRadius: '25px', border: `2px solid ${colors.complementary}` }}>
            <h4 style={{ margin: '0 0 15px 0', color: colors.complementary, display: 'flex', alignItems: 'center' }}>
              🗓️ 마감 임박 (7일 내)
            </h4>
            {contestData.filter(c => { const dday = calculateDDay(c.deadline); return dday <= 7 && dday >= 0; }).map(c => {
              const info = getDynamicInfo(c);
              return (
                <div key={c.id} style={{fontSize: '14px', marginBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '6px', display: 'flex', justifyContent: 'space-between'}}>
                  <span style={{color: colors.complementary, fontWeight: 'bold'}}>{info.title}</span>
                  <span style={{color: colors.danger, fontWeight: '900'}}>D-{calculateDDay(c.deadline)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'discovery' && (
        <div style={{ padding: '20px' }}>
          <h3 style={{ color: colors.accent, margin: '0 0 20px 0', fontSize: '20px' }}>
            {selectedGenre || '전체'} 공모전 리스트
          </h3>
          {contestData
            .filter(c => !selectedGenre || c.type.includes(selectedGenre))
            .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
            .map(c => {
              const info = getDynamicInfo(c);
              return (
                <div key={c.id} style={{ background: 'white', padding: '20px', borderRadius: '22px', marginBottom: '18px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '11px', color: colors.primary, fontWeight: 'bold', marginBottom: '6px' }}>
                    {c.type} | 상금 {c.prize.toLocaleString()}원
                  </div>
                  <h4 style={{margin: '0 0 8px 0', fontSize: '17px', lineHeight: '1.3'}}>{info.title}</h4>
                  <p style={{fontSize: '13px', color: colors.danger, fontWeight: 'bold', marginBottom: '15px'}}>
                    마감일: {c.deadline} (D-{calculateDDay(c.deadline)})
                  </p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => window.open(info.url, '_blank')} 
                      style={{ flex: 1, padding: '12px', background: 'white', color: colors.primary, border: `1.5px solid ${colors.primary}`, borderRadius: '12px', fontSize: '13px', fontWeight: 'bold' }}
                    >
                      공고 확인
                    </button>
                    <button 
                      onClick={() => addToMyRoom(c)} 
                      style={{ flex: 1, padding: '12px', background: colors.primary, color: 'white', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold' }}
                    >
                      내 공모 등록
                    </button>
                  </div>
                </div>
              );
            })
          }
        </div>
      )}

      {activeTab === 'myroom' && (
        <div style={{ padding: '20px' }}>
          <h3 style={{ color: colors.accent, marginBottom: '20px', fontSize: '20px' }}>✍️ 나의 집필실</h3>
          {allSortedProjects.length === 0 ? (
            <p style={{textAlign:'center', color:'#999', marginTop:'50px'}}>등록된 프로젝트가 없습니다.</p>
          ) : (
            allSortedProjects.map(proj => {
              const progress = calculateTotalProgress(proj.steps);
              const dday = calculateDDay(proj.deadline);
              const currentAlarm = proj.alarmSettings || { 14: true, 7: true, 3: true, 1: true };

              return (
                <div key={proj.id} style={{ background: 'white', borderRadius: '26px', border: `2px solid ${colors.grid}`, overflow: 'hidden', marginBottom: '22px', boxShadow: '0 6px 15px rgba(0,0,0,0.03)' }}>
                  <div style={{ padding: '22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
                      <span style={{ color: colors.primary }}>{proj.target}</span>
                      <span style={{ color: dday < 0 ? '#999' : colors.danger }}>{dday < 0 ? '마감됨' : `D-${dday}`}</span>
                    </div>
                    <h4 style={{ margin: '0 0 15px 0', fontSize: '19px' }}>{proj.title}</h4>
                    
                    <div style={{ marginBottom: '15px', background: '#fdf2f5', padding: '12px', borderRadius: '15px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 'bold', color: colors.accent, marginBottom: '8px' }}>🔔 마감 알림 개별 설정</div>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        {[14, 7, 3, 1].map(day => (
                          <button
                            key={day}
                            onClick={() => toggleAlarmSetting(proj.id, day)}
                            style={{
                              flex: 1, border: 'none', borderRadius: '8px', padding: '6px 0', fontSize: '10px', fontWeight: 'bold',
                              background: currentAlarm[day] ? colors.accent : '#ddd',
                              color: 'white',
                              cursor: 'pointer'
                            }}
                          >
                            {/* [수정] 버튼 텍스트 변경: "2주전", "1주전", "3일전", "1일전" */}
                            {day === 14 ? '2주전' : day === 7 ? '1주전' : day === 3 ? '3일전' : '1일전'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ width: '100%', height: '12px', background: '#f2f2f2', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${progress}%`, height: '100%', background: colors.primary, transition: 'width 0.5s ease-in-out' }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', alignItems: 'center' }}>
                      <span 
                        style={{ fontSize: '12px', color: '#bbb', cursor: 'pointer', textDecoration: 'underline' }} 
                        onClick={() => setDeleteConfirmId(proj.id)}
                      >
                        프로젝트 삭제
                      </span>
                      <span style={{ fontSize: '15px', color: colors.primary, fontWeight: 'bold' }}>{progress}% 완료</span>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', padding: '15px', background: '#fffcfd' }}>
                    {[
                      {id:'logline', l:'로그라인'}, {id:'synopsis', l:'시놉시스'}, {id:'treatment', l:'트리트먼트'}, 
                      {id:'firstDraft', l:'초고'}, {id:'finalDraft', l:'완고'}, {id:'submission', l:'제출고'}
                    ].map(s => (
                      <button 
                        key={s.id} 
                        onClick={() => toggleStep(proj.id, s.id)} 
                        style={{ 
                          padding: '12px 0', 
                          fontSize: '11px', 
                          fontWeight: 'bold', 
                          borderRadius: '12px', 
                          border: proj.steps[s.id] ? 'none' : `1px solid ${colors.primary}`, 
                          background: proj.steps[s.id] ? colors.primary : 'white', 
                          color: proj.steps[s.id] ? 'white' : colors.primary 
                        }}
                      >
                        {s.l}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === 'learning' && (
        <div style={{ padding: '20px' }}>
          <h3 style={{ color: colors.accent, marginBottom: '20px', fontSize: '20px' }}>📚 거장의 서재 (상세 작법)</h3>
          {expandedRef === null ? (
            referenceBooks.map((ref, i) => (
              <div 
                key={i} 
                onClick={() => setExpandedRef(i)} 
                style={{ 
                  background: 'white', 
                  padding: '22px', 
                  borderRadius: '22px', 
                  marginBottom: '18px', 
                  borderLeft: `10px solid ${colors.primary}`, 
                  cursor: 'pointer', 
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)' 
                }}
              >
                <div style={{fontSize:'11px', fontWeight:'bold', color:colors.primary, marginBottom:'6px'}}>[{ref.category}]</div>
                <h4 style={{margin:'0 0 10px 0', fontSize:'18px'}}>{ref.book}</h4>
                <p style={{fontSize:'13px', color:'#666', lineHeight:'1.4', margin:0}}>{ref.summary}</p>
                <div style={{textAlign:'right', fontSize:'11px', marginTop:'12px', color:colors.primary, fontWeight:'bold'}}>
                  자세히 보기 →
                </div>
              </div>
            ))
          ) : (
            <div style={{ background: 'white', padding: '25px', borderRadius: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <button 
                onClick={() => setExpandedRef(null)} 
                style={{ border:'none', background:colors.soft, padding:'8px 15px', borderRadius:'12px', color:colors.accent, fontWeight:'bold', marginBottom:'20px' }}
              >
                ← 목록으로
              </button>
              <h3 style={{color:colors.accent, margin:'0 0 15px 0', borderBottom:`2px solid ${colors.soft}`, paddingBottom:'10px'}}>
                {referenceBooks[expandedRef].book}
              </h3>
              <p style={{fontSize: '14px', color: '#555', marginBottom: '25px', paddingBottom: '20px', borderBottom: '1px solid #eee', lineHeight: '1.5'}}>
                {referenceBooks[expandedRef].summary}
              </p>
              <div style={{marginTop:'20px'}}>
                {referenceBooks[expandedRef].steps.map((s, idx) => (
                  <div key={idx} style={{fontSize:'14px', marginBottom:'15px', lineHeight:'1.6', display:'flex', gap:'10px'}}>
                    <span style={{color:colors.primary, fontWeight:'bold', flexShrink:0}}>
                      {idx+1}.
                    </span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, width: '100%', maxWidth: '400px', margin: '0 auto', height: '70px', background: 'white', display: 'flex', borderTop: `1px solid #f0f0f0`, zIndex: 100, paddingBottom: '5px' }}>
        {[
          { id: 'home', l: '홈', i: '🏠' }, 
          { id: 'discovery', l: '찾기', i: '🔍' }, 
          { id: 'myroom', l: '집필실', i: '✍️' }, 
          { id: 'learning', l: '학습실', i: '📚' }
        ].map(t => (
          <button 
            key={t.id} 
            onClick={() => setActiveTab(t.id)} 
            style={{ 
              flex: 1, 
              border: 'none', 
              background: activeTab === t.id ? colors.soft : 'white', 
              color: activeTab === t.id ? colors.primary : '#bbb', 
              fontSize: '12px', 
              fontWeight: 'bold', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center', 
              transition: '0.3s' 
            }}
          >
            <span style={{fontSize: '20px', marginBottom: '4px'}}>{t.i}</span>
            {t.l}
          </button>
        ))}
      </nav>
    </div>
  );
}
