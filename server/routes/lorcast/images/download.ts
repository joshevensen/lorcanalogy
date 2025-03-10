import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Function to download an image

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const savePath = path.join(__dirname, `${body.name}.jpg`)

    // Fetch the image
    const response = await axios({
      url: body.url,
      method: 'GET',
      responseType: 'stream',  // Stream response to avoid large memory usage
    });

    // Create a writable stream to save the image
    const writer = fs.createWriteStream(savePath);

    // Pipe the response stream into the writable stream
    response.data.pipe(writer);

    writer.on('finish', () => {
      console.log(`Image downloaded successfully and saved to ${savePath}`);
    });

    writer.on('error', (err: any) => {
      console.error('Error downloading the image:', err);
    });

  } catch (error) {
    console.error('Error occurred during the download:', error);
  }
})
