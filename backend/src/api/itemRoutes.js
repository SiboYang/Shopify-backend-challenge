import { ItemController } from "../controllers/item.controller.js";

export class ItemRoutes {
  constructor() {
    this.itemController = new ItemController();
  }

  routes(app) {
    app
      .route("/item")
      .get(this.itemController.showAll.bind(this.itemController))
      .post(this.itemController.create.bind(this.itemController));

    app
      .route("/item/:id")
      .get(this.itemController.show.bind(this.itemController))
      .put(this.itemController.update.bind(this.itemController))
      .delete(this.itemController.delete.bind(this.itemController));

    app
      .route("/item/export")
      .post(this.itemController.exportCSV.bind(this.itemController));
  }
}
