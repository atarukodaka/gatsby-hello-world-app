import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { List, ListItem, ListItemText } from '@material-ui/core'
import Recent from "./recent.js"

const Sidebar = () => {
    
    const data = useStaticQuery(
        graphql`
            {
                site {
                    siteMetadata {
                        title
                        author
                    }                    
                }
                allMarkdownRemark {
                    nodes {
                        fields {
                            slug
                            folder
                        }

                    }
                }
            }

        `
    )
    
    const folders = [...new Set(data.allMarkdownRemark.nodes.map ( 
        node => node.fields.folder))
    ].filter(v=>v).sort()

    return (
        <div>
            <h2>Profile</h2>
            <List component="nav">
                <ListItem>
                    <ListItemText>{data.site.siteMetadata.author}</ListItemText>
                </ListItem>
                <ListItem></ListItem>
            </List>

            <h3>Directories</h3>
            <List component="nav">
                {
                    
                    folders.map( folder =>
                        (
                            <ListItem button component={Link} to={'/' + folder}>
                                <ListItemText>{folder}</ListItemText>
                            </ListItem>
                        )
                    )
                }
            </List>

            <Recent/>

            <h3>Archives</h3>

        </div>
    )
}

export default Sidebar