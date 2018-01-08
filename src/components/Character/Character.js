import React, { Component } from 'react'
import axios from 'axios'

import { connect } from 'react-redux'
import { retrieveCharacter } from './../../ducks/user'

class Character extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    // this.checkCharacter = this.checkCharacter.bind(this)

  }
  
  componentDidMount() {
      console.log(this.props)
      this.props.retrieveCharacter(this.props.user.user.auth_id)
      // axios
      // .get(`/api/character/${res.data[0].auth_id}`)
      // .then(res => {
      //   this.setState({ character: res.data[0] }, () => {
      //     console.log(this.state.character)
      //   })
      // })
      // .catch(console.log)
  }


  render() {
    console.log(this.props)
    const character = this.props.user.character[0]
    return (
      <div>
        {character
        ? <div><p>{character.username}</p></div> 
        : <div>There is no Character</div>}
      </div>
    )
  }
}

// export default Character
const mapStateToProps = state => state

export default connect(mapStateToProps, { retrieveCharacter })(Character)