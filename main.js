function addTask() {
    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim(); //前後の不要なスペースを取り除く
    console.log(task);
    if (task !== "") { //以降、タスクが空でない場合のみ実行
        const li = document.createElement('li'); //新しく追加するタスク用のli要素を作成
        li.textContent = task; // li要素の文字列にtaskを設定
        taskList.appendChild(li); // 親ノードに子ノードを追加
        taskInput.value = ''; //追加ボタンを押したら、入力欄の文字が消えるようにする
    }
}

document.getElementById('add-task-btn').addEventListener('click', addTask);