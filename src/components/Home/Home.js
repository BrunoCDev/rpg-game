import React, { Component } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { retrieveUser } from './../../ducks/user'

class Home extends Component {

  componentDidMount() {
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div>
          <h1>Welcome To The Home Page</h1>
        </div>
        <Link to='/character'><button>Character</button></Link>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { retrieveUser })(Home)