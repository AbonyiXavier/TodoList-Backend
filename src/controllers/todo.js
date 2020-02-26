import dbConnection from "../db/db";
import todoValidation from "../Models/Todo";
export default class TodoController {
  static async addTodo(req, res) {
    try {
      // const { item, description, completed } = req.body;
      let item = req.body.item;
      let description = req.body.description;
      let completed = req.body.completed;
      // const data = {
      //   item,
      //   description,
      //   completed
      // };
      const { error } = todoValidation(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      const addTodoItem =
        "INSERT INTO todo (item, description, completed) VALUES ('" +
        item +
        "', '" +
        description +
        "', '" +
        completed +
        "')";
      const result = await dbConnection.query(addTodoItem);
      console.log("result", result);
      if (result) {
        res.status(201).json({
          status: "success",
          message: "Todo added successfully",
          result: result.affectedRows
        });
      } else {
        res.status(404).json({
          status: "failed",
          message: "Todo not added"
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllTodos(req, res) {
    try {
      const getAll = "SELECT * FROM todo";
      let results = await dbConnection.query(getAll);
      //    console.log(results);
      return res.status(201).json({
        status: "success",
        message: "View all Todos",
        results: results
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateTodo(req, res) {
    try {
      const todoId = req.params.id;
      const { item, description, completed } = req.body;
      const data = {
        item,
        description,
        completed
      };
      console.log("output data", data);

      const updateQuery = "UPDATE todo SET ? WHERE id = ?";
      const result = await dbConnection.query(updateQuery, [data, todoId]);

      return res.status(201).json({
        status: "success",
        message: "Todo updated successfully"
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      const deleteQuery = "DELETE FROM todo WHERE id = ?";
      const result = await dbConnection.query(deleteQuery, id);

      if (result == 0) {
        res.send({
          status: "error",
          message: "No TodoItem"
        });
      } else {
        return res.status(201).json({
          status: "success",
          message: "Todo deleted successfully",
          result
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
