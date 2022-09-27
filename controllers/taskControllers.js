const Task = require("../models/task");
const Mongoose = require("mongoose");

//create new task

exports.createTask = async (request, response) => {
  let { taskName, dateStarted, endingDate } = request.body;

  let newTask = new Task({
    taskName,
    dateStarted,
    endingDate,
  });

  let saveTask = await newTask.save();
  return response
    .status(200)
    .json({ success: true, responseMessage: saveTask });
};

exports.getAllTask = async (request, response) => {
  try {
    let allTask = await Task.find({}).populate("user", "fullname");
    return response
      .status(200)
      .json({ success: true, responseMessage: allTask });
  } catch (error) {
    return response.status(400).json({
      success: false,
      responseMessage: ` Cannot get all tasks due to this error ${error}`,
    });
  }
};

exports.getTaskById = async (request, response) => {
  let taskId = request.params.id;
  if (!Mongoose.isValidObjectId(taskId)) {
    return response.status(400).json({
      success: false,
      responseMessage: `No task with such id ${taskId}`,
    });
  } else {
    let singleTask = await Task.findById(taskId);
    return response
      .status(200)
      .json({ success: true, responseMessage: singleTask });
  }
};

exports.editTask = async (request, response) => {
  try {
    let taskId = request.params.id;
    if (!Mongoose.isValidObjectId(taskId)) {
      return response.status(400).json({
        success: false,
        responseMessage: ` No task with this id ${taskId} , please try again`,
      });
    }
    let { taskName, dateStarted, endingDate } = request.body;
    let editted_task = await Task.findByIdAndUpdate(
      taskId,
      { taskName, dateStarted, endingDate },
      { new: true }
    );
    return response
      .status(200)
      .json({ success: true, responseMessage: editted_task });
  } catch (error) {
    return responseMessage.status(400).json({
      success: false,
      responseMessage: `Cannot update the task with thi id ${taskId} , please try again`,
    });
  }
};

exports.deleteTask = async (request, response) => {
  try {
    let taskId = request.params.id;
    if (!Mongoose.isValidObjectId(taskId))
      return response.status(404).json({
        success: false,
        responseMessage: `There is no task with this id ${taskId}, please try again`,
      });
    await Task.findByIdAndDelete(taskId);
    return response.status(200).json({
      success: true,
      responseMessage: `The task with this id ${taskId} have been deleted successfully`,
    });
  } catch (error) {
    return response
      .status(422)
      .json({ success: false, responseMessage: `Cannot delete this task` });
  }
};
