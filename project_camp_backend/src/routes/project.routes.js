import { Router } from "express";
import { addMembersToProject,
    createProject, 
    deleteProject,
    getProjectById,
    getProjects,
    getProjectMembers,
    updateMemberRole,
    deleteMembers,
    updateProject 
} from "../controllers/project.controllers.js";
import { validate } from "../middleware/validator.middleware.js";
import { createProjectValidator,
        getProjectByIdValidator,
        addMemberToProjectValidator,
        deleteProjectValidator,
        updateProjectValidator,
     } from "../validators/index.js";

import { verifyJWT, validateProjectPermission } from "../middleware/auth.middleware.js";
import { AvailableUserRoles, userRoleEnum } from "../utils/constants.js";

const router = Router();

router.use(verifyJWT);

router
    .route("/")
    .get(getProjects)
    .post(
        createProjectValidator(), 
        validate, 
        createProject
    );

router
    .route("/:projectId")
    .get(
        getProjectByIdValidator(),
        validate,
        validateProjectPermission(AvailableUserRoles), 
        getProjectById
    )
    .put(
        updateProjectValidator(), 
        validate, 
        validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]),
        updateProject
    )
    .delete(
        deleteProjectValidator(),
        validate,
        validateProjectPermission([userRoleEnum.ADMIN]),
        deleteProject
    );
    
router
    .route("/:projectId/members")
    .get(getProjectMembers)
    .post(
        addMemberToProjectValidator(),
        validate,
        validateProjectPermission([userRoleEnum.ADMIN]),
        addMembersToProject
    );

router
    .route("/:projectId/members/:userId")
    .put(
        validateProjectPermission([userRoleEnum.ADMIN]),
        updateMemberRole
    )
    .delete(
        validateProjectPermission([userRoleEnum.ADMIN]),
        deleteMembers
    )

export default router;