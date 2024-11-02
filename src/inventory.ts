// Fetch and display inventory items
export type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
};

const inventoryContainer = document.getElementById(
  "inventory-container"
) as HTMLDivElement;
let lastCreatedItem: InventoryItem | null = null;

export async function onFetchInventoryClick() {
  const response = await fetch("http://localhost:3000/inventory");
  const inventoryList: InventoryItem[] = await response.json();
  inventoryList.reverse();
  inventoryContainer.innerHTML = inventoryList
    .map(
      (item: InventoryItem) => `<div class="bg-light rounded mt-3">
          <h3>${item.name}</h3>
          <p>Quantity: ${item.quantity}</p>
          <button class="btn btn-danger" data-id="${item.id}">Delete</button>
          </div>`
    )
    .join("");
  document.querySelectorAll(".btn-danger").forEach((button) => {
    button.addEventListener("click", (e) => {
      const itemId = (e.target as HTMLElement).getAttribute("data-id");
      console.log(itemId);

      if (itemId) {
        deleteItem(itemId);
      } else {
        console.error("Item ID is null or undefined.");
      }
    });
  });
}

// Create a new inventory item
export async function onCreateInventoryClick() {
  let newName = (document.getElementById("newName") as HTMLInputElement).value;
  let newQty = (document.getElementById("newQty") as HTMLInputElement).value;
  const newItem = { name: newName, quantity: newQty };
  const response = await fetch("http://localhost:3000/inventory", {
    method: "POST", // CREATE
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });
  const newlyCreatedItem: InventoryItem = await response.json();
  lastCreatedItem = newlyCreatedItem;
  (document.getElementById("newName") as HTMLInputElement).value = "";
  (document.getElementById("newQty") as HTMLInputElement).value = "";
  // Fetch updated list
  onFetchInventoryClick();
}

// Delete item from list
export async function deleteItem(id: string) {
  console.log("deleteItem:", id);

  await fetch(`http://localhost:3000/inventory/${id}`, {
    method: "DELETE", // DELETE
  });
  lastCreatedItem = null;

  // Fetch updated list
  onFetchInventoryClick();
}

// Delete the last created item
export async function onDeleteInventoryClick() {
  if (lastCreatedItem === null) {
    console.log("No item created yet to delete");
    return;
  }
  await fetch(`http://localhost:3000/inventory/${lastCreatedItem.id}`, {
    method: "DELETE", // DELETE
  });
  lastCreatedItem = null;
}
