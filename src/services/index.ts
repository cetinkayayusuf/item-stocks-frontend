import { AuthService } from "./auth.service";
import { ItemService } from "./item.service";
import { StockService } from "./stock.service";

export const authService = new AuthService("//localhost:8080/api/auth");
export const itemService = new ItemService("//localhost:8080/items");
export const stockService = new StockService("//localhost:8080/stocks");
