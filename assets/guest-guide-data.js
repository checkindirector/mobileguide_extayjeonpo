/* Sources checked 2026-11-11. Names and Korean addresses are retained for maps. */
(() => {
  const D=window.EXTAY,L=D.L;
  D.photoSizes=[[1707,1280],[1448,1086],[1086,1448],[1447,1087],[1448,1086],[1086,1448],[1086,1448],[1792,1344],[1800,1350],[1448,1086],[1452,1083],[1350,1800],[1350,1800],[1800,1350],[1440,1800],[1448,1086],[1086,1448],[1350,1800],[1800,1350],[1800,1349],[1800,1350],[1800,1352],[1448,1086],[1448,1086],[1448,1086],[1086,1448],[1086,1448],[1350,1800],[1350,1800],[1086,1448],[1800,1350],[1350,1800],[1350,1800],[1800,1350],[1350,1800],[1350,1800],[1350,1800],[1350,1800],[1350,1800],[1350,1800],[1350,1800],[1350,1800],[1350,1800],[1350,1800],[1350,1800],[1350,1800],[1350,1800],[1350,1800],[1350,1800],[1350,1800],[1800,1350],[1350,1800],[1350,1800],[1111,1800],[1350,1800],[1350,1800],[1350,1800],[1350,1800],[1350,1800]];
  const visit=(id,menu='201002001000')=>`https://www.visitbusan.net/index.do?lang_cd=ko&menuCd=DOM_000000${menu}&uc_seq=${id}`;
  const cafes=visit(2530,'202002001000');
  D.venueHours={
    sayeobaek:'12:00–23:00',fruto:'12:00–21:00',yeon:'11:00–22:00',haian:'12:00–22:00',
    songjeong:'24h',pohang:'24h','gijang-noodles':'09:00–21:00',chunha:'10:00–22:00',
    taehwa:'08:30–21:30','halmae-nakji':'09:30–20:50',gaegeum:'11:00–19:40',
    mugunghwa:'12:00–15:00 / 18:00–21:30',letemps:'12:00–15:00 / 18:00–21:00',
    leejaemo:'10:00–21:10',gaya:'10:30–21:30'
  };
  Object.assign(D.ui,{
    nearby:L('맛집 · 카페','Food & cafés','グルメ・カフェ','美食·咖啡馆','美食・咖啡館'),
    tours:L('관광지 · 추천 코스','Sights & itineraries','観光・モデルコース','景点·推荐路线','景點・推薦路線'),
    airport:L('공항 교통편','Airport transfer','空港アクセス','机场交通','機場交通'),
    diningIntro:L('한 끼도, 커피 한 잔도.','A good meal. A little coffee.','食事も、コーヒーも。','吃一顿，也喝一杯。','吃一頓，也喝一杯。'),
    diningLead:L('가까운 전포·서면부터 부산의 한 끼까지, 취향대로 골라보세요.','From nearby Jeonpo and Seomyeon to a meal across Busan.','近くの全浦・西面から、釜山各地の一食まで。','从附近田浦、西面，到釜山各处的美味。','從附近田浦、西面，到釜山各處的美味。'),
    sightsIntro:L('오늘은, 어디까지 가볼까요.','Where will today take you?','今日は、どこまで行こう。','今天，想走到哪里？','今天，想走到哪裡？'),
    sightsLead:L('동네 산책부터 바다와 오래된 골목까지. 20곳을 여행의 속도에 맞춰 골라보세요.','Twenty places, from neighborhood walks to the coast and old town.','街の散歩、海、古い路地。20か所から自分のペースで。','从街区散步到海边老巷，20处景点随心选择。','從街區散步到海邊老巷，20處景點隨心選擇。'),
    placeSearch:L('가게·음식·지역 검색','Search names, food or areas','店名・料理・エリアを検索','搜索店名、美食、区域','搜尋店名、美食、區域'),
    sightSearch:L('관광지·지역 검색','Search sights or areas','観光地・エリアを検索','搜索景点、区域','搜尋景點、區域'),
    placeDetails:L('주소 · 영업정보 · 지도','Address, hours & maps','住所・営業情報・地図','地址·营业信息·地图','地址・營業資訊・地圖'),
    signatureDish:L('이곳에서 맛볼 것','What to order','おすすめの一品','推荐品尝','推薦品嚐'),
    access:L('찾아가는 기준점','Getting oriented','アクセスの目安','交通参考','交通參考'),
    visitTip:L('방문 팁','Before you go','訪問のヒント','出发前参考','出發前參考'),
    addressLabel:L('주소','Address','住所','地址','地址'),
    hoursLabel:L('영업 · 운영 안내','Hours & availability','営業・開館情報','营业·开放信息','營業・開放資訊'),
    directions:L('숙소에서 길찾기','Directions from the stay','宿からのルート','从住宿出发导航','從住宿出發導航'),
    officialInfo:L('공식 소개 보기','Official information','公式案内を見る','查看官方介绍','查看官方介紹'),
    sourceNote:L('부산시 공식 관광자료를 바탕으로 고른 여행 제안입니다. 영업시간·휴무·메뉴·요금은 바뀔 수 있으니 방문 전 지도와 공식 안내를 확인해 주세요.','Selected using official Busan tourism information. Check maps and official pages for current hours, closures, menus and prices.','釜山市の公式観光情報を基にした提案です。営業時間・休業・メニュー・料金は訪問前にご確認ください。','根据釜山市官方旅游资料整理。营业时间、休息日、菜单和费用请出发前在地图及官方页面确认。','根據釜山市官方旅遊資料整理。營業時間、休息日、菜單和費用請出發前在地圖及官方頁面確認。'),
    checkOnMap:L('지도에서 당일 영업시간과 휴무를 확인해 주세요.','Check today’s opening hours and closures on the map.','当日の営業時間・休業は地図でご確認ください。','请在地图确认当天营业时间及休息日。','請在地圖確認當天營業時間及公休日。'),
    courses:L('하루를 엮는 네 가지 방법','Four ways to plan a day','一日をつなぐ4つのコース','四种方式，串起一天','四種方式，串起一天'),
    explorePlaces:L('장소별로 둘러보기','Explore all places','スポットから探す','按景点浏览','依景點瀏覽'),
    deviceJump:L('필요한 기기로 바로 가기','Jump to a device','機器を選ぶ','选择需要的设备','選擇需要的設備'),
    controls:L('사진 속 조작부','Controls in the photo','写真の操作部','照片中的控制器','照片中的控制器'),
    locationLabel:L('설치 위치','Location','設置場所','安装位置','安裝位置'),
    deviceHelp:L('작동하지 않으면 전원을 반복해 켜거나 설정을 초기화하지 말고 Airbnb 메시지로 문의해 주세요.','If a device does not work, contact your host through Airbnb rather than repeatedly restarting or resetting it.','動かない場合は再起動を繰り返したり初期化せず、Airbnbでホストへご連絡ください。','如无法运行，请通过Airbnb联系房东，避免反复重启或恢复出厂设置。','如無法運作，請透過Airbnb聯絡房東，避免反覆重啟或恢復原廠設定。'),
    updated:L('안내 확인 2026.11.11','Checked 11 Nov 2026','2026年11月11日確認','2026.11.11核对','2026.11.11核對')
  });
  D.placeCategories={
    dining:{all:D.ui.all,local:L('전포 · 서면','Jeonpo · Seomyeon','全浦・西面','田浦·西面','田浦・西面'),cafe:L('카페 · 디저트','Cafés & sweets','カフェ・スイーツ','咖啡·甜点','咖啡・甜點'),soup:L('국밥 · 한식','Soup & Korean','クッパ・韓国料理','汤饭·韩餐','湯飯・韓餐'),noodle:L('면 요리','Noodles','麺料理','面食','麵食'),special:L('색다른 한 끼','Something different','ひと味違う食事','换种口味','換種口味')},
    sights:{all:D.ui.all,local:L('동네 산책','Near the stay','近所の散歩','附近散步','附近散步'),sea:L('바다 · 풍경','Sea & scenery','海・風景','海边·风景','海邊・風景'),market:L('시장 · 원도심','Markets & old town','市場・旧市街','市场·老城区','市場・老城區'),culture:L('문화 · 실내','Culture & indoors','文化・屋内','文化·室内','文化・室內')}
  };
  const p=(id,ko,en,category,area,address,menu,body,source,near=false)=>({id,title:L(ko,en,ko,ko,ko),nameKo:ko,nameEn:en,category,area,address,menu,body,source,near,query:`${ko} ${address}`});
  D.dining=[
    p('bao','바오하우스','Baohaus','special','JEONPO','부산 부산진구 서전로38번길 62-9',L('바오 · 우육면','Bao buns · beef noodles','バオ・牛肉麺','刈包·牛肉面','刈包・牛肉麵'),L('골목 산책 중 들르기 좋은 대만식 한 끼.','A Taiwanese meal between walks around Jeonpo.','全浦の路地歩きの途中に台湾料理を。','田浦巷弄散步途中，来一餐台湾料理。','田浦巷弄散步途中，來一餐台灣料理。'),visit(2330),true),
    p('sayeobaek','사, 여백, 찻잔','Sa, Yeobaek, Chatjan','cafe','JEONPO','부산 부산진구 서전로67번길 20',L('커피 · 디저트','Coffee · desserts','コーヒー・スイーツ','咖啡·甜点','咖啡・甜點'),L('레트로 분위기 속에서 잠시 쉬어가는 카페.','A café with a nostalgic, retro atmosphere.','レトロな雰囲気のカフェでひと休み。','在复古氛围的咖啡馆歇歇脚。','在復古氛圍的咖啡館歇歇腳。'),cafes,true),
    p('fruto','프루토 프루타','Fruto Fruta','cafe','JEONPO','부산 부산진구 전포대로224번길 28',L('과일주스 · 스무디','Fruit juice · smoothies','フルーツジュース・スムージー','鲜果汁·冰沙','鮮果汁・冰沙'),L('과일을 고르는 재미가 있는 산뜻한 휴식.','A fresh-fruit stop for juice and smoothies.','果物を楽しむジュースとスムージーの店。','用鲜果汁或冰沙，为散步补充清爽。','用鮮果汁或冰沙，為散步補充清爽。'),cafes,true),
    p('yeon','연의양과','Yeon’s Pastry','cafe','JEONPO','부산 부산진구 동천로 56',L('에그타르트 · 다쿠아즈','Egg tarts · dacquoise','エッグタルト・ダックワーズ','蛋挞·达克瓦兹','蛋塔・達克瓦茲'),L('구움과자와 커피를 함께 고르는 디저트 시간.','A coffee break with baked sweets.','焼き菓子とコーヒーを楽しむ時間。','挑选烘焙甜点，搭配一杯咖啡。','挑選烘焙甜點，搭配一杯咖啡。'),cafes,true),
    p('haian','카페 하이안','Café Haian','cafe','JEONPO','부산 부산진구 서전로46번길 62-4',L('커피 · 케이크','Coffee · cake','コーヒー・ケーキ','咖啡·蛋糕','咖啡・蛋糕'),L('분수와 정원 분위기를 곁들이는 카페.','Coffee and cake in a garden-like setting.','噴水と庭のような空間を楽しむカフェ。','在带有喷泉与花园氛围的空间喝一杯。','在帶有噴泉與花園氛圍的空間喝一杯。'),cafes,true),
    p('songjeong','송정3대국밥','Songjeong 3 Dae Gukbap','soup','SEOMYEON','부산 부산진구 서면로68번길 33',L('돼지국밥 · 수육','Pork soup · boiled pork','豚クッパ・ゆで豚','猪肉汤饭·白切肉','豬肉湯飯・白切肉'),L('서면 국밥골목에서 든든하게 시작하는 한 끼.','A hearty bowl in Seomyeon’s pork-soup alley.','西面のクッパ通りでしっかり一食。','在西面汤饭街，吃一顿热乎的汤饭。','在西面湯飯街，吃一頓熱呼呼的湯飯。'),visit(1616,'201002002001'),true),
    p('pohang','포항돼지국밥','Pohang Dwaeji Gukbap','soup','SEOMYEON','부산 부산진구 서면로68번길 27',L('돼지국밥','Pork soup with rice','豚クッパ','猪肉汤饭','豬肉湯飯'),L('서면 먹자골목에서 고르는 부산식 국밥.','Another Busan pork-soup stop in central Seomyeon.','西面の食堂街にある釜山の豚クッパ店。','西面美食街里的另一家釜山汤饭选择。','西面美食街裡的另一家釜山湯飯選擇。'),'https://www.visitbusan.net/index.do?menuCd=DOM_000000201002004000&page_no=6',true),
    p('gijang-noodles','기장손칼국수','Gijang Son Kalguksu','noodle','SEOMYEON','부산 부산진구 서면로 56',L('손칼국수 · 김밥','Hand-cut noodles · gimbap','手打ち麺・キンパ','手工刀切面·紫菜包饭','手工刀切麵・紫菜包飯'),L('멸치 육수의 따뜻한 국수와 간단한 한 끼.','Warm hand-cut noodles in anchovy broth.','煮干しだしの温かい手打ち麺を。','用一碗凤尾鱼汤底的手工面暖暖胃。','用一碗鯷魚湯底的手工麵暖暖胃。'),visit(1541,'201002002001'),true),
    p('chunha','춘하추동','Chunha Chudong','noodle','BUJEON','부산 부산진구 서면문화로 48-1',L('물밀면 · 비빔밀면','Cold wheat noodles','水ミルミョン・ビビンミルミョン','水小麦冷面·拌冷面','水小麥冷麵・拌冷麵'),L('부전동에서 부산 밀면을 맛보고 싶을 때.','Try Busan-style wheat noodles in Bujeon.','釜田で釜山名物ミルミョンを味わうなら。','想在釜田品尝釜山小麦冷面时。','想在釜田品嚐釜山小麥冷麵時。'),visit(108),true),
    p('taehwa','태화육개장','Taehwa Yukgaejang','soup','BUJEON','부산 부산진구 서면문화로 18',L('육개장 · 수육','Spicy beef soup · boiled beef','ユッケジャン・ゆで肉','辣牛肉汤·白切肉','辣牛肉湯・白切肉'),L('시장 구경 전후, 뜨끈한 국물이 생각나는 날.','A warming beef-soup stop around Seomyeon.','市場歩きの前後に温かいスープを。','逛市场前后，来一碗热牛肉汤。','逛市場前後，來一碗熱牛肉湯。'),visit(2485,'201002004001'),true),
    p('tete','떼떼오네','Teteone','special','JEONPO','부산 부산진구 동성로25번길 35',L('와인 · 파스타 · 비프 타르타르','Wine · pasta · beef tartare','ワイン・パスタ・タルタル','葡萄酒·意面·牛肉塔塔','葡萄酒・義大利麵・牛肉塔塔'),L('조금 느긋한 저녁을 위한 캐주얼 와인 바.','A casual wine bar for a slower evening.','ゆっくり過ごす夜にカジュアルなワインバー。','想放慢晚餐节奏时，选一家休闲酒吧。','想放慢晚餐節奏時，選一家休閒酒吧。'),visit(1565,'201002002001'),true),
    p('halmae-nakji','원조할매낙지','Wonjo Halmae Nakji','special','BEOMIL','부산 부산진구 골드테마길 10',L('낙지볶음 · 낙곱새','Spicy octopus stew','タコ炒め・ナッコプセ','辣炒章鱼·章鱼肥肠虾锅','辣炒章魚・章魚肥腸蝦鍋'),L('조방낙지의 매콤한 한 냄비를 나누는 식사.','Share a spicy Jobang-style octopus stew.','辛いチョバン式タコ鍋を囲む食事。','围着一锅香辣的釜山章鱼料理。','圍著一鍋香辣的釜山章魚料理。'),visit(1621,'201002002001')),
    p('gaegeum','개금밀면','Gaegeum Milmyeon','noodle','GAEGEUM','부산 부산진구 가야공원로14번길 88-8',L('물밀면 · 비빔밀면','Cold wheat noodles','ミルミョン','小麦冷面','小麥冷麵'),L('부산진구 서쪽으로 나가는 날 곁들이기 좋은 밀면.','A wheat-noodle stop on the west side of Busanjin.','釜山鎮区の西側へ出かける日にミルミョンを。','前往釜山镇区西边时顺道品尝冷面。','前往釜山鎮區西邊時順道品嚐冷麵。'),visit(2430,'201002004001')),
    p('mugunghwa','무궁화','Mugunghwa','special','SEOMYEON','부산 부산진구 가야대로 772',L('한식 코스','Korean course dining','韓国料理コース','韩餐套餐','韓餐套餐'),L('기념일 식사는 롯데호텔 부산의 한식 코스로. 예약과 코스는 공식 안내를 확인해 주세요.','Korean course dining at Lotte Hotel Busan; check reservations and menus.','ロッテホテル釜山で韓国料理コースを。予約・メニューをご確認ください。','纪念日可选釜山乐天酒店韩餐，请确认预约与套餐。','紀念日可選釜山樂天飯店韓餐，請確認預約與套餐。'),'https://www.visitbusan.net/index.do?menuCd=DOM_000000201002002000&ucg_seq=4',true),
    p('letemps','레땅','Le Temps','special','YEONJI','부산 부산진구 성지로 22',L('프랑스식 코스','French course dining','フランス料理コース','法餐套餐','法餐套餐'),L('시민공원 산책과 함께 계획하는 예약제 식사.','Reserve a French meal around a Citizens Park outing.','市民公園の散歩と組み合わせる予約制の食事。','搭配市民公园行程，提前预约一餐法餐。','搭配市民公園行程，提前預約一餐法餐。'),'https://www.visitbusan.net/index.do?menuCd=DOM_000000201002002000&ucg_seq=4'),
    p('bonjeon','본전돼지국밥','Bonjeon Dwaeji Gukbap','soup','BUSAN STATION','부산 동구 중앙대로214번길 3-8',L('돼지국밥','Pork soup with rice','豚クッパ','猪肉汤饭','豬肉湯飯'),L('부산역 도착과 출발 사이에 계획하기 좋은 국밥.','A pork-soup stop near Busan Station.','釜山駅の到着・出発前後に豚クッパを。','抵达或离开釜山站前后的一碗汤饭。','抵達或離開釜山站前後的一碗湯飯。'),visit(230)),
    p('choryang','초량밀면','Choryang Milmyeon','noodle','BUSAN STATION','부산 동구 중앙대로 225',L('밀면 · 만두','Cold noodles · dumplings','ミルミョン・餃子','冷面·饺子','冷麵・餃子'),L('기차 여행 동선에 붙이기 좋은 밀면 한 그릇.','Wheat noodles to pair with a train journey.','鉄道の旅に合わせやすいミルミョン店。','搭配火车行程，顺路吃一碗冷面。','搭配火車行程，順路吃一碗冷麵。'),visit(1005,'202003001000')),
    p('hapcheon','합천일류돼지국밥','Hapcheon Illyu Dwaejigukbap','soup','SASANG','부산 사상구 광장로 34',L('돼지국밥 · 수육','Pork soup · boiled pork','豚クッパ・ゆで豚','猪肉汤饭·白切肉','豬肉湯飯・白切肉'),L('사상에서 공항 이동 전후에 고를 수 있는 한 끼.','A Sasang meal to pair with an airport journey.','空港への移動前後、沙上での一食に。','往返机场途经沙上时的用餐选择。','往返機場途經沙上時的用餐選擇。'),visit(167)),
    p('leejaemo','이재모피자 본점','Lee Jae Mo Pizza · original branch','special','NAMPO','부산 중구 광복중앙로 31',L('치즈 크러스트 피자','Cheese-crust pizza','チーズクラストピザ','芝士卷边披萨','起司捲邊披薩'),L('남포동 산책과 함께 나누어 먹는 피자. 대기 시간을 여유 있게 잡아주세요.','Pizza to share on a Nampo outing; allow time for a queue.','南浦洞の散歩に、分け合うピザを。待ち時間に余裕を。','南浦洞散步时分享披萨，请留出排队时间。','南浦洞散步時分享披薩，請留出排隊時間。'),visit(1570,'201002002001')),
    p('gaya','할매가야밀면','Halmae Gaya Milmyeon','noodle','NAMPO','부산 중구 광복로 56-14',L('밀면 · 왕만두','Cold noodles · large dumplings','ミルミョン・大きな餃子','小麦冷面·大饺子','小麥冷麵・大餃子'),L('광복로와 국제시장을 둘러보는 날의 밀면.','Wheat noodles around Gwangbok-ro and Gukje Market.','光復路・国際市場を歩く日のミルミョンに。','逛光复路与国际市场时，顺道吃冷面。','逛光復路與國際市場時，順道吃冷麵。'),visit(2431,'201002004001'))
  ];
  const s=(id,ko,en,category,area,address,body,tip,source)=>({...p(id,ko,en,category,area,address,null,body,source),tip});
  const walk=L('가벼운 산책에 좋아요.','Good for an easy walk.','気軽な散歩に。','适合轻松散步。','適合輕鬆散步。');
  const coast=L('바람과 날씨를 확인하고 편한 신발을 준비해 주세요.','Check the weather and wear comfortable shoes.','天気を確認し、歩きやすい靴で。','请查看天气，穿舒适的鞋。','請查看天氣，穿舒適的鞋。');
  const resident=L('주민이 사는 골목입니다. 낮은 목소리로 걸어주세요.','People live here; keep voices low in residential lanes.','住民の暮らす路地では静かに歩きましょう。','这是居民生活区，请轻声游览。','這是居民生活區，請輕聲遊覽。');
  const indoor=L('운영일과 전시·예약 여부를 공식 안내에서 확인해 주세요.','Check opening days, exhibitions and bookings before visiting.','開館日・展示・予約を公式案内で確認してください。','请确认开放日、展览与预约信息。','請確認開放日、展覽與預約資訊。');
  D.sights=[
    s('jeonpo','전포카페거리','Jeonpo Café Street','local','JEONPO','부산 부산진구 전포대로209번길 일대',L('커피와 작은 상점들을 골목마다 만나는 동네 산책.','Cafés and small shops along Jeonpo’s lanes.','カフェや小さな店を巡る路地歩き。','在巷弄里发现咖啡馆与小店。','在巷弄裡發現咖啡館與小店。'),walk,visit(355,'202003001000')),
    s('market','부전시장','Bujeon Market','local','BUJEON','부산 부산진구 중앙대로783번길 23',L('제철 식재료와 시장 먹거리를 둘러보는 아침.','Browse fresh produce and market food.','旬の食材と市場グルメを探す朝。','逛逛时令食材与市场小吃。','逛逛時令食材與市場小吃。'),walk,visit(327,'202012001000')),
    s('park','부산시민공원','Busan Citizens Park','local','BUJEON','부산 부산진구 시민공원로 73',L('넓은 잔디와 산책로에서 잠시 쉬어가는 시간.','Lawns and walking paths for a relaxed outing.','芝生と遊歩道でゆっくり過ごす時間。','在草坪与步道间放慢脚步。','在草坪與步道間放慢腳步。'),walk,'https://www.visitbusan.net/archive/dataSearch/view.nm?dataSid=METADATA000774'),
    s('songsang','송상현광장','Song Sang-hyeon Square','local','JEONPO','부산 부산진구 중앙대로 818',L('도심의 나무와 작은 물길을 따라 걷는 짧은 코스.','A short city walk beside trees and a stream.','都心の木々と小川をたどる短い散歩。','沿着市区的树木与小溪轻松漫步。','沿著市區的樹木與小溪輕鬆漫步。'),walk,visit(343,'201001001000')),
    s('sea','광안리해수욕장','Gwangalli Beach','sea','GWANGALLI','부산 수영구 광안해변로 219',L('해변 산책 뒤 광안대교의 야경을 기다리는 저녁.','A beach walk and an evening view of Gwangan Bridge.','海辺の散歩と広安大橋の夜景を。','海边散步后，等广安大桥亮起灯光。','海邊散步後，等廣安大橋亮起燈光。'),coast,'https://www.visitbusan.net/archive/dataSearch/view.nm?dataSid=METADATA004634'),
    s('haeundae','해운대해수욕장','Haeundae Beach','sea','HAEUNDAE','부산 해운대구 해운대해변로 264',L('넓게 열린 백사장과 해운대의 활기.','A broad sandy beach and Haeundae’s lively streets.','広い砂浜と海雲台のにぎわい。','感受宽阔沙滩与海云台的活力。','感受寬闊沙灘與海雲臺的活力。'),coast,visit(487,'202002001000')),
    s('dongbaek','동백섬 · 누리마루','Dongbaek Island · Nurimaru','sea','HAEUNDAE','부산 해운대구 동백로 99',L('바다와 숲을 함께 걷는 해운대 해안 산책.','A coastal walk between woodland and the sea.','森と海を一緒に楽しむ海辺の散歩。','在树林与海岸间散步。','在樹林與海岸間散步。'),coast,visit(284,'201001001000')),
    s('blueline','해운대 블루라인파크','Haeundae Blueline Park','sea','HAEUNDAE','부산 해운대구 달맞이길62번길 13 미포정거장',L('해변열차와 스카이캡슐로 보는 동부산의 해안선.','See the east coast by beach train or Sky Capsule.','海辺の列車やスカイカプセルで東釜山へ。','搭乘海岸列车或天空胶囊看海。','搭乘海岸列車或天空膠囊看海。'),L('열차와 캡슐은 다른 상품입니다. 출발역·시간·탑승권을 미리 확인해 주세요.','Train and capsule tickets differ; confirm your departure station, time and ticket.','列車とカプセルは別商品です。出発駅・時間・券種をご確認ください。','列车与胶囊是不同产品，请确认出发站、时间及票种。','列車與膠囊是不同產品，請確認出發站、時間及票種。'),'https://visitbusan.net/archive/dataSearch/view.nm?dataSid=METADATA009585'),
    s('oryukdo','오륙도 스카이워크','Oryukdo Skywalk','sea','NAM-GU','부산 남구 오륙도로 137',L('해안 절벽과 유리 전망대에서 만나는 탁 트인 바다.','Open sea views from coastal cliffs and a glass skywalk.','海岸の崖とガラスの展望台から海を一望。','在海岸峭壁与玻璃观景台眺望大海。','在海岸峭壁與玻璃觀景臺眺望大海。'),L('강풍·우천 시 전망대 운영이 제한될 수 있습니다.','The skywalk may close in strong wind or rain.','強風・雨天時は展望台が休止する場合があります。','大风、下雨时观景台可能暂停开放。','大風、下雨時觀景臺可能暫停開放。'),visit(282,'202002001000')),
    s('songdo','송도해수욕장','Songdo Beach','sea','SONGDO','부산 서구 송도해변로 100',L('해변과 구름산책로를 함께 둘러보는 바닷가.','Explore the beach and its over-water walkway.','砂浜と海上の散歩道を巡る海辺。','把海滩与海上步道串成一次散步。','把海灘與海上步道串成一次散步。'),coast,visit(286,'201001001000')),
    s('taejongdae','태종대','Taejongdae','sea','YEONGDO','부산 영도구 전망로 24',L('숲길과 바다 전망을 함께 즐기는 영도 나들이.','Forested paths and sea views on Yeongdo.','影島の森の道と海の眺めを楽しむ。','在影岛欣赏林间步道与海景。','在影島欣賞林間步道與海景。'),L('산책 구간이 길어요. 다누비열차는 별도 요금과 운행 여부를 확인해 주세요.','Allow time for walking; check Danubi train service and fares separately.','歩行距離は長めです。ダヌビ列車の運行・料金を確認しましょう。','步行距离较长，请另行确认观光列车运营及费用。','步行距離較長，請另行確認觀光列車營運及費用。'),visit(258,'202002001000')),
    s('yonggungsa','해동용궁사','Haedong Yonggungsa Temple','sea','GIJANG','부산 기장군 기장읍 용궁길 86',L('기장 바다를 가까이 마주하는 해안 사찰.','A seaside temple facing Gijang’s coast.','機張の海に面した海辺のお寺。','面向机张海岸的海边寺庙。','面向機張海岸的海邊寺廟。'),L('계단이 많고 이동이 긴 편입니다. 반나절 일정으로 여유 있게 계획하세요.','Expect stairs and a longer journey; plan an unhurried half-day outing.','階段が多く移動も長めです。半日ほど余裕を持って。','阶梯较多、路程较长，建议宽松安排半天。','階梯較多、路程較長，建議寬鬆安排半天。'),'https://www.visitbusan.net/archive/dataSearch/view.nm?dataSid=METADATA009874'),
    s('jagalchi','자갈치시장','Jagalchi Market','market','NAMPO','부산 중구 자갈치해안로 52',L('해산물 시장과 항구의 활기를 만나는 곳.','Seafood stalls and the bustle of Busan’s port.','海鮮市場と港の活気を味わう場所。','感受海鲜市场与港口的热闹。','感受海鮮市場與港口的熱鬧。'),L('식사 전 생선값·조리비·상차림 비용을 확인해 주세요.','Confirm seafood, preparation and table charges before ordering.','注文前に魚代・調理代・席の料金をご確認ください。','用餐前请确认海鲜、加工及餐桌服务费用。','用餐前請確認海鮮、加工及餐桌服務費用。'),visit(412,'201003001000')),
    s('gukje','국제시장','Gukje Market','market','NAMPO','부산 중구 신창동4가 일대',L('작은 상점과 생활용품 골목을 구경하는 원도심 여행.','Explore old-town lanes lined with small shops.','小さな商店や日用品の路地を巡る旧市街歩き。','逛逛老城区的小店与生活用品巷。','逛逛老城區的小店與生活用品巷。'),walk,'https://www.visitbusan.net/archive/dataSearch/view.nm?dataSid=METADATA004398'),
    s('bupyeong','부평깡통시장','Bupyeong Kkangtong Market','market','NAMPO','부산 중구 부평1길 48',L('시장 간식과 야시장 먹거리를 고르는 재미.','Browse market snacks and night-market food.','市場のおやつや夜市の食べ歩きを。','寻找市场零食与夜市美食。','尋找市場零食與夜市美食。'),L('점포별 운영시간과 야시장 개장 시간을 확인해 주세요.','Check individual stalls and night-market opening times.','店舗ごとの営業時間と夜市の開始時刻をご確認ください。','请确认各店营业时间及夜市开放时间。','請確認各店營業時間及夜市開放時間。'),'https://www.visitbusan.net/archive/dataSearch/view.nm?dataSid=METADATA000757'),
    s('yongdusan','용두산공원','Yongdusan Park','market','NAMPO','부산 중구 용두산길 37-55',L('광복로 산책 뒤 언덕 위 공원에서 쉬어가기.','A hilltop park to pair with Gwangbok-ro.','光復路を歩いた後は丘の上の公園へ。','逛过光复路后，到山丘上的公园歇歇。','逛過光復路後，到山丘上的公園歇歇。'),L('공원과 타워 전망대는 이용 조건이 다릅니다. 전망대 요금은 별도 확인하세요.','Park access and tower admission differ; check tower tickets separately.','公園とタワー展望台は利用条件が異なります。料金を別途確認してください。','公园与塔楼观景台入场条件不同，请另查观景台票价。','公園與塔樓觀景臺入場條件不同，請另查觀景臺票價。'),'https://visitbusan.net/archive/dataSearch/view.nm?dataSid=METADATA016622'),
    s('gamcheon','감천문화마을','Gamcheon Culture Village','culture','SAHA','부산 사하구 감내2로 203',L('알록달록한 집들과 계단 골목을 따라 걷는 마을.','Colorful hillside homes and stepped lanes.','色とりどりの家と階段の路地を歩く村。','沿着彩色房屋与阶梯巷弄散步。','沿著彩色房屋與階梯巷弄散步。'),resident,'https://visitbusan.net/index.do?lang_cd=ko&menuCd=DOM_000000204015001000&uio_seq=6'),
    s('huinnyeoul','흰여울문화마을','Huinnyeoul Culture Village','culture','YEONGDO','부산 영도구 절영로 194',L('바다 위로 이어지는 듯한 골목과 해안 풍경.','Cliffside lanes looking out over the sea.','海を見下ろす崖沿いの路地と風景。','沿海崖巷弄，眺望开阔海面。','沿海崖巷弄，眺望開闊海面。'),resident,visit(488,'202002001000')),
    s('f1963','F1963','F1963','culture','SUYEONG','부산 수영구 구락로123번길 20',L('옛 와이어 공장이 전시와 책, 카페가 있는 문화 공간으로.','A former wire factory with art, books and cafés.','ワイヤー工場跡にアート、本、カフェが集う文化空間。','旧钢丝厂变成展览、书店与咖啡馆的文化空间。','舊鋼絲廠變成展覽、書店與咖啡館的文化空間。'),indoor,visit(372,'201001001000')),
    s('maritime','국립해양박물관','Korea National Maritime Museum','culture','YEONGDO','부산 영도구 해양로301번길 45',L('바다의 역사와 문화를 알아보는 실내 나들이.','An indoor outing through maritime history and culture.','海の歴史と文化に出会う屋内のお出かけ。','在室内了解海洋的历史与文化。','在室內了解海洋的歷史與文化。'),indoor,visit(257,'201001001000'))
  ];
  D.dayCourses=[
    {label:'STAY LOCAL',title:L('가까운 동네에서 하루','A day near home','近所で過ごす一日','在附近度过一天','在附近度過一天'),stops:['market','park','jeonpo']},
    {label:'BY THE SEA',title:L('해운대에서 바다 산책','A Haeundae coastal day','海雲台で海辺の散歩','海云台海边散步','海雲臺海邊散步'),stops:['dongbaek','haeundae','blueline']},
    {label:'OLD TOWN',title:L('시장과 오래된 골목','Markets and old-town lanes','市場と古い路地','市场与老巷','市場與老巷'),stops:['jagalchi','gukje','bupyeong','yongdusan']},
    {label:'A SLOW AFTERNOON',title:L('영도의 문화와 바다','Culture and coast on Yeongdo','影島の文化と海','影岛的文化与海','影島的文化與海'),stops:['huinnyeoul','maritime']}
  ];
  D.localPhotos={
    jeonpo:{file:'assets/images/local-jeonpo.webp',source:'https://visitbusan.net/archive/dataSearch/view.nm?dataSid=METADATA012039',credit:'하이픈그룹 · 부산관광공사'},
    sea:{file:'assets/images/local-gwangalli.webp',source:'https://www.visitbusan.net/archive/dataSearch/view.nm?dataSid=METADATA004634',credit:'정을호 · 부산광역시'},
    bupyeong:{file:'assets/images/local-bupyeong.webp',source:'https://www.visitbusan.net/archive/dataSearch/view.nm?dataSid=METADATA000757',credit:'(주)써머트리 · 부산광역시·부산관광공사'}
  };
})();
