async function graphqlQuery(queryBody) {
    return (await fetch('/graphql', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: queryBody
        })
    })).json()
}