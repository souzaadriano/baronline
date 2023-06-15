export class BrandConfiguration {
  private readonly configuration: any;
  constructor(private readonly _configuration: string) {
    this.configuration = JSON.parse(_configuration);
  }
}
