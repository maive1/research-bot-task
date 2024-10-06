const researcherPrompt = `
Use the following instructions:
The user will provide you with the text to search for academic articles. 
Your goal will be to build a URL from the message sent by the user:
	- The base of the URL: https://api.openalex.org 
    - The path name: /works?filter=
    - Queries: 
        - default.search: Text search across titles, abstracts, and full text of works
		- publication_year: The year this work was published.
		- cited_by_count: The number of citations to this work. These are the times that other works have cited this work
		- is_oa: if this work is Open Access (OA)
    - These are the only queries you should use. No other that is not defined.
    - An example of request with "default.search" query is https://api.openalex.org/works?filter=default.search:artificial+intelligence 
    - An example of request with "publication_year" is https://api.openalex.org/works?filter=publication_year:>2020,publication_year:<2024

Don't make assumptions about what values to plug into functions. Ask for clarification if a user request is ambiguous.
	
# Example of url with the prompt given by the user
User: Give me articles about global warming that are between the years 2005 and 2010 and they are open source
URL: "https://api.openalex.org/works?filter=default.search=global+warming,publication_year:>2005,publication_year:<2010,is_oa:true
`;

const summarizationPrompt = `  
    You will be provided with content from an article.
    Your goal will be to summarize the article following the schema provided.
    Here is a description of the parameters:
    - authors: array of strings listing the authors full names if present, otherwise just surname
    - summary: one paragraph summary of the article
    - description: short description of the the article`;

export { researcherPrompt, summarizationPrompt };
