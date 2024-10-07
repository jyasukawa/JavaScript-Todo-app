const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');

window.addEventListener('DOMContentLoaded', loadTasks); // ページ読み込み時に localStorage からデータを取得して表示

document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    const task = taskInput.value.trim(); //前後の不要なスペースを取り除く

    if (task !== "") { //以降、タスクが空でない場合のみ実行
        createTaskElement(task); // タスクを表示する要素を作成
        saveTaskToLocalStorage(task); // localStorage にタスクを保存
        taskInput.value = ''; //追加ボタンを押したら、入力欄の文字が消えるようにする
    }
}

// タスクを表示する要素を作成する関数
function createTaskElement(task) {
    const li = document.createElement('li'); // 新しく追加するタスク用の li 要素を作成
    taskList.appendChild(li); // 親ノードに子ノードを追加

    const taskText = document.createElement('span'); // タスクテキスト用の span を作成
    taskText.textContent = task; // span 要素の文字列に task を設定
    li.appendChild(taskText); // li 要素に span 要素を追加

    const deleteButton = createDeleteButton(li);
    const editButton = createEditButton(li, taskText, deleteButton);
    li.insertBefore(deleteButton, editButton); // 削除ボタンを編集ボタンの前に挿入
}

// 削除機能ボタンを追加する関数
function createDeleteButton(li) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    li.appendChild(deleteButton);
    deleteButton.addEventListener('click', function() { // 削除ボタンをクリックしたときのイベントを設定
        taskList.removeChild(li); // 親ノード（taskList）からこのli要素を削除
        updateLocalStorage(); // localStorage のデータを更新
    });
    return deleteButton; //　returnがないとdeleteButtonをほかで使えない
}

// 編集機能ボタンを追加する関数
function createEditButton(li, taskText, deleteButton) {
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
                updateLocalStorage(); // localStorage のデータを更新
            }
            else {
                alert("タスク内容が空です。正しい内容を入力してください。");
            }
        });
        return editButton;
    });
}

// タスクを localStorage に保存する関数
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // 既存のタスクリストを取得
    tasks.push(task); // 新しいタスクをリストに追加
    localStorage.setItem('tasks', JSON.stringify(tasks)); // 文字列として保存
}

// タスクを localStorage から削除する関数
function updateLocalStorage() {
    const taskSpans = taskList.getElementsByTagName('span');
    const tasks = Array.from(taskSpans).map(span => span.textContent); // 現在のタスクリストを配列に変換
    localStorage.setItem('tasks', JSON.stringify(tasks)); // 文字列として保存
}

// ページ読み込み時に localStorage からタスクを取得して表示する関数
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // 既存のタスクリストを取得
    tasks.forEach(task => createTaskElement(task)); // 各タスクを HTML に表示
}
