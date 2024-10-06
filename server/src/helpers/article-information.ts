import axios from "axios";
import { z } from "zod";
import pdfParse from "pdf-parse";

interface Article {
  id?: string;
  title?: string;
  author?: Array<string>;
  publication_year?: number;
  cited_by_count?: number;
  is_oa?: boolean;
  pdf_url?: string;
  summary?: string;
}

const OpenAlexResultSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  publication_year: z.number().optional(),
  cited_by_count: z.number(),
  doi: z.string().nullable(),
  primary_location: z.any(),
  authorships: z.array(
    z.object({
      raw_author_name: z.string(),
    })
  ),
  open_access: z.any(),
});

const OpenAlexResponseSchema = z.object({
  results: z.array(OpenAlexResultSchema).optional(),
});

type ResultsOpenAlex = z.infer<typeof OpenAlexResultSchema>;

export async function getArticleContent(
  pdfUrl: string
): Promise<string | undefined> {
  try {
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
    const data = await pdfParse(response.data);
    return data.text;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export async function getArticles(url: string): Promise<Array<Article>> {
  try {
    const response = await axios.get(url);

    const parsedResponse = OpenAlexResponseSchema.parse(response.data);
    if (!parsedResponse.results) throw new Error("Not found");

    const articleInformation = parsedResponse.results.map(
      (result: ResultsOpenAlex) => ({
        id: result.id,
        title: result?.title,
        publication_year: result?.publication_year,
        cited_by_count: result?.cited_by_count,
        is_oa: result?.open_access?.is_oa,
        pdf_url: result?.primary_location?.pdf_url,
        authors:
          result?.authorships?.map((author) => author?.raw_author_name) || [],
      })
    );

    return articleInformation;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error", error.errors, error.message);
    } else {
      console.error(error);
    }

    return [];
  }
}
