import React from "react"
import { Link, useStaticQuery, graphql, navigate } from "gatsby"
import { TreeView, TreeItem } from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const query = graphql`
{
    monthlyArchives: allSitePage(sort: {fields: context___fromDate, order: DESC}, 
        filter: {context: {archive: {eq: "monthly"} }}){    
        nodes {
            id
            path
            context {
                year, month
                fromDate, toDate
                count
            }
        }
    }
    
    monthlyArchivesByYear: allSitePage(sort: {fields: context___fromDate, order: DESC}) {
        group(field: context___year) {
            year: fieldValue
            totalCount
            nodes {
                id
                path
                context {
                    year
                    month
                    fromDate
                    toDate
                    count
                }
            }
        
        }
    }
      
}                
`

const MonthlyArchives = () => {
    const data = useStaticQuery(query)
    /*
        return (
            <TreeView  defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}>
                <TreeItem nodeId="2021" label="2021">
                    <TreeItem nodeId="202103" label="3"/>
                    <TreeItem nodeId="202103" label="4"/>
    
                </TreeItem>
                <TreeItem label="2020"></TreeItem>
            </TreeView>
        )
    */
    const handleClick = (node) => {
        alert(node.path)
        navigate(node.path)
    }
    const formatLabel = (node) => {
        return node.context.year + '/' + node.context.month.toString().padStart(2, ' ') + ' (' + node.context.count + ')'
    }

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultExpanded={[]}
        >
            {data.monthlyArchivesByYear.group.sort((a, b) => b.year - a.year).map(year_node => (
                <TreeItem nodeId={year_node.year} label={year_node.year + ' ('+year_node.totalCount+')'}>
                    {
                        year_node.nodes.sort((a, b) => a.context.month - b.context.month).map(node => (
                            <TreeItem nodeId={node.id} label={formatLabel(node)} onLabelClick={() => { handleClick(node) }}>

                            </TreeItem>
                        ))
                    }
                </TreeItem>
            ))}
        </TreeView>
    )

    /*    
        return (
            <ul>
                {
                    data.monthlyArchives.nodes.map(node => (
                        <li key={node.id}>
                            <Link to={node.path}>{node.context.year}/{node.context.month}</Link> ({node.context.count})
                        </li>
                    ))
                }
            </ul>
        )
        */
}

export default MonthlyArchives