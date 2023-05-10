export interface Alert {
  title: string;
  message: string;
  actions?: {
    continue: () => void;
  };
  style: 'info' | 'danger' | 'success';
}
