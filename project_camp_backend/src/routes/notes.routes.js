import { Router } from "express";
import { getNotes,
    createNote,
    getNoteDetailsById,
    updateNoteDetailsById,
    deleteNoteDetailsById
} from "../controllers/notes.controllers.js";
import { validate } from "../middleware/validator.middleware.js";

import { getNotesValidator,
        getNoteDetailsByIdValidator,
        createNoteValidator,
        updateNoteDetailsByIdValidator,
        deleteNoteDetailsByIdValidator
} from "../validators/index.js";

import { verifyJWT, validateProjectPermission } from "../middleware/auth.middleware.js";
import { AvailableUserRoles, userRoleEnum } from "../utils/constants.js";

const router = Router({mergeParams: true});

router.use(verifyJWT);

router
    .route("/")
    .get(
        getNotesValidator(),
        validate,
        validateProjectPermission(AvailableUserRoles),
        getNotes
    )
    .post(
        createNoteValidator(),
        validate,
        validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]),
        createNote
    )

router 
    .route("/:noteId")
    .get(
        getNoteDetailsByIdValidator(),
        validate,
        validateProjectPermission(AvailableUserRoles),
        getNoteDetailsById
    )
    .put(
        updateNoteDetailsByIdValidator(),
        validate,
        validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]),
        updateNoteDetailsById
    )
    .delete(
        deleteNoteDetailsByIdValidator(),
        validate,
        validateProjectPermission([userRoleEnum.ADMIN, userRoleEnum.PROJECT_ADMIN]),
        deleteNoteDetailsById
    )


    export default router;