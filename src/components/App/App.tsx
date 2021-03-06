import React from 'react'
import { Router } from '@reach/router'
import Layout from '../Layout/Layout'
import Main from '../Layout/Main'
import { MuiThemeProvider } from '@material-ui/core/styles'
import ORDERCLOUD_THEME from '../../theme/theme.constants'
import Route from '../Shared/Route'
import { withPrefix } from 'gatsby'
import { CssBaseline } from '@material-ui/core'

class App extends React.Component {
  public render() {
    return (
      <Layout>
        <Router>
          <Route path={withPrefix('/')} component={<Main />} />
        </Router>
      </Layout>
    )
  }
}

export default App
