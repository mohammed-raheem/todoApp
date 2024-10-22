export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface RootState {
  tasks: Task[];
}

export interface TaskFilterProps {
  tasks: Task[];
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
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
