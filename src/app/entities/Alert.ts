export interface Alert {
  title: string;
  message: string;
  actions?: {
    continue: () => void;
  };
}

export enum ALERT_MESSAGES {
  DELETE = '¿Desea continuar con la acción?',
  SUCCESS = 'La operación se ha cumplido exitosamente',
  ERROR = 'Algo ha salido mal en la operación',
}
