function Character(info) {
	//생성자이기 때문에 대문자로 시작
	this.mainElem = document.createElement('div');
	this.mainElem.classList.add('character');
	this.mainElem.innerHTML = ` <div class="character-face-con character-head">
        <div class="character-face character-head-face face-front"></div>
        <div class="character-face character-head-face face-back"></div>
    </div>
    <div class="character-face-con character-torso">
        <div class="character-face character-torso-face face-front"></div>
        <div class="character-face character-torso-face face-back"></div>
    </div>
    <div class="character-face-con character-arm character-arm-right">
        <div class="character-face character-arm-face face-front"></div>
        <div class="character-face character-arm-face face-back"></div>
    </div>
    <div class="character-face-con character-arm character-arm-left">
        <div class="character-face character-arm-face face-front"></div>
        <div class="character-face character-arm-face face-back"></div>
    </div>
    <div class="character-face-con character-leg character-leg-right">
        <div class="character-face character-leg-face face-front"></div>
        <div class="character-face character-leg-face face-back"></div>
    </div>
    <div class="character-face-con character-leg character-leg-left">
        <div class="character-face character-leg-face face-front"></div>
        <div class="character-face character-leg-face face-back"></div>
    </div>`;
	//this로 했다는것은 캐릭터 생성자를 통해 만들어낼 인스턴스 객체의 속성으로 쓰겠다는 의미.

	document.querySelector('.stage').appendChild(this.mainElem);

	this.mainElem.style.left = info.xPos + '%';
	// console.log(info); // 상단 Character 생성자 옆에 info객체를 적으면 각각의 객체.
	this.scrollState = false; // 스크롤 중인지 아닌지 체크
	this.lastScrollTop = 0; // 바로 이전 스크롤 위치
	this.xPos = info.xPos; //각각 객체에 xPos값을 넣어줌 (각각 객체에  xPos라는 속성이 생김)
	this.speed = info.speed;
	this.direction; //requestAnimationFrame 을 위한 방향 설정
	this.runningState = false; // 좌우 이동 중인지 아닌지
	this.rafId;
	this.init(); //프로토타입 내부 메서드 실행
}

