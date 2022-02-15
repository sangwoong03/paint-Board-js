# 노마크코더 - 그림판(JS) 만들기   
`공부기간: 22. 02. 11 ~ 진행 중`
  
<br>

## 1. HTML 구조
---

1. 그림판 레이아웃
    ``` html
        <canvas  id="jsCanvas" class="canvas"> </canvas>>
    ```
    `<canvas>`는 그래픽이나 애니메이션을 렌더링하는 html 태그

2. 브러시 (크기 변경)
    ``` html
        <div class="controls__range">
            <input type="range" id="jsRange" min="0.1" max="5.0" value="2.5" step="0.1"/>
            <!-- 0.1 ~ 5.0까지의 값을 가지며 기본값은 2.5, 0.1씩 이동 가능 -->
        </div>
    ```
3. 버튼 (채우기 / 저장하기)
     ``` html
        <div class="controls__btns">
            <button id="jsMode">fill</button>
            <button id="jsMode">save </button>
        </div>
    ```
4. 색상 선택 (9가지)
    ```html
        <!-- 1가지 예시 -->
        <div class="controls__color" style="background: #ff3b30"></div>
    ```

<br> 

## 2.CSS
---
style.css의 각 class 속성 중 주요 속성이나 새로 배운 부분 위주로 정리  
<br>

1. 그림판 레이아웃
    ``` css
        canvas {
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            
            <box-shadow> 속성
            /*box-shadow: x값 / y값 / blur-radius / spread-radius / color*/
        }
    ```

2. 브러시 (크기 변경) : style 없음

3. 버튼 (채우기 / 저장하기)
    ``` css
        button {
            all: unset;
            /* 기본적인 버튼 레이아웃을 모두 없애줌 */

            text-transform: uppercase;
            /* 내부 텍스트 대문자로 변경 */
        }
        button:active {
            transform: scale(1.1);
            /* 버튼을 클릭(active)했을 때 1.1배 커짐 */
        }
    ```
4. 색상 선택 및 전체 레이아웃
    
    부모 요소 내부에 3개의 형제 자식요소 존재한다.  
    ``` html
        <div class="gp" style="display: flex; flex-direction: column">
            <div class="p1" style="display: flex">
                <div class="c1"></div>
                <div class="c2"></div>
            </div>
            <div class="p2" style="display: flex">
                <div class="c1"></div>
                <div class="c2"></div>
            </div>
        </div>
    ```
    각각의 자식요소(".p1", ".p2")의 자손요소(".c1",".c2")를 `display: flex`로 수평 정렬을 하였다. 

    최상위 부모 요소 (".gp")에서 `display: flex; flex-direction: column`을 할 경우 자식 요소들이 block 형태로 수직 (cloumn) 정렬 되고, 자손 요소들은 수평 정렬된다.

    
<br> 

## 3. Javascript  
---
<br>

1.  CANVAS DOM 다루기

    ``` javascript
        const canvas = document.querySelector(".canvas");
        canvas.width = 700;
        canvas.height = 700;
        // html 내부 요소로 있으면 지정하지 않아도 적용됨.
        // ex) <canvas class="canvas" width="700px;" height="700px"> </canvas>

        // context는 canvas의 픽셀에 접근할 수 있는 속성
        // canvas 요소에 동적 요소 추가 가능
        const ctx = document.getContext("2d");
        ctx.strokeStyle // canvas 내부 line에 스타일 적용 (색상 등)
        ctx.lineWidth // canvas 내부 line의 굵기 조절
        ctx.fillStyle // canvas의 색상 변경
        ctx.fillRect(x, y, width, height) // 색칠된 직사각형 
        
        ctx.beginPath() // 새로운 경로 만들기
        ctx.closePath() // 현재 하위 경로의 시작 부분과 연결된 직선 추가
        ctx.moveTo(x, y) // 펜을 지정된 (x, y) 좌표로 옮김.
        ctx.lineTo(x, y) // 현재 위치에서 지정된 (x, y) 좌표로 선 그림.
        ctx.stroke() // 윤곽선을 이용하여 도형을 그림.
    ```


2. 그리기
    ``` javascript
        let painting = false;

       canvas.onmousemove = (e) => { // addEventListener("mousemove", )
            const x = e.offsetX;
            const y = e.offsetY;

            // same as painting = true > startPainting;
            if (!painting) { 
                ctx.beginPath();
                ctx.moveTo(x, y);
            } 
            // same as painting = false > stopPainting;
            else { 
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        };
        function startPainting() {
            painting = true;
        }
        function stopPainting() {
            painting = false;
        };

        canvas.onmousedown = () => {
            startPainting();
        };

        canvas.onmouseup = () => {
            stopPainting(); 
        };

        // 마우스가 canvas 밖을 벗어나는 경우
        canvas.onmouseleave = () => {
            painting = false
        };
    ```
3. 색상 조절
    ``` javascript
        //querySelectorAll >> nodelist 반환
        const colors = document.querySelectorAll(".controls__color");

        function handleColor(e) {
            const color = e.target.style.backgroundColor;
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
        };

        // 반환된 노드리스트를 배열 형태 전환 
        // 배열의 각 원소를 클릭할 때 마다 이벤트 구분
        Array.from(colors).forEach (color => color.addEventListener("click", handleColor));

    ```
4. 크기 조절
    ``` javascript
        const range = document.querySelector("#jsRange")
        
        range.oninput = (e) => {
            const brushSize = e.target.value; // input의 value 값 불러오기
            ctx.lineWidth = brushSize;
        }
    ```
5. 배경색 채우기
    ``` javascript
        const mode = document.querySelector("#jsMode");
        
        let filling = false;

        // fill 버튼 클릭 시
        mode.onclick = () => {
            if(filling) {
                filling = false;
                mode.innerHTML = "Fill"; // 버튼 text 변경
            } else {
                filling = true;
                mode.innerHTML = "Paint"; // 버튼 text 변경
            }
        };

        // (x, y) = (0, 0)을 기준으로 canvas 너비와 높이만큼 사각형 만들기 
        const CANVAS_SIZE = 700;

        canvas.onclick = () => {
            if (filling) {
                ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
            } 
        }
    ```
6. 이미지 저장
    ``` javascript
        const save = document.querySelector("#jsSave");
        
        }
    ```
