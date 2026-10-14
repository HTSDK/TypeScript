import { type ImportDeclarationStructure, Project, StructureKind } from "ts-morph"
import { type Definition, REGISTRY } from "./registry"

const project = new Project()

project.createSourceFile(
  "src/generated/client.ts",
  {
    statements: [
      {
        kind: StructureKind.ImportDeclaration,
        namedImports: ["API"],
        moduleSpecifier: "../api"
      },
      ...Object.keys(REGISTRY.apis).map(
        (name): ImportDeclarationStructure => ({
          kind: StructureKind.ImportDeclaration,
          namedImports: [name],
          moduleSpecifier: `./${name}`
        })
      ),
      {
        kind: StructureKind.Class,
        name: "Client",
        isExported: true,
        extends: "API",
        getAccessors: Object.keys(REGISTRY.apis).map(name => ({
          name,
          statements: writer => {
            writer.writeLine(`return new ${name}()`)
          }
        }))
      }
    ]
  },
  {
    overwrite: true
  }
)

function build(name: string, definition: Definition, path: string) {
  project.createSourceFile(
    `src/generated/${name.split(".").join("/")}/index.ts`,
    {
      statements: [
        {
          kind: StructureKind.ImportDeclaration,
          namedImports: ["API"],
          moduleSpecifier: `${"../".repeat(name.split(".").length + 1)}api`
        },
        {
          kind: StructureKind.Class,
          name: name.split(".").join("_"),
          isExported: true,
          extends: "API"
        }
      ]
    },
    { overwrite: true }
  )
}

for (const [name, api] of Object.entries(REGISTRY.apis)) {
  build(name, api, "entry.cgi")
}

project.saveSync()
