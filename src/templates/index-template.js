import React from "react"
import { graphql, navigate } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import Layout from "../components/layout.js"
import { Post } from "../components/post.js"
import { Pagination } from '@material-ui/lab'
import { Box } from '@material-ui/core'

export const data = graphql`
  query ($skip: Int!, $limit: Int!){
    allMdx (sort: {fields: frontmatter___date, order: DESC},
      skip: $skip, limit: $limit){
      nodes {
        ...postFields
      }
    }
  }
`

const IndexTemplate = ( { data, pageContext } ) => {
  const { humanPageNumber, numberOfPages } = pageContext;
  const { breadcrumb: { crumbs } } = pageContext

  const label = (humanPageNumber === 1) ? crumbs[0].crumbLabel : `index [${humanPageNumber}]`
  
  const handleChange = (_event, p) => {
    navigate((p === 1) ? '/' : `/${p}`)
  }

  return (
    <Layout title={label}>  
      <Breadcrumb crumbs={crumbs} crumbLabel={label}/>
      
      {data.allMdx.nodes.map(node=>(
        <Post node={node} excerptify={true} key={node.id}/>
      ))}
      
      <Box display="flex" justifyContent="center" m={3}>
      <Pagination count={numberOfPages} page={humanPageNumber} onChange={handleChange}/>
      </Box>
    </Layout>    
  )
}

export default IndexTemplate

