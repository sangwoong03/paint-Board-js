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