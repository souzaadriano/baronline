export interface GeneratorContract<INPUT> {
  generate(input: INPUT): Promise<void>;
}
