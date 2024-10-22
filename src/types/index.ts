export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface RootState {
  tasks: Task[];
}

export type FilterValue = "all" | "completed" | "pending";

export interface TaskFilterProps {
  tasks: Task[];
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setCurrentFilter: React.Dispatch<React.SetStateAction<FilterValue>>;
}

export interface ConfirmPopupProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface NotificationPopupProps {
  message: string;
  isVisible: boolean;
}

export interface TaskFormProps {
  taskToEdit?: Task;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
