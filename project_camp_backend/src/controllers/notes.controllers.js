import { Project } from "../models/project.models.js";
import { ProjectNote } from "../models/note.models.js";
import { APIError } from "../utils/api-error.js";
import { APIResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose from "mongoose";
import { AvailableUserRoles, userRoleEnum } from "../utils/constants.js";

const getNotes = asyncHandler(async(req, res) => {
    const {projectId} = req.params;

    const project = await Project.exists(
        {
            _id: projectId
        }
    );

    if(!project) {
        throw new APIError(404, "Project not found");
    }

    const notes = await ProjectNote.find(
        {
            project: projectId
        }
    );

    if(!notes) {
        throw new APIError(404, "Project Notes not found");
    }

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                notes,
                "Notes fetched succesfully"
            )
        );
});

const createNote = asyncHandler(async(req, res) => {
    const {projectId} = req.params;
    const {noteContent} = req.body;
    const project = await Project.exists(
        {
            _id: projectId
        }
    );

    if(!project) {
        throw new APIError(404, "Project not found");
    }

    const note = await ProjectNote.create(
        {
            project: projectId,
            createdBy: req.user._id,
            content: noteContent
        }
    );

    if(!note) {
        throw new APIError(400, "Project Note cannot be created");
    }

    return res
        .status(201)
        .json(
            new APIResponse(
                201,
                note,
                "Project note created successfully"
            )
        );
});

const getNoteDetailsById = asyncHandler(async(req, res) => {
    const {projectId, noteId} = req.params;

    const project = await Project.exists(
        {
            _id: projectId
        }
    );

    if(!project) {
        throw new APIError(404, "Project not found");
    }

    const projectNote = await ProjectNote.findOne(
        {
            _id: noteId,
            project: projectId
        }
    ).populate("createdBy", "username avatar fullName");

    if(!projectNote) {
        throw new APIError(404, "Project Note not found");
    }

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                projectNote,
                "Project Note fetched successfully"
            )
        );
});

const updateNoteDetailsById = asyncHandler(async(req, res) => {
    const {projectId, noteId} = req.params;
    const {noteContent} = req.body;

    const project = await Project.exists(
        {
            _id: projectId
        }
    );

    if(!project) {
        throw new APIError(404, "Project not found");
    }

    const updateContent = {};
    if(noteContent !== undefined) updateContent.content = noteContent;

    const projectNote = await ProjectNote.findOneAndUpdate(
        {
            _id: noteId,
            project: projectId
        },
        {
            $set: updateContent
        },
        {
            new: true,
            runValidators: true
        }
    ).populate("createdBy", "username avatar fullName");

    if(!projectNote) {
        throw new APIError(404, "Project Note not found");
    }

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                projectNote,
                "Project Note updated successfully"
            )
        );

});

const deleteNoteDetailsById = asyncHandler(async(req, res) => {
    const {projectId, noteId} = req.params;

    const project = await Project.exists(
        {
            _id: projectId
        }
    );

    if(!project) {
        throw new APIError(404, "Project not found");
    }

    const projectNote = await ProjectNote.findOneAndDelete(
        {
            _id: noteId,
            project: projectId
        }
    ).populate("createdBy", "username avatar fullName");

    if(!projectNote) {
        throw new APIError(404, "Project Note not found");
    }

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                projectNote,
                "Project Note deleted successfully"
            )
        );
});


export {
    getNotes,
    createNote,
    getNoteDetailsById,
    updateNoteDetailsById,
    deleteNoteDetailsById
}