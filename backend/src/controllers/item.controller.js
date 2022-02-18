import { Item } from "../models/item.model.js";
import { EmptyResultError, ValidationError } from "sequelize";
import { ItemService } from "../services/item.service.js";
import parseCSV from "../utils/csvParser.js"

export class ItemController {
  constructor() {
    this.itemService = new ItemService();
  }

  /**
   * POST /item
   * @param req HTTP request containing Item attributes:
   * {
   *    name: string;
   *    count: number;
   *    category: string;
   *    brand: string;
   * }
   * @param res HTTP response containing item data
   */
  async create(req, res) {
    const params = req.body;
    try {
      const createdItem = await this.itemService.create(params);
      res.status(201).json(createdItem);
    } catch (e) {
      if (e instanceof ValidationError) {
        res.status(400).json({ error: "Invalid body parameters!" });
      } else {
        res.status(500).json({ error: "Something went wrong." });
      }
    }
  }

  /**
   * GET /item/:id return item by id
   * @param req HTTP request
   * @param res HTTP response containing item data
   */
  async show(req, res) {
    const itemId = Number(req.params.id);
    try {
      const item = await this.itemService.show(itemId);
      res.status(200).json(item);
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "Item not found by id!" });
      } else {
        res.status(500).json({ error: "Something went wrong" });
      }
    }
  }

  /**
   * PUT /item/:id update item by id
   * @param {*} req
   * @param {*} res
   */
  async update(req, res) {
    const itemId = Number(req.params.id);
    const params = req.body;
    try {
      await this.itemService.update(itemId, params);
      res.status(200).json({ data: "successfully updated" });
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "Item is not found by id!" });
      } else if (e instanceof ValidationError) {
        res.status(400).json({ error: "Invalid body parameters!" });
      } else {
        res.status(500).json({ error: "Something went wrong." });
      }
    }
  }

  /**
   * DELETE /item/:id delete item by id
   * @param req
   * @param res
   */
  async delete(req, res) {
    const itemId = Number(req.params.id);
    try {
      await this.itemService.delete(itemId);
      res.status(200).json({ data: "successfully deleted" });
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "Item is not found by id!" });
      } else {
        res.status(500).json({ error: "Something went wrong." });
      }
    }
  }

  /**
   * GET /item return the items based on the filter
   * @param req 
   * HTTP request containing the attributes for filtering:
   * {
   *    name: string;
   *    countStart: number;
   *    countEnd: string;
   *    brand: string;
   *    category: string;
   * }
   * @param res 
   */
  async showAll(req, res) {
    const limit = Number(req.query.limit ?? 120);
    const offset = Number(req.query.page ?? 0) * limit;
    const filter = {
      name: req.query.name ?? "",
      countStart: Number(req.query.countStart ?? 0),
      countEnd: Number(req.query.countEnd ?? Number.MAX_SAFE_INTEGER),
      category: req.query.category ?? "",
      brand: req.query.brand ?? "",
    };

    try {
      const items = await this.itemService.showAll(limit, offset, filter);
      console.log(this)
      res.status(200).json(items);
    } catch (e) {
      
      res.status(500).json({ error: "Something went wrong" });
    }
  }

  /**
   * GET /item/export   export a csv file of all the items
   */
  async exportCSV(req, res) {
    const fields = [
      { label: "id", value: "id" },
      { label: "name", value: "name" },
      { label: "count", value: "count" },
      { label: "category", value: "category" },
      { label: "brand", value: "brand" },
    ];
    try {
      const items = await this.itemService.showAll();
      // clean the data for parsing
      const cleanedItems = items.rows.map(record => record.dataValues)
      const csvData = parseCSV(fields, cleanedItems)
      res.status(200).attachment("items.csv").send(Buffer.from(csvData));
    } catch (e) {
      res.status(500).json({ error: "Something went wrong" });
    } 
  }
}
