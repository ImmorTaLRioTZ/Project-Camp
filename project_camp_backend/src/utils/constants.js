export const userRoleEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project_admin",
    MEMBER: "member"
}

export const AvailableUserRoles = Object.values(userRoleEnum);

export const TaskStatusEnum = {
    TODO: "todo",
    IN_PROGRESS: "in_progress",
    REVIEW: "review",
    COMPLETED: "completed",
};

export const AvailableTaskStatus = Object.values(TaskStatusEnum);