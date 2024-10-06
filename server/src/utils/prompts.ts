export const builtUrl = `
  Constructs a URL for the OpenAlex API based on the following parameters provided by the user:
        1.The base URL is https://api.openalex.org/works?filter=.
        2.The first required parameter is default.search, which represents the topic or keyword. Search for keywords or phrases in the user's post as a topic or text (e.g. 'global warming', 'artificial intelligence', 'agriculture'). You should not ask for this parameter if it is already present in the post.
        3.Additional parameters, such as publication_year, cited_by_count, and is_oa, are optional and should only be included if the user mentions them. Do not request them if they are not present.
        4.The is_oa parameter should always be is_oa:true or is_oa:false, depending on whether it is open access or not, but only include it if the user provides it.
        5.If the user does not mention a topic in his/her message, only then should you ask for it.
        6.Generates and returns only the URL without additional explanations or confirmations.
        7.Invokes the getArticles function definition with the URL generated 
    For example, if the user wants to search for 'global warming' and limit the search to articles between 2011 and 2012, the final URL would be:
    https://api.openalex.org/works?filter=default.search:global+warming,publication_year:>2011,publication_year:<2012

    Build the final URL following this structure to call a function definition
`;

const summarizationPrompt = `  
    You will be provided with content from an article.
    Your goal will be to summarize the article following the schema provided.
    Here is a description of the parameters:
    - authors: array of strings listing the authors full names if present, otherwise just surname
    - summary: one paragraph summary of the article
    - description: short description of the the article`;

export { summarizationPrompt };
