const reminderService = require("../services/reminderService");

const successResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
  });
};

const create = async (req, res) => {
  try {
    const { title, description, remindAt, user_id } = req.body;

    const reminder = await reminderService.create({
      title,
      description,
      remindAt,
      user_id: user_id || req.user.user_id,
    });

    return successResponse(res, 201, "Reminder created successfully", reminder);
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

const getAll = async (req, res) => {
  try {
    const reminders = await reminderService.getAll(req.user);
    return res.status(200).json(reminders);
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

const getById = async (req, res) => {
  try {
    const reminder = await reminderService.getById(req.params.id, req.user);
    return res.status(200).json(reminder);
  } catch (err) {
    const status = err.message.includes("Unauthorized") ? 403 : 404;
    return errorResponse(res, status, err.message);
  }
};

const update = async (req, res) => {
  try {
    const reminder = await reminderService.update(req.params.id, req.body, req.user);
    return successResponse(res, 200, "Reminder updated successfully", reminder);
  } catch (err) {
    const status = err.message.includes("Unauthorized") ? 403 : 400;
    return errorResponse(res, status, err.message);
  }
};

const remove = async (req, res) => {
  try {
    const result = await reminderService.remove(req.params.id, req.user);
    return successResponse(res, 200, result.message || "Reminder deleted");
  } catch (err) {
    const status = err.message.includes("Unauthorized") ? 403 : 400;
    return errorResponse(res, status, err.message);
  }
};

const markAsSent = async (req, res) => {
  try {
    const reminder = await reminderService.markAsSent(req.params.id, req.user);
    return successResponse(res, 200, "Reminder marked as sent", reminder);
  } catch (err) {
    const status = err.message.includes("Unauthorized") ? 403 : 400;
    return errorResponse(res, status, err.message);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  markAsSent,
};