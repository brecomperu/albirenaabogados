import { PDFParse } from 'pdf-parse';
import { TextractClient, DetectDocumentTextCommand } from "@aws-sdk/client-textract";

const textractClient = new TextractClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export const PDFExtractor = {
  /**
   * Extract text from a digital PDF buffer
   */
  async extractFromDigital(buffer: Buffer): Promise<string> {
    try {
      const parser = new PDFParse({ data: buffer });
      const result = await parser.getText();
      return result.text;
    } catch (error) {
      console.error('Error parsing digital PDF:', error);
      throw new Error('Failed to parse digital PDF');
    }
  },

  /**
   * Extract text from a scanned PDF/Image using AWS Textract
   */
  async extractFromScanned(buffer: Buffer): Promise<string> {
    try {
      const command = new DetectDocumentTextCommand({
        Document: {
          Bytes: buffer,
        },
      });

      const response = await textractClient.send(command);
      const text = response.Blocks?.filter(b => b.BlockType === 'LINE')
        .map(b => b.Text)
        .join('\n');

      return text || '';
    } catch (error) {
      console.error('Error with AWS Textract:', error);
      throw new Error('Failed to parse scanned document');
    }
  },

  /**
   * Smart extraction: Tries digital first, if empty or malformed, uses Textract
   */
  async smartExtract(buffer: Buffer): Promise<string> {
    const digitalText = await this.extractFromDigital(buffer);
    
    // If text is too short or looks like garbage, try Textract
    if (digitalText.trim().length < 50) {
      return this.extractFromScanned(buffer);
    }

    return digitalText;
  }
};
