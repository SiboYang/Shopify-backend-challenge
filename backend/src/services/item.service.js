import { Item } from "../models/item.model.js";
import { RED } from "../config/constants.js";

export class ItemService {
  /**
   * Create a new item in db
   * @param {Object} Item
   * @param {string} item.name
   * @param {number} item.count
   * @param {string} item.category
   * @param {string} item.brand
   */
  async create(item) {
    try {
      const createdItem = await Item.create(item);
      return createdItem;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }

  /**
   * Show an item by Id
   * @param {number} itemId
   */
  async show(itemId) {
    try {
      const createdItem = await Item.findByPk(itemId, {
        rejectOnEmpty: true,
      });
      return createdItem;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }

  /**
   *
   * @param {number} itemId
   * @param {Item} params
   * @returns
   */
  async update(itemId, params) {
    try {
      const update = {
        where: { id: itemId },
      };
      await Item.findByPk(itemId, { rejectOnEmpty: true });
      await Item.update(params, update);
      return;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }

  /**
   * Show all items (paginated)
   * @param {number} limit page size
   * @param {number} offset page number
   */
  async showAll(limit, offset) {
    try {
      const items = await Item.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [["id"]]
      });
      return items;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }

  /**
   * Delete an item by id
   * @param {number} itemId
   */
  async delete(itemId) {
    try {
        const createdItem = await Item.destroy({
            where: {
                id: itemId
            },
            rejectOnEmpty: true
        });
        return createdItem;
      } catch (e) {
        console.error(RED, e);
        throw e;
      }
  }
}
