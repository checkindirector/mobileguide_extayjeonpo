/* Guest diagrams follow the supplied property photos and verified manufacturer materials. */
(() => {
  const D=window.EXTAY,L=D.L,cards=D.guides.appliances.cards;
  const find=id=>cards.find(c=>c.id===id);
  const link=(url,title)=>({url,title});
  Object.assign(D.ui,{
    illustratedGuide:L('사진과 그림으로 보는 사용법','A visual guide to using it','写真と図で見る使い方','图解使用方法','圖解使用方法'),
    swipeGuide:L('좌우로 넘겨보세요 · 그림을 누르면 확대','Swipe through · tap a picture to enlarge','左右にスワイプ・図をタップして拡大','左右滑动，点击图片放大','左右滑動，點擊圖片放大'),
    guidePrevious:L('이전 안내 그림','Previous guide image','前の案内図','上一张图解','上一張圖解'),
    guideNext:L('다음 안내 그림','Next guide image','次の案内図','下一张图解','下一張圖解'),
    guidePage:L('안내 그림','Guide image','案内図','图解','圖解'),
    guidePhoto:L('숙소에 설치된 기기 · 리모컨','The installed device or remote','宿の機器・リモコン','住宿内的设备与遥控器','住宿內的設備與遙控器'),
    guideDiagram:L('한눈에 보는 기본 조작','Basic controls at a glance','基本操作をひと目で','基本操作一览','基本操作一覽'),
    guideEssentials:L('그림으로 기억해요','Illustrated essentials','図で覚えるポイント','图解要点','圖解重點'),
    guideManualFigure:L('공식 사용설명서 · 조작 그림','Control diagram from the official manual','公式説明書の操作図','官方说明书操作图','官方說明書操作圖'),
    guideCaution:L('사용 전 확인해 주세요','Before you use it','ご使用前にご確認を','使用前请确认','使用前請確認'),
    photoCredits:L('사진 출처','Photo credits','写真の出典','图片来源','圖片來源'),
    photoLicense:L('부산관광아카이브의 공공누리 제1유형 사진입니다. 원본 비율과 색을 유지해 크기와 파일 형식을 조정했습니다.','Busan Tourism Archive photographs under KOGL Type 1. Resized and converted with original proportions and colors preserved.','釜山観光アーカイブのKOGL第1類型の写真です。比率・色を保ってサイズと形式を変更しました。','釜山观光档案馆KOGL第1类授权照片，保留原始比例与色彩，仅调整尺寸和格式。','釜山觀光檔案館KOGL第1類授權照片，保留原始比例與色彩，僅調整尺寸和格式。')
  });
  find('living-ac').links=[link('https://www.samsungsvc.co.kr/solution/1861712',L('삼성 공식 시스템 에어컨 안내','Samsung system AC guidance','Samsung公式システム空調ガイド','三星中央空调官方指南','三星中央冷氣官方指南'))];
  find('bedroom-ac').links=[link('https://www.carriercs.co.kr/manual',L('캐리어 공식 설명서 찾기','Find a Carrier manual','Carrier公式説明書を探す','查找开利官方说明书','查找開利官方說明書'))];
  find('fan').model='DAYON REMOTE';find('fan').image=55;
  find('floor').links=[link('https://uriel.kr/products?category=heating&id=DEVICE_d04c79f9-9a1b-4582-b907-1e7f19ec081c',L('우리엘 UTH-170 공식 안내','Uriel UTH-170 information','Uriel UTH-170公式案内','Uriel UTH-170官方信息','Uriel UTH-170官方資訊'))];
  find('floor').location=L('거실 소파 옆 가림막 뒤 하단 벽 · 침실 1·2 전등 스위치 옆','Low on the wall behind the partition beside the sofa; beside each bedroom light switch','ソファ横の仕切り裏の壁下部・各寝室の照明スイッチ横','客厅沙发旁隔板后的墙面下方；卧室灯开关旁','客廳沙發旁隔板後的牆面下方；臥室燈開關旁');
  const tv=find('tv');tv.title=L('거실 스마트 TV','Living-room smart TV','リビングのスマートTV','客厅智能电视','客廳智慧電視');tv.model='SAMSUNG 65TU7000';tv.image=55;tv.location=L('거실','Living room','リビング','客厅','客廳');
  tv.text=L('사진 왼쪽의 검정 삼성 리모컨을 사용하세요. 별도 셋톱박스 없이 TV의 앱으로 시청합니다.','Use the black Samsung remote on the left. Watch through the TV apps; there is no separate set-top box.','写真左の黒いSamsungリモコンを使います。別のセットトップボックスはなく、TVのアプリで視聴します。','使用照片左侧黑色三星遥控器。无独立机顶盒，通过电视应用观看。','使用照片左側黑色三星遙控器。無獨立機上盒，透過電視應用程式觀看。');
  tv.steps=[L('상단 전원 버튼으로 TV를 켭니다.','Press the top power button.','上部の電源ボタンで入れます。','按顶部电源键开机。','按頂部電源鍵開機。'),L('Netflix 버튼을 누르거나 집 모양 홈 버튼에서 앱을 고릅니다.','Press Netflix, or choose an app from the house-shaped Home button.','Netflixボタン、または家のマークのホームからアプリを選びます。','按Netflix键，或按房子图标主页键选择应用。','按Netflix鍵，或按房子圖示首頁鍵選擇應用程式。'),L('방향 버튼과 가운데 확인 버튼으로 선택합니다. 개인 계정은 퇴실 전 로그아웃해 주세요.','Use the directional ring and center button. Log out of personal accounts before checkout.','方向・中央ボタンで選択。個人アカウントは退室前にログアウトを。','用方向键与中间确认键选择，退房前退出个人账号。','用方向鍵與中間確認鍵選擇，退房前登出個人帳號。')];
  tv.links=[link('https://www.samsung.com/us/support/model/UN65TU7000FXZA/',L('삼성 TU7000 공식 설명서','Samsung TU7000 manuals','Samsung TU7000公式説明書','三星TU7000官方说明书','三星TU7000官方說明書'))];
  cards.splice(cards.indexOf(tv)+1,0,{id:'mobile-tv',title:L('침실 이동형 TV','Bedroom movable TV','寝室の移動型TV','卧室移动电视','臥室移動電視'),model:'WIDEVU GTWV320HD11',location:L('침실','Bedroom','寝室','卧室','臥室'),image:56,text:L('흰색 리모컨을 사용합니다. 화면은 전원선을 연결한 상태로 이용하고, 이동할 때는 바퀴와 전원선을 함께 확인해 주세요.','Use the white remote. Keep the TV connected to power and check the wheels and cable before moving it.','白いリモコンを使用。電源に接続し、移動時はキャスターとコードを確認してください。','使用白色遥控器。需连接电源，移动时注意轮子与电源线。','使用白色遙控器。需連接電源，移動時注意輪子與電源線。'),steps:[L('맨 위 빨간 전원 버튼으로 켭니다.','Press the red power button at the top.','上の赤い電源ボタンで入れます。','按顶部红色电源键开机。','按頂部紅色電源鍵開機。'),L('아래쪽 Netflix 또는 YouTube 전용 버튼을 누릅니다.','Press the Netflix or YouTube shortcut near the bottom.','下部のNetflixまたはYouTube専用ボタンを押します。','按下方Netflix或YouTube快捷键。','按下方Netflix或YouTube快捷鍵。'),L('집 모양 홈 버튼과 방향·확인 버튼으로 다른 앱을 고릅니다. 개인 계정은 퇴실 전 로그아웃해 주세요.','Use Home and the direction/OK buttons for other apps. Log out of personal accounts before checkout.','ホーム・方向・確認ボタンで他のアプリへ。退室前に個人アカウントをログアウトしてください。','用主页、方向与确认键选择其他应用，退房前退出个人账号。','用首頁、方向與確認鍵選擇其他應用程式，退房前登出個人帳號。')],links:[link('https://widevu.co.kr/product/와이드뷰-32인치-hd-화이트색상-구글-스마트-tv-gtwv320hd11-단품/77/',L('와이드뷰 공식 제품 안내','WIDEVU official product guide','WIDEVU公式製品ガイド','WIDEVU官方产品指南','WIDEVU官方產品指南'))]});
  const coffee={id:'coffee',title:L('캡슐 커피머신','Capsule coffee machine','カプセルコーヒーマシン','胶囊咖啡机','膠囊咖啡機'),model:'NESPRESSO ESSENZA MINI C30',location:L('주방','Kitchen','キッチン','厨房','廚房'),image:null,text:L('에스프레소는 작은 컵, 룽고는 큰 컵 버튼입니다. 네스프레소 오리지널 규격 캡슐만 사용하며 버츄오 캡슐은 맞지 않습니다.','The small-cup button is Espresso; the large cup is Lungo. Use Nespresso Original-compatible capsules, not Vertuo.','小さいカップはエスプレッソ、大きいカップはルンゴ。ネスプレッソ・オリジナル規格のカプセルを使い、ヴァーチュオは使えません。','小杯键为浓缩，大杯键为长杯。仅用Nespresso Original规格胶囊，不兼容Vertuo。','小杯鍵為濃縮，大杯鍵為長杯。僅用Nespresso Original規格膠囊，不相容Vertuo。'),steps:[L('물통에 깨끗한 음용수를 채워 장착하고, 배출구 아래에 컵을 놓습니다.','Fill and fit the tank with fresh drinking water; place a cup under the outlet.','タンクに新しい飲料水を入れて装着し、抽出口にカップを置きます。','水箱加新鲜饮用水并装好，出口下放杯子。','水箱加新鮮飲用水並裝好，出口下放杯子。'),L('컵 버튼 중 하나를 눌러 켭니다. 불빛이 깜빡이는 동안 예열되고, 계속 켜지면 준비 완료입니다.','Press either cup button. Blinking means heating; a steady light means ready.','どちらかのカップボタンで電源を入れます。点滅は予熱、点灯で準備完了です。','按任一杯键开机。闪烁为预热，常亮即准备完成。','按任一杯鍵開機。閃爍為預熱，恆亮即準備完成。'),L('레버를 올려 캡슐 1개를 넣은 뒤 끝까지 닫습니다.','Lift the lever, insert one capsule and close it fully.','レバーを上げてカプセルを1個入れ、しっかり閉じます。','抬起手柄放入一颗胶囊，再完全合上。','抬起手把放入一顆膠囊，再完全合上。'),L('작은 컵(에스프레소 약 40mL) 또는 큰 컵(룽고 약 110mL)을 짧게 눌러 추출합니다. 중간에 멈추려면 같은 버튼을 다시 누릅니다.','Briefly press Espresso (about 40 mL) or Lungo (about 110 mL). Press again to stop early.','小カップ（約40mL）か大カップ（約110mL）を短く押して抽出。途中で止めるにはもう一度押します。','短按小杯约40mL或大杯约110mL萃取，再按可提前停止。','短按小杯約40mL或大杯約110mL萃取，再按可提前停止。'),L('추출이 완전히 끝난 뒤 레버를 올렸다 내려 사용한 캡슐을 배출하고, 컵 받침의 물을 정리합니다.','After extraction stops completely, lift and close the lever to eject the capsule and empty the drip tray if needed.','抽出が完全に止まってからレバーを開閉してカプセルを落とし、トレイの水を片付けます。','萃取完全结束后开合手柄排出胶囊，并清理接水盘。','萃取完全結束後開合手把排出膠囊，並清理接水盤。')],caution:L('추출 중에는 레버를 열지 마세요. 버튼을 길게 누르면 추출량 설정이 바뀔 수 있으니 짧게 눌러주세요. 캡슐이 걸렸다면 억지로 빼지 말고 호스트에게 문의해 주세요.','Keep the lever closed during extraction. Use a short press; holding a button can reprogram the volume. Ask the host if a capsule jams.','抽出中はレバーを開けず、ボタンは短く押してください。長押しで量設定が変わることがあります。詰まったら無理に取らずホストへ。','萃取中勿开手柄。短按按钮，长按可能改变杯量。胶囊卡住请联系房东，勿强行取出。','萃取中勿開手把。短按按鈕，長按可能改變杯量。膠囊卡住請聯絡房東，勿強行取出。'),links:[link('https://www.nespresso.com/shared_res/manuals/originalline/ORIGINAL_MANUAL(integrated).pdf',L('네스프레소 공식 사용설명서 PDF','Nespresso official manual PDF','Nespresso公式説明書PDF','Nespresso官方说明书PDF','Nespresso官方說明書PDF'))]};
  cards.splice(cards.indexOf(find('water')),0,coffee);
  const water=find('water');water.model='KYOWON WELLS WQ652NWR';water.text=L('이 기기는 냉수·정수 전용입니다. 뜨거운 물이 필요하면 전기포트를 이용해 주세요.','This model provides cold and ambient filtered water only. Use the kettle for hot water.','冷水・常温の浄水専用です。お湯は電気ケトルをご利用ください。','本机仅提供冷水与常温净水，热水请用电热水壶。','本機僅提供冷水與常溫淨水，熱水請用電熱水壺。');
  water.steps=[L('컵을 출수구 아래에 놓습니다.','Place a cup under the outlet.','抽出口にカップを置きます。','在出水口下放杯子。','在出水口下放杯子。'),L('냉수 또는 정수를 고르고, 본체의 정량 선택(120·250·550mL)을 확인합니다.','Select cold or ambient water and check the portion setting (120, 250 or 550 mL).','冷水・浄水を選び、定量設定（120・250・550mL）を確認。','选择冷水或常温净水，确认120、250或550mL定量。','選擇冷水或常溫淨水，確認120、250或550mL定量。'),L('출수 버튼으로 받습니다. 컵이 차기 전에 멈추고, 출수가 끝난 뒤 컵을 꺼냅니다.','Dispense, stop before the cup fills, and remove it after the flow stops.','出水し、あふれる前に止めます。水が止まってからカップを取ります。','开始出水，杯满前停止，水流停止后再取杯。','開始出水，杯滿前停止，水流停止後再取杯。')];
  water.links=[link('https://kyowonwells.com/Product/Detail?grpIdx=1406&productIdx=966',L('웰스 WQ652 공식 제품·출수 안내','Wells WQ652 official information','Wells WQ652公式案内','Wells WQ652官方指南','Wells WQ652官方指南'))];
  find('microwave').links=[];
  find('kettle').model='HUBIC · DRIP KETTLE';find('kettle').links=[link('https://www.hubic.kr/board/free/list.html?board_no=3001',L('휴빅 공식 사용설명서 목록','HUBIC official manual library','HUBIC公式説明書一覧','HUBIC官方说明书列表','HUBIC官方說明書列表'))];
  const washer=D.guides.laundry.cards.find(c=>c.id==='washer');washer.links=[link('https://gscs-b2c.lge.com/open/downloadFile?fileId=GPTVVT8wITxbHeWAQIOYsA',L('LG F9WTB 공식 설명서 PDF','LG F9WTB official manual PDF','LG F9WTB公式説明書PDF','LG F9WTB官方说明书PDF','LG F9WTB官方說明書PDF'))];
  const dryer=D.guides.laundry.cards.find(c=>c.id==='dryer');dryer.links=[link('https://downloadcenter.samsung.com/content/UM/202610/20261013140944003/OID64570_IB_DV8000CK_SimpleUX_KO_261006.pdf',L('삼성 DV20CB8600BW 공식 설명서 PDF','Samsung DV20CB8600BW official manual PDF','Samsung DV20CB8600BW公式説明書PDF','三星DV20CB8600BW官方说明书PDF','三星DV20CB8600BW官方說明書PDF'))];
  const key=(ko,en,ja,zh,tw)=>L(ko,en,ja,zh,tw);
  const power=key('전원 켜기·끄기','Power on / off','電源入・切','开启或关闭电源','開啟或關閉電源');
  D.deviceDiagrams={
    'living-ac':[power,key('모드 선택','Select mode','モード選択','选择模式','選擇模式'),key('온도 +/− · 바람 ∧/∨','Temperature +/− · fan ∧/∨','温度+/−・風量∧/∨','温度+/−・风量∧/∨','溫度+/−・風量∧/∨')],
    'bedroom-ac':[power,key('침실 전용 리모컨으로 운전 선택','Use that bedroom’s remote','寝室専用リモコンで運転選択','使用该卧室专用遥控器','使用該臥室專用遙控器'),key('온도와 풍량 조절','Adjust temperature and airflow','温度・風量調節','调整温度与风量','調整溫度與風量')],
    fan:[key('1–6 · 팬 속도 / 정지 · 팬 끄기','1–6: fan speed / 정지: stop fan','1～6：風速／정지：停止','1–6风速／정지停止风扇','1–6風速／정지停止風扇'),key('조명 ON/OFF','Light ON/OFF','照明ON/OFF','照明ON/OFF','照明ON/OFF'),key('전체종료 · 팬과 조명 함께 끄기','전체종료: turn everything off','전체종료：ファンと照明を切る','전체종료：关闭风扇和照明','전체종료：關閉風扇和照明')],
    floor:[power,key('왼쪽 ▼/▲ · 온도 조절','Left ▼/▲: temperature','左▼/▲：温度','左侧▼/▲：调温','左側▼/▲：調溫'),key('RUN 빨간불 · 가열 중','Red RUN light: heating','赤いRUN：加熱中','RUN红灯：加热中','RUN紅燈：加熱中')],
    tv:[power,key('홈 또는 Netflix','Home or Netflix','ホームまたはNetflix','主页或Netflix','首頁或Netflix'),key('방향·가운데 확인','Directions and center OK','方向・中央確認','方向与中间确认','方向與中間確認')],
    'mobile-tv':[power,key('Netflix · YouTube','Netflix · YouTube','Netflix・YouTube','Netflix・YouTube','Netflix・YouTube'),key('홈 · 방향 · 확인','Home · direction · OK','ホーム・方向・確認','主页・方向・确认','首頁・方向・確認')],
    hob:[key('전원 약 1초','Hold Power about 1 second','電源を約1秒','按电源约1秒','按電源約1秒'),key('화구 쪽 Highlight +/−','Zone Highlight +/−','火口側Highlight +/−','炉头Highlight +/−','爐口Highlight +/−'),key('종료 후 잔열 주의','Residual heat after use','使用後の余熱に注意','结束后注意余热','結束後注意餘熱')],
    microwave:[key('전자레인지용 용기','Microwave-safe container','電子レンジ対応容器','微波炉适用容器','微波爐適用容器'),key('출력과 가열 시간 선택','Choose power and time','出力と時間を選択','选择功率与加热时间','選擇功率與加熱時間'),key('금속·은박·밀폐 용기 금지','No metal, foil or sealed containers','金属・アルミ・密閉容器不可','禁用金属、锡纸、密封容器','禁用金屬、錫紙、密封容器')],
    coffee:[key('물통에 음용수','Drinking water in the tank','タンクに飲料水','水箱加饮用水','水箱加飲用水'),key('레버 · 오리지널 캡슐 1개','Lever · one Original capsule','レバー・Originalカプセル1個','手柄・一颗Original胶囊','手把・一顆Original膠囊'),key('작은 컵 40mL · 큰 컵 110mL','Small cup 40 mL · large cup 110 mL','小カップ40mL・大カップ110mL','小杯40mL・大杯110mL','小杯40mL・大杯110mL')],
    water:[key('냉수 또는 정수','Cold or ambient water','冷水または浄水','冷水或常温净水','冷水或常溫淨水'),key('120 · 250 · 550mL','120 · 250 · 550 mL','120・250・550mL','120・250・550mL','120・250・550mL'),key('출수 · 멈춤','Dispense · stop','出水・停止','出水・停止','出水・停止')],
    kettle:[key('물을 MAX 이하로','Water below MAX','水はMAX以下','水位低于MAX','水位低於MAX'),key('받침대에 올리고 전원 켜기','On the base, then power on','台に置いて電源を入れる','放上底座后开启电源','放上底座後開啟電源'),key('증기·뜨거운 본체 주의','Beware of steam and hot surfaces','蒸気・熱い本体に注意','小心蒸汽与发热机身','小心蒸氣與發熱機身')],
    'hot-water':[key('온수 방향으로 수도 열기','Turn the tap toward hot','お湯側へ蛇口を開ける','向热水方向打开水龙头','向熱水方向打開水龍頭'),key('찬물과 섞어 온도 조절','Mix with cold water','水と混ぜて温度調節','混合冷水调温','混合冷水調溫'),key('보일러 전원은 그대로','Leave the boiler power as set','ボイラー電源はそのまま','保持锅炉原有电源设置','保持鍋爐原有電源設定')],
    washer:[power,key('표준 또는 빠른 세탁 코스','Standard or quick wash','標準またはスピード洗濯','标准或快速洗涤','標準或快速洗滌'),key('시작/일시정지','Start / pause','開始・一時停止','开始／暂停','開始／暫停')],
    dryer:[power,key('다이얼로 건조 코스 선택','Select a cycle with the dial','ダイヤルで乾燥コース選択','旋钮选择烘干程序','旋鈕選擇烘乾程序'),key('동작/일시정지','Start / pause','運転・一時停止','启动／暂停','啟動／暫停')]
  };
  const manuals={hob:'hob',coffee:'coffee',washer:'washer',dryer:'dryer'};
  const manualSize={hob:[696,490],coffee:[756,733],washer:[1209,416],dryer:[1393,405]};
  D.deviceMedia={};
  for(const c of [...cards,...D.guides.laundry.cards].filter(c=>c.id)){
    const slides=[];
    if(c.image!==null)slides.push({photo:c.image,title:D.ui.guidePhoto});
    slides.push({file:`assets/diagrams/${c.id}.svg`,width:600,height:520,title:D.ui.guideDiagram,keys:D.deviceDiagrams[c.id]});
    slides.push({file:`assets/diagrams/${c.id}-steps.svg`,width:600,height:520,title:D.ui.guideEssentials,keys:D.deviceDiagrams[c.id]});
    if(manuals[c.id])slides.push({file:`assets/images/manual-${c.id}-controls.webp`,title:c.id==='coffee'?L('공식 설명서 · 에센자 미니 C 기기 구성','Official manual · Essenza Mini C overview','公式説明書・Essenza Mini Cの構成','官方说明书・Essenza Mini C结构','官方說明書・Essenza Mini C結構'):D.ui.guideManualFigure,width:manualSize[c.id][0],height:manualSize[c.id][1],source:c.links[0].url});
    D.deviceMedia[c.id]=slides;
  }
})();
