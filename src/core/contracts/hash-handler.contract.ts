export interface HashHandlerContract {
  hash(value: string): Promise<string>;
  match(input: MatchInput): Promise<boolean>;
}

export type MatchInput = {
  value: string;
  hash: string;
};
