class TaskValidator {
  constructor() {
    this.errors = [];
  }

  validateTask(task) {
    if (!task.title) {
      this.errors.push("Title is required");
    }

    if (!task.description) {
      this.errors.push("Description is required");
    }

    if (!["To do", "In progress", "Done"].includes(task.taskStatus)) {
      this.errors.push("Invalid task status");
    }

    return this.errors;
  }
}

export default TaskValidator;
