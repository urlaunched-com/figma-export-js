# Figma Export

Figma Export is a library that allows you to export resources from Figma into your project. It automatically generates
a `figma-export.yaml` file that contains settings for exporting resources.

## Installation

To install the library, run the following command:

```bash
npm install -g figma-export-js
```

or if you are using yarn:

```bash
yarn global add figma-export-js
```

### Initialization

To start working with the library, you need to initialize a configuration file. To do this, run the command:

```bash
figma-export init
```

This command will create a `figma-export.yaml` file with basic settings.

### Configuration

In the `figma-export.yaml` file, you can specify the following settings:

```yaml
figma:
  fieldId: your-figma-file-id
common:
  icons: "^(ic)/([a-z0-9_]+)$"
  images: "^(img)/([a-z0-9_]+)$"
  variablesType: "scss" # scss or css. If css is selected, the file will be generated with css var variables
path:
  styles: "./src/core/styles/_global"
  icons: "./public/assets/icons"
  images: "./public/assets/images"
  ```

Please replace your-figma-file-id with your actual Figma file ID.

## Environment Variables

In addition to the settings in the figma-export.yaml file, you also need to set up an environment variable before
running your application. The required environment variable is:

- `FIGMA_PERSONAL_TOKEN`: Your Figma personal token

```bash
export FIGMA_PERSONAL_TOKEN=your-figma-personal-token
```

Please replace your-figma-personal-token with your actual Figma personal token.

### Exporting Resources

After setting up the configuration file, you can start exporting resources. To do this, simply run the `figma-export`
command without arguments:

```bash
figma-export
```

This command will export all resources specified in the figma-export.yaml file to the corresponding directories.

## License

Figma Export is distributed under the [MIT](https://opensource.org/licenses/MIT) license.
