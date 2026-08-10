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

export async function extractTextFromPdf(fileBuffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const parser = new PDFParser();

    parser.on("pdfParser_dataError", (errData: { parserError: Error }) => {
      reject(errData.parserError);
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