import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core/'
import { Share } from '@material-ui/icons'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout/Layout'
import { mediumgrey, seafoam } from '../theme/ocPalette.constants'
import utility from '../utility'
import Jumbotron from '../components/Shared/Jumbotron'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      overflowX: 'hidden',
    },
    html: {
      overflowX: 'hidden',
    },
    blogContainer: {
      marginTop: -theme.spacing(14),
    },
    title: {
      marginBottom: theme.spacing(1),
    },
    subtitle: {
      color: mediumgrey[400],
    },
    cardBase: {
      display: 'flex',
      flexFlow: 'column nowrap',
      transition: '0.3s',
      margin: 'auto',
      height: '100%',
      boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
      },
    },
    cardActionArea: {
      flex: '1 1 auto',
    },
    cardImg: {
      paddingTop: '56.25%',
      position: 'relative',
      '&::after': {
        content: '" "',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        borderBottom: '32px solid #ffffff',
        borderLeft: '400px solid transparent',
      },
    },
    cardRibbon: {
      position: 'absolute',
      top: theme.spacing(2),
      left: theme.spacing(2),
      backgroundColor: seafoam[800],
      color: seafoam[100],
      fontSize: '.8em',
      padding: '2px 8px 4px 8px',
      boxShadow: '0 2px 12px 2px rgba(0,0,0,0.5)',
      borderTopLeftRadius: 2,
      borderBottomLeftRadius: 2,
      margin: 0,
    },
    cardAuthor: {
      position: 'absolute',
      right: '12%',
      bottom: 4,
      transform: 'translateY(20%)',
      width: 48,
      height: 48,
      zIndex: 1,
      '&:after': {
        content: '" "',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
      },
    },
    cardTitle: {
      lineHeight: '1.4',
    },
    MuiCardContentRoot: {
      textAlign: 'left',
      padding: theme.spacing(3),
    },
    MuiCardActionsRoot: {
      padding: `0 ${theme.spacing(3)}px`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })
)

interface PageData {
  allMdx: {
    totalCount: number
    edges: [
      {
        node: {
          id: string
          fileAbsolutePath: string
          frontmatter: {
            title: string
            date: string
            tags: string
            authors: string
            summary: string
          }
        }
      }
    ]
  }
}

const placeholderImg = '/images/blog/placeholder.jpg'

interface BlogListProps {
  location: any
}

export default function BlogListComponent(props: BlogListProps) {
  const classes = useStyles({})
  const data: PageData = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { glob: "**/content/blog/**/*.mdx" } }
      ) {
        totalCount
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              title
              date(formatString: "dddd MMMM Do, YYYY")
              tags
              authors
              summary
            }
          }
        }
      }
    }
  `)
  return (
    <Layout location={props.location}>
      <Helmet title={`OrderCloud Blog`} />
      <Jumbotron
        heading="OrderCloud Blog"
        text="Learn the platform like never before with these big thought blogs written by some of the best orderclouders in the world."
      />
      <Container className={classes.blogContainer}>
        <Grid container spacing={3}>
          {data.allMdx.edges.map(edge => {
            return (
              <Grid item sm={6} md={4} lg={3} key={edge.node.id}>
                <Card className={classes.cardBase}>
                  <CardActionArea
                    className={classes.cardActionArea}
                    href={utility.resolvePath(edge.node.fileAbsolutePath)}
                  >
                    <CardMedia
                      className={classes.cardImg}
                      image={placeholderImg}
                    >
                      <Avatar
                        className={classes.cardAuthor}
                        src={
                          'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80'
                        }
                      />
                    </CardMedia>
                    <CardContent className={classes.MuiCardContentRoot}>
                      <Typography
                        className={classes.cardTitle}
                        gutterBottom
                        variant="h5"
                      >
                        {edge.node.frontmatter.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        dangerouslySetInnerHTML={{
                          __html: edge.node.frontmatter.summary,
                        }}
                      />
                    </CardContent>
                  </CardActionArea>
                  <CardActions className={classes.MuiCardActionsRoot}>
                    <Typography variant={'caption'}>
                      {edge.node.frontmatter.date}
                    </Typography>
                    <div>
                      <Tooltip title="Share" placement="top">
                        <IconButton edge="end">
                          <Share />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Layout>
  )
}