Character.prototype = {
	constructor: Character,
	init: function () {
		const self = this; //addEventListener 안에서의 this는 window이기때문에 함수 밖에서 Character에 해당하는 this.를 만들어 준다.
		window.addEventListener('scroll', function () {
			clearTimeout(self.scrollState); //2.스크롤이 실행되는 동안에는 계속 취소가 됨. 3.스크롤을 멈추면 이건 실행이 안되니까.
			if (!self.scrollState) {
				//처음엔 위에서 지정한 false니까 !self.scrollState조건을 만족, 실행이 됨
				//그 후엔 settimeout으로 ture가 되니 실행이 안됨
				//값이
				self.mainElem.classList.add('running');
				// console.log('running 붙음');
			}
			self.scrollState = setTimeout(() => {
				self.scrollState = false;
				self.mainElem.classList.remove('running');
			}, 500); //1. 0.5초 후에 실행이 되는데 4.그제서야 실행이 된다. 스크롤을 멈추면 0.5초 후에 remove된다.

			// console.log('lastScrollTop:' + self.lastScrollTop); // addEventListener('scroll')로 인하여 스크롤이 끝나는 시점에 저장한 스크롤 위치 (예전값)
			// console.log('pageYOffset:' + pageYOffset); // 현재 스크롤 위치. 스크로롤에 움직임이 있을 시 저장된 스크롤의 위치와 약간의 차이가 나게 됨 (최신값)

			//이전 스크롤 위치와 현재 스크롤 위치를 비교
			if (self.lastScrollTop > pageYOffset) {
				//이전 스크롤 위치가 크다면 : 스크롤을 올렸을 때
				self.mainElem.setAttribute('data-direction', 'backward');
				// console.log('스크롤 올림');
				// console.log(self.mainElem.attributes);
			} else {
				//현재 스크롤 위치가 크다면 : 스크롤을 내렸을 때
				self.mainElem.setAttribute('data-direction', 'forward');
				// console.log('스크롤 내림');
			}
			self.lastScrollTop = pageYOffset; // 스크롤이 끝나는 시점에 해당 스크롤 위치를 self.lastScrollTop에 저장
		});
		window.addEventListener('keydown', function (e) {
			if (self.runningState) return;
			// console.log(e.keyCode);
			if (e.keyCode == 37) {
				self.direction = 'left';
				self.mainElem.setAttribute('data-direction', 'left');
				self.mainElem.classList.add('running');
				//초당 10프레임정도 밖에 안되는 속도로 버벅임 현상이 있으니 requestAnimationFrame을 사용(하단에 함수 추가)
				// self.xPos -= self.speed;
				// // self.xPos = self.xPos - self.speed;
				// self.mainElem.style.left = self.xPos + '%';
				// self.run();
				////// 해결 1.  함수의 매개변수로 전달해서 this를 살리는 방법
				self.run(self);
				////// 해결 2.  bind 메서드로  this를 직접 지정하기
				// self.run();
				self.runningState = true;
			} else if (e.keyCode == 39) {
				self.direction = 'right';
				self.mainElem.setAttribute('data-direction', 'right');
				self.mainElem.classList.add('running');
				//초당 10프레임정도 밖에 안되는 속도로 버벅임 현상이 있으니 requestAnimationFrame을 사용(하단에 함수 추가)
				// self.xPos += self.speed;
				// // self.xPos = self.xPos + self.speed;
				// self.mainElem.style.left = self.xPos + '%';
				// self.run();
				////// 해결 1.  함수의 매개변수로 전달해서 this를 살리는 방법
				self.run(self);
				////// 해결 2.  bind 메서드로  this를 직접 지정하기
				// self.run();
				self.runningState = true;
			}
		});
		window.addEventListener('keyup', function (e) {
			self.mainElem.classList.remove('running');
			this.cancelAnimationFrame(self.rafId);
			self.runningState = false;
		});
	},
	// run: function () {
	// 	const self = this;
	// 	if (self.direction == 'left') {
	// 		self.xPos -= self.speed;
	// 	} else if (self.direction == 'right') {
	// 		self.xPos += self.speed;
	// 	}
	// 	self.mainElem.style.left = self.xPos + '%'; //바뀐 값을 실제 css로 적용
	// 	console.log(self); // self는 Character 를 잘 가리키다가 window객체를 가리키는 이유 = requestAnimationFrame가 실행 될 때 컨텍스트가 바뀌면서 윈도우 전역객체를 가리키기 때문
	// 	requestAnimationFrame(self.run); // 키를 눌렀을 때(상단 key down 이벤트 안에서 실행 해줘야 함)
	// },

	//// 해결 1.  함수의 매개변수로 전달해서 this를 살리는 방법
	run: function (self) {
		if (self.direction == 'left') {
			self.xPos -= self.speed;
		} else if (self.direction == 'right') {
			self.xPos += self.speed;
		}
		if (self.xPos < 2) {
			self.xPos = 2;
		}
		if (self.xPos > 88) {
			self.xPos = 88;
		}
		self.mainElem.style.left = self.xPos + '%';
		self.rafId = requestAnimationFrame(function () {
			self.run(self);
		});
		// console.log(self.speed);
	},

	////// 해결 2.  bind 메서드로  this를 직접 지정하기
	// run: function () {
	// 	////// 해결 2.  bind 메서드로  this를 직접 지정하기
	// 	const self = this;
	// 	if (self.direction == 'left') {
	// 		self.xPos -= self.speed;
	// 	} else if (self.direction == 'right') {
	// 		self.xPos += self.speed;
	// 	}
	// 	if (self.xPos < 2) {
	// 		self.xPos = 2;
	// 	}
	// 	if (self.xPos > 88) {
	// 		self.xPos = 88;
	// 	}
	// 	self.mainElem.style.left = self.xPos + '%';
	// 	requestAnimationFrame(self.run.bind(self));
	// },
};
// 현재 스크롤 상태를 나타내는 scrollState의 기본값은 false이다.
// 스크롤 이벤트가 실행되면 clearTimeout이 먼저 작동한다.
// clearTimeout은 setTimeout의 반환값을 매개변수로 하여 setTimeout을 취소시키는 함수이다.
// 지금은 setTimeout이 실행되지 않았으니 건너뛰고 다음 if문으로 가자.
// "!(self.scrollState=false)= true", 즉 if(true){} 이므로 if문이 실행된다.
// running 클래스가 붙어 이제 애니메이션이 작동된다. 다음으로 setTimeout 함수로 가보자.
// setTimeout은 항상 숫자를 리턴하기 때문에 scrollState는 값을 가지게 되어 true가 된다.
// setTimeout 안의 내용들은 0.5초 후에 실행되는데 실행되기도 전에 스크롤 이벤트 갱신과 함께 clearTimeout으로 인해 실행되지 못한다.
// 이제 if문으로 넘어가는데 scrollState가 true이므로 if(!true), 즉, 되어 if 문이 실행되지 않는다.
// 그리고 setTimeout으로 넘어가면 마찬가지로 리턴값을 받아 여전히 true이고, settimeout은 실행되지 않는다.
// 이렇게 반복되다가 마지막 스크롤일 때 setTimeout이 드디어 실행된다.
// 왜냐하면 더 이상 스크롤 이벤트가 일어나지 않아 clearTimeout이 동작하지 않기 때문이다.
// 비로소 scrollstate는 false가 되고 running 클래스는 제거된다.
