import { Project } from "../models/project.models.js";
import { Task } from "../models/task.models.js";
import { Subtask } from "../models/subtask.models.js";
import { APIError } from "../utils/api-error.js";
import { APIResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose from "mongoose";
import { AvailableUserRoles, userRoleEnum } from "../utils/constants.js";
import { uploadFileToS3 } from "../utils/s3.js";

const getTasks = asyncHandler(async(req, res) => {
    //const {title, description, assignedTo, status} = req.body;
    const {projectId} = req.params;
    const project = await Project.findById(projectId);

    if(!project) {
        throw new APIError(404, "Project not found");
    }

    const tasks = await Task.aggregate([
        {
            $match: {
                project: new mongoose.Types.ObjectId(projectId)
            }
        },
        {
            $lookup: {
                from: "subtasks",
                localField: "_id",
                foreignField: "task",
                as: "subtasks"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "assignedTo",
                foreignField: "_id",
                as: "assignedTo"
            }
        },
        {
            $addFields: {
                assignedTo: {
                    $arrayElemAt: ["$assignedTo", 0]
                }
            }
        }
    ]);

    return res
        .status(201)
        .json(
            new APIResponse(
                201,
                tasks,
                "Tasks fetched successfully"
            )
        );

});

const getTaskById = asyncHandler(async(req, res) => {
    const {taskId} = req.params;
    const task = await Task.aggregate(
        [
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(taskId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "assignedTo",
                    foreignField: "_id",
                    as: "assignedTo",
                    pipeline: [
                        {
                            $project: {
                                _id: 1,
                                username: 1,
                                fullName: 1,
                                avatar: 1
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "subtasks",
                    localField: "_id",
                    foreignField: "task",
                    as: "subtask",
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: "createdBy",
                                foreignField: "_id",
                                as: "createdBy",
                                pipeline: [ 
                                    {
                                        $project: {
                                            _id: 1,
                                            username: 1,
                                            fullName: 1,
                                            avatar: 1
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $addFields: {
                                createdBy: {
                                    $arrayElemAt: ["$createdBy", 0]
                                }
                            }
                        }
                    ]
                }
            },
            {
                $addFields: {
                    assignedTo: {
                        $arrayElemAt: ["assignedTo", 0]
                    }
                }
            }
        ]
    );

    if(!task || task.length === 0) {
        throw new APIError(404, "Task not found");
    }

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                task[0],
                "Task fetched successfully"
            )
        )
});

const createTask = asyncHandler(async(req, res) => {
    const {title, description, assignedTo, status} = req.body;
    const {projectId} = req.params;
    const project = await Project.findById(projectId);

    if(!project) {
        throw new APIError(404, "Project not found");
    }

    const files = req.files || [];

    // Upload files to S3 concurrently
    const attachments = await Promise.all(
        files.map(async (file) => {
            const s3Url = await uploadFileToS3(file.buffer, file.originalname, file.mimetype);
            return {
                url: s3Url,
                mimetype: file.mimetype,
                size: file.size
            };
        })
    );

    const task = await Task.create({
        title,
        description,
        project: new mongoose.Types.ObjectId(projectId),
        assignedTo: assignedTo ? new mongoose.Types.ObjectId(assignedTo) : undefined,
        status,
        assignedBy: new mongoose.Types.ObjectId(req.user._id),
        attachments
    });

    return res
        .status(201)
        .json(
            new APIResponse(
                200,
                task,
                "Task created successfully"
            )
        );
});

const updateTask = asyncHandler(async(req, res) => {
    const {projectId, taskId} = req.params;
    const {title, description, assignedTo, status} = req.body;

    const updateData = {};

    if(title !== undefined) {
        updateData.title = title
    }
    if(description !== undefined) {
        updateData.description = description
    }
    if(assignedTo !== undefined) {
        updateData.assignedTo = assignedTo
    }
    if(status !== undefined) {
        updateData.status = status
    }

    const task = await Task.findOneAndUpdate(
        {
            _id: taskId,
            project: projectId
        },
        {
            $set: updateData
        },
        {
            new: true,
            runValidators: true
        }
    );

    if(!task) {
        throw new APIError(404, "Task not found");
    }

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                task,
                "Task updated successfully"
            )
        );
});

const deleteTask = asyncHandler(async(req, res) => {
    const {projectId, taskId} = req.params;

    const deletedTask = await Task.findOneAndDelete(
        {
            _id: taskId,
            project: projectId
        }
    )

    if(!deletedTask) {
        throw new APIError(404, "Task not found or unable to delete")
    }

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                deletedTask,
                "Task deleted successfully"
            )
        )
});

const createSubtask = asyncHandler(async(req, res) => {
    const {projectId, taskId} = req.params;
    const {title} = req.body;

    const taskExists = await Task.exists(
        {
            _id: taskId,
            project: projectId
        }
    );

    if(!taskExists) {
        throw new APIError(404, "Task not found");
    }

    const subtask = await Subtask.create(
        {
            title,
            task: taskId,
            createdBy: req.user._id
        }
    );

    if(!subtask) {
        throw new APIError(400, "Subtask couln't be created");
    }

    return res
        .status(201)
        .json(
            new APIResponse(
                201,
                subtask,
                "Subtask created successfully"
            )
        );
});

const updateSubtask = asyncHandler(async(req, res) => {
    const {projectId, taskId, subtaskId} = req.params; // I used taskId here to omit Insecure Direct Object Reference Vunerability
    const {title, isCompleted} = req.body;

    const parentTask = await Task.exists(
        {
            _id: taskId,
            project: projectId
        }
    )
    if(!parentTask) {
        throw new APIError(404, "Task not found, aborting the updation of the subtask");
    }

    const updateData = {};

    if(title !== undefined) updateData.title = title;
    if(isCompleted !== undefined) updateData.isCompleted = isCompleted;

    const subtask = await Subtask.findByIdAndUpdate(
        subtaskId,
        {
            $set: updateData
        },
        {
            new: true,
            runValidators: true
        }
    );

    if(!subtask) {
        throw new APIError(404, "Subtask not found");
    }

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                subtask,
                "Subtask updated successfully"
            )
        );
});

const deleteSubtask = asyncHandler(async(req, res) => {
    const {projectId, taskId, subtaskId} = req.params; // I used taskId here to omit Insecure Direct Object Reference Vunerability

    const parentTask = await Task.exists(
        {
            _id: taskId,
            project: projectId
        }
    );

    if(!parentTask) {
        throw new APIError(404, "Task not found, aborting the updation of the subtask");
    }

    const deletedSubtask = await Subtask.findOneAndDelete(
        {
            _id: subtaskId,
            task: taskId
        });

    if(!deletedSubtask) {
        throw new APIError(404, "Subtask to be deleted not found");
    }

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                deletedSubtask,
                "Subtask deleted successfully"
            )
        );

});

export {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    createSubtask,
    updateSubtask,
    deleteSubtask
}