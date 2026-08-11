import PDFParser from "pdf2json";

interface Pdf2JsonTextRun {
  T: string;
}

interface Pdf2JsonTextItem {
  R: Pdf2JsonTextRun[];
}

interface Pdf2JsonPage {
  Texts: Pdf2JsonTextItem[];
}

interface Pdf2JsonOutput {
  Pages: Pdf2JsonPage[];
}

function extractParserError(errData: Error | { parserError: Error }): Error {
  if (errData instanceof Error) return errData;
  return errData.parserError;
}

export async function extractTextFromPdf(fileBuffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const parser = new PDFParser();

    parser.on("pdfParser_dataError", (errData: Error | { parserError: Error }) => {
      reject(extractParserError(errData));
    });

    parser.on("pdfParser_dataReady", (pdfData: Pdf2JsonOutput) => {
      const lines: string[] = [];

      for (const page of pdfData.Pages) {
        const pageLines = page.Texts.map((item) =>
          item.R.map((run) => decodeURIComponent(run.T)).join("")
        );
        lines.push(...pageLines);
      }

      resolve(lines.join("\n"));
    });

    parser.parseBuffer(fileBuffer);
  });
}