# Figma Export

Figma Export is a library that allows you to export resources from Figma into your project. It automatically generates
a `.figma-export.json` file that contains settings for exporting resources.

## Installation

To install the library, run the following command:

```bash
npm install -g figma-export-js
```

or if you are using yarn:

```bash
yarn global add figma-export-js
```

## Usage

After installation, you can use the `figma-export` command in the command line.

### Initialization

To start working with the library, you need to initialize a configuration file. To do this, run the command:

```bash
figma-export init
```

This command will create a `.figma-export.json` file with basic settings.

### Configuration

In the `.figma-export.json` file, you can specify the following settings:
- `scss`: Path for exporting SCSS files
- `icons`: Path for exporting icons
- `images`: Path for exporting images

## Environment Variables

In addition to the settings in the `.figma-export.json` file, you also need to set up environment variables in a `.env` file in the root of your project. The required environment variables are:

- `FIGMA_API_KEY`: Your Figma API key
- `FIGMA_FILE_ID`: The ID of your file in Figma

Here is an example of what your `.env` file might look like:

```env
FIGMA_API_KEY=your-figma-api-key
FIGMA_FILE_ID=your-figma-file-id
```
Please replace` your-figma-api-key` and `your-figma-file-id` with your actual Figma API key and file ID.  
Remember to add the `.env` file to your `.gitignore` file to prevent it from being committed to your repository.
### Exporting Resources

After setting up the configuration file, you can start exporting resources. To do this, simply run the `figma-export`
command without arguments:

```bash
figma-export
```

This command will export all resources specified in the `.figma-export.json` file to the corresponding directories.

## License

Figma Export is distributed under the [MIT](https://opensource.org/licenses/MIT) license.
