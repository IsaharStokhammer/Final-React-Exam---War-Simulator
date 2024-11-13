export interface ILaunchedRocket {
    name: string;
    timeToHit_in_sec: number;
    status: 'Launched' | 'Hit' | 'Intercepted';
  }
