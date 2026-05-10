import { body, param } from "express-validator";
import { AvailableUserRoles } from "../utils/constants.js"

const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid Email"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username required")
            .isLowercase()
            .withMessage("Username must be in lower case")
            .isLength({min: 3, max: 15})
            .withMessage("Username must be between 3 to 15 characters in length"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password can't be empty"),
        body("fullName")
            .optional().trim(),
    ]
}

const userLoginValidator = () => {
    return [
        body("email")
            .notEmpty()
            .isEmail()
            .withMessage("Invalid Email"),
        
        body("password")
            .notEmpty()
            .withMessage("Password can't be empty")
    ];
};

const userChangeCurrentPasswordValidator = () => {
    return [
        body("oldPassword")
            .notEmpty()
            .withMessage("Old password is required"),
        
        body("newPassword")
            .notEmpty()
            .withMessage("New password is required"),
    ]
}

const userForgotPasswordValidator = () => {
    return [
        body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid")
    ]
}

const userResetForgotPassword = () => {
    return [
        body("newPassword")
            .notEmpty()
            .withMessage("Password is required")
    ]
}

const createProjectValidator = () => {
    return [
        body("name")
            .notEmpty()
            .withMessage("Name is required"),
        body("description").optional()
    ]
}

const getProjectByIdValidator = () => {
    return [
        param("projectId")
            .isMongoId()
            .withMessage("Invalid Project ID")
    ]
}

const addMemberToProjectValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
        body("role")
            .notEmpty()
            .withMessage("Role is required")
            .isIn(AvailableUserRoles)
            .withMessage("Role is invalid")

    ]
}

const deleteProjectValidator = () => {
    return [
        param("projectId")
            .isMongoId()
            .withMessage("Invalid Project ID")
    ]
}

const updateProjectValidator = () => {
    return [
        param("projectId")
            .isMongoId()
            .withMessage("Invalid Project ID"),
        body("name")
            .optional()
            .isString()
            .notEmpty()
            .withMessage("Name can't be empty"),

        body("description")
            .optional()
            .isString()
            .notEmpty()
            .withMessage("Description can't be empty")
    ]
}
const getTasksValidator = () => {
    return [
        param("projectId")
            .isMongoId()
            .withMessage("Invalid Project ID")
    ]
};

const getTasksByIdValidator = () => {
    return [
        param("projectId")
            .isMongoId()
            .withMessage("Invalid Project ID"),
        param("taskId")
            .isMongoId()
            .withMessage("Invalid Task ID format")
    ]
};

const createTaskValidator = () => {
    return [
        param("projectId")
            .isMongoId()
            .withMessage("Invalid project ID")
    ]
}

const updateTaskValidator = () => {
    return [
        param("projectId")
            .isMongoId()
            .withMessage("Invalid Project ID"),
        param("taskId")
            .isMongoId()
            .withMessage("Invalid Task ID format"),
        body("title")
            .optional()
            .isString()
            .trim()
            .notEmpty()
            .withMessage("Title needs to be assigned")
            .isLength({max: 100})
            .withMessage("Title must be under 100 characters"),
        body("description")
            .optional()
            .isString()
            .trim(),
        body("assignedTo")
            .optional()
            .isMongoId()
            .withMessage("Assigned user must be a valid User ID"),
        body("status")
            .optional()
            .isIn(["todo", "in_progress", "review", "completed"])

    ]
}

const deleteTaskValidator = () => {
    return [
        param("projectId")
            .isMongoId()
            .withMessage("Invalid project ID"),

        param("taskId")
            .isMongoId()
            .withMessage("Invalid task ID")
    ]
}

const createSubtaskValidator = () => {
    return [
        param("projectId")
            .isMongoId()
            .withMessage("Invalid project ID"),

        param("taskId")
            .isMongoId()
            .withMessage("Invalid task ID"),

        body("title")
            .optional()
            .isString()
            .trim()
            .notEmpty()
            .withMessage("Title needs to be assigned")
            .isLength({max: 100})
            .withMessage("Title must be under 100 characters"),
    ]
}

const updateSubtaskValidator = () => {
    return [
        param("projectId")
            .isMongoId()
            .withMessage("Invalid project ID"),

    param("taskId")
        .isMongoId()
        .withMessage("Invalid task ID"),

    param("subtaskId")
        .isMongoId()
        .withMessage("Invalid subtask ID"),

    body("title")
        .optional()
        .isString()
        .trim()
        .withMessage("Title needs to be assigned")
        .isLength({max: 100})
        .withMessage("Title must be under 100 characters"),

    body("isCompleted")
        .optional()
        .isBoolean()
        .withMessage("Wrong boolean values, must be either true or false")
    ]
}

const deleteSubtaskValidator = () => {
    return [
        param("projectId")
            .isMongoId()
            .withMessage("Invalid project ID"),

    param("taskId")
        .isMongoId()
        .withMessage("Invalid task ID"),

    param("subtaskId")
        .isMongoId()
        .withMessage("Invalid subtask ID"),
    ]
}

const getNotesValidator = () => {
    return [
        param("projectId")
            .isMongoId()
            .withMessage("Invalid project ID")
    ]
}

const getNoteDetailsByIdValidator = () => {
    return [
        param("projectId")
            .isMongoId()
            .withMessage("Invalid project ID"),

        param("noteId")
            .isMongoId()
            .withMessage("Invalid note ID"),
    ]
}

const createNoteValidator = () => {
    return [
        param("projectId")
            .isMongoId()
            .withMessage("Invalid project ID"),
        
        body("noteContent")
            .isString()
            .trim()
            .notEmpty()
            .withMessage("Note Content can't be empty")
            .isLength({max: 500})
            .withMessage("Note Length must not exceed 500 characters")
    ]
}

const updateNoteDetailsByIdValidator = () => {
    return [
        param("projectId")
            .isMongoId()
            .withMessage("Invalid project ID"),

        param("noteId")
            .isMongoId()
            .withMessage("Invalid note ID"),
        
        body("noteContent")
            .optional()
            .isString()
            .trim()
            .notEmpty()
            .withMessage("Note Content can't be empty")
            .isLength({max: 500})
            .withMessage("Note Length must not exceed 500 characters")
    ]
}

const deleteNoteDetailsByIdValidator = () => {
    return [
        param("projectId")
            .isMongoId()
            .withMessage("Invalid project ID"),

        param("noteId")
            .isMongoId()
            .withMessage("Invalid note ID"),
    ]
}


export { userRegisterValidator,
        userLoginValidator,
        userChangeCurrentPasswordValidator,
        userForgotPasswordValidator,
        userResetForgotPassword,
        createProjectValidator,
        getProjectByIdValidator,
        addMemberToProjectValidator,
        deleteProjectValidator,
        updateProjectValidator,
        getTasksValidator,
        getTasksByIdValidator,
        createTaskValidator,
        updateTaskValidator,
        deleteTaskValidator,
        createSubtaskValidator,
        updateSubtaskValidator,
        deleteSubtaskValidator,
        getNotesValidator,
        getNoteDetailsByIdValidator,
        createNoteValidator,
        updateNoteDetailsByIdValidator,
        deleteNoteDetailsByIdValidator
    }