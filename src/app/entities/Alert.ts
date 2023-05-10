export interface Alert {
  title: string;
  message: string;
  actions?: {
    continue: () => void;
  };
}

export enum ALERT_MESSAGES {
  DELETE = '¿Estás seguro de querer eliminar este post?',
  SUCCESS = 'La operación se ha cumplido exitosamente',
}
