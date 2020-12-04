import { Model } from "objection";
import { SQLDatetime } from "../utils";

export default class extends Model {
  static tableName = "users";
  static idColumn = "id";

  static get relationMappings() {
    // Importing models here is a one way to avoid require loops.
    return {
      todo: {
        relation: Model.BelongsToOneRelation,
        // relation: Model.HasManyRelation,
        modelClass: __dirname + "/Todo",
        join: {
          from: "users.id",
          to: "todo.user_id",
        },
      },
    };
  }
  $beforeInsert() {
    // date_created is a mysql column
    this.date_created = SQLDatetime();
  }
  $beforeUpdate() {
    // date_updated is a mysql column
    this.date_updated = SQLDatetime();
  }
}
