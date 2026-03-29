import { Router } from "express";
import { deleteHistory, purchase, purchaseHistory } from "../controllers/purchase.controller";
import auth from "../middleware/auth.middleware";
import { Role } from "../types/enum";

const purchaseRoute = Router()

purchaseRoute.post('/:productID', auth([Role.admin, Role.user]), purchase)
purchaseRoute.get('/history', auth([Role.admin, Role.user]), purchaseHistory)
purchaseRoute.delete('/:id', auth([Role.admin, Role.user]), deleteHistory)




export default purchaseRoute