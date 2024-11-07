/* funktionen återställer sysslorna i alla listorna vid tryckning av "återställ" knappen.
Plus meddelar användaren att den är återställd och ger en klapp på axeln*/
document.getElementById("restore").addEventListener("click", function () {
  document.getElementById("todoList").innerHTML = "";
  document.getElementById("doneList").innerHTML = "";
  document.getElementById("alertmessege").innerHTML =
    "Listan är nu återställd, bra jobbat med dina sysslor 💪.";
});

// Eventlistener är för "Spara" knappen, den lägger till en ny syssla vid tryck.
document.getElementById("saveBtn").addEventListener("click", function () {
  // Hämtar värdet från inputfältet
  let chore = document.getElementById("List").value;
  let alertmessege = document.getElementById("alertmessege");

  //Kontrollerar så inte sysslan är tom, annars får man felmeddelande
  if (chore.trim() !== "") {
    alertmessege.innerHTML = ""; //Tömmer tidigare meddelande
    createTodoList(chore); //Skapa en ny syssla i listan
    document.getElementById("List").value = ""; //Rensar input fältet
  } else {
    alertmessege.innerHTML = "Vänligen skriv in en syssla"; // Denna felmeddelande dyker upp om input är tom
  }
});

// funktionen skapar en ny syssla i "Att göra" lista.
function createTodoList(text) {
  //container håller i sysslan och knapparna
  let itemContainer = document.createElement("div");
  itemContainer.classList.add("todays-mission");

  // skapar en inputfält för sysslan
  let choreInput = document.createElement("input");
  choreInput.type = "text";
  choreInput.value = text;
  choreInput.setAttribute("readonly", true); // Låser fältet så att den inte går och redigera
  choreInput.placeholder = "Syssla";
  choreInput.classList.add("chore-input");

  // Skapar en "Ändra" knapp
  let editBtn = document.createElement("button");
  editBtn.textContent = "Ändra";
  editBtn.classList.add("changeBtn");

  //Skapar "markera som klar" knapp
  let doneBtn = document.createElement("button");
  doneBtn.textContent = "Markera som klar";
  doneBtn.classList.add("doneBtn");

  //skapar "radera" knapp
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Radera";
  deleteBtn.classList.add("delete");

  // Den här eventlistener är för att låsa upp samt redigera sysslan
  editBtn.addEventListener("click", function () {
    // om fältet är klar så ska man kunna redigera och "ändra" knappen ska heta "spara"
    if (choreInput.hasAttribute("readonly")) {
      choreInput.removeAttribute("readonly");
      choreInput.focus(); // den här focuserar på fältet för redigering
      editBtn.textContent = "Spara";
    } else {
      // ändrar knappen från "spara" till "ändra" när fältet är redigerad och sparad
      choreInput.setAttribute("readonly", true);
      editBtn.textContent = "Ändra";
    }
  });

  // Markera sysslan som klar
  doneBtn.addEventListener("click", function () {
    // flytta sysslan till "Färdig stälda" listan
    document.getElementById("doneList").appendChild(itemContainer);
    doneBtn.remove();
  });

  // Radera sysslan
  deleteBtn.addEventListener("click", function () {
    itemContainer.remove();
  });

  // Lägger till input fält och knappar till container
  itemContainer.appendChild(choreInput);
  itemContainer.appendChild(editBtn);
  itemContainer.appendChild(doneBtn);
  itemContainer.appendChild(deleteBtn);

  // Lägger till i "Att göra" Listan
  document.getElementById("todoList").appendChild(itemContainer);
}
