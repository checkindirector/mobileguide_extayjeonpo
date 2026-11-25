/* Airport sources rechecked 2026-11-24; journey times remain planning estimates. */
(() => {
  const D=window.EXTAY,L=D.L,a=D.airport;
  const rail=a.options.find(x=>x.id==='rail'),bus=a.options.find(x=>x.id==='bus'),taxi=a.options.find(x=>x.id==='taxi');
  rail.fare=L('약 1,600–1,800원 / 1인','About ₩1,600–1,800 / person','約1,600～1,800ウォン／人','约1,600–1,800韩元／人','約1,600–1,800韓元／人');
  rail.links[1].url='https://www2.humetro.busan.kr/homepage/default/page/subLocation.do?menu_no=100101050301';
  rail.links[1].title=L('공식 환승 운임','Official transfer fares','公式乗換運賃','官方换乘票价','官方轉乘票價');
  const node=(kind,title,body)=>({kind,title,body});
  const airport=L('김해공항','Gimhae Airport','金海空港','金海机场','金海機場');
  const stay=L('익스테이 전포','EXTAY JEONPO','EXTAY JEONPO','EXTAY JEONPO','EXTAY JEONPO');
  const airportBus='https://www.airport.co.kr/gimhae/cms/frCon/index.do?MENU_ID=170&CONTENTS_NO=1';
  a.guide={
    title:L('김해공항 교통편','Gimhae Airport transfers','金海空港アクセス','金海机场交通','金海機場交通'),
    lead:L('철도·리무진 버스·택시 경로를 확인하세요.','Rail, airport bus and taxi routes at a glance.','鉄道・空港バス・タクシーのルートをご案内。','查看轨道交通、机场巴士及出租车路线。','查看軌道交通、機場巴士及計程車路線。'),
    labels:{
      fromLabel:L('출발','From','出発','出发','出發'),
      toLabel:L('도착','To','到着','到达','抵達'),
      transportPreview:L('철도 · 리무진 버스 · 택시 경로 보기','Rail · airport bus · taxi routes','鉄道・空港バス・タクシーのルート','轨道交通·机场巴士·出租车路线','軌道交通・機場巴士・計程車路線'),
      closeDirection:L('이 방향의 안내 접기','Close this direction’s guide','この方向の案内を閉じる','收起此方向指南','收起此方向指南'),
      fareShort:L('요금','Fare','料金','费用','費用'),
      timeShort:L('소요 시간','Travel time','所要時間','所需时间','所需時間'),
      arrivalGuide:L('익스테이 전포로\n오시는 길','Getting to EXTAY JEONPO','EXTAY JEONPOへのアクセス','前往EXTAY JEONPO','前往EXTAY JEONPO'),
      departureGuide:L('김해공항으로\n가시는 길','Getting to Gimhae Airport','金海空港へのアクセス','前往金海机场','前往金海機場'),
      jumpGuide:L('안내로 바로 이동','Go to this guide','この案内へ移動','前往此指南','前往此指南'),
      openGuide:L('이용 방법 보기','View instructions','利用方法を見る','查看乘车指南','查看乘車指南'),
      hideGuide:L('이용 방법 접기','Hide instructions','利用方法を閉じる','收起乘车指南','收起乘車指南'),
      closeGuide:L('안내 접고 교통편 목록 보기','Close guide and return to options','案内を閉じて交通手段の一覧へ','收起指南，返回交通方式列表','收起指南，返回交通方式列表'),
      walkToStay:L('익스테이 전포까지 도보 길 보기','Walking route to EXTAY JEONPO','EXTAY JEONPOまでの徒歩ルート','查看步行至EXTAY JEONPO路线','查看步行至EXTAY JEONPO路線'),
      walkToStop:L('정류소까지 도보 길 보기','Walking route to the bus stop','停留所までの徒歩ルート','查看步行至站点路线','查看步行至站點路線'),
      direction:L('이동 방향','Travel direction','移動方向','出行方向','移動方向'),
      arrival:L('김해공항 → 익스테이 전포','Gimhae Airport → EXTAY JEONPO','金海空港 → EXTAY JEONPO','金海机场 → EXTAY JEONPO','金海機場 → EXTAY JEONPO'),
      departure:L('익스테이 전포 → 김해공항','EXTAY JEONPO → Gimhae Airport','EXTAY JEONPO → 金海空港','EXTAY JEONPO → 金海机场','EXTAY JEONPO → 金海機場'),
      methods:L('교통편 선택','Choose transport','交通手段を選択','选择交通方式','選擇交通方式'),
      compare:L('한눈에 비교','Compare at a glance','ひと目で比較','一目了然','一目瞭然'),
      fare:L('예상 요금','Planning fare','料金の目安','参考费用','參考費用'),
      time:L('이동 + 대기','Travel + waiting','移動＋待ち時間','行程＋等候','行程＋等候'),
      basis:L('성인 편도 · 공항청사 ↔ 익스테이 전포 1층의 도보 포함 예상입니다. 대기·항공 수속은 별도. 리무진은 차량 약 50분 + 도보 약 10–15분을 합산한 계획용 시간입니다.','Adult one-way travel between the airport terminal and the building, including walking. Waiting and airport formalities are extra. Bus estimate combines about 50 min riding and 10–15 min walking.','大人片道・空港ターミナルとEXTAY JEONPOの建物間、徒歩込みの目安。待ち時間・空港手続きは別です。バスは乗車約50分＋徒歩約10～15分を合算。','成人单程，含航站楼至EXTAY JEONPO楼下的步行，不含等候及机场手续。巴士按乘车约50分钟加步行约10–15分钟估算。','成人單程，含航廈至EXTAY JEONPO樓下的步行，不含等候及機場手續。巴士依乘車約50分鐘加步行約10–15分鐘估算。'),
      route:L('이동 경로','Your route','移動ルート','出行路线','移動路線'),
      boarding:L('탑승 위치 · 도착 안내','Boarding & arrival','乗り場・到着案内','乘车位置·到达指引','乘車位置・抵達指引'),
      conditions:L('요금 · 운행 · 수하물 자세히','Fares, services & luggage','運賃・運行・荷物の詳細','票价·运营·行李详情','票價・營運・行李詳情'),
      official:L('공식 안내','Official information','公式案内','官方说明','官方說明'),
      stayMap:L('익스테이 전포 지도 보기','Open EXTAY JEONPO map','EXTAY JEONPOの地図を見る','查看EXTAY JEONPO地图','查看EXTAY JEONPO地圖'),
      stopMap:L('부전 BRT 정류소','Bujeon BRT stop','釜田BRT停留所','釜田BRT站','釜田BRT站'),
      walkMap:L('정류소 ↔ 익스테이 전포 지도','Stop ↔ EXTAY JEONPO map','停留所 ↔ EXTAY JEONPOの地図','站点 ↔ EXTAY JEONPO地图','站點 ↔ EXTAY JEONPO地圖'),
      walkPhotos:L('부전역·익스테이 전포 사진 안내','Bujeon & EXTAY JEONPO photo guide','釜田駅・EXTAY JEONPOの写真案内','釜田站·EXTAY JEONPO照片指引','釜田站・EXTAY JEONPO照片指引'),
      book:L('시간표 확인·예매하기','Check times & book','時刻確認・予約する','查时刻表并订票','查時刻表並訂票'),
      terminalMap:L('공항 승차장 안내도','Airport boarding maps','空港乗り場案内図','机场乘车位置图','機場乘車位置圖'),
      driver:L('기사님께 보여주세요','Show your driver','運転手に見せてください','请向司机出示','請向司機出示'),
      domestic:L('국내선 주소 복사','Copy domestic terminal','国内線の住所をコピー','复制国内航站楼','複製國內航廈'),
      international:L('국제선 주소 복사','Copy international terminal','国際線の住所をコピー','复制国际航站楼','複製國際航廈'),
      checked:L('공식 안내 확인 2026.11.24 · 요금·운행은 이용일에 다시 확인해 주세요.','Official sources checked 24 Nov 2026. Recheck fares and services for your travel date.','公式案内確認：2026年11月24日。利用日の運賃・運行を再確認してください。','官方资料核对：2026.11.24。请再次确认出行当天的票价与运营。','官方資料核對：2026.11.24。請再次確認出行當天的票價與營運。'),
      flightNote:L('항공권의 터미널과 항공사 권장 공항 도착시간을 먼저 확인하세요. 아래 시간에는 체크인·보안검색이 포함되지 않습니다.','Check your flight terminal and your airline’s recommended airport arrival time. Check-in and security are not included below.','航空券のターミナルと航空会社推奨の空港到着時刻を確認。以下にチェックイン・保安検査の時間は含みません。','先确认航站楼及航司建议抵达机场的时间。以下不含值机与安检。','先確認航廈及航空公司建議抵達機場的時間。以下不含報到與安檢。')
    },
    modes:{
      lrt:L('경전철','Light rail','軽電鉄','轻轨','輕軌'),line2:L('도시철도 2호선','Metro Line 2','地下鉄2号線','地铁2号线','地鐵2號線'),line1:L('도시철도 1호선','Metro Line 1','地下鉄1号線','地铁1号线','地鐵1號線'),walk:L('도보','Walk','徒歩','步行','步行'),bus:L('리무진 2','Limousine 2','リムジン2','巴士2号','巴士2號'),taxi:L('택시','Taxi','タクシー','出租车','計程車')
    },
    methods:{
      rail:{name:L('철도','Rail','鉄道','轨道交通','軌道交通'),time:L('60–80분 + 대기','60–80 min + wait','60～80分＋待ち','60–80分钟＋等候','60–80分鐘＋等候'),note:L('도보 포함 · 환승 2회','Includes walking · 2 changes','徒歩含む・乗換2回','含步行·换乘2次','含步行・轉乘2次')},
      bus:{name:L('리무진 버스','Airport bus','空港リムジン','机场巴士','機場巴士'),time:L('60–70분 + 대기','60–70 min + wait','60～70分＋待ち','60–70分钟＋等候','60–70分鐘＋等候'),note:L('도보 포함 · 배차 약 60–80분','Walk included · buses every 60–80 min','徒歩込み・約60～80分間隔','含步行·约60–80分钟一班','含步行・約60–80分鐘一班')},
      taxi:{name:L('택시','Taxi','タクシー','出租车','計程車'),time:L('30–50분 + 대기','30–50 min + wait','30～50分＋待ち','30–50分钟＋等候','30–50分鐘＋等候'),note:L('인원·짐에 맞는 차량 선택','Fare per car · choose size for your group','1台の料金・人数と荷物に合う車を','按车收费·按人数行李选择车型','按車收費・依人數行李選擇車型')}
    },
    notices:{
      rail:L('동일한 교통카드로 승·하차 태그 · 사상역에서 30분 이내 환승. 늦은 시간에는 전체 환승 경로의 막차를 확인하세요.','Tap in and out with the same transport card; transfer at Sasang within 30 minutes. For late trips, check the last connecting services.','同じ交通カードで乗降し、沙上では30分以内に乗換。夜は乗換先を含む終電を確認。','全程使用同一交通卡，沙上下车后30分钟内换乘。夜间需确认各段末班车。','全程使用同一交通卡，沙上下車後30分鐘內轉乘。夜間需確認各段末班車。'),
      bus:L('배차 약 60–80분 · 현금 불가 · 시간표를 먼저 확인하세요. 부전 BRT 정류소는 도시철도 부전역 2번 출구와 다른 위치입니다.','About 60–80 minutes between buses. No cash. Check the timetable first. Bujeon BRT stop is not Metro Bujeon Exit 2.','約60～80分間隔・現金不可。先に時刻表を確認。釜田BRT停留所は地下鉄2番出口とは別の場所です。','约60–80分钟一班，不收现金，请先查时刻表。釜田BRT站与地铁2号出口位置不同。','約60–80分鐘一班，不收現金，請先查時刻表。釜田BRT站與地鐵2號出口位置不同。'),
      taxi:L('익스테이 전포는 엘리베이터 없는 5층입니다. 차량은 인원과 캐리어 수에 맞게 선택하고, 짐 운반 서비스는 3일 전까지 호스트에게 문의해 주세요.','EXTAY JEONPO is on the 5th floor with no elevator. Choose a car for your group and bags; ask your host about carrying help at least 3 days ahead.','EXTAY JEONPOはエレベーターなしの5階。人数・荷物に合う車を選び、荷物運搬は3日前までにホストへ相談。','EXTAY JEONPO位于无电梯5楼。按人数行李选择车辆，搬运服务请提前至少3天咨询房东。','EXTAY JEONPO位於無電梯5樓。依人數行李選擇車輛，搬運服務請提前至少3天洽詢房東。')
    },
    journeys:{
      arrival:{
        rail:{from:airport,to:stay,route:[node('lrt',L('공항역 → 사상역','Airport → Sasang','空港駅 → 沙上','机场站 → 沙上','機場站 → 沙上'),rail.steps[0]),node('line2',L('사상역 → 서면역','Sasang → Seomyeon','沙上 → 西面','沙上 → 西面','沙上 → 西面'),rail.steps[1]),node('line1',L('서면역 → 부전역','Seomyeon → Bujeon','西面 → 釜田','西面 → 釜田','西面 → 釜田'),rail.steps[2]),node('walk',L('부전역 → 익스테이 전포','Bujeon → EXTAY JEONPO','釜田 → EXTAY JEONPO','釜田 → EXTAY JEONPO','釜田 → EXTAY JEONPO'),rail.steps[3])]},
        bus:{from:airport,to:stay,hours:'07:20–21:30',route:[node('bus',L('공항 1층 → 리무진2 탑승','Airport 1F → Limousine 2','空港1階 → リムジン2','机场1楼 → 巴士2号','機場1樓 → 巴士2號'),bus.steps[1]),node('bus',L('부전역 BRT 정류소 하차','Alight at Bujeon BRT','釜田駅BRTで下車','釜田BRT站下车','釜田BRT站下車'),L('서면·부전 노선인지 확인한 뒤 탑승하세요. QR 예매권 또는 교통카드를 사용하며, 현장 탑승은 잔여 좌석이 있을 때 가능합니다.','Check the Seomyeon–Bujeon route before boarding. Use a QR ticket or transport card; walk-up travel needs an available seat.','西面・釜田線を確認して乗車。QR券か交通カードを利用し、当日乗車は空席がある場合のみ。','确认西面·釜田线路后乘车。使用QR票或交通卡，现场乘车需有余位。','確認西面・釜田路線後乘車。使用QR票或交通卡，現場乘車需有餘位。')),node('walk',L('정류소 → 익스테이 전포','Bus stop → EXTAY JEONPO','停留所 → EXTAY JEONPO','站点 → EXTAY JEONPO','站點 → EXTAY JEONPO'),bus.steps[3])]},
        taxi:{from:airport,to:stay,route:[node('taxi',airport,taxi.steps[0]),node('taxi',stay,taxi.steps[1])],driver:'부산광역시 부산진구 동성로 113, 익스테이 전포'}
      },
      departure:{
        rail:{from:stay,to:airport,route:[node('walk',L('익스테이 전포 → 부전역','EXTAY JEONPO → Bujeon','EXTAY JEONPO → 釜田駅','EXTAY JEONPO → 釜田站','EXTAY JEONPO → 釜田站'),L('부전역으로 이동합니다. 큰 짐이 있다면 호스트가 안내한 6번 출구 엘리베이터를 이용해 주세요.','Walk to Bujeon. For large bags, use the elevator at Exit 6 recommended by your host.','釜田駅へ。大きな荷物にはホスト案内の6番出口エレベーターをご利用ください。','步行至釜田站，行李较大时可使用房东指引的6号出口电梯。','步行至釜田站，行李較大時可使用房東指引的6號出口電梯。')),node('line1',L('부전역 → 서면역','Bujeon → Seomyeon','釜田 → 西面','釜田 → 西面','釜田 → 西面'),L('1호선 다대포해수욕장 방면으로 한 정거장 이동합니다.','Take Line 1 toward Dadaepo Beach for one stop.','1号線・多大浦海水浴場方面に1駅。','乘1号线多大浦海水浴场方向一站。','搭1號線多大浦海水浴場方向一站。')),node('line2',L('서면역 → 사상역','Seomyeon → Sasang','西面 → 沙上','西面 → 沙上','西面 → 沙上'),L('2호선 양산 방면으로 환승하고 사상역에서 내립니다.','Change to Line 2 toward Yangsan; get off at Sasang.','2号線・梁山方面に乗換え、沙上で下車。','换2号线梁山方向，在沙上下车。','轉2號線梁山方向，在沙上下車。')),node('lrt',L('사상역 → 공항역','Sasang → Airport','沙上 → 空港駅','沙上 → 机场站','沙上 → 機場站'),L('부산김해경전철 가야대 방면 → 공항역. 항공권에 맞는 국내선·국제선 청사로 이동합니다.','Take the light rail toward Kaya University to Airport. Continue to the domestic or international terminal shown on your ticket.','軽電鉄・加耶大方面で空港駅へ。航空券に合う国内線・国際線ターミナルへ進みます。','乘轻轨加耶大方向至机场站，再前往机票对应的国内或国际航站楼。','搭輕軌加耶大方向至機場站，再前往機票對應的國內或國際航廈。'))]},
        bus:{from:stay,to:airport,hours:'06:00–20:00',route:[node('walk',L('익스테이 전포 → 부전역 BRT 정류소','EXTAY JEONPO → Bujeon BRT stop','EXTAY JEONPO → 釜田駅BRT停留所','EXTAY JEONPO → 釜田BRT站','EXTAY JEONPO → 釜田BRT站'),L('정류소 지도와 버스타고에서 공항행 탑승 위치를 확인하세요. 도시철도 부전역 2번 출구와는 다른 승하차 지점입니다.','Check the airport-bound boarding point on the stop map and Bustago. This is different from Metro Bujeon Exit 2.','地図とBustagoで空港行き乗り場を確認。地下鉄2番出口とは別の場所です。','在站点地图和Bustago确认机场方向乘车位置，与地铁2号出口不同。','在站點地圖和Bustago確認機場方向乘車位置，與地鐵2號出口不同。')),node('bus',L('리무진2 · 김해공항행','Limousine 2 · airport-bound','リムジン2・金海空港行き','巴士2号·金海机场方向','巴士2號・金海機場方向'),L('‘부전역 → 김해공항’ 출발편을 조회·예매하세요. 현장 카드 탑승은 잔여 좌석이 있을 때 가능하며 현금은 받지 않습니다.','Find and book Bujeon Station → Gimhae Airport. Walk-up card boarding needs a free seat; no cash.','釜田駅→金海空港の便を予約。当日のカード乗車は空席がある場合のみ、現金不可。','查询预订“釜田站→金海机场”。现场刷卡乘车需有余位，不收现金。','查詢預訂「釜田站→金海機場」。現場刷卡乘車需有餘位，不收現金。')),node('bus',airport,L('항공권의 국내선·국제선 터미널을 확인하고 해당 청사에서 내립니다.','Check your ticket and get off at the correct domestic or international terminal.','航空券を確認し、国内線・国際線の該当ターミナルで下車。','确认机票，在对应的国内或国际航站楼下车。','確認機票，在對應的國內或國際航廈下車。'))]},
        taxi:{from:stay,to:airport,route:[node('taxi',stay,L('출발 전 국내선·국제선 터미널을 확인하고 인원·짐에 맞는 차량을 호출하세요.','Confirm the domestic/international terminal, then request a suitable car for your group and bags.','国内線・国際線を確認し、人数と荷物に合う車を配車。','先确认国内或国际航站楼，再按人数行李叫车。','先確認國內或國際航廈，再依人數行李叫車。')),node('taxi',airport,L('기사님께 항공권의 터미널을 보여주고 출발층 하차 위치를 확인하세요.','Show your flight terminal to the driver and confirm the departures drop-off point.','航空券のターミナルを運転手に見せ、出発階の降車場所を確認。','向司机出示航站楼，确认出发层下车位置。','向司機出示航廈，確認出發層下車位置。'))],driver:'김해국제공항 · 국내선 / 국제선 출발층'}
      }
    },
    boardingSlides:[
      {file:'assets/images/gimhae-domestic-bus.jpg',width:2306,height:1450,title:L('국내선 1층 · 공식 대중교통 배치도','Domestic 1F · official transport map','国内線1階・公式交通案内図','国内航站楼1楼·官方交通图','國內航廈1樓・官方交通圖'),source:airportBus},
      {file:'assets/images/gimhae-international-bus.png',width:1361,height:1480,title:L('국제선 1층 · 공식 대중교통 배치도','International 1F · official transport map','国際線1階・公式交通案内図','国际航站楼1楼·官方交通图','國際航廈1樓・官方交通圖'),source:airportBus}
    ],
    boardingNote:L('안내도를 확대해 리무진 승차 구역을 확인하세요. 공항 1층 4번 게이트의 버스매표소·발권기는 승차홈과 구분되며, 실제 리무진2 승차 위치는 현장 안내와 함께 확인해 주세요.','Enlarge the map to find the limousine area. The bus ticket office/machines at 1F Gate 4 are separate from boarding bays; follow current signs for Limousine 2.','図を拡大してリムジン区画を確認。1階4番ゲートの売場・券売機と乗り場は別です。リムジン2は現地の案内も確認。','放大地图查看机场巴士区域。1楼4号门售票处、售票机与乘车站台不同，请结合现场标识确认巴士2号位置。','放大地圖查看機場巴士區域。1樓4號門售票處、售票機與乘車月台不同，請配合現場標示確認巴士2號位置。'),
    fareNote:L('철도는 성인 교통카드의 정상 환승 기준 예상 범위입니다. 1회권 개별 구매·환승 조건에 따라 합계가 달라집니다.','Rail estimate assumes valid adult transport-card transfers; separate single tickets or different transfer conditions change the total.','鉄道は大人交通カードの通常乗換を前提とした目安。各線の1回券や乗換条件により合計は異なります。','轨道交通按成人交通卡正常换乘估算，分别购票或换乘条件不同会改变总价。','軌道交通依成人交通卡正常轉乘估算，分別購票或轉乘條件不同會改變總價。')
  };
  const arrivalBus=a.guide.journeys.arrival.bus,departureBus=a.guide.journeys.departure.bus;
  arrivalBus.stopCode='05708';departureBus.stopCode='05707';
  arrivalBus.route[1].title=L('부전시장·부전몰 05708 하차','Alight: Bujeon Market / Mall 05708','釜田市場・釜田モール05708で下車','釜田市场·釜田商城05708下车','釜田市場・釜田商場05708下車');
  arrivalBus.route[2].body=L('부전시장·부전몰 05708에서 익스테이 전포까지 도보 약 10–15분. 공항행 부전역 05707 및 도시철도 부전역 2번 출구와는 다른 승하차 지점입니다. 방향에 맞는 도보 지도를 열어주세요.','Walk about 10–15 min from Bujeon Market / Mall 05708. This differs from airport-bound Bujeon 05707 and Metro Bujeon Exit 2. Open the map for your direction.','釜田市場・釜田モール05708から徒歩約10～15分。空港行き釜田05707・地下鉄2番出口とは別の場所です。方向別の徒歩地図をご利用ください。','从釜田市场·釜田商城05708步行约10–15分钟。此处与机场方向釜田05707及地铁2号出口不同，请使用对应方向步行地图。','從釜田市場・釜田商場05708步行約10–15分鐘。此處與機場方向釜田05707及地鐵2號出口不同，請使用對應方向步行地圖。');
  bus.steps[3]=arrivalBus.route[2].body;
  departureBus.route[0].title=L('익스테이 전포 → 부전역 BRT 05707','EXTAY JEONPO → Bujeon BRT 05707','EXTAY JEONPO → 釜田BRT05707','EXTAY JEONPO → 釜田BRT05707','EXTAY JEONPO → 釜田BRT05707');
  departureBus.route[0].body=L('도보 약 10–15분. 공항행은 부전역 중앙정류소 05707에서 탑승합니다. 공항에서 올 때 내리는 05708 및 도시철도 출구와는 다른 승하차 지점입니다.','Walk about 10–15 min to the airport-bound Bujeon central stop 05707. This differs from arrival stop 05708 and the Metro exits.','徒歩約10～15分。空港行きは釜田中央停留所05707から。到着時の05708・地下鉄出口とは別です。','步行约10–15分钟至机场方向釜田中央站05707，与抵达时05708及地铁出口不同。','步行約10–15分鐘至機場方向釜田中央站05707，與抵達時05708及地鐵出口不同。');
  a.guide.notices.bus=L('배차 약 60–80분 · 현금 불가. 공항에서 올 때는 05708 하차, 공항으로 갈 때는 05707 탑승입니다. 시간표와 방향별 도보 지도를 먼저 확인하세요.','About 60–80 min between buses; no cash. Alight at 05708 when arriving, board at 05707 when departing. Check the timetable and directional walking map.','約60～80分間隔・現金不可。空港からは05708で下車、空港へは05707から乗車。時刻表と方向別徒歩地図を確認。','约60–80分钟一班，不收现金。机场抵达在05708下车，前往机场在05707上车，请先查看时刻表及对应步行地图。','約60–80分鐘一班，不收現金。機場抵達在05708下車，前往機場在05707上車，請先查看時刻表及對應步行地圖。');
  a.guide.labels.stopMap=L('노선 · 정류소 확인','Route & live stops','路線・停留所を確認','路线·站点查询','路線・站點查詢');
  a.guide.labels.walkMap=L('정류소 ↔ 익스테이 전포 도보','Stop ↔ EXTAY JEONPO walk','停留所 ↔ EXTAY JEONPOの徒歩','站点 ↔ EXTAY JEONPO步行','站點 ↔ EXTAY JEONPO步行');
  arrivalBus.walkMap="https://map.naver.com/p/directions/3AH3vk,2z946q,%EB%B6%80%EC%A0%84%EC%8B%9C%EC%9E%A5.%EB%B6%80%EC%A0%84%EB%AA%B0,5002948,BUS_STATION/3AHihI,2z94dM,%EB%B6%80%EC%82%B0%20%EB%B6%80%EC%82%B0%EC%A7%84%EA%B5%AC%20%EB%8F%99%EC%84%B1%EB%A1%9C%20113,08230102,ADDRESS_POI/-/walk";
  departureBus.walkMap="https://map.naver.com/p/directions/3AHihI,2z94dM,%EB%B6%80%EC%82%B0%20%EB%B6%80%EC%82%B0%EC%A7%84%EA%B5%AC%20%EB%8F%99%EC%84%B1%EB%A1%9C%20113,08230102,ADDRESS_POI/3AH9Pz,2z9cmv,%EB%B6%80%EC%A0%84%EC%97%AD,5002946,BUS_STATION/-/walk";
  D.menuDescriptions.airport=L('김해공항 왕복 · 교통편 비교','Gimhae Airport · both directions','金海空港の往復・交通比較','往返金海机场·交通比较','往返金海機場・交通比較');
})();
