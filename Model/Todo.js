import { Model } from "objection";

export default class extends Model {
  static tableName = "todo";
  static idColumn = "id";
}
