import {
  onFetchInventoryClick,
  onCreateInventoryClick,
  onDeleteInventoryClick,
} from "./inventory";

// Event listeners for buttons
const fetchInventoryButton = document.getElementById(
  "fetch-inventory"
) as HTMLButtonElement | null;
if (fetchInventoryButton) {
  fetchInventoryButton.addEventListener("click", onFetchInventoryClick);
}
const createInventoryButton = document.getElementById(
  "create-inventory"
) as HTMLButtonElement | null;
if (createInventoryButton) {
  createInventoryButton.addEventListener("click", onCreateInventoryClick);
}
const deleteInventoryButton = document.getElementById(
  "delete-inventory"
) as HTMLButtonElement | null;
if (deleteInventoryButton) {
  deleteInventoryButton.addEventListener("click", onDeleteInventoryClick);
}
