export const enumTemplate = (name: string, fields: string) => `
export enum ${name} {
${fields}
}
`;
