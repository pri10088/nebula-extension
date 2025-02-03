$(document).ready(() => {
  getAllTodos();
  $("#todo").keypress((event) => {
    // Corrected selector for the input field
    if (event.which == 13) {
      const todo = event.currentTarget.value;
      addTodo(todo); // Call addTodo function with the input value
      event.currentTarget.value = ""; // Clear the input field after adding a task
    }
  });

  $("body").on("click", "input[type='checkbox']", (ele) => {
    const itemToRemove = ele.currentTarget.attributes.id.value;
    removeTodo(itemToRemove);
  });
});

function removeTodo(itemKey) {
  chrome.storage.local.remove(itemKey, () => {
    $(`li#${itemKey}`).remove();
  });
}

function getAllTodos() {
  chrome.storage.local.get(null, (item) => {
    for (let [key, value] of Object.entries(item)) {
      if (key != "name") {
        console.log(item);
        let ui = `<li id = "${key}"><label class="checkbox">
    <input type="checkbox" id="${key}"> ${value}</label></li>`;

        $("#todoSection").append(ui);
      }
    }
    // Corrected typo in selector
  });
}
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function addTodo(todoItem) {
  const key = uuidv4();
  chrome.storage.local.set({
    [key]: todoItem,
  });

  let ui = `<li id="${key}"><label class="checkbox">
    <input type="checkbox" id="${key}"> ${todoItem}</label></li>`;

  $("#todoSection").append(ui); // Corrected typo in selector
}
