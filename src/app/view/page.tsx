import { getAllArticles } from "@/helpers/articleFetcher"


export default async function AllPage(){
    const allArticles = await getAllArticles();

    return (
        <code>
            <pre>
                {JSON.stringify(allArticles, null, '\t')}
            </pre>
        </code>
    )
}