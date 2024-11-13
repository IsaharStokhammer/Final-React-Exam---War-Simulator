export interface ILaunchedRocket {
    type: string;
    timeToHit_in_sec: number;
    status: 'Launched' | 'Hit' | 'Intercepted';
  }
