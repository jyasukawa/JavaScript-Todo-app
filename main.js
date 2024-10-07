const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');

function addTask() {
    const task = taskInput.value.trim(); //前後の不要なスペースを取り除く
    // console.log(task);

    if (task !== "") { //以降、タスクが空でない場合のみ実行
        const li = document.createElement('li'); //新しく追加するタスク用のli要素を作成
        taskList.appendChild(li); // 親ノードに子ノードを追加

        const taskText = document.createElement('span'); // タスクテキスト用のspanを作成
        taskText.textContent = task; // span要素の文字列にtaskを設定
        li.appendChild(taskText); // li要素にspan要素を追加

        // 編集機能ボタンの追加
        const editButton = document.createElement('button');
        editButton.textContent = '編集';
        li.appendChild(editButton);
        editButton.addEventListener('click', function() {
            const editInput = document.createElement('input'); // 新しい入力フィールドを作成
            editInput.type = 'text';
            editInput.value = taskText.textContent; // 現在のタスク内容を入力フィールドにセット
            li.insertBefore(editInput, taskText); // タスクテキストの前に入力フィールドを挿入
            li.removeChild(taskText); // 元のタスクテキストを削除
            editButton.style.display = 'none'; // 編集ボタンを非表示にする

            // 変更を保存するためのボタンを作成
            const saveButton = document.createElement('button');
            saveButton.textContent = '保存';
            li.insertBefore(saveButton, deleteButton); // 削除ボタンの前に保存ボタンを挿入

            // イベントリスナー：保存ボタンをクリックしたとき
            saveButton.addEventListener('click', function() {
                const updatedTask = editInput.value.trim(); // 入力フィールドから値を取得し、前後の不要なスペースを取り除く
                if (updatedTask !== "") {
                    taskText.textContent = updatedTask; // タスク内容を更新
                    li.insertBefore(taskText, editInput); // 更新されたタスク内容を入力フィールドの前に挿入
                    li.removeChild(editInput); // 入力フィールドを削除
                    li.removeChild(saveButton); // 保存ボタンを削除
                    editButton.style.display = 'inline'; // 編集ボタンを再表示
                }
                else {
                    alert("タスク内容が空です。正しい内容を入力してください。");
                }
            });
        });

        // 削除機能ボタンの追加
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        li.appendChild(deleteButton);
        deleteButton.addEventListener('click', function() { // 削除ボタンをクリックしたときのイベントを設定
            taskList.removeChild(li); // 親ノード（taskList）からこのli要素を削除
        });

        taskInput.value = ''; //追加ボタンを押したら、入力欄の文字が消えるようにする
    }
}

document.getElementById('add-task-btn').addEventListener('click', addTask);

