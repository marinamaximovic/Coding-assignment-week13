import "bootstrap/dist/css/bootstrap.min.css";

//import event listeners
import "./eventListeners";

// import the function fo fetch and display inventory
import { onFetchInventoryClick } from "./inventory";

// Initial fetch of inventory
onFetchInventoryClick();
