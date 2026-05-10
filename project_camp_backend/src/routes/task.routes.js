import { Router } from "express";
import { getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    createSubtask,
    updateSubtask,
    deleteSubtask
} from "../controllers/task.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
import { validate } from "../middleware/validator.middleware.js";

import { getTasksValidator, 
    getTasksByIdValidator,
    createTaskValidator,
    updateTaskValidator,
    deleteTaskValidator,
    createSubtaskValidator,
    updateSubtaskValidator,
    deleteSubtaskValidator
} from "../validators/index.js";

import { verifyJWT, validateProjectPermission } from "../middleware/auth.middleware.js";
import { AvailableUserRoles, userRoleEnum } from "../utils/constants.js";

const router = Router({ mergeParams: true }); // this is done to merge the parameters of the parent routes with the child routes
router.use(verifyJWT);

router
    .route("/")
    .get(getTasksValidator(), validate, getTasks)
    .post(
        upload.array("attachments"),
        createTaskValidator(),
        validate,
        validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]),
        createTask
    );

router
    .route("/:taskId")
    .get(getTasksByIdValidator(), validate, getTaskById)
    .put(
        updateTaskValidator(), 
        validate, 
        validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]),
        updateTask
    )
    .delete(
        deleteTaskValidator(),
        validate,
        validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]),
        deleteTask
    );

router
    .route("/:taskId/subtasks")
    .post(
        createSubtaskValidator(),
        validate,
        validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]),
        createSubtask
    );

router
    .route("/:taskId/subtasks/:subtaskId")
    .put(
        updateSubtaskValidator(),
        validate,
        validateProjectPermission(AvailableUserRoles),
        updateSubtask
    )
    .delete(
        deleteSubtaskValidator(),
        validate,
        validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]),
        deleteSubtask
    );

export default router;