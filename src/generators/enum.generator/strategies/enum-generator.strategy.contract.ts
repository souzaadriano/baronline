export interface EnumGeneratorStrategyContract {
  readonly name: string;
  readonly fileName: string;
  readonly filePath: string;
  getFields(): Promise<EnumField[]>;
}

export type EnumField = {
  key: string;
  value: string | number;
};
