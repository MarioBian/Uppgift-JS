/* den här funktionen återställer sysslorna i alla listorna vid tryckning av "återställ" knappen.
Plus meddelar användaren att den är återställd och ger en klapp på axeln*/
document.getElementById("restore").addEventListener("click", function () {
  document.getElementById("todoList").innerHTML = "";
  document.getElementById("doneList").innerHTML = "";
  document.getElementById("alertmessege").innerHTML =
    "Listan är nu återställd, bra jobbat med dina sysslor 💪.";
});

// denna är för "Spara" knappen, den lägger till en ny syssla vid tryck.
document.getElementById("saveBtn").addEventListener("click", function () {
  let chore = document.getElementById("List").value;
  let alertmessege = document.getElementById("alertmessege");

  //Kontrollerar så inte sysslan är tom, annars får man felmeddelande
  if (chore.trim() !== "") {
    alertmessege.innerHTML = "";
    createTodoList(chore);
    document.getElementById("List").value = "";
  } else {
    alertmessege.innerHTML = "Vänligen skriv in en syssla";
  }
});

// funktionen skapar en ny syssla.
function createTodoList(text) {
  let itemContainer = document.createElement("div");
  itemContainer.classList.add("todays-mission");

  // skapar en inputfält för sysslan
  // rad 36 låser fältet så att den inte går och redigera
  let choreInput = document.createElement("input");
  choreInput.type = "text";
  choreInput.value = text;
  choreInput.setAttribute("readonly", true);
  choreInput.placeholder = "Syssla";
  choreInput.classList.add("chore-input");

  // Skapar en "Ändra" knappen, för att kunna redigera en syssla man sparat, eller utfört. med evventlisener som låser upp för och redigera syssla samt en if statement för att knappen ska ändra form.
  let editBtn = document.createElement("button");
  editBtn.textContent = "Ändra";
  editBtn.classList.add("changeBtn");
  editBtn.addEventListener("click", function () {
    if (choreInput.hasAttribute("readonly")) {
      choreInput.removeAttribute("readonly");
      choreInput.focus();
      editBtn.textContent = "Spara";
    } else {
      choreInput.setAttribute("readonly", true);
      this.textContent = "Ändra";
    }
  });

  //Skapar en knapp som man kan klicka på när man är klar med sin syssla, med en listener som talar om vad knappen ska göra.
  let doneBtn = document.createElement("button");
  doneBtn.textContent = "Markera som klar";
  doneBtn.classList.add("doneBtn");
  doneBtn.addEventListener("click", function () {
    document.getElementById("doneList").appendChild(itemContainer);
    this.remove();
  });

  //skapar en knapp för och radera en syssla, listener gör samma som rad 60 (säger vad knappen ska göra)
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Radera";
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener("click", function () {
    itemContainer.remove();
  });
  // Lägger till input fält och knappar till container, rad 76 lägger till i listan.
  itemContainer.appendChild(choreInput);
  itemContainer.appendChild(editBtn);
  itemContainer.appendChild(doneBtn);
  itemContainer.appendChild(deleteBtn);
  document.getElementById("todoList").appendChild(itemContainer);
}
