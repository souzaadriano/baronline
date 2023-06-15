export interface UseCaseContract<INPUT, OUTPUT> {
  handle(input: INPUT): Promise<OUTPUT>;
}
