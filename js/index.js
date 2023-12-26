const 정답 = "APPLE";

let attempts = 0; // 시도한 횟수 (row 순서)
let index = 0; // column 순서

/* 키보드를 입력하는 이벤트 */
function appStart() {
    // 게임 종료시 뜨는 화면
    const displayGameover = () => {
        const div = document.createElement('div');
        div.innerText = "게임이 종료됐습니다.";
        div.style = "display:flex; justify-content:center; align-items:center; position:absolute; top:50%; margin:0 auto; background-color:white; width:300px; height:100px; border:5px solid red; font-weight:bold;";
        document.body.appendChild(div);
    };

    // 게임 종료 (이벤트 삭제)
    const gameover = () => {
        window.removeEventListener("keydown", handleKeydown);
        displayGameover();
    };

    // 다음줄로 넘기기
    const nextLine = () => {
        if (attempts === 6) return gameover(); // 6번째가 되면 gameover를 호출하고 끝나도록
        attempts += 1;
        index = 0;
    };

    const handleBackspace = (preBlock) => {
        if (index > 0) {
            const preBlock = document.querySelector(
                `.board-column[data-index="${attempts}${index - 1}"]`
            );
            preBlock.innerText = "";
            preBlock.style.borderColor = "#d3d6da";
        }
        if (index !== 0) index -= 1;
    };

    const handleEnterKey = () => {
        let 맞은_개수 = 0;

        for (let i=0; i<5; i++) {
            const block = document.querySelector(
                `.board-column[data-index="${attempts}${i}"]`
            );
            
            const 입력한_글자 = block.innerText;
            const 정답_글자 = 정답[i];
            if (입력한_글자 === 정답_글자) {
                맞은_개수 += 1;
                block.style.backgroundColor = "#6aaa64";
            } else if (정답.includes(입력한_글자)) block.style.backgroundColor = "#c9b458";
            else block.style.backgroundColor = "#787c7e";
            block.style.color = "white";
        }

        if (맞은_개수 === 5) gameover();
        else nextLine();
    };

    const handleKeydown = (event) => {
        const key = event.key.toUpperCase(); // 대문자로;
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(
            `.board-column[data-index="${attempts}${index}"]`
        );

        console.log(index);
        
        if (event.key === 'Backspace') handleBackspace();
        else if (index === 5) {
            if (event.key === "Enter") handleEnterKey();        
            else return; // Enter가 아닌 다른 키가 눌리면 그냥두기
        }   else if (65 <= keyCode && keyCode <= 90) {
            thisBlock.innerText = key;
            thisBlock.style.borderColor = "black";
            index += 1;
        }
    };

    window.addEventListener("keydown", handleKeydown);
}

appStart();