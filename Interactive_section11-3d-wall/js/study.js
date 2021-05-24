(function () {
	const stageElem = document.querySelector('.stage');
	const houseElem = document.querySelector('.house');
	const barElem = document.querySelector('.progress-bar');
	const mousePos = { x: 0, y: 0 };
	let maxScrollValue = 0;
	function resizeHandler() {
		maxScrollValue = document.body.offsetHeight - window.innerHeight;
	}
	window.addEventListener('scroll', function () {
		const scrollPer = pageYOffset / maxScrollValue; //스크롤을 얼마나 했는지 비율로 나타낼 수 있음
		// 전체 스크롤 값 -
		const zMove = scrollPer * 980 - 490; //translate z로 뺀 값만큼 빼서 맞춰주기
		houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

		//////progress bar
		barElem.style.width = scrollPer * 100 + '%';
	});

	window.addEventListener('mousemove', function (e) {
		// console.log(e.clientX, e.clientY); //clientX = 마우스 x좌표, clientY=마우스 y좌표
		mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
		//현재 마우스의 위치 /전체 윈도우의 폭 = 0 ~ 1
		mousePos.y = 1 - (e.clientY / window.innerWidth) * 2;
		// console.log(mousePos);
		stageElem.style.transform =
			'rotateX(' + mousePos.y * 5 + 'deg) rotateY(' + mousePos.x * 5 + 'deg)';
	});

	window.addEventListener('resize', resizeHandler); // 브라우저가 열릴 때 창 기준으로 설정된 스크롤 높이값을 브라우저 창이 변경 될 때 함께 변경하도록 설정

	stageElem.addEventListener('click', function (e) {
		// console.log((e.clientX / window.innerWidth) * 100);
		new Character({
			xPos: (e.clientX / window.innerWidth) * 100,
		});
	});

	resizeHandler();

	// new Character(); // studyCharacter에  있는 Character 함수 실행
})();
